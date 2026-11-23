# Internal linking system

Goal: every page reachable in ≤3 clicks, link equity flows from strong pages to new ones, topical clusters are explicit.

## Layers (most are automatic)
1. **Global**: header (top categories with live tools), footer (all live categories + trust pages). Auto.
2. **Hubs**: `/tools/` and `/category/<cat>/` list every live tool (ItemList schema). Auto.
3. **Breadcrumbs**: Home → Category → Tool (→ Variant). Auto, with BreadcrumbList schema.
4. **Related block** (`RelatedTools`, always 6 cards, `data-testid="related-list"`): `relatedTools()` in
   `src/tools/registry.ts` reads a link graph computed once at build time by `buildGraph()` (static HTML, no client JS):
   hand-picked `meta.related` (never replaced) → closest matches by `relevance()` (keyword-token overlap + 2 same
   category + 0.5 neighbouring category + 3 reciprocal hand-pick) → fill to 6 from neighbouring topics, then the
   most-linked tools → every tool is guaranteed ≥3 inbound related links (under-linked tools replace the weakest
   auto-picked card on their most relevant pages). Deterministic. Enforced by `tests/e2e/internal-links.spec.ts`
   (6 per page, ≥3 inbound, checked on the built HTML). Auto.
5. **Contextual body links (manual, most valuable)**: ≥3 per page inside Content.tsx, using descriptive anchors
   that match the target's primary keyword naturally ("use our [square footage calculator]" — not "click here").
6. **"Related:" anchor sentences**: older pages carry a closing sentence with 2–3 descriptive anchors (owner-approved edit, 2026-11-22).
7. **Programmatic clusters**: variant pages link to their hub, to nearby variants (`nearby()`), and across units.

## Cluster map (fill `related` with these when the tools go live)
- **Date & time**: days-from-today ↔ date-calculator ↔ date-difference-calculator ↔ weeks-calculator ↔ age-calculator ↔
  half-birthday-calculator ↔ how-many-years-calculator ↔ hours-calculator ↔ time-to-decimal-calculator ↔ overtime-calculator.
- **Pay & payroll**: paycheck-calculator ↔ overtime-calculator ↔ hours-calculator ↔ salary-calculator ↔ pay-raise-calculator ↔ income-tax-calculator.
- **Loans & interest**: payment ↔ mortgage ↔ interest-rate ↔ apr ↔ amortization ↔ auto-loan ↔ credit-card-payoff ↔ simple/compound-interest.
- **Retirement & investing**: 401k ↔ roth-ira ↔ ira ↔ rmd ↔ annuity ↔ compound-interest ↔ future-value ↔ npv ↔ how-long-will-retirement-savings-last.
- **Landscaping materials**: cubic-yard ↔ gravel-and-stone ↔ sand ↔ soil ↔ mulch ↔ river-rock ↔ fill-dirt ↔ concrete ↔ square-footage.
- **Carpentry/building**: stair ↔ rafter-length ↔ board-foot ↔ stud ↔ linear-feet ↔ drywall ↔ tile ↔ paint ↔ roofing ↔ siding.
- **Triangles/geometry**: hypotenuse ↔ right-triangle ↔ triangle ↔ area ↔ volume ↔ cylinder/cone/sphere-volume ↔ circle ↔ circumference.
- **Ratios/percent**: ratio ↔ proportion ↔ percent ↔ percentage-change/increase/decrease ↔ discount ↔ fraction ↔ decimal-to-fraction.
- **Stats**: standard-deviation ↔ confidence-interval ↔ z-score ↔ normal-cdf ↔ binomial ↔ probability ↔ five-number-summary ↔ mean-median-mode.
- **Military fitness**: army-body-fat ↔ army-fitness-test ↔ air-force-pt-test ↔ body-fat ↔ one-rep-max ↔ bench-press-max.
- **AP scores**: ap-world-history ↔ ap-biology ↔ ap-chemistry ↔ ap-statistics ↔ ap-english-language ↔ gpa ↔ grade ↔ grade-curve.
- **Pets/animal gestation**: dog-pregnancy ↔ horse-gestation ↔ goat/sheep/cow-gestation ↔ dog-age ↔ puppy-weight.
- **Body & health**: bmi-women ↔ bmr ↔ calorie ↔ macro ↔ protein ↔ body-fat ↔ ffmi ↔ lean-body-mass ↔ water-intake.

## Rules
- Link only to live pages (registry guarantees this for automatic blocks; for manual links, check the slug is in `TOOLS`).
- Never edit a live tool to add links (owner rule: live tools are frozen). The new tool lists its matches in `related`; `relevance()` gives reciprocal hand-picks +3 and the ≥3-inbound guarantee places new tools on related live pages, so live pages' related cards update on rebuild without editing their files.
- Anchor text varies naturally; no exact-match anchor repeated sitewide.
