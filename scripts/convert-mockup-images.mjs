/**
 * One-shot image converter — emits AVIF + WebP next to each source PNG.
 *
 * Quality targets are set high (AVIF q82, WebP q92, both at max effort) so the
 * result is visually indistinguishable from the source on the project mockups.
 * Run with: node scripts/convert-mockup-images.mjs
 */
import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

/* Only the four mockup images currently rendered on the live site.
   Other PNGs in /public/projects/* are unreferenced — left untouched. */
const TARGETS = [
  'public/projects/marzipan/1.png',
  'public/projects/marzipan/6.png',
  'public/projects/yuval-digital/1.png',
  'public/projects/yuval-digital/2.png',
];

const fmt = (n) => (n / 1024).toFixed(1) + ' KB';

async function convertOne(rel) {
  const abs = resolve(ROOT, rel);
  const baseAbs = abs.replace(/\.png$/i, '');

  const srcStat = await stat(abs);
  const input = sharp(abs);

  await input
    .clone()
    .avif({ quality: 82, effort: 6, chromaSubsampling: '4:4:4' })
    .toFile(baseAbs + '.avif');

  await input
    .clone()
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(baseAbs + '.webp');

  const avifStat = await stat(baseAbs + '.avif');
  const webpStat = await stat(baseAbs + '.webp');

  return {
    rel,
    png: srcStat.size,
    avif: avifStat.size,
    webp: webpStat.size,
  };
}

const results = [];
for (const rel of TARGETS) {
  process.stdout.write(`Converting ${rel} … `);
  const r = await convertOne(rel);
  results.push(r);
  console.log(
    `PNG ${fmt(r.png)} → AVIF ${fmt(r.avif)} (${((1 - r.avif / r.png) * 100).toFixed(0)}% smaller) · WebP ${fmt(r.webp)} (${((1 - r.webp / r.png) * 100).toFixed(0)}% smaller)`
  );
}

const totals = results.reduce(
  (acc, r) => ({
    png: acc.png + r.png,
    avif: acc.avif + r.avif,
    webp: acc.webp + r.webp,
  }),
  { png: 0, avif: 0, webp: 0 }
);

console.log('\nTOTAL');
console.log('  PNG  : ' + fmt(totals.png));
console.log('  AVIF : ' + fmt(totals.avif) + '  (' + ((1 - totals.avif / totals.png) * 100).toFixed(1) + '% smaller)');
console.log('  WebP : ' + fmt(totals.webp) + '  (' + ((1 - totals.webp / totals.png) * 100).toFixed(1) + '% smaller)');
