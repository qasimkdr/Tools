import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "decking-calculator",
  name: "Decking Calculator",
  title: "Decking Calculator: Deck Boards, Joists and Screws",
  description: "Work out how many deck boards you need from the deck size, board width, gap and length, plus joists, screws and cost, with a table of board lengths to compare.",
  short: "Deck boards, joists, screws and cost from deck size and board width.",
  category: "construction",
  primaryKw: "deck board calculator",
  keywords: ["deck calculator", "decking calculator", "how many deck boards do i need", "composite decking calculator", "deck joist calculator", "deck screws calculator", "deck material calculator"],
  related: ["stair-calculator", "board-foot-calculator", "square-footage-calculator", "concrete-calculator"],
  sources: [
    { name: "Trex: How to space deck boards", url: "https://www.trex.com/deck-ideas/how-to-space-deck-boards" },
    { name: "Trex Academy: How to install deck joists", url: "https://www.trex.com/academy/how-to-guides/all-guides/how-to-install-deck-joists" },
  ],
  publishAt: "2026-12-04T14:13:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-04",
  updated: "2026-12-04",
  icon: "🪚",
};
export default meta;
