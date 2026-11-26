import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "running-record-calculator",
  name: "Running Record Calculator",
  title: "Running Record Calculator: Accuracy, Error and SC Rate",
  description: "Score a reading running record: accuracy percentage and level, error rate, self-correction rate, and reading speed in words and words correct per minute.",
  short: "Running record accuracy, error rate, self-correction rate and reading speed.",
  category: "education",
  primaryKw: "running record calculator",
  keywords: ["running record accuracy calculator", "running record scoring", "self correction rate calculator", "reading accuracy percentage", "error rate running record", "words correct per minute calculator", "reading level accuracy"],
  related: ["grade-calculator", "percent-calculator", "gpa-calculator", "grade-curve-calculator"],
  sources: [
    { name: "Reading A–Z: Scoring and analyzing a running record", url: "https://www.readinga-z.com/helpful-tools/about-running-records/scoring-a-running-record/" },
    { name: "Kansas State University (Pressbooks): Teaching literacy, Running records", url: "https://kstatelibraries.pressbooks.pub/teachingliteracydraft/chapter/running-records/" },
  ],
  publishAt: "2026-12-05T12:42:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-05",
  updated: "2026-12-05",
  icon: "📖",
};
export default meta;
