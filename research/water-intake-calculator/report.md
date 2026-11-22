# Competitor analysis: "water calculator"

- Research id: `water-intake-calculator` · roadmap page: Water Intake Calculator · report generated 2026-11-22
- Pages inspected: **2** (offline-parse)

## Data sources (read before using any number)

| Data | Source | Type | Date |
|---|---|---|---|
| Result list for "water calculator" | Built-in web search tool (Claude Code) | **Web-search order — NOT a verified Google ranking** | 2026-11-22 |
| Volume 6600, KD 31, intent C | Semrush export (data/source) | Third-party estimate | export date not recorded |
| Competitor at Google #12: www.omnicalculator.com/health/water-intake | Semrush export | **Google position as reported by Semrush** (historic) | export date not recorded |
| Page structure & features | Our crawler (Playwright/Chromium) | Observed on the live page | 2026-11-22 |

## 1. Search intent

- Keyword signals: tool modifier
- Page types inspected: tool (JS-rendered; inputs not parsed) ×1, tool + guide ×1
- Result titles that are tools: 14/16
- **Format to build: Transactional/utility: a working tool first, backed by an explanatory guide.**

### Result list — "water calculator" (web-search order, not Google rank; fetched 2026-11-22)

| # | Domain | Title | URL |
|---|---|---|---|
| 1 | cise.ufl.edu | Daily Water Intake Calculator | https://cise.ufl.edu/~scarpio/cis4930/assign4/index.html |
| 2 | www.omnicalculator.com | Water Intake Calculator | https://www.omnicalculator.com/health/water-intake |
| 3 | www.gigacalculator.com | Daily Water Intake Calculator | https://www.gigacalculator.com/calculators/water-intake-calculator.php |
| 4 | bodybuilding.com | water calculator | https://bodybuilding.com/fun/water_calculator.htm |
| 5 | www.inchcalculator.com | Water Intake Calculator - How Much Water Should You Drink? | https://www.inchcalculator.com/water-intake-calculator/ |
| 6 | fitnessvolt.com | Water Intake Calculator | https://fitnessvolt.com/water-intake-calculator/ |
| 7 | www.stylecraze.com | Water Intake Calculator: How Much Water Should I Drink? | https://www.stylecraze.com/tools/water-intake-calculator/ |
| 8 | builtwithscience.com | logo builtwithscience | https://builtwithscience.com/water-intake-calculator/ |
| 9 | online.visual-paradigm.com | Water Intake Calculator | https://online.visual-paradigm.com/tabular/calculator/health/water-intake-calculator/?t=tabular& |
| 10 | online.visual-paradigm.com | Water Intake Calculator | https://online.visual-paradigm.com/ja/tabular/calculator/health/water-intake-calculator |
| 11 | www.101planners.com | water intake calculator | https://www.101planners.com/water-intake-calculator/ |
| 12 | nakednutrition.com | water intake calculator | https://nakednutrition.com/blogs/wellness/water-intake-calculator |
| 13 | fitnessvolt.com | fitnessvolt.com | https://fitnessvolt.com/?p=71618 |
| 14 | sparkful.app | daily water intake calculator | https://sparkful.app/tools/daily-water-intake-calculator |
| 15 | www.medicoverhospitals.in | Stay Hydrated: Daily Water Intake Calculator | https://www.medicoverhospitals.in/fitness-health-calculators/daily-water-intake |
| 16 | www.calculate.co.nz | Water Intake Calculator NZ 2026 | https://www.calculate.co.nz/water-intake-calculator.php |

## 2. Competitor scorecard (0–5, rule-based)

