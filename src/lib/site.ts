export const SITE = {
  name: "Mathico",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://mathico.xyz").replace(/\/$/, ""),
  tagline: "Free, accurate calculators that show their work",
  description:
    "Mathico offers free, fast and accurate online calculators for dates, money, math, health, construction and more, with clear formulas, worked examples and no sign-up.",
  locale: "en_US",
  twitter: "",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  // Editorial identity (E-E-A-T): the real person responsible for the content. Bio: /about/mohammad-qasim/.
  editor: {
    name: "Mohammad Qasim",
    role: "Founder & Editor",
    url: "/about/mohammad-qasim/",
    bio: "Mohammad Qasim is a software and web developer and the founder and editor of Mathico. Mohammad builds and maintains every calculator, checks formulas against official and primary sources, and tests each tool against hand-worked examples before it goes live.",
  },
} as const;

export type CategoryId =
  | "time-date" | "finance" | "math" | "health" | "construction"
  | "science" | "education" | "conversion" | "everyday" | "text";

export const CATEGORIES: Record<CategoryId, { name: string; blurb: string; icon: string }> = {
  "time-date": { name: "Date & Time", blurb: "Count days, add weeks, find ages and plan deadlines.", icon: "🗓️" },
  finance: { name: "Finance", blurb: "Loans, interest, pay, tax and savings, worked out clearly.", icon: "💵" },
  math: { name: "Math", blurb: "Ratios, fractions, geometry and algebra with steps.", icon: "➗" },
  health: { name: "Health & Fitness", blurb: "Body metrics, fitness tests and cycle tracking.", icon: "💪" },
  construction: { name: "Home & Construction", blurb: "Material estimates for concrete, gravel, soil and more.", icon: "🏗️" },
  science: { name: "Science & Engineering", blurb: "Chemistry, electricity and physics made simple.", icon: "🔬" },
  education: { name: "Education & Sports", blurb: "Grades, GPA, AP scores and game stats.", icon: "🎓" },
  conversion: { name: "Converters", blurb: "Units, measurements and number formats.", icon: "🔁" },
  everyday: { name: "Everyday Life", blurb: "Handy tools for parties, pets, hobbies and home.", icon: "✨" },
  text: { name: "Text Tools", blurb: "Generators and formatters for text.", icon: "🔤" },
};

export const abs = (path: string) => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
