"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const f = (x: number, d = 2) => (Number.isFinite(x) ? x.toLocaleString("en-US", { maximumFractionDigits: d }) : "–");

export default function ProductivityCalculator() {
  const [s, set] = useUrlState({ out: "2400", unit: "units", hrs: "160", ppl: "1", pout: "2100", phrs: "150", target: "3000" });
  const out = Number(s.out), hrs = Number(s.hrs), ppl = Number(s.ppl) || 1, unit = s.unit.trim() || "units";
  const perHour = out / hrs, perWorker = out / ppl;
  const prev = Number(s.pout) / Number(s.phrs), change = Number.isFinite(prev) && prev > 0 ? (perHour / prev - 1) * 100 : NaN;
  const target = Number(s.target), needH = target > 0 ? target / perHour : NaN;
  const err = !(out > 0) ? "Enter the output produced." : !(hrs > 0) ? "Enter the hours worked." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Productivity calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="out" label="Output" value={s.out} onChange={(v) => set("out", v)} min={0} hint="Units made, tasks done, sales $…" />
          <div><label htmlFor="unit" className="label">Output unit</label><input id="unit" className="field" value={s.unit} onChange={(e) => set("unit", e.target.value)} maxLength={20} /></div>
          <Field id="hrs" label="Total labor hours" suffix="h" value={s.hrs} onChange={(v) => set("hrs", v)} min={0} hint="All workers combined" />
          <Field id="ppl" label="Number of workers" value={s.ppl} onChange={(v) => set("ppl", v)} min={1} inputMode="numeric" />
        </div>
        <div>
          <span className="label">Compare with a previous period (optional)</span>
          <div className="grid grid-cols-2 gap-3">
            <Field id="pout" label="Previous output" value={s.pout} onChange={(v) => set("pout", v)} min={0} />
            <Field id="phrs" label="Previous hours" suffix="h" value={s.phrs} onChange={(v) => set("phrs", v)} min={0} />
          </div>
        </div>
        <Field id="target" label="Target output (optional)" suffix={unit} value={s.target} onChange={(v) => set("target", v)} min={0} />
      </form>
      <ResultCard label="Labor productivity" error={err} value={err ? "–" : `${f(perHour)} ${unit}/hour`}>
        {!err && <>
          <p className="mt-1 text-sm muted">{f(out)} {unit} ÷ {f(hrs)} hours</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Output per worker" v={<span data-testid="per-worker">{f(perWorker)} {unit}</span>} />
            <Stat k="Hours per unit of output" v={`${f(hrs / out, 4)} h (${f((hrs / out) * 60, 2)} min)`} />
            {Number.isFinite(change) && <Stat k="Previous productivity" v={`${f(prev)} ${unit}/hour`} />}
            {Number.isFinite(change) && <Stat k="Change" v={<span data-testid="change">{change >= 0 ? "+" : ""}{f(change)}%</span>} />}
            {Number.isFinite(needH) && <Stat k={`Hours for ${f(target)} ${unit}`} v={<span data-testid="need">{f(needH)} h</span>} />}
            {Number.isFinite(needH) && ppl > 1 && <Stat k="Per worker" v={`${f(needH / ppl)} h`} />}
          </dl>
          <p className="mt-4 text-xs subtle">Productivity measures output per unit of input; it doesn&apos;t capture quality, so track defects or customer outcomes alongside it.</p>
        </>}
      </ResultCard>
    </div>
  );
}
