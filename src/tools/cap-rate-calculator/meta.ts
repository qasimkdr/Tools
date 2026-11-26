import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "cap-rate-calculator",
  name: "Cap Rate Calculator",
  title: "Cap Rate Calculator: NOI, Capitalization Rate and Value",
  description: "Work out a rental property's cap rate from rent, vacancy and operating expenses, see the net operating income, and find the price that hits a target cap rate.",
  short: "Cap rate and NOI from rent, vacancy and expenses, plus value at a target cap rate.",
  category: "finance",
  primaryKw: "cap rate calculator",
  keywords: ["capitalization rate calculator", "cap rate formula", "net operating income calculator", "noi calculator", "rental property cap rate", "real estate cap rate", "property value from cap rate"],
  related: ["arv-calculator", "mortgage-calculator", "seller-financing-calculator", "npv-calculator"],
  sources: [
    { name: "Nareit: Capitalization rate (glossary)", url: "https://www.reit.com/glossary/capitalization-rate" },
    { name: "Corporate Finance Institute: Cap rate", url: "https://corporatefinanceinstitute.com/resources/commercial-real-estate/cap-rate/" },
  ], // hidden until this time (scripts/publish-scheduled.mjs)
  publishAt: "2026-11-28T14:26:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-11-28",
  updated: "2026-11-28",
  icon: "🏢",
};
export default meta;
