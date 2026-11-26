import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "minecraft-sphere-generator",
  name: "Minecraft Sphere Generator",
  title: "Minecraft Sphere Generator: Layer-by-Layer Block Guide",
  description: "Plan a block sphere, dome or ellipsoid for Minecraft: a layer-by-layer chart, blocks per layer, total blocks, stacks and shulker boxes, hollow or filled.",
  short: "Layer-by-layer block charts for spheres, domes and ellipsoids, with block counts.",
  category: "math",
  primaryKw: "sphere minecraft generator",
  keywords: ["minecraft sphere generator", "minecraft dome generator", "sphere generator minecraft", "minecraft sphere chart", "minecraft ellipsoid generator", "how to build a sphere in minecraft", "pixel sphere"],
  related: ["minecraft-circle", "nether-portal-calculator", "volume-calculator", "cylinder-volume-calculator"],
  sources: [
    { name: "Minecraft Wiki: Altitude (world height limits)", url: "https://minecraft.wiki/w/Altitude" },
    { name: "Minecraft Wiki: Shulker Box (27 slots)", url: "https://minecraft.wiki/w/Shulker_Box" },
  ],
  publishAt: "2026-11-30T10:21:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-11-30",
  updated: "2026-11-30",
  icon: "🔮",
};
export default meta;
