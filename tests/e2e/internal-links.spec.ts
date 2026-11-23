import { test, expect } from "@playwright/test";
import fs from "node:fs";

// Static link graph check on the built HTML (what Google sees without running JS).
test("every tool shows 6 related tools and appears in ≥3 other tools' related blocks", () => {
  const reg = fs.readFileSync("src/tools/registry.ts", "utf8");
  const slugs = [...reg.matchAll(/from "\.\/([^/]+)\/meta"/g)].map((m) => m[1]);
  const all = new Set(slugs), inbound = new Map(slugs.map((s) => [s, 0]));
  for (const s of slugs) {
    const html = fs.readFileSync(`out/${s}/index.html`, "utf8");
    const i = html.indexOf('data-testid="related-list"');
    expect(i, `${s} has a related block`).toBeGreaterThan(0);
    const block = html.slice(i, html.indexOf("</section>", i));
    const links = [...new Set([...block.matchAll(/href="\/([a-z0-9-]+)\/"/g)].map((m) => m[1]))].filter((x) => all.has(x));
    expect(links.length, `${s} related count`).toBe(6);
    expect(links).not.toContain(s);
    for (const l of links) inbound.set(l, (inbound.get(l) ?? 0) + 1);
  }
  const weak = [...inbound].filter(([, n]) => n < 3);
  expect(weak, `tools in <3 related blocks: ${weak.map((w) => w.join(":")).join(", ")}`).toEqual([]);
});
