# Brief: Brick Calculator (`/brick-calculator/`) · 2026-11-26 · scheduled · construction
- Primary: "brick calculator" (5,400, KD 25). Competitors: inchcalculator 24/30, Omni 17/25; UK suppliers (Travis Perkins, Jewson, BDA) in SERP.
- Method: exact geometry (bricks per area from brick + joint face; mortar = brick-plus-joint volume − brick volume). Cross-check: modular ⅜″ → 8.06 cu ft per 1,000 bricks vs ~8.1 quoted from BIA TN 10 (gobrick.com blocked here). BIA nominal 6.75/sq ft noted. Lib: `src/lib/brick.ts`.

## Feature matrix
| Feature | Who has it | Ours |
|---|---|---|
| Wall width/height, units | inchcalculator | built (ft / m with conversion) |
| Brick type presets | inchcalculator | built (US modular, standard, utility, UK metric) |
| Custom brick size | Jewson, Omni | built |
| Mortar joint thickness | Omni, Jewson | built |
| Openings (doors/windows) | Mathcheck, whole-house tools | built |
| Mortar quantity | inchcalculator, Omni | built (volume + per 1,000 + optional bags from bag yield) |
| Price / cost | inchcalculator | built |
| Waste | most | built |
| Step-by-step | Omni | built |
| "How much cement for 1,000 bricks" | Omni FAQ | built (FAQ, computed) |
| Whole house (four walls) | vcalc | covered by tips (add walls); not a separate mode |
| Extras | — | sizes table with per sq ft / m², two-wythe note, batch-color tip |

## Test cases
20×8 ft − 3×4 window, modular, ⅜″, 5%: 6.86/sq ft, 1,066 bricks, 8.2 cu ft mortar · UK 215×65, 10 mm: 59.26/m²; 5×2 m → 623 bricks.
- seo:gaps review: 'Brick coverage table' covered by the sizes table (per sq ft / m²). Omni's mortar ingredient mix (cement/lime/sand) skipped: proportions depend on mortar type and product; we point to the bag's yield instead.
