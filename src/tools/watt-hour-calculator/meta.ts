import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "watt-hour-calculator",
  name: "Watt Hour Calculator",
  title: "Watt Hour Calculator: Wh, kWh, mAh, Runtime and Cost",
  description: "Convert watts and hours to watt-hours and kWh with the energy cost, amp-hours or mAh to Wh for batteries (with FAA flight limits), or find a battery's runtime.",
  short: "Wh and kWh from watts and hours, battery mAh/Ah to Wh, runtime and cost.",
  category: "science",
  primaryKw: "watt hour calculator",
  keywords: ["wh calculator", "mah to wh", "amp hours to watt hours", "watts to watt hours", "battery runtime calculator", "kwh cost calculator", "wh to mah"],
  related: ["watts-to-amps-calculator", "ohms-law-calculator", "horsepower-calculator", "btu-calculator"],
  sources: [
    { name: "FAA PackSafe: Airline passengers and batteries", url: "https://www.faa.gov/hazmat/packsafe/airline-passengers-and-batteries" },
    { name: "NIST SP 811: Guide for the Use of the SI (energy units)", url: "https://www.nist.gov/pml/special-publication-811" },
  ],
  publishAt: "2026-12-03T11:55:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-03",
  updated: "2026-12-03",
  icon: "🔋",
};
export default meta;
