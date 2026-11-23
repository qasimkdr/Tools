import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "army-fitness-test-aft-calculator",
  name: "Army Fitness Test (AFT) Calculator",
  title: "AFT Calculator: Army Fitness Test Score, Official Tables",
  description: "Score the Army Fitness Test (AFT) with the official June 2025 tables: points for all 5 events, total, pass/fail for general and combat standards, and targets.",
  short: "AFT points for all 5 events, total score and pass/fail by standard.",
  category: "health",
  primaryKw: "aft calculator",
  keywords: ["army fitness test calculator", "army physical test calculator", "military pt test calculator", "aft score chart", "aft standards", "acft calculator", "army pt calculator"],
  related: ["army-body-fat-calculator", "bench-press-max-calculator", "steps-to-miles-calculator", "body-fat-calculator"],
  sources: [
    { name: "U.S. Army: AFT Scoring Scales (effective 1 June 2025, PDF)", url: "https://www.army.mil/e2/downloads/rv7/aft/AFT_Scoring_Scales_250601.pdf" },
    { name: "U.S. Army: Army Fitness Test", url: "https://www.army.mil/aft/" },
  ],
  published: "2026-11-23",
  updated: "2026-11-23",
  icon: "🎖️",
};
export default meta;
