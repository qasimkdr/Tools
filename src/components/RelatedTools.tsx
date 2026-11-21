import ToolCard from "./ToolCard";
import Reveal from "./Reveal";
import { relatedTools } from "@/tools/registry";

/** Internal-linking block. Logic lives in registry.relatedTools (explicit picks → keyword overlap → same category). */
export default function RelatedTools({ slug, title = "Related calculators" }: { slug: string; title?: string }) {
  const list = relatedTools(slug, 6);
  if (!list.length) return null;
  return (
    <section aria-labelledby="related" className="mt-16">
      <h2 id="related" className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t, i) => <Reveal key={t.slug} delay={((i % 3) + 1) as 1 | 2 | 3}><ToolCard tool={t} /></Reveal>)}
      </div>
    </section>
  );
}
