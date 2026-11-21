import type { MetadataRoute } from "next";
import { abs, CATEGORIES, type CategoryId } from "@/lib/site";
import { TOOLS, toolsInCategory } from "@/tools/registry";
import { VARIANTS, variantPath, type VariantUnit } from "@/tools/days-from-today/variants";

export const dynamic = "force-static";

/**
 * Generated at build time → out/sitemap.xml. Only indexable, canonical, 200-status URLs.
 * lastmod = real content update date (Google ignores priority/changefreq; it uses lastmod only when it is accurate).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const latest = TOOLS.reduce((m, t) => (t.updated > m ? t.updated : m), "2026-11-21");
  const urls: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified: latest },
    { url: abs("/tools/"), lastModified: latest },
    ...(Object.keys(CATEGORIES) as CategoryId[]).filter((c) => toolsInCategory(c).length).map((c) => ({ url: abs(`/category/${c}/`), lastModified: latest })),
    ...TOOLS.map((t) => ({ url: abs(`/${t.slug}/`), lastModified: t.updated })),
    ...(Object.keys(VARIANTS) as VariantUnit[]).flatMap((u) => VARIANTS[u].map((n) => ({ url: abs(variantPath(u, n)), lastModified: latest }))),
    ...["/about/", "/contact/", "/editorial-policy/", "/privacy-policy/", "/terms/", "/disclaimer/"].map((p) => ({ url: abs(p), lastModified: "2026-11-21" })),
  ];
  return urls;
}
