# Brief: Implicit Differentiation Calculator (`/implicit-differentiation-calculator/`) · 2026-11-23
- Primary: "implicit differentiation calculator" (1,900, KD 7). Data: `research/implicit-differentiation-calculator/report.md` (symbolab, mathsisfun).
- Lib: `src/lib/implicitDiff.ts` on mathjs 15.2.0 (new dependency, owner-approved; symbolic derivative + simplify). Lazy-loaded only on this page. Own input normalizer (2xy, x², ln/log) and fraction tidy (cancels common integer factors).
## Gaps beaten
dy/dx with chain-rule steps · slope, numeric d²y/dx², tangent and normal line at a point · warns when the point is not on the curve · vertical tangent handled · examples.
## Test cases
x²+y²=25 → −x/y; at (3,4): −0.75, y″ −0.390625, y = −0.75x + 6.25 · x³+y³=6xy → (2y − x²)/(y² − 2x), slope −1 at (3,3) · (1,1) off-curve warning.
