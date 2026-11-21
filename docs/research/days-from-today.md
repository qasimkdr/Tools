# Research: Days From Today Calculator (`/days-from-today/` + variants)

- Primary keyword: "14 days from today" (110K, KD 17). Biggest: "90 days from today" (~292K combined variants).
  Cluster: 164 keywords, ~1.3M combined monthly volume. Date researched: 2026-11-21.
- Kept: N days/weeks/months from today, "what is/what day is N … from today", word-number variants ("sixty days").
- URL decision: **hub + programmatic variants**. SERP for "14 days from today" is dominated by dedicated per-number
  URLs (inchcalculator `/days-from/14-days-from-today`, symbolab `/calculator/14-days-from-today`, thewordfinder,
  eduyush "Updated Daily", fedratecalc, daysbetweencalculator.org), and the roadmap competitor URLs are
  omnicalculator `/everyday-life/90-day`, `/6-month`, `/120-day`, `/week` and calculator.net `/day-counter.html`.
  → `/days-from-today/<n>/`, `/weeks-from-today/<n>/`, `/months-from-today/<n>/` for values with ≥ ~1K volume (105 pages).

## Competitor notes (verified 2026-11-21 with `npm run seo:scrape`; raw data + report: `research/days-from-today/`)
Live Google rankings/PAA not fetched: DataForSEO not configured. URLs below come from the Semrush file + SERP titles seen earlier.
| Page | Words | Title (len) | Schema | Notable |
|---|---|---|---|---|
| omnicalculator.com/everyday-life/90-day | 639 | 90 Day Calculator: Find Dates 90 Days From Now (46) | Article, FAQPage | 4 FAQs; "Working time" + "Custom time" modes; meta talks about "ago" |
| calculator.net/date-calculator.html | 1,211 | Date Calculator (15) | none | Holiday checklist (incl. Black Friday, Christmas Eve), "include end day (add 1 day)", Gregorian calendar history |
| inchcalculator.com/days-from/90-days-from-today | 519 | What Date Is 90 Days From Today? (50) | Organization, WebPage, BreadcrumbList | "90 weekdays from today", "How much time is ninety days?", "More dates relative to today" links |
| calculatorsoup.com/…/date-day.php | 913 | Date Calculator \| Days and Business Days (40) | none | "Saturday is also a business day", recurring events, examples (shipping, planting), cites opm.gov |
| timeanddate.com/date/dateadd.html | — | — | — | HTTP 403 to automated requests → skipped (respected) |

### Gaps confirmed vs. our page
- None of the 4 shows holidays crossed inside the span, day-of-year/ISO week, a mini calendar or .ics export. Ours does.
- Only Omni has FAQ schema; only inchcalculator has breadcrumbs. Ours has WebApplication + Breadcrumb + FAQ.
- Our per-number pages carry more unique facts than inchcalculator's 519-word template.

### Backlog (ideas competitors have that we don't yet)
- [ ] "Include end date (+1 day)" toggle (calculator.net).
- [ ] "Saturday counts as a business day" option (calculatorsoup).
- [ ] "How much time is N days" breakdown: months + days, hours, minutes (inchcalculator), on variant pages.
- [ ] Recurring-dates mode (every N days × k) (calculatorsoup).

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
