# Brief: RMD Calculator (`/rmd-calculator/`) · 2026-11-26 · scheduled · finance (YMYL)
- Primary: "rmd calculator" (74,000, KD 42) + "rmd calculator 2026" (14,800, KD 47). Competitors scored: calculator.net 18/30, Omni 15/25; Schwab, Boldin not inspectable. SERP also has FINRA, Investor.gov, AARP, Vanguard (inherited).
- Primary sources (fetched from irs.gov): Pub 590-B (2025) Appendix B Table III (every age 72–120+, transcribed and checked), required beginning date rules (73), IRS RMD FAQ (April 1 first deadline, Dec 31 balance, 25%/10% excise tax, Roth IRA owners exempt, still-working exception). Age 75 for 1960+ and the 1959 ambiguity: SECURE 2.0 per Kitces/Mercer (secondary); stated with the caveat.
- Lib: `src/lib/rmd.ts`.

## Feature matrix
| Feature | Who has it | Ours |
|---|---|---|
| Birth date/year, RMD year, balance | calculator.net, Schwab, all | built |
| Expected return → projection | calculator.net, Schwab (10 yr / lifetime), American Century | built (5–40 years, chart, table, CSV) |
| Spouse >10 years younger (Table II) | calculator.net (spouse DOB), Schwab, T. Rowe | skip calculation: Table II isn't printed in Pub 590-B (2025) and couldn't be verified; we warn and explain instead |
| Start age by birth year | most | built (72/73/75 + 1959 note) |
| First-year April 1 deadline and double RMD | calculator.net (dates section) | built |
| Penalty for missing | calculator.net | built (25% / 10%) |
| Which accounts, aggregation | calculator.net, Omni | built (content + FAQ) |
| Inherited RMDs | calculator.net (section), Vanguard (separate tool) | skip calculation (rules depend on beneficiary type and date of death); explained |
| Uniform table shown | Omni | built (selected ages + all ages in the tool) |
| Minimizing taxes on RMDs | calculator.net | built (QCD, taxes note) |
| Extras nobody has | — | step-by-step division, share of balance, monthly equivalent, CSV export, RMD bar chart |

## Test cases
Born 1952, $500,000, 2026 → age 74, 25.5, $19,607.84; 2027 ≈ $20,505 at 5% · born 1953 → first RMD 2026, due April 1, 2027 · born 1962 → not required, start 75.
- seo:gaps review: calculator.net input ids (birthdate, rmdyear, abalance, returnrate) are covered by our inputs; spousedob skipped (Table II, see matrix); 'Important dates' covered by the deadline stats, start-age table and FAQ; 'Brokerage reporting' covered (custodian must report or offer to calculate by Jan 31, Pub 590-B). Added step-by-step and a Rules and tips section.
