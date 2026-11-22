import Link from "next/link";
import { SITE, CATEGORIES, type CategoryId } from "@/lib/site";
import { TOOLS, toolsInCategory } from "@/tools/registry";
import SiteSearch from "@/components/SiteSearch";
import type { SearchDoc } from "@/lib/search";

// Only link categories that have published tools (no 404s / empty hubs).
const LIVE = (Object.keys(CATEGORIES) as CategoryId[]).filter((c) => toolsInCategory(c).length > 0);

const NAV: CategoryId[] = ["time-date", "finance", "math", "health", "construction"];

// Search index: only published tools (the registry), a few KB of JSON.
const DOCS: SearchDoc[] = TOOLS.map((t) => ({ slug: t.slug, name: t.name, short: t.short, keywords: [t.primaryKw, ...t.keywords], category: CATEGORIES[t.category].name, icon: t.icon }));

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--glass)] backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight" aria-label={`${SITE.name} home`}>
          <Logo />
          <span className="text-lg">Solve<span className="text-gradient">Pilot</span></span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:order-2 md:flex">
          {NAV.filter((c) => LIVE.includes(c)).map((c) => (
            <Link key={c} href={`/category/${c}/`} className="rounded-lg px-3 py-2 text-sm font-medium muted transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]">
              {CATEGORIES[c].name}
            </Link>
          ))}
          <Link href="/tools/" className="btn-primary ml-2 !py-2">All tools</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:order-1">
          <SiteSearch docs={DOCS} />
        {/* Mobile menu: zero-JS disclosure */}
        <details className="relative md:hidden">
          <summary className="btn-ghost list-none !px-3" aria-label="Open menu">☰</summary>
          <div className="card absolute right-0 mt-2 w-64 p-2 shadow-xl animate-pop">
            {LIVE.map((c) => (
              <Link key={c} href={`/category/${c}/`} className="block rounded-lg px-3 py-2.5 text-sm hover:bg-[var(--surface-2)]">
                {CATEGORIES[c].icon} {CATEGORIES[c].name}
              </Link>
            ))}
            <Link href="/tools/" className="mt-1 block rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--color-brand-600)]">All tools →</Link>
          </div>
        </details>
        </div>
      </div>
    </header>
  );
}

export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d6b5a" /><stop offset="1" stopColor="#13806b" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#lg)" />
      <path d="M9 19.5 15 8l2.2 6.6L23 13l-6 11-2.2-6.6z" fill="#fff" />
    </svg>
  );
}
