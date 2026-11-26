import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "fence-calculator",
  name: "Fence Calculator",
  title: "Fence Calculator: Posts, Rails, Pickets and Cost",
  description: "Estimate a wood fence: posts, rails and pickets or boards from the length, post spacing, height and gates, with post length and an optional material cost.",
  short: "Posts, rails, pickets and cost for a wood fence from its length and gates.",
  category: "construction",
  primaryKw: "fence calculator",
  keywords: ["fence material calculator", "fence cost estimator", "how many fence posts do i need", "picket fence calculator", "privacy fence calculator", "fence post spacing", "fence board calculator"],
  related: ["fence-post-depth-calculator", "concrete-calculator", "linear-feet-calculator", "board-foot-calculator"],
  sources: [
    { name: "Hoover Fence: Fence calculators and installation notes", url: "https://www.hooverfence.com/calculators" },
  ],
  publishAt: "2026-12-04T14:13:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-04",
  updated: "2026-12-04",
  icon: "🚧",
};
export default meta;
