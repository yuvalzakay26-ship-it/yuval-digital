# NEXT ACTION PLAN — yuval.digital

> **Frame:** Brutally honest growth plan for the next phase. Every recommendation is calibrated to a one-operator studio with no marketing budget, no current paid traffic, and no existing client base to amplify from.
> **Default lens:** What produces the largest commercial lift per hour invested.
> **Plan window:** Today → 90 days out.

---

## The brutal truth before we start

This site is currently **75% of an elite agency front** and **15% of a working lead engine**. The remaining 10% is what the brand is — the operator, the work, the standards.

The 75% is real. The visual quality, the bilingual depth, the accessibility infrastructure, the conversion-engineered funnel — all genuinely premium. A senior buyer would respect it.

The 15% is the gap that costs money every day:
- The contact form does not actually submit anywhere.
- There is no analytics. Every visitor's behavior is invisible.
- There are no real client testimonials, photos, or named case studies.
- The "Projects" section is 1 real + 1 personal + 3 concepts. The ratio reads "early career," not "premium studio."
- There is no easy scheduling — every discovery call requires a manual back-and-forth.
- There is no SEO surface beyond one URL. The site cannot rank for service-specific or project-specific queries.

These are not aesthetics. They are revenue lost between now and the moment they're fixed. **The list below is ordered to close that gap fastest.**

---

## 1. What to Improve Immediately (this week)

These are 1–3 hour fixes with disproportionate impact. Do all of them before anything else on this page.

### 1.1 Wire the contact form to actually deliver
**Why this is #1:** Every form submission today is a silent loss. A real prospect filling out the form expects an answer. They get nothing.

**Smallest viable fix:** Add a server-side endpoint via Cloudflare Workers, Vercel Edge Functions, or a Formspree/Web3Forms-style hosted relay. Route the submission to:
- Yuval's email inbox (primary).
- Optional: WhatsApp or Telegram via webhook for instant mobile alert.

Replace the `setSubmitted(true)` no-op in `Contact.jsx` with a real `fetch()` POST. Keep the existing UX (form swaps for success card on success). Add a clear failure path that surfaces the WhatsApp + phone fallback if delivery fails.

**Time:** 2–4 hours. **Lift:** 100% (currently the conversion rate of the form is 0%).

### 1.2 Install privacy-friendly analytics
**Why:** You cannot improve what you cannot see. Without numbers, every change below is a gamble.

**Stack:** Plausible (paid, IL-friendly, no cookie banner needed) or Cloudflare Web Analytics (free). Both are GDPR/CCPA/חוק הגנת הפרטיות-compatible.

**Events to track from day 1:**
- `pageview` (default).
- `cta_click` with a `location` property: `hero_primary`, `hero_secondary`, `package_starter`, `package_growth`, `package_custom`, `banner_after_hero`, `banner_after_packages`, `banner_before_footer`, `faq_contact`, `projects_final`, `nav_cta`, `mobile_sticky_form`.
- `whatsapp_click` (FAB, sticky bar, contact card, footer).
- `phone_tap` (sticky bar, contact card, footer).
- `email_click` (contact card, footer).
- `form_submit_attempt`, `form_submit_success`, `form_submit_failure`.
- `lang_switch`, `theme_toggle`, `a11y_panel_open`.

**Time:** 1 hour install + 1 hour wiring events. **Lift:** Unblocks every later decision.

### 1.3 Add Cal.com (or equivalent) embed
**Why:** "Let's talk" → 2 days of email back-and-forth → 30% drop-off. A booking embed closes that loop in one click.

Add a "Book a 20-min discovery call" link beside the contact form (or as a third option in the direct-contact row), pointing to a Cal.com page with HE+EN labels. The free tier covers the volume.

**Time:** 1 hour. **Lift:** Materially shortens lead-to-call time.

### 1.4 Fix the schema mismatch on legal pages
**Why:** All three JSON-LD blocks live in `index.html` and apply to every page. A search bot crawling `#/page/privacy` sees an FAQPage schema there. That's wrong.

**Smallest viable fix:** When per-page meta lands (Phase 2), move JSON-LD into a small `<Head>` component. Until then, leave the home schema in `index.html` only.

