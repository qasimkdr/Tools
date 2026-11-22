# Brief: Confidence Interval Calculator (`/confidence-interval-calculator/`) · 2026-11-22
- Primary: "confidence interval calculator" (3,600). Data: `research/confidence-interval-calculator/report.md` (calculator.net, inchcalculator, omnicalculator).
- Math in `src/lib/stats.ts`: Acklam inverse normal (+Halley step), t CDF via regularized incomplete beta, inverse t by bisection; verified against tables (1.95996; t24 2.0639; t1 12.706; t5,.995 4.0321).
## Gaps beaten
Mean with t or z · proportion with Wald AND Wilson (+ small-sample warning) · any confidence level · SE, MOE, critical value with df · interpretation · critical-value table.
## Test cases
50/10/25 @95% t → 45.8722–54.1278 · z → 46.0801–53.9199 · 520/1000 → 0.489–0.551 · 3/20 Wilson → 0.0524–0.3604.
