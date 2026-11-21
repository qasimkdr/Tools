# SEO rules (Google Search Central, current as of Nov 2026)

Source of truth: Google Search Essentials, "Creating helpful, reliable, people-first content", spam policies
(scaled content abuse, site reputation abuse, expired domain abuse), Core Web Vitals. If any skill/plugin advice
conflicts with this file, **this file wins**. Re-verify against Google docs when a core update lands.

## 1. Page-level checklist (every tool / article)
- **Title** ≤ 60 chars, primary keyword first, natural language. Pattern: `<Primary Keyword> – <benefit/qualifier>`.
  Template adds ` | SolvePilot`.
- **Meta description** 140–160 chars, contains the answer/benefit + primary keyword once. Unique per page.
- **One H1** = what the user searched (e.g. "What Date Is 90 Days From Today?" or "Concrete Calculator").
- **Answer-first intro**: first 1–2 sentences answer the query (featured snippets + AI Overviews pull from here).
- **URL**: `/<slug>/`, lowercase, hyphens, no dates, no stop-word soup. Never change a published URL (if you must: 301 at host level).
- **Canonical**: self-referencing absolute URL (handled by `pageMeta`). Trailing slash everywhere.
- **Headings**: H2 per user question (How to use, Formula, Examples, Table, Use cases, FAQ). Logical H2→H3.
- **Schema (JSON-LD)**: `WebApplication` + `BreadcrumbList` + `FAQPage` (auto in ToolLayout). Articles: `Article`.
  Never add `AggregateRating`/`Review` without real, on-page user reviews (manual action risk).
- **Internal links**: ≥3 contextual body links + related block (see `06-INTERNAL-LINKING.md`).
- **E-E-A-T**: show the formula and sources, worked examples with real numbers, last-updated date, editor link.
  YMYL tools (finance/health) cite primary sources (IRS, CDC, NIH, Fed, official test charts) and name a reviewer.
- **Images** (when used): SVG preferred; otherwise WebP/AVIF, explicit width/height, descriptive `alt`, lazy below fold.

## 2. Technical (already wired — don't break it)
- Static export, `trailingSlash: true`, `sitemap.xml` + `robots.txt` generated at build (`src/app/sitemap.ts`, `robots.ts`).
- Only indexable, 200-status canonical URLs go in the sitemap. `lastmod` = real content update date only.
- Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1. System fonts (no web-font request), CSS-only hero
  effects, ads lazy-loaded with reserved height, server components by default.
- `html.js` gating means content is visible without JS (crawler safe).
- Host must redirect `http→https` and `www↔apex` to ONE origin (configure at Cloudflare/Netlify).
- Date-dependent pages are pre-rendered with the build date → **rebuild daily** (GitHub Action `daily-build.yml`) so HTML
  always matches "today". Client hydrates to the visitor's local date.

## 3. Content quality rules (helpful content system is part of core ranking now)
- Every page must give something the top 3–4 results don't: better tool UX, more options, edge cases explained,
  tables, worked examples, downloadable/shareable result, clearer formula. Document it in `docs/research/<slug>.md`.
- No filler intros ("In today's fast-paced world…"), no repeating the keyword unnaturally, no padded word counts.
  Length follows intent: a simple converter may need 600–900 words; a mortgage calculator 1,500–2,500.
- One page per search intent. Merge variants that one tool fully answers (see roadmap merges). Separate pages
  only when the SERP shows different URLs ranking for the variant (validated per cluster — e.g. "90 days from today"
  SERP shows dedicated per-number pages → we built `/days-from-today/90/`).
- **Programmatic pages** (per-number/per-state variants) are allowed ONLY when (a) the keyword has real volume and
  (b) each page carries unique computed facts. Never mass-generate pages without demand (scaled content abuse).

## 4. Outdated / harmful advice to IGNORE (even if a skill suggests it)
| Advice | Reality |
|---|---|
| `rel="next/prev"` for pagination | Google stopped using it in 2019. Use plain links + self canonical. |
| `priority` / `changefreq` in sitemap | Ignored by Google. Only accurate `lastmod` matters. |
| HowTo rich results | Deprecated (2023). Don't build HowTo schema for snippets. |
| FAQ rich results for everyone | Since Aug 2023 only well-known gov/health sites get them. Markup is harmless; don't expect stars. |
| Meta keywords tag | Ignored since 2009. Don't add. |
| Keyword density targets (e.g. 2%) | Not a ranking factor. Write naturally; use entities and related terms. |
| Exact-match domain / EMD tricks | No benefit; brand matters. |
| Mass AI pages to "cover all keywords" | Scaled content abuse → sitewide demotion. |
| Buying links / PBNs / link exchanges at scale | Link spam policy violation. Earn links (see 00-PROJECT-SUMMARY §Links). |
| Disavowing randomly | Only for manual actions or clear paid-link history. |
| Changing dates without changing content | Google detects it; erodes trust. |
| Auto ads everywhere on day one | Hurts CWV + UX; manual placements only (02-ADSENSE-RULES). |

## 5. After publishing
1. `npm run build` passes, page visible in `out/<slug>/index.html`, present in `out/sitemap.xml`.
2. Search Console → URL Inspection → Request indexing for the new URL (owner does this; batch ≤10/day).
3. Track in GSC after 14/28 days: impressions, avg position, CTR. If CTR < 2% at position ≤10, rewrite title/description.
   If position 11–30, expand content for missing sub-questions (check "Queries" report) and add internal links to it.
