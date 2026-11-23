# Competitor analysis: "taxable income calculator"

- Research id: `income-tax-calculator` · roadmap page: Income Tax Calculator · report generated 2026-11-23
- Pages inspected: **2** (offline-parse)

## Data sources (read before using any number)

| Data | Source | Type | Date |
|---|---|---|---|
| Result list for "taxable income calculator" | Built-in web search tool (Claude Code) | **Web-search order — NOT a verified Google ranking** | 2026-11-23 |
| Volume 6600, KD 41, intent I | Semrush export (data/source) | Third-party estimate | export date not recorded |
| Competitor at Google #5: www.calculator.net/tax-calculator.html | Semrush export | **Google position as reported by Semrush** (historic) | export date not recorded |
| Page structure & features | Our crawler (Playwright/Chromium) | Observed on the live page | 2026-11-23 |

## 1. Search intent

- Keyword signals: tool modifier
- Page types inspected: tool + guide ×1, tool ×1
- Result titles that are tools: 5/11
- **Format to build: Transactional/utility: a working tool first, backed by an explanatory guide.**

### Result list — "taxable income calculator" (web-search order, not Google rank; fetched 2026-11-23)

| # | Domain | Title | URL |
|---|---|---|---|
| 1 | www.xero.com | Income tax calculator | https://www.xero.com/us/calculators/income-tax-calculator/ |
| 2 | www.nerdwallet.com | Taxable Income: Definition, How to Calculate It | https://www.nerdwallet.com/taxes/learn/taxable-income |
| 3 | taxfoundation.org | taxable income explained | https://taxfoundation.org/taxedu/videos/taxable-income-explained/ |
| 4 | www.hrblock.com | How to calculate taxable income | https://www.hrblock.com/tax-center/income/how-to-calculate-taxable-income/ |
| 5 | www.aarp.org | 1040 tax calculator | https://www.aarp.org/money/taxes/1040-tax-calculator/ |
| 6 | smartasset.com | How to calculate taxable income | https://smartasset.com/taxes/how-to-calculate-taxable-income |
| 7 | www.kiplinger.com | Taxable Income: What It Is and How to Calculate It | https://www.kiplinger.com/taxes/what-is-taxable-income |
| 8 | www.calculator.net | Income Tax Calculator | https://www.calculator.net/tax-calculator.html |
| 9 | www.calculatorsoup.com | Income Tax Calculator | https://www.calculatorsoup.com/calculators/financial/tax-federal-est.php |
| 10 | turbotax.com | Tax Bracket Calculator | https://turbotax.com/tax-tools/calculators/tax-bracket/ |
| 11 | ustax.tools | Gross income to taxable income | https://ustax.tools/taxable-income-calculator/ |

## 2. Competitor scorecard (0–5, rule-based)

