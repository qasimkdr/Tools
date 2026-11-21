import Link from "next/link";
import { SITE, CATEGORIES, type CategoryId } from "@/lib/site";
import { toolsInCategory } from "@/tools/registry";

// Only link categories that have published tools (no 404s / empty hubs).
const LIVE = (Object.keys(CATEGORIES) as CategoryId[]).filter((c) => toolsInCategory(c).length > 0);
import { Logo } from "./Header";

const LEGAL = [
  ["About", "/about/"], ["Contact", "/contact/"], ["Editorial Policy", "/editorial-policy/"],
  ["Privacy Policy", "/privacy-policy/"], ["Terms of Use", "/terms/"], ["Disclaimer", "/disclaimer/"],
] as const;

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-bold"><Logo size={26} /> {SITE.name}</Link>
          <p className="mt-3 text-sm leading-relaxed muted">{SITE.tagline}. Every tool shows its formula, worked examples and sources.</p>
        </div>
        <nav aria-label="Categories" className="md:col-span-2">
          <p className="mb-3 text-sm font-semibold">Calculators</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {LIVE.map((c) => (
              <li key={c}><Link className="muted hover:text-[var(--text)]" href={`/category/${c}/`}>{CATEGORIES[c].name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="mb-3 text-sm font-semibold">Company</p>
          <ul className="space-y-2 text-sm">
            {LEGAL.map(([n, h]) => <li key={h}><Link className="muted hover:text-[var(--text)]" href={h}>{n}</Link></li>)}
          </ul>
        </nav>
      </div>
      <div className="border-t border-[var(--border)] py-6 text-center text-xs subtle">
        © {new Date().getFullYear()} {SITE.name}. Results are estimates for informational purposes; see our <Link href="/disclaimer/" className="underline">disclaimer</Link>.
      </div>
    </footer>
  );
}
