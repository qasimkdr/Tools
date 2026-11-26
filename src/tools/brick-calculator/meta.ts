import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "brick-calculator",
  name: "Brick Calculator",
  title: "Brick Calculator: How Many Bricks and How Much Mortar",
  description: "Work out how many bricks a wall needs from its size, openings, brick size and joint width, plus mortar, waste and cost, for US or metric bricks.",
  short: "Bricks and mortar for a wall from its size, openings, brick size and joints.",
  category: "construction",
  primaryKw: "brick calculator",
  keywords: ["how many bricks do i need", "brick and mortar calculator", "bricks per square foot", "brick wall calculator", "mortar calculator", "brick estimator", "bricks per square metre"],
  related: ["cement-block-calculator", "concrete-calculator", "square-footage-calculator", "sand-calculator"],
  sources: [
    { name: "Brick Industry Association: Technical Notes (TN 10, dimensioning and estimating brick masonry)", url: "https://gobrick.com/resources/technical-notes" },
    { name: "Brick Development Association (UK): Brick calculator", url: "https://www.brick.org.uk/brick-calculator" },
  ],
  publishAt: "2026-12-06T20:38:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-06",
  updated: "2026-12-06",
  icon: "🧱",
};
export default meta;
