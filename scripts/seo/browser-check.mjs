#!/usr/bin/env node
// Health check: is headless Chromium installed and working, and which sites/search engines can this session reach?
// Usage: npm run seo:check [-- --url https://www.calculator.net/]
import { args } from "./lib.mjs";
import { inspect, proxied, robotsAllows, withBrowser } from "./browser.mjs";

const a = args();
const ok = (b) => (b ? "✅" : "❌");

await withBrowser(async (browser) => {
  console.log(`Chromium ${browser.version()} — headless launch ${ok(true)}`);
  const p = await browser.newPage();
  await p.setContent("<h1 id=x>render test</h1><script>document.title = 'js-' + (6 * 7)</script>");
  console.log(`JS execution ${ok((await p.title()) === "js-42")} · DOM ${ok((await p.textContent("#x")) === "render test")}`);
  const shot = await p.screenshot();
  console.log(`Screenshot ${ok(shot.length > 1000)} (${shot.length} bytes)`);
  await p.close();
  console.log(`Network mode: ${proxied() ? "offline-parse via HTTPS proxy (cloud)" : "direct"}`);

  // Search engines: reachability + whether robots.txt allows automated /search requests.
  console.log("\nSearch engines (automated querying is only attempted if reachable AND robots.txt allows it):");
  for (const [name, url] of [["Google", "https://www.google.com/search?q=test"], ["Bing", "https://www.bing.com/search?q=test"],
    ["DuckDuckGo HTML", "https://html.duckduckgo.com/html/?q=test"], ["Mojeek", "https://www.mojeek.com/search?q=test"], ["Brave", "https://search.brave.com/search?q=test"]]) {
    try { console.log(`  ${name.padEnd(16)} reachable ✅  robots.txt allows /search: ${ok(await robotsAllows(url))}`); }
    catch (e) { console.log(`  ${name.padEnd(16)} ❌ ${e.message}`); }
  }

  const target = a.url || "https://www.calculator.net/date-calculator.html";
  try {
    const d = await inspect(browser, target);
    console.log(`\nCompetitor page test ${ok(true)} ${target}\n  title: ${d.title}\n  H2s: ${d.h2.length} · words: ${d.wordCount} · topics: ${d.topics.slice(0, 6).map((t) => t.term).join(", ")}`);
  } catch (e) { console.log(`\nCompetitor page test ❌ ${target}: ${e.message}`); }
});
