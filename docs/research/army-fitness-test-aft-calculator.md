# Brief: AFT Calculator (`/army-fitness-test-aft-calculator/`) · 2026-11-23
- Primary: "aft calculator" cluster 24,800 (KD 30). Data: `research/army-fitness-test-aft-calculator/report.md` (inchcalculator 22, omni 18).
- Data: official "AFT Scoring Scales" PDF (army.mil, approved 15 May 2025, effective 1 June 2025) transcribed by script into `src/lib/aftTables.ts` (5 events × 10 age groups × M|C/F). Standards from army.mil search results: general 60/event + 300; combat 60/event + 350, sex-neutral, AC 1 Jan 2026, RC/NG 1 Jun 2026.
## Gaps beaten
All 5 events from the official tables · general and combat standards · per-event points with targets for 60 and 100 in your group · total bar · m:ss time inputs.
## Test cases
25 y M general 250 lb/40/1:55/2:30/16:00 → 81/83/78/80/87 = 409 pass · 19 y: 340 lb and 13:22 → 100 each · 140 lb deadlift (22–26) → 50 → fail · 2MR 60 pts 22–26 M = 19:45.
