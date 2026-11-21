"""Build the cleaned, de-duplicated roadmap from the SEMrush-derived xlsx.

Run:  npm run roadmap   (or: python3 -I scripts/build-roadmap.py)
Out:  data/roadmap.json  (machine source of truth, read by agents)
      data/ROADMAP.md    (human checklist, ordered by build priority)

Edit ALIASES / EXCLUDE / HOLD / CATEGORY_RULES below, then re-run. Never hand-edit the outputs,
except the `status` column, which is preserved across runs (read from the previous roadmap.json).
"""
import json, re, warnings, collections, pathlib

import openpyxl

warnings.filterwarnings("ignore")
ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "data/source/SolvePilot_50_Tools_Daily_SEO_Roadmap.xlsx"

# Same search intent -> ONE URL. key = row name (lowercase), value = canonical page name.
ALIASES = {
    # fitness tests
    "air force pt calculator": "Air Force PT Test Calculator",
    "af pt test calculator": "Air Force PT Test Calculator",
    "af pt calculator": "Air Force PT Test Calculator",
    "usaf pt test calculator": "Air Force PT Test Calculator",
    "usaf pt calculator": "Air Force PT Test Calculator",
    "air force pt test calculator": "Air Force PT Test Calculator",
    "army fitness test calculator": "Army Fitness Test (AFT) Calculator",
    "army physical test calculator": "Army Fitness Test (AFT) Calculator",
    "aft calculator": "Army Fitness Test (AFT) Calculator",
    "pt test calculator": "Army Fitness Test (AFT) Calculator",
    "military pt test calculator": "Army Fitness Test (AFT) Calculator",
    # animals
    "dog pregnancy estimator": "Dog Pregnancy Calculator",
    "calculator dog pregnancy": "Dog Pregnancy Calculator",
    "dog due date calculator": "Dog Pregnancy Calculator",
    "dog gestation calculator": "Dog Pregnancy Calculator",
    "mare gestation calculator": "Horse Gestation Calculator",
    "mare gestation period calculator": "Horse Gestation Calculator",
    "gestation period for sheep calculator": "Sheep Gestation Calculator",
    # bowling
    "bowling calculator": "Bowling Score Calculator",
    "bowling calculator score": "Bowling Score Calculator",
    # AP exams (one page per exam)
    "ap world exam calculator": "AP World History Score Calculator",
    "ap world history exam calculator": "AP World History Score Calculator",
    "apwh calculator": "AP World History Score Calculator",
    "ap world calculator": "AP World History Score Calculator",
    "ap bio exam score calculator": "AP Biology Score Calculator",
    "ap bio exam calculator": "AP Biology Score Calculator",
    "ap bio grade calculator": "AP Biology Score Calculator",
    "ap bio score calculator": "AP Biology Score Calculator",
    "ap chemistry calculator": "AP Chemistry Score Calculator",
    "chemistry ap calculator": "AP Chemistry Score Calculator",
    "score calculator ap chemistry": "AP Chemistry Score Calculator",
    "ap chem exam score calculator": "AP Chemistry Score Calculator",
    "ap chem test score calculator": "AP Chemistry Score Calculator",
    "ap chemistry score calculator": "AP Chemistry Score Calculator",
    "ap stats grading calculator": "AP Statistics Score Calculator",
    "ap statistics calculator score": "AP Statistics Score Calculator",
    "ap stats calculator": "AP Statistics Score Calculator",
    "ap stats grade calculator": "AP Statistics Score Calculator",
    "ap statistics calculator": "AP Statistics Score Calculator",
    "ap statistics score calculator": "AP Statistics Score Calculator",
    "ap english language score calculator": "AP English Language Score Calculator",
    "ap english language and composition score calculator": "AP English Language Score Calculator",
    "ap language calculator": "AP English Language Score Calculator",
    "ap lang grade calculator": "AP English Language Score Calculator",
    # construction / yard
    "linear foot calculator": "Linear Feet Calculator",
    "wall stud calculator": "Stud Calculator",
    "topsoil estimator": "Soil Calculator",
    "soil yard calculator": "Soil Calculator",
    "loam calculator": "Soil Calculator",
    "yard calculator": "Cubic Yard Calculator",
    "yardage calculator": "Cubic Yard Calculator",
    "firewood calculator cord": "Firewood Calculator",
    "can light calculator": "Recessed Light Calculator",
    "salt calculator pool": "Pool Salt Calculator",
    "fence cost estimator": "Fence Calculator",
    "pavement calculator": "Asphalt Calculator",
    # money
    "hours calculator paycheck": "Paycheck Calculator",
    "paycheck estimator calculator": "Paycheck Calculator",
    "hourly wage and tax calculator": "Paycheck Calculator",
    "take home pay calculator": "Paycheck Calculator",
    "money market rate calculator": "Money Market Calculator",
    "lease vs buy car calculator": "Car Lease vs Buy Calculator",
    "buydown calculator": "Rate Buydown Calculator",
    "how long will my retirement savings last calculator": "How Long Will Retirement Savings Last Calculator",
    "tax calculator online": "Income Tax Calculator",
    "tax calculator": "Income Tax Calculator",
    "income tax estimator nj": "New Jersey Tax Calculator",
    "basis point calculator": "Basis Point Calculator",
    "bps calculator": "Basis Point Calculator",
    "percent off calculator": "Discount Calculator",
    "annuity payout calculator": "Annuity Calculator",
    "liquor wedding calculator": "Wedding Alcohol Calculator",
    "liquor calculator wedding": "Wedding Alcohol Calculator",
    "alcohol calculator wedding": "Wedding Alcohol Calculator",
    "wedding drink calculator": "Wedding Alcohol Calculator",
    # math / stats
    "5 number summary calculator": "Five Number Summary Calculator",
    "simplifying radicals calculator": "Simplify Radicals Calculator",
    "simplify radical expressions calculator": "Simplify Radicals Calculator",
    "simplifying radical expressions solver": "Simplify Radicals Calculator",
    "simplest radical form calculator": "Simplify Radicals Calculator",
    "mean and standard deviation calculator": "Standard Deviation Calculator",
    "grade curve calculator": "Grade Curve Calculator",
    "grading bell curve calculator": "Grade Curve Calculator",
    "calculateur racine carree calculator": "Square Root Calculator",
    "root calculator": "Square Root Calculator",
    "pythagorean theorem calculator": "Hypotenuse Calculator",
    "anion gap calculator": "Anion Gap Calculator",
    "calculator anion gap": "Anion Gap Calculator",
    "common factor calculator": "GCF Calculator",
    "percentage change calculator": "Percentage Change Calculator",
    "decimal percentage converter": "Percent Calculator",
    # time / date
    "time between calculator": "Date Difference Calculator",
    "decimal time converter": "Time to Decimal Calculator",
    "time to decimal calculator": "Time to Decimal Calculator",
    "deadline calculator legal": "Deadline Calculator",
    "1 4 of a mile calculator": "Quarter Mile Calculator",
    "1/4 mile calculator": "Quarter Mile Calculator",
    "0-60 calculator": "Quarter Mile Calculator",
    # misc
    "water calculator intake": "Water Intake Calculator",
    "sourdough starter calculator": "Sourdough Calculator",
    "swimming time calculator": "Swim Time Converter",
    "swim converter": "Swim Time Converter",
    "cross stitch fabric calculator": "Cross Stitch Calculator",
    "sphere minecraft generator": "Minecraft Sphere Generator",
    "watt and ampere calculator": "Watts to Amps Calculator",
    "amps to watts conversion calculator": "Watts to Amps Calculator",
    "wattage calculator": "Watts to Amps Calculator",
    "pounds ounces": "Ounces to Pounds Converter",
    "time and a half calculator": "Overtime Calculator",
    "cubic feet calculator": "Cubic Feet Calculator",
}

