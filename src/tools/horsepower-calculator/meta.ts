import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "horsepower-calculator",
  name: "Horsepower Calculator",
  title: "Horsepower Calculator: Torque, RPM, kW and Work",
  description: "Find horsepower from torque and RPM, torque from horsepower, convert hp to kW and metric PS, or work out the power needed to lift a load a distance in a time.",
  short: "Horsepower from torque and RPM, hp to kW and PS, and power from work done.",
  category: "science",
  primaryKw: "horsepower calculator",
  keywords: ["torque to horsepower calculator", "hp calculator", "rpm to horsepower", "horsepower to torque", "hp to kw", "kw to hp", "horsepower formula"],
  related: ["quarter-mile-calculator", "watts-to-amps-calculator", "ohms-law-calculator", "btu-calculator"],
  sources: [
    { name: "NIST Special Publication 811: Guide for the Use of the SI (conversion factors)", url: "https://www.nist.gov/pml/special-publication-811" },
    { name: "Wikipedia: Horsepower (definitions and history)", url: "https://en.wikipedia.org/wiki/Horsepower" },
  ], // hidden until this time (scripts/publish-scheduled.mjs)
  publishAt: "2026-11-28T14:26:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-11-28",
  updated: "2026-11-28",
  icon: "🏎️",
};
export default meta;
