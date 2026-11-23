# Brief: Partial Fraction Calculator (`/partial-fraction-calculator/`) · 2026-11-23
- Primary: "partial fraction calculator" (2,400, KD 9). Data: `research/partial-fraction-calculator/report.md` (symbolab, mathsisfun, omnicalculator; only 3 inspectable pages, others block automated reads). Several SERP tools limit denominator types (PlanetCalc, TotalCalcHub, calculate.co.nz).
- Lib: `src/lib/partialFractions.ts`: exact BigInt rationals, own polynomial parser, long division, rational-root + Yun square-free + quadratic-factor search, exact linear solve, exact verification. No dependency.
## Gaps beaten
Repeated linear AND repeated quadratic factors · improper fractions (division step) · factored or expanded input · any variable (s for Laplace) · every step (factor, setup, coefficient equations, solution) · exact check · honest limit message for factors irreducible over Q.
## Test cases
(3x+5)/(x²−x−2) = −2/(3(x+1)) + 11/(3(x−2)) · (5x−4)/((x−1)(x+2)²) = 1/(9(x−1)) − 1/(9(x+2)) + 14/(3(x+2)²) · (2x²+3)/(x³+x) = 3/x − x/(x²+1) · x³/(x²−1) = x + 1/(2(x−1)) + 1/(2(x+1)) · (s+3)/(s²+3s+2) = 2/(s+1) − 1/(s+2) · 1/(x⁴+3x²+2) = 1/(x²+1) − 1/(x²+2).