**Time:** 30 minutes (audit + decide). **Lift:** Avoids a future SEO penalty.

### 1.5 Self-host fonts
**Why:** Two preconnects, two DNS round-trips, and one external dependency that can degrade your LCP without warning. Self-hosting Heebo + Inter with `font-display: swap` cuts ~200–400ms on cold loads.

**How:** `npm i -D fontsource` → import the weights actually used → remove the Google Fonts links from `index.html`.

**Time:** 1 hour. **Lift:** Real Core Web Vitals improvement before any SEO push.

### 1.6 Lazy-load legal pages
`App.jsx` imports both `AccessibilityStatement` and `PrivacyPolicy` eagerly. Wrap with `React.lazy()` and a `<Suspense>` boundary. They are large pages of static text that 95% of visitors never see.

**Time:** 30 minutes. **Lift:** Smaller initial bundle, faster home TTI.

---

## 2. What Increases Leads Fastest (next 30 days)

Conversion lift, not traffic lift. Same audience, more contacts.

### 2.1 Get one real, named client testimonial
**Why this is the single highest-conversion lift available.** "Yuval delivered exactly what we agreed on, on time" with a name, role, and photo is worth more than five concept project cards.

**Action:**
- Reach out to the Marzipan bakery client. Ask for a 2–3 sentence quote, their name, role, and permission to use a small photo or logo.
- Add a real `Testimonials` section above the existing "work standards" section — keep both. The first one says "here's what real clients say." The second says "here's what every client gets."
- Replace one concept card on the projects grid with a real "case study" tile if a second real project closes.

**Time:** ~2 hours of outreach + 1 hour to ship. **Lift:** Estimated +20–40% on form submission rate at the same traffic.

### 2.2 Add a real Marzipan case-study page
A dedicated `/projects/marzipan` page (still hash-routed for now: `#/page/projects/marzipan`) with:
- Hero image / screenshot.
- Client context in 1–2 paragraphs (1986 Jerusalem bakery, premium positioning needed).
- The problem in client's voice if possible.
- The solution: 4–6 specific design and technical decisions with rationale.
- A "before / after" or "what changed" callout if applicable.
- Outcome (visits, orders, or even "the team feels confident sending the link to clients" — qualitative is fine).
- A link to the live site.
- A CTA.

**Time:** 1–2 days. **Lift:** Multi-axis. SEO surface (a new ranking page), conversion (specific proof beats abstract proof), and brand authority.

### 2.3 Restructure Projects: real-first
Currently the section shows the featured Marzipan project, then a grid with 1 real + 3 concepts.

**Change:** Lead with all real projects (currently 2). Move concepts into a clearly separated, smaller "concept demos" subsection, or remove them entirely if a third real project is close to closing. The current ratio reads as "I'm new" — flip it to "I have real work, plus reference designs."

**Time:** 1 hour. **Lift:** Brand perception shift.

### 2.4 Add a "Pricing reality check" microcopy block
The current packages have no prices, which is correct. But many SMB buyers self-disqualify at the budget question because they don't know the floor.

**Change:** Add a small reassurance line under the packages section:
- HE: "רוב הפרויקטים נעים בין ₪3,000 ל-₪25,000. כל פרויקט מתומחר אישית."
- EN: "Most projects fall between ₪3,000 and ₪25,000. Every project is priced individually."

This filters tire-kickers out (good) and pulls in mid-market buyers who would have assumed "agency = ₪50K+" (also good).

**Time:** 30 minutes. **Lift:** Modest, but compounds with the form's budget-range field.

### 2.5 Tighten the Hero subtitle
The current Hero subtitle is **51 words** (HE) and similar in EN. Above-the-fold copy is the most expensive real estate on the site. Cut it to 25–35 words. Lead with the **outcome the client gets**, not the operator's credentials.

**Time:** 30 minutes (after a copy review pass). **Lift:** Estimated +5–10% scroll-to-services rate.

### 2.6 Add a Hero secondary social-proof line
Above or below the metrics row: "Trusted by [real client name]" or "Live work: [client name]". One real reference is worth a thousand "100%" metrics.

**Time:** 15 minutes (after testimonial item 2.1 lands). **Lift:** Same as 2.1 — multiplied.

