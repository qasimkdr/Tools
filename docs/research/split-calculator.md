# Brief: Split Calculator (`/split-calculator/`) · 2026-11-23
- Primary: "split calculator" (2,400, KD 8). SERP intent is mixed (bill split apps dominate; also stock, workout, salary splits). Chosen angle: bill splitting. Data: `research/split-calculator/report.md` (inchcalculator split-bill, calculatorsoup tip, calculator.net tip).
- Lib: `src/lib/split.ts` (largest-remainder cents allocation).
## Gaps beaten
Even AND itemized split in one tool · shared items · tax prorated by order · tip before/after tax, by amount or equal · round each share up to $1/$5 with surplus shown · shares always sum to the exact bill · shareable URL with names.
## Test cases
$120, 8%, 18% pre-tax, 4 people → $37.80 each (total $151.20) · round $5 → $40.00, $8.80 extra · $100/3 → 33.34/33.33/33.33 · itemized Alex 32.50, Sam 18, Jo 24.50 + $15 shared → $47.25/$28.98/$37.17 = $113.40.
