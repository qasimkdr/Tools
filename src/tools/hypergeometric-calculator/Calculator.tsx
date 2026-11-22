"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { cdf, mean, pmf, support, variance } from "@/lib/hyper";

const PRESETS = [
  { label: "2 aces in a 5-card hand", N: 52, K: 4, n: 5, k: 2 },
  { label: "≥1 copy in a 7-card opening hand (60 cards, 4 copies)", N: 60, K: 4, n: 7, k: 1 },
  { label: "Match 3 numbers, 6 from 49", N: 49, K: 6, n: 6, k: 3 },
  { label: "3 red of 5 drawn (10 red, 30 blue)", N: 40, K: 10, n: 5, k: 3 },
];
const fmtP = (p: number) => (p === 0 ? "0" : p < 1e-4 ? p.toExponential(4) : (+p.toFixed(6)).toString());
const odds = (p: number) => (p > 0 && p < 0.5 ? ` · 1 in ${Math.round(1 / p).toLocaleString()}` : "");

export default function HypergeometricCalculator() {
  const [s, set] = useUrlState({ N: "52", K: "4", n: "5", k: "2" });
  const N = Math.floor(Number(s.N)), K = Math.floor(Number(s.K)), n = Math.floor(Number(s.n)), k = Math.floor(Number(s.k));
  const error = !(N >= 1 && N <= 10_000_000) ? "Enter a population size (N) of 1 or more." : !(K >= 0 && K <= N) ? "Successes in the population (K) must be between 0 and N." : !(n >= 0 && n <= N) ? "Sample size (n) must be between 0 and N." : !(k >= 0 && k <= n) ? "Successes in the sample (k) must be between 0 and n." : null;
  const eq = error ? NaN : pmf(N, K, n, k), le = error ? NaN : cdf(N, K, n, k), lt = error ? NaN : cdf(N, K, n, k - 1);
  const [lo, hi] = error ? [0, 0] : support(N, K, n);
  const range = Array.from({ length: Math.min(hi - lo + 1, 41) }, (_, i) => lo + i);
  const maxP = Math.max(...range.map((x) => pmf(N, K, n, x)), 1e-12);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Hypergeometric calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="N" label="Population size (N)" value={s.N} onChange={(v) => set("N", v)} min={1} inputMode="numeric" hint="e.g. 52 cards" />
          <Field id="K" label="Successes in population (K)" value={s.K} onChange={(v) => set("K", v)} min={0} inputMode="numeric" hint="e.g. 4 aces" />
          <Field id="n" label="Sample size (n)" value={s.n} onChange={(v) => set("n", v)} min={0} inputMode="numeric" hint="e.g. 5 cards drawn" />
          <Field id="k" label="Successes in sample (k)" value={s.k} onChange={(v) => set("k", v)} min={0} inputMode="numeric" hint="e.g. exactly 2 aces" />
        </div>
        <div>
          <span className="label">Examples</span>
          <div className="flex flex-wrap gap-2">{PRESETS.map((p) => <button key={p.label} type="button" className="btn-ghost !px-3 !py-1.5 text-left text-xs" onClick={() => { set("N", String(p.N)); set("K", String(p.K)); set("n", String(p.n)); set("k", String(p.k)); }}>{p.label}</button>)}</div>
        </div>
      </form>
      <ResultCard error={error} label={`P(X = ${k})`} value={fmtP(eq)}>
        <p className="mt-1 text-sm muted">{(eq * 100).toPrecision(4)}%{odds(eq)}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k={`P(X < ${k})`} v={fmtP(lt)} />
          <Stat k={`P(X ≤ ${k})`} v={fmtP(le)} />
          <Stat k={`P(X > ${k})`} v={fmtP(1 - le)} />
          <Stat k={`P(X ≥ ${k})`} v={<span data-testid="atleast">{fmtP(1 - lt)}</span>} />
          <Stat k="Mean (expected successes)" v={(+mean(N, K, n).toFixed(4)).toString()} />
          <Stat k="Standard deviation" v={(+Math.sqrt(variance(N, K, n)).toFixed(4)).toString()} />
        </dl>
        {!error && <div className="mt-4" aria-label="Probability of each number of successes">
          <p className="text-sm font-medium">Distribution</p>
          <div className="mt-2 flex h-28 items-end gap-0.5">
            {range.map((x) => { const p = pmf(N, K, n, x); return <div key={x} title={`P(X = ${x}) = ${fmtP(p)}`} className={`flex-1 rounded-t ${x === k ? "bg-[var(--color-brand-600)]" : "bg-[var(--color-brand-500)] opacity-40"}`} style={{ height: `${Math.max(2, (p / maxP) * 100)}%` }} />; })}
          </div>
          <div className="flex justify-between text-[11px] subtle"><span>{lo}</span><span>{range[range.length - 1]}{hi > range[range.length - 1] ? "…" : ""}</span></div>
        </div>}
      </ResultCard>
    </div>
  );
}
