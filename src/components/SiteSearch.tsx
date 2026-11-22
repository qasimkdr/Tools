"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { buildIndex, search, type SearchDoc } from "@/lib/search";

const POPULAR = ["mortgage-calculator", "paycheck-calculator", "days-from-today", "age-calculator", "gpa-calculator", "square-footage-calculator"];

/** Header search: a command palette over the tool registry (Ctrl/⌘+K or "/"). Typo-tolerant, no network calls. */
export default function SiteSearch({ docs }: { docs: SearchDoc[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const index = useMemo(() => buildIndex(docs), [docs]);
  const { results, corrected } = useMemo(() => search(index, q), [index, q]);
  const popular = useMemo(() => POPULAR.map((s) => docs.find((d) => d.slug === s)).filter(Boolean) as SearchDoc[], [docs]);
  const list = q.trim() ? results.map((r) => r.doc) : popular;

  const close = useCallback(() => { setOpen(false); setQ(""); setActive(0); }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const go = (slug: string) => { close(); router.push(`/${slug}/`); };
  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, list.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && list[active]) { e.preventDefault(); go(list[active].slug); }
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Search tools" data-testid="search-open"
        className="btn-ghost !px-3 xl:!w-56 xl:!justify-start xl:gap-2 xl:!px-3.5 xl:text-sm xl:font-normal xl:text-[var(--muted)]">
        <SearchIcon />
        <span className="hidden xl:inline">Search tools…</span>
        <kbd className="ml-auto hidden rounded border border-[var(--border)] px-1.5 text-[11px] subtle xl:inline">Ctrl K</kbd>
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-4 pt-[10vh] backdrop-blur-sm" onMouseDown={close}>
          <div role="dialog" aria-modal="true" aria-label="Search tools" className="card w-full max-w-xl overflow-hidden shadow-2xl animate-pop" onMouseDown={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
              <SearchIcon />
              <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setActive(0); }} onKeyDown={onInputKey}
                placeholder="Search calculators, e.g. mortgage, overtime, gpa" aria-label="Search tools" data-testid="search-input"
                role="combobox" aria-expanded="true" aria-controls="search-results" aria-activedescendant={list[active] ? `sr-${list[active].slug}` : undefined}
                className="h-14 w-full bg-transparent text-base outline-none placeholder:text-[var(--subtle)]" />
              <button type="button" onClick={close} className="rounded-md border border-[var(--border)] px-2 py-0.5 text-xs subtle">Esc</button>
            </div>
            {corrected && results.length > 0 && <p className="px-4 pt-3 text-sm muted" data-testid="search-corrected">Showing results for <button type="button" className="font-semibold text-[var(--color-brand-600)] underline" onClick={() => setQ(corrected)}>{corrected}</button></p>}
            <p className="px-4 pt-3 text-xs font-semibold uppercase tracking-wide subtle">{q.trim() ? (list.length ? "Tools" : "") : "Popular tools"}</p>
            <ul id="search-results" role="listbox" className="max-h-[60vh] overflow-y-auto p-2" data-testid="search-results">
              {list.map((d, i) => (
                <li key={d.slug} id={`sr-${d.slug}`} role="option" aria-selected={i === active}>
                  <Link href={`/${d.slug}/`} onClick={close} onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${i === active ? "bg-[var(--surface-2)]" : ""}`}>
                    <span className="text-xl" aria-hidden>{d.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{d.name}</span>
                      <span className="block truncate text-sm muted">{d.short}</span>
                    </span>
                    <span className="hidden text-xs subtle sm:inline">{d.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {q.trim() && !list.length && (
              <div className="px-4 pb-5 text-sm muted" data-testid="search-empty">
                No tools match &quot;{q}&quot;{corrected ? <> . Did you mean <button type="button" className="font-semibold text-[var(--color-brand-600)] underline" onClick={() => setQ(corrected)}>{corrected}</button>?</> : "."}{" "}
                <Link href="/tools/" onClick={close} className="font-semibold text-[var(--color-brand-600)]">Browse all tools →</Link>
              </div>
            )}
            <p className="hidden border-t border-[var(--border)] px-4 py-2 text-xs subtle sm:block">↑ ↓ to move · Enter to open · Esc to close</p>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden className="shrink-0 subtle">
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
    </svg>
  );
}
