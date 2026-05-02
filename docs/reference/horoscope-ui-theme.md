# Horoscope Reference UI Theme

Source files studied:

- `sample_code/horoscope/web/tailwind.config.ts`
- `sample_code/horoscope/web/app/globals.css`
- `sample_code/horoscope/web/app/layout.tsx`
- `sample_code/horoscope/web/app/page.tsx`

## Theme Essence

The reference app uses a Vietnamese classical-mystic manuscript style: ivory paper surfaces, deep indigo panels, antique gold rules, and vermillion seal accents. The mood is premium, ceremonial, and calm rather than “generic astrology app.”

## Core Tokens

Use these as the preferred visual vocabulary when redesigning pages:

- Ivory paper: `#f5f0e1`, secondary `#ece5d2`, rule `#d4c7a3`
- Deep indigo: `#1a1f3a`, darker `#141831`, `#0f1226`
- Antique gold: `#c9a961`, darker `#b89549`, pale `#dcc285`
- Vermillion seal: `#c8322c`, dark `#a82820`
- Ink text: `#2a2418`, soft `#5a5142`, muted `#8a7f68`

## Typography

- Headings / poetic copy: `Cormorant Garamond`, serif, light/medium weight.
- Body / UI labels: `Be Vietnam Pro` or current sans, with Vietnamese support.
- Han characters / seals: `Noto Serif Display` or equivalent CJK-capable serif.
- Micro labels: uppercase, mono-style, wide tracking (`0.15em`–`0.24em`).

## Component Patterns

- Hero: two-column layout; indigo left panel, ivory content/form side.
- Seal motif: square vermillion or gold-framed seal with Han character such as `命` or `紫微斗數`.
- Cards: ivory or translucent indigo surfaces with thin gold/rule borders; avoid heavy shadows.
- Buttons: vermillion primary, indigo secondary, gold hover/focus accents.
- Inputs/chips: transparent background, bottom border or thin rule, active state in vermillion or indigo.
- Motion: slow fade/rise, subtle seal draw; always respect `prefers-reduced-motion`.

## Applying to This SEO Site

For static SEO pages, adapt the theme without copying app-only chrome. Prefer readable ivory article layouts with indigo/gold section accents, visible breadcrumbs, semantic headings, and compliance disclaimers. Keep `/lap-la-so/` as a static landing unless product scope changes.

Avoid indexing or shipping interactive UI patterns from the reference app unless explicitly requested: music toggle, chat screen, auth, database-backed chart storage, or client-side chart generation.
