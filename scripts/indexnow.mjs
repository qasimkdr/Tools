#!/usr/bin/env node
// IndexNow (Bing, Yandex, Seznam, Naver…): tell search engines which URLs are new or changed.
// Google does not use IndexNow; this has no effect on Google Search or Search Console.
//
// Usage (after `npm run build`, so out/sitemap.xml exists):
//   node scripts/indexnow.mjs --all                    submit every sitemap URL (one-time / manual)
//   node scripts/indexnow.mjs --changed <base> <head>  submit pages whose files changed between two commits
//   node scripts/indexnow.mjs --urls <u1,u2,…>         submit an explicit list (scheduled publishing)
//   add --wait to first wait until each URL is live (HTTP 200) on the production site; --dry-run to print only.
// Only URLs that are in the sitemap (indexable pages) are ever submitted.
import fs from "node:fs";
import { execSync } from "node:child_process";

const HOST = "mathico.xyz";
const KEY = "271741e4e3c340c1a727f239846ca9c1"; // public by design: also served at /<KEY>.txt
const SITE = `https://${HOST}`;
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);

const readSitemap = () => new Set([...fs.readFileSync("out/sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

let urls = [];
if (has("--urls")) {
  // Explicit list (used by the scheduled-publishing job, which has no build): --urls https://mathico.xyz/a/,https://…
  urls = argv[argv.indexOf("--urls") + 1].split(",").filter((u) => u.startsWith(`${SITE}/`));
} else if (has("--all")) {
  urls = [...readSitemap()];
} else if (has("--changed")) {
  const i = argv.indexOf("--changed");
  const [base, head] = [argv[i + 1], argv[i + 2]];
  if (!base || /^0+$/.test(base)) { console.log("No previous commit to compare; nothing to submit."); process.exit(0); }
  let files = [];
  try { files = execSync(`git diff --name-only ${base} ${head}`, { encoding: "utf8" }).split("\n").filter(Boolean); }
  catch { console.log(`Could not diff ${base}..${head}; nothing submitted.`); process.exit(0); }
  const inSitemap = readSitemap();
  const slugs = new Set();
  for (const f of files) {
    const m = f.match(/^src\/(?:tools|app)\/([a-z0-9-]+)\//);
    if (m) slugs.add(m[1]);
  }
  urls = [...slugs].map((s) => `${SITE}/${s}/`).filter((u) => inSitemap.has(u));
  // A new tool also appears on its category hub and /tools/: include those once.
  if (urls.length) for (const u of [`${SITE}/tools/`]) if (inSitemap.has(u)) urls.push(u);
} else {
  console.error("Pass --all or --changed <base> <head>."); process.exit(1);
}

if (!urls.length) { console.log("No changed indexable pages; nothing to submit."); process.exit(0); }
console.log(`IndexNow: ${urls.length} URL(s)`);
if (has("--dry-run")) { console.log(urls.join("\n")); process.exit(0); }

if (has("--wait")) {
  // Netlify deploys in parallel with this job: wait (up to ~10 min) until every URL and the key file are live.
  const deadline = Date.now() + 10 * 60 * 1000;
  for (const u of [`${SITE}/${KEY}.txt`, ...urls]) {
    for (;;) {
      const ok = await fetch(u, { method: "HEAD", redirect: "manual" }).then((r) => r.status === 200).catch(() => false);
      if (ok) break;
      if (Date.now() > deadline) { console.log(`Not live yet: ${u}. Skipping submission; it will go with the next push.`); process.exit(0); }
      await new Promise((r) => setTimeout(r, 15000));
    }
  }
}

for (let i = 0; i < urls.length; i += 10000) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls.slice(i, i + 10000) }),
  });
  console.log(`IndexNow response: HTTP ${res.status} ${res.statusText}`);
  // 200/202 = accepted. 403 = key file not reachable, 422 = URL/host mismatch, 429 = too many requests.
  if (![200, 202].includes(res.status)) process.exitCode = 0; // never fail the build over IndexNow
}
