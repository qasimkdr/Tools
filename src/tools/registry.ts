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
import apWorld from "./ap-world-history-score-calculator/meta";
import gpa from "./gpa-calculator/meta";
import sqft from "./square-footage-calculator/meta";
import hours from "./hours-calculator/meta";
import bench from "./bench-press-max-calculator/meta";
import molWeight from "./molecular-weight-calculator/meta";
import bowling from "./bowling-score-calculator/meta";
import sqrt from "./square-root-calculator/meta";
import fraction from "./fraction-calculator/meta";
import mortgage from "./mortgage-calculator/meta";
import cylinder from "./cylinder-volume-calculator/meta";
import overtime from "./overtime-calculator/meta";
import paycheck from "./paycheck-calculator/meta";
import asphalt from "./asphalt-calculator/meta";
import apBio from "./ap-biology-score-calculator/meta";
import bmiWomen from "./bmi-women-calculator/meta";
import apChem from "./ap-chemistry-score-calculator/meta";
import concrete from "./concrete-calculator/meta";
import npvCalc from "./npv-calculator/meta";
import halfBday from "./half-birthday-calculator/meta";
import dogPreg from "./dog-pregnancy-calculator/meta";
import binary from "./binary-calculator/meta";
import poolSalt from "./pool-salt-calculator/meta";
import rafter from "./rafter-length-calculator/meta";
import stair from "./stair-calculator/meta";
import sciNot from "./scientific-notation-calculator/meta";
import gradeCalc from "./grade-calculator/meta";
import magi from "./modified-adjusted-gross-income-calculator/meta";
import moneyMarket from "./money-market-calculator/meta";
import confInt from "./confidence-interval-calculator/meta";
import superscript from "./superscript-generator/meta";
import era from "./earned-run-average-calculator/meta";
import apStats from "./ap-statistics-score-calculator/meta";
import gcf from "./gcf-calculator/meta";
import apr from "./apr-calculator/meta";
import wire from "./wire-size-calculator/meta";
import cone from "./cone-volume-calculator/meta";
import normCdf from "./normal-cdf-calculator/meta";
import matInv from "./matrix-inverse-calculator/meta";
import ccPayoff from "./credit-card-payoff-calculator/meta";
import skirt from "./circle-skirt-calculator/meta";
import crossStitch from "./cross-stitch-calculator/meta";
import fillDirt from "./fill-dirt-calculator/meta";
import hyper from "./hypergeometric-calculator/meta";
import stud from "./stud-calculator/meta";
import boardFoot from "./board-foot-calculator/meta";
import soffit from "./soffit-calculator/meta";
import apLang from "./ap-english-language-score-calculator/meta";
import moneyCounter from "./money-counter/meta";
import ffmi from "./ffmi-calculator/meta";
import dunk from "./dunk-calculator/meta";
import horseGest from "./horse-gestation-calculator/meta";
import linearFeet from "./linear-feet-calculator/meta";
import proRata from "./pro-rata-calculator/meta";
import water from "./water-intake-calculator/meta";
import stepsMiles from "./steps-to-miles-calculator/meta";
import mcCircle from "./minecraft-circle/meta";
import densityAlt from "./density-altitude-calculator/meta";
import heightCalc from "./height-calculator/meta";
import weightedMeanCalc from "./weighted-mean-calculator/meta";
import stdDev from "./standard-deviation-calculator/meta";
import bodyFat from "./body-fat-calculator/meta";
import tile from "./tile-calculator/meta";
import sourdough from "./sourdough-calculator/meta";
import payRaise from "./pay-raise-calculator/meta";
import audiobook from "./audiobook-speed-calculator/meta";
import cdCalc from "./cd-calculator/meta";
import areaCalc from "./area-calculator/meta";
import gradeCurve from "./grade-curve-calculator/meta";
import btu from "./btu-calculator/meta";
import arrowSpeed from "./arrow-speed-calculator/meta";
import volumeCalc from "./volume-calculator/meta";
import productivity from "./productivity-calculator/meta";
import dateDiff from "./date-difference-calculator/meta";
import bloodPressure from "./blood-pressure-by-age-calculator/meta";
import ohmsLaw from "./ohms-law-calculator/meta";
import interestCalc from "./interest-calculator/meta";
import recessed from "./recessed-light-calculator/meta";
import fencePost from "./fence-post-depth-calculator/meta";
import pineStraw from "./pine-straw-calculator/meta";
import leadTime from "./lead-time-calculator/meta";
import molarity from "./molarity-calculator/meta";
import wattsAmps from "./watts-to-amps-calculator/meta";
import timeOff from "./time-off-calculator/meta";
import decimals from "./decimals-calculator/meta";
import epoxy from "./epoxy-resin-calculator/meta";

/**
 * Registry of PUBLISHED tools only (never list unbuilt tools → no broken links, no thin pages).
 * Add a tool: create src/tools/<slug>/meta.ts, import it here, add to TOOLS. That's the only wiring needed
 * for sitemap, category hubs, /tools/ index, home page and related-tool links.
 */
export const TOOLS: ToolMeta[] = [daysFromToday, payment, interestRate, discount, ratio, proportion, hypotenuse, rng, rightTriangle, age, hours, period, armyBodyFat, bench, cubicYard, gravel, sand, sqft, k401, mortgage, gpa, apWorld, bowling, fraction, sqrt, molWeight, cylinder, overtime, paycheck, asphalt, apBio, bmiWomen, apChem, concrete, npvCalc, halfBday, dogPreg, binary, poolSalt, rafter, stair, sciNot, gradeCalc, magi, moneyMarket, confInt, superscript, era, apStats, gcf, apr, wire, cone, normCdf, matInv, ccPayoff, skirt, crossStitch, fillDirt, hyper, stud, boardFoot, soffit, apLang, moneyCounter, ffmi, dunk, horseGest, linearFeet, proRata, water, stepsMiles, mcCircle, densityAlt, heightCalc, weightedMeanCalc, stdDev, bodyFat, tile, sourdough, payRaise, audiobook, cdCalc, areaCalc, gradeCurve, btu, arrowSpeed, volumeCalc, productivity, dateDiff, bloodPressure, ohmsLaw, interestCalc, recessed, fencePost, pineStraw, leadTime, molarity, wattsAmps, timeOff, decimals, epoxy];

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

