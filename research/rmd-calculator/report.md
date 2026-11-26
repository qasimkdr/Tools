# Competitor analysis: "rmd calculator"

- Research id: `rmd-calculator` · roadmap page: Rmd Calculator · report generated 2026-11-26
- Pages inspected: **2** (offline-parse)

## Data sources (read before using any number)

| Data | Source | Type | Date |
|---|---|---|---|
| Result list for "rmd calculator" | Built-in web search tool (Claude Code) | **Web-search order — NOT a verified Google ranking** | 2026-11-26 |
| Volume 74000, KD 42, intent I | Semrush export (data/source) | Third-party estimate | export date not recorded |
| Competitor at Google #19: www.calculator.net/rmd-calculator.html | Semrush export | **Google position as reported by Semrush** (historic) | export date not recorded |
| Page structure & features | Our crawler (Playwright/Chromium) | Observed on the live page | 2026-11-26 |

## 1. Search intent

- Keyword signals: tool modifier
- Page types inspected: tool + guide ×1, tool (JS-rendered; inputs not parsed) ×1
- Result titles that are tools: 8/8
- **Format to build: Transactional/utility: a working tool first, backed by an explanatory guide.**

### Result list — "rmd calculator" (web-search order, not Google rank; fetched 2026-11-26)

| # | Domain | Title | URL |
|---|---|---|---|
| 1 | www.calculator.net | RMD Calculator | https://www.calculator.net/rmd-calculator.html |
| 2 | www.boldin.com | RMD calculator | https://www.boldin.com/retirement/rmd-calculator/ |
| 3 | www.schwab.com | RMD Calculator | https://www.schwab.com/ira/understand-iras/ira-calculators/rmd |
| 4 | www.missionsq.org | RMD calculator | https://www.missionsq.org/rmdcalc |
| 5 | www.omnicalculator.com | RMD Calculator | https://www.omnicalculator.com/finance/rmd |
| 6 | www.aarp.org | Required minimum distribution calculator | https://www.aarp.org/work/retirement-planning/required-minimum-distribution-calculator/ |
| 7 | www.miniwebtool.com | RMD calculator | https://www.miniwebtool.com/rmd-calculator/ |
| 8 | rmdcalculator.nga.finra.org | Required Minimum Distribution Calculator | https://rmdcalculator.nga.finra.org/ |

## 2. Competitor scorecard (0–5, rule-based)

