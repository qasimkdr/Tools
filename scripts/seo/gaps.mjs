#!/usr/bin/env node
/**
 * Competitor feature-parity check (owner rule 2026-11-26: cover every competitor feature, then add more).
 *
 *   node scripts/seo/gaps.mjs --slugs a,b [--out out] [--strict]
 *
 * For each slug, reads research/<slug>/competitors.json (from `seo:scrape`) and lists everything the competitor pages
 * offer: calculator inputs, unit toggle, result actions (print/share/copy/download), content features (formula, worked
 * examples, step-by-step, cost estimate, chart, tips), tables, video, content sections (H2/H3) and FAQ questions.
 * Then it reads our built page (<out>/<slug>/index.html; build with SHOW_SCHEDULED=1 for queued tools) and marks each
 * item covered / missing. Text items count as covered when most of their key words appear on our page — a heuristic,
 * so read the "missing" list and decide: build it, cover it, or write down why it's skipped (irrelevant, filler,
 * unverifiable data). Writes research/<slug>/gaps.md. --strict exits 1 if any feature flag is missing.
 */
import fs from "node:fs";
import path from "node:path";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const slugs = (arg("--slugs", arg("--slug", "")) || "").split(",").map((s) => s.trim()).filter(Boolean);
const outDir = arg("--out", "out");
const strict = process.argv.includes("--strict");
if (!slugs.length) { console.error("Usage: node scripts/seo/gaps.mjs --slugs a,b [--out out] [--strict]"); process.exit(2); }

const BOILER = /tell us what you think|share this result|on this page|cite this page|related calculators|similar .*calculators|^faqs?$|frequently asked questions|^results?\b|^sources$|^references$|for ai systems|^table of contents|advertis|newsletter|^more\b.*calculators|embed|widget|^how (do|does) (the|this|our) .*calculator work\??$/i;
const STOP = new Set("the a an and or of to in on for with by from at as is are be can do does how what why when which your you our this that it its into than then them they their there these those will would should could about more most other some such only also just use using used calculate calculator calculation calculating find get make need many much per vs versus".split(" "));
const words = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
const stem = (w) => w.replace(/(ings?|ed|es|s)$/, "");

function ourPage(slug) {
  const f = path.join(outDir, slug, "index.html");
  if (!fs.existsSync(f)) return null;
  let h = fs.readFileSync(f, "utf8");
  const m = h.match(/<main[\s\S]*?<\/main>/); if (m) h = m[0];
  const text = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
  const lower = text.toLowerCase();
  return {
    raw: h, lower, stems: new Set(words(text).map(stem)),
    inputs: (h.match(/<(input|select|textarea)\b/g) || []).length,
    tables: (h.match(/<table\b/g) || []).length,
    unit: /\b(metric|imperial)\b/i.test(text) || /<option[^>]*>[^<]*\b(cm|mm|m|meters?|metres?|ft|feet|in|inch(es)?|kg|lb|lbs)\b/i.test(h),
    chart: /<(svg|canvas)\b|role="img"/.test(h) || /<h[23][^>]*>[^<]*\bchart\b/i.test(h),
    formula: /class="formula"/.test(h), examples: /worked example|example/i.test(text), steps: /step by step|step-by-step|steps?\b/i.test(text),
    cost: /\bcost\b|\bprice\b|\$/.test(lower), tips: /\btips?\b|before you (build|cut|start)|mistakes/i.test(text), video: /<video\b|youtube\.com\/embed/.test(h),
  };
}
const covered = (ours, label) => {
  const ws = [...new Set(words(label).map(stem))];
  if (!ws.length) return true;
  const hit = ws.filter((w) => ours.stems.has(w)).length;
  return hit / ws.length >= (ws.length <= 2 ? 1 : 0.6);
};

