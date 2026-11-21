#!/usr/bin/env node
// Competitor analysis report (Markdown) from research/<id>/serp.json + competitors.json.
// Usage: node scripts/seo/report.mjs --slug <id>     → research/<id>/report.md
// Scores are rule-based (rubric printed in every report and in docs/07-SEO-RESEARCH-PIPELINE.md) — signals, not verdicts.
import fs from "node:fs";
import path from "node:path";
import { args, dirFor, readJSON, ROOT } from "./lib.mjs";

const jsRendered = (p) => /JS-rendered/.test(p.pageType || "");
// Features that make no sense for a category are never suggested as gaps.
const IRRELEVANT = {
  finance: ["Unit toggle (metric/imperial)"], "time-date": ["Unit toggle (metric/imperial)", "Cost / price estimate"],
  education: ["Unit toggle (metric/imperial)", "Cost / price estimate"], health: ["Cost / price estimate"],
  math: ["Cost / price estimate"], text: ["Unit toggle (metric/imperial)", "Cost / price estimate", "Chart / graph"],
};

const esc = (s) => String(s ?? "—").replace(/\|/g, "\\|").replace(/\n/g, " ");
const yes = (b) => (b ? "✓" : "·");
const clamp = (n) => Math.max(0, Math.min(5, n));
const day = (iso) => (iso ? String(iso).slice(0, 10) : "—");

export function score(p) {
  const c = p.content || {}, x = p.ux || {}, e = p.eeat || {}, l = p.links || {}, t = p.schemaTypes || [];
  const n = (p.calculatorInputs || []).length;
  const anchors = l.internalAnchors || [];
  return {
    content: clamp((p.wordCount >= 600) + !!c.formula + !!c.examples + ((p.tables || 0) + (p.lists || 0) >= 3) + ((p.faqs || []).length >= 4)),
    functionality: jsRendered(p) ? null : n === 0 ? 0 : clamp((n >= 2) + (n >= 6) + !!p.unitToggle + Object.values(p.actions || {}).some(Boolean) + !!(c.costEstimate || c.chart)),
    ux: clamp(5 - (x.adNetworks?.length ? 1 : 0) - ((x.adSlots || 0) >= 4 ? 1 : 0) - (!jsRendered(p) && (p.wordsBeforeTool ?? 0) > 150 ? 1 : 0) - ((x.htmlKB || 0) > 500 ? 1 : 0) - (x.viewport === false ? 1 : 0)),
    trust: clamp(!!e.author + !!e.modified + ((e.authoritativeSources || []).length > 0) + ((p.avgSentenceWords ?? 99) <= 20) + !!p.canonical),
    linking: clamp(((l.contentInternal || 0) >= 3) + ((l.contentInternal || 0) >= 10) + !!x.breadcrumbs + (anchors.length && anchors.reduce((s, a) => s + a.length, 0) / anchors.length >= 12 ? 1 : 0) + (anchors.filter((a) => /calculator|converter|tool/i.test(a)).length >= 3)),
    schema: t.length === 0 ? 0 : clamp(2 + t.includes("BreadcrumbList") + t.includes("FAQPage") + t.some((y) => /WebApplication|SoftwareApplication/.test(y))),
  };
}

const FEATURES = [
  ["Calculator / interactive tool", (p) => (p.calculatorInputs || []).length >= 2 || /^tool|answer page \+ tool/.test(p.pageType || "")],
  ["Unit toggle (metric/imperial)", (p) => !!p.unitToggle],
  ["Print", (p) => !!p.actions?.print], ["Share / copy", (p) => !!(p.actions?.share || p.actions?.copy)],
  ["Download / export", (p) => !!p.actions?.download],
  ["Cost / price estimate", (p) => !!p.content?.costEstimate], ["Formula shown", (p) => !!p.content?.formula],
  ["Worked examples", (p) => !!p.content?.examples], ["Step-by-step", (p) => !!p.content?.stepByStep],
  ["Table", (p) => (p.tables || 0) > 0], ["Chart / graph", (p) => !!p.content?.chart],
  ["Tips / mistakes", (p) => !!p.content?.tips],
  ["FAQ section (≥4)", (p) => (p.faqs || []).length >= 4], ["FAQ schema", (p) => (p.schemaTypes || []).includes("FAQPage")],
  ["Named author", (p) => !!p.eeat?.author], ["Updated date", (p) => !!p.eeat?.modified],
  ["Authoritative sources (.gov/.edu/…)", (p) => (p.eeat?.authoritativeSources || []).length > 0],
  ["Breadcrumbs", (p) => !!p.ux?.breadcrumbs], ["Video", (p) => (p.videos || 0) > 0],
];

