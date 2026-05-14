/**
 * Post-build pass that inlines `src/styles/critical.css` into every
 * prerendered `index.html`, and rewrites the main app stylesheet
 * `<link rel="stylesheet">` to a non-blocking preload+onload swap.
 *
 * Why:
 *   The default vite-react-ssg output ships a single `<link rel="stylesheet"
 *   href="/assets/app-*.css">` for the entire site (~130 KiB). On a slow
 *   mobile connection that single render-blocking request was the dominant
 *   cause of FCP ≈ 4.6 s on /he. Lighthouse flagged ~63 KiB unused CSS in
 *   that bundle — most of it is below-the-fold section CSS that the user
 *   doesn't see until they scroll.
 *
 *   The fix here is the classic "critical CSS + lazy main stylesheet"
 *   pattern: a hand-maintained ~4 KiB critical slice ships inline so the
 *   hero is styled on first paint, and the full bundle loads in parallel
 *   without blocking the LCP frame. The <noscript> fallback keeps non-JS
 *   crawlers (and motion-reduced visitors) seeing a fully-styled page.
 *
 *   Implementation notes:
 *   - We minify the critical CSS with a tiny in-process pass (strip
 *     comments + collapse whitespace) so we don't pull in a CSS minifier
 *     just for the postbuild.
 *   - We only rewrite the *first* `<link rel="stylesheet">` that points
 *     at an `/assets/app-*.css` build artefact — that's the one the
 *     framework emits. Any per-route CSS chunks (rel="modulepreload"-
 *     adjacent stylesheets that load alongside lazy routes) are
 *     untouched.
 *   - This runs in `postbuild`, after `generate-sitemap.mjs`.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const CRITICAL_SRC = resolve(__dirname, '..', 'src', 'styles', 'critical.css');

/* Very small CSS minifier: strip /* … *\/ comments, collapse runs of
   whitespace to a single space, and trim spaces around punctuation that
   doesn't need them. Good enough for hand-authored critical CSS, and we
   avoid adding a dependency. */
function miniCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

async function findIndexHtmlPaths(root) {
  const out = [];
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.isFile() && entry.name === 'index.html') out.push(full);
    }
  }
  await walk(root);
  return out;
}

/* Locate the framework-emitted app stylesheet link and rewrite it to a
   non-blocking load. The `media="print"` + `onload="this.media='all'"`
   trick is preferred over `rel="preload" as="style" onload` because it
   works without a stylesheet-fallback gymnastic on older browsers, and
   the stylesheet still ends up in the regular CSSOM at high priority
   when the swap fires. */
function rewriteAppStylesheet(html) {
  const linkPattern = /<link\s+([^>]*\brel=["']stylesheet["'][^>]*\bhref=["']\/assets\/app-[^"']+\.css["'][^>]*)>/i;
  const m = html.match(linkPattern);
  if (!m) return { html, changed: false, href: null };

  const attrs = m[1];
  const hrefMatch = attrs.match(/href=["']([^"']+)["']/);
  const crossoriginMatch = attrs.match(/crossorigin(?:=["'][^"']*["'])?/);
  const href = hrefMatch ? hrefMatch[1] : null;
  const crossorigin = crossoriginMatch ? ' ' + crossoriginMatch[0] : '';

  const replacement =
    `<link rel="stylesheet" href="${href}"${crossorigin} media="print" onload="this.media='all';this.onload=null">` +
    `<noscript><link rel="stylesheet" href="${href}"${crossorigin}></noscript>`;

  return { html: html.replace(linkPattern, replacement), changed: true, href };
}

function inlineCritical(html, criticalCss) {
  if (!criticalCss) return html;
  /* Inject the inline <style> right before the first <link> in <head>
     so the critical rules cascade BEFORE the framework's CSS link is
     even seen by the parser. Falls back to inserting right before
     </head> if no <link> exists in the head. */
  const styleTag = `<style data-critical>${criticalCss}</style>`;
  const headLinkIdx = html.indexOf('<link');
  if (headLinkIdx !== -1) {
    return html.slice(0, headLinkIdx) + styleTag + html.slice(headLinkIdx);
  }
  return html.replace(/<\/head>/i, `${styleTag}</head>`);
}

async function main() {
  const critical = miniCss(await readFile(CRITICAL_SRC, 'utf8'));
  const htmlFiles = await findIndexHtmlPaths(DIST);

  let inlined = 0;
  let rewritten = 0;
  for (const file of htmlFiles) {
    const original = await readFile(file, 'utf8');
    let html = original;

    if (!html.includes('data-critical')) {
      html = inlineCritical(html, critical);
      inlined += 1;
    }

    const r = rewriteAppStylesheet(html);
    html = r.html;
    if (r.changed) rewritten += 1;

    if (html !== original) await writeFile(file, html, 'utf8');
  }

  const kb = (critical.length / 1024).toFixed(1);
  console.log(
    `inline-critical-css: ${inlined} html files received ${kb} KiB inline critical CSS; ` +
    `${rewritten} app stylesheet links converted to non-blocking.`,
  );
}

main().catch(err => {
  console.error('inline-critical-css: failed to post-process build', err);
  process.exit(1);
});
