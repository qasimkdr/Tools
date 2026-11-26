"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { parseNumbers } from "@/lib/descriptive";
import { fiveNumber, type QuartileMethod } from "@/lib/fiveNum";

const fmt = (x: number) => (Number.isFinite(x) ? String(Number(x.toPrecision(10))) : "–");
const METHODS: { id: QuartileMethod; label: string }[] = [{ id: "exclusive", label: "Textbook / TI-84" }, { id: "tukey", label: "Tukey hinges" }, { id: "linear", label: "Excel / R default" }];

export default function FiveNumberSummaryCalculator() {
  const [s, set] = useUrlState({ data: "3, 7, 8, 5, 12, 14, 21, 13, 18", m: "exclusive" });
  const m = (METHODS.some((x) => x.id === s.m) ? s.m : "exclusive") as QuartileMethod;
  const { nums, bad } = parseNumbers(s.data);
  const err = nums.length < 1 ? "Enter at least one number." : null;
  const r = err ? null : fiveNumber(nums, m);
  const X = (v: number) => 10 + ((v - (r ? r.min : 0)) / (r && r.max > r.min ? r.max - r.min : 1)) * 280;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Five number summary calculator">
        <div>
          <label htmlFor="data" className="label">Data set</label>
          <textarea id="data" rows={6} className="field font-mono text-sm" value={s.data} onChange={(e) => set("data", e.target.value)} spellCheck={false} />
          <p className="mt-1 text-xs subtle">Separate numbers with commas, spaces or new lines. You can paste a column from a spreadsheet.</p>
          {bad.length > 0 && <p className="mt-1 text-xs text-[var(--danger,#b91c1c)]">Ignored: {bad.slice(0, 5).join(", ")}{bad.length > 5 ? "…" : ""}</p>}
        </div>
        <Segmented label="Quartile method" value={m} onChange={(v) => set("m", v)} options={METHODS} />
        <p className="text-xs subtle">Textbook / TI-84 splits the data at the median and leaves the median out of both halves. Tukey hinges keep it in both halves (R fivenum). Excel QUARTILE.INC and R&apos;s default interpolate between values.</p>
      </form>
      <ResultCard error={err} label="Five number summary" value={r ? <span data-testid="summary">{[r.min, r.q1, r.median, r.q3, r.max].map(fmt).join(", ")}</span> : "–"}>
        {r && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <Stat k="Minimum" v={fmt(r.min)} />
            <Stat k="Q1 (25th percentile)" v={<span data-testid="q1">{fmt(r.q1)}</span>} />
            <Stat k="Median" v={<span data-testid="median">{fmt(r.median)}</span>} />
            <Stat k="Q3 (75th percentile)" v={<span data-testid="q3">{fmt(r.q3)}</span>} />
            <Stat k="Maximum" v={fmt(r.max)} />
            <Stat k="IQR (Q3 − Q1)" v={<span data-testid="iqr">{fmt(r.iqr)}</span>} />
            <Stat k="Range" v={fmt(r.range)} />
            <Stat k="Mean" v={fmt(Number(r.mean.toFixed(6)))} />
            <Stat k="Outlier fences" v={`${fmt(r.lower)} to ${fmt(r.upper)}`} />
          </dl>
          <p className="mt-2 text-sm" data-testid="outliers">{r.outliers.length ? <>Outliers (beyond 1.5 × IQR): <strong>{r.outliers.map(fmt).join(", ")}</strong></> : "No outliers beyond 1.5 × IQR."}</p>
          {r.max > r.min && <>
            <h2 className="mt-5 text-sm font-semibold">Box plot</h2>
            <svg viewBox="0 0 300 70" className="mt-2 w-full" role="img" aria-label={`Box plot from ${fmt(r.min)} to ${fmt(r.max)}, box from ${fmt(r.q1)} to ${fmt(r.q3)}, median ${fmt(r.median)}`}>
              <line x1={X(r.whiskerLo)} x2={X(r.q1)} y1={30} y2={30} stroke="currentColor" />
              <line x1={X(r.q3)} x2={X(r.whiskerHi)} y1={30} y2={30} stroke="currentColor" />
              <line x1={X(r.whiskerLo)} x2={X(r.whiskerLo)} y1={20} y2={40} stroke="currentColor" />
              <line x1={X(r.whiskerHi)} x2={X(r.whiskerHi)} y1={20} y2={40} stroke="currentColor" />
              <rect x={X(r.q1)} y={14} width={Math.max(1, X(r.q3) - X(r.q1))} height={32} fill="var(--color-brand-500)" fillOpacity={0.2} stroke="var(--color-brand-500)" />
              <line x1={X(r.median)} x2={X(r.median)} y1={14} y2={46} stroke="var(--color-brand-500)" strokeWidth={2.5} />
              {r.outliers.map((o, i) => <circle key={i} cx={X(o)} cy={30} r={3} fill="none" stroke="currentColor" />)}
              <text x={X(r.min)} y={64} fontSize={9} textAnchor="start" fill="currentColor">{fmt(r.min)}</text>
              <text x={X(r.median)} y={64} fontSize={9} textAnchor="middle" fill="currentColor">{fmt(r.median)}</text>
              <text x={X(r.max)} y={64} fontSize={9} textAnchor="end" fill="currentColor">{fmt(r.max)}</text>
            </svg>
          </>}
          <h2 className="mt-4 text-sm font-semibold">Sorted data (n = {r.n})</h2>
          <p className="mt-1 max-h-24 overflow-auto break-words font-mono text-xs" data-testid="sorted">{r.sorted.slice(0, 2000).map(fmt).join(", ")}{r.n > 2000 ? "…" : ""}</p>
        </>}
      </ResultCard>
    </div>
  );
}
