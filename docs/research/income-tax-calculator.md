# Brief: Income Tax Calculator (`/income-tax-calculator/`) · 2026-11-23 · finance (YMYL)
- Primary: "taxable income calculator" (6,600, KD 41) + "tax calculator online". Data: `research/income-tax-calculator/report.md` (calculatorsoup 19, calculator.net 17).
- Verified from primary sources (irs.gov, fetched): IR-2025-103 + Rev. Proc. 2025-32 Tables 1–4 (all statuses), standard deductions 16,100/32,200/24,150/16,100, additional aged/blind 1,650/2,050. OBBB senior deduction mentioned only as existing (amount not stated). Lib: `src/lib/incomeTax.ts`; cumulative tax at every bracket boundary matches the Rev. Proc. exactly.
## Gaps beaten
Official 2026 tables for 4 statuses · taxable-income walkthrough (AGI → deduction → taxable) · standard vs itemized + aged/blind · credits · refund/owed from withholding · bracket-by-bracket table · marginal vs effective · clear scope (no FICA/state/AMT).
## Test cases
Single $85k − $5k 401(k) → taxable $63,900, tax $8,770, 22%, 10.32% · MFJ taxable $768,700 → $206,583.50 · withheld $9,000 → refund $230.
