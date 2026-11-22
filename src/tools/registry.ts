import type { ToolMeta } from "./types";
import type { CategoryId } from "@/lib/site";
import daysFromToday from "./days-from-today/meta";
import payment from "./payment-calculator/meta";
import proportion from "./proportion-calculator/meta";
import interestRate from "./interest-rate-calculator/meta";
import ratio from "./ratio-calculator/meta";
import age from "./age-calculator/meta";
import discount from "./discount-calculator/meta";
import hypotenuse from "./hypotenuse-calculator/meta";
import period from "./period-calculator/meta";
import rng from "./random-number-generator/meta";
import cubicYard from "./cubic-yard-calculator/meta";
import gravel from "./gravel-and-stone-calculator/meta";
import armyBodyFat from "./army-body-fat-calculator/meta";
import k401 from "./401k-calculator/meta";
import sand from "./sand-calculator/meta";
import rightTriangle from "./right-triangle-calculator/meta";

/**
 * Registry of PUBLISHED tools only (never list unbuilt tools → no broken links, no thin pages).
 * Add a tool: create src/tools/<slug>/meta.ts, import it here, add to TOOLS. That's the only wiring needed
 * for sitemap, category hubs, /tools/ index, home page and related-tool links.
 */
export const TOOLS: ToolMeta[] = [daysFromToday, payment, interestRate, discount, ratio, proportion, hypotenuse, rng, rightTriangle, age, period, armyBodyFat, cubicYard, gravel, sand, k401];

const bySlug = new Map(TOOLS.map((t) => [t.slug, t]));
export const getTool = (slug: string) => {
  const t = bySlug.get(slug);
  if (!t) throw new Error(`Tool not in registry: ${slug}`);
  return t;
};
export const toolsInCategory = (c: CategoryId) => TOOLS.filter((t) => t.category === c);

const tokens = (t: ToolMeta) =>
  new Set([t.name, t.primaryKw, ...t.keywords].join(" ").toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w)));
const STOP = new Set(["calculator", "calc", "the", "how", "what", "for", "and", "from", "with", "online", "free", "calculate", "find"]);

/**
 * Internal-linking engine: 1) hand-picked `related` (strongest intent match) 2) keyword-token overlap
 * 3) same category. Only returns published tools. Deterministic → stable link graph between builds.
 */
export function relatedTools(slug: string, limit = 6): ToolMeta[] {
  const me = bySlug.get(slug);
  if (!me) return [];
  const out: ToolMeta[] = [];
  for (const s of me.related) { const t = bySlug.get(s); if (t && t.slug !== slug) out.push(t); }
  const mine = tokens(me);
  const scored = TOOLS.filter((t) => t.slug !== slug && !out.includes(t))
    .map((t) => {
      let score = t.category === me.category ? 2 : 0;
      for (const w of tokens(t)) if (mine.has(w)) score += 1;
      if (t.related.includes(slug)) score += 3; // reciprocal links
      return { t, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.t.name.localeCompare(b.t.name));
  for (const { t } of scored) { if (out.length >= limit) break; out.push(t); }
  return out.slice(0, limit);
}
