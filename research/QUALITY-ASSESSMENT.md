# Research system: validation & quality assessment (2026-11-21)

Scope: 5 new roadmap keywords of different types, plus the 2 earlier test keywords re-run with the improved system.
All research is in `research/<id>/` (serp.json, competitors.json, report.md). No website code was changed.

## 1. Test set & coverage

| Keyword | Type | Open results recorded | Pages inspected | Skipped: robots.txt | Skipped: not reachable | Status |
|---|---|---|---|---|---|---|
| payment calculator | Finance tool (YMYL), head term | 20 | 4 | 2 (bankrate, nerdwallet) | 11 | done |
| army body fat calculator | Health tool, government standard (YMYL) | 19 | 4 | 1 (gigacalculator) | 13 | done |
| ap world score calculator | Education niche tool | 16 | **1** | 0 | 13 | **partial** |
| how to calculate square footage | Informational how-to | 19 | 4 | 1 (homedepot) | 14 | done (sample bias flagged) |
| how many cubic feet in a cubic yard | Quick-answer question | 16 | 4 | 0 | 12 | done |
| concrete calculator (re-run) | Construction tool | 20 | 4 | 1 | 9 | done |
| 90 days from today (re-run) | Programmatic date answer | 10 | 4 | 0 | 7 | done |

"Not reachable" = host isn't on this cloud environment's network allowlist. Every skip is listed under **Sources** in the report.

## 2. Extraction accuracy (spot-checked against raw HTML with curl)

| Page | Title | H1 | H2 count | Schema | Result |
|---|---|---|---|---|---|
| calculatorsoup.com: square footage | ✓ | ✓ | ✓ (8) | ✗ → fixed | Microdata schema was missed. Detection now covers JSON-LD + microdata + RDFa. |
| inchcalculator.com: loan payment | ✓ | ✓ | ✓ (12) | ✓ (FAQPage, BreadcrumbList) | match |
| omnicalculator.com: army body fat | ✓ | ✓ | ✓ (4) | ✓ (Article, FAQPage) | match |

Competitor formulas captured for fact-checking were checked by hand. For example, Omni's loan payment formula and its
"6% / 12 = 0.5%" periodic rate are both correct. The army report surfaced a real conflict: Omni's "24–30% for men"
(accession standard) differs from calculator.net's 2023 retention limits (20–26%). That's exactly the kind of accuracy
issue a writer needs to see.

## 3. Bugs found and fixed during validation

1. Duplicate competitor (two Omni URLs for one page) → one page per root domain and canonical URL.
2. Feedback, newsletter, embed and search fields counted as calculator inputs → filtered (also fixes "words before tool").
3. JS-rendered calculators (Omni, calculator.io) classed as "thin" and scored 0 for functionality → classed as
   "tool (JS-rendered)", functionality n/a, scored /25.
4. Microdata schema reported as "no JSON-LD" → all three schema formats detected.
5. Only one URL tried per domain (a bare-domain URL failed and the reachable `www.` URL was never tried) → every candidate is tried in order.
6. Off-topic candidates (GPA calculators for "ap world score calculator") → relevance filter on title/URL keyword tokens.
7. Intent wrongly "transactional" for question keywords, because the accessible sample was all calculators → intent now
   weighted by the open result list, with an explicit **sample bias** warning.
8. Irrelevant gap suggestions (unit toggle for a payment calculator) → filtered per category.
9. Repeated data-source rows, citation text in claims, generic words in topics → cleaned.

## 4. Are the reports accurate, useful, actionable?

- **Accurate (structure):** yes for the fields we measure. Titles, headings, schema, FAQ counts, links and word counts
  matched the raw HTML in every spot check after fix #4.
- **Useful:** yes. Each report shows the competitor scorecard, a feature matrix, the questions competitors answer,
  claims to fact-check, heading outlines, UX and ad signals, internal-link anchors and schema types.
- **Actionable:** mostly. The action items are specific (format, features to add, topics to cover, FAQ count, length range,
  trust and schema edges). The gap list is a *candidate* list; a human or agent still judges relevance, and the report says so.
- **Data labelling:** every report states that result positions are web-search order, **not Google rankings**. Semrush
  positions are labelled "Google position as reported by Semrush (historic)". Restricted supplementary lists are labelled
  separately. Every URL has a research date.

## 5. Limitations that remain

| # | Limitation | Impact | Fix (free) |
|---|---|---|---|
| 1 | **Network allowlist** blocks most non-calculator competitors (publishers, edu/prep sites, banks) | Informational and education keywords get biased or partial samples (AP World: 1/4) | Widen the environment's network access (add hosts, or set network access to full) |
| 2 | Pages are parsed with JS off in the cloud | JS-rendered tools' inputs/actions are invisible (function = n/a) | Run `seo:scrape` locally (no proxy = JS on), or accept n/a |
| 3 | No People Also Ask / SERP features / verified ranks | FAQ ideas come from competitor FAQs only | Search Console after launch; a paid SERP API only if you later choose |
| 4 | Scores are heuristics | Signals for prioritising, not verdicts | Rubric is printed in every report |
| 5 | Accuracy can't be auto-verified | Claims must be checked against primary sources | Built into the workflow (report §5) |
| 6 | One web search per keyword happens inside the Claude session | 368 keywords ≈ 368–740 searches, done in batches | Batches of 5–10 with `seo:batch` |

## 6. Recommendation

**Ready for calculator/tool keywords** (most of the roadmap: finance, construction, math, conversions, date tools).
In these tests every tool-type keyword reached 4 competitors with accurate structure data.

**Not yet ready for informational and education keywords** without wider network access. Their top competitors are
publishers and prep sites outside the allowlist, so reports are partial or flagged for sample bias. They still run,
and they're labelled honestly. They just carry less competitor depth.

Suggested rollout: run tool keywords in batches of 5–10, spot-check one report per batch, and re-run partial items
after any network change with `npm run seo:batch -- run --retry`.
