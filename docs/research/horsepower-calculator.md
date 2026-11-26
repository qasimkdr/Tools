# Brief: Horsepower Calculator (`/horsepower-calculator/`) · 2026-11-26 · scheduled · science
- Primary: "horsepower calculator" (1,900, KD 17). Competitors: calculator.net 17/30, Omni 16/25 (JS). Overlap check: live /quarter-mile-calculator/ covers hp from ET/trap speed (different intent); this tool is torque/RPM, units and work, and links to it.
- Constants: 1 hp = 550 ft·lbf/s = 745.69987 W; PS = 735.49875 W; electric hp = 746 W; 33,000/2π = 5,252.11 (NIST SP 811). Lib: `src/lib/power.ts`.
## Gaps beaten
Solve hp or torque · lb-ft or N·m · all units at once (hp, kW, PS, W, electric hp, ft·lbf/s) · power from work · RPM table with the 5,252 crossover · units comparison table · 7 FAQs (competitors have none).
## Test cases
300 lb-ft @ 5,000 → 285.6 hp, 213.0 kW · 400 hp @ 6,000 → 350.1 lb-ft · 100 hp → 74.570 kW, 101.4 PS · 150 lb × 10 ft / 2 s → 1.364 hp.
