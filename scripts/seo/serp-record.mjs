#!/usr/bin/env node
// FREE MODE SERP step: record search results the agent collected with its built-in web search tool (no paid API).
// Usage (add --page <roadmap-slug> when the research id differs from the roadmap page, e.g. a question keyword):
//   npm run seo:record -- --slug concrete-calculator --kw "concrete calculator" \
//     --results '[{"url":"https://www.calculator.net/concrete-calculator.html","title":"Concrete Calculator"}, ...]'
//   (or --file results.json containing the same array)
// Writes into research/<id>/serp.json in the same shape as serp.mjs, so scrape.mjs/report.mjs work unchanged.
// HONESTY RULES: list results in the exact order the search returned them; never add URLs that weren't returned;
// `rank` here = position in web-search output, NOT a verified Google rank (the report labels it that way).
import fs from "node:fs";
import path from "node:path";
import { args, dirFor, readJSON, writeJSON, isCompetitor, rootDomain, loadKeywords } from "./lib.mjs";

const a = args();
if (!a.slug || !a.kw || !(a.results || a.file)) { console.error("need --slug, --kw and --results '<json>' or --file"); process.exit(1); }
const list = JSON.parse(a.file ? fs.readFileSync(a.file, "utf8") : a.results);
if (!Array.isArray(list) || !list.length) { console.error("results must be a non-empty JSON array of {url,title}"); process.exit(1); }

// Volume/KD from the Semrush-derived roadmap when the keyword is in it (never invented).
let fileKw = null;
try { const src = loadKeywords({ slug: a.page || a.slug, max: 100 }); fileKw = src.keywords.find((k) => k.kw === a.kw) || null; } catch {}
const page = readJSON(path.join(process.cwd(), "data/roadmap.json"), { pages: [] }).pages.find((p) => p.slug === (a.page || a.slug));
const kwData = page?.keywords.find((k) => k.kw === a.kw) || fileKw || null;

const file = path.join(dirFor(a.slug), "serp.json");
const cache = readJSON(file, { keywords: {} });
// --restricted: a supplementary search limited to domains this environment can reach. Stored under its own label so it
// never mixes with (or impersonates) the open result list.
const label = a.restricted ? `${a.kw} [restricted to accessible domains]` : a.kw;
cache.keywords[label] = {
  fetchedAt: new Date().toISOString(), device: "n/a", location: "United States (web search tool)",
  provider: a.restricted ? "agent-websearch-restricted" : "agent-websearch",
  rankNote: a.restricted ? "order within a search limited to accessible domains — not a Google rank, not the open result list" : "position in web-search output, not a verified Google rank",
  fileVolume: kwData?.vol ?? null, fileKd: kwData?.kd ?? null, fileIntent: kwData?.intent ?? null,
  // Google position of the competitor URL as reported in the Semrush export (a real Google rank, but from the export date, not today).
  semrushCompetitor: kwData?.compUrl ? { position: kwData.compPos ?? null, url: kwData.compUrl } : null,
  seResultsCount: null, features: [], featuredSnippet: null, peopleAlsoAsk: [], relatedSearches: [],
  organic: list.slice(0, Number(a.max || 20)).map((r, i) => ({ rank: i + 1, url: r.url, domain: new URL(r.url).hostname, title: r.title ?? null, description: r.description ?? null })),
};

const agg = new Map();
for (const s of Object.values(cache.keywords)) for (const o of s.organic) {
  if (!isCompetitor(o.domain)) continue;
  const d = rootDomain(o.domain); const e = agg.get(d) || { domain: d, bestRank: 99, keywords: 0, urls: new Set() };
  e.bestRank = Math.min(e.bestRank, o.rank); e.keywords++; e.urls.add(o.url); agg.set(d, e);
}
Object.assign(cache, { slug: a.slug, page: page?.slug || null, category: page?.category || null, name: page?.name || a.slug, keywordSource: "data/roadmap.json (Semrush)", updatedAt: new Date().toISOString() });
cache.topCompetitors = [...agg.values()].sort((x, y) => y.keywords - x.keywords || x.bestRank - y.bestRank).slice(0, 10).map((e) => ({ ...e, urls: [...e.urls] }));
writeJSON(file, cache);
console.log(`Recorded ${cache.keywords[label].organic.length} results for "${label}" → ${path.relative(process.cwd(), file)}`);
console.log("Top competitors:", cache.topCompetitors.map((c) => c.domain).join(", "));
