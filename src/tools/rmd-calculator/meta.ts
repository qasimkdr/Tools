import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "rmd-calculator",
  name: "RMD Calculator",
  title: "RMD Calculator 2026: Required Minimum Distribution",
  description: "Work out your 2026 required minimum distribution from an IRA or 401(k) with the IRS Uniform Lifetime Table, plus your start age, deadline and a projection.",
  short: "Required minimum distribution from the IRS table, start age, deadline and projection.",
  category: "finance",
  primaryKw: "rmd calculator",
  keywords: ["rmd calculator 2026", "required minimum distribution calculator", "ira rmd calculator", "401k rmd calculator", "uniform lifetime table", "rmd age", "how to calculate rmd"],
  related: ["401k-calculator", "how-long-will-retirement-savings-last-calculator", "income-tax-calculator", "money-market-calculator"],
  sources: [
    { name: "IRS Publication 590-B (2025), Distributions from IRAs, Appendix B Table III", url: "https://www.irs.gov/pub/irs-pdf/p590b.pdf" },
    { name: "IRS: Retirement plan and IRA required minimum distributions FAQs", url: "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs" },
  ],
  publishAt: "2026-12-06T20:38:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-06",
  updated: "2026-12-06",
  icon: "🧓",
};
export default meta;
