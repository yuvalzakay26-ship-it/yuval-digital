/**
 * Generates dist/sitemap.xml after vite-react-ssg has emitted the static
 * HTML files. Mirrors the prerendered route set so every entry in the
 * sitemap points at a real, crawlable URL.
 *
 * Hreflang alternates are paired locale-by-locale, with x-default
 * pointing at the Hebrew copy (brand-mandated default).
 */

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://yuval.digital';
const LANGS = ['he', 'en'];
const STATIC_PAGES = ['', '/page/privacy', '/page/accessibility'];

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');

const today = new Date().toISOString().slice(0, 10);

/* All paths to publish, mirroring vite.config.js → ssgOptions.includedRoutes. */
const paths = LANGS.flatMap(lang => STATIC_PAGES.map(p => `/${lang}${p}`));

/* Treat the locale's home (/he, /en) as the highest priority; legal
   pages get a lower weight since they're support content. */
const priorityFor = (path) => (/\/(he|en)$/.test(path) ? '1.0' : '0.5');
const changefreqFor = (path) => (/\/(he|en)$/.test(path) ? 'monthly' : 'yearly');

function altsFor(path) {
  /* /he/page/privacy → suffix '/page/privacy', shared by both locales */
  const suffix = path.replace(/^\/(he|en)/, '');
  return LANGS.map(l => ({ lang: l, url: `${ORIGIN}/${l}${suffix}` }))
    .concat({ lang: 'x-default', url: `${ORIGIN}/he${suffix}` });
}

const urlEntries = paths.map(p => {
  const alts = altsFor(p)
    .map(a => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}" />`)
    .join('\n');
  return `  <url>
    <loc>${ORIGIN}${p}</loc>
${alts}
    <lastmod>${today}</lastmod>
    <changefreq>${changefreqFor(p)}</changefreq>
    <priority>${priorityFor(p)}</priority>
  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });
writeFileSync(resolve(DIST, 'sitemap.xml'), xml);
console.log(`[sitemap] wrote ${paths.length} URLs → dist/sitemap.xml`);
