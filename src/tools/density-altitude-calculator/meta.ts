import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "density-altitude-calculator",
  name: "Density Altitude Calculator",
  title: "Density Altitude Calculator: From Temperature & Altimeter",
  description: "Find density altitude from field elevation, temperature, altimeter setting and dew point (NWS method), plus pressure altitude, ISA deviation and rule of thumb.",
  short: "Density and pressure altitude from elevation, temperature, altimeter and dew point.",
  category: "science",
  primaryKw: "density altitude calculator",
  keywords: ["density altitude", "pressure altitude calculator", "density altitude formula", "how to calculate density altitude", "isa temperature", "aviation density altitude"],
  related: ["scientific-notation-calculator", "wire-size-calculator", "molecular-weight-calculator", "steps-to-miles-calculator"],
  sources: [{ name: "National Weather Service: Density altitude calculation (PDF)", url: "https://www.weather.gov/media/epz/wxcalc/densityAltitude.pdf" }, { name: "Wikipedia: Density altitude", url: "https://en.wikipedia.org/wiki/Density_altitude" }],
  published: "2026-11-22",
  updated: "2026-11-22",
  icon: "✈️",
};
export default meta;
