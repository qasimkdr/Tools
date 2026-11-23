import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "npv-calculator",
  name: "NPV Calculator",
  title: "NPV Calculator: Net Present Value, IRR & Payback Period",
  description: "Calculate the net present value of an investment from its cost, yearly cash flows and discount rate. Also shows IRR, payback period and a year-by-year table.",
  short: "Net present value with IRR, discounted payback and a year-by-year table.",
  category: "finance",
  primaryKw: "npv calculator",
  keywords: ["net present value calculator", "npv formula", "irr calculator", "discounted cash flow", "payback period", "profitability index"],
  related: ["interest-rate-calculator", "payment-calculator", "401k-calculator", "mortgage-calculator"],
  sources: [{ name: "Wikipedia: Net present value", url: "https://en.wikipedia.org/wiki/Net_present_value" }, { name: "Wikipedia: Present value", url: "https://en.wikipedia.org/wiki/Present_value" }],
  published: "2026-11-22",
  updated: "2026-11-22",
  icon: "📈",
};
export default meta;
