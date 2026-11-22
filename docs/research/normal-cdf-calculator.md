# Brief: Normal CDF Calculator (`/normal-cdf-calculator/`) · 2026-11-22
- Primary: "normal cdf calculator" (4,400). Data: `research/normal-cdf-calculator/report.md` (omnicalculator, inchcalculator, calculator.net z-score).
- `normCdf` export added to `src/lib/stats.ts` (additive; verified Φ(1.96)=0.975002, Φ(−3)=0.0013499).
## Gaps beaten
Below/above/between/outside + inverse in one · shaded SVG curve · z-scores · TI-83/84 normalcdf/invNorm equivalents · 68-95-99.7 and z-table.
## Test cases
μ100 σ15: P(X≤120)=0.908789 · P(85–115)=0.682689 · P(X≥130)=0.02275 · 95th pct = 124.672804.
