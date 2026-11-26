import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "decathlon-calculator",
  name: "Decathlon Calculator",
  title: "Decathlon Calculator: Points for Each Event and Total",
  description: "Score a decathlon or heptathlon with World Athletics formulas: points per event, day totals and your overall score, plus the marks worth 1,000 points.",
  short: "Decathlon and heptathlon points per event and total, World Athletics formulas.",
  category: "education",
  primaryKw: "decathlon calculator",
  keywords: ["decathlon points calculator", "decathlon score calculator", "heptathlon calculator", "heptathlon points calculator", "combined events scoring", "iaaf scoring tables", "decathlon scoring formula"],
  related: ["earned-run-average-calculator", "dunk-calculator", "bench-press-max-calculator", "steps-to-miles-calculator"],
  sources: [
    { name: "Wikipedia: Decathlon (points system and formulas)", url: "https://en.wikipedia.org/wiki/Decathlon" },
    { name: "Wikipedia: Heptathlon (points system)", url: "https://en.wikipedia.org/wiki/Heptathlon" },
  ],
  publishAt: "2026-12-05T12:42:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-05",
  updated: "2026-12-05",
  icon: "🏅",
};
export default meta;
