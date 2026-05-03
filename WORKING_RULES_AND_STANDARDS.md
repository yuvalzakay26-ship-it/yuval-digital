# WORKING RULES & STANDARDS — yuval.digital

> **Purpose:** This file is the permanent operating manual for any human or AI agent working on this codebase.
> **Read order:** Read this *before* writing any code. Cross-reference `MASTER_PROJECT_BLUEPRINT.md` for context.
> **Changing this file:** Treat it like a constitution. Amendments are deliberate; deletions need a justification commit.

---

## 0. The Prime Directives

Three rules override everything else in this document. If a request conflicts with one of these, refuse or ask first.

1. **Never break the bilingual contract.** Every visible string flows through `t('dotted.path')`. No hardcoded user-facing text. No machine translation. Both `he.js` and `en.js` must move together.
2. **Never break the token contract.** Every color, spacing, radius, shadow, font size, easing, and duration comes from a CSS variable defined in `src/styles/variables.css`. Hardcoded literals in component CSS are forbidden except for one-off computed values supplied as inline `--custom-prop`.
3. **Never break the trust posture.** Don't invent testimonials, dates, client names, metrics, or experience. If something is a concept, label it as a concept. If a project is real, it must be reachable. The site's credibility is built on this.

---

## 1. Coding Standards

### General
- **Language:** JavaScript with React JSX. No TypeScript today. If TS is added, do it as a top-level migration (not a piecemeal mix).
- **React:** function components only. Hooks for state. No class components, no HOCs except where unavoidable.
- **Imports:** always use path aliases (`@components/...`, `@hooks/...`, etc.). Relative paths (`../../...`) are a code smell — fix them when you see them.
- **Default exports** for components (one component per file). Named exports for utilities and hooks.
- **Hooks:** custom hooks always live in `src/hooks/` and are named `useThing`. They never read globals; they take args and return values.
- **Side effects:** keep them in `useEffect`. Never put `document.querySelector` in a render path.
- **DOM access:** prefer ref-based DOM access over `document.getElementById`. The exceptions are global `<html>` attribute writes (theme, lang, dir, a11y) — those are the providers' job and stay there.

### React patterns to keep
- The provider stack in `main.jsx` (`Theme → Language → A11y`) is correct. Don't reorder it casually — `LanguageProvider` reads `LANG_STORAGE_KEY` from `theme/tokens.js`. If you fix this coupling, do it in one PR with explicit notes.
- The `useReveal` + `<Reveal>` pattern is the only sanctioned way to animate elements in on scroll. Don't introduce a second one (Framer Motion, AOS, etc.) without removing the first.
- Hash routing through `useHashRoute` is correct for current scope. The transition to `react-router-dom` happens once, when Phase 2 starts — not piecemeal.

### React patterns to avoid
- ❌ `dangerouslySetInnerHTML` — there is no current use case.
- ❌ `useLayoutEffect` for scroll/animation work — `useEffect` is sufficient and avoids SSR pitfalls.
- ❌ Inline `onClick={() => doX(arg)}` factories inside `.map()` rendering >20 items — okay for our scale, but if a list grows, lift the handler.
- ❌ Anonymous default exports (`export default () => ...`) — always name the function.

### File and folder rules
- **One CSS file per component, colocated.** `Button.jsx` → `Button.css` next to it. Imported directly from the component (`import './Button.css'`).
- **One component per file.** If a sub-component is private (e.g., `Metric` inside `Hero.jsx`), keep it in the same file.
- **Section components live in `src/sections/`**, atomic components in `src/components/`. The distinction matters: a `section/` reads from the i18n dictionary directly; a `component/` is generic and is configured by props.
- **Plain data goes in `src/data/`** as JS modules. If the data needs to ship JSX (e.g., icons), the file is `.jsx`.
- **No circular imports.** If you find one, that's an architectural smell — the boundary is wrong, not the import.

### Linting
- ESLint is configured with `--max-warnings 0`. **A warning is a failure.** Don't disable rules ad-hoc; if a rule is wrong for this codebase, disable it project-wide with a comment.

