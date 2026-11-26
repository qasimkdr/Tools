import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "roman-numeral-converter",
  name: "Roman Numeral Converter",
  title: "Roman Numeral Converter: Numbers, Dates and Years",
  description: "Convert numbers to Roman numerals and back, turn dates and years into Roman numerals, convert several at once and go above 3,999 with overlines.",
  short: "Numbers and dates to Roman numerals and back, with breakdown and big numbers.",
  category: "conversion",
  primaryKw: "roman letters converter",
  keywords: ["roman numeral converter", "roman numeral date converter", "roman numerals to numbers", "roman numeral generator", "year in roman numerals", "roman numeral birthday", "roman numerals chart"],
  related: ["binary-calculator", "scientific-notation-calculator", "date-difference-calculator", "age-calculator"],
  sources: [
    { name: "Encyclopaedia Britannica: Roman numeral", url: "https://www.britannica.com/topic/Roman-numeral" },
    { name: "Wikipedia: Roman numerals (standard form, vinculum)", url: "https://en.wikipedia.org/wiki/Roman_numerals" },
  ],
  publishAt: "2026-12-07T18:16:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-07",
  updated: "2026-12-07",
  icon: "🏛️",
};
export default meta;
