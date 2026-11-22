#!/usr/bin/env node
// Inspect ≥4 competitor pages for one research id (tool slug or keyword slug). Free: Playwright + Chromium.
// Usage: node scripts/seo/scrape.mjs --slug <id> [--count 4] [--urls u1,u2,…] [--delay 2500]
// Input URLs: --urls, else research/<id>/serp.json (best result per competitor domain, in result order).
// Output: research/<id>/competitors.json — structure + metadata only (no full text is stored).
import path from "node:path";
import { args, dirFor, readJSON, writeJSON, sleep, isCompetitor, rootDomain } from "./lib.mjs";
import { inspect, withBrowser } from "./browser.mjs";

export async function scrape({ slug, count = 4, urls = [], delay = 2500, refresh = false, log = console.log }) {
  const dir = dirFor(slug);
  const serpData = readJSON(path.join(dir, "serp.json"), null);
  const keyword = (Object.keys(serpData?.keywords || {})[0] || slug.replace(/-/g, " ")).replace(/ \[restricted.*$/, "");
  if (!urls.length) {
    const serp = readJSON(path.join(dir, "serp.json"), null);
    if (!serp) throw new Error(`No research/${slug}/serp.json — record search results first (seo:record) or pass --urls.`);
    // Relevance: title or URL must contain a distinctive keyword token, so off-topic results (e.g. a GPA calculator for
    // "ap world score calculator") are never analysed as competitors. Generic words don't count.
    const GENERIC = new Set(["calculator", "calculators", "calculate", "converter", "how", "what", "many", "much", "the", "for", "and", "online", "free", "score", "find", "from", "with", "your", "tool", "to", "in", "a", "of", "is", "are", "do", "does"]);
    const tokens = keyword.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1 && !GENERIC.has(t));
    const stem = (t) => t.replace(/(ies|es|s)$/, "");
    const relevant = (o) => { const hay = `${o.title || ""} ${decodeURIComponent(o.url)}`.toLowerCase(); const hits = tokens.filter((t) => hay.includes(stem(t))).length; return hits >= (tokens.length >= 4 ? 1 : Math.min(2, tokens.length)); }; // long keywords: one distinctive word is enough
    // All relevant candidates in priority order: open result list(s) by position, then restricted list(s). The loop below
    // skips a competitor domain only once one of its pages succeeded, so a failed URL falls through to the next one.
    const cands = [];
    for (const s of Object.values(serp.keywords)) for (const o of s.organic)
      if (relevant(o) && isCompetitor(o.domain)) cands.push({ url: o.url, order: (s.provider === "agent-websearch-restricted" ? 1000 : 0) + o.rank });
    urls = [...new Map(cands.sort((x, y) => x.order - y.order).map((c) => [c.url, c])).keys()];
  }
  const out = refresh ? { pages: {} } : readJSON(path.join(dir, "competitors.json"), { pages: {} });
  out.failed ||= {};
  // One page per competitor: drop cached duplicates (same canonical/final URL or same root domain), keep the first.
  const seenKey = new Set();
  for (const [u, pg] of Object.entries(out.pages)) {
    const keys = [rootDomain(pg.domain), (pg.canonical || pg.finalUrl || u).replace(/[?#].*$/, "").replace(/\/$/, "")];
    if (keys.some((k) => seenKey.has(k))) Reflect.deleteProperty(out.pages, u); else keys.forEach((k) => seenKey.add(k));
  }
  let ok = Object.keys(out.pages).length;
  await withBrowser(async (browser) => {
    for (const u of urls) {
      if (ok >= count) break;
      if (out.pages[u]) continue; // cached
      if (seenKey.has(rootDomain(new URL(u).hostname))) continue; // already have this competitor
      try {
        const d = await inspect(browser, u.replace(/^http:\/\//, "https://"), { keyword });
        const ck = (d.canonical || d.finalUrl).replace(/[?#].*$/, "").replace(/\/$/, "");
        if (seenKey.has(ck)) { log(`  = ${u} duplicate of an inspected page`); continue; }
        seenKey.add(rootDomain(d.domain)); seenKey.add(ck);
        out.pages[u] = d; delete out.failed[u]; ok++;
        log(`  ✓ ${u}  [${d.pageType}] words ${d.wordCount}, H2 ${d.h2.length}, FAQs ${d.faqs.length}, inputs ${d.calculatorInputs.length}`);
      } catch (e) { out.failed[u] = [e.message]; log(`  ✗ ${u}  — ${e.message}`); }
      await sleep(delay); // polite: one request at a time
    }
  });
  writeJSON(path.join(dir, "competitors.json"), out);
  return { inspected: ok, failed: Object.keys(out.failed).length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = args();
  if (!a.slug) { console.error("need --slug"); process.exit(1); }
  const r = await scrape({ slug: a.slug, count: Number(a.count || 4), urls: a.urls ? String(a.urls).split(",") : [], delay: Number(a.delay || 2500), refresh: !!a.refresh });
  console.log(`${r.inspected} competitor pages inspected → research/${a.slug}/competitors.json`);
  if (r.inspected < 4) { console.error("Fewer than 4 pages inspected — add URLs/hosts before writing a brief."); process.exitCode = 2; }
}
