/**
 * Vercel serverless function - contact form delivery via Resend.
 * POST /api/contact
 *
 * Required env vars:
 *   RESEND_API_KEY      - from https://resend.com/api-keys
 * Optional env vars:
 *   CONTACT_TO_EMAIL    - recipient (defaults to yuvalzakay25@gmail.com)
 *   CONTACT_FROM_EMAIL  - verified sender (defaults to onboarding@resend.dev for testing)
 */

import { Resend } from 'resend';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const ipBuckets = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const recent = (ipBuckets.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    ipBuckets.set(ip, recent);
    return false;
  }
  recent.push(now);
  ipBuckets.set(ip, recent);
  if (ipBuckets.size > 5000) {
    for (const [key, arr] of ipBuckets) {
      if (arr.every(t => now - t >= RATE_LIMIT_WINDOW_MS)) ipBuckets.delete(key);
    }
  }
  return true;
}

function isEmail(s) {
  return typeof s === 'string'
    && s.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function clean(value, max = 2000) {
  return String(value ?? '').trim().slice(0, max);
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
}

const PROJECT_TYPE_LABELS = {
  landing: 'Landing page',
  website: 'Full business website',
  system: 'Internal system / dashboard',
  automation: 'Automation / integration',
  ai: 'AI-assisted solution',
  upgrade: 'Upgrade existing site',
  other: 'Other / not sure'
};

const BUDGET_LABELS = {
  lt2k: 'Up to NIS 2,000',
  '2k-5k': 'NIS 2,000 - 5,000',
  '5k-9k': 'NIS 5,000 - 9,000',
  '9k-15k': 'NIS 9,000 - 15,000',
  '15k-plus': 'NIS 15,000+',
  unsure: 'Not sure yet'
};

const TIMELINE_LABELS = {
  asap: 'As soon as possible',
  '1m': 'Within a month',
  '3m': 'Within three months',
  planning: 'Still planning'
};

function label(map, value) {
  if (!value) return '';
  return map[value] ? `${map[value]} (${value})` : value;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim()
    || req.socket?.remoteAddress
    || 'unknown';

  if (!rateLimit(ip)) {
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
  const projectType = clean(body.projectType, 80);
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact handler: missing RESEND_API_KEY');
    return res.status(500).json({ ok: false, error: 'server_misconfigured' });
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Yuval Digital <onboarding@resend.dev>';
  const toEmail = process.env.CONTACT_TO_EMAIL || 'yuvalzakay25@gmail.com';
  const submittedAt = new Date().toISOString();

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone],
    ['Business type', businessType],
    ['Project type', label(PROJECT_TYPE_LABELS, projectType)],
    ['Budget', label(BUDGET_LABELS, budget)],
    ['Timeline', label(TIMELINE_LABELS, timeline)],
    ['Locale', locale],
    ['IP', ip],
    ['Submitted', submittedAt]
  ];

  const subjectTag = projectType ? ` - ${PROJECT_TYPE_LABELS[projectType] || projectType}` : '';
  const subject = `New lead - ${name}${subjectTag}`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#0f172a;background:#ffffff;padding:24px">
      <h2 style="margin:0 0 4px;font-size:18px;line-height:1.3">New lead from yuval.digital</h2>
      <p style="margin:0 0 20px;font-size:13px;color:#64748b">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
        ${rows.map(([k, v]) => v
          ? `<tr><td style="padding:10px 14px;background:#f8fafc;font-weight:600;width:38%;border-bottom:1px solid #e2e8f0;vertical-align:top">${escapeHtml(k)}</td><td style="padding:10px 14px;background:#ffffff;border-bottom:1px solid #e2e8f0;word-break:break-word">${escapeHtml(v)}</td></tr>`
          : '').join('')}
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:0.05em;color:#475569">Message</h3>
      <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;line-height:1.65;background:#f8fafc;padding:14px 16px;border-radius:8px;border:1px solid #e2e8f0;margin:0">${escapeHtml(message)}</pre>
    </div>
  `.trim();

  const text = [
    'New lead from yuval.digital',
    '',
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    message
  ].join('\n');

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject,
      html,
      text
    });
    if (error) {
      console.error('Resend error', error);
      return res.status(502).json({ ok: false, error: 'send_failed' });
    }
    return res.status(200).json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error('Contact handler unexpected error', err);
    return res.status(500).json({ ok: false, error: 'unexpected' });
  }
}
