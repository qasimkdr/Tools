import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "reverse-bmi-calculator",
  name: "Reverse BMI Calculator",
  title: "Reverse BMI Calculator: Weight for a Target BMI",
  description: "Find the weight that gives a target BMI at your height, the healthy weight range for your height, and how far your current weight is from it, in lb or kg.",
  short: "Weight for any target BMI at your height, plus your healthy weight range.",
  category: "health",
  primaryKw: "reverse bmi calculator",
  keywords: ["bmi to weight calculator", "target weight for bmi", "healthy weight for my height", "weight for bmi 25", "ideal weight from bmi", "goal weight calculator bmi", "inverse bmi"],
  related: ["bmi-women-calculator", "body-fat-calculator", "bmr-calculator", "macro-calculator"],
  sources: [
    { name: "CDC: Adult BMI categories", url: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" },
    { name: "CDC: Steps for losing weight", url: "https://www.cdc.gov/healthy-weight-growth/losing-weight/index.html" },
    { name: "WHO Expert Consultation (Lancet 2004): Appropriate BMI for Asian populations", url: "https://pubmed.ncbi.nlm.nih.gov/14726171/" },
  ],
  publishAt: "2026-11-30T10:21:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-11-30",
  updated: "2026-11-30",
  icon: "⚖️",
};
export default meta;