### 2.7 Pre-populate WhatsApp message variants per CTA location
Currently every WhatsApp click opens the same pre-filled greeting ("היי יובל, אשמח לדבר איתך על פרויקט"). Vary it by source:
- Hero: "היי יובל, ראיתי את האתר ויש לי רעיון."
- Packages → Growth: "היי יובל, מעניין אותי אתר עסקי מלא."
- FAQ: "היי יובל, יש לי שאלה לפני שמתחילים."
- Sticky mobile CTA: stays generic.

This signals attentiveness and surfaces the prospect's intent immediately.

**Time:** 1 hour. **Lift:** Faster qualification, better first-message context.

### 2.8 Form: progressive disclosure
8 fields is intentional and pre-qualifies well, but on mobile it can feel daunting. Test a two-step flow:
- Step 1 (required): name, email, message. CTA "Continue".
- Step 2 (optional): business type, project type, budget, timeline. CTA "Send".

If conversion improves, keep it. If not, revert.

**Time:** 3 hours + 2 weeks of A/B observation. **Lift:** Variable — measure.

---

## 3. What Improves Trust Fastest (next 30 days)

Trust is the conversion ceiling. Until trust feels >= the competing alternatives (a known agency, a referred freelancer), conversion plateaus.

### 3.1 Add an "About Yuval" personal section with a photo
**✅ Completed 2026-05-11.** A real founder portrait now sits at the top of the About section, served through a `<picture>` element with WebP + JPG fallback, two responsive widths (320w, 640w), explicit `width`/`height` to prevent CLS, `fetchpriority="high"`, and i18n-driven alt copy. See *Completed actions* at the bottom of this file for the implementation summary.

### 3.2 Add a "How I'm different from an agency" section
Most prospects compare you against a freelancer or a small agency. The Authority section already touches this, but a direct comparison table (see `docs/brand.md` for the existing differentiator table — port it onto the site) is more memorable than 6 abstract claims.

**Time:** 2 hours. **Lift:** High for prospects in active comparison mode.

### 3.3 Show one real, in-progress project in the case study format
"In progress" is fine. "Currently building [X] for [Y]" with even a screenshot of the staging environment makes the operator look busy and chosen. A perfectly empty Projects grid reads "available because nobody hired me." A grid with one in-progress project reads "available between bookings."

**Time:** Variable. **Lift:** Counter-intuitive but real.

### 3.4 Add a public LinkedIn / GitHub link
The footer should link to LinkedIn and GitHub (with the proper `rel="noreferrer noopener"` and `target="_blank"`). This is table-stakes and is currently missing. A premium operator without a public technical footprint is a yellow flag.

**Time:** 30 minutes (assuming profiles exist). **Lift:** Low individually, table-stakes overall.

### 3.5 Replace concept project ratings with concept *intent*
Each concept card today shows the same `dot + concept label` chip. Add one line under the concept label explaining **why** the concept is shown: "Reference design — what a clinic booking system looks like done well." This frames concepts as deliberate reference work, not pad.

**Time:** 1 hour. **Lift:** Defensive; protects against the "where is real work" reaction.

### 3.6 Add a "FAQ: How do I know your code is good?"
A self-aware FAQ entry with a real answer: "I publish the source of this site. Look at the architecture docs. Read the design system. The work judges itself." Link to the `docs/` folder on GitHub or to a Storybook (when it ships).

**Time:** 30 minutes copy + GitHub repo public-facing setup. **Lift:** High for technical buyers.

### 3.7 Add a transparent commitment line
"I take on at most 3 active projects per quarter." It's already implicit in the brand voice. Make it explicit. Scarcity that's *true* increases trust and conversion simultaneously.

**Time:** 15 minutes copy. **Lift:** Modest but compounding.

### 3.8 Add a Plausible "live visitors" badge in the footer (optional)
Plausible offers a public dashboard. Linking to it from the footer ("See how this site performs — full traffic stats public") is an extreme transparency play that fits the brand pillar of honesty. Not for every brand, but for this one — yes.

**Time:** 30 minutes. **Lift:** Brand differentiation, not direct conversion.

---

## 4. What Improves Ranking Fastest (next 30 days)

Search is a slow lever. Don't expect lift in 30 days — expect groundwork that compounds in 90.

