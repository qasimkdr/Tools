# Brief: Boolean Algebra Calculator (`/boolean-algebra-calculator/`) · 2026-11-26 · scheduled · math
- Primary: "boolean algebra calculator" (1,600, KD 11). SERP: dCode, Cuemath, eMathHelp, MeraCalculator, MyCalcBuddy. None could be fetched (network policy), so no score. Roadmap category corrected from health to math.
- Method: Quine–McCluskey prime implicants + exact minimum cover; POS from zeros. Lib: `src/lib/boolean.ts`.
## Gaps beaten (vs SERP descriptions)
Accepts prime, !, ~, juxtaposition, symbols and words · minimal SOP and POS · minterms/maxterms · tautology/contradiction · equivalence check with a counterexample row · highlighted truth table · laws table · worked QM example · 7 FAQs.
## Test cases
AB + A'C + BC → AB + A'C; POS (A + C)(A' + B); Σm(1,3,6,7) · (A+B)(A+C) → A + BC · A + A' → tautology · "A +" → error.
