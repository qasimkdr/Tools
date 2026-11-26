# SEO research pipeline (SERP → competitors → report → brief → page → tests)

Run per tool/article, in batches of ≤5 pages. Live data only: if a step can't get real data, stop and report. Never fill gaps with guesses.

## FREE MODE (current default — $0: no paid APIs, proxies, VPS or extra subscriptions)

### What this cloud session can do (checked 2026-11-21, `npm run seo:check`)
- Playwright 1.63 + headless Chromium are preinstalled (`/opt/pw-browsers`); JS, DOM and screenshots work. 4 CPU / 15 GB RAM.
- No display server is needed; `xvfb-run` exists for headed debugging.
- Outbound traffic goes through an allowlist proxy. Competitor sites on the allowlist are fetched by Node (normal TLS
  verification) and parsed by Chromium offline with JS off (`scripts/seo/browser.mjs`). JS-only content can be missed in
  this mode; locally (no proxy) Chromium loads pages directly with JS on.
- **Search engines (Google, Bing, DuckDuckGo, Mojeek, Brave) are not reachable**, and their robots.txt files disallow
  automated `/search` requests anyway. So search results come from the agent's built-in **WebSearch tool** (part of the
  Claude Code session, no extra cost), recorded verbatim with `seo:record`. Never scrape search engines directly.
- A competitor host that isn't allowlisted shows `unreachable`; the scraper skips it and uses the next result. Add
  frequently needed hosts to the environment allowlist (free).

### Folder layout
`research/<id>/serp.json` (recorded results) · `competitors.json` (page structure, no full text) · `report.md` (comparison).
`research/_queue.json` = batch state · `research/INDEX.md` = progress table. Tool briefs/decisions stay in `docs/research/<slug>.md`.

### What every report contains (validated 2026-11-21, see `research/QUALITY-ASSESSMENT.md`)
Data-source table (web-search order vs Semrush-reported Google position vs restricted list, all dated) · search intent
(keyword signals, page-type mix, open-list tool share, **sample-bias warning**) · scorecard 0–5 for content, functionality,
UX, trust, internal linking and schema (rubric in the report; JS-rendered tools get functionality n/a) · feature matrix +
candidate gaps (filtered by category) · UX/ads · accuracy claims to fact-check · topics · competitor FAQs · internal-link
anchors · schema (JSON-LD, microdata, RDFa) · heading outlines · action items · sources with dates.

### Getting 4 accessible competitors
- The scraper tries every relevant candidate in order: the open list first, then supplementary lists. It keeps one page
  per competitor domain and skips off-topic results (title/URL must contain distinctive keyword words).
- When fewer than 4 open-list competitors are reachable, run a **supplementary WebSearch restricted to reachable domains**
  (`allowed_domains`) and record it with `--restricted`. It's stored and labelled separately and never mixed into the open list.
- Question keywords that aren't roadmap pages: `npm run seo:batch -- add --id <id> --kw "<keyword>" --page <roadmap-slug>`,
  and pass `--page` to `seo:record` so Semrush volume and positions attach.
- Re-analyse with new extractor features: `npm run seo:batch -- run --refresh --ids a,b,c`.

### One keyword
```bash
# 1) agent runs WebSearch("<keyword>") and records the returned list verbatim (order kept, max 20)
npm run seo:record -- --slug <id> --kw "<keyword>" --file results.json    # or --results '<json>'
npm run seo:scrape -- --slug <id> --count 4                                 # ≥4 competitor pages, robots.txt respected
npm run seo:report -- --slug <id>                                            # → research/<id>/report.md
npm run seo:gaps -- --slugs <id>   # after building (SHOW_SCHEDULED=1 build): competitor features vs our page → research/<id>/gaps.md
```

### Hundreds of keywords (batches of 5)
```bash
npm run seo:batch -- init --from roadmap           # or: init --csv data/source/semrush.csv
npm run seo:batch -- next --size 5                 # which keywords need search results
#   agent: WebSearch each → seo:record
npm run seo:batch -- run --size 5                  # scrape + report for every ready id (resumable, cached)
npm run seo:batch -- status                        # progress → research/INDEX.md
```
Items with fewer than 4 inspectable pages become `partial`. Add hosts or pass `--urls` to `seo:scrape`, then `run --retry`.
Rate: one page at a time with a 2.5 s delay. A batch of 5 keywords takes about 2–4 minutes.

