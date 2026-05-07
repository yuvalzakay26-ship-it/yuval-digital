/**
 * Analytics façade — single entry point for GA4 and Microsoft Clarity.
 *
 * Goals:
 *  - One stable API (`init`, `pageview`, `track`) so callers never touch
 *    `window.gtag` / `window.clarity` directly.
 *  - Lazy, non-blocking script injection. Loaders fire on idle so they
 *    never compete with hero hydration or first paint.
 *  - Silent no-ops when IDs are absent (local dev, preview deploys).
 *  - SPA-safe: GA4 default `send_page_view` is disabled and route changes
 *    are reported manually from `App.jsx` via `pageview()`.
 *  - Respect `prefers-reduced-data`. Skip Clarity (heavy session
 *    recording) on Save-Data networks; pageviews still report.
 */

const GA4_ID = import.meta.env.VITE_GA4_ID || '';
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID || '';

let initStarted = false;
let ga4Loaded = false;
let clarityLoaded = false;

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function prefersSaveData() {
  if (!isBrowser()) return false;
  const c = navigator.connection;
  return !!(c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || '')));
}

function whenIdle(cb, timeout = 2500) {
  if (!isBrowser()) return;
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(cb, { timeout });
  } else {
    setTimeout(cb, 1200);
  }
}

function loadGA4() {
  if (ga4Loaded || !GA4_ID || !isBrowser()) return;
  ga4Loaded = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  /* `send_page_view: false` lets the SPA emit pageviews manually so we
     never double-count on hash-route transitions or locale switches. */
  gtag('config', GA4_ID, {
    send_page_view: false,
    anonymize_ip: true,
    transport_type: 'beacon',
  });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
  document.head.appendChild(s);
}

function loadClarity() {
  if (clarityLoaded || !CLARITY_ID || !isBrowser()) return;
  if (prefersSaveData()) return;
  clarityLoaded = true;

  /* Official Clarity bootstrap, adapted to defer script injection. */
  (function (c, l, a, r, i) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    const t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);
}

/**
 * Boot analytics once. Safe to call multiple times.
 * Defers script injection until the main thread is idle.
 */
export function initAnalytics() {
  if (initStarted || !isBrowser()) return;
  initStarted = true;
  whenIdle(() => {
    loadGA4();
    loadClarity();
  });
}

/**
 * Report a virtual pageview for SPA navigation.
 * `path` should look like a real URL path (e.g. `/`, `/page/privacy`,
 * `/?lang=en`) so GA4 path reports stay readable.
 */
export function pageview(path, title) {
  if (!isBrowser()) return;
  const page_path = path || (window.location.pathname + window.location.search);
  const page_title = title || document.title;

  if (window.gtag && GA4_ID) {
    window.gtag('event', 'page_view', {
      page_path,
      page_title,
      page_location: window.location.href,
    });
  }
  /* Clarity tracks routes implicitly via URL, but we tag the virtual
     page so session replays segment cleanly across hash routes. */
  if (window.clarity) {
    try { window.clarity('set', 'page', page_path); } catch { /* ignore */ }
  }
}

/**
 * Track a business conversion event.
 *  - `name` follows snake_case verb_object naming (e.g. `cta_hero_click`,
 *    `whatsapp_click`, `contact_submit`, `project_external_click`).
 *  - `params` is a flat object of contextual hints (route, source, label).
 */
export function track(name, params = {}) {
  if (!isBrowser() || !name) return;
  const payload = {
    page_path: window.location.pathname + window.location.search,
    page_hash: window.location.hash || '',
    ...params,
  };
  if (window.gtag && GA4_ID) {
    window.gtag('event', name, payload);
  }
  if (window.clarity) {
    try {
      window.clarity('event', name);
      if (params.source) window.clarity('set', name, String(params.source));
    } catch { /* ignore */ }
  }
}
