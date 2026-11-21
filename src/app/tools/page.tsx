import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { CATEGORIES, type CategoryId } from "@/lib/site";
import { ld, pageMeta } from "@/lib/seo";
import { toolsInCategory } from "@/tools/registry";

export const metadata = pageMeta({
  title: "All Calculators & Tools – Free Online Calculators",
  description: "Browse every free SolvePilot calculator by category: date and time, finance, math, health, home and construction, science, education and converters.",
  path: "/tools/",
});

export default function AllTools() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "All tools", path: "/tools/" }];
  return (
    <div className="container-x py-10">
      <JsonLd data={ld.breadcrumbs(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-5 text-4xl font-extrabold tracking-tight">All calculators</h1>
      {(Object.keys(CATEGORIES) as CategoryId[]).map((c) => {
        const list = toolsInCategory(c);
        if (!list.length) return null;
        return (
          <section key={c} className="mt-12">
            <h2 className="text-2xl font-bold"><Link href={`/category/${c}/`}>{CATEGORIES[c].icon} {CATEGORIES[c].name}</Link></h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
          </section>
        );
      })}
    </div>
  );
}
