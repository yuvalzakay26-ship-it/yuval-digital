# MASTER PROJECT BLUEPRINT — yuval.digital

> **Document type:** Architectural & strategic source-of-truth
> **Owner:** Yuval Zakay (sole operator)
> **Stack signature:** React 18 · Vite 5 · token-driven CSS · bilingual HE/EN · light + dark · WCAG-AA aware
> **Status:** Phase 1 (production), pre-traffic, pre-paid-acquisition
> **Last fully reviewed:** 2026-05-04

---

## 1. Executive Summary

`yuval.digital` is the operational website and lead engine of a one-person Israeli digital studio. It is engineered as a single-page, hash-routed React application that *behaves* like a premium agency front while remaining a clean, scalable codebase underneath.

What sets it apart from a portfolio site:

- It is **bilingual at parity** — Hebrew is the default and primary, English is co-equal, both written natively (never machine-translated). RTL/LTR direction switches at runtime with zero layout debt because the entire styling system is built on logical CSS properties.
- It is **theme-bilingual** — light is the default, dark is a glow-accented premium variant. Both are first-class; every token has a value in both modes.
- It is **token-governed** — every color, spacing, radius, shadow, font size, and motion value lives in `src/styles/variables.css`. Components consume tokens, never literals. This is what allows theme/RTL flips to be instantaneous and predictable.
- It is **conversion-engineered** — the home page is not a "scroll of pretty sections", it is a deliberate funnel: Hero → soft CTA → Trust → Services → Packages → soft CTA → Process → Projects → Stack → Authority → Testimonials (work standards) → About → FAQ → strong CTA → Contact form.
- It is **legally compliant for the Israeli market** — accessibility statement, privacy policy, accessibility toolbar (5 text sizes + 5 vision modes), JSON-LD structured data, all wired in.

The site is currently **statically rendered with no backend**. The contact form is a UI-only flow that accepts input and shows a success state — actual submission delivery is not yet wired (this is Phase 4 work).

---

## 2. What This Project Is

A **production foundation** — not a portfolio template, not a draft, not a mock. It is the codebase that the brand's commercial presence runs on.

Concretely, this repository contains:

- **One public page** (`Home`) composed of ~13 sections, each a self-contained, i18n-aware React component.
- **Two legal pages** (`/page/privacy`, `/page/accessibility`) routed via a lightweight hash router (`useHashRoute`).
- **A reusable component library** (Button, Container, Logo, LanguageSwitcher, ThemeToggle, Reveal, Counter, DeviceMockup, CtaBanner, StickyMobileCta, WhatsAppFab, AccessibilityToolbar).
- **A token-driven design system** (CSS variables for color, spacing, type, motion, shadow, radius, z-index).
- **Three React Context providers** layered top-down: `ThemeProvider` → `LanguageProvider` → `A11yProvider`.
- **Two complete dictionaries** in `src/i18n/he.js` and `src/i18n/en.js`, each ~715 lines, covering every visible string.
- **Strategic documentation** in `docs/` covering brand, identity, services, projects, design system, SEO, content rules, future roadmap.

It is intentionally framework-light (no router lib, no UI library, no CSS framework, no state library) so that a single developer plus AI assistants can keep the entire surface in their head.

---

## 3. Business Purpose of the Website

The site exists to do five things, in priority order:

1. **Generate qualified inbound** — convert a stranger reading the hero into a contact-form submission, WhatsApp message, or phone call. Every section either builds intent or removes friction.
2. **Establish premium positioning** — the visual quality and writing quality of the site are themselves the proof. The site *is* the portfolio piece for a premium-tier service.
3. **Filter prospects** — packages, FAQ, and contact-form fields (project type, budget, timeline) pre-qualify leads so the operator only spends discovery time on plausible deals.
4. **Demonstrate technical capability** — bilingual parity, dark/light parity, accessibility toolbar, structured data, performance — every "nice-to-have" is in place because not having it would contradict the pitch.
5. **Comply with Israeli law** — accessibility (חוק שוויון זכויות לאנשים עם מוגבלות, ת"י 5568 AA) and privacy (חוק הגנת הפרטיות תשמ"א-1981) are both addressed with proper statements and a working accessibility toolbar.

The site does **not** try to:

- Educate (no blog yet)
- Build an audience (no newsletter capture)
- Sell at a fixed price (packages are positioned as "starting points", not price tags)
- Run paid acquisition (no analytics, no pixel, no campaign LP)

These are downstream phases (see Section 21).

---

## 4. Brand Identity & Positioning

### Brand promise
> *"I build real digital solutions, with full attention and uncompromising care."*

### Positioning statement
A focused **one-builder studio** for SMB founders and operators who want a serious, modern digital presence without the over-priced agency overhead. The promise isn't legacy or scale — it's **full attention, honest communication, modern tools, and quality work that speaks for itself.**

### Voice
- Honest (no inflated history, concept work labeled clearly)
- Direct (no buzzwords, no filler)
- Confident, not arrogant (authority comes from the work)
- Bilingual-native (HE and EN written separately, not translated)
- Warm (this is a personal builder brand, not a faceless agency)

### Visual identity
- **Wordmark:** `YUVAL.digital` — bold uppercase root, lowercase suffix.
- **Mark:** stylized chevron-Y in a soft rounded square with a blue-to-violet gradient.
- **Accent gradient:** `#2563eb → #7c3aed` (electric blue to violet).
- **Light theme:** white canvas, deep ink text, electric blue accent — communicates clarity.
- **Dark theme:** ink-black canvas, violet/blue glow — communicates premium technical depth.

### Trust posture
The brand replaces fake credibility (made-up testimonials, inflated years of experience) with **standards-based credibility**: the Testimonials section is named "What to expect when working with me" and presents work standards as commitments, not quotes. Concept projects are clearly labeled as concepts. Real projects (currently `marzipan-bakery.vercel.app`, `yuval.digital` itself) are flagged distinctly. This is a deliberate, defensible posture.

---

## 5. Target Audience

Three concrete segments, in order of acquisition priority:

