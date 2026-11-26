# Brief: Watt Hour Calculator (`/watt-hour-calculator/`) · 2026-11-26 · scheduled · science
- Primary: "watt hour calculator" (1,600, KD 13). Competitors: inchcalculator (W→kWh) 22/30, Omni 18/25; footprinthero not scored.
- Sources: FAA PackSafe (100 / 160 Wh tiers; Wh = V × Ah); NIST SP 811 (1 Wh = 3,600 J). Lib: `src/lib/energyWh.ts`.
## Gaps beaten
Three modes (W×h with daily/period cost, battery mAh/Ah→Wh, runtime with efficiency) · FAA flight check · FAA table · Ah-vs-Wh explanation · 7 FAQs.
## Test cases
60 W × 8 h = 480 Wh, 0.480 kWh, $2.16 / 30 days at $0.15 · 5,000 mAh × 3.7 V = 18.5 Wh (≤100) · 6,500 mAh × 15.4 V = 100.1 Wh (approval) · 600 Wh / 60 W = 10 h.
