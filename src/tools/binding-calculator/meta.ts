import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "binding-calculator",
  name: "Quilt Binding Calculator",
  title: "Quilt Binding Calculator: Strips, Length and Yardage",
  description: "Work out quilt binding: total length, how many strips to cut across the fabric, and the yardage to buy, for straight-grain or continuous bias binding.",
  short: "Binding length, strips to cut and yardage for straight-grain or bias binding.",
  category: "everyday",
  primaryKw: "binding calculator",
  keywords: ["quilt binding calculator", "how much binding for a quilt", "binding yardage calculator", "bias binding calculator", "binding strips calculator", "quilt binding length", "continuous bias binding"],
  related: ["cross-stitch-calculator", "circle-skirt-calculator", "square-footage-calculator", "linear-feet-calculator"],
  sources: [
    { name: "Utah State University Extension: Binding a quilt", url: "https://extension.usu.edu/sewing/research/binding-a-quilt" },
    { name: "Utah State University Extension: Double crosswise grain binding", url: "https://extension.usu.edu/sewing/research/double-crosswise-grain-binding" },
  ],
  publishAt: "2026-12-01T10:16:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-01",
  updated: "2026-12-01",
  icon: "🧵",
};
export default meta;
