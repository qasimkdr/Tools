# Brief: Cone Volume Calculator (`/cone-volume-calculator/`) · 2026-11-22
- Primary: "cone volume calculator" (2,400) + cone volume formula cluster. Data: `research/cone-volume-calculator/report.md` (inchcalculator, omnicalculator, calculator.net, calculatorsoup).
- Overlap: distinct from live /cylinder-volume-calculator/ (different solid). Frustum helpers appended to `src/lib/geometry.ts` (additive; cylinder page unaffected, e2e passes).
## Gaps beaten
Cone + frustum · radius or diameter · mixed units · ft³/gal/L/in³/m³ · slant height, lateral and total area · formula with user numbers · height-vs-slant guidance.
## Test cases
d 2 ft × h 3 ft → 3.142 ft³ = 23.50 gal, slant 3.162, area 13.08 · frustum radii 2/1 × 3 → 21.991 ft³.