# Brand/navigational/junk -> never build.
EXCLUDE = {
    "login calculator": "junk: 'ug calculator' mapped wrongly",
    "finance finance calculator": "junk duplicate keyword",
    "mango+calculator": "junk/brand query",
    "calculator+cherry": "junk/brand query",
    "calculator+lemon": "junk/brand query",
    "calculator+mango": "junk/brand query",
    "www.calculator.net calculator": "competitor navigational query",
    "myusfinance com financial calculator": "brand navigational query",
    "free break even calculator tool on nemin. io": "brand navigational -> build 'Break Even Calculator' instead",
    "free profit margin calculator tool on nemin .io": "brand navigational -> covered by Margin Calculator",
    "charles' law calculator - bythelaws.com": "brand navigational -> build 'Charles Law Calculator' later",
    "canon ls154tg handheld calculator cnm1075b004": "product query, not a tool",
    "calc industries pocket real estate master financial calculator": "product query, not a tool",
    "tocris molarity calculator": "brand query -> covered by Molarity Calculator",
    "trigonometry and the calculator common core geometry homework": "homework query, not a tool",
    "use a calculator to find the r-value of these data": "homework query -> covered by Correlation Calculator",
    "dotted calculator": "unclear intent",
    "suburban paycheck calculator": "brand query -> covered by Paycheck Calculator",
    "calculator for banks": "unclear intent",
    "basic calculator": "commodity (Google answers in SERP); low value",
    "www": "junk",
}

