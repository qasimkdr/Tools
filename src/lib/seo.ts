import type { Metadata } from "next";
import { SITE, abs } from "./site";

/** One call per page. Title ≤ 60 chars, description 140–160 chars (see docs/01-SEO-RULES.md). */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string; // must start and end with "/"
  noindex?: boolean;
  ogType?: "website" | "article";
}): Metadata {
  const url = abs(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: true } : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: { title: opts.title, description: opts.description, url, siteName: SITE.name, type: opts.ogType ?? "website", locale: SITE.locale },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
  };
}

type Crumb = { name: string; path: string };

export const ld = {
  breadcrumbs: (items: Crumb[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
  }),
  /** Calculators = WebApplication. No fake ratings/reviews: that violates Google's structured-data policy. */
  webApp: (o: { name: string; description: string; path: string; category?: string }) => ({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: o.name,
    description: o.description,
    url: abs(o.path),
    applicationCategory: o.category ?? "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  }),
  /** FAQ rich results are limited to gov/health sites since 2023; markup is still valid and helps parsers. */
  faq: (items: { q: string; a: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }),
  article: (o: { headline: string; description: string; path: string; datePublished: string; dateModified: string }) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: o.headline,
    description: o.description,
    mainEntityOfPage: abs(o.path),
    datePublished: o.datePublished,
    dateModified: o.dateModified,
    author: { "@type": "Organization", name: SITE.editor.name, url: abs(SITE.editor.url) },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  }),
  website: () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  }),
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: abs("/icon.svg"),
  }),
};
