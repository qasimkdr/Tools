# SEO research pipeline (SERP → competitors → report → brief → page → tests)

Run per tool/article, in batches of ≤5 pages. Live data only: if a step can't get real data, stop and report. Never fill gaps with guesses.

## FREE MODE (current default — no paid APIs)
1. **SERP:** run the agent's WebSearch tool (standard mode) for the primary keyword + 1–2 top secondary keywords.
   Record each result list **exactly in the returned order** (no added/removed URLs):
   `npm run seo:record -- --slug <slug> --kw "<keyword>" --results '[{"url":"…","title":"…"}, …]'`
   Position = web-search order, not a verified Google rank; the report labels it. No People Also Ask in free mode, so use
   competitor FAQs, keyword-cluster questions and WebSearch queries like "<keyword> how to" for FAQ ideas.
2. **Competitor pages:** `npm run seo:scrape -- --slug <slug> --count 4` (free; Playwright). If a competitor host is
   blocked by the cloud network, propose adding that exact host with the environment tools (free), or pick the next result.
3. **Report:** `npm run seo:report -- --slug <slug>`, then write the brief in `docs/research/<slug>.md`.
4. **Our own rankings (free):** Google Search Console Performance report (owner exports queries/positions) is the
   source of truth for how we rank after launch.

Never scrape google.com result pages directly (against Google's terms and blocked quickly).

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
npm run seo:report -- --slug concrete-calculator            # → docs/research/<slug>.report.md
npm run build && npm run test:e2e                            # verify pages (desktop + mobile)
```
Raw data is stored in `data/research/<slug>/serp.json` and `competitors.json`. Both are committed, so results are reproducible and nobody pays for the same SERP twice.

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
- **Production = `main` branch** (the deploy workflow only deploys `main`). Owner instruction: agents push directly to `main`, but only after build + e2e tests pass.
- Changing an already-live page's content or URL goes in a separate commit called out in the report. Never silently overwrite it.
- Respect `robots.txt` and rate limits (built in). Don't scrape sites that block bots; use the DataForSEO fallback or skip them.
- Budget: about 3 SERPs + 4 page inspections ≈ $0.01–0.02 per tool. Print the cost after every run.
