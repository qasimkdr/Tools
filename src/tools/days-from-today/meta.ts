import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "days-from-today",
  name: "Days From Today Calculator",
  title: "Days From Today Calculator – What Date Is X Days From Now?",
  description:
    "Find the exact date any number of days, weeks, months or business days from today (or ago). Skips weekends and US holidays, shows the weekday and a calendar.",
  short: "Find the date X days, weeks, months or business days from today or ago.",
  category: "time-date",
  primaryKw: "days from today",
  keywords: [
    "14 days from today", "90 days from today", "30 days from today", "weeks from today", "months from today",
    "business days from today", "days ago", "date from today", "what date is", "add days to date",
  ],
  related: ["date-calculator", "date-difference-calculator", "weeks-calculator", "age-calculator", "hours-calculator", "how-many-years-calculator"],
  sources: [{ name: "U.S. Office of Personnel Management: Federal holidays", url: "https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/" }],
  published: "2026-11-21",
  updated: "2026-11-21",
  icon: "🗓️",
};
export default meta;
