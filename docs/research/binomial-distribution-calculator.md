# Brief: Binomial Distribution Calculator (`/binomial-distribution-calculator/`) · 2026-11-26 · scheduled · math
- Primary: "binomial distribution calculator" (5,400, KD 26). Competitors: inchcalculator 25/30 (7,035 words), Omni 19/25; Statistics by Jim, Statology-type tools in SERP.
- Sources: NIST e-Handbook 1.3.6.6.18 (verified URL), Penn State STAT 414 Lesson 10. Log-space PMF for n up to 10,000. Lib: `src/lib/binomial.ts`.

## Feature matrix
| Feature | Who has it | Ours |
|---|---|---|
| n, p, k inputs; P(X = k) | all | built |
| Cumulative ≤, <, ≥, > | inchcalculator, Inventive HQ, Analyzemath | built (all shown at once) |
| Between a and b | some | built |
| Mean, variance, SD | Omni, inchcalculator, Inventive | built (+ mode) |
| Chart | inchcalculator, Inventive, MiniWebtool | built (highlighted bars) |
| Distribution table | Omni, MiniWebtool | built (full table to n = 200, with ≤ and ≥ columns) |
| Step-by-step | Omni, inchcalculator, MiniWebtool | built |
| Conditions for binomial | Omni, inchcalculator | built |
| Extras | — | normal approximation with continuity correction, complement, words→symbols table, large n |

## Test cases
n=10, p=0.5, k=3: 0.117188, ≤ 0.171875, ≥ 0.945313, mean 5 · n=20, p=0.05, ≥1: 0.641514 · 4 ≤ X ≤ 6: 0.65625 · dice ≥2 sixes in 6: 0.2632.
- seo:gaps review: chart is a bar chart (div bars, role=img); 'how do you know if binomial' / 'what makes something not binomial' covered by the conditions section and FAQ; added word-problem tips.
