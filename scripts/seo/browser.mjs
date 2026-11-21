// Reusable headless-browser module for SEO research (free, open source: Playwright + Chromium).
//   import { inspect, withBrowser, robotsAllows } from "./browser.mjs";
//   const data = await withBrowser((b) => inspect(b, "https://example.com/page"));
//
// Network modes (automatic):
//  • Direct  — no HTTPS proxy in env (your laptop/CI): Chromium loads the page normally, JS on.
//  • Offline — HTTPS proxy present (Claude cloud sessions): Node downloads the HTML through the proxy with normal TLS
//    verification (NODE_USE_ENV_PROXY=1 + NODE_EXTRA_CA_CERTS), then Chromium parses it with JavaScript disabled and
//    every subresource request blocked. No TLS checks are relaxed and no third-party scripts execute.
// Politeness: robots.txt is checked before every page; callers add delays between requests (see scrape.mjs).
import { chromium } from "playwright";

export const UA = "Mozilla/5.0 (compatible; SEOResearchBot/1.0; manual competitive research)";
export const proxied = () => !!(process.env.HTTPS_PROXY || process.env.https_proxy);

export async function withBrowser(fn) {
  const browser = await chromium.launch({ headless: true });
  try { return await fn(browser); } finally { await browser.close(); }
}

/** robots.txt check for User-agent: * (longest-prefix Disallow). Throws if the host is unreachable. */
export async function robotsAllows(url) {
  const { origin, pathname, search } = new URL(url);
  let r;
  try { r = await fetch(`${origin}/robots.txt`, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(10000) }); }
  catch (e) { throw new Error(`unreachable (${e.cause?.code || e.message})`); }
  if (!r.ok) return true; // no robots.txt → allowed
  let applies = false; const allow = [], dis = [];
  for (const raw of (await r.text()).split("\n")) {
    const line = raw.replace(/#.*/, "").trim(); const i = line.indexOf(":"); if (i < 0) continue;
    const k = line.slice(0, i).trim().toLowerCase(), v = line.slice(i + 1).trim();
    if (k === "user-agent") applies = v === "*";
    else if (applies && k === "disallow" && v) dis.push(v);
    else if (applies && k === "allow" && v) allow.push(v);
  }
  const p = pathname + search;
  const match = (rule) => p.startsWith(rule.replace(/\*.*$/, "").replace(/\$$/, ""));
  const d = Math.max(-1, ...dis.filter(match).map((x) => x.length)), a = Math.max(-1, ...allow.filter(match).map((x) => x.length));
  return d < 0 || a >= d;
}

/** Open a URL and return a ready Playwright page (caller closes it). */
export async function openPage(browser, url) {
  const offline = proxied();
  const page = await browser.newPage({ userAgent: UA, viewport: { width: 1366, height: 900 }, javaScriptEnabled: !offline });
  try {
    if (offline) {
      const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "text/html" }, redirect: "follow", signal: AbortSignal.timeout(30000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const html = (await r.text()).replace(/<head([^>]*)>/i, `<head$1><base href="${r.url}">`);
      await page.route("**/*", (route) => route.abort());
      await page.setContent(html, { waitUntil: "domcontentloaded" });
      return { page, finalUrl: r.url, mode: "offline-parse" };
    }
    const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    if (res && res.status() >= 400) throw new Error(`HTTP ${res.status()}`);
    await page.waitForTimeout(1500); // let JS calculators render
    return { page, finalUrl: page.url(), mode: "direct" };
  } catch (e) { await page.close(); throw e; }
}