### 4.1 Per-language URLs (`/he/`, `/en/`)
Currently both languages share `/`. Google can index the active language at runtime, but the second language is invisible. Migrating to `/he/...` and `/en/...` paths is the single biggest SEO unlock available.

**Stack note:** This is the trigger for migrating from the hash router to `react-router-dom` (or to Astro / Next.js). Do it as **one** PR.

**Time:** 1 day. **Lift:** Materially expands ranking surface — every page becomes two indexable pages.

### 4.2 Per-page `<title>` and `<meta description>`
Once routing is in place, every page (home, services-detail, project-detail, legal) gets its own `<title>` and `<meta name="description">` tuned to the keyword cluster from `docs/seo.md`. A `<Head>` component reading from the i18n dictionary makes this clean.

**Time:** 0.5 day after 4.1. **Lift:** High once content depth follows (4.3, 4.4).

### 4.3 Per-service detail pages
`/services/web`, `/services/landing`, `/services/automation`, `/services/ai`, `/services/internal-tools`, `/services/presence-upgrade`. Each ~600–1000 words of native HE and native EN content. Each ranks for service-specific queries the home page can't.

**Time:** 1 week (the writing is the bottleneck, not the code). **Lift:** Multi-month, compounding.

### 4.4 The Marzipan case-study page (covered in 2.2)
Becomes a ranking surface for "bakery website Jerusalem" / "premium bakery online ordering" type queries.

### 4.5 Sitemap.xml + robots.txt
Auto-generated at build time. Sitemap lists every page with `lastmod`, `hreflang` alternates per language, and priority hints.

**Time:** 2 hours. **Lift:** Indexing speed (matters once 4.1–4.4 are live).

### 4.6 Submit to Google Search Console
Verify the domain. Submit the sitemap. Monitor weekly for: indexing coverage, branded query CTR, top pages, and search-feature eligibility.

**Time:** 1 hour. **Lift:** Visibility, not direct.

### 4.7 Begin authority content with two pillar posts
- "How to choose a stack for a bilingual SMB website" (HE + EN)
- "What 'AI for business' actually means in 2026 — without theater" (HE + EN)

Each ~1500 words, native in each language. Live under `/journal/...`.

**Time:** 3–5 days each (writing). **Lift:** Slow burn, 60–120 days for traction.

### 4.8 Three high-quality backlinks
Target:
- A respected Israeli web/dev blog (one guest post or "interview a builder" feature).
- A legitimate bilingual freelance directory.
- A partner client's site (e.g., Marzipan footer credit "Site by yuval.digital").

**Time:** Variable, weeks. **Lift:** High per link, low volume.

---

## 5. What Should Wait

Things that look attractive but are wrong now.

### 5.1 Paid acquisition (Google Ads, Meta Ads, LinkedIn Ads)
**Wait.** The form doesn't deliver, there's no analytics, there's no testimonial, there's no Cal embed. Sending paid traffic into a leaky funnel burns budget and tells you nothing. Revisit after items 1.1–1.3, 2.1–2.2, and 4.5 are complete.

### 5.2 A team page or "Trusted by these companies" logo wall
**Wait.** There is no team. There are not enough named clients. Faking either contradicts the brand pillar of honesty — which is the moat.

### 5.3 A blog with weekly posts
**Wait until the two pillar posts (4.7) are written and indexed.** A weekly cadence with thin posts hurts more than helps. Quality first, then frequency.

### 5.4 A migration to Next.js or Astro
**Wait until Phase 2 starts.** The current stack is right for Phase 1. Moving frameworks is a 1–2 week investment with zero conversion lift. Trigger the move when *content depth* (case studies, journal) requires SSR/SSG.

### 5.5 A client portal
**Wait for Phase 5 / 6.** Until you have 5+ active clients per quarter, a portal is a vanity project. WhatsApp + email + a shared Notion / Airtable is enough.

### 5.6 A real CMS
**Wait.** Content lives in `i18n/{he,en}.js`. That's a feature, not a bug — it's git-tracked, code-reviewable, build-bundled. A CMS pays back when non-developers edit content. There are no non-developers here yet.

### 5.7 A referral program
**Wait until you have 10+ delighted clients.** With 1–2 real clients, a referral program signals desperation. With 10+, it amplifies a pattern that's already working.