## Paid mode (later, optional)

## One-time setup (owner)
| Need | Why | How |
|---|---|---|
| **DataForSEO account** (pay-as-you-go, ~$0.002 per SERP, $1 trial credit) | Real Google US top-10 + People Also Ask + featured snippets | Sign up at dataforseo.com → API login + password. In the cloud session, approve the credential card for `api.dataforseo.com` (saved as a network secret; never paste it in chat). Locally: `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD` env vars. |
| **Network access** to `api.dataforseo.com` | The cloud environment blocks hosts by default | Approve the environment card, or Settings → environment → Network access → add the host. |
| *(Optional)* competitor hosts allowlisted | Lets Playwright open competitor pages directly (full structure: inputs, schema, FAQ) | Add hosts such as `www.calculator.net`, `www.omnicalculator.com`, `www.calculatorsoup.com`, `www.rapidtables.com`, `www.inchcalculator.com`, `www.timeanddate.com`, `www.nerdwallet.com`, `www.bankrate.com`. Without them the scraper falls back to DataForSEO On-Page (`instant_pages`), which fetches the page on DataForSEO's side. |
| *(Alternative)* Firecrawl | Scraping service, if you prefer it to DataForSEO On-Page | Needs `api.firecrawl.dev` + key. Not wired by default; DataForSEO covers both jobs with one key. |

## Commands
```bash
npm run seo:research -- --slug concrete-calculator          # serp + scrape + report in one go
npm run seo:serp -- --slug concrete-calculator --max 3      # top-10 for primary + 2 secondary keywords (cached)
npm run seo:serp -- --csv data/source/semrush.csv --slug x  # keywords from a Semrush CSV export instead
npm run seo:scrape -- --slug concrete-calculator --count 4  # inspect ≥4 competitor pages (robots.txt respected, 2.5s delay)
npm run seo:report -- --slug concrete-calculator            # → research/<slug>/report.md
npm run build && npm run test:e2e                            # verify pages (desktop + mobile)
```
Raw data is stored in `research/<slug>/serp.json` and `competitors.json`. Both are committed, so results are reproducible and nobody pays for the same SERP twice.

## What each step extracts
- **SERP** (`serp.mjs`): top 10 organic results (rank, URL, title, snippet), SERP features, featured-snippet URL, People Also Ask,
  related searches. The top 10 competitor domains are aggregated across the page's keywords. Volume and KD come only from the Semrush file.
- **Pages** (`scrape.mjs`): title and meta description (with lengths), canonical, H1/H2/H3, word count, FAQs (FAQPage schema and
  question headings), schema types, tables, images, calculator inputs, internal/external link counts and samples.
  Full page text is **not** stored. We analyse structure; we never copy content.
- **Report** (`report.mjs`): keyword/SERP table, top 10 per keyword, competitor table, PAA list, page comparison matrix,
  topic coverage (heading terms used by ≥2 competitors), heading outlines, and a brief scaffold.

## Then the agent (judgement, not automation)
1. Write the **content brief** in `docs/research/<slug>.md` (template `_TEMPLATE.md`): intent, URL decision, must-cover
   subtopics, FAQ list, at least 5 concrete gaps to beat, title and H1 options, internal links in and out, schema.
2. Build the page per `03-TOOL-BUILD-WORKFLOW.md` and write content per `04-CONTENT-TEMPLATE.md`. Use original wording
   and our own examples; facts and formulas are cited to primary sources.
3. Run `npm run build && npm run test:e2e`. All tests must pass.
4. Commit research + page together on the working branch, push, and report to the owner.

## Approval & safety rules
- **Production = `main` branch** (the deploy workflow only deploys `main`). Agents push to the Claude session branch and merge to `main` automatically once lint + build + e2e tests pass (owner standing approval, 2026-11-22); never merge on a failure.
- Changing an already-live page's content or URL goes in a separate commit called out in the report. Never silently overwrite it.
- Respect `robots.txt` and rate limits (built in). Don't scrape sites that block bots; use the DataForSEO fallback or skip them.
- Budget: about 3 SERPs + 4 page inspections ≈ $0.01–0.02 per tool. Print the cost after every run.
