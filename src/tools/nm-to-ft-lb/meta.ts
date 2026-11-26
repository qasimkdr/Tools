import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "nm-to-ft-lb",
  name: "Nm to ft-lb Converter",
  title: "Nm to ft-lb Converter: Newton-Metres to Foot-Pounds",
  description: "Convert newton-metres to foot-pounds and back (1 N·m = 0.7376 ft·lb), plus inch-pounds, kgf·m, kgf·cm and ozf·in, with a printable torque conversion chart.",
  short: "Newton-metres to foot-pounds and other torque units, with a chart.",
  category: "science",
  primaryKw: "n-m to ft lbs converter",
  keywords: ["nm to ft lb", "newton meters to foot pounds", "ft lb to nm", "torque conversion", "nm to in lb", "torque converter", "foot pounds to newton meters"],
  related: ["horsepower-calculator", "quarter-mile-calculator", "tire-size-calculator", "50-to-1-gas-oil-mix-calculator"],
  sources: [
    { name: "NIST SP 811: Guide for the Use of the SI (Appendix B conversion factors)", url: "https://www.nist.gov/pml/special-publication-811" },
  ],
  publishAt: "2026-12-04T14:13:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-04",
  updated: "2026-12-04",
  icon: "🔧",
};
export default meta;
