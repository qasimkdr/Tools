#!/usr/bin/env node
// Score OUR built pages with the same rubric used for competitors (report.mjs score()), and compare per tool.
// Usage: serve out/ on :4173, then `node scripts/seo/self-score.mjs [--slugs a,b]` → research/SELF-SCORE.md
import fs from "node:fs";
import path from "node:path";
import { withBrowser, inspect } from "./browser.mjs";
import { score } from "./report.mjs";
import { args, readJSON, ROOT } from "./lib.mjs";

const a = args(process.argv.slice(2));
const reg = fs.readFileSync(path.join(ROOT, "src/tools/registry.ts"), "utf8");
let slugs = [...reg.matchAll(/from "\.\/([^/]+)\/meta"/g)].map((m) => m[1]);
if (a.slugs) slugs = String(a.slugs).split(",");
const total = (s) => Object.values(s).reduce((t, v) => t + (v ?? 0), 0);
const maxOf = (s) => (s.functionality == null ? 25 : 30); // JS-rendered pages: functionality n/a, scored /25 (same as competitors)
const rows = [];
await withBrowser(async (browser) => {
  for (const slug of slugs) {
    const meta = fs.readFileSync(path.join(ROOT, `src/tools/${slug}/meta.ts`), "utf8");
    const kw = meta.match(/primaryKw: "(.*?)"/)?.[1] ?? "";
    let mine;
    try { mine = score(await inspect(browser, `http://localhost:4173/${slug}/`, { keyword: kw })); } catch (e) { rows.push({ slug, err: e.message }); continue; }
    const comp = readJSON(path.join(ROOT, `research/${slug}/competitors.json`), { pages: {} });
    const theirs = Object.values(comp.pages).map((p) => { const s = score(p); const js = s.functionality == null; return { domain: p.domain, total: total(s), max: js ? 25 : 30, pct: total(s) / (js ? 25 : 30) }; });
    const best = theirs.sort((x, y) => y.pct - x.pct)[0];
    rows.push({ slug, mine, mineTotal: total(mine), mineMax: maxOf(mine), best, n: theirs.length });
    console.log(`${slug}: ours ${total(mine)}/${maxOf(mine)}` + (best ? ` · best competitor ${best.domain} ${best.total}/${best.max}` : " · no competitor data"));
  }
});
const L = ["# Self-score vs competitors", "", `Generated ${new Date().toISOString().slice(0, 10)} with the same rule-based rubric as research reports (report.mjs score()).`, "Rule-based on-page signals only — not rankings.", "",
  "| Tool | Ours | C | F | UX | T | L | S | Best competitor | Their score | Result |", "|---|---|---|---|---|---|---|---|---|---|---|"];
for (const r of rows) {
  if (r.err) { L.push(`| ${r.slug} | error: ${r.err} |||||||||| `); continue; }
  const m = r.mine, res = !r.best ? "no data" : r.mineTotal / r.mineMax > r.best.pct + 1e-9 ? "ahead" : r.mineTotal / r.mineMax >= r.best.pct - 1e-9 ? "tied" : "behind";
  L.push(`| ${r.slug} | **${r.mineTotal}/${r.mineMax}** | ${m.content} | ${m.functionality} | ${m.ux} | ${m.trust} | ${m.linking} | ${m.schema} | ${r.best?.domain ?? "—"} | ${r.best ? `${r.best.total}/${r.best.max}` : "—"} | ${res} |`);
}
fs.writeFileSync(path.join(ROOT, "research/SELF-SCORE.md"), L.join("\n") + "\n");
