# Brief: Roman Numeral Converter (`/roman-numeral-converter/`) · 2026-11-26 · scheduled · conversion (first tool in this category)
- Primary: "roman letters converter" (18,100, KD 38) + date/birthday/generator variants (1,000–2,400). Competitors: CalculatorSoup 20/30, Omni 19/25, calculator.net 18/30.
- Rules: standard subtractive form; vinculum ×1,000 (Wikipedia, Britannica). Lib: `src/lib/roman.ts`.

## Feature matrix
| Feature | Who has it | Ours |
|---|---|---|
| Number → Roman, Roman → number | all | built |
| Large numbers with overline | calculator.net (to 3,999,999), CalculatorSoup | built (display + bracket/underscore input) |
| Date converter | calculator.net, Zap-Hosting | built (3 orders, 5 separators) |
| Several values at once | CalculatorSoup | built |
| Step-by-step breakdown | MiniWebtool, Omni | built (place-value breakdown) |
| Non-standard input correction (IIII) | dadsworksheets | built |
| Chart | Omni (1–1000), calculator.net | built (key values incl. years) |
| Rules explained | all | built |
| Extras | — | copy button, year examples, zero/negative explanation, where numerals are used |

## Test cases
2026 → MMXXVI · MCMXCIV → 1,994 · IIII → IV (non-standard) · 1776-07-04 → VII.IV.MDCCLXXVI · "4, 9, 14" → IV, IX, XIV · 12345 → XII̅ + CCCXLV · (V)CCC → 5,300.
- seo:gaps review: breakdown renamed 'step by step'; chart = Roman numerals chart table; 'reset' button skipped (inputs are editable, URL keeps state). Symbols table made 4 columns for phones.
