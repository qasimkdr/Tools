# Brief: Mortgage Calculator (`/mortgage-calculator/`) · 2026-11-22 · YMYL (finance)
- Sheet keywords are state-specific ("mortgage calculator idaho/ky/kansas…") plus "monthly mortgage calculator with taxes and insurance". Decision: ONE strong calculator (no 50 state pages — would need verified state tax data and risks scaled-content patterns).
- Overlap check: distinct from live /payment-calculator/ (adds tax, insurance, PMI, HOA, PMI rules).
- Data: `research/mortgage-calculator/report.md` (calculatorsoup, omnicalculator, calculator.net, calculator.io; lendingtree/sofi/smartasset/nerdwallet unreachable or blocked).
- PMI rules verified (CFPB, Homeowners Protection Act): request at 80% scheduled balance, automatic at 78%, midpoint backstop.
## Gaps beaten
PITI + PMI + HOA breakdown bar · PMI request/automatic dates · total PMI · payoff date · yearly table + CSV · CFPB source · affordability guideline · cost-cutting tips.
## Test cases
$400k, 20% down, 6.5%, 30 yr, 1.1% tax, $1,500 ins → P&I $2,022.62, total $2,514.28, interest ≈ $408,142 · 10% down → $2,917.11, PMI $150, request at payment 95, auto at 109 · 15 yr → $2,787.54.
