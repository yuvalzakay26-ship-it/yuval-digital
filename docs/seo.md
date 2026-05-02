# SEO — Strategy

The site's SEO strategy is positioning-first: rank for the questions premium clients actually search for, not generic high-volume terms with low intent.

## Strategic Posture

`yuval.digital` is a personal-brand authority site, not a content farm. SEO success is measured by:

1. **Branded discovery** — searches for "Yuval", "yuval digital", and the brand combined with services rank #1.
2. **Premium-intent terms** — middle-of-funnel phrases like "premium business automation" or "AI agent for law firm" produce inbound leads.
3. **Bilingual parity** — Hebrew and English content rank equally well in their respective regions.

We do *not* chase high-volume informational queries with no commercial intent.

## Target Keyword Clusters

### Hebrew
- בניית אתרים לעסקים פרימיום
- מפתח AI לעסקים
- אוטומציה לעסקים בישראל
- מערכות פנימיות בהזמנה אישית
- צ'אטבוט בעברית לעסקים
- ייעוץ טכנולוגי / בחירת סטאק
- מהנדס תוכנה פרילנס פרימיום

### English
- premium business website builder
- AI developer for SMBs
- custom automation builder
- internal CRM development
- bilingual chatbot Hebrew English
- digital systems consultant
- premium tech freelancer

## On-Page Foundations

- `<title>` and `<meta name="description">` are set on every page, in the active language.
- Single `<h1>` per page (the hero title); H2 reserved for section headings.
- Structured data (planned): `Person`, `LocalBusiness`, and `Service` schemas via JSON-LD.
- Canonical URLs and `hreflang="he"` / `hreflang="en"` link tags will be added at Phase 2.
- All images served as SVG when possible; raster assets are AVIF/WebP with explicit dimensions.

## Performance (an SEO multiplier)

- Core Web Vitals targets: LCP < 2.0s, INP < 200ms, CLS < 0.05.
- Self-hosted fonts with `font-display: swap` (current implementation uses Google Fonts CSS preconnect; can be moved to self-hosted in a build step).
- Code-splitting per route once routing is introduced.
- Hero imagery is rendered via CSS gradients to avoid network requests above the fold.

## Bilingual SEO

- The site initializes in Hebrew (`lang="he" dir="rtl"`), reflecting the primary market.
- The language toggle is reflected in the `<html lang>` and `<html dir>` attributes via the `LanguageProvider`.
- Phase 2 will introduce per-language URLs (`/en/...`) so each language has indexable canonical paths.
- We never machine-translate content. Every published string is written natively in both languages.

## Off-Page

- Personal LinkedIn presence linking to the canonical URL.
- GitHub project pages linking back to `yuval.digital` via README.
- Selective guest writing on respected industry blogs.
- Project case-study pages will accept dofollow backlinks from clients' sites.

## Authority Content (Phase 2 Journal)

Pillar topics:

1. **Engineering for SMBs** — how to think about stack, debt, and growth.
2. **Practical AI for business** — real workflows, not theater.
3. **Premium digital presence** — what separates a templated site from an engineered brand.
4. **Automation patterns** — recurring problem/solution archetypes.

Each pillar produces 3–5 cornerstone posts and a network of supporting posts.

## Tracking & Attribution

- Privacy-friendly analytics (Plausible, Vercel Analytics, or Cloudflare Web Analytics).
- Conversion events: contact submission, WhatsApp click, email click, CTA click on hero.
- Search Console: monitor branded queries, click-through rate, and indexing health weekly.

## What Not To Do

- ❌ Doorway pages.
- ❌ Auto-generated content of any kind.
- ❌ Cloaking or hreflang stuffing.
- ❌ Backlink schemes — genuine relationships only.
- ❌ Stuffing keywords into sentences.