// Topic neighbours used only to fill a block when a tool has too few close matches.
const NEIGHBOURS: Record<CategoryId, CategoryId[]> = {
  finance: ["time-date", "math"], "time-date": ["finance", "everyday"], math: ["science", "education"], science: ["math", "construction"],
  construction: ["math", "everyday"], health: ["education", "everyday"], education: ["math", "health"], everyday: ["time-date", "math"],
  conversion: ["math", "science"], text: ["math", "everyday"],
};
const RELATED_SIZE = 6, MIN_INBOUND = 3;

/** Topical relevance of b for a page about a (keyword overlap, category, hand-picked links in either direction). */
function relevance(a: ToolMeta, b: ToolMeta) {
  const ta = tokens(a);
  let score = 0;
  for (const w of tokens(b)) if (ta.has(w)) score += 1;
  if (a.category === b.category) score += 2;
  else if (NEIGHBOURS[a.category]?.includes(b.category)) score += 0.5;
  if (a.related.includes(b.slug) || b.related.includes(a.slug)) score += 3;
  return score;
}

/**
 * Internal-linking engine, computed once at build time (static HTML, no client JS):
 * 1) hand-picked `related` (published only), 2) closest matches by keyword/category/reciprocal links,
 * 3) fill to 6 from neighbouring topics, then the site's most-linked tools, so every page shows 6;
 * 4) every tool appears in ≥3 other tools' blocks: under-linked tools replace the weakest auto-picked card
 *    on their most relevant pages (hand-picked cards are never replaced). Deterministic → stable link graph.
 */
let GRAPH: Map<string, ToolMeta[]> | null = null;
function buildGraph() {
  const byName = (x: ToolMeta, y: ToolMeta) => x.name.localeCompare(y.name);
  const lists = new Map<string, ToolMeta[]>(), explicit = new Map<string, Set<string>>();
  for (const me of TOOLS) {
    const picks = me.related.map((s) => bySlug.get(s)).filter((t): t is ToolMeta => !!t && t.slug !== me.slug);
    explicit.set(me.slug, new Set(picks.map((t) => t.slug)));
    const rest = TOOLS.filter((t) => t.slug !== me.slug && !picks.includes(t))
      .map((t) => ({ t, r: relevance(me, t) }))
      .filter((x) => x.r >= 1)
      .sort((x, y) => y.r - x.r || byName(x.t, y.t))
      .map((x) => x.t);
    lists.set(me.slug, [...picks, ...rest].slice(0, RELATED_SIZE));
  }
  const inbound = () => { const c = new Map(TOOLS.map((t) => [t.slug, 0])); for (const l of lists.values()) for (const t of l) c.set(t.slug, (c.get(t.slug) ?? 0) + 1); return c; };
  // Fill short blocks: neighbouring topics first, then most-linked tools.
  let inb = inbound();
  for (const me of TOOLS) {
    const l = lists.get(me.slug)!;
    if (l.length >= RELATED_SIZE) continue;
    const pool = TOOLS.filter((t) => t.slug !== me.slug && !l.includes(t))
      .sort((x, y) => relevance(me, y) - relevance(me, x) || (inb.get(y.slug) ?? 0) - (inb.get(x.slug) ?? 0) || byName(x, y));
    l.push(...pool.slice(0, RELATED_SIZE - l.length));
  }
  // Guarantee inbound links for under-linked tools.
  inb = inbound();
  const weak = [...TOOLS].sort((x, y) => (inb.get(x.slug) ?? 0) - (inb.get(y.slug) ?? 0) || byName(x, y));
  for (const target of weak) {
    if ((inb.get(target.slug) ?? 0) >= MIN_INBOUND) continue;
    const hosts = TOOLS.filter((h) => h.slug !== target.slug && !lists.get(h.slug)!.includes(target))
      .map((h) => ({ h, r: relevance(h, target) })).filter((x) => x.r >= 1)
      .sort((x, y) => y.r - x.r || byName(x.h, y.h));
    for (const { h } of hosts) {
      if ((inb.get(target.slug) ?? 0) >= MIN_INBOUND) break;
      const l = lists.get(h.slug)!, fixed = explicit.get(h.slug)!;
      // Weakest replaceable card on a topically related page: auto-picked and still well linked after removal.
      const cands = l.map((t, i) => ({ t, i, r: relevance(h, t) }))
        .filter((x) => !fixed.has(x.t.slug) && (inb.get(x.t.slug) ?? 0) > MIN_INBOUND)
        .sort((x, y) => x.r - y.r || (inb.get(y.t.slug) ?? 0) - (inb.get(x.t.slug) ?? 0));
      if (!cands.length) continue;
      const out = cands[0];
      l[out.i] = target;
      inb.set(out.t.slug, (inb.get(out.t.slug) ?? 0) - 1);
      inb.set(target.slug, (inb.get(target.slug) ?? 0) + 1);
    }
  }
  return lists;
}

export function relatedTools(slug: string, limit = RELATED_SIZE): ToolMeta[] {
  GRAPH ??= buildGraph();
  return (GRAPH.get(slug) ?? []).slice(0, limit);
}
