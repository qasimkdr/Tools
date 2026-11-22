# SolvePilot — agent instructions (read this first, then only the doc you need)

Static Next.js 16 calculator site (`output: "export"`). Goal: rank on Google + AdSense approval. Quality > quantity.

## Read-on-demand docs (don't load all of them every time)
| Task | Read |
|---|---|
| Build the next tool | `docs/03-TOOL-BUILD-WORKFLOW.md` (the full checklist; it links to the others) |
| Write the article/FAQ | `docs/04-CONTENT-TEMPLATE.md` |
| SEO decisions / is a skill's advice outdated? | `docs/01-SEO-RULES.md` |
| Ads, policy, YMYL, legal pages | `docs/02-ADSENSE-RULES.md` |
| Styling / animation | `docs/05-DESIGN-SYSTEM.md` |
| Links between tools | `docs/06-INTERNAL-LINKING.md` |
| SERP + competitor research (DataForSEO, Playwright) | `docs/07-SEO-RESEARCH-PIPELINE.md` |
| Why we do it this way / roadmap strategy | `docs/00-PROJECT-SUMMARY.md` |

## What to build next
`data/ROADMAP.md` (ordered; first row with status `todo`). Machine data: `data/roadmap.json` (keywords, volumes, KD, competitor URLs per page).
After publishing a tool, set its `status` to `live` in `data/roadmap.json` (status survives `npm run roadmap`).
Rows with status `hold` are policy-sensitive: never build without the owner's OK.

## Architecture (token-saving: reuse, don't rewrite)
- `src/components/ToolLayout.tsx` = the page template for EVERY tool (hero, calculator card, article, FAQ, related, schema, ads).
- A tool = `src/tools/<slug>/{meta.ts, Calculator.tsx, Content.tsx, faq.ts}` + `src/app/<slug>/page.tsx` (≈15 lines, copy `src/app/days-from-today/page.tsx`).
- Register in `src/tools/registry.ts` → sitemap, hubs, home, related links update automatically.
- Shared math/date helpers in `src/lib/` (`date.ts`, add `money.ts`, `units.ts` … as needed). Pure functions only.
- Server components by default; only the interactive calculator is `"use client"`.

## Commands
- `npm run build` → static site in `out/` (includes `sitemap.xml`, `robots.txt`). Must pass before commit.
- **FREE MODE research (current):** `npm run seo:batch -- next --size 5` → WebSearch each keyword → `npm run seo:record -- --slug <id> --kw "…" --file r.json`
  → `npm run seo:batch -- run --size 5` → reports in `research/<id>/report.md`, progress in `research/INDEX.md`. `npm run seo:check` = browser health check.
  Details: `docs/07-SEO-RESEARCH-PIPELINE.md`.
  Paid mode later: `npm run seo:research -- --slug <slug>` (DataForSEO).
- `npm run test:e2e` → Playwright SEO + functional tests on the static build (desktop + mobile). Must pass before commit.
- `npm run lint` (tsc). `npm run roadmap` regenerates roadmap from `data/source/*.xlsx`.
- Visual check: `cd out && python3 -m http.server 4173` + Playwright screenshot (desktop 1366 + mobile 390, light + dark).

## Non-negotiables
1. Never link to an unpublished page. Never publish a thin/placeholder page.
2. Every tool page: unique title (≤60) + meta description (140–160), one H1, answer-first intro, formula, worked example, FAQ (5–8), ≥3 internal links in body + related block, last-updated date.
3. No fake reviews/ratings schema, no keyword stuffing, no auto-generated filler. Write for the user first.
4. Keep JS small: no new runtime dependency without a reason written in the PR/commit.
5. Never fabricate volumes, rankings or competitor facts. No live data → say so and stop that step.
6. Owner instruction (2026-11-22, standing approval): work and push on the Claude session branch, then MERGE TO `main`
   AUTOMATICALLY (fast-forward) once the batch is finished and `npm run lint` + `npm run build` + `npm run test:e2e` all pass.
   If anything fails, do NOT merge: fix it or report it. `main` deploys to production. Call out any edit to an
   already-live page in the commit message. Never force-push `main`. Still ask first for anything outside normal tool/content
   work (deleting pages, changing URLs, renaming the brand/domain, policy-hold tools).
7. Free tools only for now: no paid APIs/services. Don't scrape Google directly (ToS); use the WebSearch tool + `seo:record`.
