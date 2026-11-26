import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "drywall-calculator",
  name: "Drywall Calculator",
  title: "Drywall Calculator: Sheets, Joint Compound and Tape",
  description: "Estimate drywall for a room: wall and ceiling area minus doors and windows, sheets of 4×8, 4×10 or 4×12 with waste, joint compound, tape and an optional cost.",
  short: "Drywall sheets for a room, plus joint compound, tape and cost.",
  category: "construction",
  primaryKw: "drywall calculator",
  keywords: ["sheetrock calculator", "how many sheets of drywall do i need", "drywall estimate", "drywall square footage", "joint compound calculator", "drywall tape calculator", "drywall cost calculator"],
  related: ["stud-calculator", "square-footage-calculator", "linear-feet-calculator", "recessed-light-calculator"],
  sources: [
    { name: "USG: Sheetrock UltraLightweight joint compound (coverage)", url: "https://www.usg.com/content/usgcom/en/products-solutions/products/finishes/joint-compounds/sheetrockbrandultralightweightallpurposejointcompound.html" },
    { name: "USG: Drywall finishing guide (Fine Homebuilding PDF)", url: "https://images.finehomebuilding.com/app/uploads/2006/12/27185634/USG_Drywall_Finishing.pdf" },
    { name: "CertainTeed: Drywall calculator and panel sizes", url: "https://www.certainteed.com/drywall-calculator" },
  ],
  publishAt: "2026-12-02T14:04:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-02",
  updated: "2026-12-02",
  icon: "🧱",
};
export default meta;
