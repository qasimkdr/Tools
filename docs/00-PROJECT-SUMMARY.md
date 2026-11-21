# SolvePilot: project summary & ranking strategy

## 1. What the keyword file tells us
Source: `data/source/SolvePilot_50_Tools_Daily_SEO_Roadmap.xlsx` (10 SEMrush exports, 9,307 rows, 2,475 tool-intent keywords).
- The exports are **competitor organic reports for calculator.net and omnicalculator.com** (every competitor URL in the
  file is one of these two). So the list is "what the two giants rank for": proven demand, but also the strongest SERPs.
- **489 rows → 380 canonical pages** after cleaning (`scripts/build-roadmap.py`):
  - **~90 duplicate-intent rows merged.** For example, "Air Force PT calculator", "AF PT test calculator" and
    "USAF PT calculator" are one page. So are 6 AP Chemistry variants, 5 dog-pregnancy variants and 4 wedding-alcohol variants.
    Building them separately would cannibalise each other and look like doorway pages.
  - **20 rows excluded**: competitor brand/navigational queries (calculator.net, nemin.io, bythelaws.com), product
    queries (Canon calculator model), junk ("calculator+mango", "login calculator").
  - **12 on policy hold**: peptide/drug dosing (BPC-157, TB-500, PT-141, reconstitution), EtG test, breast-implant
    sizing, clinical lab calculators. These risk AdSense disapproval and YMYL demotion.
- 368 buildable pages: finance 75, math 70, health 49, construction 45, science 44, everyday 37, education 24,
  date/time 22, conversions 11, text 3.
- Data caveats: "Combined volume" sums whole clusters. Some volumes look global or inflated (ratio calculator 1.5M),
  and some merges are wrong ("elapsed time calculator" inside Ratio). Every tool's workflow re-validates its cluster.

## 2. Strategy: how a new domain beats calculator.net and Omni
A new domain can't win the head terms (KD 35–50) on day one. We win in this order:
1. **Low-KD long tail first (KD ≤ 20)**: 27 quick-win pages with ≥4K volume, such as Discount (33K/KD11),
   Interest Rate (27K/KD7), Gravel (12K/KD13), Army Body Fat (12K/KD13), Sand, AP World History (KD4), Air Force PT
   (KD8), Half Birthday, Bowling Score, How Many Years (KD2), AP Chem (KD3), NPV, Stair, AP Stats.
2. **Programmatic long tail where the SERP rewards it**: "N days/weeks/months from today" pages (✅ built, 105 URLs,
   ~1.3M cluster volume). Each page has unique computed facts, not swapped text.
3. **Topical authority clusters, not scattered tools**: finish whole clusters before moving on (date/time,
   landscaping materials, military fitness, AP scores, pay/overtime). Google ranks sites that fully cover a topic.
   The cluster map is in `06-INTERNAL-LINKING.md`.
4. **Then the head terms** (concrete, square footage, GPA, age, ratio), once the domain has impressions, links and
   behaviour signals.

**Recommended build order**: follow `data/ROADMAP.md`, but finish the cluster of the tool you just built before jumping.
For example, after Days From Today, build Date Calculator, Date Difference, Weeks, Age, Half Birthday and How Many Years.

### What "better than competitors" means on every page
- A better tool: more options (units, business days, presets from keyword data), instant results, shareable URL,
  copy/print/.ics, mobile-first, accessible.
- Better explanations: formula, conventions and edge cases competitors skip, worked examples, reference tables.
- Trust: last-updated date, sources for YMYL, editorial policy, real authors (owner TODO).
- Speed: static HTML, system fonts, CSS-only 3D/motion, lazy ads with reserved space, so we pass Core Web Vitals where
  Omni's heavy pages often struggle.

## 3. Publishing pace (important: changed from the 50/day plan)
The spreadsheet assumes **50 tools/day**. A new domain publishing hundreds of similar pages fast is exactly the
pattern of Google's **scaled content abuse** policy, and it hurts AdSense approval ("low value content").
**Recommended:** 5–10 fully researched tools per session/day for the first 8 weeks, then speed up only if Search
Console shows pages getting indexed and gaining impressions. Quality per page beats count. 380 pages at 10/day is
still under 2 months.

## 4. How we work (token-efficient loop)
1. Agent reads `CLAUDE.md`, then only `docs/03-TOOL-BUILD-WORKFLOW.md`.
2. Picks the next `todo` from `data/ROADMAP.md` and pulls its keywords and competitor URLs from `data/roadmap.json`.
3. Clusters → SERP check → 3–4 competitor teardowns → `docs/research/<slug>.md`.
4. Builds only 4 small files plus a 15-line route using shared components. No re-writing layout, SEO or schema code.
5. QA gate (build, meta, sitemap, screenshots) → mark `live` → commit and push.

## 5. Tech decisions
- **Next.js 16 static export** (`out/`) on Cloudflare Pages (free, global CDN, brotli, HTTP/3). Daily rebuild via
  `.github/workflows/daily-build.yml`, so date pages are always correct.
- Sitemap and robots generated at build. Self-canonicals, trailing slashes, breadcrumbs, WebApplication/FAQ/
  Breadcrumb/ItemList/Organization/WebSite schema.
- Design: Tailwind v4 tokens, glassmorphism tool card, aurora and perspective-grid hero, 3D tilt cards, scroll
  fade-in/out, all CSS and disabled for reduced-motion users. No three.js (it would cost LCP and ~150KB of JS).

## 6. Off-page & growth (owner actions; can't be done in code)
- **Search Console + Bing Webmaster Tools** on day 1. Submit the sitemap and request indexing for new URLs (≤10/day).
- **Links that work for calculator sites**: get listed on resource pages (universities, homeschool, construction
  forums, HR blogs), offer embeddable calculator widgets (later phase, with an attribution link), answer genuine
  Reddit/Quora questions with a useful link, run digital-PR data pieces (e.g. "most common deadline mistakes").
  **No PBNs, no paid link packages.**
- Brand signals: consistent name, logo, social profiles, an About page with real people.
- AI visibility (AI Overviews, ChatGPT and Perplexity cite clear answers): answer-first intros, clean tables and
  formulas. This is already part of the template.

## 7. Owner TODO before launch
1. Buy and point the domain, then set `NEXT_PUBLIC_SITE_URL` (GitHub repo variable `SITE_URL`).
2. Replace placeholders: real names and bios (`src/lib/site.ts` editor, `/about/`), real contact and privacy emails.
3. Connect Cloudflare Pages (secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`).
4. Verify Search Console and submit `https://<domain>/sitemap.xml`.
5. Apply for AdSense after about 25–30 tools are live and indexed (checklist in `02-ADSENSE-RULES.md`).
6. Optional: allow competitor hosts in the cloud environment's network settings so agents can read competitor pages
   directly (calculator.net, omnicalculator.com, inchcalculator.com, timeanddate.com, calculatorsoup.com,
   rapidtables.com, nerdwallet.com, bankrate.com …). Without this, research relies on SERP data only.
