# Brief: Date Difference Calculator (`/date-difference-calculator/`) · 2026-11-23
- Primary: "time between calculator" (cluster 7,400). Research **4 pages: calculatorsoup 20/30, calculator.net 18/30, thecalculatorsite 17/30, omnicalculator 16/30**.
- Overlap: /days-from-today/ adds/subtracts days from a date; /age-calculator/ is birth-date specific. This counts the span between two arbitrary dates → different intent. Reuses lib/date (ageBetween, countBusinessDays, holidaysBetween).
## Gaps beaten
Y/M/D + total days/weeks/months · include-end toggle · business days with/without weekday federal holidays (listed) · optional times · today buttons · DST note.
## Test cases
2026-01-01 → 2026-12-25: 11 mo 24 d, 358 days (359 incl.), 51 w 1 d, 256 business days, 246 minus 10 holidays.
