#!/usr/bin/env node
// Step 6–7: competitor comparison report + content-brief scaffold from serp.json + competitors.json.
// Usage: node scripts/seo/report.mjs --slug concrete-calculator
// Output: docs/research/<slug>.report.md (data-only, regenerated). The agent then writes the human brief/decisions
// in docs/research/<slug>.md (from _TEMPLATE.md) — strategy is never auto-generated.
import fs from "node:fs";
import path from "node:path";
import { args, ROOT, dirFor, readJSON } from "./lib.mjs";

const a = args();
const dir = dirFor(a.slug);
const serp = readJSON(path.join(dir, "serp.json"), null) || { name: a.slug, keywords: {}, topCompetitors: [], keywordSource: "—", missing: true };
const comp = readJSON(path.join(dir, "competitors.json"), { pages: {} });
if (serp.missing) console.warn("No serp.json (DataForSEO not configured): report covers inspected pages only — rankings/PAA NOT included.");
const pages = Object.values(comp.pages);
const esc = (s) => String(s ?? "—").replace(/\|/g, "\\|").replace(/\n/g, " ");
const L = [];

L.push(`# Competitor report: ${serp.name} (\`${a.slug}\`)`, "",
  `Generated ${new Date().toISOString().slice(0, 10)} from live data. SERP source: DataForSEO, Google US, ${Object.values(serp.keywords)[0]?.device ?? "n/a"}. ` +
  `Volumes/KD: ${serp.keywordSource} (Semrush). Nothing in this file is estimated.`, "");

if (serp.missing) L.push("> ⚠️ No live SERP data (DataForSEO not configured). Competitor URLs came from the Semrush file/--urls; ranks and People Also Ask are not included.", "");
L.push("## Keywords & SERP features", "", "| Keyword | Volume (file) | KD (file) | Features | Featured snippet |", "|---|---|---|---|---|");
for (const [kw, s] of Object.entries(serp.keywords)) L.push(`| ${esc(kw)} | ${s.fileVolume ?? "—"} | ${s.fileKd ?? "—"} | ${esc(s.features.join(", "))} | ${esc(s.featuredSnippet)} |`);

for (const [kw, s] of Object.entries(serp.keywords)) {
  L.push("", `### Top 10 — "${kw}" (fetched ${s.fetchedAt.slice(0, 10)})`, "", "| # | Domain | Title |", "|---|---|---|");
  for (const o of s.organic) L.push(`| ${o.rank} | ${esc(o.domain)} | [${esc(o.title)}](${o.url}) |`);
}

L.push("", "## Top competitors (aggregated)", "", "| Domain | Best rank | # of our keywords |", "|---|---|---|");
for (const c of serp.topCompetitors) L.push(`| ${c.domain} | ${c.bestRank} | ${c.keywords} |`);

const paa = [...new Set(Object.values(serp.keywords).flatMap((s) => s.peopleAlsoAsk))];
const related = [...new Set(Object.values(serp.keywords).flatMap((s) => s.relatedSearches))];
L.push("", "## People Also Ask (→ FAQ / H2 candidates)", "", ...(paa.length ? paa.map((q) => `- ${q}`) : ["- (none shown)"]));
L.push("", "## Related searches", "", ...(related.length ? related.map((q) => `- ${q}`) : ["- (none shown)"]));

L.push("", `## Page comparison (${pages.length} inspected)`, "",
  "| Page | Method | Title (len) | Meta desc (len) | H1 | H2/H3 | Words | FAQs | Tables | Inputs | Links int/ext | Schema |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|");
for (const p of pages) L.push(`| [${p.domain}](${p.url}) | ${p.method} | ${esc(p.title)} (${p.title?.length ?? 0}) | ${esc(p.metaDescription)} (${p.metaDescription?.length ?? 0}) | ${esc(p.h1?.[0])} | ${p.h2.length}/${p.h3.length} | ${p.wordCount ?? "—"} | ${p.faqs.length} | ${p.tables ?? "—"} | ${p.calculatorInputs?.length ?? "—"} | ${p.links.internal ?? "—"}/${p.links.external ?? "—"} | ${esc(p.schemaTypes?.join(", "))} |`);
if (comp.failed) { L.push("", "**Could not inspect:**"); for (const [u, e] of Object.entries(comp.failed)) L.push(`- ${u} — ${e.join("; ")}`); }

// Topic coverage: which heading terms appear across competitors (signals expected subtopics).
const STOP = new Set("the a an of to in for and or is are how what your you with on by from this that it at be as can do does calculator calculate".split(" "));
const termsOf = (p) => new Set([...p.h2, ...p.h3].join(" ").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
const freq = new Map();
for (const p of pages) for (const t of termsOf(p)) freq.set(t, (freq.get(t) || 0) + 1);
const common = [...freq].filter(([, n]) => n >= 2).sort((x, y) => y[1] - x[1]).slice(0, 40);
L.push("", "## Topic coverage (heading terms used by ≥2 competitors)", "", common.length ? common.map(([t, n]) => `\`${t}\`×${n}`).join(" · ") : "(not enough data)");

L.push("", "## Heading outlines");
for (const p of pages) {
  L.push("", `### ${p.domain}`, `- **H1:** ${esc(p.h1?.join(" / "))}`);
  for (const h of p.h2.slice(0, 25)) L.push(`- H2: ${esc(h)}`);
  if (p.h3.length) L.push(`- H3 (first 15): ${p.h3.slice(0, 15).map(esc).join(" · ")}`);
  if (p.calculatorInputs?.length) L.push(`- Inputs: ${p.calculatorInputs.map(esc).join(", ")}`);
  if (p.faqs.length) L.push(`- FAQs: ${p.faqs.slice(0, 12).map(esc).join(" · ")}`);
  if (p.links.externalSample?.length) L.push(`- External sources cited: ${p.links.externalSample.slice(0, 8).map((u) => new URL(u).hostname).join(", ")}`);
}

const words = pages.map((p) => p.wordCount).filter(Boolean).sort((x, y) => x - y);
const median = words.length ? words[Math.floor(words.length / 2)] : null;
L.push("", "## Brief scaffold (agent completes in docs/research/" + a.slug + ".md)", "",
  `- Median competitor length: ${median ?? "—"} words → write what the intent needs; do not pad to match.`,
  `- Must-cover subtopics: terms above with ×${Math.max(2, Math.ceil(pages.length / 2))}+ coverage.`,
  `- FAQ candidates: People Also Ask list + competitor FAQs not yet answered.`,
  `- Featured snippet format: ${Object.values(serp.keywords).some((s) => s.featuredSnippet) ? "present — answer in a 40–55 word paragraph/list right under the H1/H2" : "none observed"}.`,
  "- Gaps to exploit: write ≥5 concrete items (inputs, outputs, edge cases, tables, explanations, UX) that NO inspected page covers.");

const outFile = path.join(ROOT, "docs/research", `${a.slug}.report.md`);
fs.writeFileSync(outFile, L.join("\n") + "\n");
console.log(`Report → ${path.relative(ROOT, outFile)}  (${pages.length} pages, ${paa.length} PAA questions)`);