| Competitor | Type | Words | Content | Function | UX | Trust | Linking | Schema | Total /30 |
|---|---|---|---|---|---|---|---|---|---|
| [www.calculator.net](https://www.calculator.net/rmd-calculator.html) | tool + guide | 2439 | 3 | 4 | 4 | 0 | 4 | 3 | **18** |
| [www.omnicalculator.com](https://www.omnicalculator.com/finance/rmd) | tool (JS-rendered; inputs not parsed) | 2069 | 4 | n/a | 3 | 3 | 3 | 2 | **15** /25 |

<details><summary>Scoring rubric</summary>

- **Content**: ≥600 words · formula · worked examples · ≥3 tables/lists · ≥4 FAQs (1 pt each)
- **Functionality**: ≥2 inputs · ≥6 inputs · unit toggle · print/share/copy/download · cost or chart (0 if no tool)
- **UX**: starts at 5; −1 ad network present · −1 ≥4 ad slots · −1 >150 words before the tool · −1 HTML >500 KB · −1 no viewport
- **Trust**: named author · updated date · authoritative sources · avg sentence ≤20 words · canonical
- **Linking**: ≥3 in-content internal links · ≥10 · breadcrumbs · descriptive anchors (avg ≥12 chars) · ≥3 links to other tools
- **Schema**: any relevant type = 2 · +BreadcrumbList · +FAQPage · +WebApplication/SoftwareApplication
- JS-rendered tools (parsed with JS off) get Function = n/a and are scored /25; their tool position isn't judged.
</details>

## 3. Functionality & content features

| Feature | calculator.net | omnicalculator.com |
|---|---|---|
| Calculator / interactive tool | ✓ | ✓ |
| Print | · | · |
| Share / copy | · | ✓ |
| Download / export | · | · |
| Cost / price estimate | ✓ | ✓ |
| Formula shown | · | ✓ |
| Worked examples | ✓ | ✓ |
| Step-by-step | ✓ | · |
| Table | ✓ | ✓ |
| Chart / graph | · | · |
| Tips / mistakes | ✓ | · |
| FAQ section (≥4) | · | · |
| FAQ schema | · | · |
| Named author | · | ✓ |
| Updated date | · | ✓ |
| Authoritative sources (.gov/.edu/…) | · | · |
| Breadcrumbs | ✓ | · |
| Video | · | · |

**Missing everywhere (candidate opportunities; judge relevance):** Print, Download / export, Chart / graph, FAQ section (≥4), FAQ schema, Authoritative sources (.gov/.edu/…), Video

**Only one competitor has:** Share / copy, Formula shown, Step-by-step, Tips / mistakes, Named author, Updated date, Breadcrumbs

Calculator inputs observed:
- www.calculator.net: birthdate, rmdyear, abalance, Yes, No, spousedob, returnrate
- www.omnicalculator.com: Your age _(JS off — may be under-counted)_

## 4. User experience

| Competitor | Words before tool | Ad networks | Ad slots | HTML KB | Viewport | Avg sentence |
|---|---|---|---|---|---|---|
| www.calculator.net | 82 | gpt | 1 | 58 | ✓ | 26 |
| www.omnicalculator.com | n/a (JS) | gpt | 0 | 667 | ✓ | 39 |

## 5. Accuracy review (manual)

The crawler can't verify correctness. Check these competitor statements against primary sources before writing ours. They are quoted for fact-checking only; never reuse them as content.

**www.calculator.net**
- "Yes No Your spouse's date of birth Estimated rate of return (Optional) Result Your RMD for 2026 is $12,195.12."
- "RMD = $300000 24.6 = $12,195.12 If you only withdraw the RMD at the end of each year and your return rate is 5% per year, your future account balance and RMDs will look like the following."
- "So, if you need to pull more money from your accounts after reaching retirement age, you can.) Important Dates for Taking RMDs You're required to take your first RMD by April 1st in the calendar year after you turn 73."
- "Technically RMDs are due every December 31, but the IRS allows you to delay the first withdrawal."
- "If you take this route, you'll have to take a second RMD before December 31."
- "For every calendar year after you take a distribution, you have to withdraw your entire RMD by December 31."

**www.omnicalculator.com**
- "You don't have to take an RMD for 2020 because of the CARES Act, but you may still use this tool to calculate any further RMDs with the estimated account balance."
- "A required minimum distribution (RMD) is the minimum amount you must withdraw from your retirement account each year when you turn 72 years."
- "RMD rules apply to tax-deferred retirement accounts such as SIMPLE IRA, SEP IRA, Traditional IRA, and most 401(k) and 403(b) retirement plans."
- "You may choose to withdraw your RMD for the year at once or in small installments, but you must take it by the deadline of December 31 each year."
- "However, if you miss the RMD deadline, the IRS will charge you a 50% penalty on the amount NOT taken."
- "For example, if your RMD was $12,000, but you only withdrew $4,000, your 50% penalty on the $12,000 - $4,000 = $8,000 balance you didn't withdraw, would be $8,000 * 50% = $4,000."

## 6. Content quality & topics

| Competitor | Title (chars) | Meta (chars) | H1 | H2/H3 | Tables/Lists | FAQs | Author | Updated | Authoritative sources |
|---|---|---|---|---|---|---|---|---|---|
| www.calculator.net | RMD Calculator (14) | 164 | RMD Calculator | 1/10 | 5/6 | 3 | — | — | — |
| www.omnicalculator.com | RMD calculator (14) | 162 | RMD Calculator - Required Minimum Distributions Calculator | 4/2 | 2/5 | 2 | Oghenekaro Elem | 2026-09-08 | — |

**Topics shared by ≥2 competitors (expected coverage):** `ira`×2 · `year`×2 · `account`×2 · `retirement`×2 · `irs`×2 · `tax`×2 · `required`×2 · `withdraw`×2 · `required minimum`×2 · `minimum`×2 · `december`×2 · `account balance`×2 · `age`×2

**Topics only one competitor covers (differentiators):** `life expectancy` · `accounts` · `spouse` · `expectancy` · `iras` · `life` · `expectancy factor` · `take` · `roth` · `distribution` · `inherited` · `rmd rules` · `retirement accounts` · `factor` · `amount` · `after` · `have` · `delay` · `roth iras` · `rules`

**Questions competitors answer (FAQ candidates; write our own answers):**
- What Retirement Accounts do RMDs Apply to?
- Do I Have to Calculate My RMD for Every Account?
- What Happens If You Don't Take RMDs?
- What is RMD?
- How to calculate RMD?

## 7. Internal linking

| Competitor | In-content internal links | Breadcrumbs | Sample anchors |
|---|---|---|---|
| www.calculator.net | 30 | ✓ | sign in · home · financial · rmd calculator · Retirement Calculator · 401K Calculator · IRA Calculator · Financial Calculators |
| www.omnicalculator.com | 9 | · | child tax credit calculator · stimulus check calculator · 401k calculator · IRA calculator · Roth IRA calculator · Inherited IRA · Prorated Rent Calculator · Emergency Fund Calculator |

## 8. Structured data

| Competitor | Schema types | Notes |
|---|---|---|
| www.calculator.net | BreadcrumbList, ListItem | microdata |
| www.omnicalculator.com | Article | JSON-LD |

## 9. Article structure per competitor

### www.calculator.net: RMD Calculator

- H1: RMD Calculator
  - H2: Result
    - H3: RMDs: Required Minimum Distributions
    - H3: Important Dates for Taking RMDs
      - H4: How to Delay RMD Deadlines
    - H3: How RMDs are Calculated
    - H3: What Retirement Accounts do RMDs Apply to?
    - H3: Do I Have to Calculate My RMD for Every Account?
    - H3: What Happens If You Don't Take RMDs?
    - H3: RMDs and Taxes
    - H3: Brokerage Reporting Requirements for RMDs
    - H3: Inherited RMDs
      - H4: Ten Year Distribution Rule
      - H4: Inheriting IRAs as a Spouse
      - H4: Inheriting Roth IRAs as a Spouse
      - H4: Inheriting Roth IRAs as a Non-Spouse
      - H4: Inherited 401(k) RMD Rules
    - H3: Minimizing Taxes on RMDs

### www.omnicalculator.com: RMD calculator

- H1: RMD Calculator - Required Minimum Distributions Calculator
  - H2: What is RMD?
  - H2: How to calculate RMD?
  - H2: RMD rules for other IRAs
  - H2: RMD tables
    - H3: IRS uniform lifetime table
    - H3: IRS joint life expectancy table
    - H3: Related calculators

## 10. Action items

1. Format: Transactional/utility: a working tool first, backed by an explanatory guide.
2. Possible differentiators no competitor has (keep only those that fit this intent): Print, Download / export, Chart / graph, FAQ section (≥4), FAQ schema, Authoritative sources (.gov/.edu/…).
3. Match rare strengths cheaply: Share / copy, Formula shown, Step-by-step, Tips / mistakes, Named author.
4. Cover the shared topics: ira, year, account, retirement, irs, tax, required, withdraw, required minimum, minimum.
5. Write 5 FAQs (competitor median 3), answering questions from §6 in our own words.
6. Length: competitors range 2069–2439 words (median 2439). Match the intent; don't pad.
7. Trust edge: most competitors cite no authoritative sources. Cite primary sources (.gov/.edu/standards).
8. Accuracy: verify every statement in §5 against primary sources, and test our tool with the same example inputs.

## Sources

- https://www.calculator.net/rmd-calculator.html (inspected 2026-11-26, offline-parse)
- https://www.omnicalculator.com/finance/rmd (inspected 2026-11-26, offline-parse)
- https://www.schwab.com/ira/understand-iras/ira-calculators/rmd: not inspected (unreachable (fetch failed))
- https://www.boldin.com/retirement/rmd-calculator/: not inspected (unreachable (fetch failed))
