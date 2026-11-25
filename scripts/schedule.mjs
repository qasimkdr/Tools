#!/usr/bin/env node
// Give new tools random publish slots: 2–3 tools a day at ONE random time between 09:00 and 21:00 Pakistan time
// (UTC+5, no daylight saving), so each publishing day costs one Netlify build. --separate-times gives each tool its
// own time (≥2 h apart; one build per tool). Starts the day after the last scheduled tool (or tomorrow).
// Writes publishAt, published and updated into each tool's meta.ts.
//   node scripts/schedule.mjs --slugs a,b,c [--per-day 2-3] [--separate-times] [--from 2026-12-01] [--dry-run]
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const toolsDir = path.join(root, "src/tools");
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const slugs = (arg("--slugs", "") || "").split(",").map((s) => s.trim()).filter(Boolean);
if (!slugs.length) { console.error("Pass --slugs a,b,c"); process.exit(1); }
const [minPer, maxPer] = (arg("--per-day", "2-3")).split("-").map(Number);
const OFFSET = 5 * 60; // minutes, Asia/Karachi
const pad = (n) => String(n).padStart(2, "0");
const dayKey = (d) => d.toISOString().slice(0, 10);

// Start after the latest existing publishAt (Karachi date), or tomorrow (Karachi), or --from.
let latest = 0;
for (const s of fs.readdirSync(toolsDir)) {
  const f = path.join(toolsDir, s, "meta.ts");
  if (!fs.existsSync(f) || slugs.includes(s)) continue;
  const at = fs.readFileSync(f, "utf8").match(/publishAt:\s*"([^"]+)"/)?.[1];
  if (at) latest = Math.max(latest, Date.parse(at));
}
const karachiToday = new Date(Date.now() + OFFSET * 60000);
let day = new Date(Date.UTC(karachiToday.getUTCFullYear(), karachiToday.getUTCMonth(), karachiToday.getUTCDate() + 1));
if (latest) {
  const l = new Date(latest + OFFSET * 60000);
  const after = new Date(Date.UTC(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate() + 1));
  if (after > day) day = after;
}
if (arg("--from")) day = new Date(arg("--from") + "T00:00:00Z");

const plan = [];
let i = 0;
while (i < slugs.length) {
  const n = Math.min(slugs.length - i, minPer + Math.floor(Math.random() * (maxPer - minPer + 1)));
  const times = [];
  const separate = process.argv.includes("--separate-times");
  if (!separate) { const m = 9 * 60 + Math.floor(Math.random() * (12 * 60)); for (let k = 0; k < n; k++) times.push(m); }
  while (times.length < n) {
    const m = 9 * 60 + Math.floor(Math.random() * (12 * 60)); // 09:00–20:59
    if (times.every((x) => Math.abs(x - m) >= 120)) times.push(m);
  }
  times.sort((a, b) => a - b);
  for (const m of times) {
    const date = dayKey(day);
    plan.push({ slug: slugs[i++], date, at: `${date}T${pad(Math.floor(m / 60))}:${pad(m % 60)}:00+05:00` });
  }
  day = new Date(day.getTime() + 86400000);
}

for (const p of plan) {
  console.log(`${p.at}  ${p.slug}`);
  if (process.argv.includes("--dry-run")) continue;
  const f = path.join(toolsDir, p.slug, "meta.ts");
  let s = fs.readFileSync(f, "utf8");
  s = s.replace(/\n\s*publishAt:\s*"[^"]*",?/, "");
  s = s.replace(/published:\s*"[^"]*"/, `published: "${p.date}"`).replace(/updated:\s*"[^"]*"/, `updated: "${p.date}"`);
  s = s.replace(/(\n(\s*)published:)/, `\n$2publishAt: "${p.at}", // hidden until this time (scripts/publish-scheduled.mjs)$1`);
  fs.writeFileSync(f, s);
}
