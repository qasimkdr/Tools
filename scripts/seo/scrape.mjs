#!/usr/bin/env node
// Inspect ≥4 competitor pages for one research id (tool slug or keyword slug). Free: Playwright + Chromium.
// Usage: node scripts/seo/scrape.mjs --slug <id> [--count 4] [--urls u1,u2,…] [--delay 2500]
// Input URLs: --urls, else research/<id>/serp.json (best result per competitor domain, in result order).
// Output: research/<id>/competitors.json — structure + metadata only (no full text is stored).
import path from "node:path";
import { args, dirFor, readJSON, writeJSON, sleep, isCompetitor, rootDomain } from "./lib.mjs";
import { inspect, withBrowser } from "./browser.mjs";

export async function scrape({ slug, count = 4, urls = [], delay = 2500, log = console.log }) {
  const dir = dirFor(slug);
  if (!urls.length) {
    const serp = readJSON(path.join(dir, "serp.json"), null);
    if (!serp) throw new Error(`No research/${slug}/serp.json — record search results first (seo:record) or pass --urls.`);
    const best = new Map();
    for (const s of Object.values(serp.keywords)) for (const o of s.organic) {
      const d = rootDomain(o.domain);
      if (isCompetitor(o.domain) && (!best.has(d) || o.rank < best.get(d).rank)) best.set(d, o);
    }
    urls = [...best.values()].sort((x, y) => x.rank - y.rank).map((o) => o.url); // all candidates; stop at `count` successes
  }
  const out = readJSON(path.join(dir, "competitors.json"), { pages: {} });
  out.failed ||= {};
  let ok = Object.keys(out.pages).length;
  await withBrowser(async (browser) => {
    for (const u of urls) {
      if (ok >= count) break;
      if (out.pages[u]) continue; // cached
      try {
        const d = await inspect(browser, u);
        out.pages[u] = d; delete out.failed[u]; ok++;
        log(`  ✓ ${u}  (words ${d.wordCount}, H2 ${d.h2.length}, FAQs ${d.faqs.length})`);
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
  const r = await scrape({ slug: a.slug, count: Number(a.count || 4), urls: a.urls ? String(a.urls).split(",") : [], delay: Number(a.delay || 2500) });
  console.log(`${r.inspected} competitor pages inspected → research/${a.slug}/competitors.json`);
  if (r.inspected < 4) { console.error("Fewer than 4 pages inspected — add URLs/hosts before writing a brief."); process.exitCode = 2; }
}
