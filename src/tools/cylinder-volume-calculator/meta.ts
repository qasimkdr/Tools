import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "cylinder-volume-calculator",
  name: "Cylinder Volume Calculator",
  title: "Cylinder Volume Calculator: Gallons, Liters, Cubic Feet",
  description: "Find the volume of a cylinder from radius or diameter and height, in cubic feet, gallons, liters and m³. Handles pipes and partly filled tanks, with steps.",
  short: "Cylinder volume in ft³, gallons, liters and m³, plus pipes and partly filled tanks.",
  category: "math",
  primaryKw: "volume calculator cylinder",
  keywords: ["cylinder volume formula", "volume of a cylinder", "how to find volume of a cylinder", "cylinder volume in gallons", "tank volume", "hollow cylinder volume"],
  related: ["cubic-yard-calculator", "square-root-calculator", "right-triangle-calculator", "square-footage-calculator", "hypotenuse-calculator"],
  sources: [{ name: "Mississippi State University: Cylinder volume tool", url: "https://sdt13.abe.msstate.edu/tools/Volume/cylinder.php" }, { name: "NIST Handbook 44, Appendix C: General tables of units of measurement", url: "https://www.nist.gov/document/2026-nist-handbook-44-appendix-c" }],
  published: "2026-11-22",
  updated: "2026-11-22",
  icon: "🛢️",
};
export default meta;
