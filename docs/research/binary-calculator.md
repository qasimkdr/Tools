# Brief: Binary Converter & Calculator (`/binary-calculator/`) · 2026-11-22
- Primary: "binary converter" (1.2M, likely inflated) + binary calculator / translator variants (number AND text intent → both covered). Data: `research/binary-calculator/report.md` (calculator.net, omnicalculator, inchcalculator; calculatorsoup URL 404).
- Exact math in `src/lib/base.ts` (BigInt integers, exact-ratio fractions with non-terminating flag).
## Gaps beaten
Any-size integers + fractions + negatives · bin/dec/hex/oct at once · signed two's complement and unsigned at 8/16/32/64 · place-value steps · arithmetic incl. ÷ remainder + AND/OR/XOR · UTF-8 text ↔ binary · copy buttons.
## Test cases
156 → 1001 1100, 9C, 234 · −5 (8-bit) → 1111 1011 · 10.625 → 1010.101 · 1101×101 = 1000001 · "Hi" → 01001000 01101001.
