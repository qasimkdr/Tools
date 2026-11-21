// Shared helpers for the SEO research pipeline (docs/07-SEO-RESEARCH-PIPELINE.md). Node 22, no extra deps.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const RESEARCH_DIR = path.join(ROOT, "data/research");

export function args() {
  const out = {};
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (!a[i].startsWith("--")) continue;
    const k = a[i].slice(2);
    out[k] = a[i + 1] && !a[i + 1].startsWith("--") ? a[++i] : true;
  }
  return out;
}

export const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/['()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const dirFor = (slug) => { const d = path.join(RESEARCH_DIR, slug); fs.mkdirSync(d, { recursive: true }); return d; };
export const readJSON = (p, fallback) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : fallback);
export const writeJSON = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 1));

/** Minimal RFC-4180 CSV parser (handles quotes, commas, CRLF; Semrush uses comma or semicolon). */
export function parseCSV(text) {
  const delim = (text.split("\n")[0].match(/;/g) || []).length > (text.split("\n")[0].match(/,/g) || []).length ? ";" : ",";
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; continue; }
    if (c === '"') q = true; else if (c === delim) { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cur); rows.push(row); row = []; cur = ""; }
    else cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.some((x) => x.trim()));
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
}

/**
 * Keyword source. Priority: --csv <Semrush export> (columns Keyword, Volume, Keyword Difficulty, CPC, Intent)
 * → data/roadmap.json page by --slug. Volumes/KD come ONLY from these files (never invented).
 */
export function loadKeywords({ slug, csv, max = 3 }) {
  if (csv) {
    const rows = parseCSV(fs.readFileSync(path.resolve(csv), "utf8"));
    const kws = rows.map((r) => ({
      kw: r.Keyword || r.keyword, vol: Number(r.Volume || r["Search Volume"] || 0),
      kd: r["Keyword Difficulty"] ?? r["KD%"] ?? r.KD ?? null, intent: r.Intent ?? null,
    })).filter((k) => k.kw).sort((a, b) => b.vol - a.vol);
    return { name: slug || slugify(kws[0].kw), keywords: kws.slice(0, max), source: path.basename(csv) };
  }
  const page = readJSON(path.join(ROOT, "data/roadmap.json"), { pages: [] }).pages.find((p) => p.slug === slug);
  if (!page) throw new Error(`No roadmap page with slug "${slug}". Use --csv or check data/ROADMAP.md`);
  const seen = new Set([page.primaryKw]);
  const kws = [{ kw: page.primaryKw, vol: page.primaryVol, kd: page.primaryKd, intent: null }];
  for (const k of page.keywords) {
    if (kws.length >= max) break;
    if (seen.has(k.kw)) continue;
    seen.add(k.kw); kws.push({ kw: k.kw, vol: k.vol, kd: k.kd, intent: k.intent });
  }
  return { name: page.name, keywords: kws, competitorsFromFile: page.competitors, source: "data/roadmap.json" };
}

/**
 * DataForSEO client. Credentials: DATAFORSEO_LOGIN/DATAFORSEO_PASSWORD env vars, OR (cloud sessions) the network
 * proxy injects the saved credential — then a dummy Basic header is sent and replaced in transit.
 */
export async function dfs(endpoint, body) {
  const login = process.env.DATAFORSEO_LOGIN || "proxy", pass = process.env.DATAFORSEO_PASSWORD || "proxy";
  const res = await fetch(`https://api.dataforseo.com/v3/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${Buffer.from(`${login}:${pass}`).toString("base64")}` },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { throw new Error(`DataForSEO ${endpoint}: HTTP ${res.status} ${text.slice(0, 200)}`); }
  if (!res.ok || json.status_code !== 20000) throw new Error(`DataForSEO ${endpoint}: ${json.status_code} ${json.status_message}`);
  const task = json.tasks?.[0];
  if (!task || task.status_code !== 20000) throw new Error(`DataForSEO ${endpoint} task: ${task?.status_code} ${task?.status_message}`);
  return { result: task.result, cost: json.cost };
}

/** Our own site + low-value result types never count as competitors. */
export const SKIP_DOMAINS = [/solvepilot\./, /youtube\.com$/, /reddit\.com$/, /quora\.com$/, /pinterest\./, /facebook\.com$/, /tiktok\.com$/, /instagram\.com$/, /x\.com$/, /twitter\.com$/];
export const isCompetitor = (domain) => !SKIP_DOMAINS.some((r) => r.test(domain));

/** Group subdomains (www., es., cache.) under one competitor: "es.symbolab.com" → "symbolab.com". Handles co.uk-style TLDs. */
export const rootDomain = (host) => {
  const parts = host.toLowerCase().split(".");
  const n = /^(co|com|org|net|gov|ac)\.[a-z]{2}$/.test(parts.slice(-2).join(".")) ? 3 : 2;
  return parts.slice(-n).join(".");
};
