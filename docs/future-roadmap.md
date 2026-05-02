# Future Roadmap

The current build is **Phase 1**: a polished, bilingual, theme-aware single-page experience with a clean architecture for expansion. This document maps everything that comes next.

## Phase 1 — Foundation (current)

- ✅ React + Vite project structure with path aliases.
- ✅ Bilingual i18n system (HE / EN) with RTL/LTR direction switching.
- ✅ Light + dark theme system with persisted preference.
- ✅ Premium navbar with logo, language switcher, theme toggle, and CTA.
- ✅ Five hero sections (Hero, Services, About, Projects, Contact).
- ✅ Reusable components: `Button`, `Container`, `Logo`, `LanguageSwitcher`, `ThemeToggle`.
- ✅ Design tokens for color, spacing, radius, typography, shadow, motion.
- ✅ Accessibility baseline (focus rings, semantic HTML, reduced motion).

## Phase 2 — Routing & Content Depth

- [ ] Introduce `react-router-dom` with code-split routes.
- [ ] Per-service detail pages with deep dives.
- [ ] Per-project case-study pages with architecture diagrams.
- [ ] Standalone About and Contact pages for direct linking.
- [ ] `hreflang` and per-language URL structure (`/en/...`).
- [ ] Sitemap.xml and robots.txt automated at build time.

## Phase 3 — Journal / Insights

- [ ] MDX-based content pipeline (or Astro hybrid migration).
- [ ] Authority content under `/journal` covering engineering, AI, automation.
- [ ] RSS feed (HE + EN).
- [ ] Reading time, related posts, and bilingual cross-links.
- [ ] Newsletter capture with double opt-in.

## Phase 4 — Conversion Engineering

- [ ] Real form submission to a serverless endpoint (e.g., Cloudflare Workers).
- [ ] Lead routing to email + CRM + WhatsApp via the automation stack.
- [ ] A/B testing infrastructure for the hero and CTA copy.
- [ ] Conversion analytics dashboard the brand owner sees daily.
- [ ] Booking integration (Cal.com or similar) for discovery calls.

## Phase 5 — AI Surface

- [ ] Embedded bilingual AI assistant on the site that answers questions about services and routes qualified leads.
- [ ] Document-aware agent for proposal generation.
- [ ] Internal copilot for content creation in brand voice.
- [ ] Tool integrations: WhatsApp inbound, calendar, CRM, billing.

## Phase 6 — Operating Brand

- [ ] Public price-band guide for each service tier.
- [ ] Self-serve project intake form with structured discovery output.
- [ ] Client portal showing live project status.
- [ ] Public changelog and version history of the brand site itself (transparency as marketing).

## Architectural Evolutions

- Migrate to **Astro** if static-site SEO becomes the priority.
- Migrate to **Next.js** if dynamic AI surfaces or authenticated client portals become the priority.
- Replace Google-hosted fonts with self-hosted variants for full performance control.
- Introduce **Storybook** when the component library exceeds ~25 components.
- Introduce **Playwright** end-to-end tests covering bilingual flows and theme parity.

## Open Strategic Questions

- Should the brand publish in a third language (Russian / Arabic) given the Israeli market reality?
- Should the brand productize a recurring "AI Capability Audit" as a fixed-fee offer?
- Should the brand spin off a separate sub-brand (e.g. `aegis.ai`) for vertical-specific AI products?

## Decision Log

This roadmap is living. Each meaningful decision should be appended below with date and rationale.

- **2026-05-02** — Phase 1 shipped. Hebrew set as the default language to reflect the primary market; English is a first-class peer, not a translation. Light theme is the default to communicate clarity and openness on first load.
