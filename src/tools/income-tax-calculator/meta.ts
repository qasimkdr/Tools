import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "income-tax-calculator",
  name: "Income Tax Calculator",
  title: "Income Tax Calculator 2026: Federal Tax and Taxable Income",
  description: "Estimate your 2026 federal income tax: taxable income after deductions, tax by bracket, marginal and effective rates, using the official IRS 2026 tables.",
  short: "2026 federal income tax, taxable income and bracket breakdown.",
  category: "finance",
  primaryKw: "taxable income calculator",
  keywords: ["income tax calculator", "federal income tax calculator", "tax calculator online", "tax bracket calculator", "2026 tax brackets", "effective tax rate calculator", "how much tax will i pay"],
  related: ["paycheck-calculator", "modified-adjusted-gross-income-calculator", "401k-calculator", "pay-raise-calculator"],
  sources: [
    { name: "IRS: Tax inflation adjustments for tax year 2026 (IR-2025-103)", url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" },
    { name: "IRS Revenue Procedure 2025-32 (PDF)", url: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  ],
  published: "2026-11-23",
  updated: "2026-11-23",
  icon: "🧮",
};
export default meta;
