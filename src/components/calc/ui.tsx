"use client";
import type { ReactNode } from "react";

/** Shared calculator UI primitives (keep every tool visually consistent; see docs/05-DESIGN-SYSTEM.md). */
export function Field({ id, label, value, onChange, prefix, suffix, step = "any", min, hint, inputMode = "decimal" }: {
  id: string; label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string;
  step?: string; min?: number; hint?: string; inputMode?: "decimal" | "numeric";
}) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative">
        {prefix && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 subtle">{prefix}</span>}
        <input id={id} type="number" inputMode={inputMode} step={step} min={min} value={value} onChange={(e) => onChange(e.target.value)}
          className={`field tabular-nums ${prefix ? "pl-8" : ""} ${suffix ? "pr-14" : ""}`} />
        {suffix && <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm subtle">{suffix}</span>}
      </div>
      {hint && <p className="mt-1 text-xs subtle">{hint}</p>}
    </div>
  );
}

export function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { id: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div>
      <span className="label">{label}</span>
      <div role="group" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
        {options.map((o) => (
          <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${value === o.id ? "bg-[var(--color-brand-600)] text-white" : "muted hover:text-[var(--text)]"}`}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Stat({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="rounded-xl bg-[var(--surface-2)] px-3 py-2.5">
      <dt className="text-xs subtle">{k}</dt>
      <dd className="mt-0.5 font-semibold tabular-nums">{v}</dd>
    </div>
  );
}

export function ResultCard({ label, value, children, error }: { label: string; value: ReactNode; children?: ReactNode; error?: string | null }) {
  return (
    <div aria-live="polite" data-testid="result" className="rounded-2xl bg-[var(--surface)] p-5 shadow-sm ring-1 ring-[var(--border)] sm:p-6">
      {error ? (
        <p className="text-sm font-medium text-amber-700">{error}</p>
      ) : (
        <>
          <p className="text-sm font-medium muted">{label}</p>
          <p className="mt-1 animate-pop text-3xl font-extrabold tracking-tight text-gradient tabular-nums sm:text-4xl">{value}</p>
          {children}
        </>
      )}
    </div>
  );
}

/** Download rows as CSV (client-side; works on a static site). */
export function downloadCsv(filename: string, header: string[], rows: (string | number)[][]) {
  const esc = (v: string | number) => { const s = String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const blob = new Blob([[header, ...rows].map((r) => r.map(esc).join(",")).join("\n")], { type: "text/csv" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
}
