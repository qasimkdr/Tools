import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "protein-calculator",
  name: "Protein Calculator",
  title: "Protein Calculator: How Much Protein Do I Need a Day?",
  description: "Find your daily protein target in grams from your weight and goal: everyday health, exercise, building muscle, over 65 or pregnancy, with per-meal amounts.",
  short: "Daily protein in grams for your weight and goal, with per-meal targets.",
  category: "health",
  primaryKw: "protein calculator",
  keywords: ["how much protein do i need", "protein intake calculator", "protein calculator for muscle gain", "protein requirement calculator", "protein per kg", "protein goal calculator", "daily protein intake"],
  related: ["macro-calculator", "bmr-calculator", "body-fat-calculator", "ffmi-calculator"],
  sources: [
    { name: "ISSN Position Stand: protein and exercise (2017)", url: "https://pubmed.ncbi.nlm.nih.gov/28642676/" },
    { name: "PROT-AGE Study Group (2013): protein intake in older people", url: "https://pubmed.ncbi.nlm.nih.gov/23867520/" },
    { name: "National Academies: Dietary Reference Intakes, macronutrient ranges", url: "https://nap.nationalacademies.org/read/11537/chapter/7" },
  ],
  published: "2026-11-23",
  updated: "2026-11-23",
  icon: "🍗",
};
export default meta;
