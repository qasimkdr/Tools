# Brief: Quilt Binding Calculator (`/binding-calculator/`) · 2026-11-26 · scheduled · everyday
- Primary: "binding calculator" (1,300, KD 9). SERP intent is mostly quilt binding (a few binding-energy and ski results). Competitor: Omni 15/25 (JS); miniwebtool, needlepointers, sewingbysarah unreachable.
- Method (USU Extension, quilting guides): perimeter + 10–20″, strips = ⌈length ÷ WOF⌉, fabric = strips × width; bias square = √(length × width). Lib: `src/lib/quiltBinding.ts`.
## Gaps beaten
Inches/cm · size presets · straight-grain and continuous bias · strips, seams, leftover, yardage in ⅛ yd · size table · tips · 7 FAQs (Omni has none).
## Test cases
60×72, 2.5, 42, +10: 274″, 7 strips, ½ yd; bias 27″ square, ¾ yd · 108×108: 11 strips, ⅞ yd.
