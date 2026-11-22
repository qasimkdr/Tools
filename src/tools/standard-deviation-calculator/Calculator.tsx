"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { parseNumbers, summarize } from "@/lib/descriptive";
import { tInv } from "@/lib/stats";

const fmt = (n: number, d = 4) => (Number.isFinite(n) ? Number(n.toFixed(d)).toLocaleString("en-US", { maximumFractionDigits: d }) : "–");

export default function StandardDeviationCalculator() {
  const [s, set] = useUrlState({ data: "2, 4, 4, 4, 5, 5, 7, 9", type: "sample" });
  const { nums, bad } = parseNumbers(s.data);
  const pop = s.type === "population";
  const r = summarize(nums);
  const err = bad.length ? `Not a number: ${bad.slice(0, 3).join(", ")}` : !r ? "Enter some numbers." : !pop && r.n < 2 ? "A sample needs at least 2 values." : null;
  const sd = r ? (pop ? r.sdPop : r.sdSample) : NaN, variance = r ? (pop ? r.varPop : r.varSample) : NaN;
  const se = r && r.n > 1 ? r.sdSample / Math.sqrt(r.n) : NaN;
  const t = r && r.n > 1 ? tInv(0.975, r.n - 1) : NaN;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Standard deviation calculator">
          <div>
            <label htmlFor="data" className="label">Data set</label>
            <textarea id="data" rows={6} className="field font-mono" value={s.data} onChange={(e) => set("data", e.target.value)} spellCheck={false} />
            <p className="mt-1 text-xs subtle">Separate numbers with commas, spaces or new lines, or paste a column from a spreadsheet.</p>
          </div>
          <Segmented label="Your data is a" value={pop ? "population" : "sample"} onChange={(v) => set("type", v)} options={[{ id: "sample", label: "Sample (n − 1)" }, { id: "population", label: "Population (N)" }]} />
        </form>
        <ResultCard label={pop ? "Population standard deviation (σ)" : "Sample standard deviation (s)"} error={err} value={err ? "–" : fmt(sd)}>
          {r && !err && <>
            <p className="mt-1 text-sm muted">Mean {fmt(r.mean)} · variance {fmt(variance)} · n = {r.n}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Mean (x̄)" v={<span data-testid="mean">{fmt(r.mean)}</span>} />
              <Stat k={pop ? "Sample SD (s)" : "Population SD (σ)"} v={<span data-testid="other-sd">{fmt(pop ? r.sdSample : r.sdPop)}</span>} />
              <Stat k="Sample variance (s²)" v={fmt(r.varSample)} />
              <Stat k="Population variance (σ²)" v={fmt(r.varPop)} />
              <Stat k="Standard error of mean" v={<span data-testid="se">{fmt(se)}</span>} />
              <Stat k="95% CI for the mean" v={Number.isFinite(t) ? <span data-testid="ci">{fmt(r.mean - t * se)} to {fmt(r.mean + t * se)}</span> : "–"} />
              <Stat k="Median" v={fmt(r.median)} />
              <Stat k="Mode" v={r.modes.length ? r.modes.slice(0, 4).map((m) => fmt(m)).join(", ") : "none"} />
              <Stat k="Min / max" v={`${fmt(r.min)} / ${fmt(r.max)}`} />
              <Stat k="Range" v={fmt(r.range)} />
              <Stat k="Sum" v={fmt(r.sum)} />
              <Stat k="Coefficient of variation" v={r.mean !== 0 ? `${fmt((100 * sd) / Math.abs(r.mean), 2)}%` : "–"} />
            </dl>
          </>}
        </ResultCard>
      </div>
      {r && !err && (
        <div>
          <h3 className="text-base font-semibold">Step by step</h3>
          <ol className="mt-2 space-y-1 text-sm" data-testid="steps">
            <li>1. Mean: x̄ = {fmt(r.sum)} ÷ {r.n} = <strong>{fmt(r.mean)}</strong></li>
            <li>2. Subtract the mean from each value and square the result (table below).</li>
            <li>3. Sum of squares: Σ(x − x̄)² = <strong>{fmt(r.ss)}</strong></li>
            <li>4. Variance: {fmt(r.ss)} ÷ {pop ? r.n : `(${r.n} − 1)`} = <strong>{fmt(variance)}</strong></li>
            <li>5. Standard deviation: √{fmt(variance)} = <strong>{fmt(sd)}</strong></li>
          </ol>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full max-w-lg text-sm">
              <thead><tr className="text-left subtle"><th className="py-1">x</th><th>x − x̄</th><th>(x − x̄)²</th></tr></thead>
              <tbody>
                {nums.slice(0, 50).map((x, i) => <tr key={i} className="border-t border-[var(--border)]"><td className="py-1">{fmt(x)}</td><td>{fmt(x - r.mean)}</td><td>{fmt((x - r.mean) ** 2)}</td></tr>)}
              </tbody>
            </table>
            {nums.length > 50 && <p className="mt-1 text-xs subtle">Showing the first 50 values; results use all {nums.length}.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
