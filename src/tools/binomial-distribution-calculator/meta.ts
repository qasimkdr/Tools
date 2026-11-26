import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "binomial-distribution-calculator",
  name: "Binomial Distribution Calculator",
  title: "Binomial Distribution Calculator: P(X = k), Cumulative",
  description: "Find binomial probabilities: exactly k, at most, at least or between two values, plus mean, variance, a distribution chart, full table and working.",
  short: "Exact, cumulative and range binomial probabilities with chart, table and steps.",
  category: "math",
  primaryKw: "binomial distribution calculator",
  keywords: ["binomial probability calculator", "binomial cdf calculator", "binomial pdf calculator", "at least binomial probability", "binomial distribution table", "probability of k successes", "binomial mean and variance"],
  related: ["hypergeometric-calculator", "normal-cdf-calculator", "standard-deviation-calculator", "confidence-interval-calculator"],
  sources: [
    { name: "NIST/SEMATECH e-Handbook of Statistical Methods: Binomial distribution", url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm" },
    { name: "Penn State STAT 414: The binomial distribution", url: "https://online.stat.psu.edu/stat414/lesson/10" },
  ],
  publishAt: "2026-12-06T20:38:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-06",
  updated: "2026-12-06",
  icon: "🎲",
};
export default meta;
