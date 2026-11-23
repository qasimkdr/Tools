# Brief: How Long Will Retirement Savings Last (`/how-long-will-retirement-savings-last-calculator/`) · 2026-11-23
- Primary: "how long will my retirement savings last calculator" (2,400; cluster 4,800). Research **2 pages: calculator.net retirement 21/30, calculatorsoup 19/30**. Overlap: /401k-calculator/ = accumulation; this = drawdown.
- Model (new lib/drawdown.ts): monthly compounding at (1+r)^(1/12)−1, withdrawals raised by inflation yearly; bisection for sustainable withdrawal. 4% rule shown as a rule of thumb (no guarantee). Sources: Boston College CRR, BLS CPI.
## Gaps beaten
Inflation-adjusted withdrawals · years+months · withdrawal that lasts a target · 4% rule comparison · year-by-year table + CSV · withdrawal-rate table · sequence-risk caveat.
## Test cases
$500k, $3,000/mo, 5%, 3% → 16 y 6 m; 30-yr withdrawal $1,858.69; 4% → 34 y 11 m · $300k, $2,500, 0%/0% → 10 y 0 m.