1. **Small and medium Israeli businesses** that need a modern website, landing page, or a small internal system, and that value working with a real person (not an account manager). Sectors observed in the projects/concepts: bakeries, clinics, restaurants, service businesses, marketing campaigns.
2. **Founders launching new ventures** who need a polished launch presence in Hebrew and (often) English.
3. **Owner-operators with an existing site** who want a thoughtful refresh of UX, mobile, performance, or forms — without rebuilding from zero (this is what the "presence upgrade" service exists for).

Bilingual posture lets the brand also serve **Israeli companies with international reach** — clients whose end-customers read English while internal stakeholders read Hebrew.

---

## 6. Conversion Goals

The Home page funnel is engineered around four conversion micro-actions, in escalating commitment:

| Tier | Action | Channel | Friction |
|------|--------|---------|----------|
| Tier 1 | WhatsApp click | `WHATSAPP_HREF` (FAB, sticky bar, Hero CTA, Contact direct cards) | Lowest — opens chat with a pre-filled Hebrew greeting |
| Tier 2 | Phone tap | `PHONE_HREF` (sticky bar, Contact direct cards, footer) | Low — `tel:` link, mobile-native |
| Tier 3 | Email | `EMAIL_HREF` (Contact, footer) | Medium — requires writing |
| Tier 4 | Contact form | `#contact` form with 8 fields, 4 of them optional pre-qualifiers | Highest commitment, highest signal |

The form deliberately collects **business type, project type, budget range, and timeline** — turning every form submission into a pre-qualified discovery doc.

There are **three CTA banners** (`afterHero`, `afterPackages`, `beforeFooter`) interleaved with content sections so a reader who is "ready to buy" never has to scroll back to find the action.

A **mobile-only sticky bottom bar** appears after 480px of scroll (and disappears when the contact section enters the viewport at 60% threshold) with three native-weight tap targets: Call, WhatsApp, Form.

A **WhatsApp FAB** sits persistent on every viewport.

---

## 7. Full Tech Stack

### Runtime
- **React 18.3.1** (StrictMode enabled in `main.jsx`).
- **No router library.** A custom `useHashRoute` hook listens to `hashchange`/`popstate` and only intercepts hashes starting with `#/`. Section anchors (`#services`, `#contact`) keep working as native scroll targets — only `#/page/...` hashes route to a different page.

### Build & tooling
- **Vite 5.3.1** with `@vitejs/plugin-react`.
- **ES2020** build target; no source maps in production; CSS code-splitting on; chunk-size warning at 1MB.
- **Path aliases** for every meaningful folder: `@`, `@components`, `@sections`, `@pages`, `@layout`, `@styles`, `@hooks`, `@utils`, `@data`, `@i18n`, `@theme`, `@assets`, `@a11y`. This is a real productivity win when refactoring — no relative-path archaeology.
- **ESLint** with `eslint-plugin-react`, `react-hooks`, `react-refresh`. `--max-warnings 0` (a warning is a failure).
- **Node ≥ 18.17.0** declared in `engines`.

### Styling
- **Vanilla CSS** with custom properties — **no preprocessor, no PostCSS plugin, no Tailwind, no CSS-in-JS, no styled-components.** This is a deliberate constraint that pays back in clarity and bundle size.
- **BEM** class naming throughout (`block__element--modifier`).
- **Logical properties** (`inset-inline-*`, `padding-inline`, `margin-inline`) for direction-safe layout.
- **One CSS file per component**, colocated next to the JSX file, imported directly from the component.

### Fonts
Google-hosted (with `preconnect` for performance):
- **Heebo** — primary Hebrew face, weights 300–900.
- **Inter** — primary English face, weights 300–900.
- **Rubik, Assistant** — Hebrew fallbacks.

The font family is selected at runtime via `[dir='rtl']` / `[dir='ltr']` rules so the active language gets the right face automatically.

### Persistence
Three localStorage keys, all namespaced:
- `yuval-digital:theme` — `"light" | "dark"`
- `yuval-digital:lang` — `"he" | "en"`
- `yuvaldigital:a11y:v1` — JSON of `{ textSize, contrast, grayscale, underlineLinks, readableFont, pauseAnimations }`

### What is NOT in the stack
This is as important as what is:
- ❌ No router library (intentional — hash router is enough for current scope)
- ❌ No state library (Context + local state is enough)
- ❌ No UI/component library
- ❌ No CSS framework
- ❌ No analytics, tag manager, or marketing pixel
- ❌ No backend, no API, no database
- ❌ No auth, no client portal
- ❌ No CMS — content lives in `src/i18n/{he,en}.js`
- ❌ No tests (yet)
- ❌ No CI/CD pipeline visible in repo

---

## 8. Folder Structure (Deep)

