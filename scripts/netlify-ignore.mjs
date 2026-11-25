#!/usr/bin/env node
// Netlify "ignore" command (netlify.toml → [build] ignore): exit 0 = SKIP this build, exit 1 = build.
// Saves free build minutes: a push that only adds hidden scheduled tools, research, docs, data or tests
// changes nothing on the live site, so Netlify skips it. Build-hook builds (scheduled publishing, daily
// refresh) and anything uncertain always build.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const build = (why) => { console.log(`Build: ${why}`); process.exit(1); };
const skip = (why) => { console.log(`Skip build: ${why}`); process.exit(0); };

if (process.env.INCOMING_HOOK_TITLE || process.env.INCOMING_HOOK_URL || process.env.INCOMING_HOOK_BODY) build("triggered by a build hook");
const base = process.env.CACHED_COMMIT_REF, head = process.env.COMMIT_REF;
if (!base || !head || base === head) build("no previous deploy to compare (first deploy or retry)");

let files;
try { files = execSync(`git diff --name-only ${base} ${head}`, { encoding: "utf8" }).split("\n").filter(Boolean); }
catch { build("could not compare commits"); }
if (!files.length) build("no file changes detected");

// Scheduled tools that are still hidden: their files cannot change the live site.
const now = Date.now(), waiting = new Set();
for (const s of fs.readdirSync("src/tools")) {
  const f = path.join("src/tools", s, "meta.ts");
  if (!fs.existsSync(f)) continue;
  const at = fs.readFileSync(f, "utf8").match(/publishAt:\s*"([^"]+)"/)?.[1];
  if (at && Date.parse(at) > now) waiting.add(s);
}
const harmless = (f) =>
  /^(research|docs|data|tests|\.github|scripts\/seo)\//.test(f) ||
  /^[^/]+\.md$/.test(f) ||
  (f.match(/^src\/tools\/([a-z0-9-]+)\//) && waiting.has(f.match(/^src\/tools\/([a-z0-9-]+)\//)[1]));
const live = files.filter((f) => !harmless(f));
if (live.length) build(`live files changed: ${live.slice(0, 5).join(", ")}${live.length > 5 ? " …" : ""}`);
skip(`only hidden scheduled tools / research / docs / tests changed (${files.length} files)`);
