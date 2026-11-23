# Brief: Lead Time Calculator (`/lead-time-calculator/`) · 2026-11-23
- Primary: "lead time calculator" (2,900). Research **partial (1 page: omnicalculator 17/25)**.
- Formulas (Replicon, Fishbowl, Zoho per search): lead time = sum of stages (reordering delay + supply delay); reorder point = demand × lead time + safety stock. Business days via lib/date addBusinessDays (US federal holidays optional).
## Gaps beaten
Stage breakdown · forward (delivery) and backward (order-by) · business/calendar days with holidays · reorder point · lead-time types table.
## Test cases
Dec 1, 2026 + 12 business days → Thu Dec 17, 2026 · need by Jan 15, 2027, −12 biz (skip Dec 25, Jan 1) → Tue Dec 29, 2026 · 20/day × 12 + 50 → 290.
