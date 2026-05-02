# yuval-digital

Premium bilingual digital presence for **Yuval** — software engineer, AI developer, automation builder, website creator for businesses, and smart-systems consultant.

This repository is the production foundation of the brand site. It is engineered to feel like an elite agency front, while remaining a clean, scalable React application underneath.

---

## Highlights

- **React 18 + Vite 5** with path aliases (`@components`, `@sections`, `@i18n`, `@theme`, …).
- **Bilingual** Hebrew (default) ↔ English with automatic **RTL / LTR** direction switching.
- **Premium light + dark themes** with persisted user preference and animated transitions.
- **Design tokens** drive every color, spacing, radius, shadow, and motion value.
- **Reusable component library**: `Button`, `Container`, `Logo`, `LanguageSwitcher`, `ThemeToggle`.
- **Five home-page sections**: Hero, Services, About, Projects, Contact.
- **Accessible** by default — focus rings, semantic HTML, reduced-motion support.
- **Documented** via `docs/` — brand, identity, services, projects, design system, SEO, content rules, future roadmap.

---

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

```bash
npm run build      # production build
npm run preview    # preview production build
```

---

## Folder structure

```
yuval-digital/
├─ public/
├─ docs/                   # strategic & brand documentation
├─ src/
│  ├─ assets/
│  ├─ components/          # reusable atoms (Button, Logo, switchers, toggle, container)
│  ├─ data/                # nav, services, projects metadata
│  ├─ hooks/               # useTheme, useLanguage, useScrollProgress
│  ├─ i18n/                # he.js, en.js, LanguageProvider, helpers
│  ├─ layout/              # AppShell, Navbar, Footer
│  ├─ pages/               # Home (currently the only page)
│  ├─ sections/            # Hero, Services, About, Projects, Contact
│  ├─ styles/              # reset, variables (tokens), globals, animations
│  ├─ theme/               # ThemeProvider + token mirror
│  ├─ utils/               # cn() classnames helper
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ package.json
└─ vite.config.js
```

---

## Language

Hebrew is the **default** language (`lang="he" dir="rtl"`). English is a co-equal first-class language — every string is composed natively in both, never machine-translated.

The active language is controlled by `LanguageProvider`. The user preference is persisted in `localStorage` under `yuval-digital:lang`.

---

## Theme

Light is the **default** theme. The toggle in the navbar flips the entire site to a dark, glow-accented premium theme.

The active theme is controlled by `ThemeProvider` and applied as `data-theme="light|dark"` on `<html>`. CSS custom properties in `src/styles/variables.css` redefine every color/shadow per theme, so any component automatically inherits the correct palette. Persistence: `localStorage` under `yuval-digital:theme`.

---

## Documentation

Strategic documentation lives in `docs/` and is intended to be read by the brand owner, future collaborators, and AI assistants working on the codebase:

- [`brand.md`](docs/brand.md) — promise, voice, audience, differentiators.
- [`identity.md`](docs/identity.md) — who Yuval is and how he works with clients.
- [`services.md`](docs/services.md) — the master service catalog.
- [`projects.md`](docs/projects.md) — showcase strategy and confidentiality policy.
- [`pages.md`](docs/pages.md) — site architecture and quality bar.
- [`design-system.md`](docs/design-system.md) — tokens, components, accessibility.
- [`seo.md`](docs/seo.md) — strategy, keywords, on-page foundations.
- [`content-rules.md`](docs/content-rules.md) — voice, vocabulary bans, structural patterns.
- [`future-roadmap.md`](docs/future-roadmap.md) — Phase 2 → Phase 6 evolution path.

---

## Conventions

- One CSS file per component, colocated with the component.
- BEM class naming (`block__element--modifier`).
- Tokens (CSS variables) are the only source of color, spacing, and motion.
- Logical CSS properties (`inset-inline-*`, `padding-inline`, `margin-inline`) for direction-safe layout.
- No hardcoded translations — every visible string flows through the `t()` helper.

---

## License

Private — proprietary brand asset.
