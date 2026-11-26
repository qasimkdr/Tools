# Brief: Decking Calculator (`/decking-calculator/`) · 2026-11-26 · scheduled · construction
- Primary: "deck board calculator" (6,600, KD 26) + "deck calculator" (6,600, KD 25). Competitors: inchcalculator 24/30, Omni 18/25; decks.com unreachable.
- Gaps/joists: Trex (composite 3/16–3/8″ gaps; joists ≤16″ o.c.), Deckorators guides (⅛″, 16″/12″ diagonal). Lib: `src/lib/deck.ts`.
## Gaps beaten
Actual-width presets · gap · 5 board lengths with a boards/butt-joints table · joists · screws and hidden clips · cost · board table · tips · 7 FAQs.
## Test cases
12×16 (16 ft run), 5.5 + 0.125, 16 ft, 10%: 26 rows, 416 ft, 29 boards, 13 joists × 12 ft, 676 screws · 12×12: 29 × 12 ft, $25 → $725.
- Gap fixes (2026-11-26): stair treads (pieces per step, boards cut from stock); materials comparison table. Test: 3 steps × 4 ft → 6 pieces, 2 boards, total 31 × 16 ft.
- Feature parity (seo:gaps, 2026-11-26): metric units (m, mm, metric board lengths) added; parts-of-a-deck and full-budget list; cheapest-decking FAQ. Skipped: 'get professional estimates' (filler).
