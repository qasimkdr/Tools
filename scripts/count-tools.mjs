// Prints the number of published tools (registry) and the count per category. Usage: npm run -s tools:count
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const reg = fs.readFileSync(path.join(root, "src/tools/registry.ts"), "utf8");
const imports = [...reg.matchAll(/import (\w+) from "\.\/([\w-]+)\/meta";/g)].map((m) => ({ id: m[1], dir: m[2] }));
const list = reg.match(/export const STATIC_TOOLS: ToolMeta\[\] = \[([^\]]+)\]/)[1].split(",").map((x) => x.trim()).filter(Boolean);
// Scheduled tools (publishAt in meta.ts) count once their time has passed.
let waiting = 0;
const scheduledCats = [];
for (const dir of fs.readdirSync(path.join(root, "src/tools"))) {
  const f = path.join(root, "src/tools", dir, "meta.ts");
  if (!fs.existsSync(f)) continue;
  const m = fs.readFileSync(f, "utf8"), at = m.match(/publishAt:\s*"([^"]+)"/)?.[1];
  if (!at) continue;
  if (Date.parse(at) <= Date.now()) scheduledCats.push(m.match(/category: "([\w-]+)"/)[1]); else waiting++;
}
const site = fs.readFileSync(path.join(root, "src/lib/site.ts"), "utf8");
const names = Object.fromEntries([...site.matchAll(/"?([\w-]+)"?: \{ name: "([^"]+)"/g)].map((m) => [m[1], m[2]]));
const counts = {};
for (const id of list) {
  const imp = imports.find((i) => i.id === id);
  const meta = fs.readFileSync(path.join(root, "src/tools", imp.dir, "meta.ts"), "utf8");
  const cat = meta.match(/category: "([\w-]+)"/)[1];
  counts[cat] = (counts[cat] || 0) + 1;
}
for (const c of scheduledCats) counts[c] = (counts[c] || 0) + 1;
console.log(`Total published tools: ${list.length + scheduledCats.length}${waiting ? ` (+${waiting} scheduled, not live yet)` : ""}`);
for (const [c, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) console.log(`  ${names[c] ?? c}: ${n}`);
