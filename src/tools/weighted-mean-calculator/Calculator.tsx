"use client";
import { ResultCard, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { parseNumbers, weightedMean } from "@/lib/descriptive";

const fmt = (n: number, d = 4) => (Number.isFinite(n) ? Number(n.toFixed(d)).toLocaleString("en-US", { maximumFractionDigits: d }) : "–");

export default function WeightedMeanCalculator() {
  const [s, set] = useUrlState({ x: "90, 80, 70", w: "20, 30, 50" });
  const xs = parseNumbers(s.x), ws = parseNumbers(s.w);
  const err = xs.bad.length || ws.bad.length ? `Not a number: ${[...xs.bad, ...ws.bad].slice(0, 3).join(", ")}`
    : !xs.nums.length ? "Enter at least one value."
    : xs.nums.length !== ws.nums.length ? `You entered ${xs.nums.length} value${xs.nums.length === 1 ? "" : "s"} and ${ws.nums.length} weight${ws.nums.length === 1 ? "" : "s"}; the lists must be the same length.`
    : ws.nums.some((w) => w < 0) ? "Weights can't be negative." : null;
  const r = err ? null : weightedMean(xs.nums, ws.nums);
  const error = err ?? (r ? null : "The weights must add up to more than zero.");
  const plain = xs.nums.length ? xs.nums.reduce((a, b) => a + b, 0) / xs.nums.length : NaN;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="Weighted mean calculator">
        <div className="grid grid-cols-2 gap-3">
          <label className="block"><span className="label">Values (x)</span><textarea id="x" rows={5} className="field mt-1 font-mono" value={s.x} onChange={(e) => set("x", e.target.value)} spellCheck={false} /></label>
          <label className="block"><span className="label">Weights (w)</span><textarea id="w" rows={5} className="field mt-1 font-mono" value={s.w} onChange={(e) => set("w", e.target.value)} spellCheck={false} /></label>
        </div>
        <p className="text-xs subtle">Separate numbers with commas, spaces or new lines. You can paste two columns straight from a spreadsheet. Weights can be percentages, credits, counts or any positive numbers.</p>
        {r && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-testid="table">
              <thead><tr className="text-left subtle"><th className="py-1">x</th><th>w</th><th>w × x</th><th>Share of weight</th></tr></thead>
              <tbody>
                {xs.nums.slice(0, 100).map((x, i) => (
                  <tr key={i} className="border-t border-[var(--border)]"><td className="py-1">{fmt(x)}</td><td>{fmt(ws.nums[i])}</td><td>{fmt(x * ws.nums[i])}</td><td>{fmt((100 * ws.nums[i]) / r.sumW, 2)}%</td></tr>
                ))}
                <tr className="border-t border-[var(--border)] font-semibold"><td className="py-1">Σ</td><td>{fmt(r.sumW)}</td><td>{fmt(r.sumWX)}</td><td>100%</td></tr>
              </tbody>
            </table>
            {xs.nums.length > 100 && <p className="mt-1 text-xs subtle">Showing the first 100 rows; totals use all {xs.nums.length}.</p>}
          </div>
        )}
      </form>
      <ResultCard label="Weighted mean" error={error} value={r ? fmt(r.mean) : "–"}>
        {r && <>
          <p className="mt-1 text-sm muted">{fmt(r.sumWX)} ÷ {fmt(r.sumW)} = {fmt(r.mean)}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Sum of weights Σw" v={fmt(r.sumW)} />
            <Stat k="Sum of products Σwx" v={fmt(r.sumWX)} />
            <Stat k="Unweighted mean" v={<span data-testid="plain">{fmt(plain)}</span>} />
            <Stat k="Weighted SD" v={<span data-testid="wsd">{fmt(r.sdPop)}</span>} />
            <Stat k="Weighted SD (frequency weights, n − 1)" v={fmt(r.sdFreq)} />
            <Stat k="Number of values" v={xs.nums.length} />
          </dl>
          <button type="button" className="btn-ghost mt-4 text-sm" onClick={() => downloadCsv("weighted-mean.csv", ["x", "w", "w*x"], xs.nums.map((x, i) => [x, ws.nums[i], x * ws.nums[i]]))}>Download CSV</button>
        </>}
      </ResultCard>
    </div>
  );
}
