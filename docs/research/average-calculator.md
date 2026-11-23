# Brief: Average Calculator (`/average-calculator/`) · 2026-11-23
- Primary cluster 39,700 (KD 18; "how to calculate average" 9,900, "average time calculator" 2,400, "average percentage" cluster). Data: `research/average-calculator/report.md` (inchcalculator 20/25, omni 18/25, calculatorsoup 17, calculator.net 15/25).
- Reuses `descriptive.ts`; new `average.ts` (geometric/harmonic means, time parsing). Distinct from /weighted-mean-calculator/ (linked).
## Gaps beaten
Three modes: numbers (mean with working, median, mode, range, geometric, harmonic, SD), percentages weighted by group size (vs naive average), times in h:mm:ss · common-mistakes section.
## Test cases
4,8,15,16,23,42 → 18, median 15.5, no mode · 80% of 50 + 90% of 10 → 81.67% (simple 85%) · 5:30, 6:15, 5:58, 6:02 → 5:56.3.
