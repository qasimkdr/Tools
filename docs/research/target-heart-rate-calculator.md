# Brief: Target Heart Rate Calculator (`/target-heart-rate-calculator/`) · 2026-11-26 · scheduled · health
- Primary: "max heart rate calculator" (12,100, KD 45) + "maximum heart rate calculator" (6,600), "max hr calculator" (3,600), "finding maximum heart rate calculator" (2,900, roadmap primary). Competitors: inchcalculator 20/25, calculator.net 19/30, CalculatorSoup 19/30.
- Sources: CDC target heart rate page (220 − age; 64–76% / 77–93%; 50-year-old example 109–129), Tanaka 2001 (PMID 11153730), Nes 2013 (PMID 22376273), Gulati 2010 (PMID 20585008). Lib: `src/lib/heartRate.ts`.

## Feature matrix
| Feature | Who has it | Ours |
|---|---|---|
| Age → max HR | all | built |
| Measured max overrides formula | calculator.net ("test result") | built |
| Multiple formulas (Fox, Tanaka, Nes) | calculator.net | built + Gulati (women) + comparison table |
| Resting HR / Karvonen | calculator.net, inchcalculator, CalculatorSoup | built |
| CDC moderate/vigorous ranges | inchcalculator | built |
| Training zones | inchcalculator, CalculatorSoup | built (5 zones with "how it feels") |
| Borg RPE scales | calculator.net | covered by the talk test and zone "how it feels" (no RPE-to-HR table: mappings vary by source) |
| Resting HR info | inchcalculator | built (FAQ) |
| Extras | — | 30-second pulse counts, talk test, weekly activity guideline, safety notes |

## Test cases
Age 40: max 180, moderate 115–137, vigorous 139–167 · age 50: 109–129 · Karvonen rest 60: 137–151 · known 190 · Tanaka age 60: 166.
- seo:gaps review: added zone bar chart. Borg RPE scales skipped: published RPE-to-heart-rate mappings differ between sources; the talk test (CDC) and 'how it feels' column cover perceived effort. 'reset' skipped.
