#!/usr/bin/env node
// Competitor comparison report (Markdown) from research/<id>/serp.json + competitors.json.
// Usage: node scripts/seo/report.mjs --slug <id>     → research/<id>/report.md
// Data only; strategy/brief decisions are written by the agent (docs/research/<slug>.md for tool pages).
import fs from "node:fs";
import path from "node:path";
import { args, dirFor, readJSON } from "./lib.mjs";

const esc = (s) => String(s ?? "—").replace(/\|/g, "\\|").replace(/\n/g, " ");

export function report({ slug }) {
  const dir = dirFor(slug);
  const serp = readJSON(path.join(dir, "serp.json"), null) || { name: slug, keywords: {}, topCompetitors: [], keywordSource: "—", missing: true };
  const comp = readJSON(path.join(dir, "competitors.json"), { pages: {} });
  const pages = Object.values(comp.pages);
  const kwEntries = Object.entries(serp.keywords);
  const free = kwEntries.some(([, s]) => s.provider === "agent-websearch");
  const L = [];

  L.push(`# Competitor report: ${serp.name}`, "",
    `- Research id: \`${slug}\` · generated ${new Date().toISOString().slice(0, 10)}`,
    `- Search results: ${serp.missing ? "none recorded" : free ? "web-search tool (free mode) — # is result order, not a verified Google rank" : "DataForSEO Google US"}`,
    `- Volumes/KD: ${serp.keywordSource} (Semrush file). Pages inspected: ${pages.length}. Nothing here is estimated.`, "");

  if (kwEntries.length) {
    L.push("## Keywords", "", "| Keyword | Volume (file) | KD (file) | Results recorded | Fetched |", "|---|---|---|---|---|");
    for (const [kw, s] of kwEntries) L.push(`| ${esc(kw)} | ${s.fileVolume ?? "—"} | ${s.fileKd ?? "—"} | ${s.organic.length} | ${s.fetchedAt.slice(0, 10)} |`);
    for (const [kw, s] of kwEntries) {
      L.push("", `### Results — "${kw}"`, "", "| # | Domain | Title |", "|---|---|---|");
      for (const o of s.organic) L.push(`| ${o.rank} | ${esc(o.domain)} | [${esc(o.title)}](${o.url}) |`);
    }
    L.push("", "## Competitor domains", "", "| Domain | Best position | Appears for # keywords |", "|---|---|---|");
    for (const c of serp.topCompetitors) L.push(`| ${c.domain} | ${c.bestRank} | ${c.keywords} |`);
    const paa = [...new Set(kwEntries.flatMap(([, s]) => s.peopleAlsoAsk))];
    if (paa.length) L.push("", "## People Also Ask", "", ...paa.map((q) => `- ${q}`));
  }

  L.push("", `## Page comparison (${pages.length} inspected)`, "",
    "| Page | Title (chars) | Meta description (chars) | H1 | H2/H3 | Words | FAQs | Tables/Lists | Inputs | Content links int/ext | Schema |",
    "|---|---|---|---|---|---|---|---|---|---|---|");
  for (const p of pages) L.push(`| [${p.domain}](${p.url}) | ${esc(p.title)} (${p.title?.length ?? 0}) | ${esc(p.metaDescription)} (${p.metaDescription?.length ?? 0}) | ${esc(p.h1?.[0])} | ${p.h2.length}/${p.h3.length} | ${p.wordCount ?? "—"} | ${p.faqs.length} | ${p.tables ?? "—"}/${p.lists ?? "—"} | ${p.calculatorInputs?.length ?? "—"} | ${p.links.contentInternal ?? p.links.internal ?? "—"}/${p.links.contentExternal ?? p.links.external ?? "—"} | ${esc(p.schemaTypes?.join(", "))} |`);
  const failed = Object.entries(comp.failed || {});
  if (failed.length) { L.push("", "**Not inspected:**"); for (const [u, e] of failed) L.push(`- ${u} — ${e.join("; ")}`); }

  // Important topics: body-text terms weighted across pages; "shared" = used by ≥2 competitors → expected coverage.
  const topicPages = new Map();
  for (const p of pages) for (const t of p.topics || []) {
    const e = topicPages.get(t.term) || { term: t.term, pages: 0, weight: 0 }; e.pages++; e.weight += t.weight; topicPages.set(t.term, e);
  }
  const shared = [...topicPages.values()].filter((t) => t.pages >= 2).sort((x, y) => y.pages - x.pages || y.weight - x.weight).slice(0, 30);
  const unique = [...topicPages.values()].filter((t) => t.pages === 1).sort((x, y) => y.weight - x.weight).slice(0, 20);
  L.push("", "## Important topics", "", "**Shared by ≥2 competitors (expected coverage):** " + (shared.length ? shared.map((t) => `\`${t.term}\`×${t.pages}`).join(" · ") : "—"),
    "", "**Covered by only one competitor (differentiation ideas):** " + (unique.length ? unique.map((t) => `\`${t.term}\``).join(" · ") : "—"));

  const faqs = [...new Set(pages.flatMap((p) => p.faqs))];
  L.push("", "## Questions competitors answer (FAQ candidates — rewrite in our own words)", "", ...(faqs.length ? faqs.slice(0, 40).map((q) => `- ${q}`) : ["- (none found)"]));

  L.push("", "## Article structure per competitor");
  for (const p of pages) {
    L.push("", `### ${p.domain} — ${esc(p.title)}`, "");
    const outline = p.outline?.length ? p.outline : [...(p.h1 || []).map((t) => ({ level: 1, text: t })), ...p.h2.map((t) => ({ level: 2, text: t }))];
    for (const h of outline.slice(0, 50)) L.push(`${"  ".repeat(Math.max(0, h.level - 1))}- H${h.level}: ${esc(h.text)}`);
    if (p.calculatorInputs?.length) L.push(`- _Inputs:_ ${p.calculatorInputs.map(esc).join(", ")}`);
    if (p.links.externalSample?.length) L.push(`- _Sources cited:_ ${[...new Set(p.links.externalSample.map((u) => new URL(u).hostname))].slice(0, 8).join(", ")}`);
  }

  const words = pages.map((p) => p.wordCount).filter(Boolean).sort((x, y) => x - y);
  L.push("", "## Brief starters", "",
    `- Competitor length range: ${words.length ? `${words[0]}–${words.at(-1)} words (median ${words[Math.floor(words.length / 2)]})` : "—"}. Match the intent; don't pad.`,
    "- Cover every shared topic above; use the single-competitor topics + missing inputs/tables/examples as differentiators.",
    "- Gaps: list ≥5 concrete things no inspected page offers before writing.");

  const outFile = path.join(dir, "report.md");
  fs.writeFileSync(outFile, L.join("\n") + "\n");
  return { file: path.relative(process.cwd(), outFile), pages: pages.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = args();
  if (!a.slug) { console.error("need --slug"); process.exit(1); }
  const r = report({ slug: a.slug });
  console.log(`Report → ${r.file} (${r.pages} pages)`);
}
