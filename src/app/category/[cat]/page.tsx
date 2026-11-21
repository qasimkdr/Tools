import ToolCard from "@/components/ToolCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { CATEGORIES, abs, type CategoryId } from "@/lib/site";
import { ld, pageMeta } from "@/lib/seo";
import { toolsInCategory } from "@/tools/registry";

export const dynamicParams = false;
// Only categories with ≥1 published tool get a page (no empty/thin hubs).
export const generateStaticParams = () => (Object.keys(CATEGORIES) as CategoryId[]).filter((c) => toolsInCategory(c).length).map((cat) => ({ cat }));

export async function generateMetadata({ params }: { params: Promise<{ cat: CategoryId }> }) {
  const c = CATEGORIES[(await params).cat];
  return pageMeta({ title: `${c.name} Calculators – Free & Accurate`, description: `${c.blurb} Free ${c.name.toLowerCase()} calculators with formulas, worked examples and instant results.`.slice(0, 160), path: `/category/${(await params).cat}/` });
}

export default async function Category({ params }: { params: Promise<{ cat: CategoryId }> }) {
  const { cat } = await params;
  const c = CATEGORIES[cat];
  const list = toolsInCategory(cat);
  const crumbs = [{ name: "Home", path: "/" }, { name: c.name, path: `/category/${cat}/` }];
  return (
    <div className="container-x py-10">
      <JsonLd data={[ld.breadcrumbs(crumbs), {
        "@context": "https://schema.org", "@type": "ItemList", name: `${c.name} calculators`,
        itemListElement: list.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/${t.slug}/`), name: t.name })),
      }]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-5 text-4xl font-extrabold tracking-tight">{c.icon} {c.name} calculators</h1>
      <p className="mt-3 max-w-2xl text-lg muted">{c.blurb}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t, i) => <Reveal key={t.slug} delay={((i % 3) + 1) as 1 | 2 | 3}><ToolCard tool={t} /></Reveal>)}
      </div>
    </div>
  );
}
