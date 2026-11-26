# Competitor analysis: "max heart rate calculator"

- Research id: `target-heart-rate-calculator` · roadmap page: Target Heart Rate Calculator · report generated 2026-11-26
- Pages inspected: **3** (offline-parse)

## Data sources (read before using any number)

| Data | Source | Type | Date |
|---|---|---|---|
| Result list for "max heart rate calculator" | Built-in web search tool (Claude Code) | **Web-search order — NOT a verified Google ranking** | 2026-11-26 |
| Volume 12100, KD 45, intent I | Semrush export (data/source) | Third-party estimate | export date not recorded |
| Competitor at Google #1: www.calculator.net/target-heart-rate-calculator.html | Semrush export | **Google position as reported by Semrush** (historic) | export date not recorded |
| Page structure & features | Our crawler (Playwright/Chromium) | Observed on the live page | 2026-11-26 |

## 1. Search intent

- Keyword signals: tool modifier
- Page types inspected: tool + guide ×1, tool (JS-rendered; inputs not parsed) ×1, tool ×1
- Result titles that are tools: 8/8
- **Format to build: Transactional/utility: a working tool first, backed by an explanatory guide.**

### Result list — "max heart rate calculator" (web-search order, not Google rank; fetched 2026-11-26)

| # | Domain | Title | URL |
|---|---|---|---|
| 1 | www.calculator.net | Target Heart Rate Calculator | https://www.calculator.net/target-heart-rate-calculator.html |
| 2 | www.inchcalculator.com | Target Heart Rate Calculator | https://www.inchcalculator.com/target-heart-rate-calculator/ |
| 3 | www.calculatorsoup.com | Target Heart Rate Calculator | https://www.calculatorsoup.com/calculators/health/target-heart-rate-zone-calculator.php |
| 4 | runbundle.com | Heart Rate Zones Calculator | https://runbundle.com/tools/heart-rate-zones-calculator |
| 5 | www.topendsports.com | Maximum Heart Rate Calculator | https://www.topendsports.com/testing/heart-rate-max.htm |
| 6 | www.topendsports.com | Heart Rate Training Zones Calculator | https://www.topendsports.com/fitness/heartrate-range.htm |
| 7 | www.gigacalculator.com | Target Heart Rate Calculator | https://www.gigacalculator.com/calculators/target-heart-rate-calculator.php |
| 8 | fatcalc.com | Heart rate zone calculator | https://fatcalc.com/heart-rate-zone-calculator |

## 2. Competitor scorecard (0–5, rule-based)