| Competitor | Type | Words | Content | Function | UX | Trust | Linking | Schema | Total /30 |
|---|---|---|---|---|---|---|---|---|---|
| [www.inchcalculator.com](https://www.inchcalculator.com/water-intake-calculator/) | tool + guide | 1918 | 4 | 3 | 4 | 4 | 5 | 3 | **23** |
| [www.omnicalculator.com](https://www.omnicalculator.com/health/water-intake) | tool (JS-rendered; inputs not parsed) | 1120 | 4 | n/a | 4 | 3 | 3 | 2 | **16** /25 |

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

| Feature | omnicalculator.com | inchcalculator.com |
|---|---|---|
| Calculator / interactive tool | ✓ | ✓ |
| Unit toggle (metric/imperial) | · | ✓ |
| Print | · | · |
| Share / copy | ✓ | ✓ |
| Download / export | · | · |
| Formula shown | · | ✓ |
| Worked examples | ✓ | ✓ |
| Step-by-step | · | ✓ |
| Table | ✓ | ✓ |
| Chart / graph | · | · |
| Tips / mistakes | · | ✓ |
| FAQ section (≥4) | ✓ | · |
| FAQ schema | · | · |
| Named author | ✓ | ✓ |
| Updated date | ✓ | ✓ |
| Authoritative sources (.gov/.edu/…) | · | ✓ |
| Breadcrumbs | · | ✓ |
| Video | · | · |

**Missing everywhere (candidate opportunities; judge relevance):** Print, Download / export, Chart / graph, FAQ schema, Video

**Only one competitor has:** Unit toggle (metric/imperial), Formula shown, Step-by-step, Tips / mistakes, FAQ section (≥4), Authoritative sources (.gov/.edu/…), Breadcrumbs

Calculator inputs observed:
- www.omnicalculator.com: none detected _(JS off — may be under-counted)_
- www.inchcalculator.com: Body Weight, Body Weight Units, Duration, Duration Units

## 4. User experience

| Competitor | Words before tool | Ad networks | Ad slots | HTML KB | Viewport | Avg sentence |
|---|---|---|---|---|---|---|
| www.omnicalculator.com | n/a (JS) | gpt | 0 | 499 | ✓ | 21 |
| www.inchcalculator.com | 34 | gpt, adthrive | 0 | 130 | ✓ | 23 |

## 5. Accuracy review (manual)

The crawler can't verify correctness. Check these competitor statements against primary sources before writing ours. They are quoted for fact-checking only; never reuse them as content.

**www.omnicalculator.com**
- "water in food): ≈ 3.7 L / day Water from beverages: 3.0 L (≈ 13 cups) / day Adequate Intake based on Dietary Reference Intakes (Institute of Medicine 2005)."
- "It covers 71% of the planet's surface, and our bodies contain around 50-75% of that molecule (check our total body water calculator to find out yours); moreover, we can survive only a couple of days without water."
- "Water and other beverages represent approximately 81% of total water intake, and the water contained in food provides the remaining 19%."
- "Minimum water requirement is sometimes calculated from your weight – simply divide your body weight (in pounds) by 2."
- "For example, for a 180 lb person (~82 kg), the recommended water intake is 90 fl oz (2.7 L)."
- "The hourly sweat losses are in the 0.5 to 2.0 L/h range for vigorous physical activity, so the water needs may vary."

**www.inchcalculator.com**
- "The contribution of water we consume from food is estimated to be around 20–30%."
- "For example, a sedentary person weighing 180 pounds would need to consume about 90-180 ounces of water a day."
- "So, when trying to determine how many glasses of water this is equivalent to, simply divide the total amount by 8 ounces."
- "For this person, that would be 15.75 to 27 cups of water based on their exercise and heat exposure that day."
- "126 ÷ 8 = 15.75 cups 216 ÷ 8 = 27 cups This may seem like a lot of water, but as you can see, 15.75 cups is very close to the recommendation from the U.S."
- "[5] Research has also found that drinking water prior to a meal can help cut back on calorie consumption when combined with a lower-calorie diet."

## 6. Content quality & topics

| Competitor | Title (chars) | Meta (chars) | H1 | H2/H3 | Tables/Lists | FAQs | Author | Updated | Authoritative sources |
|---|---|---|---|---|---|---|---|---|---|
| www.omnicalculator.com | Water Intake Calculator (23) | 188 | Water Intake Calculator | 6/0 | 1/6 | 4 | Hanna Pamuła | 2026-09-22 | — |
| www.inchcalculator.com | Water Intake Calculator - How Much Water Should You Drink? (58) | 139 | Water Intake Calculator – How Much Water Should You Drink? | 13/1 | 1/4 | 0 | Holly Smith | 2023-11-28 | pubmed.ncbi.nlm.nih.gov |

**Topics shared by ≥2 competitors (expected coverage):** `intake`×2 · `water intake`×2 · `drink`×2 · `weight`×2 · `day`×2 · `body`×2 · `exercise`×2 · `much`×2 · `much water`×2 · `intake calculator`×2 · `need`×2 · `body weight`×2

**Topics only one competitor covers (differentiators):** `weight loss` · `ounces` · `calorie` · `loss` · `total water` · `share` · `hydration` · `https` · `total` · `hydrated` · `nutrition` · `diet` · `cups` · `amount` · `performance` · `physical` · `physical activity` · `check` · `tap` · `tap water`

**Questions competitors answer (FAQ candidates; write our own answers):**
- How does the daily water intake calculator work?
- How much water should I drink?
- Can I drink too much water?
- Tap or bottled water?

## 7. Internal linking

| Competitor | In-content internal links | Breadcrumbs | Sample anchors |
|---|---|---|---|
| www.omnicalculator.com | 7 | · | total body water calculator · water deficit calculator · weight converter · volume converter tool · tap water calculator · hardness · ACFT Calculator |
| www.inchcalculator.com | 21 | ✓ | below · Add This to Your Site · Water Intake Calculator · How Much Water Should You Drink Per Day · Water Intake Formula · How Much Water Should You Drink To Lose Weight · Tips To Stay Hydrated Throughout the Day · Hydration for Healthy Living |

## 8. Structured data

| Competitor | Schema types | Notes |
|---|---|---|
| www.omnicalculator.com | Article | JSON-LD |
| www.inchcalculator.com | Organization, WebPage, BreadcrumbList | JSON-LD |

## 9. Article structure per competitor

### www.omnicalculator.com: Water Intake Calculator

- H1: Water Intake Calculator
  - H2: Dehydration problem
  - H2: How does the daily water intake calculator work?
  - H2: Recommended water intake during exercises
  - H2: How much water should I drink?
  - H2: Can I drink too much water?
  - H2: Tap or bottled water?
    - H3: Related calculators

### www.inchcalculator.com: Water Intake Calculator - How Much Water Should You Drink?

- H1: Water Intake Calculator – How Much Water Should You Drink?
  - H2: Tell Us What You Think
  - H2: Results: Suggested Daily Water Intake
  - H2: Share This Result
  - H2: On this page:
  - H2: Cite This Page
  - H2: How Much Water Should You Drink Per Day
    - H3: Water Intake Formula
  - H2: How Much Water Should You Drink To Lose Weight
  - H2: Tips To Stay Hydrated Throughout the Day
  - H2: Hydration for Healthy Living
  - H2: Similar Nutrition Calculators
  - H2: References

## 10. Action items

1. Format: Transactional/utility: a working tool first, backed by an explanatory guide.
2. Possible differentiators no competitor has (keep only those that fit this intent): Print, Download / export, Chart / graph, FAQ schema, Video.
3. Match rare strengths cheaply: Unit toggle (metric/imperial), Formula shown, Step-by-step, Tips / mistakes, FAQ section (≥4).
4. Cover the shared topics: intake, water intake, drink, weight, day, body, exercise, much, much water, intake calculator.
5. Write 6 FAQs (competitor median 4), answering questions from §6 in our own words.
6. Length: competitors range 1120–1918 words (median 1918). Match the intent; don't pad.
7. Trust edge: most competitors cite no authoritative sources. Cite primary sources (.gov/.edu/standards).
8. Accuracy: verify every statement in §5 against primary sources, and test our tool with the same example inputs.

## Sources

- https://www.omnicalculator.com/health/water-intake (inspected 2026-11-22, offline-parse)
- https://www.inchcalculator.com/water-intake-calculator/ (inspected 2026-11-22, offline-parse)
