import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "macro-calculator",
  name: "Macro Calculator",
  title: "Macro Calculator: Protein, Carbs and Fat per Day",
  description: "Calculate your daily calories and macros (protein, carbs and fat in grams) to lose weight, maintain or build muscle, checked against official healthy ranges.",
  short: "Daily calories plus protein, carb and fat grams for your goal.",
  category: "health",
  primaryKw: "macro calculator",
  keywords: ["calculate macros", "calculate macros for weight loss", "macronutrient calculator", "calorie and macro calculator", "bulking calculator", "muscle gain nutrition calculator", "macro calculator for women", "protein intake calculator"],
  related: ["breastfeeding-calorie-calculator", "body-fat-calculator", "ffmi-calculator", "water-intake-calculator"],
  sources: [
    { name: "National Academies: Dietary Reference Intakes, macronutrient ranges (AMDR)", url: "https://nap.nationalacademies.org/read/11537/chapter/7" },
    { name: "ISSN Position Stand: protein and exercise (2017)", url: "https://pubmed.ncbi.nlm.nih.gov/28642676/" },
    { name: "Mifflin et al. (1990), A new predictive equation for resting energy expenditure", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/" },
    { name: "FAO/WHO/UNU: Human Energy Requirements (physical activity levels)", url: "https://www.fao.org/3/y5686e/y5686e00.htm" },
  ],
  published: "2026-11-23",
  updated: "2026-11-23",
  icon: "🥗",
};
export default meta;
