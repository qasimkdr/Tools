import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "bowling-handicap-calculator",
  name: "Bowling Handicap Calculator",
  title: "Bowling Handicap Calculator: League Handicap From Average",
  description: "Work out your league bowling handicap from your average, the basis score and percentage, then see handicap scores for a game or series and your team handicap.",
  short: "League handicap from average, basis and percentage, plus team handicap.",
  category: "education",
  primaryKw: "bowling handicap calculator",
  keywords: ["how to calculate bowling handicap", "bowling handicap formula", "90 percent of 220 handicap", "bowling team handicap", "bowling average calculator", "handicap score bowling"],
  related: ["bowling-score-calculator", "average-calculator", "percent-calculator", "earned-run-average-calculator"],
  sources: [
    { name: "USBC: Handicap facts (PDF)", url: "https://images.bowl.com/bowl/media/legacy/internap/bowl/rules/pdfs/Handicap%20Facts.pdf" },
    { name: "Bowling.com BowlVersity: How to calculate bowling handicap", url: "https://www.bowlingball.com/BowlVersity/how-to-calculate-bowling-handicap" },
  ], // hidden until this time (scripts/publish-scheduled.mjs)
  publishAt: "2026-11-29T18:41:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-11-29",
  updated: "2026-11-29",
  icon: "🎳",
};
export default meta;
