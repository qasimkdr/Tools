import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "tire-size-calculator",
  name: "Tire Size Calculator",
  title: "Tire Size Calculator: Diameter, Comparison, Speedometer",
  description: "Convert a tire size like 225/65R17 to inches and compare two sizes: overall diameter, sidewall, width, revs per mile, speedometer error and the 3% rule.",
  short: "Tire dimensions in inches, plus a size comparison and speedometer error.",
  category: "everyday",
  primaryKw: "tire size calculator",
  keywords: ["tire size converter", "tire height calculator", "tire size comparison calculator", "tire aspect ratio", "tire dimension converter", "metric to inch tire size", "speedometer error tire size"],
  related: ["50-to-1-gas-oil-mix-calculator", "quarter-mile-calculator", "percent-calculator", "density-altitude-calculator"],
  sources: [
    { name: "NHTSA: Tire Safety, Everything Rides On It (PDF)", url: "https://www.nhtsa.gov/sites/nhtsa.gov/files/brochure.pdf" },
    { name: "Tire Rack: How do I read my tire size on my sidewall?", url: "https://tirerack.com/upgrade-garage/how-do-i-read-my-tire-size-on-my-sidewall" },
    { name: "Kelley Blue Book: How to decode tire numbers", url: "https://www.kbb.com/car-advice/tire-numbers/" },
    { name: "Jalopnik: What the 3% rule means for your tires", url: "https://jalopnik.com/2153604/what-three-percent-rule-means-for-tires" },
  ],
  published: "2026-11-23",
  updated: "2026-11-23",
  icon: "🛞",
};
export default meta;
