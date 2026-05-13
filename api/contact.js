/**
 * Vercel serverless function - contact form proxy to n8n.
 * POST /api/contact
 *
 * Validates the submission server-side, then forwards a clean payload to
 * an n8n webhook which writes the lead into Airtable. Going through this
 * proxy avoids browser-to-n8n CORS and lets us keep rate limiting and the
 * origin allowlist on Vercel.
 *
 * Required env vars:
 *   N8N_WEBHOOK_URL            - n8n production webhook URL for yd-lead-intake
 *   UPSTASH_REDIS_REST_URL     - Upstash Redis REST URL (production rate limiting)
 *   UPSTASH_REDIS_REST_TOKEN   - Upstash Redis REST token (production rate limiting)
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ALLOWED_ORIGINS = new Set([
  'https://yuvaldigital.co.il',
  'https://www.yuvaldigital.co.il'
]);

const isProduction = process.env.VERCEL_ENV === 'production';

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL
  || 'https://n8n-production-5418.up.railway.app/webhook/yd-lead-intake';

const N8N_TIMEOUT_MS = 8000;

let ratelimit = null;
const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
if (upstashUrl && upstashToken) {
  ratelimit = new Ratelimit({
    redis: new Redis({ url: upstashUrl, token: upstashToken }),
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    prefix: 'yuval:contact',
    analytics: false
  });
} else if (isProduction) {
  console.error('Contact handler: Upstash env vars missing in production');
}

async function checkRateLimit(ip) {
  if (!ratelimit) return true;
  try {
    const { success } = await ratelimit.limit(ip);
    return success;
  } catch (err) {
    console.error('Rate limit check failed', err);
    return true;
  }
}

function isOriginAllowed(req) {
  if (!isProduction) return true;
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) return true;
  const referer = req.headers.referer;
  if (referer) {
    try {
      const u = new URL(referer);
      if (ALLOWED_ORIGINS.has(`${u.protocol}//${u.host}`)) return true;
    } catch {
      // fall through
    }
  }
  return false;
}

function isEmail(s) {
  return typeof s === 'string'
    && s.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function clean(value, max = 2000) {
  return String(value ?? '').trim().slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  if (!isOriginAllowed(req)) {
    return res.status(403).json({ ok: false, error: 'forbidden_origin' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim()
    || req.socket?.remoteAddress
    || 'unknown';

  if (!(await checkRateLimit(ip))) {
    return res.status(429).json({ ok: false, error: 'rate_limited' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); }
    catch { return res.status(400).json({ ok: false, error: 'invalid_json' }); }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'invalid_body' });
  }

  // Honeypot - bots that fill this field get a silent 200.
  if (clean(body.company)) {
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, 200);
  const email = clean(body.email, 254);
  const phone = clean(body.phone, 60);
  const businessType = clean(body.businessType, 200);
  // Tolerate both shapes from the client: legacy `projectType` and the
  // current `service` field. n8n + Airtable expect `service`.
  const service = clean(body.service || body.projectType, 80);
  const budget = clean(body.budget, 80);
  const timeline = clean(body.timeline, 80);
  const message = clean(body.message, 5000);
  const locale = clean(body.locale, 8) || 'he';

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'missing_fields' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const payload = {
    name,
    email,
    phone,
    service,
    message,
    businessType,
    budget,
    timeline,
    locale,
    ip,
    timestamp: new Date().toISOString()
  };

  const ctrl = new AbortController();
  const timeoutId = setTimeout(() => ctrl.abort(), N8N_TIMEOUT_MS);

  try {
    const upstream = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      console.error('n8n webhook non-2xx', upstream.status, detail.slice(0, 500));
      return res.status(502).json({ ok: false, error: 'send_failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    if (err?.name === 'AbortError') {
      console.error('n8n webhook timed out after', N8N_TIMEOUT_MS, 'ms');
      return res.status(504).json({ ok: false, error: 'upstream_timeout' });
    }
    console.error('Contact handler unexpected error', err);
    return res.status(500).json({ ok: false, error: 'unexpected' });
  } finally {
    clearTimeout(timeoutId);
  }
}
