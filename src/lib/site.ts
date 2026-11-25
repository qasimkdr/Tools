export const SITE = {
  name: "Mathico",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://mathico.xyz").replace(/\/$/, ""),
  tagline: "Free, accurate calculators that show their work",
  description:
    "Free, accurate online calculators for dates, money, math, health and home projects, each with the formula, worked examples and no sign-up needed.",
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

export const CATEGORIES: Record<CategoryId, { name: string; blurb: string; desc: string; icon: string }> = {
  "time-date": { name: "Date & Time", blurb: "Count days, add weeks, find ages and plan deadlines.", desc: "Free date and time calculators: count days from today, find the date difference, your exact age, half birthdays, hours worked and lead times, all with steps.", icon: "🗓️" },
  finance: { name: "Finance", blurb: "Loans, interest, pay, tax and savings, worked out clearly.", desc: "Free finance calculators for loans, mortgages, APR, interest, pay, taxes, 401(k) and retirement, each showing the formula and a worked example you can check.", icon: "💵" },
  math: { name: "Math", blurb: "Ratios, fractions, geometry and algebra with steps.", desc: "Free math calculators with steps: percentages, ratios, fractions, radicals, geometry, statistics, partial fractions and implicit derivatives, all worked out.", icon: "➗" },
  health: { name: "Health & Fitness", blurb: "Body metrics, fitness tests and cycle tracking.", desc: "Free health and fitness calculators: BMR, macros, protein, body fat, BMI for women, water intake and the Army fitness test, using published formulas.", icon: "💪" },
  construction: { name: "Home & Construction", blurb: "Material estimates for concrete, gravel, soil and more.", desc: "Free home and construction calculators to estimate concrete, gravel, sand, block, tile, studs, stairs and rafters, with waste allowances and cost estimates.", icon: "🏗️" },
  science: { name: "Science & Engineering", blurb: "Chemistry, electricity and physics made simple.", desc: "Free science and engineering calculators: Ohm's law, watts to amps, wire size, molarity, molecular weight and density altitude, with formulas and examples.", icon: "🔬" },
  education: { name: "Education & Sports", blurb: "Grades, GPA, AP scores and game stats.", desc: "Free education and sports calculators for GPA, grades, grade curves, AP exam scores, bowling scores and ERA, with the scoring rules explained step by step.", icon: "🎓" },
  conversion: { name: "Converters", blurb: "Units, measurements and number formats.", desc: "Free unit converters and number format tools for measurements, number systems and everyday conversions, with the formula shown for every result you get.", icon: "🔁" },
  everyday: { name: "Everyday Life", blurb: "Handy tools for parties, pets, hobbies and home.", desc: "Free everyday calculators for splitting bills, tips, wedding drinks, tire sizes, pet pregnancy dates, sourdough and more, each with clear worked examples.", icon: "✨" },
  text: { name: "Text Tools", blurb: "Generators and formatters for text.", desc: "Free text tools: a superscript generator for copy-and-paste Unicode text and a redacted text generator with black bars, both working right in your browser.", icon: "🔤" },
};

export const abs = (path: string) => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
