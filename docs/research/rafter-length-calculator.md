# Brief: Rafter Length Calculator (`/rafter-length-calculator/`) · 2026-11-22
- Primary: "rafter length calculator" (3,600) + "rafter calculator". Research **partial (2 pages: inchcalculator, omnicalculator)**.
- Pure geometry: run = span/2 − ridge/2; length = run × √(1+(p/12)²); tail = overhang × same factor. Feet-inches to 1/16 via `src/lib/feetInches.ts`.
## Gaps beaten
Span or run · pitch as x/12 or degrees · ridge deduction · overhang along slope · plumb angle & seat cut · slope factor · lumber length to buy · pitch table · code disclaimer.
## Test cases
24 ft span, 6/12, 1.5 in ridge, 12 in overhang → line 13′ 4 3/16″, tail 1′ 1 7/16″, total 14′ 5 9/16″ (buy 16 ft), rise 5′ 11 5/8″, 26.6°.
