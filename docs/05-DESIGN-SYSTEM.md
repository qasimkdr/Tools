# Design system

Tailwind v4 (CSS-first config in `src/app/globals.css` → `@theme`). Personality: precise, modern, calm, premium.

## Tokens
- Neutrals: CSS vars `--bg --surface --surface-2 --text --muted --subtle --border` (auto light/dark via `prefers-color-scheme`).
- Accent: indigo→violet gradient (`--color-brand-600` → `--color-accent-500`). ONE accent only; use for primary
  actions, result numbers (`.text-gradient`), focus rings. Everything else neutral.
- Radius: inputs/buttons `rounded-xl`, cards `rounded-2xl`, hero tool card `rounded-3xl`.
- Type: system font stack (zero font requests). Display `tracking-tight font-extrabold`; numbers `tabular-nums`.

## Primitives (classes in globals.css — use these, don't re-invent)
`container-x` · `card` · `glass` · `field` · `label` · `btn-primary` · `btn-ghost` · `chip` (supports `aria-pressed`)
· `text-gradient` · `prose-sp` (article typography) · `formula` · `muted` / `subtle`.

## Motion (all CSS; respects `prefers-reduced-motion`)
- `<Reveal>`: fade/slide-in on enter, fade-out on leave (pass `once` for long article bodies). Stagger with `delay={1|2|3}`.
- `<Tilt>`: 3D perspective tilt + sheen on cards (mouse only). Put `.lift` on inner content for depth.
- Hero backdrop: `.aurora` (animated blurred orbs) + `.grid-3d` (perspective grid). No WebGL/three.js (LCP + bundle).
- Result change: `key={value}` + `animate-pop` for a subtle pop when the answer updates.
- Durations 150ms (hover) / 450–800ms (enter), easing `--ease-out-expo`. Never animate layout-affecting properties on scroll.

## Calculator UI pattern
Two columns on desktop (inputs | result), stacked on mobile. Inputs: chips for small option sets, segmented toggle for
binary, quick-pick chips for popular values (from keyword data). Result: label → big answer → stats grid → visual
(calendar/chart/table) → actions (copy, share, .ics/print). Large touch targets (≥44px), visible focus.