### 5.8 An AI chatbot on the site
**Wait for Phase 5.** Until form delivery + analytics + Cal embed work, an AI chatbot is a distraction layer over a broken funnel. It will also undercut the "direct contact with the builder" pillar if positioned wrong.

### 5.9 Adding Russian, Arabic, or French
**Wait.** HE + EN parity isn't yet generating leads in volume. A third language is +50% content overhead with unclear demand.

### 5.10 Switching from vanilla CSS to Tailwind / styled-components / etc.
**Wait forever.** The current styling system is the moat — it's why theme + RTL + a11y modes coexist cleanly. Don't trade it for familiarity.

---

## 6. The 30-Day Plan

A concrete sequence. Each line is roughly one developer-day or less unless noted.

### Week 1 — Close the leaks
- [ ] Day 1: Wire contact form delivery (1.1).
- [ ] Day 1: Install Plausible / Cloudflare Web Analytics + base events (1.2).
- [ ] Day 2: Cal.com embed in Contact section (1.3).
- [ ] Day 2: Self-host fonts (1.5).
- [ ] Day 2: Lazy-load legal pages (1.6).
- [ ] Day 3: Tighten Hero subtitle (2.5).
- [ ] Day 3: Public GitHub + LinkedIn footer links (3.4).
- [x] Day 3–4: Add a real photo of Yuval to About section (3.1). *Completed 2026-05-11.*
- [ ] Day 4: WhatsApp pre-fill variants per CTA location (2.7).
- [ ] Day 5: Pricing-range microcopy under packages (2.4).
- [ ] Day 5: Reach out to Marzipan client for testimonial (2.1 — outreach only).

### Week 2 — Trust amplification
- [ ] Day 6–7: Real Marzipan case-study page (2.2).
- [ ] Day 8: Restructure Projects section: real-first (2.3).
- [ ] Day 9: Add concept-intent line under each concept project (3.5).
- [ ] Day 9: Add "How I'm different from an agency" section (3.2).
- [ ] Day 10: Add "FAQ: how do I know your code is good?" entry (3.6).
- [ ] Day 10: Add "max 3 projects per quarter" commitment line (3.7).

### Week 3 — Real testimonial + secondary trust
- [ ] Day 11–12: Land first real testimonial; add it to a new `Testimonials (real)` section above the work-standards section (2.1).
- [ ] Day 12: Hero secondary social-proof line ("Live work: Marzipan Bakery →") (2.6).
- [ ] Day 13: A/B contact-form progressive disclosure (2.8 — start the test).
- [ ] Day 14–15: Set up Google Search Console + sitemap + robots.txt (4.5, 4.6).

### Week 4 — Routing and SEO foundation
- [ ] Day 16–18: Migrate `useHashRoute` → `react-router-dom`; introduce `/he/` and `/en/` routes (4.1).
- [ ] Day 19–20: Per-page `<title>` / `<meta>` system + per-language canonical / hreflang (4.2).
- [ ] Day 21–22: First service detail page (`/services/web` or `/services/automation` — pick the one with most lead intent) (4.3).
- [ ] Day 23–25: Review week-4 metrics; rank week-5 priorities by what the data actually says.

### Week 4 success criteria
By the end of day 30, the site should:
- Deliver every contact-form submission to the operator's inbox within 60 seconds.
- Show real Plausible / CWA numbers for: pageviews, top pages, bounce rate, top events.
- Have at least one named, photographed client testimonial visible above the fold-equivalent on Contact.
- Have at least one real case-study page indexed in Google.
- Have `/he/` and `/en/` routes working with proper `<title>` per page.
- Be discoverable in Google Search Console with a submitted sitemap.

If three of those six are missing on day 30, the plan slipped — revisit the order, not the targets.

---

## 7. The 90-Day Plan

The 30-day plan closes leaks. The 90-day plan compounds.

### Days 31–60 — Content depth
- All 6 service detail pages live in HE + EN.
- 2 pillar journal posts published (HE + EN each).
- 3 active backlinks: respected blog feature, freelance directory, client footer credit.
- A second real case study (or a deeply-detailed in-progress one).
- Booked at least 5 discovery calls via the Cal.com embed.
- A/B winners from Hero copy and Contact form rolled into permanent state.

