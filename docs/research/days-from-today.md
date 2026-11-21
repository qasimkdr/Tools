# Research: Days From Today Calculator (`/days-from-today/` + variants)

- Primary keyword: "14 days from today" (110K, KD 17). Biggest: "90 days from today" (~292K combined variants).
  Cluster: 164 keywords, ~1.3M combined monthly volume. Date researched: 2026-11-21.
- Kept: N days/weeks/months from today, "what is/what day is N … from today", word-number variants ("sixty days").
- URL decision: **hub + programmatic variants**. SERP for "14 days from today" is dominated by dedicated per-number
  URLs (inchcalculator `/days-from/14-days-from-today`, symbolab `/calculator/14-days-from-today`, thewordfinder,
  eduyush "Updated Daily", fedratecalc, daysbetweencalculator.org), and the roadmap competitor URLs are
  omnicalculator `/everyday-life/90-day`, `/6-month`, `/120-day`, `/week` and calculator.net `/day-counter.html`.
  → `/days-from-today/<n>/`, `/weeks-from-today/<n>/`, `/months-from-today/<n>/` for values with ≥ ~1K volume (105 pages).

## Competitor notes
Deep page reads were blocked by the session network policy (calculator.net, omnicalculator.com, inchcalculator.com,
timeanddate.com not allowlisted). Notes below come from SERP titles/snippets + known product behaviour; re-verify
when network access is available.
1. **inchcalculator.com (per-N pages)**: answer + short explanation + table of nearby day counts; separate "ago" pages.
   Gaps: no business-day/holiday handling on the per-N page, generic text swapped per number.
2. **omnicalculator.com (per-N pages)**: answer + embedded calculator widget; heavy JS, slower LCP; little explanation of conventions.
3. **calculator.net day-counter / date calculator**: powerful but dated UI, form-submit (page reload), no per-N landing pages; ads dense.
4. **timeanddate.com date add**: most options (country holidays), but cluttered, many steps, heavy ads.
5. **symbolab / small sites**: thin pages, some show stale dates (not rebuilt daily).

## How we beat them
1. Answer in the H1-adjacent intro, pre-rendered (daily rebuild) **and** hydrated to the visitor's local date → never stale.
2. One tool covers days, weeks, months, years, **business days with US federal holidays (observed dates)** + "ago".
3. Shows weekday, calendar days, business days, weeks+days, day-of-year, ISO week, quarter, holidays crossed.
4. Mini calendar, copy, **add-to-calendar .ics**, shareable URL with inputs.
5. Explains the 3 conventions competitors skip (day 0, EDATE month clamping, observed holidays) + legal-deadline caveat.
6. Each variant page has unique computed facts + nearby table + cross-unit links (strong internal cluster).
7. Fast: static HTML, system fonts, CSS-only effects, ~0 layout shift.

## Test cases (verified in browser 2026-11-21)
| Input | Expected | Ours |
|---|---|---|
| 10 business days from Sat 2026-11-21, skip holidays | Mon 2026-12-07 (Thanksgiving skipped) | ✅ |
| 10 days from 2026-11-21 | Tue 2026-12-01 | ✅ |
| 90 days from 2026-11-21 | Fri 2027-02-19 | ✅ |
| Jan 31 + 1 month | Feb 28 (29 in leap years) | ✅ (addMonths clamp) |
