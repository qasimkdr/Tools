import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "weight-loss-percentage-calculator",
  name: "Weight Loss Percentage Calculator",
  title: "Weight Loss Percentage Calculator: % of Body Weight Lost",
  description: "Work out what percentage of your starting weight you have lost, how far you are toward your goal, your weekly rate, and the 5%, 10% and 15% milestone weights.",
  short: "Percent of body weight lost, progress to goal, weekly rate and milestones.",
  category: "health",
  primaryKw: "weight loss percentage calculator",
  keywords: ["figure out percentage of weight loss", "calculate weight loss in percentage", "percent body weight lost", "weight loss percent formula", "5 percent weight loss", "weight loss progress calculator", "weight gain percentage"],
  related: ["reverse-bmi-calculator", "bmr-calculator", "macro-calculator", "percent-calculator"],
  sources: [
    { name: "CDC: Steps for losing weight", url: "https://www.cdc.gov/healthy-weight-growth/losing-weight/index.html" },
    { name: "Penn Medicine: How to calculate your weight loss", url: "https://www.pennmedicine.org/updates/blogs/metabolic-and-bariatric-surgery-blog/2019/march/how-to-calculate-your-weight-loss" },
  ],
  publishAt: "2026-12-02T14:04:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-02",
  updated: "2026-12-02",
  icon: "📉",
};
export default meta;
