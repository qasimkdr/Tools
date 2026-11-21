# Brief: Payment Calculator (`/payment-calculator/`) · 2026-11-21
- Primary: "payment calculator" (74,000 / KD 16, Semrush). Data: `research/payment-calculator/report.md` (4 pages: inchcalculator, calculator.io, omnicalculator, calculator.net; bankrate + nerdwallet blocked by robots.txt).
- Intent: utility (15/20 results are tools) → tool first + explanatory guide. YMYL (finance) → cite CFPB, conservative wording.
- Kept: loan/monthly/extra/annual payment variants. Dropped: "mortgage payment calculator colorado" (local mortgage intent → future Mortgage Calculator).
## Gaps beaten (none of the 4 had all)
CSV download + print of schedule · extra-payment savings (interest + periods) · payment AND payoff-time modes · weekly/biweekly · impossible-payment warning · principal-vs-interest bar · authoritative source (CFPB) · tips section · 7 FAQs + FAQ schema.
## Test cases (verified, tests/e2e/new-tools.spec.ts)
$20,000 · 6% · 5y → $386.66, interest $3,199.36 · +$100/mo → 13 payments early, $754.98 saved · $10,000 · 12% · $300 → 41 payments · $30,000 · 7% → 60mo $594.04 / 72mo $511.47.
