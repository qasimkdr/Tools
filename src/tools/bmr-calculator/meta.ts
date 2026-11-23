import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "bmr-calculator",
  name: "BMR Calculator",
  title: "BMR Calculator: Mifflin-St Jeor, Harris-Benedict, Katch",
  description: "Calculate your basal metabolic rate with the Mifflin-St Jeor, revised Harris-Benedict and Katch-McArdle equations side by side, plus daily calories by activity.",
  short: "Basal metabolic rate with 3 equations compared, plus daily calories by activity.",
  category: "health",
  primaryKw: "bmr calculator",
  keywords: ["mifflin st jeor calculator", "harris benedict calculator", "katch mcardle calculator", "basal metabolic rate calculator", "resting metabolic rate", "bmr formula", "tdee from bmr"],
  related: ["macro-calculator", "body-fat-calculator", "breastfeeding-calorie-calculator", "ffmi-calculator"],
  sources: [
    { name: "Mifflin et al. (1990), A new predictive equation for resting energy expenditure", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/" },
    { name: "Roza & Shizgal (1984), The Harris Benedict equation reevaluated", url: "https://pubmed.ncbi.nlm.nih.gov/6741850/" },
    { name: "FAO/WHO/UNU: Human Energy Requirements (physical activity levels)", url: "https://www.fao.org/3/y5686e/y5686e00.htm" },
  ],
  published: "2026-11-23",
  updated: "2026-11-23",
  icon: "🔥",
};
export default meta;
