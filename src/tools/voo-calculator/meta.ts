import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "voo-calculator",
  name: "VOO Calculator",
  title: "VOO Calculator: Vanguard S&P 500 ETF Growth Projection",
  description: "Project what a VOO investment could grow to with monthly contributions, the 0.03% expense ratio and inflation, and compare your return assumption with VOO's record.",
  short: "Project a Vanguard S&P 500 ETF (VOO) investment with contributions and fees.",
  category: "finance",
  primaryKw: "voo calculator",
  keywords: ["voo return calculator", "voo growth calculator", "vanguard s&p 500 etf calculator", "s&p 500 investment calculator", "voo investment calculator", "how much will voo be worth", "voo expense ratio"],
  related: ["interest-calculator", "401k-calculator", "how-long-will-retirement-savings-last-calculator", "money-market-calculator"],
  sources: [
    { name: "Vanguard: VOO Vanguard S&P 500 ETF profile", url: "https://investor.vanguard.com/investment-products/etfs/profile/VOO" },
    { name: "Vanguard: S&P 500 ETF fact sheet (PDF)", url: "https://fund-docs.vanguard.com/F0968.pdf" },
  ],
  publishAt: "2026-11-27T14:55:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-11-27",
  updated: "2026-11-27",
  icon: "📈",
};
export default meta;
