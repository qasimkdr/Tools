"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { normInv, tInv } from "@/lib/stats";

const f = (v: number, d = 4) => (Number.isFinite(v) ? (+v.toFixed(d)).toString() : "—");

export default function ConfidenceIntervalCalculator() {
  const [s, set] = useUrlState({ type: "mean", mean: "50", sd: "10", n: "25", sig: "t", cl: "95", x: "520", pn: "1000" });
  const cl = Number(s.cl) / 100, alpha = 1 - cl;
  const isMean = s.type !== "prop";
  let error: string | null = !(cl > 0 && cl < 1) ? "Enter a confidence level between 0 and 100 (e.g. 95)." : null;
  let lo = NaN, hi = NaN, moe = NaN, se = NaN, crit = NaN, center = NaN, extra: React.ReactNode = null, critLabel = "";
  if (isMean && !error) {
    const m = Number(s.mean), sd = Number(s.sd), n = Math.floor(Number(s.n));
    if (!(n >= 2)) error = "Sample size must be at least 2."; else if (!(sd >= 0) || s.mean === "") error = "Enter the sample mean and a non-negative standard deviation.";
    else {
      const useZ = s.sig === "z";
      crit = useZ ? normInv(1 - alpha / 2) : tInv(1 - alpha / 2, n - 1);
      critLabel = useZ ? "z*" : `t* (df = ${n - 1})`;
      se = sd / Math.sqrt(n); moe = crit * se; center = m; lo = m - moe; hi = m + moe;
    }
  } else if (!error) {
    const x = Math.floor(Number(s.x)), n = Math.floor(Number(s.pn));
    if (!(n >= 1) || !(x >= 0) || x > n) error = "Enter successes (x) between 0 and the sample size (n).";
    else {
      const p = x / n, z = normInv(1 - alpha / 2);
      crit = z; critLabel = "z*"; se = Math.sqrt((p * (1 - p)) / n); moe = z * se; center = p; lo = p - moe; hi = p + moe;
      const d = 1 + (z * z) / n, c = (p + (z * z) / (2 * n)) / d, h = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / d;
      const small = n * p < 10 || n * (1 - p) < 10;
      extra = <>
        <Stat k="Wilson score interval" v={`${f(c - h)} to ${f(c + h)}`} />
        <Stat k="As percentages" v={`${f(lo * 100, 2)}% to ${f(hi * 100, 2)}%`} />
        {small && <p className="col-span-full rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">Fewer than 10 successes or failures: the simple (Wald) interval is unreliable here; use the Wilson interval.</p>}
      </>;
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Confidence interval calculator">
        <Segmented label="Interval for a" value={isMean ? "mean" : "prop"} onChange={(v) => set("type", v)} options={[{ id: "mean", label: "Mean" }, { id: "prop", label: "Proportion" }]} />
        {isMean ? <>
          <div className="grid grid-cols-3 gap-3">
            <Field id="mean" label="Sample mean (x̄)" value={s.mean} onChange={(v) => set("mean", v)} />
            <Field id="sd" label="Std. deviation" value={s.sd} onChange={(v) => set("sd", v)} min={0} />
            <Field id="n" label="Sample size (n)" value={s.n} onChange={(v) => set("n", v)} min={2} inputMode="numeric" />
          </div>
          <Segmented label="Standard deviation is" value={s.sig === "z" ? "z" : "t"} onChange={(v) => set("sig", v)} options={[{ id: "t", label: "From the sample (t)" }, { id: "z", label: "Known population σ (z)" }]} />
        </> : <div className="grid grid-cols-2 gap-3">
          <Field id="x" label="Successes (x)" value={s.x} onChange={(v) => set("x", v)} min={0} inputMode="numeric" />
          <Field id="pn" label="Sample size (n)" value={s.pn} onChange={(v) => set("pn", v)} min={1} inputMode="numeric" />
        </div>}
        <div>
          <Segmented label="Confidence level" value={["90", "95", "99"].includes(s.cl) ? (s.cl as "95") : ("other" as "95")} onChange={(v) => set("cl", v === ("other" as "95") ? "98" : v)}
            options={[{ id: "90", label: "90%" }, { id: "95", label: "95%" }, { id: "99", label: "99%" }, { id: "other" as "95", label: "Other" }]} />
          {!["90", "95", "99"].includes(s.cl) && <div className="mt-3"><Field id="cl" label="Confidence level" suffix="%" value={s.cl} onChange={(v) => set("cl", v)} min={0} /></div>}
        </div>
      </form>
      <ResultCard error={error} label={`${s.cl}% confidence interval`} value={`${f(lo)} to ${f(hi)}`}>
        <p className="mt-1 text-sm muted">{f(center)} ± {f(moe)}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Margin of error" v={f(moe)} />
          <Stat k="Standard error" v={f(se)} />
          <Stat k={`Critical value ${critLabel}`} v={f(crit)} />
          {isMean ? <Stat k="Method" v={s.sig === "z" ? "z interval" : "t interval"} /> : extra}
        </dl>
        <p className="mt-4 text-sm muted">Interpretation: if you repeated the sampling many times, about {s.cl}% of intervals built this way would contain the true {isMean ? "mean" : "proportion"}.</p>
      </ResultCard>
    </div>
  );
}
