# Design System — yuval.digital

A premium, bilingual design system tuned for clarity, performance, and quiet luxury.

## Foundation

The system is implemented via CSS custom properties in `src/styles/variables.css`. JavaScript components consume tokens through CSS variables — never hardcoded literals. The same token names map across light and dark themes.

## Color

### Light theme
- `--color-bg`: `#ffffff` — main canvas.
- `--color-bg-alt`: `#f7f9fc` — gentle alternation for sections.
- `--color-surface`: `#ffffff` — elevated card surface.
- `--color-text`: `#0a0d14` — body and headings.
- `--color-text-soft`: `#3a4150` — paragraphs and supporting copy.
- `--color-text-muted`: `#6b7280` — labels and captions.
- `--color-accent`: `#2563eb` — electric blue, brand primary.
- `--color-accent-strong`: `#1e40af` — for emphasis on light surfaces.

### Dark theme
- `--color-bg`: `#07090f` — deep ink canvas.
- `--color-bg-alt`: `#0b0e16` — sectioned alt.
- `--color-surface`: `#11151d` — elevated card surface.
- `--color-text`: `#f3f5f9` — body and headings.
- `--color-accent`: `#60a5fa` — softened electric blue against dark.
- `--color-accent-glow`: `rgba(124, 58, 237, 0.45)` — violet glow for emphasis.

### Accent gradient
`linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)` — used for primary CTAs, gradient text, and project chips. Animated subtly via `gradientShift` keyframes.

## Spacing

A 4-pixel base scale with dense small steps and generous large steps for premium air.

```
--space-1: 4px      --space-8:  32px
--space-2: 8px      --space-10: 40px
--space-3: 12px     --space-12: 48px
--space-4: 16px     --space-16: 64px
--space-5: 20px     --space-20: 80px
--space-6: 24px     --space-24: 96px
                    --space-32: 128px
```

Section vertical rhythm uses `--section-py: clamp(4rem, 9vw, 8rem)` for fluid premium spacing.

## Radius

```
--radius-sm: 8px    --radius-lg: 16px
--radius-md: 12px   --radius-xl: 24px
                    --radius-2xl: 32px
--radius-pill: 999px
```

Cards use `--radius-xl`. Buttons and chips use `--radius-pill`. Logo mark uses `--radius-md` for a precise, technical edge.

## Typography

Two co-equal font families:

- **Hebrew:** `Heebo` — premium, clean, excellent at all weights.
- **English:** `Inter` — neutral, technical, modern.

The active family is selected by direction (`[dir='rtl']` vs `[dir='ltr']`) so the type system remains fluid as the user switches languages.

### Type scale

```
--fs-xs:   12px
--fs-sm:   14px
--fs-base: 16px
--fs-md:   18px
--fs-lg:   20px
--fs-xl:   24px
--fs-2xl:  32px
--fs-3xl:  40px
--fs-4xl:  52px
--fs-5xl:  68px
--fs-6xl:  88px
```

Headings use `clamp()` for fluid scaling between mobile and desktop.

### Weights

`300, 400, 500, 600, 700, 800` — body uses `400`, headings use `700–800`.

## Shadows

Shadows are progressive and theme-aware:

- `--shadow-xs` for subtle separation
- `--shadow-sm` resting card state
- `--shadow-md` hover-card state
- `--shadow-lg` interactive emphasis
- `--shadow-glow` accent-tinted halo for primary CTAs

## Motion

Three easings:

- `--ease-out`  — natural deceleration. Default for entrances.
- `--ease-in-out` — symmetric. For toggles and oscillation.
- `--ease-spring` — slight overshoot. For premium toggles and hover lifts.

Three durations:

- `--dur-fast: 160ms`  — micro-interactions.
- `--dur-base: 280ms`  — most transitions.
- `--dur-slow: 480ms`  — reveals and entrances.

Reduced-motion is respected via the global `prefers-reduced-motion` rule in `reset.css`.

## Components

### Button
Variants: `primary`, `gradient`, `ghost`, `soft`, `quiet`. Sizes: `sm`, `md`, `lg`. Optional `iconStart` / `iconEnd` props that auto-mirror on RTL.

### Surface
Base elevated container. Add `surface--interactive` to enable hover-lift behavior.

### Container
Width-constrained content well at `1240px` max with fluid horizontal padding.

### Eyebrow
Uppercase pill kicker used above every section title. Communicates section identity and creates rhythm.

### Logo
Wordmark + chevron-Y mark. Compact mode for tight nav contexts. Hover micro-rotation.

### Theme Toggle
Sliding pill thumb that mirrors on RTL. Updates `<meta name="theme-color">` so mobile chrome matches.

### Language Switcher
Two-state pill with animated active indicator. Atomic — only HE / EN. New locales would re-style as a dropdown.

## Accessibility

- Color contrast meets WCAG AA in both themes.
- All interactive elements show a visible focus ring (`outline 2px var(--color-accent)`).
- `aria-pressed` on all toggle buttons.
- Skip-to-main is supported via `id="main"` on the AppShell main element (link can be added at the top of the navbar in a later iteration).
- Forms use real `<label>` elements bound to inputs.

## Bilingual & Direction

- `[dir='rtl']` and `[dir='ltr']` are set on `<html>` by the `LanguageProvider`.
- Logical CSS properties (`inset-inline-start`, `padding-inline`, `margin-inline`) are used everywhere directional layout matters.
- Components that include directional iconography (arrows) auto-mirror via `transform: scaleX(-1)` in RTL.

## Implementation Conventions

- One CSS file per component, colocated.
- Class naming follows BEM (`block__element--modifier`).
- No inline styles except for one-off computed values (e.g. project accents).
- Tokens are the *only* source of color, spacing, and motion values.
