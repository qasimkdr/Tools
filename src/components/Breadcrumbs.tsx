import Link from "next/link";

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm subtle">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {i < items.length - 1 ? (
              <Link href={c.path} className="hover:text-[var(--color-brand-600)] transition-colors">{c.name}</Link>
            ) : (
              <span aria-current="page" className="muted">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
