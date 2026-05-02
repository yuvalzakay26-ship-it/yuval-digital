# Pages — Site Architecture

The site is a single-page experience by default, with future routes wired into a clean expansion path. This document is the source of truth for what each section/page exists to do.

## Current — One Page

### `Home` (`/`)
The full brand experience as a vertical narrative.

**Sections in order:**

1. **Hero** — instant clarity on who Yuval is and what he builds. Two CTAs: primary (start a project), secondary (services).
2. **Services** — six premium offers with crisp descriptions and capability bullets.
3. **About** — sticky lede + four pillars communicating posture and method.
4. **Projects** — four featured systems with category chips and accent gradients.
5. **Contact** — direct form plus high-contrast email/WhatsApp CTAs.

The Home page is engineered to convert in two ways: scroll-to-contact for considered buyers, and instant top-of-page CTA for high-intent visitors.

## Planned — Phase 2

### `Services` (`/services`)
Per-service deep pages with: outcome statement, scope detail, sample deliverables, FAQ, and inline contact.

### `Project Detail` (`/work/:slug`)
Long-form case studies with the system architecture diagram, before/after, and quoted outcome. Requires written client approval per project.

### `About` (`/about`)
Extended personal narrative: background, principles, public talks, writing.

### `Insights` / `Journal` (`/journal`)
Long-form posts on systems, AI, automation, and craft. Optimized for SEO and authority.

### `Contact` (`/contact`)
Standalone contact page for direct linking from email signatures and ad campaigns.

## Routing Strategy

- Phase 1: hash-based scroll navigation (already implemented).
- Phase 2: client-side routing via `react-router-dom` with route-level code splitting.
- Phase 3: optional SSR/SSG via Astro or a Next migration if SEO load justifies it.

## Section Pattern (reusable)

Every section in the codebase follows the same anatomy:

```
<section id="<id>" className="<name> section">
  <Container>
    <div className="section__head">
      <span className="eyebrow">…</span>
      <h2 className="section__title">…</h2>
      <p className="section__lead">…</p>
    </div>
    {/* unique body */}
  </Container>
</section>
```

This guarantees layout symmetry, predictable spacing, and zero duplicated CSS.

## Page Quality Bar

Before any page is "done":

- ✅ Lighthouse mobile ≥ 90 across all four categories.
- ✅ All copy reviewed in both Hebrew and English (no machine translation).
- ✅ Tab navigation reaches every interactive element.
- ✅ All images have meaningful alt text in the active language.
- ✅ Color contrast ratios meet WCAG AA in both themes.
- ✅ Layout passes a visual diff between LTR and RTL.
