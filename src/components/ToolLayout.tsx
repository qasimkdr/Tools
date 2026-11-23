import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import Faq from "./Faq";
import RelatedTools from "./RelatedTools";
import AdSlot from "./AdSlot";
import Reveal from "./Reveal";
import { CATEGORIES, SITE } from "@/lib/site";
import { ld } from "@/lib/seo";
import type { ToolMeta } from "@/tools/types";

/**
 * THE page template for every tool. A tool page only supplies: meta, <Calculator/>, <Content/>, faq.
 * Order (above the fold first): breadcrumbs → H1 + 1-line answer-first intro → calculator → ad → article → FAQ → related.
 */
export default function ToolLayout({ tool, calculator, children, faq, intro, path, h1, crumbs, extraLd = [] }: {
  tool: ToolMeta; calculator: ReactNode; children: ReactNode; faq: { q: string; a: string }[];
  intro: ReactNode; path?: string; h1?: string; crumbs?: { name: string; path: string }[]; extraLd?: object[];
}) {
  const url = path ?? `/${tool.slug}/`;
  const cat = CATEGORIES[tool.category];
  const trail = crumbs ?? [
    { name: "Home", path: "/" },
    { name: cat.name, path: `/category/${tool.category}/` },
    { name: tool.name, path: url },
  ];
  return (
    <>
      <JsonLd data={[ld.breadcrumbs(trail), ld.webApp({ name: h1 ?? tool.name, description: tool.description, path: url }), ld.faq(faq), ...extraLd]} />
      <section className="relative overflow-hidden">
        <div className="aurora" aria-hidden><i /></div>
        <div className="grid-3d" aria-hidden />
        <div className="container-x relative z-10 pt-8 pb-10 sm:pt-12">
          <Breadcrumbs items={trail} />
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{h1 ?? tool.name}</h1>
          <div className="mt-4 max-w-2xl text-lg leading-relaxed muted">{intro}</div>
          <div className="mt-8 glass p-5 sm:p-8 animate-pop">{calculator}</div>
        </div>
      </section>
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="min-w-0">
            <Reveal once className="prose-sp">{children}</Reveal>
            {tool.sources && tool.sources.length > 0 && (
              <section aria-labelledby="sources" className="prose-sp mt-8">
                <h2 id="sources">Sources</h2>
                <ul className="text-sm">
                  {tool.sources.map((src) => <li key={src.url}><a href={src.url} rel="noopener" className="underline">{src.name}</a></li>)}
                </ul>
              </section>
            )}
            <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INARTICLE} />
            <Faq items={faq} />
            <p className="byline mt-10 text-sm subtle">
              By <a rel="author" className="author underline" href={SITE.editor.url}>{SITE.editor.name}</a>, {SITE.editor.role} · Last updated{" "}
              <time dateTime={tool.updated}>{new Date(tool.updated + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
            </p>
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR} minH={600} className="!my-0" />
            </div>
          </aside>
        </div>
        <RelatedTools slug={tool.slug} />
      </div>
    </>
  );
}
