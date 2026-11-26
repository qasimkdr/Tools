# Brief: Roofing Calculator (`/roofing-calculator/`) · 2026-11-26 · scheduled · construction
- Primary: "roof calculator" (4,400, KD 22); cluster incl. "roofing calculator" (12,100, KD 39), "shingle calculator" (4,400). Competitors: inchcalculator 22/30, calculator.net 19/30, Omni 18/25 (JS).
- Verified: 1 square = 100 sq ft; most asphalt shingles 3 bundles/square, some 4–5 (GAF, IKO). Pitch factor √(1+(p/12)²); hip length r√(2+(p/12)²). Lib: `src/lib/roof.ts`.
## Gaps beaten
Gable/hip/shed/flat · overhangs · waste and bundles-per-square inputs · ridge + hip ridge cap · drip edge (eaves + rakes) · underlayment rolls from label coverage · optional cost per square · pitch comparison table · pitch factor table · formula and worked example · tips · 7 FAQs.
## Test cases
40×30, 1 ft, 6/12 gable, 10%, 3/sq: 1,503 sq ft, 15.03 sq, 50 bundles, ridge 42 ft, drip 155.6 ft · hip: ridge+hips 106 ft, drip 148 ft · $450/sq → $7,438.
- Gap fixes (2026-11-26): pitch in degrees (12 × tan θ); nails = bundles × shingles per bundle (from wrapper) × nails per shingle (4 standard, 6 high wind; GAF). Shingles-per-square default not used because no manufacturer source was found. Tests: 26.565° → 1,503 sq ft; 26/bundle × 4 → 5,200 nails.
- Feature parity (seo:gaps, 2026-11-26): metric units added; step-by-step working; felt/underlayment label. Skipped: video (not part of our format); calculator.net acre/m² area outputs covered by metric mode.
