# Brief: Scientific Notation Converter (`/scientific-notation-calculator/`) · 2026-11-22
- Primary: "scientific notation converter" (3,600) + calculator / sci not / exponential notation. Data: `research/scientific-notation-calculator/report.md` (calculatorsoup, inchcalculator, calculator.net, omnicalculator).
- Exact string-based conversion + sig-fig rounding in `src/lib/sci.ts`; arithmetic in double precision (stated on page). SI prefixes incl. 2022 ronna/quetta/ronto/quecto.
## Gaps beaten
Flexible input (commas, e, ×10^, superscripts) · scientific + E + decimal + engineering with SI prefix · sig-fig count with ambiguity note · exact rounding with carry · decimal-move explanation · arithmetic with sig-fig-rounded result.
## Test cases
0.000456 → 4.56 × 10⁻⁴ / 456 × 10⁻⁶ µ · 9.996 @3sf → 1.00 × 10¹ · 3.2e5 × 4.5e4 = 1.44 × 10¹⁰ (1.4 × 10¹⁰ @2sf) · 3.2e5 + 4.5e4 = 3.65 × 10⁵.
