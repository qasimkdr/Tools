import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "target-heart-rate-calculator",
  name: "Target Heart Rate Calculator",
  title: "Target Heart Rate Calculator: Max HR and Training Zones",
  description: "Find your maximum heart rate and target heart rate for moderate and vigorous exercise, with 5 training zones, Karvonen and four max HR formulas.",
  short: "Max heart rate, CDC moderate and vigorous targets, 5 zones and Karvonen.",
  category: "health",
  primaryKw: "max heart rate calculator",
  keywords: ["target heart rate calculator", "maximum heart rate calculator", "heart rate zones calculator", "karvonen formula calculator", "fat burning heart rate", "max hr calculator", "target hr by age"],
  related: ["bmr-calculator", "steps-to-miles-calculator", "blood-pressure-by-age-calculator", "macro-calculator"],
  sources: [
    { name: "CDC: Target heart rate and estimated maximum heart rate", url: "https://www.cdc.gov/physicalactivity/basics/measuring/heartrate.htm" },
    { name: "Tanaka, Monahan & Seals (2001), Age-predicted maximal heart rate revisited, JACC", url: "https://pubmed.ncbi.nlm.nih.gov/11153730/" },
    { name: "Nes et al. (2013), Age-predicted maximal heart rate in healthy subjects: the HUNT Fitness Study", url: "https://pubmed.ncbi.nlm.nih.gov/22376273/" },
  ],
  publishAt: "2026-12-07T18:16:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-07",
  updated: "2026-12-07",
  icon: "❤️",
};
export default meta;
