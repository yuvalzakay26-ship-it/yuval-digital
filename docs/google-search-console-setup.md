# Google Search Console setup

This document is the operator's runbook for getting the site indexed
by Google. Read top to bottom.

## Prerequisites
- Brief #1 (canonical fix) and Brief #2 (sitemap + robots) must be
  deployed to production.
- https://yuvaldigital.co.il/sitemap.xml and
  https://yuvaldigital.co.il/robots.txt must return 200 OK.

## Step 1 — Choose property type

In GSC, you can register either:
- **Domain property** — covers all subdomains and protocols. Requires
  DNS TXT record verification. Recommended if you have DNS access.
- **URL prefix property** — covers exactly one origin
  (https://yuvaldigital.co.il/). Verifiable via HTML file or meta tag.

Recommendation: register the URL prefix property first (faster), and
add the Domain property later if you want full coverage.

## Step 2 — Verify ownership

GSC will prompt you with one of these methods:

### Option A — HTML file
1. Download the verification file from GSC.
2. Place it in `public/` (see `public/.gsc-verification.README.md`).
3. Commit, push, deploy.
4. Confirm it loads at `https://yuvaldigital.co.il/<filename>.html`.
5. Click "Verify" in GSC.

### Option B — HTML meta tag
1. Copy the `content="..."` value from the meta tag GSC provides.
2. In your hosting provider (Vercel/Netlify/Cloudflare Pages), set the
   environment variable `VITE_GSC_VERIFICATION` to that value.
3. Trigger a redeploy.
4. View source on https://yuvaldigital.co.il/ and confirm the meta tag
   is present.
5. Click "Verify" in GSC.

### Option C — DNS TXT
Best for the Domain-level property. Add the TXT record at your DNS
provider, wait up to an hour for propagation, click "Verify".

## Step 3 — Submit the sitemap

Once verified:
1. In GSC, go to Sitemaps (left nav).
2. Enter `sitemap.xml` and submit.
3. Status should change to "Success" within minutes.

## Step 4 — Request indexing for the homepage

1. Use the URL Inspection tool at the top of GSC.
2. Paste `https://yuvaldigital.co.il/he`.
3. Click "Request Indexing".
4. Repeat for `https://yuvaldigital.co.il/en`.

Indexing typically completes within 24–72 hours after this.

## Step 5 — Monitor

Check back weekly for the first month:
- Coverage / Pages — should show indexed URLs growing.
- Performance — first impressions usually appear after a few days.
- Sitemap status — should remain "Success".
