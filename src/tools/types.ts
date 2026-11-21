import type { CategoryId } from "@/lib/site";

/** Registry entry = everything the shell, sitemap, search, hubs and internal-linking engine need. */
export type ToolMeta = {
  slug: string; // URL: /<slug>/
  name: string; // H1 / card label, e.g. "Days From Today Calculator"
  title: string; // <title>, ≤ 60 chars, primary keyword first
  description: string; // meta description, 140–160 chars
  short: string; // one-line card blurb (≤ 90 chars)
  category: CategoryId;
  primaryKw: string;
  keywords: string[]; // secondary cluster keywords (used for related-tool scoring, not stuffed into copy)
  related: string[]; // hand-picked slugs, strongest semantic matches first (2–6)
  published: string; // ISO date
  updated: string; // ISO date (change only on real content/tool updates)
  icon?: string;
};
