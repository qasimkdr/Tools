# Design system

Tailwind v4 (CSS-first config in `src/app/globals.css` → `@theme`). Personality: precise, modern, calm, premium.

## Tokens
- **Light mode only** (owner decision 2026-11-21): no dark theme and no `prefers-color-scheme` switching.
- Neutrals: warm paper/stone CSS vars `--bg --surface --surface-2 --text --muted --subtle --border`.
- Accent: ONE solid deep teal (`--color-brand-600` #0d6b5a, hover `-700`). Use it for primary actions, result numbers
  (`.text-gradient`, now a solid color) and focus rings. Amber (`--color-accent-500`) is only for the rare `.marker` highlight.
- **Avoid the generic AI look:** no purple/pink gradients, no gradient text, no glowing coloured shadows, no neon blobs.
  Shadows are soft and neutral (stone at low opacity).
- Radius: inputs/buttons `rounded-xl`, cards `rounded-2xl`, hero tool card `rounded-3xl`.
- Type: system font stack (zero font requests). Display `tracking-tight font-extrabold`; numbers `tabular-nums`.

## Primitives (classes in globals.css — use these, don't re-invent)
`container-x` · `card` · `glass` · `field` · `label` · `btn-primary` · `btn-ghost` · `chip` (supports `aria-pressed`)
· `text-gradient` · `prose-sp` (article typography) · `formula` · `muted` / `subtle`.

## Motion (all CSS; respects `prefers-reduced-motion`)
- `<Reveal>`: fade/slide-in on enter, fade-out on leave (pass `once` for long article bodies). Stagger with `delay={1|2|3}`.
- `<Tilt>`: 3D perspective tilt + sheen on cards (mouse only). Put `.lift` on inner content for depth.
- Hero backdrop: `.aurora` (very faint teal/sand wash, slow) + `.grid-3d` (perspective grid). No WebGL/three.js (LCP + bundle).
- Result change: `key={value}` + `animate-pop` for a subtle pop when the answer updates.
- Durations 150ms (hover) / 450–800ms (enter), easing `--ease-out-expo`. Never animate layout-affecting properties on scroll.

## Calculator UI pattern
Two columns on desktop (inputs | result), stacked on mobile. Inputs: chips for small option sets, segmented toggle for
binary, quick-pick chips for popular values (from keyword data). Result: label → big answer → stats grid → visual
(calendar/chart/table) → actions (copy, share, .ics/print). Large touch targets (≥44px), visible focus.
