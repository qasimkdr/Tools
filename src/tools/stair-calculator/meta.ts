import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "stair-calculator",
  name: "Stair Calculator",
  title: "Stair Calculator: Risers, Treads & Stringer Length",
  description: "Plan stairs from the total rise: number of steps, riser height, total run, stringer length and angle, with checks against common building-code limits.",
  short: "Steps, riser height, total run, stringer length and code checks from total rise.",
  category: "construction",
  primaryKw: "stairs calculator",
  keywords: ["stair stringer calculator", "step calculator", "deck stair calculator", "rise and run calculator", "stringer calculator", "stair riser height"],
  related: ["rafter-length-calculator", "concrete-calculator", "right-triangle-calculator", "hypotenuse-calculator"],
  sources: [{ name: "2021 International Residential Code, Chapter 3 (R311.7 stairways)", url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-3-building-planning" }],
  published: "2026-11-22",
  updated: "2026-11-22",
  icon: "🪜",
};
export default meta;
