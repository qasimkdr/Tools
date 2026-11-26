import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "roofing-calculator",
  name: "Roofing Calculator",
  title: "Roofing Calculator: Roof Area, Squares and Shingle Bundles",
  description: "Estimate roof area from house size and pitch, then squares, shingle bundles with waste, ridge cap, drip edge and underlayment for gable, hip or shed roofs.",
  short: "Roof area, squares, shingle bundles, ridge cap and drip edge from size and pitch.",
  category: "construction",
  primaryKw: "roof calculator",
  keywords: ["roofing calculator", "shingle calculator", "roofing square calculator", "roof area calculator", "roof shingle calculator", "roofing cost calculator", "how many bundles of shingles"],
  related: ["rafter-length-calculator", "soffit-calculator", "square-footage-calculator", "linear-feet-calculator"],
  sources: [
    { name: "GAF: What is a roofing square?", url: "https://www.gaf.com/en-us/blog/your-home/what-is-a-roofing-square-f955fe18-daf9-4b0c-b78e-28ca178caa35" },
    { name: "GAF: How many bundles of shingles are in a square?", url: "https://www.gaf.com/en-us/blog/your-home/how-many-bundles-of-shingles-are-in-a-square---63a47862-f7e1-4e73-abcf-8d09917a8b8d" },
    { name: "IKO: How many shingles are in a bundle?", url: "https://www.iko.com/na/blog/how-many-shingles-in-a-bundle/" },
  ], // hidden until this time (scripts/publish-scheduled.mjs)
  publishAt: "2026-11-28T14:26:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-11-28",
  updated: "2026-11-28",
  icon: "🏠",
};
export default meta;
