import Link from "next/link";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import ToolCard from "@/components/ToolCard";
import { CATEGORIES, SITE, type CategoryId } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { TOOLS, toolsInCategory } from "@/tools/registry";

export const metadata = pageMeta({
  title: `${SITE.name} – Free Online Calculators That Show Their Work`,
  description: SITE.description,
  path: "/",
});

export default function Home() {
  const cats = (Object.keys(CATEGORIES) as CategoryId[]).filter((c) => toolsInCategory(c).length > 0);
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora" aria-hidden><i /></div>
        <div className="grid-3d" aria-hidden />
        <div className="container-x relative z-10 py-20 text-center sm:py-28">
          <p className="chip mx-auto inline-block">Free · No sign-up · Formulas included</p>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
            Calculators that <span className="text-gradient">show their work</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed muted">
            Fast, accurate answers for dates, money, math, health and home projects. Each one comes with the formula,
            worked examples and the edge cases other calculators skip.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/tools/" className="btn-primary !px-6 !py-3 text-base">Browse all tools</Link>
            <Link href="/days-from-today/" className="btn-ghost !px-6 !py-3 text-base">Try: Days from today</Link>
          </div>
        </div>
      </section>

      <section className="container-x">
        <Reveal><h2 className="text-3xl font-bold tracking-tight">Popular calculators</h2></Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.slice(0, 9).map((t, i) => <Reveal key={t.slug} delay={((i % 3) + 1) as 1 | 2 | 3}><ToolCard tool={t} /></Reveal>)}
        </div>
      </section>

      {cats.length > 0 && (
        <section className="container-x mt-20">
          <Reveal><h2 className="text-3xl font-bold tracking-tight">Browse by category</h2></Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cats.map((c, i) => (
              <Reveal key={c} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Tilt className="card h-full">
                  <Link href={`/category/${c}/`} className="lift block p-6">
                    <span className="text-3xl" aria-hidden>{CATEGORIES[c].icon}</span>
                    <h3 className="mt-3 font-semibold">{CATEGORIES[c].name}</h3>
                    <p className="mt-1 text-sm muted">{CATEGORIES[c].blurb}</p>
                  </Link>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="container-x mt-20">
        <Reveal className="glass grid gap-8 p-8 sm:grid-cols-3 sm:p-12">
          {[
            ["Accurate by design", "Every formula is documented and tested against edge cases such as leap years, month ends and rounding."],
            ["Explained, not just answered", "Worked examples, tables and plain-English explanations help you understand the result."],
            ["Fast and private", "Calculations run in your browser. No accounts, nothing stored, and pages load in under a second."],
          ].map(([h, p]) => (
            <div key={h}><h3 className="text-lg font-semibold">{h}</h3><p className="mt-2 text-sm leading-relaxed muted">{p}</p></div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
