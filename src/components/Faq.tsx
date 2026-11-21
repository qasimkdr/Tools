/** Accessible FAQ with zero JS (<details>). Answers are plain text so they match FAQPage JSON-LD exactly. */
export default function Faq({ items, title = "Frequently asked questions" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section aria-labelledby="faq" className="mt-14">
      <h2 id="faq" className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <div className="space-y-3">
        {items.map((f) => (
          <details key={f.q} className="card group p-0 open:shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
              <h3 className="text-base">{f.q}</h3>
              <span aria-hidden className="text-xl transition-transform duration-200 group-open:rotate-45 subtle">+</span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
