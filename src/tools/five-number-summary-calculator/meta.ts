import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "five-number-summary-calculator",
  name: "Five Number Summary Calculator",
  title: "Five Number Summary Calculator: Quartiles, IQR, Box Plot",
  description: "Paste a data set to get the five number summary (min, Q1, median, Q3, max), the IQR, outlier fences and a box plot, with a choice of three quartile methods.",
  short: "Min, Q1, median, Q3 and max with IQR, outliers and a box plot.",
  category: "math",
  primaryKw: "five number summary calculator",
  keywords: ["5 number summary calculator", "quartile calculator", "iqr calculator", "box plot calculator", "interquartile range", "outlier calculator", "q1 q3 calculator"],
  related: ["standard-deviation-calculator", "average-calculator", "confidence-interval-calculator", "weighted-mean-calculator"],
  sources: [
    { name: "NIST/SEMATECH e-Handbook of Statistical Methods: Percentiles", url: "https://www.itl.nist.gov/div898/handbook/prc/section2/prc262.htm" },
    { name: "NIST/SEMATECH e-Handbook: Box plot", url: "https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm" },
    { name: "Hyndman & Fan (1996), Sample quantiles in statistical packages", url: "https://doi.org/10.1080/00031305.1996.10473566" },
  ], // hidden until this time (scripts/publish-scheduled.mjs)
  publishAt: "2026-11-29T18:41:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-11-29",
  updated: "2026-11-29",
  icon: "📦",
};
export default meta;