### Days 61–90 — Productize and amplify
- One **fixed-scope, fixed-price, fixed-timeline product** identified and packaged on its own page (likely candidate: bilingual landing-page sprint, or AI capability audit). This is the offer that can later run paid ads with predictable CAC.
- Initial paid-traffic experiment: ₪500–₪1500 over 2 weeks against the productized offer page only — never against the home page, never against generic services. Measure CAC and conversion-rate-per-channel. Decide based on data, not gut.
- Internal sales / discovery toolkit (Notion + Airtable + WhatsApp templates) so each lead from minute zero to signed proposal takes < 4 working hours of operator time.
- Storybook (or equivalent) for the component library — doubles as a portfolio piece for technical buyers.
- Playwright tests covering: full bilingual nav flow, theme switch, contact-form submit success path, accessibility-toolbar interactions.
- 3 named, photographed real testimonials. (Trust is the ceiling. Three lifts the ceiling.)

### 90-day success criteria
By end of day 90, the site should:
- Generate at least **8–12 qualified inbound contacts/month** (form + WhatsApp + email combined).
- Convert at least **15% of contacts to discovery calls**.
- Convert at least **30% of discovery calls to proposals**.
- Convert at least **35% of proposals to signed projects**.
- Rank top 5 in Google for at least one branded query and one service-specific Hebrew query.
- Have **2+ paying clients won during the 90 days** as a direct, attributable result of the site.

If those numbers come in within 50% of target, the plan works and the next 90-day window is about scaling, not fixing.

If they're significantly below — the bottleneck is almost certainly **traffic** (you fixed the funnel; now you need eyes on it). Flip strategy to: targeted outreach, partnership development, paid experiments on the productized offer.

If they're above target — the bottleneck is **delivery capacity**, and Stage 4 of the Master Blueprint (a second operator) becomes a live conversation.

---

## A note on prioritization

This plan assumes one operator with ~20–30 hours/week available for the brand site between client work. Adjust accordingly. If you have less time:

- **Drop in priority:** the 4.3 service-detail expansion and 4.7 pillar posts. They compound slowly anyway.
- **Never drop:** items 1.1–1.6 (the leak-closing list). Every day they stay open, you're losing real money to a broken funnel.
- **Never drop:** items 2.1 and 3.1 (real testimonial, real photo). These are the ceiling-lifters. Without them, every other improvement is rate-limited.

The brand has the right architecture, the right design quality, the right voice. What it needs now is operational closure: form that delivers, analytics that measures, real proof that compounds. Do those, and the site stops being a beautiful brochure and starts being a business.

---

## Completed actions

### 3.1 — About Yuval portrait *(completed 2026-05-11)*
A real founder portrait was added to the About section, replacing the imageless layout.

- **Files:** `public/yuvalImg-320.{webp,jpg}` and `public/yuvalImg-640.{webp,jpg}` — two widths, two formats, all under 28KB each (WebP variants under 16KB).
- **Markup:** `<picture>` with a `<source type="image/webp" srcSet>` and an `<img>` JPG fallback. Explicit `width`/`height` (640×640) on the `<img>` prevents CLS; `decoding="async"` and `fetchpriority="high"` reflect its role as a near-fold LCP candidate; no `loading="lazy"` (deliberate — the brief found the original lazy attribute was hurting About-section LCP).
- **CSS:** sized via `clamp(200px, 18vw, 260px)` desktop / `clamp(160px, 42vw, 200px)` mobile; uses `var(--radius-circle)`, `var(--shadow-md)`, `var(--color-border-strong)` — no hardcoded literals.
- **i18n:** alt copy lives at `about.portrait.alt` in `he.js` and `en.js` (HE: "יובל זכאי, מייסד יובל דיגיטל" · EN: "Yuval Zakai, founder of Yuval Digital"). Moves with the language switch.
- **Docs:** `MASTER_PROJECT_BLUEPRINT.md` Section 16 documents the image pipeline; Section 19's "no image pipeline" weakness has been replaced with a softer follow-up about lifting the pattern into a reusable component the next time it ships.

---

*End of NEXT_ACTION_PLAN.md*
