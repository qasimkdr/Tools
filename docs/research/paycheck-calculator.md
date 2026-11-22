# Brief: Paycheck Calculator (`/paycheck-calculator/`) · 2026-11-22 · YMYL (taxes)
- Primary: "hourly wage and tax calculator" (3,600 / KD 1) + paycheck estimator / take-home pay cluster. Data: `research/paycheck-calculator/report.md` (calculator.net take-home, calculator.io paycheck, calculatorsoup gross pay, omnicalculator annual income). Gusto/ADP/SmartAsset/PaycheckCity unreachable.
- Verified 2026: brackets + standard deduction (IRS Rev. Proc. 2025-32 / IRS newsroom) · SS wage base $184,500 (SSA) · Additional Medicare 0.9% withheld over $200k (IRS) · OT deduction rules (IRS).
- Scope decision: single + MFJ only (HOH brackets not verified here); state tax as user-entered flat rate (no unverified state tables). Constants live in `src/lib/pay.ts` — update each tax year.
## Gaps beaten
Hourly + overtime input · 401(k) vs Section 125 FICA treatment · per-paycheck AND per-year breakdown · marginal bracket, total tax rate, take-home per hour · OT-deduction saving estimate · bracket table with source.
## Test cases
$25 × 40 biweekly single: $1,690.85 (fed $156.15, SS $124, Med $29) · +5 OT: $1,992.16, OT saving $390 · 401k $100 + health $50 + 5% state: $1,470.17 · MFJ: $1,770.85.
