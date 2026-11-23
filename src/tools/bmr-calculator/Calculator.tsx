"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { harrisBenedict, inToCm, katchMcArdle, lbToKg, mifflin, PAL_LEVELS, type Sex } from "@/lib/energy";

const n0 = (x: number) => Math.round(x).toLocaleString("en-US");

export default function BmrCalculator() {
  const [s, set] = useUrlState({ u: "us", sex: "male", age: "35", ft: "5", in: "10", lb: "180", cm: "178", kg: "82", bf: "" });
  const metric = s.u === "metric";
  const cm = metric ? Number(s.cm) : inToCm((Number(s.ft) || 0) * 12 + (Number(s.in) || 0));
  const kg = metric ? Number(s.kg) : lbToKg(Number(s.lb));
  const age = Number(s.age), sex: Sex = s.sex === "female" ? "female" : "male";
  const bf = Number(s.bf), hasBf = s.bf.trim() !== "" && bf > 2 && bf < 70;
  const err = !(age >= 18 && age <= 100) ? "Enter an age from 18 to 100 (these equations are for adults)." : !(cm > 120 && cm < 230) ? "Enter a height between 4 and 7.5 feet (120–230 cm)." : !(kg > 30 && kg < 300) ? "Enter a weight between 66 and 660 lb (30–300 kg)." : s.bf.trim() !== "" && !hasBf ? "Enter body fat between 3% and 69%, or leave it blank." : null;
  const msj = mifflin(sex, kg, cm, age), hb = harrisBenedict(sex, kg, cm, age), km = hasBf ? katchMcArdle(kg, bf) : NaN;
  const lbm = hasBf ? kg * (1 - bf / 100) : NaN;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="BMR calculator">
        <div className="flex flex-wrap gap-4">
          <Segmented label="Units" value={metric ? "metric" : "us"} onChange={(v) => set("u", v)} options={[{ id: "us", label: "ft / lb" }, { id: "metric", label: "cm / kg" }]} />
          <Segmented label="Sex" value={sex} onChange={(v) => set("sex", v)} options={[{ id: "male", label: "Male" }, { id: "female", label: "Female" }]} />
        </div>
        {metric ? (
          <div className="grid grid-cols-3 gap-3">
            <Field id="age" label="Age" suffix="yr" value={s.age} onChange={(v) => set("age", v)} min={0} inputMode="numeric" />
            <Field id="cm" label="Height" suffix="cm" value={s.cm} onChange={(v) => set("cm", v)} min={0} />
            <Field id="kg" label="Weight" suffix="kg" value={s.kg} onChange={(v) => set("kg", v)} min={0} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Field id="age" label="Age" suffix="yr" value={s.age} onChange={(v) => set("age", v)} min={0} inputMode="numeric" />
            <Field id="ft" label="Height" suffix="ft" value={s.ft} onChange={(v) => set("ft", v)} min={0} inputMode="numeric" />
            <Field id="in" label="Inches" suffix="in" value={s.in} onChange={(v) => set("in", v)} min={0} />
            <Field id="lb" label="Weight" suffix="lb" value={s.lb} onChange={(v) => set("lb", v)} min={0} />
          </div>
        )}
        <Field id="bf" label="Body fat (optional)" suffix="%" value={s.bf} onChange={(v) => set("bf", v)} min={0} hint="Adds the Katch–McArdle equation, which uses lean mass" />
      </form>
      <ResultCard error={err} label="Your BMR (Mifflin–St Jeor)" value={err ? "–" : <span data-testid="bmr">{n0(msj)} kcal/day</span>}>
        {!err && <>
          <p className="mt-1 text-sm muted">The calories your body burns at complete rest. It is about {n0(msj / 24)} kcal an hour.</p>
          <table className="mt-4 w-full text-sm" data-testid="compare">
            <thead><tr className="text-left subtle"><th className="py-1">Equation</th><th className="text-right">BMR</th></tr></thead>
            <tbody>
              <tr className="border-t border-[var(--border)] font-semibold"><td className="py-1">Mifflin–St Jeor (1990)</td><td className="text-right">{n0(msj)} kcal</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Harris–Benedict, revised (1984)</td><td className="text-right" data-testid="hb">{n0(hb)} kcal</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Katch–McArdle (lean mass)</td><td className="text-right" data-testid="km">{hasBf ? `${n0(km)} kcal` : "add body fat %"}</td></tr>
            </tbody>
          </table>
          <figure className="mt-4" aria-label="Bar chart comparing the BMR equations">
            <figcaption className="text-xs subtle">Comparison chart</figcaption>
            {([["Mifflin–St Jeor", msj, "#0d9488"], ["Harris–Benedict", hb, "#f59e0b"], ...(hasBf ? [["Katch–McArdle", km, "#6366f1"] as const] : [])] as const).map(([name, v, color]) => (
              <div key={name} className="mt-1.5 grid grid-cols-[7.5rem_1fr_auto] items-center gap-2 text-xs">
                <span>{name}</span>
                <span className="h-2.5 rounded-full bg-[var(--surface-2)]"><span className="block h-2.5 rounded-full" style={{ width: `${(v / Math.max(msj, hb, hasBf ? km : 0)) * 100}%`, background: color }} /></span>
                <span className="tabular-nums">{n0(v)}</span>
              </div>
            ))}
          </figure>
          {hasBf && <p className="mt-1 text-xs subtle">Lean body mass: {lbm.toFixed(1)} kg ({(lbm / 0.45359237).toFixed(0)} lb).</p>}
          <h3 className="mt-5 text-sm font-semibold">Daily calories by activity (BMR × activity level)</h3>
          <table className="mt-2 w-full text-sm" data-testid="tdee">
            <tbody>
              {PAL_LEVELS.map((p) => (
                <tr key={p.id} className="border-t border-[var(--border)]"><td className="py-1">{p.label} <span className="subtle">× {p.pal}</span></td><td className="text-right font-semibold">{n0(msj * p.pal)} kcal</td></tr>
              ))}
            </tbody>
          </table>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Difference between equations" v={`${n0(Math.abs(hb - msj))} kcal`} />
            <Stat k="Per hour at rest" v={`${n0(msj / 24)} kcal`} />
          </dl>
          <p className="mt-3 text-xs subtle">Prediction equations are estimates for healthy adults; individuals can differ by 10% or more. Not for children, pregnancy or people who are ill or malnourished.</p>
        </>}
      </ResultCard>
    </div>
  );
}
