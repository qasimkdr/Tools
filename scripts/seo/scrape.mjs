#!/usr/bin/env node
// Step 4–5: inspect ≥4 competitor pages and extract structure. Never stores full page text (no copying) — only
// structure, short metadata and counts needed for gap analysis.
// Usage: node scripts/seo/scrape.mjs --slug concrete-calculator [--count 4] [--method auto|playwright|dataforseo] [--urls u1,u2]
// Order of methods (auto): Playwright direct (if robots.txt allows and host reachable) → DataForSEO On-Page instant_pages.
import path from "node:path";
import { args, dirFor, dfs, readJSON, writeJSON, sleep, isCompetitor } from "./lib.mjs";

const a = args();
if (!a.slug) { console.error("need --slug"); process.exit(1); }
const dir = dirFor(a.slug);
const serp = readJSON(path.join(dir, "serp.json"), null);
const count = Number(a.count || 4);
const UA = "Mozilla/5.0 (compatible; SEOResearchBot/1.0; manual competitive research)";

// Pick URLs: explicit --urls, else best-ranked organic URL per domain across our keywords (one page per domain).
let urls = a.urls ? String(a.urls).split(",") : [];
if (!urls.length) {
  if (!serp) { console.error("Run serp.mjs first (or pass --urls)."); process.exit(1); }
  const best = new Map();
  for (const s of Object.values(serp.keywords)) for (const o of s.organic)
    if (isCompetitor(o.domain) && (!best.has(o.domain) || o.rank < best.get(o.domain).rank)) best.set(o.domain, o);
  urls = [...best.values()].sort((x, y) => x.rank - y.rank).slice(0, count + 2).map((o) => o.url); // +2 spares if some fail
}

async function robotsAllows(u) {
  try {
    const { origin, pathname } = new URL(u);
    const r = await fetch(`${origin}/robots.txt`, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(8000) });
    if (!r.ok) return true;
    let applies = false; const dis = [];
    for (const line of (await r.text()).split("\n")) {
      const [k, ...v] = line.split(":"); const val = v.join(":").trim();
      if (/^user-agent$/i.test(k.trim())) applies = val === "*";
      else if (applies && /^disallow$/i.test(k.trim()) && val) dis.push(val);
    }
    return !dis.some((d) => pathname.startsWith(d.replace(/\*.*$/, "")));
  } catch (e) { throw new Error(`unreachable (${e.cause?.code || e.message})`); }
}

let browser;
async function viaPlaywright(u) {
  if (!(await robotsAllows(u))) throw new Error("disallowed by robots.txt");
  const { chromium } = await import("playwright");
  browser ||= await chromium.launch();
  const page = await browser.newPage({ userAgent: UA, viewport: { width: 1366, height: 900 } });
  try {
    await page.goto(u, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1500); // let calculators hydrate
    return await page.evaluate(() => {
      const host = location.hostname.replace(/^www\./, "");
      const txt = (el) => el.textContent.replace(/\s+/g, " ").trim();
      const hs = (t) => [...document.querySelectorAll(t)].map(txt).filter(Boolean).slice(0, 40);
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => { try { const j = JSON.parse(s.textContent); return Array.isArray(j) ? j : j["@graph"] || [j]; } catch { return []; } });
      const faqLd = ld.filter((x) => x["@type"] === "FAQPage").flatMap((x) => (x.mainEntity || []).map((q) => q.name));
      const qHeads = [...document.querySelectorAll("h2,h3,h4,summary,dt")].map(txt).filter((t) => t.endsWith("?") && t.length < 160);
      const links = [...document.querySelectorAll("main a[href], article a[href], body a[href]")].map((a) => a.href).filter((h) => h.startsWith("http"));
      const internal = links.filter((h) => new URL(h).hostname.replace(/^www\./, "") === host);
      const external = links.filter((h) => new URL(h).hostname.replace(/^www\./, "") !== host);
      const main = document.querySelector("main, article, [role=main]") || document.body;
      const inputs = [...document.querySelectorAll("input:not([type=hidden]), select")].map((el) => {
        const id = el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
        return (id && txt(id)) || el.getAttribute("aria-label") || el.getAttribute("placeholder") || el.name || el.type;
      }).filter(Boolean).slice(0, 30);
      return {
        title: document.title, metaDescription: document.querySelector('meta[name="description"]')?.content || null,
        canonical: document.querySelector('link[rel="canonical"]')?.href || null,
        h1: hs("h1"), h2: hs("h2"), h3: hs("h3"),
        wordCount: txt(main).split(" ").length,
        faqs: [...new Set([...faqLd, ...qHeads])].slice(0, 25),
        schemaTypes: [...new Set(ld.map((x) => x["@type"]).flat().filter(Boolean))],
        tables: main.querySelectorAll("table").length, images: main.querySelectorAll("img").length,
        calculatorInputs: inputs,
        links: { internal: new Set(internal).size, external: new Set(external).size, externalSample: [...new Set(external)].slice(0, 15), internalSample: [...new Set(internal)].slice(0, 25) },
      };
    });
  } finally { await page.close(); }
}

async function viaDataForSEO(u) {
  const { result } = await dfs("on_page/instant_pages", [{ url: u, enable_javascript: true }]);
  const it = result?.[0]?.items?.[0];
  if (!it) throw new Error("no instant_pages result");
  const m = it.meta || {};
  return {
    title: m.title ?? null, metaDescription: m.description ?? null, canonical: m.canonical ?? null,
    h1: m.htags?.h1 || [], h2: m.htags?.h2 || [], h3: m.htags?.h3 || [],
    wordCount: m.content?.plain_text_word_count ?? null,
    faqs: [...(m.htags?.h2 || []), ...(m.htags?.h3 || [])].filter((t) => t.trim().endsWith("?")),
    schemaTypes: null, tables: null, images: m.images_count ?? null, calculatorInputs: null,
    links: { internal: m.internal_links_count ?? null, external: m.external_links_count ?? null },
    note: "DataForSEO instant_pages: FAQ = question headings only; schema/inputs not available via this method.",
  };
}

const out = readJSON(path.join(dir, "competitors.json"), { pages: {} });
let ok = 0;
for (const u of urls) {
  if (ok >= count && !a.urls) break;
  const methods = a.method === "playwright" ? [viaPlaywright] : a.method === "dataforseo" ? [viaDataForSEO] : [viaPlaywright, viaDataForSEO];
  const errors = [];
  for (const m of methods) {
    try {
      const data = await m(u);
      out.pages[u] = { url: u, domain: new URL(u).hostname, method: m.name, fetchedAt: new Date().toISOString(), ...data };
      console.log(`✓ ${m.name.padEnd(13)} ${u}  (H2:${data.h2.length} words:${data.wordCount ?? "?"} faqs:${data.faqs.length})`);
      ok++; break;
    } catch (e) { errors.push(`${m.name}: ${e.message}`); }
  }
  if (!out.pages[u]) { out.failed = { ...(out.failed || {}), [u]: errors }; console.log(`✗ ${u}\n    ${errors.join("\n    ")}`); }
  await sleep(2500); // polite rate limit
}
await browser?.close();
writeJSON(path.join(dir, "competitors.json"), out);
console.log(`\n${ok} competitor pages inspected → ${path.relative(process.cwd(), path.join(dir, "competitors.json"))}`);
if (ok < Math.min(4, count)) { console.error("Fewer than 4 pages inspected — do not write the brief yet; fix access or pass --urls."); process.exitCode = 2; }
