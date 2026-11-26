import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "timecode-calculator",
  name: "Timecode Calculator",
  title: "Timecode Calculator: Add, Subtract and Convert SMPTE",
  description: "Add or subtract SMPTE timecodes, convert timecode to frames and real time, or frames to timecode, at 23.976, 24, 25, 29.97 drop-frame, 30, 50, 59.94 or 60 fps.",
  short: "Add, subtract and convert SMPTE timecode and frames, drop-frame included.",
  category: "time-date",
  primaryKw: "timecode calculator",
  keywords: ["smpte timecode calculator", "frames to timecode", "timecode to frames", "drop frame timecode calculator", "29.97 timecode calculator", "video duration calculator", "timecode addition"],
  related: ["hours-calculator", "audiobook-speed-calculator", "aspect-ratio-calculator", "date-difference-calculator"],
  sources: [
    { name: "Wikipedia: SMPTE timecode (drop-frame rules)", url: "https://en.wikipedia.org/wiki/SMPTE_timecode" },
    { name: "Autodesk Flame help: Calculating timecode", url: "https://download.autodesk.com/us/systemdocs/help/2009/flame/files/WScba3ee2b36d8cb6f5241cd61162be49dca-7fda.htm" },
  ],
  publishAt: "2026-12-03T11:55:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-03",
  updated: "2026-12-03",
  icon: "🎬",
};
export default meta;
