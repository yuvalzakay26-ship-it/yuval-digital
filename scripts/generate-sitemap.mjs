/**
 * Generates dist/sitemap.xml after the SSG build by walking dist/ for
 * every prerendered index.html. Each file represents a real, crawlable
 * route, so the sitemap stays in sync with whatever vite-react-ssg
 * actually emitted — no separate route list to keep in sync.
 *
 * Hreflang alternates pair the locale routes; x-default points at the
 * Hebrew copy (brand-mandated default).
 */

import { readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://yuvaldigital.co.il';
const LANGS = new Set(['he', 'en']);
const DEFAULT_LANG = 'he';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');

async function findIndexHtmlPaths(root) {
  const out = [];
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && entry.name === 'index.html') {
        out.push(full);
      }
    }
  }
  await walk(root);
  return out;
}

/* Map an absolute index.html path under dist/ → its public route path.
   `dist/he/index.html`              → `/he`
   `dist/he/page/privacy/index.html` → `/he/page/privacy`
   The root `dist/index.html` (SPA fallback emitted by Vite) maps to `/`
   and is filtered out below — it isn't a locale route. */
function indexPathToRoute(absPath) {
  const rel = relative(DIST, absPath).split(sep).join('/');
  const withoutFile = rel.replace(/\/?index\.html$/, '');
  return withoutFile ? `/${withoutFile}` : '/';
}

function suffixFor(route) {
  /* Strip the leading /he or /en to get the cross-locale suffix. */
  return route.replace(/^\/(he|en)/, '');
}

function priorityFor(route) {
  return /^\/(he|en)$/.test(route) ? '1.0' : '0.5';
}

function altsFor(route) {
  const suffix = suffixFor(route);
  return [
    ...[...LANGS].map(l => ({ lang: l, url: `${ORIGIN}/${l}${suffix}` })),
    { lang: 'x-default', url: `${ORIGIN}/${DEFAULT_LANG}${suffix}` }
  ];
}

function buildXml(routes, today) {
  const entries = routes.map(route => {
    const alts = altsFor(route)
      .map(a => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}" />`)
      .join('\n');
    return `  <url>
    <loc>${ORIGIN}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priorityFor(route)}</priority>
${alts}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
}

async function main() {
  const indexFiles = await findIndexHtmlPaths(DIST);
  const routes = indexFiles
    .map(indexPathToRoute)
    /* Keep only routes that begin with a known locale segment. The SPA
       fallback `dist/index.html` and any future non-locale prerenders
       don't belong in this hreflang-aware sitemap. */
    .filter(route => {
      const first = route.split('/')[1];
      return LANGS.has(first);
    })
    .sort();

  const today = new Date().toISOString().slice(0, 10);
  const xml = buildXml(routes, today);
  const outPath = resolve(DIST, 'sitemap.xml');
  await writeFile(outPath, xml);

  console.log(`[sitemap] wrote ${routes.length} routes → ${relative(process.cwd(), outPath)}`);
}

main().catch(err => {
  console.error('[sitemap] generation failed:', err);
  process.exit(1);
});