---

## 2. Naming Conventions

### Files
- **Components:** `PascalCase.jsx` + `PascalCase.css` (`Button.jsx`, `AccessibilityToolbar.jsx`).
- **Hooks:** `useCamelCase.js` (`useScrollProgress.js`).
- **Data modules:** `camelCase.js` or `.jsx` (`contact.js`, `services.jsx`).
- **i18n dictionaries:** lowercase locale code (`he.js`, `en.js`).
- **Styles:** lowercase, hyphenated (`variables.css`, `globals.css`, `a11y.css`).
- **Pages:** `PascalCase.jsx` (`Home.jsx`, `PrivacyPolicy.jsx`).

### CSS
- **BEM:** `.block`, `.block__element`, `.block--modifier`, `.block__element--modifier`.
- The block name matches the component (`Hero.jsx` → `.hero`, `.hero__title`, `.hero--scrolled`).
- **Utility classes** (`.eyebrow`, `.surface`, `.container`, `.text-gradient`, `.hairline`, `.skip-link`, `.sr-only`, `.no-scroll`) live only in `src/styles/globals.css`. Don't redefine them locally.

### CSS variables
- **Color:** `--color-{role}` (`--color-bg`, `--color-text-soft`, `--color-accent-glow`).
- **Brand:** `--brand-{name}` for raw palette entries (`--brand-electric`, `--brand-violet`).
- **Spacing:** `--space-{n}` on a 4px scale.
- **Type:** `--fs-{size}`, `--fw-{weight}`, `--leading-{name}`, `--tracking-{name}`.
- **Radius:** `--radius-{size}` (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `pill`, `circle`).
- **Shadow:** `--shadow-{size}` plus `--shadow-glow`.
- **Motion:** `--ease-{curve}`, `--dur-{speed}`.
- **Layout:** `--container-max`, `--container-px`, `--section-py`, `--navbar-h`.

If you need a new token, add it to `variables.css` (and dark override if relevant). Don't shoehorn one-off values into components.

### i18n keys
- Dot-notated, namespaced by section (`hero.titleHighlight`, `services.items[].title`).
- **Symmetry rule:** if a key exists in `he.js`, it must exist in `en.js`, with the same shape and same array length.
- Section namespace == section folder name (the `Trust.jsx` section reads `dict.trust`).

---

## 3. How to Preserve Architecture

### The folders are load-bearing — respect them
| Folder | What goes there | What does NOT |
|--------|-----------------|---------------|
| `components/` | Reusable atoms, no business knowledge | i18n-coupled section compositions |
| `sections/` | Page-specific compositions, read i18n directly | Reusable atoms |
| `pages/` | Whole-screen entry points routed via `useHashRoute` | Section components |
| `layout/` | Global chrome (Navbar, Footer, AppShell) | Page-specific UI |
| `hooks/` | Reusable hooks; one concern each | Components, side-effect hubs |
| `data/` | Plain data modules + icon maps | Components, hooks |
| `i18n/` | Dictionaries + translate engine | UI components |
| `theme/` | ThemeProvider + token JS mirror | Layout, content |
| `a11y/` | A11yProvider | Accessibility-related UI components (those go in `components/`) |
| `styles/` | Global CSS only (5 files) | Component-scoped CSS |
| `utils/` | Pure functions | Anything stateful |

If you're tempted to add a new top-level folder, justify it in writing first. The current set is enough.