# Policy-sensitive: AdSense/YMYL risk. Do not build until reviewed (see docs/02-ADSENSE-RULES.md).
HOLD = {
    "bpc 157 tb 500 blend dosage calculator": "unapproved peptide dosing (dangerous products / YMYL)",
    "bpc-157 + tb-500 blend dosage calculator": "unapproved peptide dosing",
    "pt-141 dosage calculator": "unapproved drug dosing",
    "peptide dosage calculator": "unapproved peptide dosing",
    "reconstitution calculator": "injectable reconstitution (medical YMYL)",
    "etg calculator": "drug/alcohol test evasion intent",
    "breast implant size calculator": "adult-adjacent/medical; review",
    "abg calculator": "clinical tool; needs medical reviewer",
    "corrected calcium calculator": "clinical tool; needs medical reviewer",
    "anion gap calculator": "clinical tool; needs medical reviewer",
    "anc calculator": "clinical tool; needs medical reviewer",
    "rh calculator": "unclear; review",
    "greek gematria calculator": "low value / occult; fine for policy but low priority",
}

CATEGORY_RULES = [
    ("text", r"superscript|subscript|redacted text|title case|text generator|word count|character count"),
    ("time-date", r"time to decimal|decimal time|hours calculator|from today|date|birthday|anniversary"),
    ("finance", r"loan|mortgage|interest|apr|apy|401|ira|roth|pay|salary|wage|tax|vat|invest|annuity|npv|cap rate|roi|budget|debt|credit|money|finance|bond|cd |savings|pension|rmd|lease|rent|commission|margin|markup|profit|discount|tip|income|fund|buydown|heloc|seller|basis|option|tsp|voo|arv|pro rata|break even|cpm|amortization|retirement|currency|bank|net sheet|overtime|raise|productivity"),
    ("science", r"molecular|molar|molarity|density|half life|ohm|voltage|wire|resistor|watt|amp|btu|horsepower|megawatt|electric|battery|rc filter|dew point|vpd|altitude|speed|mass|dilution|gear|tire|rim|prop slip|subwoofer|charles|cc in hp|nm to|carbon dosing|gram|bandwidth|subnet|ip |bpm|timecode|time lapse|audiobook|megawatt"),
    ("health", r"bmi|bmr|body fat|calorie|macro|protein|fat intake|carbohydrate|period|pregnan|conception|ovulation|miscarriage|water|heart|blood|vo2|lean|ffmi|weight|breastfeed|bac|cardiac|steps|walking|rucking|pace|one rep|bench|army|air force|\bpt\b|\baft\b|military|bra size|body type|height|shoe size|ski din|weight watchers"),
    ("education", r"\bap\b|ap |gpa|grade|score|schoology|study|running record|era calculator|earned run|decathlon|golf|bowling|winrate|ops calculator|dunk|draw length|arrow"),
    ("construction", r"concrete|gravel|stone|sand|soil|mulch|yard|square foot|footage|stair|rafter|asphalt|board foot|stud|soffit|tile|drywall|brick|block|paver|fence|deck|roof|siding|insulation|paint|wainscot|pine straw|river rock|dirt|linear|acre|garage|epoxy|recessed|can light|snow load|construction|plate rolling|lawn|firewood|log weight|pond|pool|tv mounting"),
    ("math", r"ratio|proportion|fraction|percent|hypotenuse|triangle|cylinder|cone|sphere|volume|area|circle|circumference|gcf|lcm|factor|prime|matrix|eigen|binary|hex|decimal|scientific|notation|radical|root|exponent|log |logarithm|quadratic|slope|midpoint|rounding|average|mean|median|deviation|z score|probability|permutation|binomial|hypergeometric|normal cdf|confidence|correlation|series|sequence|integer|division|remainder|sig fig|boolean|substitution|euler|differentiation|partial|quotient|octagon|number|equation|trigonometry|five number|stem|big number|weighted|calculus|odds|random|dice|algebra|expression"),
    ("time-date", r"date|day|days|week|weeks|month|year|age|birthday|anniversary|hours|time|deadline|lead time|from today|clock"),
    ("conversion", r"convert|converter| to |kilometers|mm |feet|inches|ounces|pounds|roman|swim|mile|conversion"),
]


# URL decisions that differ from the auto slug (decided from SERP URL patterns).
SLUG_OVERRIDE = {"Date From Today Calculator": "days-from-today"}


def slugify(name: str) -> str:
    if name in SLUG_OVERRIDE:
        return SLUG_OVERRIDE[name]
    s = name.lower().replace("&", "and").replace("'", "").replace("(", "").replace(")", "")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def category(name: str, kw: str) -> str:
    text = f" {name.lower()} {kw.lower()} "
    for cat, rx in CATEGORY_RULES:
        if re.search(rx, text):
            return cat
    return "everyday"


