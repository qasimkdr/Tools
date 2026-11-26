# Brief: Bowling Handicap Calculator (`/bowling-handicap-calculator/`) · 2026-11-26 · scheduled · education
- Primary: "bowling handicap calculator" (1,000, KD 4). No competitor page could be fetched by the crawler (gobowling, bowlingball.com, calculator.academy, printyourbrackets, legionreport, everycalculators all unreachable), so no score.
- Rule (USBC handicap facts; Bowling.com): handicap = % × (basis − average), fractions dropped, 0 at/above basis; average = pins ÷ games, fractions dropped. Lib: `src/lib/bowlingHandicap.ts`. New tool; live /bowling-score-calculator/ only scores frames (different intent).
## Gaps beaten
Average from pins/games · presets (90% of 220, 80% of 230, 90% of 210, 100% of 200) · shown working · series handicap · game-by-game handicap scores · team handicap table · handicap-by-average table · league-rule notes · 7 FAQs.
## Test cases
165, 90% of 220 → 49 (series 147; 158/172/181 → 658) · 80% of 230 → 52 · 2,487/15 → 165 · 225 → 0 · team 165/182/140/201 → 172.
