import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "productivity-calculator",
  name: "Productivity Calculator",
  title: "Productivity Calculator: Output per Hour & per Worker",
  description: "Calculate labor productivity as output per hour or per worker, compare it with a previous period to get the percentage change, and find hours a target needs.",
  short: "Labor productivity per hour or worker, % change and hours for a target.",
  category: "finance",
  primaryKw: "productivity calculator",
  keywords: ["labor productivity calculator", "how to calculate productivity", "productivity formula", "output per hour", "revenue per employee", "employee productivity calculator"],
  related: ["hours-calculator", "overtime-calculator", "pay-raise-calculator", "ratio-calculator"],
  sources: [{ name: "U.S. Bureau of Labor Statistics: Productivity glossary", url: "https://www.bls.gov/productivity/glossary.htm" }, { name: "BLS Handbook of Methods: Productivity calculation", url: "https://www.bls.gov/opub/hom/opt/calculation.htm" }],
  published: "2026-11-23",
  updated: "2026-11-23",
  icon: "⚙️",
};
export default meta;