```
yuval-digital/
├─ public/                     # static assets served at /
├─ docs/                       # strategic & brand documentation (read by humans + AI)
│  ├─ brand.md                 # promise, positioning, voice, audience
│  ├─ content-rules.md         # vocabulary, tone, structural patterns
│  ├─ design-system.md         # tokens, components, conventions
│  ├─ future-roadmap.md        # Phase 2 → Phase 6
│  ├─ identity.md              # who Yuval is and how he works
│  ├─ pages.md                 # site architecture and quality bar
│  ├─ projects.md              # showcase strategy, real-vs-concept policy
│  ├─ seo.md                   # strategy, keywords, on-page foundations
│  └─ services.md              # master service catalog
│
├─ src/
│  ├─ a11y/
│  │  └─ A11yProvider.jsx      # context: textSize + 5 boolean toggles, persisted
│  │
│  ├─ assets/                  # currently empty bucket; reserved for static media
│  │
│  ├─ components/              # reusable atoms (no business knowledge)
│  │  ├─ AccessibilityToolbar  # FAB + side panel: 5 sizes, 5 modes, reset, statement link
│  │  ├─ Button                # variants: primary | gradient | ghost | soft | quiet
│  │  ├─ Container             # max-width 1240px, fluid horizontal padding
│  │  ├─ Counter               # animated number ticker for metrics
│  │  ├─ CtaBanner             # interleaved conversion banners (afterHero/afterPackages/beforeFooter)
│  │  ├─ DeviceMockup          # browser + phone shell for project cards
│  │  ├─ LanguageSwitcher      # animated HE↔EN pill
│  │  ├─ Logo                  # wordmark + chevron-Y mark, drawer/full variants
│  │  ├─ Reveal                # IntersectionObserver-driven reveal wrapper
│  │  ├─ StickyMobileCta       # mobile-only bottom bar (Call/WA/Form)
│  │  ├─ ThemeToggle           # animated sliding pill, mirrors RTL
│  │  ├─ WhatsAppFab           # persistent floating WhatsApp button
│  │  └─ mockups/              # per-project SVG mockup components
│  │
│  ├─ data/                    # plain JS data modules (no React)
│  │  ├─ contact.js            # EMAIL, PHONE_*, WHATSAPP_HREF — single source of truth
│  │  ├─ nav.js                # nav links keyed by i18n path
│  │  ├─ projects.js           # projectVisuals (glow + accent colors)
│  │  ├─ services.jsx          # serviceIcons by id (JSX because of SVG)
│  │  └─ trust.jsx             # trustIcons by id (JSX because of SVG)
│  │
│  ├─ hooks/                   # custom hooks
│  │  ├─ useA11y.js            # consume A11yContext
│  │  ├─ useHashRoute.js       # custom hash router (only #/ paths intercept)
│  │  ├─ useLanguage.js        # consume LanguageContext
│  │  ├─ useReveal.js          # IntersectionObserver wrapper, once-only by default
│  │  ├─ useScrollProgress.js  # boolean: scrolled past N pixels (for navbar scroll state)
│  │  └─ useTheme.js           # consume ThemeContext
│  │
│  ├─ i18n/
│  │  ├─ en.js                 # English dictionary (~716 lines)
│  │  ├─ he.js                 # Hebrew dictionary (~715 lines, primary)
│  │  ├─ index.js              # locales registry + translate(dict, "dot.path")
│  │  └─ LanguageProvider.jsx  # context + <html lang/dir> sync + persistence
│  │
│  ├─ layout/                  # global chrome
│  │  ├─ AppShell.jsx          # skip link + Navbar + main + Footer + floating UI
│  │  ├─ Footer.jsx            # nav + contact + transparency line + legal links
│  │  └─ Navbar.jsx            # sticky bar + mobile drawer (with full a11y wiring)
│  │
│  ├─ pages/
│  │  ├─ AccessibilityStatement.jsx  # /page/accessibility — Israeli a11y law text
│  │  ├─ Home.jsx              # composes the 13-section funnel
│  │  ├─ LegalPage.css         # shared styling for legal pages
│  │  ├─ LegalPage.jsx         # shared shell for accessibility + privacy pages
│  │  └─ PrivacyPolicy.jsx     # /page/privacy — Israeli privacy law text
│  │
│  ├─ sections/                # composable home-page sections
│  │  ├─ About                 # personal positioning + 3 pillars
│  │  ├─ Authority             # "why work with me now" — 6 differentiators
│  │  ├─ Contact               # 8-field form + 3 direct-channel cards
│  │  ├─ Faq                   # accordion with 8 entries
│  │  ├─ Hero                  # title, subtitle, dual CTAs, microtrust, animated metrics
│  │  ├─ Packages              # Starter / Growth (highlighted) / Custom Premium
│  │  ├─ Process               # 5-step rail with index badges
│  │  ├─ Projects              # featured + concept grid w/ device mockups
│  │  ├─ Services              # 6-card grid
│  │  ├─ Stack                 # frontend / workflow / quality groups
│  │  ├─ Testimonials          # work standards (anti-fake-testimonial pattern)
│  │  └─ Trust                 # 6 honest strengths
│  │
│  ├─ styles/
│  │  ├─ a11y.css              # accessibility toolbar effect implementations
│  │  ├─ animations.css        # global keyframes (anim-fade-up/down, gradientShift)
│  │  ├─ globals.css           # body/headings/section/eyebrow/surface/skip-link
│  │  ├─ reset.css             # modern CSS reset
│  │  └─ variables.css         # 🔑 ALL design tokens — single source of truth
│  │
│  ├─ theme/
│  │  ├─ ThemeProvider.jsx     # data-theme on <html> + meta theme-color sync
│  │  └─ tokens.js             # JS mirror of CSS tokens (for canvas/charts/etc.)
│  │
│  ├─ utils/
│  │  └─ cn.js                 # conditional classnames helper
│  │
│  ├─ App.jsx                  # AppShell + hash-route page resolver
│  └─ main.jsx                 # provider stack + global CSS imports
│
├─ index.html                  # <html lang="he" dir="rtl" data-theme="light"> + 3 JSON-LD blocks
├─ package.json                # React 18 + Vite 5 + ESLint
├─ README.md                   # contributor on-ramp
└─ vite.config.js              # path aliases + dev server + build flags
```

### Why this structure works

- **`sections/` vs `components/`** is a load-bearing distinction. `components/` are atoms reusable in any context; `sections/` are page-specific compositions that consume the i18n dictionary directly. A new section copies the shape of an existing one (eyebrow → title → lead → grid of Reveal-wrapped cards).
- **`data/` is plain JS** — never JSX-only — so it can be imported into any context, including future SSR or build-time scripts. Where icons need to ship with data, the file uses `.jsx` (`services.jsx`, `trust.jsx`) and exports `{ id: <SVG/> }` icon maps.
- **`i18n/` is decoupled from React** — `index.js` exports pure functions (`getLocale`, `translate`); `LanguageProvider.jsx` is the only React-aware piece. This means a Node script could import the dictionary for build-time SEO generation later.
- **`theme/tokens.js` exists alongside CSS variables** — for future canvas/chart components that need values in JS without parsing computed styles. CSS remains the runtime source of truth.

---

## 9. Pages & Sections (Every One Explained)

### Page: `Home`

The home page is a deliberate **conversion ladder**, not a list of pretty sections. It is documented inline in `src/pages/Home.jsx`:

```
Hero → CTA(soft) → Trust → Services → Packages → CTA(soft) → Process → Projects → Stack → Authority → Testimonials → About → Faq → CTA(strong) → Contact
```

