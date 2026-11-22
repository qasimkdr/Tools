# Brief: NPV Calculator (`/npv-calculator/`) · 2026-11-22
- Primary: "npv calculator" (4,400). Data: `research/npv-calculator/report.md` (calculatorsoup, omnicalculator, inchcalculator — 3 pages; open-list sites unreachable).
- Convention: end-of-period flows, same as Excel =NPV(rate, flows) − initial. Pure helpers in `src/lib/npv.ts`.
## Gaps beaten
Up to 30 editable years (URL state) · IRR · profitability index · simple + discounted payback · PV table + CSV · rate-sensitivity example · Excel note.
## Test cases
10,000; 3000/4000/5000/3000 @ 8% → NPV 2,381.38, IRR 18.03%, PI 1.238, payback 2.60, discounted 2.96 · @12% 1,332.80 · @15% 636.11.
