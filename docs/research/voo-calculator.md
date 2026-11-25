# Brief: VOO Calculator (`/voo-calculator/`) · 2026-11-25 · scheduled 2026-11-27 14:55 PKT · finance
- Primary: "voo calculator" (1,900, KD 14). SERP is dominated by small VOO-only sites (voo.us, pages.dev, vercel.app, dividendcalculator.io) that this environment cannot inspect; scored against general investment calculators instead (omni 21, calculator.net 19, smartasset 17).
- Verified (Vanguard profile + fact sheet via search): expense ratio 0.03%, inception 2010-09-07, average annual return since inception 14.89% NAV through 2025-09-30. Lib: `src/lib/invest.ts`.
## Gaps beaten
Return presets incl. VOO since-inception figure with date and source · expense-ratio fees shown · inflation-adjusted value · scenario table 6/8/10/14.89% · stacked growth chart · year-by-year table · fee comparison (0.03% vs 0.50%) · clear projection caveats.
## Test cases
$10k + $500/mo, 20 y, 0.03%, 3% infl: 10% → $424,609 (contributed $130,000, fees $934, today $235,096) · 6% → $257,794 · 8% → $329,772 · 14.89% → $803,942 · no fee → $426,405 · 0.50% → $397,585.
