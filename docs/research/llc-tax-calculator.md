# Brief: LLC Tax Calculator (`/llc-tax-calculator/`) · 2026-11-26 · published immediately · finance (YMYL)
- Primary: "llc tax calculator" (1,000, KD 12). Inspectable competitor: SmartAsset LLC tax page (16/30). Other results were JS-only or blocked.
- Verified from primary sources: SE tax 15.3% on 92.35% of net earnings, $400 floor (IRS Topic 554); 2026 Social Security wage base $184,500 (SSA); 0.9% Additional Medicare thresholds; QBI 20% and 2026 thresholds (Rev. Proc.); reasonable S-corp salary (IRS). Lib: `src/lib/llcTax.ts` (uses `incomeTax.ts` 2026 brackets).
## Gaps beaten
SE tax + federal income tax + QBI in one total · filing status and other income · ownership share for multi-member LLCs · S-corp comparison with salary and saving · quarterly estimate · Additional Medicare · optional state rate · sources and caveats.
## Test cases
Single, $90k: SE $12,716.60, QBI $13,508.34, taxable $54,033.36, income tax $6,599.34, total $19,316 · S-corp $50k salary: payroll $7,650, income tax $8,536.80, total $16,187, saving ≈ $3,129.
