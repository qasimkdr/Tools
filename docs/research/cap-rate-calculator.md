# Brief: Cap Rate Calculator (`/cap-rate-calculator/`) · 2026-11-26 · scheduled · finance
- Primary: "cap rate calculator" (6,600, KD 24). Competitors: inchcalculator 22/30, Omni 17/25 (JS); dqydj and PropertyMetrics unreachable.
- Definition (Nareit, CFI): cap rate = NOI ÷ value; NOI excludes debt service. Lib: `src/lib/capRate.ts`.
## Gaps beaten
Itemized NOI (vacancy, management %, taxes, insurance, repairs, other) or NOI shortcut · monthly/yearly rent · expense ratio · GRM · value at a target cap rate · value sensitivity table 4–10% · include/exclude table · limits · 7 FAQs.
## Test cases
$400k, $3,200/mo, 5% vac, $4,800/$1,800/$2,400, 8% mgmt, $1,000: NOI $23,561.60, 5.89%, $362,486 at 6.5% · NOI $60k / $700k → 8.57%, $923,077 at 6.5%.
- Gap fixes (2026-11-26): optional financing → cash-on-cash return and DSCR; sections on how cap rate/NOI move value and on other ratios. Test: $100k cash, $18k debt service → 5.56%, 1.31×.