def main():
    wb = openpyxl.load_workbook(SRC, data_only=True)
    rm = list(wb["Tool Roadmap"].iter_rows(min_row=2, values_only=True))
    km = list(wb["Keyword Mapping"].iter_rows(min_row=2, values_only=True))

    old_status = {}
    out_json = ROOT / "data/roadmap.json"
    if out_json.exists():
        for p in json.loads(out_json.read_text())["pages"]:
            old_status[p["slug"]] = p.get("status", "todo")

    kw_by_tool = collections.defaultdict(list)
    for r in km:
        tool, _rank, _batch, kw, role, vol, kd, cpc, intent, cpos, ctraffic, _sp, _src, curls = r
        kw_by_tool[tool].append({
            "kw": kw, "vol": vol or 0, "kd": kd, "intent": intent,
            "compPos": cpos, "compUrl": (curls or "").split("|")[0].strip() or None,
        })

    pages: dict[str, dict] = {}
    excluded, held = [], []
    for r in rm:
        rank, batch, tier, name, _a, pkw, pvol, pkd, *_rest = r
        combined_vol, wkd = r[10], r[11]
        key = name.lower().strip()
        if key in EXCLUDE:
            excluded.append({"name": name, "rank": rank, "reason": EXCLUDE[key]})
            continue
        canon = ALIASES.get(key, name)
        status = "hold" if key in HOLD or canon.lower() in HOLD else None
        if status:
            held.append({"name": name, "rank": rank, "reason": HOLD.get(key) or HOLD.get(canon.lower())})
        slug = slugify(canon)
        p = pages.get(slug)
        if not p:
            p = pages[slug] = {
                "slug": slug, "name": canon, "rank": rank, "tier": tier,
                "primaryKw": pkw, "primaryVol": pvol or 0, "primaryKd": pkd,
                "clusterVol": 0, "weightedKd": wkd, "mergedFrom": [], "keywords": [],
                "competitors": [], "category": None, "status": "hold" if status else "todo",
            }
        p["mergedFrom"].append(name)
        p["rank"] = min(p["rank"], rank)
        p["tier"] = min(p["tier"], tier)
        p["clusterVol"] += combined_vol or 0
        if (pvol or 0) > p["primaryVol"]:
            p["primaryKw"], p["primaryVol"], p["primaryKd"] = pkw, pvol or 0, pkd
        for k in kw_by_tool.get(name, []):
            p["keywords"].append(k)

    for p in pages.values():
        seen, kws = set(), []
        for k in sorted(p["keywords"], key=lambda k: -k["vol"]):
            if k["kw"] in seen:
                continue
            seen.add(k["kw"]); kws.append(k)
        p["keywords"] = kws[:40]
        comps = []
        for k in kws:
            if k["compUrl"] and k["compUrl"] not in comps:
                comps.append(k["compUrl"])
        p["competitors"] = comps[:5]
        p["category"] = category(p["name"], p["primaryKw"] or "")
        p["status"] = old_status.get(p["slug"], p["status"])

    ordered = sorted(pages.values(), key=lambda p: (p["status"] == "hold", p["rank"]))
    for i, p in enumerate(ordered, 1):
        p["order"] = i
        p["batch"] = (i - 1) // 10 + 1  # 10 quality pages per batch (see docs/00-PROJECT-SUMMARY.md)

    out_json.write_text(json.dumps({
        "generatedFrom": SRC.name, "pageCount": len(ordered),
        "excluded": excluded, "held": held, "pages": ordered,
    }, indent=1))

    lines = ["# Build Roadmap (generated — edit scripts/build-roadmap.py, then `npm run roadmap`)", "",
             f"Canonical pages: **{len(ordered)}** (from 489 rows; {len(excluded)} excluded, "
             f"{sum(1 for p in ordered if p['status']=='hold')} on policy hold).", "",
             "| # | Batch | Status | Page | Slug | Category | Primary keyword | Vol | KD | Cluster vol | Merged rows |",
             "|---|---|---|---|---|---|---|---|---|---|---|"]
    for p in ordered:
        lines.append(f"| {p['order']} | {p['batch']} | {p['status']} | {p['name']} | `{p['slug']}` | {p['category']} | "
                     f"{p['primaryKw']} | {p['primaryVol']} | {p['primaryKd']} | {p['clusterVol']} | {len(p['mergedFrom'])} |")
    lines += ["", "## Excluded rows", ""] + [f"- {e['name']} — {e['reason']}" for e in excluded]
    lines += ["", "## Policy hold", ""] + [f"- {h['name']} — {h['reason']}" for h in held]
    (ROOT / "data/ROADMAP.md").write_text("\n".join(lines) + "\n")
    print(f"pages={len(ordered)} excluded={len(excluded)} held={len(held)}")
    print(collections.Counter(p["category"] for p in ordered))


if __name__ == "__main__":
    main()
