# Brief: APR Calculator (`/apr-calculator/`) · 2026-11-22 · YMYL (finance)
- Primary: "apr calculator" (27,100). Data: `research/apr-calculator/report.md` (calculator.net, calculatorsoup, omnicalculator, inchcalculator).
- Overlap decision: live /interest-rate-calculator/ solves rate from payment (no fee input); APR = fees → true rate (different task). APY kept out (separate roadmap page).
- Method: payment on (amount + financed fees) or amount; APR = 12 × rate solving annuity on amount received (TILA-style for fixed installment loans); uses money.ts payment/rateFor (unchanged).
## Gaps beaten
Fees financed vs upfront · points over note rate · amount received, finance charge, total cost · short vs long loan insight · CFPB link.
## Test cases
$20k 7% 5y $800 financed → $411.86, 8.659% · upfront → $396.02, 8.727% · $300k 6.5% 30y $7,500 upfront → $1,896.20, 6.745%.
