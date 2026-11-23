# Brief: Decimals Calculator (`/decimals-calculator/`) · 2026-11-23
- Primary: "decimals calculator" (2,400). Research **partial (2 pages: calculatorsoup 17/30, omnicalculator 18/25)**.
- Exact arithmetic via lib/rational.ts (BigInt fractions) + new lib/decimalExpand.ts (repeating-decimal detection, half-away-from-zero rounding).
## Gaps beaten
No float errors (0.1+0.2=0.3) · repeating decimals with overline · fraction + percent · any rounding · hand-method steps for each operation.
## Test cases
12.75 × 3.4 = 43.35 (867/20) · 12.75 ÷ 3.4 = 3.75 · 1 ÷ 7 = 0.(142857), 0.1429 · 0.1 + 0.2 = 0.3.