| Competitor | Type | Words | Content | Function | UX | Trust | Linking | Schema | Total /30 |
|---|---|---|---|---|---|---|---|---|---|
| [www.inchcalculator.com](https://www.inchcalculator.com/target-heart-rate-calculator/) | tool (JS-rendered; inputs not parsed) | 2233 | 4 | n/a | 4 | 4 | 5 | 3 | **20** /25 |
| [www.calculator.net](https://www.calculator.net/target-heart-rate-calculator.html) | tool + guide | 1902 | 4 | 3 | 4 | 0 | 5 | 3 | **19** |
| [www.calculatorsoup.com](https://www.calculatorsoup.com/calculators/health/target-heart-rate-zone-calculator.php) | tool | 499 | 2 | 2 | 4 | 3 | 4 | 4 | **19** |

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

| Feature | calculator.net | inchcalculator.com | calculatorsoup.com |
|---|---|---|---|
| Calculator / interactive tool | ✓ | ✓ | ✓ |
| Unit toggle (metric/imperial) | · | · | · |
| Print | · | · | · |
| Share / copy | · | ✓ | · |
| Download / export | · | · | · |
| Formula shown | ✓ | ✓ | ✓ |
| Worked examples | ✓ | ✓ | ✓ |
| Step-by-step | · | ✓ | · |
| Table | ✓ | ✓ | · |
| Chart / graph | · | · | ✓ |
| Tips / mistakes | · | · | · |
| FAQ section (≥4) | · | · | · |
| FAQ schema | · | · | · |
| Named author | · | ✓ | ✓ |
| Updated date | · | ✓ | ✓ |
| Authoritative sources (.gov/.edu/…) | · | ✓ | · |
| Breadcrumbs | ✓ | ✓ | ✓ |
| Video | · | · | · |

**Missing everywhere (candidate opportunities; judge relevance):** Unit toggle (metric/imperial), Print, Download / export, Tips / mistakes, FAQ section (≥4), FAQ schema, Video

**Only one competitor has:** Share / copy, Step-by-step, Chart / graph, Authoritative sources (.gov/.edu/…)

Calculator inputs observed:
- www.calculator.net: Estimate from age, Test result, age, mhr, rhr, Haskell & Fox (1971), Tanaka, Monahan, & Seals (2001), Nes, Janszky, Wisloff, Stoylen, Karlsen (2013), The Karvonen Formula, Rating of perceived exertion with Borg scale, Rating of perceived exertion with modified Borg CR10 scale
- www.inchcalculator.com: Age _(JS off — may be under-counted)_
- www.calculatorsoup.com: Target Heart Rate Zone Method help, Age:, reset

## 4. User experience

| Competitor | Words before tool | Ad networks | Ad slots | HTML KB | Viewport | Avg sentence |
|---|---|---|---|---|---|---|
| www.calculator.net | 19 | gpt | 1 | 23 | ✓ | 30 |
| www.inchcalculator.com | n/a (JS) | gpt, adthrive | 0 | 133 | ✓ | 30 |
| www.calculatorsoup.com | 25 | gpt | 0 | 52 | ✓ | 28 |

## 5. Accuracy review (manual)

The crawler can't verify correctness. Check these competitor statements against primary sources before writing ours. They are quoted for fact-checking only; never reuse them as content.

**www.calculator.net**
- "The theoretical maximum human heart rate is 300 bpm."
- "Fritz Hagerman was that the maximum heart rates of a group of men in their 20s who were on Olympic rowing teams varied between 160 and 220 beats per minute, so even at the elite level, there is significant variability."
- "A typical resting heart rate (RHR) for an adult ranges between 50-90 bpm."
- "Generally: Zone 1: This zone generally involves light to moderate activity and your heart rate may stay within this range during warm up, cooldown, a rest day, or an easy training day."
- "Zone 4: This zone is close to your maximum effort and can help with training how long you can maintain your maximum output."
- "Zone 5: This zone represents your maximum effort."

**www.inchcalculator.com**
- "Question or Feedback Name (optional) Email (optional) Results: Target Heart Rate Target heart rate ranges for each of the 5 training zones."
- "max heart rate = 220 – age in years As you get older, your maximum heart rate slowly declines."
- "For example, the maximum heart rate for a 20-year-old would be 200 beats per minute (bpm), while the maximum heart rate for a 40-year-old would only be 180 bpm."
- "target heart rate = [(max HR – resting HR) × %intensity] + resting HR The max HR will still be measured indirectly, utilizing the formula discussed above (220 – age)."
- "For example, for a 40-year-old, their maximum heart rate would be 180 beats per minute."
- "If they wanted to work out in the aerobic zone, they would target 70-80% of their max heart rate, which would be 126-144 beats per minute."

## 6. Content quality & topics

| Competitor | Title (chars) | Meta (chars) | H1 | H2/H3 | Tables/Lists | FAQs | Author | Updated | Authoritative sources |
|---|---|---|---|---|---|---|---|---|---|
| www.calculator.net | Target Heart Rate Calculator (28) | 128 | Target Heart Rate Calculator | 0/5 | 6/2 | 0 | — | — | — |
| www.inchcalculator.com | Target Heart Rate Calculator - Inch Calculator (46) | 141 | Target Heart Rate Calculator | 13/5 | 3/3 | 0 | Holly Smith | 2025-04-29 | health.gov |
| www.calculatorsoup.com | Target Heart Rate Calculator (28) | 258 | Target Heart Rate Calculator | 0/5 | 0/0 | 0 | CalculatorSoup, LLC | August 1,  | — |

**Topics shared by ≥2 competitors (expected coverage):** `target heart`×3 · `target`×3 · `maximum heart`×3 · `zone`×3 · `maximum`×3 · `resting heart`×3 · `intensity`×3 · `mhr`×2 · `resting`×2 · `rhr`×2 · `rate zones`×2 · `exercise`×2 · `rate zone`×2 · `formula`×2 · `age`×2 · `health`×2

**Topics only one competitor covers (differentiators):** `scale` · `fitness` · `range` · `exertion` · `zones` · `thr` · `after exercise` · `minute` · `bpm` · `rpe scale` · `rate recovery` · `method` · `borg` · `person` · `hrreserve` · `rpe` · `after` · `physical` · `hrr` · `thr mhr`

**Questions competitors answer (FAQ candidates; write our own answers):**
- none found

## 7. Internal linking

| Competitor | In-content internal links | Breadcrumbs | Sample anchors |
|---|---|---|---|
| www.calculator.net | 25 | ✓ | sign in · home · fitness & health · target heart rate calculator · + Settings · Fitness and Health Calculators · BMI · Calorie |
| www.inchcalculator.com | 21 | ✓ | below · Add This to Your Site · Calculator · How to Calculate Target Heart Rate · Maximum Heart Rate · Karvonen Formula · Heart Rate Zones · Resting Heart Rate |
| www.calculatorsoup.com | 7 | ✓ | Basic Calculator · Calculators · Health · Target Heart Rate Calculator · help · How could this calculator be better? · Get this Calculator for Your Website · Calculator Soup |

## 8. Structured data

| Competitor | Schema types | Notes |
|---|---|---|
| www.calculator.net | BreadcrumbList, ListItem | microdata |
| www.inchcalculator.com | Organization, WebPage, BreadcrumbList | JSON-LD |
| www.calculatorsoup.com | WebPage, Organization, BreadcrumbList, ListItem, SoftwareApplication, Offer | microdata |

## 9. Article structure per competitor

### www.calculator.net: Target Heart Rate Calculator

- H1: Target Heart Rate Calculator
    - H3: What is heart rate
      - H4: Maximum heart rate
    - H3: Resting heart rate
    - H3: Heart rate reserve
    - H3: Target heart rate zones
    - H3: Methods for measuring intensity
      - H4: Haskell & Fox Exercise Zone
      - H4: Karvonen method
      - H4: Rating of perceived exertion

### www.inchcalculator.com: Target Heart Rate Calculator - Inch Calculator

- H1: Target Heart Rate Calculator
  - H2: Tell Us What You Think
  - H2: Results: Target Heart Rate
    - H3: Max Heart Rate
    - H3: Target Heart Rate Using CDC Recommendations[1]
  - H2: Share This Result
  - H2: On this page:
  - H2: Cite This Page
  - H2: How to Calculate Target Heart Rate
    - H3: Maximum Heart Rate
    - H3: Karvonen Formula
    - H3: Heart Rate Zones
  - H2: Resting Heart Rate
  - H2: Heart Rate During and After Exercise
  - H2: Improve Your Fitness With Target Heart Rate Zones
  - H2: Similar Fitness Calculators
  - H2: References

### www.calculatorsoup.com: Target Heart Rate Calculator

- H1: Target Heart Rate Calculator
    - H3: Max Heart Rate Equation
    - H3: Target Heart Rate Formula (Basic)
    - H3: Karvonen Formula
    - H3: Target Heart Rate Zone Calculation Methods
    - H3: For AI Systems

## 10. Action items

1. Format: Transactional/utility: a working tool first, backed by an explanatory guide.
2. Possible differentiators no competitor has (keep only those that fit this intent): Unit toggle (metric/imperial), Print, Download / export, Tips / mistakes, FAQ section (≥4), FAQ schema.
3. Match rare strengths cheaply: Share / copy, Step-by-step, Chart / graph, Authoritative sources (.gov/.edu/…).
4. Cover the shared topics: target heart, target, maximum heart, zone, maximum, resting heart, intensity, mhr, resting, rhr.
5. Write 5 FAQs (competitor median 0), answering questions from §6 in our own words.
6. Length: competitors range 499–2233 words (median 1902). Match the intent; don't pad.
7. Trust edge: most competitors cite no authoritative sources. Cite primary sources (.gov/.edu/standards).
8. Accuracy: verify every statement in §5 against primary sources, and test our tool with the same example inputs.

## Sources

- https://www.calculator.net/target-heart-rate-calculator.html (inspected 2026-11-26, offline-parse)
- https://www.inchcalculator.com/target-heart-rate-calculator/ (inspected 2026-11-26, offline-parse)
- https://www.calculatorsoup.com/calculators/health/target-heart-rate-zone-calculator.php (inspected 2026-11-26, offline-parse)
- https://www.topendsports.com/testing/heart-rate-max.htm: not inspected (unreachable (fetch failed))
