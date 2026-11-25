#!/usr/bin/env node
// Guard for scheduled publishing: a tool may only link (in its Content/faq/page/meta.related) to tools that are
// already live or that publish at the same time or earlier, so no page ever links to a not-yet-published tool.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const toolsDir = path.join(root, "src/tools");
const when = {};
for (const s of fs.readdirSync(toolsDir)) {
  const f = path.join(toolsDir, s, "meta.ts");
  if (!fs.existsSync(f)) continue;
  const at = fs.readFileSync(f, "utf8").match(/publishAt:\s*"([^"]+)"/)?.[1];
  when[s] = at ? Date.parse(at) : 0; // 0 = live (unscheduled)
}
const problems = [];
for (const [slug, t] of Object.entries(when)) {
  const dir = path.join(toolsDir, slug);
  const text = ["Content.tsx", "faq.ts", "page.tsx", "Calculator.tsx"].map((f) => path.join(dir, f)).filter(fs.existsSync).map((f) => fs.readFileSync(f, "utf8")).join("\n");
  const linked = new Set([...text.matchAll(/href="\/([a-z0-9-]+)\/"/g)].map((m) => m[1]));
  for (const target of linked) if (target in when && when[target] > t) problems.push(`${slug} links to ${target}, which publishes later`);
}
if (problems.length) { console.error("Schedule problems:\n  " + problems.join("\n  ")); process.exit(1); }
const queued = Object.values(when).filter((t) => t > Date.now()).length;
console.log(`Schedule check OK (${queued} tool(s) waiting to publish).`);
