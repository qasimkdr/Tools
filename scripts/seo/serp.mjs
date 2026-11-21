#!/usr/bin/env node
// Step 1–3: Google US organic SERPs for a page's keywords → top-10 competitors.
// Usage: node scripts/seo/serp.mjs --slug concrete-calculator [--max 3] [--device desktop|mobile] [--refresh]
//        node scripts/seo/serp.mjs --csv path/semrush.csv --slug my-page
// Output: data/research/<slug>/serp.json (cached; re-run with --refresh). Live API data only — nothing is estimated.
import path from "node:path";
import { args, dfs, dirFor, loadKeywords, readJSON, writeJSON, isCompetitor, sleep } from "./lib.mjs";

const a = args();
if (!a.slug && !a.csv) { console.error("need --slug or --csv"); process.exit(1); }
const src = loadKeywords({ slug: a.slug, csv: a.csv, max: Number(a.max || 3) });
const slug = a.slug || src.name;
const file = path.join(dirFor(slug), "serp.json");
const cache = readJSON(file, { keywords: {} });
const device = a.device || "desktop";
let cost = 0;

for (const k of src.keywords) {
  if (cache.keywords[k.kw] && !a.refresh) { console.log(`cached  ${k.kw}`); continue; }
  const { result, cost: c } = await dfs("serp/google/organic/live/advanced", [{
    keyword: k.kw, location_code: 2840, language_code: "en", device, depth: 10,
  }]);
  cost += c || 0;
  const r = result?.[0] || {};
  const items = r.items || [];
  cache.keywords[k.kw] = {
    fetchedAt: new Date().toISOString(), device, location: "United States (2840)",
    fileVolume: k.vol, fileKd: k.kd, // from Semrush file, not DataForSEO
    seResultsCount: r.se_results_count ?? null,
    features: [...new Set(items.map((i) => i.type))],
    organic: items.filter((i) => i.type === "organic").slice(0, 10).map((i) => ({
      rank: i.rank_group, url: i.url, domain: i.domain, title: i.title, description: i.description,
    })),
    featuredSnippet: items.find((i) => i.type === "featured_snippet")?.url ?? null,
    peopleAlsoAsk: items.filter((i) => i.type === "people_also_ask").flatMap((i) => (i.items || []).map((q) => q.title)).filter(Boolean),
    relatedSearches: items.filter((i) => i.type === "related_searches").flatMap((i) => i.items || []).filter((x) => typeof x === "string"),
  };
  console.log(`fetched ${k.kw}: ${cache.keywords[k.kw].organic.length} organic, features: ${cache.keywords[k.kw].features.join(", ")}`);
  await sleep(500);
}

// Aggregate: a domain's best rank and how many of our keywords it ranks for → top 10 competitors.
const agg = new Map();
for (const [kw, s] of Object.entries(cache.keywords)) for (const o of s.organic) {
  if (!isCompetitor(o.domain)) continue;
  const e = agg.get(o.domain) || { domain: o.domain, bestRank: 99, keywords: 0, urls: new Set() };
  e.bestRank = Math.min(e.bestRank, o.rank); e.keywords++; e.urls.add(o.url); agg.set(o.domain, e);
}
cache.slug = slug; cache.name = src.name; cache.keywordSource = src.source; cache.updatedAt = new Date().toISOString();
cache.topCompetitors = [...agg.values()].sort((x, y) => y.keywords - x.keywords || x.bestRank - y.bestRank).slice(0, 10)
  .map((e) => ({ ...e, urls: [...e.urls] }));
writeJSON(file, cache);
console.log(`\nTop competitors (${cache.topCompetitors.length}):`);
for (const c of cache.topCompetitors) console.log(`  #${c.bestRank} ${c.domain} (ranks for ${c.keywords} kw)`);
if (cost) console.log(`DataForSEO cost this run: $${cost.toFixed(4)}`);