/** Extract SEO structure from an open page. Stores structure + short metadata only — never full text. */
export function extract(page, host) {
  return page.evaluate((pageHost) => {
    const host = pageHost.replace(/^www\./, "");
    const txt = (el) => el.textContent.replace(/\s+/g, " ").trim();
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => { try { const j = JSON.parse(s.textContent); return Array.isArray(j) ? j : j["@graph"] || [j]; } catch { return []; } });
    const faqLd = ld.filter((x) => x["@type"] === "FAQPage").flatMap((x) => (x.mainEntity || []).map((q) => q.name));
    document.querySelectorAll("style, script, noscript, svg, template").forEach((el) => el.remove());
    const inputs = [...document.querySelectorAll("input:not([type=hidden]):not([type=search]), select, textarea")].map((el) => {
      const lab = el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      return (lab && txt(lab)) || el.getAttribute("aria-label") || el.getAttribute("placeholder") || el.name || el.type;
    }).filter(Boolean).slice(0, 30);
    const main = document.querySelector("main, article, [role=main]") || document.body;
    // Drop site chrome so topics/word counts reflect the content area.
    main.querySelectorAll("nav, header, footer, aside, form [type=hidden]").forEach((el) => el.remove());
    const hs = (t) => [...document.querySelectorAll(t)].map(txt).filter(Boolean).slice(0, 40);
    const outline = [...main.querySelectorAll("h1, h2, h3, h4")].map((h) => ({ level: Number(h.tagName[1]), text: txt(h) })).filter((h) => h.text).slice(0, 80);
    const qHeads = [...main.querySelectorAll("h2,h3,h4,summary,dt,strong")].map(txt).filter((t) => t.endsWith("?") && t.length > 10 && t.length < 160);
    const links = [...document.querySelectorAll("a[href]")].map((a) => a.href).filter((h) => h.startsWith("http"));
    const same = (h) => new URL(h).hostname.replace(/^www\./, "") === host;
    const inMain = [...main.querySelectorAll("a[href]")].map((a) => a.href).filter((h) => h.startsWith("http"));
    main.querySelectorAll("select, option, input, button, textarea").forEach((el) => el.remove()); // form chrome isn't content
    const body = (main.innerText || main.textContent).replace(/\s+/g, " ");
    const words = body.toLowerCase().replace(/[^a-z0-9' ]/g, " ").split(/\s+/).filter(Boolean);
    const STOP = new Set("a an the and or but of to in on at for with by from as is are was were be been it its this that these those you your we our they their he she his her i me my can will would should could do does did not no yes if then than so such what which who how when where why all any each more most other some into over about up out also just only very per may one two use using get like time".split(" "));
    const count = new Map();
    for (let i = 0; i < words.length; i++) {
      const w = words[i]; if (w.length > 25) continue; if (w.length > 2 && !STOP.has(w) && !/^\d+$/.test(w)) count.set(w, (count.get(w) || 0) + 1);
      const w2 = words[i + 1]; if (w2 && !STOP.has(w) && !STOP.has(w2) && w.length > 2 && w2.length > 2) { const bg = `${w} ${w2}`; count.set(bg, (count.get(bg) || 0) + 1.5); }
    }
    const topics = [...count].filter(([, n]) => n >= 3).sort((x, y) => y[1] - x[1]).slice(0, 30).map(([t, n]) => ({ term: t, weight: Math.round(n) }));
    return {
      title: document.title || null,
      metaDescription: document.querySelector('meta[name="description"]')?.content || null,
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      lang: document.documentElement.lang || null,
      h1: hs("h1"), h2: hs("h2"), h3: hs("h3"), outline,
      wordCount: words.length,
      faqs: [...new Set([...faqLd, ...qHeads])].slice(0, 25),
      topics,
      schemaTypes: [...new Set(ld.flatMap((x) => [x["@type"]].flat()).filter(Boolean))],
      tables: main.querySelectorAll("table").length, lists: main.querySelectorAll("ul, ol").length,
      images: main.querySelectorAll("img").length, videos: main.querySelectorAll("video, iframe[src*='youtube']").length,
      calculatorInputs: inputs,
      links: {
        internal: new Set(links.filter(same)).size, external: new Set(links.filter((h) => !same(h))).size,
        contentInternal: new Set(inMain.filter(same)).size, contentExternal: new Set(inMain.filter((h) => !same(h))).size,
        internalSample: [...new Set(inMain.filter(same))].slice(0, 25), externalSample: [...new Set(inMain.filter((h) => !same(h)))].slice(0, 15),
      },
    };
  }, host);
}

/** robots check → open → extract. */
export async function inspect(browser, url) {
  if (!(await robotsAllows(url))) throw new Error("disallowed by robots.txt");
  const { page, finalUrl, mode } = await openPage(browser, url);
  try { return { url, finalUrl, mode, domain: new URL(finalUrl).hostname, fetchedAt: new Date().toISOString(), ...(await extract(page, new URL(finalUrl).hostname)) }; }
  finally { await page.close(); }
}
