"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { CUTOFFS, bmiOf, category, weightKg, type CutoffSet } from "@/lib/reverseBmi";

const LB_PER_KG = 2.2046226218;

export default function ReverseBmiCalculator() {
  const [s, set] = useUrlState({ u: "us", ft: "5", inch: "9", cm: "175", bmi: "22", cur: "180", curkg: "82", rate: "1", ratekg: "0.5", set: "standard" });
  const metric = s.u === "metric";
  const cs = (s.set === "asian" ? "asian" : "standard") as CutoffSet;
  const c = CUTOFFS[cs];
  const hM = metric ? Number(s.cm) / 100 : ((Number(s.ft) || 0) * 12 + (Number(s.inch) || 0)) * 0.0254;
  const target = Number(s.bmi);
  const curKg = metric ? Number(s.curkg) : Number(s.cur) / LB_PER_KG;
  const err = !(hM > 0.9 && hM < 2.5) ? "Enter a height between 3 ft (90 cm) and 8 ft 2 in (250 cm)." : !(target >= 10 && target <= 60) ? "Enter a target BMI between 10 and 60." : null;
  const w = (kg: number) => (metric ? `${kg.toFixed(1)} kg` : `${(kg * LB_PER_KG).toFixed(1)} lb`);
  const tKg = weightKg(target, hM);
  const lo = weightKg(c.under, hM), hi = weightKg(c.over - 0.1, hM);
  const hasCur = curKg > 0;
  const curBmi = hasCur ? bmiOf(curKg, hM) : NaN;
  const diff = tKg - curKg;
  const rateKg = metric ? Number(s.ratekg) : Number(s.rate) / LB_PER_KG;
  const weeks = hasCur && rateKg > 0 ? Math.max(1, Math.round(Math.abs(diff) / rateKg)) : 0;
  const rows = [c.under, 20, 22, c.over - 0.1, c.over, c.obese, 35, 40];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Reverse BMI calculator">
        <Segmented label="Units" value={metric ? "metric" : "us"} onChange={(v) => set("u", v)} options={[{ id: "us", label: "ft, in, lb" }, { id: "metric", label: "cm, kg" }]} />
        {metric ? <Field id="cm" label="Height" suffix="cm" value={s.cm} onChange={(v) => set("cm", v)} min={0} /> : (
          <div className="grid grid-cols-2 gap-3">
            <Field id="ft" label="Height (feet)" suffix="ft" value={s.ft} onChange={(v) => set("ft", v)} min={0} inputMode="numeric" />
            <Field id="inch" label="Height (inches)" suffix="in" value={s.inch} onChange={(v) => set("inch", v)} min={0} />
          </div>
        )}
        <Field id="bmi" label="Target BMI" value={s.bmi} onChange={(v) => set("bmi", v)} min={0} hint={`Healthy range ${c.under} to ${(c.over - 0.1).toFixed(1)}`} />
        {metric
          ? <Field id="curkg" label="Current weight (optional)" suffix="kg" value={s.curkg} onChange={(v) => set("curkg", v)} min={0} />
          : <Field id="cur" label="Current weight (optional)" suffix="lb" value={s.cur} onChange={(v) => set("cur", v)} min={0} />}
        {metric
          ? <Field id="ratekg" label="Weekly change (for a timeline)" suffix="kg/week" value={s.ratekg} onChange={(v) => set("ratekg", v)} min={0} hint="CDC: about 0.5–1 kg (1–2 lb) a week" />
          : <Field id="rate" label="Weekly change (for a timeline)" suffix="lb/week" value={s.rate} onChange={(v) => set("rate", v)} min={0} hint="CDC: about 1–2 lb a week" />}
        <Segmented label="BMI cut-offs" value={cs} onChange={(v) => set("set", v)} options={[{ id: "standard", label: "Standard (WHO/CDC)" }, { id: "asian", label: "Asian action points" }]} />
      </form>
      <ResultCard error={err} label={`Weight for a BMI of ${Number.isFinite(target) ? target : "–"}`} value={err ? "–" : <span data-testid="weight">{w(tKg)}</span>}>
        {!err && <>
          <p className="mt-1 text-sm muted">{category(target, cs)} · height {metric ? `${(hM * 100).toFixed(0)} cm` : `${s.ft || 0} ft ${s.inch || 0} in`}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Healthy weight range" v={<span data-testid="range">{w(lo)} – {w(hi)}</span>} />
            {hasCur && <>
              <Stat k="Your current BMI" v={<span data-testid="cur-bmi">{curBmi.toFixed(1)} ({category(curBmi, cs)})</span>} />
              <Stat k="Change to reach the target" v={<span data-testid="diff">{Math.abs(diff) < 0.05 ? "At target" : `${diff < 0 ? "Lose" : "Gain"} ${w(Math.abs(diff))}`}</span>} />
              {weeks > 0 && Math.abs(diff) >= 0.05 && <Stat k="Time at your weekly rate" v={<span data-testid="weeks">about {weeks} weeks</span>} />}
            </>}
          </dl>
          <h2 className="mt-5 text-sm font-semibold">Weight at each BMI for your height</h2>
          <table className="mt-2 w-full text-sm" data-testid="table">
            <thead><tr className="text-left subtle"><th className="py-1">BMI</th><th>Weight</th><th>Category</th></tr></thead>
            <tbody>{rows.map((b) => <tr key={b} className="border-t border-[var(--border)]"><td className="py-1">{b.toFixed(1)}</td><td>{w(weightKg(b, hM))}</td><td>{category(b, cs)}</td></tr>)}</tbody>
          </table>
          <p className="mt-3 text-xs subtle">For adults 20 and over. BMI is a screening measure: it doesn&apos;t tell muscle from fat, and it isn&apos;t suited to pregnancy or very muscular builds. Talk to a doctor before a big weight change.</p>
        </>}
      </ResultCard>
    </div>
  );
}
