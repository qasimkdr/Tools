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
- `npm run lint` (tsc). `npm run roadmap` regenerates roadmap from `data/source/*.xlsx`.
- Visual check: `cd out && python3 -m http.server 4173` + Playwright screenshot (desktop 1366 + mobile 390, light + dark).

## Non-negotiables
1. Never link to an unpublished page. Never publish a thin/placeholder page.
2. Every tool page: unique title (≤60) + meta description (140–160), one H1, answer-first intro, formula, worked example, FAQ (5–8), ≥3 internal links in body + related block, last-updated date.
3. No fake reviews/ratings schema, no keyword stuffing, no auto-generated filler. Write for the user first.
4. Keep JS small: no new runtime dependency without a reason written in the PR/commit.
5. Branch: `claude/nextjs-seo-calculators-site-do5n1n` (or whatever the session specifies). Never push to main unasked.