let anyMissing = false;
for (const slug of slugs) {
  const cf = path.join("research", slug, "competitors.json");
  if (!fs.existsSync(cf)) { console.log(`${slug}: no research/${slug}/competitors.json — run seo:scrape first`); continue; }
  const pages = Object.values(JSON.parse(fs.readFileSync(cf, "utf8")).pages || {});
  const ours = ourPage(slug);
  if (!ours) { console.log(`${slug}: ${outDir}/${slug}/index.html not found — build first (SHOW_SCHEDULED=1 for queued tools)`); continue; }
  const lines = [`# Feature parity: ${slug}`, "", `Generated ${new Date().toISOString().slice(0, 10)} by scripts/seo/gaps.mjs from ${pages.length} inspected competitor page(s). Text matches are heuristic: review every ✗.`, ""];
  if (!pages.length) lines.push("No competitor page could be inspected. Use SERP snippets and the brief; note that parity is unverified.", "");

  // Feature flags
  const flags = [
    ["Unit toggle", (p) => p.unitToggle, ours.unit],
    ["Print", (p) => p.actions?.print, true], ["Share / copy link", (p) => p.actions?.share || p.actions?.copy, true],
    ["Download / export", (p) => p.actions?.download, /download|csv|png/i.test(ours.lower)],
    ["Formula shown", (p) => p.content?.formula, ours.formula], ["Worked example", (p) => p.content?.examples, ours.examples],
    ["Step-by-step", (p) => p.content?.stepByStep, ours.steps], ["Cost estimate", (p) => p.content?.costEstimate, ours.cost],
    ["Chart / diagram", (p) => p.content?.chart, ours.chart], ["Tips", (p) => p.content?.tips, ours.tips],
    ["Table(s)", (p) => (p.tables || 0) > 0, ours.tables > 0], ["Video", (p) => (p.videos || 0) > 0, ours.video],
  ];
  lines.push("## Features", "", "| Feature | Competitors with it | Ours |", "|---|---|---|");
  const missingFlags = [];
  for (const [name, has, ok] of flags) {
    const who = pages.filter(has).map((p) => p.domain.replace(/^www\./, ""));
    if (!who.length) continue;
    if (!ok) missingFlags.push(name);
    lines.push(`| ${name} | ${who.join(", ")} | ${ok ? "✓" : "✗ missing"} |`);
  }
  const maxIn = Math.max(0, ...pages.map((p) => (p.calculatorInputs || []).length));
  lines.push(`| Calculator inputs | most: ${maxIn} | ${ours.inputs} ${ours.inputs >= maxIn ? "✓" : "(fewer — check the list below)"} |`, "");

  // Inputs, sections, FAQs
  const section = (title, items) => {
    const uniq = [...new Map(items.filter((x) => x.label && !BOILER.test(x.label.trim())).map((x) => [x.label.toLowerCase(), x])).values()];
    if (!uniq.length) return [];
    const rows = uniq.map((x) => ({ ...x, ok: covered(ours, x.label) }));
    lines.push(`## ${title}`, "", ...rows.map((r) => `- ${r.ok ? "✓" : "✗"} ${r.label} _(${r.domain})_`), "");
    return rows.filter((r) => !r.ok);
  };
  const miss = [
    ...section("Calculator inputs and options", pages.flatMap((p) => (p.calculatorInputs || []).filter((i) => !/units?$/i.test(i)).map((label) => ({ label, domain: p.domain })))),
    ...section("Content sections (H2/H3)", pages.flatMap((p) => (p.outline || []).filter((o) => o.level >= 2 && o.level <= 3).map((o) => ({ label: o.text, domain: p.domain })))),
    ...section("FAQ questions", pages.flatMap((p) => (p.faqs || []).map((label) => ({ label, domain: p.domain })))),
  ];
  lines.push("## Decision log (fill in)", "", "For each ✗ above: **built** / **covered elsewhere on the page** / **skipped because …** (irrelevant, filler, unverifiable, harmful).", "");
  fs.writeFileSync(path.join("research", slug, "gaps.md"), lines.join("\n"));
  if (missingFlags.length || miss.length) anyMissing ||= missingFlags.length > 0;
  console.log(`${slug}: ${missingFlags.length ? `features missing: ${missingFlags.join(", ")} · ` : "all competitor feature flags covered · "}${miss.length} text item(s) to review → research/${slug}/gaps.md`);
}
process.exit(strict && anyMissing ? 1 : 0);
