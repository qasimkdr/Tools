import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "anniversary-calculator",
  name: "Anniversary Calculator",
  title: "Anniversary Calculator: Years Together and Next Date",
  description: "Find how long you've been married or together in years, months and days, the date and weekday of your next anniversary, day milestones and the traditional gift.",
  short: "Years, months and days together, your next anniversary and big milestones.",
  category: "time-date",
  primaryKw: "anniversary calculator",
  keywords: ["wedding anniversary calculator", "how long have we been married", "relationship anniversary calculator", "work anniversary calculator", "years of service calculator", "days together calculator", "1000 days anniversary"],
  related: ["date-difference-calculator", "age-calculator", "days-from-today", "half-birthday-calculator"],
  sources: [{ name: "The Knot: Milestone anniversary gift ideas by year", url: "https://www.theknot.com/content/milestone-anniversary-gift-ideas" }],
  publishAt: "2026-11-27T14:55:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-11-27",
  updated: "2026-11-27",
  icon: "💍",
};
export default meta;
