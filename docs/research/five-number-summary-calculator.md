# Brief: Five Number Summary Calculator (`/five-number-summary-calculator/`) · 2026-11-26 · scheduled · math
- Primary: "five number summary calculator" (1,600, KD 11) + "5 number summary calculator" (1,600, KD 13). Competitors: CalculatorSoup 21/30, Omni 18/25 (JS); MiniWebtool, MathCracker unreachable.
- Methods: exclusive (TI-84/textbook), Tukey hinges (R fivenum), linear (Excel QUARTILE.INC, R type 7; Hyndman & Fan 1996). Fences 1.5 × IQR (NIST e-Handbook box plot). Lib: `src/lib/fiveNum.ts`.
## Gaps beaten
Three quartile methods with explanation · IQR, range, mean, fences, outliers · SVG box plot · sorted data · methods comparison table · box-plot reading guide · 7 FAQs.
## Test cases
3,7,8,5,12,14,21,13,18: textbook 3,6,12,16,21 (IQR 10); Tukey/linear 3,7,12,14,21 · 2,4,6,8,10,12 linear Q1 4.5, Q3 9.5 · 1..10,100: outlier 100 (fence 18).