function intentOf(keyword, pages, results) {
  const k = keyword.toLowerCase();
  const mods = [];
  if (/calculator|converter|generator|estimator|solver|counter|checker/.test(k)) mods.push("tool modifier");
  if (/^(how|what|why|when|which|is|can|does)\b/.test(k)) mods.push("question");
  if (/\b\d+\s*(days?|weeks?|months?|years?)\b.*\b(from|ago|until)\b/.test(k)) mods.push("instant answer (date)");
  if (/\bvs\b|best|compare/.test(k)) mods.push("comparison");
  const types = pages.map((p) => p.pageType);
  const mix = Object.entries(types.reduce((m, t) => ((m[t] = (m[t] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]);
  const toolTitles = results.filter((r) => /calculator|converter|generator|estimator|tool/i.test(r.title || "")).length;
  const dominant = mix[0]?.[0] || "unknown";
  const toolish = types.filter((t) => /tool/.test(t)).length;
  const toolShare = results.length ? toolTitles / results.length : 0;
  const bias = results.length && toolShare < 0.35 && toolish >= Math.ceil(pages.length / 2)
    ? `Sample bias: ${toolTitles}/${results.length} open results are tools, but the inspected (accessible) pages are mostly calculators. The guide-style results (${[...new Set(results.filter((r) => !/calculator|converter|tool/i.test(r.title || "")).map((r) => r.domain.replace(/^www\./, "")))].slice(0, 5).join(", ")}) couldn't be inspected, so their structure isn't in this report.`
    : null;
  if (mods.includes("question") && toolShare < 0.35) return { mods, mix, toolTitles, dominant, bias,
    verdict: "Informational: a guide that answers the question in the first lines (snippet-ready), with an embedded calculator and worked examples" };
  const verdict = toolish >= Math.ceil(pages.length / 2) || toolTitles >= results.length / 2
    ? (pages.some((p) => p.pageType === "tool + guide") ? "Transactional/utility: a working tool first, backed by an explanatory guide" : "Transactional/utility: tool first, short supporting content")
    : types.some((t) => /answer/.test(t)) ? "Quick answer: state the answer in the first line, then the tool for other values"
    : "Informational: a guide that answers the question directly, with an embedded calculator";
  return { mods, mix, toolTitles, dominant, verdict, bias };
}

export function report({ slug }) {
  const dir = dirFor(slug);
  const serp = readJSON(path.join(dir, "serp.json"), null) || { name: slug, keywords: {}, topCompetitors: [], keywordSource: "—", missing: true };
  const comp = readJSON(path.join(dir, "competitors.json"), { pages: {} });
  const pages = Object.values(comp.pages);
  const kwEntries = Object.entries(serp.keywords);
  const keyword = kwEntries.find(([, s]) => s.provider !== "agent-websearch-restricted")?.[0] || kwEntries[0]?.[0] || slug.replace(/-/g, " ");
  const results = kwEntries.filter(([, s]) => s.provider !== "agent-websearch-restricted").flatMap(([, s]) => s.organic);
  const L = [];

  L.push(`# Competitor analysis: "${keyword}"`, "",
    `- Research id: \`${slug}\` · roadmap page: ${serp.name} · report generated ${new Date().toISOString().slice(0, 10)}`,
    `- Pages inspected: **${pages.length}** (${[...new Set(pages.map((p) => p.mode))].join(", ") || "—"})`, "",
    "## Data sources (read before using any number)", "",
    "| Data | Source | Type | Date |", "|---|---|---|---|");
  for (const [kw, s] of kwEntries) {
    const src = { "agent-websearch": ["Built-in web search tool (Claude Code)", "**Web-search order — NOT a verified Google ranking**"], "agent-websearch-restricted": ["Built-in web search, limited to domains this environment can reach", "**Supplementary list — NOT the open result list, NOT a Google ranking**"] }[s.provider] || ["DataForSEO Google US", "Google organic rank (API)"];
    L.push(`| Result list for "${esc(kw)}" | ${src[0]} | ${src[1]} | ${day(s.fetchedAt)} |`);
    if (s.fileVolume != null) L.push(`| Volume ${s.fileVolume}, KD ${s.fileKd ?? "—"}${s.fileIntent ? `, intent ${s.fileIntent}` : ""} | Semrush export (data/source) | Third-party estimate | export date not recorded |`);
    if (s.semrushCompetitor) L.push(`| Competitor at Google #${s.semrushCompetitor.position ?? "?"}: ${esc(s.semrushCompetitor.url)} | Semrush export | **Google position as reported by Semrush** (historic) | export date not recorded |`);
  }
  for (let i = L.length - 1; i > 0; i--) if ((L[i].startsWith("| Volume") || L[i].startsWith("| Competitor at Google")) && L.indexOf(L[i]) !== i) L.splice(i, 1);
  L.push(`| Page structure & features | Our crawler (Playwright/Chromium) | Observed on the live page | ${[...new Set(pages.map((p) => day(p.fetchedAt)))].join(", ") || "—"} |`, "");

  // ── Search intent
  const intent = intentOf(keyword, pages, results);
  L.push("## 1. Search intent", "",
    `- Keyword signals: ${intent.mods.length ? intent.mods.join(", ") : "none (bare noun phrase)"}`,
    `- Page types inspected: ${intent.mix.map(([t, n]) => `${t} ×${n}`).join(", ") || "—"}`,
    `- Result titles that are tools: ${intent.toolTitles}/${results.length}`,
    `- **Format to build: ${intent.verdict}.**`, ...(intent.bias ? [`- ⚠️ ${intent.bias}`] : []), "");

  // ── Results list (clearly labelled)
  for (const [kw, s] of kwEntries) {
    L.push(`### Result list — "${kw}" (${s.provider === "agent-websearch" ? "web-search order, not Google rank" : s.provider === "agent-websearch-restricted" ? "supplementary, accessible domains only" : "Google rank"}; fetched ${day(s.fetchedAt)})`, "", "| # | Domain | Title | URL |", "|---|---|---|---|");
    for (const o of s.organic) L.push(`| ${o.rank} | ${esc(o.domain)} | ${esc(o.title)} | ${o.url} |`);
    L.push("");
  }

  // ── Scorecard
  const scored = pages.map((p) => ({ p, s: score(p) }));
  L.push("## 2. Competitor scorecard (0–5, rule-based)", "",
    "| Competitor | Type | Words | Content | Function | UX | Trust | Linking | Schema | Total /30 |", "|---|---|---|---|---|---|---|---|---|---|");
  const tot = (s) => Object.values(s).reduce((x, y) => x + (y ?? 0), 0) / Object.values(s).filter((y) => y != null).length;
  for (const { p, s } of scored.sort((a, b) => tot(b.s) - tot(a.s)))
    L.push(`| [${p.domain}](${p.url}) | ${p.pageType} | ${p.wordCount} | ${s.content} | ${s.functionality ?? "n/a"} | ${s.ux} | ${s.trust} | ${s.linking} | ${s.schema} | **${Object.values(s).reduce((x, y) => x + (y ?? 0), 0)}**${s.functionality == null ? " /25" : ""} |`);
  L.push("", "<details><summary>Scoring rubric</summary>", "",
    "- **Content**: ≥600 words · formula · worked examples · ≥3 tables/lists · ≥4 FAQs (1 pt each)",
    "- **Functionality**: ≥2 inputs · ≥6 inputs · unit toggle · print/share/copy/download · cost or chart (0 if no tool)",
    "- **UX**: starts at 5; −1 ad network present · −1 ≥4 ad slots · −1 >150 words before the tool · −1 HTML >500 KB · −1 no viewport",
    "- **Trust**: named author · updated date · authoritative sources · avg sentence ≤20 words · canonical",
    "- **Linking**: ≥3 in-content internal links · ≥10 · breadcrumbs · descriptive anchors (avg ≥12 chars) · ≥3 links to other tools",
    "- **Schema**: any relevant type = 2 · +BreadcrumbList · +FAQPage · +WebApplication/SoftwareApplication",
    "- JS-rendered tools (parsed with JS off) get Function = n/a and are scored /25; their tool position isn't judged.",
    "</details>", "");

  // ── Feature matrix + missing features
  L.push("## 3. Functionality & content features", "", `| Feature | ${pages.map((p) => p.domain.replace(/^www\./, "")).join(" | ")} |`, `|---|${pages.map(() => "---").join("|")}|`);
  const gaps = [], rare = [];
  const category = serp.category || readJSON(path.join(ROOT, "data/roadmap.json"), { pages: [] }).pages.find((x) => x.slug === (serp.page || slug))?.category;
  const skip = new Set(IRRELEVANT[category] || []);
  for (const [name, f] of FEATURES) {
    if (skip.has(name)) continue;
    const row = pages.map(f);
    L.push(`| ${name} | ${row.map(yes).join(" | ")} |`);
    if (pages.length && row.every((v) => !v)) gaps.push(name); else if (row.filter(Boolean).length === 1) rare.push(name);
  }
  L.push("", "**Missing everywhere (candidate opportunities; judge relevance):** " + (gaps.join(", ") || "none"), "", "**Only one competitor has:** " + (rare.join(", ") || "none"), "");
  L.push("Calculator inputs observed:");
  for (const p of pages) L.push(`- ${p.domain}: ${(p.calculatorInputs || []).length ? p.calculatorInputs.slice(0, 18).map(esc).join(", ") : "none detected"}${p.notes?.length && (p.calculatorInputs || []).length < 2 ? " _(JS off — may be under-counted)_" : ""}`);
  L.push("");

  // ── UX
  L.push("## 4. User experience", "", "| Competitor | Words before tool | Ad networks | Ad slots | HTML KB | Viewport | Avg sentence |", "|---|---|---|---|---|---|---|");
  for (const p of pages) L.push(`| ${p.domain} | ${jsRendered(p) ? "n/a (JS)" : p.wordsBeforeTool ?? "no tool"} | ${esc(p.ux?.adNetworks?.join(", ") || "none detected")} | ${p.ux?.adSlots ?? "—"} | ${p.ux?.htmlKB ?? "—"} | ${yes(p.ux?.viewport)} | ${p.avgSentenceWords ?? "—"} |`);
  L.push("");

  // ── Accuracy
  L.push("## 5. Accuracy review (manual)", "", "The crawler can't verify correctness. Check these competitor statements against primary sources before writing ours. They are quoted for fact-checking only; never reuse them as content.", "");
  for (const p of pages) if (p.claims?.length) { L.push(`**${p.domain}**`); for (const c of p.claims.slice(0, 6)) L.push(`- "${esc(c)}"`); L.push(""); }

  // ── Content structure & topics
  const topicPages = new Map();
  for (const p of pages) for (const t of p.topics || []) { const e = topicPages.get(t.term) || { term: t.term, pages: 0, weight: 0 }; e.pages++; e.weight += t.weight; topicPages.set(t.term, e); }
  const kwT = new Set([...keyword.toLowerCase().split(/[^a-z0-9]+/), "calculator", "calculators", "calculate", "converter", "it's", "find", "add", "unit", "number", "value", "result", "results", "enter", "example", "click"]);
  for (const k of [...topicPages.keys()]) if (k.split(" ").every((w) => kwT.has(w) || kwT.has(w.replace(/s$/, "")))) topicPages.delete(k);
  const shared = [...topicPages.values()].filter((t) => t.pages >= 2).sort((a, b) => b.pages - a.pages || b.weight - a.weight).slice(0, 30);
  const unique = [...topicPages.values()].filter((t) => t.pages === 1).sort((a, b) => b.weight - a.weight).slice(0, 20);
  const faqs = [...new Set(pages.flatMap((p) => p.faqs || []))];
  L.push("## 6. Content quality & topics", "",
    "| Competitor | Title (chars) | Meta (chars) | H1 | H2/H3 | Tables/Lists | FAQs | Author | Updated | Authoritative sources |", "|---|---|---|---|---|---|---|---|---|---|");
  for (const p of pages) L.push(`| ${p.domain} | ${esc(p.title)} (${p.title?.length ?? 0}) | ${p.metaDescription?.length ?? 0} | ${esc(p.h1?.[0])} | ${p.h2.length}/${p.h3.length} | ${p.tables}/${p.lists} | ${p.faqs.length} | ${esc(p.eeat?.author)} | ${day(p.eeat?.modified)} | ${(p.eeat?.authoritativeSources || []).map((u) => new URL(u).hostname).join(", ") || "—"} |`);
  L.push("", "**Topics shared by ≥2 competitors (expected coverage):** " + (shared.map((t) => `\`${t.term}\`×${t.pages}`).join(" · ") || "—"),
    "", "**Topics only one competitor covers (differentiators):** " + (unique.map((t) => `\`${t.term}\``).join(" · ") || "—"),
    "", "**Questions competitors answer (FAQ candidates; write our own answers):**", ...(faqs.length ? faqs.slice(0, 30).map((q) => `- ${esc(q)}`) : ["- none found"]), "");

  // ── Internal linking & schema
  L.push("## 7. Internal linking", "", "| Competitor | In-content internal links | Breadcrumbs | Sample anchors |", "|---|---|---|---|");
  for (const p of pages) L.push(`| ${p.domain} | ${p.links?.contentInternal ?? "—"} | ${yes(p.ux?.breadcrumbs)} | ${esc((p.links?.internalAnchors || []).slice(0, 8).join(" · ") || "—")} |`);
  L.push("", "## 8. Structured data", "", "| Competitor | Schema types | Notes |", "|---|---|---|");
  for (const p of pages) {
    const t = p.schemaTypes || [], notes = [];
    if (!t.length) notes.push("no structured data (JSON-LD, microdata or RDFa)");
    else if (p.schemaFormats?.length) notes.push(p.schemaFormats.join(" + "));
    if (t.includes("HowTo")) notes.push("HowTo (rich result deprecated)");
    if (t.includes("AggregateRating") || t.includes("Review")) notes.push("ratings/reviews: check they're genuine");
    if (t.includes("FAQPage")) notes.push(`FAQPage (${p.faqSchemaCount ?? "?"} Q)`);
    L.push(`| ${p.domain} | ${esc(t.join(", ") || "—")} | ${notes.join("; ") || "—"} |`);
  }
  L.push("");

  // ── Article structure
  L.push("## 9. Article structure per competitor");
  for (const p of pages) {
    L.push("", `### ${p.domain}: ${esc(p.title)}`, "");
    for (const h of (p.outline || []).slice(0, 40)) L.push(`${"  ".repeat(Math.max(0, h.level - 1))}- H${h.level}: ${esc(h.text)}`);
  }

  // ── Action items (derived)
  const words = pages.map((p) => p.wordCount).filter(Boolean).sort((a, b) => a - b);
  const medFaq = [...pages.map((p) => p.faqs.length)].sort((a, b) => a - b)[Math.floor(pages.length / 2)] ?? 0;
  const actions = [`Format: ${intent.verdict}.`];
  if (intent.bias) actions.push("Before writing, read 1–2 of the guide-style results in a browser: the accessible sample under-represents them.");
  if (gaps.length) actions.push(`Possible differentiators no competitor has (keep only those that fit this intent): ${gaps.slice(0, 6).join(", ")}.`);
  if (rare.length) actions.push(`Match rare strengths cheaply: ${rare.slice(0, 5).join(", ")}.`);
  if (shared.length) actions.push(`Cover the shared topics: ${shared.slice(0, 10).map((t) => t.term).join(", ")}.`);
  actions.push(`Write ${Math.max(5, Math.min(8, medFaq + 2))} FAQs (competitor median ${medFaq}), answering questions from §6 in our own words.`);
  if (words.length) actions.push(`Length: competitors range ${words[0]}–${words.at(-1)} words (median ${words[Math.floor(words.length / 2)]}). Match the intent; don't pad.`);
  const adHeavy = pages.filter((p) => (p.ux?.adSlots || 0) >= 4 || (!jsRendered(p) && (p.wordsBeforeTool ?? 0) > 150)).map((p) => p.domain);
  if (adHeavy.length) actions.push(`UX edge: ${adHeavy.join(", ")} bury the tool or carry heavy ads. Put our tool above the fold with ≤3 ad slots.`);
  if (pages.filter((p) => !(p.eeat?.authoritativeSources || []).length).length >= pages.length - 1) actions.push("Trust edge: most competitors cite no authoritative sources. Cite primary sources (.gov/.edu/standards).");
  if (pages.filter((p) => !(p.schemaTypes || []).length).length) actions.push("Schema edge: some competitors have no structured data at all. Ours ships WebApplication + Breadcrumb + FAQ.");
  actions.push("Accuracy: verify every statement in §5 against primary sources, and test our tool with the same example inputs.");
  L.push("", "## 10. Action items", "", ...actions.map((x, i) => `${i + 1}. ${x}`), "");

  // ── Sources
  L.push("## Sources", "");
  for (const p of pages) L.push(`- ${p.url}${p.finalUrl && p.finalUrl !== p.url ? ` → ${p.finalUrl}` : ""} (inspected ${day(p.fetchedAt)}, ${p.mode})`);
  for (const [u, e] of Object.entries(comp.failed || {})) L.push(`- ${u}: not inspected (${e.join("; ")})`);

  const outFile = path.join(dir, "report.md");
  fs.writeFileSync(outFile, L.join("\n") + "\n");
  return { file: path.relative(process.cwd(), outFile), pages: pages.length, scores: scored.map(({ p, s }) => ({ domain: p.domain, ...s })) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = args();
  if (!a.slug) { console.error("need --slug"); process.exit(1); }
  const r = report({ slug: a.slug });
  console.log(`Report → ${r.file} (${r.pages} pages)`);
}
