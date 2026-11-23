import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "vpd-calculator",
  name: "VPD Calculator",
  title: "VPD Calculator: Leaf Vapor Pressure Deficit & Chart",
  description: "Calculate leaf and air vapor pressure deficit (VPD) from temperature, humidity and leaf temperature, with targets for each growth stage and a VPD chart.",
  short: "Leaf and air VPD in kPa, target humidity for each growth stage, and a VPD chart.",
  category: "science",
  primaryKw: "vpd calculator",
  keywords: ["vapor pressure deficit calculator", "vpd chart", "leaf vpd", "grow room humidity calculator", "vpd for flowering", "dew point calculator"],
  related: ["density-altitude-calculator", "water-intake-calculator", "molarity-calculator", "btu-calculator"],
  sources: [{ name: "Wikipedia: Vapour-pressure deficit", url: "https://en.wikipedia.org/wiki/Vapour-pressure_deficit" }, { name: "Wikipedia: Tetens equation", url: "https://en.wikipedia.org/wiki/Tetens_equation" }],
  published: "2026-11-23",
  updated: "2026-11-23",
  icon: "🌱",
};
export default meta;
