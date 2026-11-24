import { test, expect } from "@playwright/test";
import fs from "node:fs";

// Every URL in the generated sitemap gets the SEO checks (sitemap = source of truth for indexable pages).
const sitemap = fs.readFileSync("out/sitemap.xml", "utf8");
const all = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
// Full run checks all pages; quick run (default) checks every non-variant page + a sample of programmatic variants.
const urls = process.env.FULL ? all : all.filter((p, i) => !/-from-today\/\d+\/$/.test(p) || i % 15 === 0);
const LEGAL = /^\/(about|about\/mohammad-qasim|contact|privacy-policy|terms|disclaimer|editorial-policy)\/$/;

for (const path of urls) {
  test(`SEO ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    const res = await page.goto(path, { waitUntil: "networkidle" });
    expect(res?.status()).toBe(200);

    const title = await page.title();
    expect(title.length, `title: ${title}`).toBeGreaterThan(10);
    expect(title.length, `title too long: ${title}`).toBeLessThanOrEqual(75); // ≤60 + " | Mathico"
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc?.length ?? 0, `description: ${desc}`).toBeGreaterThanOrEqual(100);
    expect(desc?.length ?? 0, `description: ${desc}`).toBeLessThanOrEqual(170);
    await expect(page.locator("h1")).toHaveCount(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(path);

    for (const s of await page.locator('script[type="application/ld+json"]').allTextContents()) expect(() => JSON.parse(s)).not.toThrow();

    // No horizontal scroll (mobile-friendliness) and no runtime errors.
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors, errors.join("\n")).toEqual([]);

    // Tool pages: FAQ + ≥3 internal links inside the article + last-updated date.
    if (path !== "/" && !LEGAL.test(path) && !path.startsWith("/category/") && path !== "/tools/") {
      expect(await page.locator("#faq ~ div details").count()).toBeGreaterThanOrEqual(4);
      const bodyLinks = await page.locator('article a[href^="/"]').count();
      expect(bodyLinks, "internal links in article").toBeGreaterThanOrEqual(3);
      await expect(page.locator("article time[datetime]")).toHaveCount(1);
      if (!/-from-today\/\d+\/$/.test(path)) {
        const rel = await page.locator('[data-testid="related-list"] a[href^="/"]').evaluateAll((as) => [...new Set(as.map((a) => (a as HTMLAnchorElement).pathname))]);
        expect(rel.length, `related tools on ${path}`).toBe(6);
        expect(rel).not.toContain(path);
      }
    }
  });
}

test("all internal links resolve (no 404s)", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const path of urls.slice(0, 40)) {
    await page.goto(path);
    for (const href of await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).pathname)))
      seen.add(href);
  }
  for (const href of seen) expect((await request.get(href)).status(), href).toBe(200);
});
