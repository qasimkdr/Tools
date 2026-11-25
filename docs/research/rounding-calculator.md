# Brief: Rounding Calculator (`/rounding-calculator/`) · 2026-11-25 · scheduled 2026-11-27 14:55 PKT
- Primary cluster 37,200 ("rounding calculator" 12,100, "rounding solver" 9,900, "round to the nearest tenth calculator" 2,900). Data: `research/rounding-calculator/report.md` (inchcalculator 22, calculatorsoup 22, omni 17/25, calculator.net 17).
- Distinct from live /decimals-calculator/ (decimal arithmetic; rounding is a side feature). Lib: `src/lib/round.ts` (exact BigInt decimals).
## Gaps beaten
Exact decimal rounding (2.675 → 2.68, where float tools give 2.67) · place value, sig figs and any step · 7 rounding rules side by side · decider-digit explanation · list rounding · double-rounding and float pitfalls explained.
## Test cases
3.14159 → 3.14 · 2.675 → 2.68 · 2.5 half-even → 2 · 1234.5678 → 1,200 (hundreds) · 0.004567, 2 sf → 0.0046 · 3.67 → 3.75 (0.25 step) · 9.996, 3 sf → 10.0.
