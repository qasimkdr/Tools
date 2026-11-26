import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "sheep-gestation-calculator",
  name: "Sheep Gestation Calculator",
  title: "Sheep Gestation Calculator: Lambing Date and Ram Dates",
  description: "Find a ewe's lambing date from the breeding date (about 147 days), the flock's lambing period from ram-in and ram-out dates, or when to put the ram in.",
  short: "Lambing date (about 147 days), flock lambing period and when to turn in the ram.",
  category: "everyday",
  primaryKw: "sheep gestation calculator",
  keywords: ["gestation period for sheep calculator", "lambing date calculator", "ewe due date calculator", "how long are sheep pregnant", "sheep pregnancy calculator", "lambing calendar", "when to put the ram in"],
  related: ["goat-gestation-calculator", "horse-gestation-calculator", "dog-pregnancy-calculator", "days-from-today"],
  sources: [
    { name: "Montana State University Extension: Sheep reproduction", url: "https://animalrangeextension.montana.edu/sheep/reproduction.html" },
    { name: "Ontario Ministry of Agriculture (OMAFRA): Forecasting lamb production", url: "https://www.ontario.ca/page/forecasting-lamb-production" },
    { name: "MSD Veterinary Manual: Breeding, parturition and lamb diseases of sheep", url: "https://www.msdvetmanual.com/management-and-nutrition/preventative-health-care-and-husbandry-of-sheep/breeding,-parturition,-and-common-lamb-diseases-of-sheep" },
  ],
  publishAt: "2026-12-01T10:16:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-12-01",
  updated: "2026-12-01",
  icon: "🐑",
};
export default meta;
