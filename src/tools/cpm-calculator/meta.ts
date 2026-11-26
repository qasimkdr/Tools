import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "cpm-calculator",
  name: "CPM Calculator",
  title: "CPM Calculator: Cost per 1,000 Impressions, Budget, Reach",
  description: "Calculate CPM (cost per 1,000 ad impressions), or find the budget or impressions from the other two, with CTR, CPC and a quick comparison of CPM and CPC.",
  short: "CPM, ad budget or impressions from the other two, plus CTR and CPC.",
  category: "finance",
  primaryKw: "cpm calculator",
  keywords: ["cost per mille calculator", "cost per thousand impressions", "cpm formula", "ad impressions calculator", "advertising budget calculator", "ecpm calculator", "cpm to cpc"],
  related: ["percent-calculator", "markup-calculator", "ratio-calculator", "proportion-calculator"],
  sources: [
    { name: "Google Ads Help: Cost-per-thousand impressions (CPM)", url: "https://support.google.com/google-ads/answer/6310" },
    { name: "Wikipedia: Cost per mille", url: "https://en.wikipedia.org/wiki/Cost_per_mille" },
  ],
  publishAt: "2026-12-02T14:04:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-02",
  updated: "2026-12-02",
  icon: "📢",
};
export default meta;