Three CTA banners split the funnel into psychologically meaningful chapters:

- **Banner 1 (`afterHero`, soft):** the reader is hot from the hero — give them an offramp before they get distracted.
- **Banner 2 (`afterPackages`, soft):** indecision is the enemy here — most readers know they need *something* but aren't sure which package; this is the "let's figure it out together" banner.
- **Banner 3 (`beforeFooter`, strong):** last-chance push before the form. Tone shifts to confident: "you've seen everything, now write."

#### Section: `Hero`
- Animated radial-orb backdrop, grid texture, noise overlay (all CSS — no images).
- Animated badge with pulsing dot.
- Eyebrow → split title (lead + gradient highlight) → subtitle → dual CTAs (gradient + ghost) → microtrust pulse line → 3 animated `<Counter>` metrics (24h response, 100% custom code, 2 working languages) → scroll hint.
- Single `<h1>` on the page.

#### Section: `Trust`
6 cards naming honest strengths instead of fake metrics. Items are keyed (`honesty`, `learning`, `tools`, `attention`, `motivation`, `quality`) and each maps to a custom SVG icon in `data/trust.jsx`.

#### Section: `Services`
6 service cards — Web, Landing, Automation, AI content systems, Internal tools, Presence upgrade. Each card has a description + 4 bullets. Icons in `data/services.jsx`.

#### Section: `Packages`
3 starting-point packages — Starter / Growth (highlighted with a badge) / Custom Premium. **No prices** — packages are framed as conversation openers, not menu items. Tagline + "Suitable for" + "Deliverables" list + CTA per card. The middle plan uses the gradient CTA variant.

#### Section: `Process`
5-step rail (Discovery → Strategy → Build → Launch → Growth) rendered as numbered nodes connected by a vertical line. Each node has a pulse ring and reveal-staggered animation.

#### Section: `Projects`
Featured + grid pattern. The featured card (currently the Marzipan bakery — a real production project) gets a wide layout with both a browser-mockup desktop preview and a phone-mockup preview (rendered via `DeviceMockup` + per-project mockup components in `components/mockups/`). The grid below shows real and concept projects, with a clear `realLabel` / `conceptLabel` chip on each — this is the **anti-fakery** posture.

Final inline mini-CTA at section bottom: "Want to be the next success story?"

#### Section: `Stack`
3 groups (frontend, workflow, quality) of named tools each with a one-line hint. Translates to "what I work with daily" without becoming a brag list.

#### Section: `Authority`
6 differentiators ("why work with me *now*"): direct contact, modern tools, transparent process, bilingual service, attention to detail, growth mindset.

#### Section: `Testimonials`
**Renamed in HE/EN to "What to expect when working with me"** — instead of fake quotes, four work standards are listed as **commitments**: transparency, plan-first thinking, polished delivery, bilingual quality. This is one of the most defensible patterns in the site: it sells trust without lying.

#### Section: `About`
Eyebrow + title + 2-paragraph body + 3 pillars (orderly process, availability, custom solution).

#### Section: `Faq`
8 collapsible items covering the 8 most-asked questions: timeline, starting small, mobile, post-launch additions, working with small businesses, pricing model, after-launch support, refresh of existing site.

The first item is open by default. Inline CTA at the bottom: "Have a different question? Let's talk."

#### Section: `Contact`
The conversion-critical section. Two columns (collapsing to one on mobile):

**Left column (lede):**
- Eyebrow → title → subtitle → "prefer to talk?" microcopy → reassurance line ("same-day reply · directly with me · no commitment") → 3 direct cards (WhatsApp green, Phone, Email).

**Right column (form, in a `surface` card):**
- Trust strip at top (3 mini-icons: reply / personal / fitted to your business).
- 8 fields: name (required), email (required, LTR), phone (optional, LTR, tel:), business type (optional), project type (select with 7 options), budget range (select with 6 ranges in shekels), timeline (select with 4 options), message (required, textarea).
- Privacy consent line linking to `#/page/privacy`.
- Submit button shows response-time line ("most messages get same-day reply") and a gradient CTA.

On submit (currently UI-only) the form swaps for a success card with check icon, copy, and two fallback channels.

### Pages: `AccessibilityStatement`, `PrivacyPolicy`

