# Tool build workflow (follow top to bottom for every tool)

Reference implementation: `src/tools/days-from-today/` + `src/app/days-from-today/`. Copy its shape.

## Step 0 — Pick
Open `data/ROADMAP.md` → first `todo` row. Pull its data:
```bash
python3 -I -c "import json;p=[x for x in json.load(open('data/roadmap.json'))['pages'] if x['slug']=='SLUG'][0];print(json.dumps(p,indent=1))"
```
You get: primary keyword, volume, KD, all merged keywords (≤40), competitor URLs (calculator.net / omnicalculator ranking pages).

## Step 1 — Cluster & intent (≈5 min)
- Group the page's keywords into: **core intent** (the tool), **sub-questions** (→ H2/FAQ), **variants** (→ quick-pick
  presets, table rows, or separate programmatic pages only if they have ≥1,000 volume AND the SERP ranks dedicated URLs).
- Drop keywords whose intent is different (the source data has some mis-merges, e.g. "elapsed time calculator" inside
  Ratio Calculator → that belongs to a time tool). Note it in the research file and fix ALIASES in `scripts/build-roadmap.py`.
- Check cannibalisation: does an existing live page already answer this? Then extend that page instead.

## Step 2 — SERP & competitor research (3–4 competitors minimum)
**Free mode (current):** WebSearch → `npm run seo:record` → `npm run seo:scrape` → `npm run seo:report`
(see `07-SEO-RESEARCH-PIPELINE.md`). This writes `research/<slug>/report.md` with real competitor structure.

1. `WebSearch` the primary keyword + 1–2 top secondary keywords (standard mode). Record the top 10 URLs and the SERP
   features shown (featured snippet, People Also Ask, AI Overview, video, calculators-in-SERP).
2. Read the top 3–4 ranking tool pages (web-fetch agent). If the environment blocks the host, record that and use the
   SERP titles/snippets + known product behaviour; don't invent specifics.
3. Fill `docs/research/<slug>.md` from `docs/research/_TEMPLATE.md`: per competitor → title, H1, inputs/options,
   outputs, content sections, word count estimate, FAQ, tables, schema, UX/ads problems, **gaps**.
4. Write the "How we beat them" list: at least 5 concrete items (extra inputs/units, edge cases, explanation depth,
   tables, charts, copy/share/print, mobile UX, speed, accuracy fixes, sources).

## Step 3 — Build the calculator (`src/tools/<slug>/Calculator.tsx`)
- `"use client"`; pure math in `src/lib/*.ts` (reusable + testable). Validate inputs; never show NaN/Infinity.
- Live results (no "Calculate" button needed unless heavy). Result card: big primary answer (`text-gradient`),
  secondary stats grid, explanation line ("how we got this"), copy/share. Units toggle (US/metric) where relevant.
- Sync inputs to the query string (`history.replaceState`) so results are shareable.
- Accessible: every input has a `<label>`, groups have `role="group"` + `aria-label`, result region `aria-live="polite"`.
- Hand-check 5 cases including edge cases (zero, huge, negative, leap year, rounding). Write them in the research file.

## Step 4 — Write content (`Content.tsx`, `faq.ts`) → follow `04-CONTENT-TEMPLATE.md`

## Step 5 — Wire it up
1. `src/tools/<slug>/meta.ts` (ToolMeta: title ≤60, description 140–160, category, keywords, `related` 2–6 slugs).
   `related` may name unpublished slugs (ignored until they go live, then links appear automatically).
2. `src/app/<slug>/page.tsx`: copy `src/app/days-from-today/page.tsx`, change imports + intro.
3. Add to `TOOLS` in `src/tools/registry.ts`.
4. Add the reverse link: put the new slug into `related` of 1–3 existing live tools that match.
5. If a new category gets its first tool, its hub page/nav links appear automatically.

## Step 6 — QA gate (all must pass)
- `npm run lint && npm run build` → 0 errors.
- `out/<slug>/index.html` exists, has correct `<title>`, description, canonical, one `<h1>`, JSON-LD.
- `grep -c '<url>' out/sitemap.xml` increased.
- `npm run test:e2e` passes (SEO checks on every sitemap URL, internal links, no console errors, no mobile overflow).
  Add a functional spec `tests/e2e/<slug>.spec.ts` with 2–3 hand-verified calculations.
- Screenshot desktop+mobile, light+dark for a visual check.
- Run the `seo-check` skill mentally against `01-SEO-RULES.md` §1 (skip its outdated items — see §4 there).

## Step 7 — Ship
- Set `status: "live"` for the slug in `data/roadmap.json`, run `npm run roadmap`.
- Commit: `feat(tool): <Name>` with the research highlights in the body. Push to the Claude session branch after tests pass; merge to `main` only with the owner's explicit approval.
- Tell the owner: URL to submit in Search Console.

## Pace
Target **5–10 finished tools per working session**, not 50/day. See `00-PROJECT-SUMMARY.md` §Publishing pace.