### The provider stack is load-bearing
- The order is `Theme → Language → A11y`. Reordering breaks language persistence (see weakness #20 in the blueprint).
- Don't introduce a 4th provider unless absolutely necessary. Routing, scroll position, and form state should remain local.

### The hash router is intentionally minimal
- Only hashes that begin with `#/` route to a different page. `#services`, `#contact`, etc. remain native scroll anchors.
- When you migrate to `react-router-dom`, do it in one PR. Don't half-migrate.

---

## 4. How to Maintain Premium Design Quality

### Spacing rhythm
- Section vertical rhythm: `--section-py` (clamp 3.5rem → 8rem). Don't override it per-section unless the section is a hero/contact special case.
- Inner spacing: use `--space-*` tokens. Most card grids use `gap: var(--space-6)` or `var(--space-8)`.
- Air over density. When two values look right, pick the larger one.

### Type rhythm
- One `<h1>` per page (the hero title). Section titles are `<h2>`. Card titles are `<h3>`. Don't escalate `<h2>` count.
- Body copy uses `var(--leading-relaxed)` (1.78). Headings use `var(--leading-tight)` (1.08) and tighter tracking.
- Use `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs (already in `globals.css`).

### Color rhythm
- Sections alternate `--color-bg` / `--color-bg-alt` for vertical contrast. Don't use 3+ background tones in succession.
- Accent color usage is sparing. Reserve `--color-accent` for: CTA gradient, eyebrow chip, focus ring, gradient text, primary nav link hover. Overusing it kills its weight.
- `--gradient-accent` (electric blue → violet) is the brand gradient. Don't invent another one.

### Motion rhythm
- Three durations: `--dur-fast` (160ms, micro-interactions), `--dur-base` (280ms, most transitions), `--dur-slow` (480ms, reveals).
- Three easings: `--ease-out` (default), `--ease-in-out` (toggles), `--ease-spring` (premium hovers/toggles).
- Don't introduce custom durations or easings ad-hoc. Stretch the existing scale or add a new token to `variables.css` with justification.
- All animations must respect `prefers-reduced-motion: reduce` (already global; don't override it).

### Surfaces
- Cards use `class="surface"` (and `surface--interactive` if hover-liftable). Don't reinvent the card shell.
- Border-radius: cards = `--radius-xl`, buttons/chips = `--radius-pill`, tight UI = `--radius-md`.
- Shadow on rest = `--shadow-sm`. Hover lift = `translateY(-4px) + --shadow-lg` (via `surface--interactive`).

### Visual quality bar
A change is "premium-quality" when:
- It looks intentional in both light and dark themes.
- It looks intentional in both HE (RTL) and EN (LTR).
- It survives the accessibility toolbar's grayscale + high-contrast modes.
- Its hover, focus, and active states all have a tasteful response (not "all states identical").
- It still looks right at 320px width and at 1920px width.

If any of those break, the change isn't done.

---

## 5. UX Rules

### Conversion is sacred
- **Don't move the contact form below the fold of the contact section.** The form is the conversion target.
- **Don't remove the WhatsApp FAB or the mobile sticky CTA bar.** They are load-bearing for mobile conversion.
- **Don't reduce the three-channel choice (WhatsApp / Phone / Email) in Contact.** Different prospects pick different channels.
- **Don't bury package CTAs.** Each package has a button labeled "Let's talk about it" pointing to `#contact`.
- **Pre-qualifying form fields** (project type, budget, timeline) must remain optional. Required fields are name, email, message only.

### Copy
- One clear primary CTA per section. Secondary CTAs are ghost-styled, never compete visually.
- Hero CTA says **what they get**, not what we want them to do ("Let's build something real" beats "Submit").
- Avoid hedging language: "we might be able to help you" is forbidden. "I build X for businesses that need Y" is the voice.
- See `docs/content-rules.md` for the full vocabulary blacklist and tone rules.

### Trust signals are spread, not piled
- Hero microtrust line.
- Trust section (6 strengths).
- Process (5-step transparency).
- Authority (6 differentiators).
- Testimonials (work standards as commitments).
- Contact reassurance line + privacy consent + secure-send icon.
- Footer transparency line ("יובל זכאי · עוסק עצמאי בישראל").

This redundancy is intentional. Don't consolidate it into one "trust block" — readers enter and exit the page at different points.

### Forms
- Real `<label>` for every input — no placeholder-as-label.
- Required fields show a red `*`. Optional fields show "אופציונלי" / "Optional" in a muted meta line.
- Phone, email, and time inputs get `dir="ltr"` because the values are LTR even in HE.
- Submit button shows a response-time line next to it, not after the click.
- Success state replaces the form, doesn't sit above it. Keep the user oriented.

### Mobile
- Mobile is the **primary** target. The mobile sticky CTA bar and WhatsApp FAB exist because most Israeli traffic is mobile.
- Tap targets are minimum 44px tall.
- The contact form fields are full-width on mobile. The 2-column layout starts at the medium breakpoint.

---

## 6. Mobile-First Rules

### Approach
- Write the mobile layout first in CSS, then add `min-width` media queries for tablet and desktop. **Never** the other way around.
- The breakpoints are not formalized as tokens (yet). Common ones in this codebase: `720px`, `860px`, `1024px`, `1240px`. Don't invent breakpoints below 320px or above 1920px.

### Patterns to keep
- Mobile drawer pattern in `Navbar` is the sanctioned mobile-nav implementation. Don't add a second one.
- `StickyMobileCta` is the mobile-only conversion bar. It's hidden via `display: none` on screens > 720px.
- Contact direct-cards collapse from row to wrap to single-column gracefully — test all three when editing.

### Patterns to avoid
- ❌ `width: 100vw` — use `width: 100%` to avoid horizontal-scroll bugs from scrollbar widths.
- ❌ Fixed pixel font sizes for body copy — use `clamp()` or rem.
- ❌ Hover-only affordances — every hover state must have a focus/active equivalent for touch.

### Performance on mobile
- Avoid `position: fixed` on elements that move during scroll — they cause repaints.
- Avoid `box-shadow` animation — animate `opacity` of a pseudo-element instead.
- Test with Chrome DevTools' "Slow 4G" + "Low-end mobile CPU" before claiming a mobile change is done.

---

## 7. Performance-First Rules

### What's free and you should always do
- Use `transform` and `opacity` for animations. They run on the compositor.
- Use `passive: true` on scroll listeners.
- Use `IntersectionObserver` for visibility-driven logic. There's already `useReveal` for entrances; copy the pattern.
- Use `loading="lazy"` for any future `<img>`. (No images on the home page currently — keep it that way as long as possible.)
- Use `clamp()` for fluid typography and spacing — avoids ResizeObserver loops.

### What's load-bearing and you must not break
- **No external runtime deps past React + ReactDOM.** Every new dependency is a permanent tax on bundle size and security surface. Justify in writing.
- **Hero stays imageless.** It's a CSS gradient + SVG noise + conic gradient. Don't add a hero photo.
- **Fonts are preconnected before the stylesheet link.** When self-hosting (Phase 2/3), preserve `font-display: swap` semantics.
- **CSS code-splitting is on.** Don't disable `cssCodeSplit`.

### What to add when ready
- Self-host fonts (Heebo + Inter) and remove the Google Fonts links.
- `React.lazy` on legal pages — they're loaded eagerly today.
- Lighthouse CI as a GitHub Action with budget thresholds (LCP < 2.0s, INP < 200ms, CLS < 0.05, TBT < 200ms).
- Real Web Vitals telemetry (Plausible, Cloudflare, or Vercel — privacy-friendly only).

### Performance regressions are bugs
A change that adds 10KB to the JS bundle, 200ms to LCP, or a new layout shift is a regression — even if the feature is correct. Either justify the trade-off in the PR description or revisit the implementation.

---

## 8. SEO-Safe Rules

### Always
- Single `<h1>` per page. Section titles are `<h2>`. Card titles are `<h3>`.
- Every interactive element has accessible text (visible label or `aria-label`).
- Every link to an external URL uses `target="_blank" rel="noreferrer noopener"` (yes, both — `noreferrer` covers older browsers).
- Every form input has a real `<label htmlFor>`.
- `<html lang>` and `<html dir>` reflect the active language. (Already wired in `LanguageProvider`.)

### Schema / structured data
- Three JSON-LD blocks live in `index.html` (`Person`, `ProfessionalService`, `FAQPage`). When you change the FAQ section, **update the JSON-LD to match**, or rip out the FAQ schema entirely. Mismatched schema gets you penalized.
- When per-page schema is needed (e.g., a case study page), inject it via a `<Head>` component or migrate to a meta-aware framework (Next.js / Astro). Don't render JSON-LD as React text.

### Meta
- `<title>` and `<meta name="description">` are static today (HE-only). When per-page or per-language metadata is added, update both via the same mechanism.
- Canonical URL is `https://yuval.digital/`. When per-language URLs ship, every page gets its own canonical.
- Don't add Twitter/OG image variants without ensuring the image actually exists at the URL — broken OG images degrade share previews.

### Never
- ❌ Hidden text for keyword stuffing.
- ❌ `display: none` on text "for SEO".
- ❌ Auto-generated content (especially AI-generated bilingual copy without human review).
- ❌ Doorway pages, cloaking, or anything in the "what not to do" section of `docs/seo.md`.

---

## 9. Accessibility Rules

### Baseline (always)
- Visible focus ring on every interactive element. The ring is defined globally in `globals.css` — don't override it per-component without preserving WCAG contrast.
- All toggles have `aria-pressed`. All accordions have `aria-expanded` and `aria-controls`. All modals have `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- All decorative SVGs use `aria-hidden`. Meaningful SVGs have `<title>` or `aria-label`.
- All icon-only buttons have `aria-label`.
- `prefers-reduced-motion: reduce` cancels animations and transitions. Already global. Don't override.

### Color contrast
- Text on background must hit WCAG AA (4.5:1 normal, 3:1 large). The `--color-text` / `--color-text-soft` / `--color-text-muted` ladder is tuned for this — use it.
- Don't put body copy on the gradient or on top of imagery without a contrast scrim.

### Israeli legal compliance
- The accessibility statement at `#/page/accessibility` references **חוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998**, **ת"י 5568 ברמה AA**, and **WCAG 2.1 AA**. When the toolbar's capabilities change, update the statement.
- The accessibility toolbar must be reachable from anywhere on the site (it is, via the floating FAB). Don't hide it behind a menu.
- The site contact for accessibility issues lives in the statement. Keep it current.

### The accessibility toolbar contract
The five toolbar modes are implemented via `data-a11y-*` attributes on `<html>`, consumed by `styles/a11y.css`:
- `data-a11y-text="sm|md|lg|xl|xxl"` — text-size scale.
- `data-a11y-contrast="on"` — high-contrast palette override.
- `data-a11y-grayscale="on"` — `filter: grayscale(1)` on the content wrapper.
- `data-a11y-underline-links="on"` — forces underline.
- `data-a11y-readable-font="on"` — dyslexia-friendly font.
- `data-a11y-pause-animations="on"` — disables animations.

When you add a new component, **test it under all 5 modes**, especially grayscale + high-contrast simultaneously.

### Don't break the grayscale + fixed-position fix
`AccessibilityToolbar`, `WhatsAppFab`, and `StickyMobileCta` are mounted **outside** `.app-shell__content` because the grayscale filter creates a containing block that breaks `position: fixed`. The drawer and scrim are similarly mounted **outside** the navbar `<header>` because of `backdrop-filter`. There are comments in the code flagging both. Don't move them.

---

## 10. RTL / LTR Rules

### Always
- Use logical CSS properties: `inset-inline-start`, `padding-inline`, `margin-inline`, `border-inline-start`, `text-align: start/end`. Never `left`/`right` for layout.
- Direction-aware icons (arrows, chevrons) flip via `transform: scaleX(-1)` in `[dir='rtl']`. The `Button` component's `iconStart` / `iconEnd` slots already do this — use them.
- Numbers, phone numbers, emails, URLs are LTR. Wrap them in `<span dir="ltr">` even when surrounding text is HE.
- Forms keep `<input type="email">` and `<input type="tel">` LTR explicitly via `dir="ltr"` (we do this already).
- Date / time strings are localized. There are no dates in the visible site today; if added, use `Intl.DateTimeFormat` with the active locale.

### Never
- ❌ `left: 0` / `right: 0` for layout positioning.
- ❌ `text-align: left` / `text-align: right` (use `start` / `end`).
- ❌ Conditional class for direction (`isRtl ? 'foo--rtl' : 'foo--ltr'`) — use logical CSS properties so the same class works in both directions.
- ❌ Translating English copy to Hebrew with AI or vice versa. Both languages are written natively, side-by-side.

### Adding new copy
1. Open `src/i18n/he.js` first (HE is primary).
2. Write the Hebrew copy natively. It should sound like a Hebrew-native person wrote it — not like a translation.
3. Open `src/i18n/en.js`.
4. Write the English copy natively. It should sound like an English-native person wrote it.
5. Both files must end up with identical key shapes and identical array lengths.

---

## 11. How to Add New Sections Correctly

### The shape of a section
Every section in `src/sections/` follows the same shape. Use this as a template:

```jsx
import Container from '@components/Container.jsx';
import Reveal from '@components/Reveal.jsx';
import { useLanguage } from '@hooks/useLanguage.js';
import './NewSection.css';

export default function NewSection() {
  const { dict, t } = useLanguage();
  const items = dict.newSection.items;

  return (
    <section id="new-section" className="new-section section">
      <Container>
        <Reveal className="section__head">
          <span className="eyebrow">{t('newSection.eyebrow')}</span>
          <h2 className="section__title">{t('newSection.title')}</h2>
          <p className="section__lead">{t('newSection.subtitle')}</p>
        </Reveal>

        <div className="new-section__grid">
          {items.map((item, i) => (
            <Reveal key={item.id} variant="up" delay={i * 80} className="new-section-card">
              {/* card content */}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### Required steps when adding a section
1. Write the i18n keys in `he.js` and `en.js` first (HE first). Match the schema of an existing analogous section.
2. Add an icon map to `src/data/newSection.jsx` if the section uses icons keyed by item id.
3. Create `src/sections/NewSection.jsx` and `NewSection.css`. BEM, logical properties, tokens only.
4. Add the section to `src/pages/Home.jsx` in the **funnel order** that makes sense (don't append blindly to the bottom — the order is engineered).
5. Add a navigation entry to `src/data/nav.js` and i18n key under `nav.*` if the section is anchor-linkable.
6. Test under: light + dark, HE + EN, mobile + desktop, all 5 a11y modes, and `prefers-reduced-motion: reduce`.

### Where new sections fit in the funnel
The current funnel chapters are:
- **Pitch** (Hero, Trust)
- **What** (Services)
- **How much / how to start** (Packages)
- **How** (Process)
- **Proof** (Projects)
- **Toolset** (Stack)
- **Why now** (Authority)
- **Trust deepening** (Testimonials, About)
- **Friction removal** (FAQ)
- **Action** (Contact)

If your new section doesn't fit a chapter, it's probably the wrong section — or the funnel needs a new chapter. The latter is a strategic decision, not a coding decision.

---

## 12. How to Refactor Safely

### Before
1. Read this file and the relevant area of the blueprint.
2. Confirm the refactor is needed — not stylistic preference.
3. Write down the contract that must be preserved (props, exported functions, i18n keys, CSS class names that other files reference).

### During
- Refactor in **one direction at a time** — first the data layer, then the hooks, then the components. Don't refactor across all three in one PR.
- Keep the diff small. A 200-line PR is reviewable; a 2000-line PR is not.
- Run `npm run lint` and `npm run build` between meaningful steps.

### After
- Walk through the home page in both languages, both themes, all 5 a11y modes, and on a mobile viewport. **All four axes**.
- Verify the contact form still toggles to its success state on submit.
- Verify hash-routed pages still load (`#/page/privacy`, `#/page/accessibility`).
- Verify the sticky mobile CTA still hides when the contact section is visible.
- Verify the navbar drawer still opens, traps focus, closes on Escape, closes on scrim click.

### Refactors that are always safe
- Renaming a CSS variable everywhere it's used.
- Extracting an inline SVG into a colocated icon component.
- Splitting a section CSS file into well-named utility classes.
- Adding a new variant to `Button` without removing existing ones.

### Refactors that need an architectural review
- Replacing `useHashRoute` with a router library. (One PR. Coordinate.)
- Replacing the i18n engine with a library. (Major migration.)
- Introducing TypeScript. (Repo-wide.)
- Replacing vanilla CSS with a CSS-in-JS or utility framework. (Don't, without strong reason.)
- Adding a state library. (Don't, until Context measurably hurts.)

---

## 13. What Must Never Be Broken

A short list. Memorize it.

1. **The token contract** (`src/styles/variables.css` is the single source of truth for visual values).
2. **The i18n contract** (every visible string flows through `t()`; HE and EN move together).
3. **The accessibility toolbar** (5 sizes + 5 modes + reset, all persisted, statement linkable).
4. **The skip link** (first focusable element on every page).
5. **The focus ring** (visible, contrast-safe, on every interactive element).
6. **The contact form's three-channel fallback** (WhatsApp + Phone + Email always reachable from `#contact`).
7. **The mobile sticky CTA bar + WhatsApp FAB** (load-bearing for mobile conversion).
8. **The `prefers-reduced-motion: reduce` global** (no component should override it).
9. **The provider order** (Theme → Language → A11y).
10. **The honest brand posture** (no fake testimonials, real-vs-concept labels, transparency line in footer).
11. **The mounting of fixed/floating UI outside `.app-shell__content`** (otherwise the grayscale filter breaks fixed positioning).
12. **The mounting of the navbar drawer + scrim outside `<header>`** (otherwise `backdrop-filter` breaks the drawer).
13. **The Israeli legal text** in the accessibility statement and privacy policy. Don't soften, simplify, or remove the law references — they are what makes the page legally meaningful.
14. **The `data-theme` and `lang`/`dir` attribute writes on `<html>`.** They drive the entire token system. Don't move them out of the providers.

---

## 14. How AI Agents Should Think While Working Here

This codebase is **not** a generic React project. Default reflexes from "modern web" tutorials will produce lower-quality work here. Calibrate against the following:

### Prefer constraint over flexibility
The codebase deliberately uses no UI library, no CSS framework, no state library, no router library. Adding one is almost always wrong. The constraint is the architecture.

### Read the dictionary first, then the section
When you change a section's content, the source of truth is `src/i18n/he.js` (and the matching keys in `en.js`). Don't change copy in the JSX file — there is no copy in the JSX file.

### Test all four axes of every change
Light + dark · HE + EN · mobile + desktop · default + a11y modes. A change is not done until it survives all four. This is the price of admission for "premium agency front."

### When something looks off, suspect tokens before suspecting components
90% of "this color is wrong / this spacing is wrong" issues are token-level decisions. Fix them in `variables.css` and watch them propagate, instead of patching one component.

### When the user describes a UX outcome, translate it to a funnel decision
"Add a section about X" should make you ask: where does this go in the funnel? What does it remove from the page in exchange? The funnel is finite — every addition costs something somewhere.

### When the user describes a technical change, check if it preserves the contracts
Bilingual contract, token contract, trust contract. If a change breaks one, raise it before implementing.

### Don't introduce backward-compatibility hacks
This is a single-developer codebase with no external API surface. There are no consumers to placate. If a refactor is right, do it cleanly.

### Don't write tests, comments, or documentation that don't pay rent
Comments belong on non-obvious WHY decisions (the grayscale containing-block fix is a good example). Don't add JSDoc to every function. Don't write a test that verifies React renders a `<div>`. Earn each line.

### When uncertain, ask — but ask once
"Should I do A or B" with concrete tradeoffs is a useful question. "How would you like me to approach this" is not. Show that you understood the codebase before asking.

### The user is the operator, not a stakeholder
There is no PM, no design lead, no engineering manager. The user wears all hats. That means:
- Don't ask "what's the priority" — propose one.
- Don't ask "what's the design" — show one.
- Don't ask "what about performance" — measure one.

### The brand is honest. Be honest in code review.
If a change makes the site worse, say so. If a request would damage the trust posture, say so. If a "refactor" is actually a rewrite, say so. The brand pillar of honesty extends to how this codebase is maintained.

---

*End of WORKING_RULES_AND_STANDARDS.md*
