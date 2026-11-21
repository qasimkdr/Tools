#!/usr/bin/env node
// One command for steps 1–7: SERP → competitor inspection → report.  npm run seo:research -- --slug <slug>
import { spawnSync } from "node:child_process";
const pass = process.argv.slice(2);
for (const s of ["serp", "scrape", "report"]) {
  console.log(`\n=== ${s} ===`);
  const r = spawnSync("node", [`scripts/seo/${s}.mjs`, ...pass], { stdio: "inherit" });
  if (r.status === 1) process.exit(1);
}
