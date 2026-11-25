#!/usr/bin/env node
// Production-view link check on out/: every internal href must resolve to a built page or file.
// Run after a normal `npm run build` (without SHOW_SCHEDULED) to prove no live page links to a hidden tool.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
const pages = [];
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name === "index.html") pages.push(p); } };
walk(out);
const exists = (href) => {
  const clean = href.split(/[?#]/)[0];
  if (/\.[a-z0-9]+$/i.test(clean)) return fs.existsSync(path.join(out, clean));
  return fs.existsSync(path.join(out, clean, "index.html"));
};
const broken = [];
for (const p of pages) {
  const html = fs.readFileSync(p, "utf8");
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith("//") || href.startsWith("/_next/")) continue;
    if (!exists(href)) broken.push(`${"/" + path.relative(out, path.dirname(p)) + "/"} → ${href}`);
  }
}
if (broken.length) { console.error(`Broken internal links (${broken.length}):\n  ` + [...new Set(broken)].slice(0, 30).join("\n  ")); process.exit(1); }
console.log(`Link check OK: ${pages.length} pages, no broken internal links.`);