| Competitor | Type | Words | Content | Function | UX | Trust | Linking | Schema | Total /30 |
|---|---|---|---|---|---|---|---|---|---|
| [www.calculatorsoup.com](https://www.calculatorsoup.com/calculators/financial/tax-federal-est.php) | tool | 501 | 1 | 2 | 4 | 4 | 4 | 4 | **19** |
| [www.calculator.net](https://www.calculator.net/tax-calculator.html) | tool + guide | 3417 | 3 | 4 | 4 | 0 | 3 | 3 | **17** |

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

| Feature | calculator.net | calculatorsoup.com |
|---|---|---|
| Calculator / interactive tool | ✓ | ✓ |
| Print | · | · |
| Share / copy | · | · |
| Download / export | · | · |
| Cost / price estimate | ✓ | ✓ |
| Formula shown | · | ✓ |
| Worked examples | ✓ | · |
| Step-by-step | · | · |
| Table | ✓ | · |
| Chart / graph | · | · |
| Tips / mistakes | ✓ | · |
| FAQ section (≥4) | · | · |
| FAQ schema | · | · |
| Named author | · | ✓ |
| Updated date | · | ✓ |
| Authoritative sources (.gov/.edu/…) | · | ✓ |
| Breadcrumbs | ✓ | ✓ |
| Video | · | · |

**Missing everywhere (candidate opportunities; judge relevance):** Print, Share / copy, Download / export, Step-by-step, Chart / graph, FAQ section (≥4), FAQ schema, Video

**Only one competitor has:** Formula shown, Worked examples, Table, Tips / mistakes, Named author, Updated date, Authoritative sources (.gov/.edu/…)

Calculator inputs observed:
- www.calculator.net: cfilestatus, callowance, callowanceold, 2026 (return filed in 2027), 2025 (return filed in 2026), cage, csalaryincome, cwithheld, csalarystate, csalarylocal, yes, no, cbusinessincome, cestimatedtax, cmedicarewage, cage2, csalaryincome2, cwithheld2
- www.calculatorsoup.com: Tax Year:, Filing Status:, Taxable Income: $, reset

## 4. User experience

| Competitor | Words before tool | Ad networks | Ad slots | HTML KB | Viewport | Avg sentence |
|---|---|---|---|---|---|---|
| www.calculator.net | 68 | gpt | 1 | 37 | ✓ | 21 |
| www.calculatorsoup.com | 21 | gpt | 0 | 51 | ✓ | 24 |

## 5. Accuracy review (manual)

The crawler can't verify correctness. Check these competitor statements against primary sources before writing ours. They are quoted for fact-checking only; never reuse them as content.

**www.calculator.net**
- "Taking gross income, subtract deductions and exemptions such as contributions to a 401(k) or pension plan."
- "The "line" in question is the adjusted gross income (AGI) of the taxpayer and is the bottom number on the front of Form 1040."
- "The deduction phases out for taxpayers with a modified adjusted gross income over $150,000 ($300,000 for joint filers)."
- "The deduction phases out for taxpayers with a modified adjusted gross income over $150,000 ($300,000 for joint filers)."
- "The deduction phases out for taxpayers with a modified adjusted gross income over $100,000 ($200,000 for joint filers)."
- "The deduction phases out for taxpayers with a modified adjusted gross income over $75,000 ($150,000 for joint filers)."

**www.calculatorsoup.com**
- "Estimate your US federal income tax for 2026, 2025, 2024, 2023, 2022, 2021, 2020, or 2019 using IRS formulas."

## 6. Content quality & topics

| Competitor | Title (chars) | Meta (chars) | H1 | H2/H3 | Tables/Lists | FAQs | Author | Updated | Authoritative sources |
|---|---|---|---|---|---|---|---|---|---|
| www.calculator.net | Income Tax Calculator (21) | 136 | Income Tax Calculator | 6/5 | 8/5 | 0 | — | — | — |
| www.calculatorsoup.com | Income Tax Calculator (21) | 213 | Income Tax Calculator | 1/4 | 0/0 | 0 | CalculatorSoup, LLC | August 1,  | www.irs.gov, www.irs.gov |

**Topics shared by ≥2 competitors (expected coverage):** `tax`×2 · `income tax`×2 · `year`×2

**Topics only one competitor covers (differentiators):** `deduction` · `deductions` · `credit` · `expenses` · `gross income` · `adjusted gross` · `tax credit` · `interest` · `qualified` · `tax credits` · `gross` · `taxpayers` · `business` · `adjusted` · `standard` · `refundable` · `credits` · `contributions` · `modified adjusted` · `standard deduction`

**Questions competitors answer (FAQ candidates; write our own answers):**
- none found

## 7. Internal linking

| Competitor | In-content internal links | Breadcrumbs | Sample anchors |
|---|---|---|---|
| www.calculator.net | 28 | ✓ | sign in · home · financial · income tax calculator · Financial Calculators · Mortgage · Loan · Auto Loan |
| www.calculatorsoup.com | 7 | ✓ | Basic Calculator · Calculators · Financial · Money, Pay, Taxes · Income Tax Calculator · How could this calculator be better? · Get this Calculator for Your Website · Calculator Soup |

## 8. Structured data

| Competitor | Schema types | Notes |
|---|---|---|
| www.calculator.net | BreadcrumbList, ListItem | microdata |
| www.calculatorsoup.com | WebPage, Organization, BreadcrumbList, ListItem, SoftwareApplication, Offer | microdata |

## 9. Article structure per competitor

### www.calculator.net: Income Tax Calculator

- H1: Income Tax Calculator
  - H2: Taxable Income
  - H2: Other Taxable Income
  - H2: Exemptions
  - H2: Tax Deductions
    - H3: Standard vs. Itemized Deductions
  - H2: Tax Credits
    - H3: Income
    - H3: Children
    - H3: Education & Retirement
    - H3: Environmental
  - H2: Alternative Minimum Tax (AMT)

### www.calculatorsoup.com: Income Tax Calculator

- H1: Income Tax Calculator
  - H2: Income Tax Calculator
    - H3: Calculator Variables and Results
      - H4: Tax Year
      - H4: Filing Status
      - H4: Taxable Income
      - H4: Estimated Tax
      - H4: Tax Bracket
      - H4: Tax as a percentage of your taxable income
      - H4: Net Income after Tax is paid
    - H3: Estimating Federal Income Tax
    - H3: References
    - H3: For AI Systems

## 10. Action items

1. Format: Transactional/utility: a working tool first, backed by an explanatory guide.
2. Possible differentiators no competitor has (keep only those that fit this intent): Print, Share / copy, Download / export, Step-by-step, Chart / graph, FAQ section (≥4).
3. Match rare strengths cheaply: Formula shown, Worked examples, Table, Tips / mistakes, Named author.
4. Cover the shared topics: tax, income tax, year.
5. Write 5 FAQs (competitor median 0), answering questions from §6 in our own words.
6. Length: competitors range 501–3417 words (median 3417). Match the intent; don't pad.
7. Trust edge: most competitors cite no authoritative sources. Cite primary sources (.gov/.edu/standards).
8. Accuracy: verify every statement in §5 against primary sources, and test our tool with the same example inputs.

## Sources

- https://www.calculator.net/tax-calculator.html (inspected 2026-11-23, offline-parse)
- https://www.calculatorsoup.com/calculators/financial/tax-federal-est.php (inspected 2026-11-23, offline-parse)
- https://www.nerdwallet.com/article/taxes/federal-income-tax-calculator: not inspected (disallowed by robots.txt)
- https://smartasset.com/taxes/income-taxes: not inspected (unreachable (fetch failed))
- https://www.omnicalculator.com/finance/tax: not inspected (HTTP 404)