Both rendered through a shared `LegalPage.jsx` shell. Content lives in the dictionary under `a11y.statement` and `a11y.privacy`. Both are written natively in Hebrew and reference the actual Israeli laws (חוק שוויון זכויות לאנשים עם מוגבלות התשנ"ח-1998, ת"י 5568 AA, חוק הגנת הפרטיות תשמ"א-1981). They are linked from the footer and from the accessibility toolbar.

---

## 10. Components Breakdown

### Atomic / structural
- **`Container`** — width-constrained well at `--container-max: 1240px` with fluid horizontal padding.
- **`Button`** — `as`-polymorphic (`<button>` or `<a>`), variants (`primary`, `gradient`, `ghost`, `soft`, `quiet`), sizes (`sm`, `md`, `lg`), `iconStart` / `iconEnd` slots that auto-mirror in RTL.
- **`Logo`** — wordmark + chevron-Y SVG mark; `variant="drawer"` mode for the mobile drawer.
- **`Counter`** — animates a number from 0 to its target; used in Hero metrics.
- **`Reveal`** — IntersectionObserver wrapper that adds `reveal--in` once on viewport entry. `variant` controls direction; `delay` staggers groups. Falls back to immediate reveal if IO is unavailable.

### Brand / control
- **`LanguageSwitcher`** — two-state pill, animates indicator between HE and EN; toggles `<html lang>` and `<html dir>`.
- **`ThemeToggle`** — sliding-pill toggle, mirrors in RTL, also updates `<meta name="theme-color">` so mobile chrome matches.

### Conversion / floating
- **`WhatsAppFab`** — persistent floating WhatsApp button, opens chat with pre-filled greeting.
- **`StickyMobileCta`** — mobile-only sticky bottom bar (Call · WhatsApp · Form). Visible only after 480px scroll, hidden when contact section is in view (60% threshold). Implemented with manual scroll listener.
- **`CtaBanner`** — interleaved conversion banner; reads tone (`soft|strong`) and variant (`afterHero|afterPackages|beforeFooter`) for copy + styling.
- **`AccessibilityToolbar`** — floating FAB + side panel; controls 5 text sizes (sm/md/lg/xl/xxl) and 5 boolean modes (contrast, grayscale, underlineLinks, readableFont, pauseAnimations); each setting maps to a `data-a11y-*` attribute on `<html>` consumed by `styles/a11y.css`.

### Content presenters
- **`DeviceMockup`** — browser + phone chrome wrapper for project mockups; the mockup body is supplied as children.
- **`mockups/*`** — per-project SVG/HTML mockup components rendered into `DeviceMockup`.

### Critical implementation notes
- `<AccessibilityToolbar>`, `<WhatsAppFab>`, `<StickyMobileCta>` are mounted in `AppShell` **outside** `.app-shell__content`. This is intentional — the grayscale a11y filter on the wrapper would create a containing block and break `position: fixed` for those elements. There is a comment in `AppShell.jsx` flagging this.
- The Navbar drawer scrim and `<aside>` are mounted **outside** the `<header>` for the same reason — `backdrop-filter` on the navbar establishes a containing block that would otherwise size the drawer to the navbar height.

---

## 11. Hooks & State Management

### Provider stack
```jsx
<ThemeProvider>
  <LanguageProvider>
    <A11yProvider>
      <App />
    </A11yProvider>
  </LanguageProvider>
</ThemeProvider>
```

Theme is outermost so `LanguageProvider` can read `LANG_STORAGE_KEY` from `theme/tokens.js` (this is a slightly awkward coupling — see Weakness 20).

### Hooks
| Hook | Purpose | Source of truth |
|------|---------|-----------------|
| `useTheme()` | `{ theme, isDark, setTheme, toggleTheme }` | `data-theme` attr on `<html>` + localStorage |
| `useLanguage()` | `{ locale, dir, isRtl, dict, t, setLocale, toggleLocale, available }` | `lang`/`dir` on `<html>` + localStorage |
| `useA11y()` | `{ settings, textSizes, setTextSize, adjustTextSize, toggle, reset, isDefault }` | `data-a11y-*` attrs on `<html>` + localStorage |
| `useReveal({threshold, rootMargin, once})` | `{ ref, revealed }` | IntersectionObserver |
| `useScrollProgress(threshold)` | `{ scrolled }` | `window.scrollY` |
| `useHashRoute()` | current `#/...` route, defaults to `/` | `window.location.hash` |

### State posture
There is **no global app store**. Every piece of state has a clear scope:
- Cross-cutting UI prefs (theme/language/a11y) — Context.
- Page-level state (which FAQ is open, contact-form submitted, mobile menu open) — local `useState`.
- DOM-driven state (scroll position, intersection) — custom hooks listening to browser events.

This is correct for the current scope. Adding Redux/Zustand here would be over-engineering.

---

## 12. Styling System

### Architecture
- **One stylesheet per component**, colocated next to the JSX file.
- **Five global stylesheets** loaded in order in `main.jsx`:
  1. `reset.css` — modern reset
  2. `variables.css` — design tokens (the single source of truth)
  3. `globals.css` — body, headings, container, section, eyebrow, surface, focus ring, skip link, scrollbar
  4. `animations.css` — keyframes (`anim-fade-up`, `anim-fade-down`, `gradientShift`, etc.)
  5. `a11y.css` — implementations of the 5 a11y toggles via `data-a11y-*` attribute selectors

### BEM
Every component CSS file follows BEM: `.block`, `.block__element`, `.block--modifier`, `.block__element--modifier`. This is enforced socially (no linter rule yet) but consistent across the codebase.

### Tokens
**Every** color, spacing value, radius, shadow, font size, line-height, letter-spacing, easing, and duration is a CSS variable. Hardcoded literals in component CSS are a code smell except for one-off computed values (e.g. project glow colors, where the value is per-instance and supplied as an inline `--card-glow`).

### Direction-safe layout
The codebase uses CSS logical properties throughout:
- `inset-inline-start` / `inset-inline-end` instead of `left`/`right`
- `padding-inline` / `margin-inline` instead of `padding-left`/`right`
- `border-inline-start` / `border-inline-end`

This is what allows RTL/LTR to flip without component-level conditionals.

### Reset
`reset.css` (not shown in detail above) applies a modern reset — `box-sizing: border-box`, list reset, image reset, button reset, etc.

---

## 13. Theme System

### Mechanism
- `ThemeProvider` reads `localStorage["yuval-digital:theme"]`, defaulting to `"light"`.
- On change, sets `<html data-theme="light|dark">` and updates `<meta name="theme-color">` to match (`#ffffff` for light, `#07090f` for dark) so iOS/Android browser chrome matches the page.
- `[data-theme='dark']` in `variables.css` redefines every relevant color, shadow, and gradient token. Components don't know which theme is active — they consume the same token names.

### Light theme (default)
White canvas, deep ink text (`#0a0d14`), electric blue accent (`#2563eb`), soft layered shadows. Communicates clarity and openness on first load.

### Dark theme
Ink-black canvas (`#07090f`), violet/blue glow shadows, softened blue accent (`#60a5fa`) for contrast. Communicates technical depth.

### Notable
- The `--gradient-text` (used for hero title highlight) is theme-aware — it morphs from `#0a0d14 → #2563eb` in light to `#ffffff → #60a5fa` in dark to maintain contrast.
- `::selection` is theme-aware.
- Body has a transition between themes so the flip is smooth instead of jarring.

---

## 14. RTL / Multilingual System

### Mechanism
- `LanguageProvider` reads `localStorage["yuval-digital:lang"]`, defaulting to `"he"`.
- On change, sets `<html lang="he|en" dir="rtl|ltr">`.
- Components consume strings via `t("dotted.path")` from `useLanguage()`.
- `getLocale(code)` falls back to default; `translate(dict, path)` falls back to default locale, then to the path itself (so a missing key surfaces as the path string instead of crashing).

### Native bilingual posture
- `src/i18n/he.js` is **the primary content source**, written first.
- `src/i18n/en.js` is **an equal-quality companion**, written natively (not translated). The two files are roughly the same length (715 vs 716 lines) which is itself a quality signal.
- Phone numbers, email addresses, and URLs are written in LTR explicitly via `dir="ltr"` on the wrapping span — this prevents RTL bidirectional reordering from breaking format.

### Direction-safe components
- Arrow icons in CTAs use `transform: scaleX(-1)` in RTL (handled in component CSS).
- Toggles (theme, language) translate the indicator pill by direction-correct logical properties.
- The mobile drawer slides in from the inline-start (which is right in HE, left in EN).

### Adding a third language (mechanism is ready)
1. Create `src/i18n/xx.js` mirroring the schema of `he.js`/`en.js`.
2. Register it in `src/i18n/index.js` (`locales`, `localeOrder`, `meta.dir`).
3. Replace the binary `LanguageSwitcher` with a dropdown.
4. Add a font for the new script via `index.html` and `variables.css` (`--font-sans-xx`).

---

## 15. Accessibility System

### Built-in (passive)
- Every interactive element has a visible **focus ring** (`box-shadow: 0 0 0 3px var(--color-bg), 0 0 0 5px var(--color-accent)` — outer ring is the bg color so the inner ring "floats" cleanly off any surface).
- **Skip link** at the top of `AppShell` (`#main` target) appears on focus.
- **`<main id="main" tabIndex="-1">`** so the skip link can move focus.
- **Semantic HTML** — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- **ARIA wiring** on toggles (`aria-pressed`), accordion (`aria-expanded`, `aria-controls`), drawer (`role="dialog"`, `aria-modal="true"`, `aria-hidden`), accessibility panel (`role="dialog"`, `aria-controls`, `aria-labelledby`).
- **`prefers-reduced-motion: reduce`** disables all animations and transitions globally.
- **Color contrast** — both themes target WCAG AA at minimum.
- **`text-wrap: balance` / `pretty`** on headings/paragraphs for readable line breaks.

### Active (toolbar)
The `AccessibilityToolbar` exposes a floating FAB (label `"תפריט נגישות"`) → side panel with:
- **5 text sizes:** sm / md (default) / lg / xl / xxl, controlled via `data-a11y-text` attribute on `<html>`.
- **5 mode toggles:**
  - `contrast` — high-contrast palette override
  - `grayscale` — `filter: grayscale(1)` on the content wrapper
  - `underlineLinks` — forces underline on every `<a>`
  - `readableFont` — switches to a dyslexia-friendly font
  - `pauseAnimations` — disables all animations and transitions

Every toggle persists in `localStorage["yuvaldigital:a11y:v1"]`. Reset button restores defaults. Statement link routes to `#/page/accessibility`.

### Legal compliance (Israeli)
The accessibility statement explicitly references:
- **חוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998**
- **תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013**
- **ת"י 5568 ברמת AA**
- **WCAG 2.1 ברמת AA**

Contact info for a11y issues is provided in the statement.

---

## 16. Performance Decisions

### Implemented
- **Self-contained build** — no external runtime dependencies past React + ReactDOM.
- **Hero visuals are pure CSS** (radial gradients, conic gradient, noise via SVG) — zero network requests above the fold.
- **`overflow-x: clip`** instead of `hidden` on `html, body` — prevents horizontal scroll without establishing a scroll container, so `position: sticky` on the navbar still works.
- **`scroll-margin-top`** on every `section[id]` so anchor scrolls don't hide behind the sticky navbar.
- **CSS code-splitting** is enabled (`cssCodeSplit: true` in `vite.config.js`).
- **Font preconnect** (`fonts.googleapis.com`, `fonts.gstatic.com`) before the stylesheet link.
- **Passive scroll listeners** on the navbar scroll-state hook and the sticky CTA visibility logic.
- **IntersectionObserver-driven reveals** — once an element is visible, the observer disconnects (`once: true` is the default), so the reveal cost is paid once per element.
- **`transition` / `animation` only on transform + opacity** in most components — these run on the compositor.

### Not yet implemented
- ❌ No image optimization pipeline (no images currently used above the fold; project mockups are SVG/CSS).
- ❌ Fonts are Google-hosted, not self-hosted with `font-display: swap`.
- ❌ No route-level code splitting (`useHashRoute` doesn't lazy-load — it imports both legal pages eagerly).
- ❌ No Lighthouse / Core Web Vitals telemetry yet.
- ❌ No service worker / offline cache.

---

## 17. SEO System

### Static (in `index.html`)
- **`<title>` and `<meta name="description">`** are Hebrew (the default language) and oriented around premium-business intent.
- **`<meta name="keywords">`** — populated, despite Google ignoring it; serves as a content scaffold.
- **`<meta name="robots" content="index, follow, max-image-preview:large">`**.
- **Canonical link** to `https://yuval.digital/`.
- **`hreflang`** alternates: `he` → `/`, `en` → `/?lang=en`, `x-default` → `/`. (Note: query-string locale is a Phase 1 stopgap; Phase 2 will introduce `/he/` and `/en/` prefixes.)
- **OG and Twitter** meta tags, with `og:locale=he_IL` and `og:locale:alternate=en_US`.
- **Three JSON-LD blocks** in `<head>`:
  - `Person` — Yuval as a person (name, URL, contact, languages, areas of expertise).
  - `ProfessionalService` — yuval.digital as a service (offers catalog with Starter/Growth/Custom Premium).
  - `FAQPage` — five canonical Q&As mirroring the FAQ section copy.

### Dynamic (runtime)
- `<html lang>` and `<html dir>` are set by `LanguageProvider` based on the active language.
- `<meta name="theme-color">` is updated by `ThemeProvider` to match the theme.

### What's missing (Phase 2)
- Per-page `<title>` / `<meta>` (legal pages currently inherit the home meta).
- Sitemap + robots.txt automation at build time.
- Per-language URL paths (currently only one URL exists).
- No analytics (deliberate — privacy posture is "no third-party trackers").

---

## 18. Current Strengths

1. **Architectural clarity.** A new contributor can read the whole `src/` tree in 30 minutes and have an accurate model. Folder semantics are unambiguous (atoms vs sections, data vs hooks vs i18n vs styles).
2. **Token discipline.** Every visual decision lives in `variables.css`. No literal colors in component CSS. This is what makes theme + RTL + a11y modes coexist without bugs.
3. **True bilingual parity.** Two ~715-line dictionaries written natively. RTL/LTR flips at runtime cleanly. Date, phone, email all `dir="ltr"`-fenced where needed.
4. **Honest brand posture.** "Testimonials = work standards", "concept" labels on conceptual projects, no fake metrics, transparency line in the footer. This is hard to fake and hard to copy.
5. **Conversion-engineered home page.** Three CTA banners, mobile sticky bar, WhatsApp FAB, three direct channels in Contact, pre-qualifying form fields. The funnel is real.
6. **Accessibility goes beyond compliance.** 5 text sizes + 5 vision modes + reduced-motion respect + skip link + focus rings + Israeli legal statement. This is materially better than 95% of competitor sites.
7. **Premium visual quality without imagery.** All hero/section visuals are CSS-generated — no stock photos, no slow-loading hero images, instant first paint.
8. **Honest pricing posture.** Packages have no fixed price; they are positioned as conversation starters. This filters tire-kickers and protects margin.
9. **Documentation discipline.** `docs/` already contains 9 strategic files. This blueprint, working-rules, and action-plan complete the trio for any future maintainer or AI agent.
10. **No tech debt from dependencies.** Two runtime deps (React, ReactDOM). Updating tomorrow won't break a chain of UI library re-exports.

---

## 19. Current Weaknesses

1. **Form does not actually submit.** `Contact.jsx`'s `handleSubmit` just calls `setSubmitted(true)`. There is no backend, no email pipeline, no CRM hook. This is the single biggest gap between "looks like an agency site" and "operates like one". (See Phase 4.)
2. **No analytics, no attribution.** Every WhatsApp click, phone tap, and form view is invisible. This means no data-driven iteration is possible. A privacy-friendly tool (Plausible, Cloudflare Web Analytics, Vercel Analytics) is the obvious next install.
3. **Single-page route surface.** Legal pages aside, every section is on one URL. SEO can only rank one canonical document for whatever query. Per-service and per-project pages would multiply ranking surface.
4. **Per-language URL strategy is a stopgap.** `?lang=en` is the placeholder hreflang; `/en/...` paths don't exist. Google can index this, but it's not optimal.
5. **No real testimonials.** This is *intentional* (the brand is new and honesty is a pillar), but it is also a conversion ceiling. Even one named, photographed real client testimonial would lift the page meaningfully.
6. **Concept projects outnumber real ones.** Projects shows 1 real (Marzipan) + 1 personal (yuval.digital) + 3 concepts. The ratio is skewed toward concepts for a brand that wants premium positioning.
7. **No tests.** Zero unit, zero integration, zero e2e. With a single-developer codebase that's defensible today, but every refactor is currently uninsured.
8. **No CI/CD pipeline visible.** No GitHub Actions, no Vercel/Netlify config in repo. Deployment is presumably manual.
9. **Fonts are Google-hosted.** Adds two preconnects, two extra DNS round-trips. A self-hosted Heebo + Inter pair with `font-display: swap` would shave LCP.
10. **No image pipeline.** When real client logos / photos arrive, there's no AVIF/WebP conversion or `<picture>` strategy. This will need to exist before any branded media is added.
11. **Hash-router loads both legal pages eagerly.** `App.jsx` imports both `AccessibilityStatement` and `PrivacyPolicy` at top level. They're small, but it's a free wins-easy refactor (`React.lazy`).
12. **`LANG_STORAGE_KEY` lives in `theme/tokens.js`.** Cross-domain coupling — language storage key inside the theme module. Should move to `i18n/`.
13. **Provider order coupling.** `LanguageProvider` imports from `@theme/tokens.js`, so `ThemeProvider` must be outer. If a maintainer reorders providers blindly, language storage breaks silently. The dependency should be inverted.
14. **No environment configuration.** `EMAIL`, `PHONE_*`, `WHATSAPP_HREF` are hardcoded in `data/contact.js`. A staging vs production split (e.g., a sandbox WhatsApp number for testing) would require code changes.
15. **No structured-data per-page.** All three JSON-LD blocks live in `index.html` and apply to every page. The legal pages technically inherit the FAQPage schema, which is wrong.
16. **`<meta name="description">` is static.** When language switches at runtime, the description doesn't change to match. A `<title>` / `<meta>` updater hook in `LanguageProvider` would fix this.
17. **No newsletter or content capture.** Every visitor either contacts now or leaves forever. There's no slow-burn nurture path.
18. **No public scheduling.** Discovery calls require a back-and-forth. A Cal.com / Savvycal embed would close the "let's set a time" loop in one click.
19. **No real-project case-study pages.** Marzipan deserves a dedicated case study with screenshots, decisions, before/after, business outcome — currently it's a card on the home page.
20. **No performance budget enforced.** Lighthouse hasn't been integrated; there's no CI check that prevents a regression.

---

## 20. Known Issues

These are concrete bugs / friction items that warrant a one-line fix:

1. **`grayscale` toolbar mode + fixed positioning conflict** — handled (see comment in `AppShell.jsx`), but worth a regression test if any new fixed/floating element is added.
2. **Mobile drawer scrim mounting** — must remain outside `<header>` because of `backdrop-filter` containing-block effect. A future maintainer removing the comment could re-introduce the bug.
3. **Hash-routed pages don't reset scroll on route change.** Navigating from a deep scroll position to `#/page/privacy` keeps the same scroll. A `useEffect(() => window.scrollTo(0, 0), [route])` belongs in `App.jsx`.
4. **Sticky CTA visibility** uses a hand-rolled scroll listener; an `IntersectionObserver` watching `#contact` would be more efficient and correct on slow devices.
5. **Form CSRF / spam protection** doesn't exist (because the form doesn't submit). Will be needed in Phase 4.
6. **No rel="noopener"** on some external `target="_blank"` links — Marzipan's `liveUrl` does have `rel="noreferrer noopener"` but a global audit should confirm parity.
7. **Logo and brand name** are written `יובל`/`Yuval` consistently, but `footer.ownerName` ("יובל זכאי") and the privacy policy use the full name; could be normalized.
8. **A11y panel pointer-down outside-close** can fire while the user is interacting with the FAB itself; logic is currently correct but fragile.
9. **No e2e check that `t()` keys exist in both dictionaries.** A typo like `t('hero.titles')` will silently render the path string. A build-time validator would catch this.

---

## 21. Future Roadmap

The strategic phasing already documented in `docs/future-roadmap.md` is correct. Restated and tightened:

### Phase 2 — Routing & content depth (next)
- Migrate `useHashRoute` to `react-router-dom` with `lazy()` routes.
- Per-service detail pages (`/services/web`, `/services/automation`, …).
- Per-project case-study pages (start with Marzipan).
- Standalone `/about` and `/contact` for direct linking from social.
- `hreflang` with real `/he/...` and `/en/...` paths.
- Sitemap.xml + robots.txt at build time.
- Per-page `<title>` / `<meta>` via a small `<Head>` component or migration to a meta-aware framework.

### Phase 3 — Journal / authority content
- MDX content pipeline.
- `/journal` with bilingual posts.
- RSS feeds (HE + EN).
- Newsletter capture with double opt-in.
- Pillar topics: engineering for SMBs, practical AI, premium digital presence, automation patterns.

### Phase 4 — Conversion engineering (highest commercial leverage)
- **Real form submission** to a serverless endpoint (Cloudflare Worker, Netlify Function, Vercel Edge Function).
- Lead routing: email + CRM (Notion/Airtable/HubSpot) + WhatsApp notification via the automation stack.
- A/B testing on the hero copy, primary CTA copy, and packages framing.
- Privacy-friendly analytics (Plausible / Vercel Analytics / Cloudflare Web Analytics).
- Conversion event taxonomy: `cta_click_hero`, `whatsapp_click`, `phone_tap`, `email_click`, `form_submit`, `package_cta_click`.
- Cal.com booking embed for discovery calls.

### Phase 5 — AI surface
- Embedded bilingual AI assistant on the site that answers service questions and routes qualified leads into the form pre-filled.
- Document-aware proposal-generation agent (internal tool first).
- Internal copilot for content creation in brand voice.
- Tool integrations: WhatsApp inbound → AI triage → human handoff.

### Phase 6 — Operating brand
- Public price-band guide per package tier.
- Self-serve project-intake form with structured discovery output.
- Client portal showing live project status (auth needed — likely Next.js migration trigger).
- Public changelog of the brand site itself ("transparency as marketing").

### Architectural trigger points
- Migrate to **Astro** if static-site SEO becomes the priority (Phase 3).
- Migrate to **Next.js** if dynamic AI surfaces or authenticated client portals become the priority (Phase 5/6).
- Replace Google Fonts with self-hosted variants when first paid acquisition starts.
- Introduce **Storybook** when component count exceeds ~25.
- Introduce **Playwright** end-to-end tests for bilingual flows + theme parity (Phase 4).

---

## 22. How to Scale This Into a Real Company Platform

This is the hardest section to write honestly. The site is excellent for what it is — a one-person studio's lead engine. To grow it into a *platform* (multi-operator, multi-client, recurring revenue) requires deliberate evolution:

### Stage 1 — Studio that doesn't break under one operator (Months 0–6)
- Wire form submission + CRM (Notion or Airtable is enough at this scale).
- Add Plausible analytics; review weekly.
- Self-host fonts; aim Lighthouse > 95 on all four scores.
- Add 1 real-project case-study page (Marzipan). One real story is worth all five concepts combined.
- Add scheduling embed.
- Add 2 named-client testimonials (with photo, role, link). This is the single biggest conversion lift available.

### Stage 2 — Studio with a content engine (Months 6–12)
- Move to Astro or Next.js (Astro if SEO-heavy; Next if app-heavy).
- Launch /journal in HE+EN with a 6-post backlog and a 2-week cadence.
- Get listed in the canonical Israeli developer/freelancer directories.
- Selective guest-writing on 3 respected industry blogs to seed backlinks.
- Move from "concepts" framing to "case studies" — each concept becomes a real client project or comes off the site.

### Stage 3 — Productize one offer (Months 12–18)
- Pick the highest-margin, most-repeatable service (likely **AI capability audit** or **bilingual landing-page sprint**) and turn it into a fixed-price, fixed-scope, fixed-timeline product with its own landing page.
- This is what unlocks paid acquisition: a fixed-price offer can run Google/LinkedIn ads with predictable CAC.
- Build the operator's own delivery checklist as a real internal tool (doubles as a portfolio piece).

### Stage 4 — Add a second operator (Months 18–24)
- The brand becomes "Yuval + a small team". This requires:
  - Client portal (live project status — Phase 6).
  - Internal handbook (style guide, voice rules, code conventions — already most of the way there with `docs/` + this blueprint + `WORKING_RULES_AND_STANDARDS.md`).
  - Actual CI/CD with PR review.
  - Test suite (Playwright bilingual flow + theme parity at minimum).
- Keep the "direct contact with the builder" promise alive by making the second operator a named, photographed peer — not an account manager.

### Stage 5 — Sub-brand for a productized AI surface (Year 2+)
- If one AI offer reaches PMF, spin it off as `aegis.ai` / similar with its own URL. The mother brand stays as the studio; the sub-brand becomes a vertical product.
- This is the path that converts a freelance brand into a small software business without losing the personal-trust posture.

### Anti-patterns to refuse
- ❌ **Don't** add a "team page" with stock photos before you have a real second person.
- ❌ **Don't** pad the concept-projects grid to look bigger.
- ❌ **Don't** chase low-intent SEO traffic with thin AI content; it would directly contradict the brand pillars.
- ❌ **Don't** white-label the studio. Personal brand is the moat.
- ❌ **Don't** dilute languages — adding Russian/Arabic only after you have repeatable HE+EN demand.

---

*End of MASTER_PROJECT_BLUEPRINT.md*
