"use client";
import { useState } from "react";
import { Field, ResultCard, Segmented } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const PRESETS: { label: string; min: number; max: number }[] = [
  { label: "1–10", min: 1, max: 10 }, { label: "1–16", min: 1, max: 16 }, { label: "1–100", min: 1, max: 100 },
  { label: "1–1000", min: 1, max: 1000 }, { label: "4-digit", min: 1000, max: 9999 }, { label: "Dice 1–6", min: 1, max: 6 },
];
const DEFAULTS = { min: "1", max: "100", count: "1", unique: "0", sort: "none", type: "int", dp: "2" };
const MAX_RANGE = 2 ** 32;

/** Unbiased integer in [0, n) from the Web Crypto CSPRNG (rejection sampling removes modulo bias). */
function randInt(n: number) {
  const buf = new Uint32Array(1), limit = Math.floor(MAX_RANGE / n) * n;
  do crypto.getRandomValues(buf); while (buf[0] >= limit);
  return buf[0] % n;
}
/** Uniform float in [0, 1) with 53 bits of randomness. */
function randFloat() {
  const b = new Uint32Array(2); crypto.getRandomValues(b);
  return (b[0] * 2 ** 21 + (b[1] >>> 11)) / 2 ** 53;
}

export default function RandomNumberGenerator() {
  const [s, set, setAll] = useUrlState(DEFAULTS);
  const [out, setOut] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const min = Number(s.min), max = Number(s.max), count = Math.floor(Number(s.count)), unique = s.unique === "1";
    if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) return setErr("The maximum must be greater than the minimum.");
    if (!(count >= 1 && count <= 1000)) return setErr("Pick between 1 and 1,000 numbers.");
    let res: number[] = [];
    if (s.type === "dec") {
      const dp = Math.min(10, Math.max(0, Math.floor(Number(s.dp) || 0)));
      const seen = new Set<string>();
      for (let i = 0; res.length < count && i < count * 50; i++) {
        const v = Number((min + randFloat() * (max - min)).toFixed(dp));
        if (unique && seen.has(String(v))) continue;
        seen.add(String(v)); res.push(v);
      }
      if (res.length < count) return setErr("Not enough distinct values at that precision. Add decimal places or allow repeats.");
    } else {
      const lo = Math.ceil(min), hi = Math.floor(max), n = hi - lo + 1;
      if (n < 1) return setErr("There are no whole numbers in that range.");
      if (n > MAX_RANGE) return setErr("Range too large. Keep max − min under about 4.29 billion.");
      if (unique && count > n) return setErr(`There are only ${n.toLocaleString()} whole numbers between ${lo} and ${hi}, so you can't draw ${count} without repeats.`);
      if (unique && n <= 100000) {
        const pool = Array.from({ length: n }, (_, i) => lo + i); // partial Fisher–Yates shuffle
        for (let i = 0; i < count; i++) { const j = i + randInt(n - i); [pool[i], pool[j]] = [pool[j], pool[i]]; }
        res = pool.slice(0, count);
      } else if (unique) {
        const seen = new Set<number>();
        while (seen.size < count) seen.add(lo + randInt(n));
        res = [...seen];
      } else res = Array.from({ length: count }, () => lo + randInt(n));
    }
    if (s.sort === "asc") res.sort((a, b) => a - b); else if (s.sort === "desc") res.sort((a, b) => b - a);
    const strs = res.map((v) => (s.type === "dec" ? v.toFixed(Math.floor(Number(s.dp) || 0)) : v.toLocaleString("en-US")));
    setErr(null); setOut(strs); setHistory((h) => [strs.slice(0, 12).join(", ") + (strs.length > 12 ? "…" : ""), ...h].slice(0, 8));
  };

  const copy = async () => { await navigator.clipboard?.writeText(out.join(", ")); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); generate(); }} aria-label="Random number generator">
        <div>
          <span className="label">Quick ranges</span>
          <div className="flex flex-wrap gap-2">{PRESETS.map((p) => (
            <button key={p.label} type="button" className="chip" aria-pressed={Number(s.min) === p.min && Number(s.max) === p.max}
              onClick={() => setAll({ ...s, min: String(p.min), max: String(p.max), type: "int" })}>{p.label}</button>))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field id="min" label="Min" value={s.min} onChange={(v) => set("min", v)} />
          <Field id="max" label="Max" value={s.max} onChange={(v) => set("max", v)} />
          <Field id="count" label="How many" value={s.count} onChange={(v) => set("count", v)} min={1} inputMode="numeric" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Segmented label="Numbers" value={s.type === "dec" ? "dec" : "int"} onChange={(v) => set("type", v)} options={[{ id: "int", label: "Whole" }, { id: "dec", label: "Decimal" }]} />
          {s.type === "dec" && <div className="w-28"><Field id="dp" label="Decimals" value={s.dp} onChange={(v) => set("dp", v)} min={0} inputMode="numeric" /></div>}
        </div>
        <div className="flex flex-wrap gap-4">
          <Segmented label="Repeats" value={s.unique === "1" ? "1" : "0"} onChange={(v) => set("unique", v)} options={[{ id: "0", label: "Allowed" }, { id: "1", label: "No repeats" }]} />
          <Segmented label="Sort" value={(["asc", "desc"].includes(s.sort) ? s.sort : "none") as "none" | "asc" | "desc"} onChange={(v) => set("sort", v)} options={[{ id: "none", label: "As drawn" }, { id: "asc", label: "Low → high" }, { id: "desc", label: "High → low" }]} />
        </div>
        <button type="submit" className="btn-primary w-full !py-3 text-base">Generate</button>
      </form>
      <ResultCard error={err} label={out.length > 1 ? `${out.length} random numbers` : "Your random number"} value={out.length === 0 ? "Press Generate" : out.length === 1 ? out[0] : ""}>
        {out.length > 1 && (
          <div className="mt-3 flex max-h-72 flex-wrap gap-2 overflow-y-auto" data-testid="numbers">
            {out.map((v, i) => <span key={i} className="rounded-lg bg-[var(--surface-2)] px-2.5 py-1 font-semibold tabular-nums">{v}</span>)}
          </div>
        )}
        {out.length > 0 && <button type="button" className="btn-ghost mt-4" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>}
        {history.length > 1 && (
          <div className="mt-5">
            <p className="text-xs font-medium subtle">Previous draws (this visit only)</p>
            <ul className="mt-1 space-y-1 text-sm tabular-nums muted">{history.slice(1).map((h, i) => <li key={i}>{h}</li>)}</ul>
          </div>
        )}
      </ResultCard>
    </div>
  );
}
