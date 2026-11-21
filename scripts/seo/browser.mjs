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

/**
 * Extract SEO + quality signals from an open page. Stores structure, counts and at most a few short factual sentences
 * ("claims", for fact-checking only — never reused as content). No full text is stored.
 */
export function extract(page, host, keyword = "") {
  return page.evaluate(({ pageHost, keyword }) => {
    const host = pageHost.replace(/^www\./, "");
    const txt = (el) => el.textContent.replace(/\s+/g, " ").trim();
    const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

    // ── Whole-document signals (before any cleanup) ──
    const ld = $$('script[type="application/ld+json"]').flatMap((s) => { try { const j = JSON.parse(s.textContent); return Array.isArray(j) ? j : j["@graph"] || [j]; } catch { return []; } });
    // Structured data in all three formats: JSON-LD, microdata (itemtype) and RDFa (typeof).
    const ldTypes = ld.flatMap((x) => [x["@type"]].flat()).filter(Boolean);
    const microTypes = $$("[itemtype]").flatMap((el) => el.getAttribute("itemtype").split(/\s+/)).map((t) => t.split("/").pop()).filter(Boolean);
    const rdfaTypes = $$("[typeof]").flatMap((el) => el.getAttribute("typeof").split(/\s+/)).map((t) => t.split(/[/:]/).pop()).filter(Boolean);
    const types = [...new Set([...ldTypes, ...microTypes, ...rdfaTypes])];
    const schemaFormats = [ldTypes.length && "JSON-LD", microTypes.length && "microdata", rdfaTypes.length && "RDFa"].filter(Boolean);
    const faqLd = ld.filter((x) => [x["@type"]].flat().includes("FAQPage")).flatMap((x) => [x.mainEntity].flat().filter(Boolean).map((q) => q.name));
    const scriptSrcs = $$("script[src]").map((s) => s.src);
    const AD_NETS = { adsense: /adsbygoogle|googlesyndication/, gpt: /googletag|securepubads|doubleclick/, mediavine: /mediavine/, adthrive: /adthrive|raptive/, ezoic: /ezoic|ezojs/, freestar: /freestar/, monumetric: /monumetric/ };
    const htmlAll = document.documentElement.outerHTML;
    const adNetworks = Object.entries(AD_NETS).filter(([, r]) => scriptSrcs.some((u) => r.test(u)) || r.test(htmlAll.slice(0, 400000))).map(([k]) => k);
    const adSlots = $$('ins.adsbygoogle, [id^="div-gpt-ad"], [id*="google_ads"], [class*="adslot"], [class*="ad-slot"], [data-ad-slot], [id^="ezoic-pub-ad"]').length;
    const authorLd = ld.map((x) => x.author).filter(Boolean).flat().map((a) => (typeof a === "string" ? a : a.name)).filter(Boolean);
    const author = document.querySelector('meta[name="author"]')?.content || authorLd[0] || (document.querySelector('[rel="author"], .author, .byline, [class*="author-name"]') ? txt(document.querySelector('[rel="author"], .author, .byline, [class*="author-name"]')).slice(0, 80) : null);
    const modified = document.querySelector('meta[property="article:modified_time"]')?.content || ld.map((x) => x.dateModified).find(Boolean) || null;
    const published = document.querySelector('meta[property="article:published_time"]')?.content || ld.map((x) => x.datePublished).find(Boolean) || null;
    const updatedText = (document.body.innerText.match(/(last (updated|reviewed|modified)|updated)[:\s]+([A-Z][a-z]+\.? \d{1,2},? \d{4}|\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4})/i) || [])[3] || null;
    const breadcrumbs = types.includes("BreadcrumbList") || !!document.querySelector('nav[aria-label*="readcrumb" i], .breadcrumb, .breadcrumbs, [class*="breadcrumb"]');
    const viewport = !!document.querySelector('meta[name="viewport"]');
    const canvasCount = $$("canvas").length;
    const actionText = $$("button, a, input[type=button], input[type=submit]").map((el) => (el.value || txt(el)).toLowerCase()).join(" | ");
    const actions = { print: /\bprint\b/.test(actionText), share: /\bshare\b|copy link/.test(actionText), download: /download|export|pdf|csv/.test(actionText), copy: /\bcopy\b/.test(actionText), reset: /\breset\b|\bclear\b/.test(actionText) };

    // Calculator inputs (before removal) + where the tool sits relative to content.
    $$("style, script, noscript, svg, template").forEach((el) => el.remove());
    const labelOf = (el) => { const lab = el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`); return (lab && txt(lab)) || el.getAttribute("aria-label") || el.getAttribute("placeholder") || el.name || el.type || ""; };
    // Not calculator inputs: site search, feedback/newsletter/comment forms, embed/share/cite widgets, unlabeled text boxes.
    const NOISE = /search|e-?mail|newsletter|subscribe|feedback|comment|question|your name|name \(optional\)|cite|citation|link to|embed|widget|html|share|captcha|password|login|^text$/i;
    const inputEls = $$("input:not([type=hidden]):not([type=search]):not([type=submit]):not([type=button]):not([type=email]):not([type=password]), select, textarea")
      .filter((el) => !el.closest("header, nav, footer, [class*='comment'], [id*='comment'], [class*='feedback'], [id*='feedback'], [class*='newsletter']") && !NOISE.test(labelOf(el)));
    const inputs = inputEls.map(labelOf).filter(Boolean).slice(0, 40);
    const selectOptions = $$("select option").map(txt).join(" ").toLowerCase();
    const unitToggle = /\b(metric|imperial)\b/i.test(document.body.innerText) || /\b(cm|mm|meters?|inch(es)?|feet|ft|kg|lbs?)\b.*\b(cm|mm|meters?|inch(es)?|feet|ft|kg|lbs?)\b/.test(selectOptions);
    let wordsBeforeTool = null;
    const firstInput = inputEls[0];
    if (firstInput) {
      let n = 0; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) { if (w.currentNode.parentElement?.closest("header, nav")) continue; if (firstInput.compareDocumentPosition(w.currentNode) & Node.DOCUMENT_POSITION_FOLLOWING) break; n += w.currentNode.textContent.trim().split(/\s+/).filter(Boolean).length; }
      wordsBeforeTool = n;
    }

    // ── Content area ──
    const main = document.querySelector("main, article, [role=main]") || document.body;
    main.querySelectorAll("nav, header, footer, aside").forEach((el) => el.remove());
    const hs = (t) => $$(t).map(txt).filter(Boolean).slice(0, 40);
    const outline = $$("h1, h2, h3, h4", main).map((h) => ({ level: Number(h.tagName[1]), text: txt(h) })).filter((h) => h.text).slice(0, 80);
    const qHeads = $$("h2,h3,h4,summary,dt,strong", main).map(txt).filter((t) => t.endsWith("?") && t.length > 10 && t.length < 160);
    const links = $$("a[href]").map((a) => a.href).filter((h) => h.startsWith("http"));
    const same = (h) => { try { return new URL(h).hostname.replace(/^www\./, "") === host; } catch { return false; } };
    const mainAnchors = $$("a[href]", main).filter((a) => a.href.startsWith("http"));
    const inMain = mainAnchors.map((a) => a.href);
    const internalAnchors = [...new Set(mainAnchors.filter((a) => same(a.href)).map((a) => txt(a)).filter((t) => t && t.length < 70))].slice(0, 20);
    const ext = [...new Set(inMain.filter((h) => !same(h)))];
    const authoritative = ext.filter((u) => /\.(gov|edu|mil)(\/|$)|\.gov\.|wikipedia\.org|who\.int|nih\.gov|irs\.gov|cdc\.gov|nist\.gov|ieee\.org|aci-int\.org|astm\.org/i.test(new URL(u).hostname + "/"));
    const tables = main.querySelectorAll("table").length, lists = main.querySelectorAll("ul, ol").length, orderedLists = main.querySelectorAll("ol").length;
    main.querySelectorAll("select, option, input, button, textarea").forEach((el) => el.remove());
    const body = (main.innerText || main.textContent).replace(/\s+/g, " ");
    const words = body.toLowerCase().replace(/[^a-z0-9' ]/g, " ").split(/\s+/).filter(Boolean);
    const sentences = body.split(/(?<=[.!?])\s+/).filter((x) => x.split(" ").length > 3);
    const avgSentence = sentences.length ? Math.round(words.length / sentences.length) : null;

    const STOP = new Set("a an the and or but of to in on at for with by from as is are was were be been it its this that these those you your we our they their he she his her i me my can will would should could do does did not no yes if then than so such what which who how when where why all any each more most other some into over about up out also just only very per may one two use using get like time".split(" "));
    const count = new Map();
    for (let i = 0; i < words.length; i++) {
      const w = words[i]; if (w.length > 25) continue; if (w.length > 2 && !STOP.has(w) && !/^\d+$/.test(w)) count.set(w, (count.get(w) || 0) + 1);
      const w2 = words[i + 1]; if (w2 && !STOP.has(w) && !STOP.has(w2) && w.length > 2 && w2.length > 2) { const bg = `${w} ${w2}`; count.set(bg, (count.get(bg) || 0) + 1.5); }
    }
    const topics = [...count].filter(([, n]) => n >= 3).sort((x, y) => y[1] - x[1]).slice(0, 30).map(([t, n]) => ({ term: t, weight: Math.round(n) }));

    // Short numeric facts mentioning the keyword's words → for manual fact-checking (accuracy review), max 10.
    const kwTokens = keyword.toLowerCase().split(/\W+/).filter((t) => t.length > 2 && !["calculator", "converter", "how", "what", "the", "from"].includes(t));
    const claims = sentences.filter((x) => x.length >= 40 && x.length <= 220 && /\d/.test(x) && !/\?$|retrieved|https?:|cite this|©|copyright/i.test(x) && (kwTokens.length === 0 || kwTokens.some((t) => x.toLowerCase().includes(t)))).slice(0, 10);

    const text = body.toLowerCase();
    const content = {
      formula: /\bformula\b|\bequation\b|=\s*[a-z(√π]/i.test(body),
      examples: /\bexample\b|\bfor instance\b|\bsuppose\b/.test(text),
      stepByStep: orderedLists > 0 || /\bstep \d|\bstep-by-step\b/.test(text),
      costEstimate: /\bcost\b|\bprice\b|\$\s?\d/.test(text),
      chart: canvasCount > 0 || /\bchart\b|\bgraph\b/.test(text),
      definitions: /\bwhat is\b|\bis defined as\b|\bmeans\b/.test(text),
      tips: /\btips?\b|\bmistakes?\b|\bavoid\b/.test(text),
    };
    return {
      title: document.title || null,
      metaDescription: document.querySelector('meta[name="description"]')?.content || null,
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      robotsMeta: document.querySelector('meta[name="robots"]')?.content || null,
      lang: document.documentElement.lang || null,
      h1: hs("h1"), h2: hs("h2"), h3: hs("h3"), outline,
      wordCount: words.length, avgSentenceWords: avgSentence,
      faqs: [...new Set([...faqLd, ...qHeads])].slice(0, 25), faqSchemaCount: faqLd.length,
      topics, claims,
      schemaTypes: types, schemaFormats,
      tables, lists, images: main.querySelectorAll("img").length, videos: main.querySelectorAll("video, iframe[src*='youtube']").length,
      calculatorInputs: inputs, selectOptionsSample: selectOptions.slice(0, 300), unitToggle, wordsBeforeTool,
      actions, content,
      eeat: { author, published, modified: modified || updatedText, authoritativeSources: authoritative.slice(0, 10) },
      ux: { htmlKB: Math.round(htmlAll.length / 1024), adNetworks, adSlots, viewport, breadcrumbs },
      links: {
        internal: new Set(links.filter(same)).size, external: new Set(links.filter((h) => !same(h))).size,
        contentInternal: new Set(inMain.filter(same)).size, contentExternal: ext.length,
        internalAnchors, internalSample: [...new Set(inMain.filter(same))].slice(0, 25), externalSample: ext.slice(0, 15),
      },
    };
  }, { pageHost: host, keyword });
}

/** Page type from structure (used for search-intent analysis). */
export function classify(d) {
  const h = d.domain;
  if (/apps\.apple\.com|play\.google\.com/.test(h)) return "app listing";
  if (/youtube\.com|vimeo\.com/.test(h)) return "video";
  const tool = (d.calculatorInputs?.length ?? 0) >= 2;
  const jsTool = !tool && d.mode === "offline-parse" && /calculator|converter|estimator/i.test(`${d.title} ${d.h1?.[0] || ""}`);
  if (jsTool) return "tool (JS-rendered; inputs not parsed)";
  const answer = /^(what|when|how many|how much)\b.*\?$/i.test(d.h1?.[0] || "") && d.wordCount < 900;
  if (answer) return tool ? "answer page + tool" : "answer page";
  if (tool) return d.wordCount >= 1200 ? "tool + guide" : "tool";
  return d.wordCount >= 900 ? "article/guide" : "thin/other";
}

/** robots check → open → extract. */
export async function inspect(browser, url, { keyword = "" } = {}) {
  if (!(await robotsAllows(url))) throw new Error("disallowed by robots.txt");
  const { page, finalUrl, mode } = await openPage(browser, url);
  try {
    const host = new URL(finalUrl).hostname;
    const d = { url, finalUrl, mode, domain: host, fetchedAt: new Date().toISOString(), ...(await extract(page, host, keyword)) };
    d.pageType = classify(d);
    if (mode === "offline-parse") d.notes = ["Parsed without JavaScript: JS-rendered calculators may show fewer inputs/actions than real users see."];
    return d;
  } finally { await page.close(); }
}
