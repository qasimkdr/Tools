"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { choose, pmf, range, stats } from "@/lib/binomial";
import { normCdf } from "@/lib/stats";

const TYPES = [
  { id: "eq", label: "Exactly k: P(X = k)" }, { id: "le", label: "At most k: P(X ≤ k)" }, { id: "lt", label: "Fewer than k: P(X < k)" },
  { id: "ge", label: "At least k: P(X ≥ k)" }, { id: "gt", label: "More than k: P(X > k)" }, { id: "bt", label: "Between a and b: P(a ≤ X ≤ b)" },
];
const fmt = (x: number) => (!Number.isFinite(x) ? "–" : x === 0 ? "0" : x < 1e-4 ? x.toExponential(4) : String(Number(Number(x.toFixed(12)).toPrecision(6))));

export default function BinomialCalculator() {
  const [s, set] = useUrlState({ n: "10", p: "0.5", k: "3", t: "eq", b: "6" });
  const n = Math.round(Number(s.n)), p = Number(s.p), k = Math.round(Number(s.k)), b = Math.round(Number(s.b));
  const t = TYPES.some((x) => x.id === s.t) ? s.t : "eq";
  const err = !(n >= 1 && n <= 10000) ? "Enter the number of trials n (1 to 10,000)." : !(p >= 0 && p <= 1) ? "Enter the probability of success p between 0 and 1 (e.g. 0.5)." : !(k >= 0 && k <= n) ? `Enter k between 0 and ${n}.` : t === "bt" && !(b >= k && b <= n) ? `Enter b between ${k} and ${n}.` : null;
  const lo = t === "eq" || t === "ge" ? k : t === "gt" ? k + 1 : t === "bt" ? k : 0;
  const hi = t === "eq" ? k : t === "le" || t === "bt" ? (t === "bt" ? b : k) : t === "lt" ? k - 1 : n;
  const P = err ? NaN : lo > hi ? 0 : range(n, p, lo, hi);
  const st = err ? null : stats(n, p);
  const exact = err ? NaN : pmf(n, p, k);
  const le = err ? NaN : range(n, p, 0, k), lt = err ? NaN : (k > 0 ? range(n, p, 0, k - 1) : 0);
  const showNormal = st && st.mean >= 10 && n * (1 - p) >= 10;
  const z = (x: number) => (x - st!.mean) / st!.sd;
  const approx = showNormal ? normCdf(z(hi + 0.5)) - normCdf(z(lo - 0.5)) : NaN;
  // Chart window: all k for small n, otherwise mean ± 4 SD.
  const from = st ? Math.max(0, n <= 60 ? 0 : Math.floor(st.mean - 4 * st.sd)) : 0, to = st ? Math.min(n, n <= 60 ? n : Math.ceil(st.mean + 4 * st.sd)) : 0;
  const bars = st ? Array.from({ length: to - from + 1 }, (_, i) => ({ k: from + i, v: pmf(n, p, from + i) })) : [];
  const vmax = Math.max(1e-12, ...bars.map((x) => x.v));
  const q = 1 - p;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Binomial distribution calculator">
          <div className="grid grid-cols-2 gap-3">
            <Field id="n" label="Number of trials (n)" value={s.n} onChange={(v) => set("n", v)} min={1} inputMode="numeric" />
            <Field id="p" label="Probability of success (p)" value={s.p} onChange={(v) => set("p", v)} min={0} hint="0.5 for a fair coin; 1/6 ≈ 0.1667 for a die" />
          </div>
          <div>
            <label htmlFor="t" className="label">Probability of</label>
            <select id="t" className="field" value={t} onChange={(e) => set("t", e.target.value)}>{TYPES.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}</select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field id="k" label={t === "bt" ? "From a" : "Number of successes (k)"} value={s.k} onChange={(v) => set("k", v)} min={0} inputMode="numeric" />
            {t === "bt" && <Field id="b" label="To b" value={s.b} onChange={(v) => set("b", v)} min={0} inputMode="numeric" />}
          </div>
        </form>
        <ResultCard error={err} label={TYPES.find((x) => x.id === t)!.label.split(": ")[1]?.replace("k", String(k)).replace("a ≤ X ≤ b", `${k} ≤ X ≤ ${b}`) ?? "Probability"} value={err ? "–" : <span data-testid="prob">{fmt(P)}</span>}>
          {st && <>
            <p className="mt-1 text-sm muted">{(P * 100).toPrecision(4)}% · complement {fmt(1 - P)}</p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <Stat k={`P(X = ${k})`} v={<span data-testid="eq">{fmt(exact)}</span>} />
              <Stat k={`P(X ≤ ${k})`} v={<span data-testid="le">{fmt(le)}</span>} />
              <Stat k={`P(X < ${k})`} v={fmt(lt)} />
              <Stat k={`P(X ≥ ${k})`} v={<span data-testid="ge">{fmt(1 - lt)}</span>} />
              <Stat k={`P(X > ${k})`} v={fmt(1 - le)} />
              <Stat k="Mean (np)" v={<span data-testid="mean">{fmt(st.mean)}</span>} />
              <Stat k="Variance (npq)" v={fmt(st.variance)} />
              <Stat k="Standard deviation" v={fmt(st.sd)} />
              <Stat k="Most likely k (mode)" v={st.mode} />
            </dl>
            {showNormal && <p className="mt-3 text-xs subtle" data-testid="normal">Normal approximation with continuity correction: {fmt(approx)} (np = {fmt(st.mean)} and nq = {fmt(n * q)} are both at least 10).</p>}
          </>}
        </ResultCard>
      </div>
      {st && <>
        <div>
          <h2 className="text-base font-semibold">Distribution (k = {from} to {to})</h2>
          <div className="mt-3 flex h-40 items-end gap-px" role="img" aria-label={`Binomial distribution with n = ${n} and p = ${p}; highlighted bars are counted in the answer`}>
            {bars.map((x) => <div key={x.k} className="flex-1 rounded-t" style={{ height: `${(x.v / vmax) * 100}%`, minHeight: x.v > 0 ? 1 : 0, background: x.k >= lo && x.k <= hi ? "var(--color-brand-500)" : "color-mix(in srgb, var(--color-brand-500) 25%, transparent)" }} title={`P(X = ${x.k}) = ${fmt(x.v)}`} />)}
          </div>
          <div className="mt-1 flex justify-between text-xs subtle"><span>{from}</span><span>{to}</span></div>
        </div>
        <details>
          <summary className="cursor-pointer text-sm font-semibold">Step by step</summary>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm" data-testid="steps">
            <li>Formula: P(X = k) = C(n, k) × p^k × (1 − p)^(n − k).</li>
            {n <= 1000 && <li>C({n}, {k}) = {n}! ÷ ({k}! × {n - k}!) = {choose(n, k).toLocaleString("en-US")}</li>}
            <li>P(X = {k}) = {n <= 1000 ? choose(n, k).toLocaleString("en-US") : `C(${n}, ${k})`} × {p}^{k} × {fmt(q)}^{n - k} = {fmt(exact)}</li>
            {t !== "eq" && <li>{lo > hi ? "No values of k qualify, so the probability is 0." : `Add P(X = k) for k = ${lo} to ${hi}: ${fmt(P)}`}</li>}
            <li>Mean = np = {n} × {p} = {fmt(st.mean)}; variance = np(1 − p) = {fmt(st.variance)}.</li>
          </ol>
        </details>
        {n <= 200 && <details>
          <summary className="cursor-pointer text-sm font-semibold">Full table (k = 0 to {n})</summary>
          <div className="mt-3 max-h-80 overflow-auto rounded-xl border border-[var(--border)]">
            <table className="w-full text-sm" data-testid="table">
              <thead className="sticky top-0 bg-[var(--surface-2)]"><tr className="text-left"><th className="px-3 py-1.5">k</th><th className="px-3">P(X = k)</th><th className="px-3">P(X ≤ k)</th><th className="px-3">P(X ≥ k)</th></tr></thead>
              <tbody>{(() => { let c = 0; return Array.from({ length: n + 1 }, (_, i) => { const v = pmf(n, p, i); const ge = 1 - c; c += v; return <tr key={i} className={`border-t border-[var(--border)] ${i >= lo && i <= hi ? "font-semibold" : ""}`}><td className="px-3 py-1">{i}</td><td className="px-3">{fmt(v)}</td><td className="px-3">{fmt(Math.min(1, c))}</td><td className="px-3">{fmt(Math.max(0, ge))}</td></tr>; }); })()}</tbody>
            </table>
          </div>
        </details>}
      </>}
    </div>
  );
}
