"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// Adult categories: CDC. Pregnancy gain (single baby): IOM 2009 / CDC. Waist >35 in (88 cm) at BMI 25–34.9: NHLBI.
const CATS = [
  { max: 18.5, name: "Underweight", tone: "text-amber-700", gain: "28–40 lb (12.5–18 kg)" },
  { max: 25, name: "Healthy weight", tone: "text-[var(--color-brand-600)]", gain: "25–35 lb (11.5–16 kg)" },
  { max: 30, name: "Overweight", tone: "text-amber-700", gain: "15–25 lb (7–11.5 kg)" },
  { max: 35, name: "Obesity (class 1)", tone: "text-red-700", gain: "11–20 lb (5–9 kg)" },
  { max: 40, name: "Obesity (class 2)", tone: "text-red-700", gain: "11–20 lb (5–9 kg)" },
  { max: Infinity, name: "Obesity (class 3)", tone: "text-red-700", gain: "11–20 lb (5–9 kg)" },
];
const SCALE = [18.5, 25, 30, 35, 40];
const at = (b: number) => Math.min(100, Math.max(0, ((b - 15) / (42 - 15)) * 100));

export default function BmiWomenCalculator() {
  const [s, set] = useUrlState({ u: "us", ft: "5", in: "5", lb: "160", cm: "165", kg: "60", waist: "", age: "" });
  const metric = s.u === "metric";
  const hM = metric ? Number(s.cm) / 100 : ((Number(s.ft) || 0) * 12 + (Number(s.in) || 0)) * 0.0254;
  const kg = metric ? Number(s.kg) : Number(s.lb) * 0.45359237;
  const bmi = kg / (hM * hM), shown = Math.round(bmi * 10) / 10;
  const cat = CATS.find((c) => shown < c.max)!;
  const lo = 18.5 * hM * hM, hi = 24.9 * hM * hM;
  const w = (k: number) => (metric ? `${k.toFixed(1)} kg` : `${(k / 0.45359237).toFixed(0)} lb`);
  const waistIn = s.waist ? (metric ? Number(s.waist) / 2.54 : Number(s.waist)) : NaN;
  const whtr = waistIn > 0 ? (waistIn * 0.0254) / hM : NaN;
  const age = Number(s.age);
  const error = !(hM > 0.9 && hM < 2.5) ? "Enter a height between 3 and 8 feet (90–250 cm)." : !(kg > 20 && kg < 350) ? "Enter a weight between 45 and 770 lb (20–350 kg)." : null;
  const pos = at(shown);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="BMI calculator for women">
        <Segmented label="Units" value={metric ? "metric" : "us"} onChange={(v) => set("u", v)} options={[{ id: "us", label: "ft / in / lb" }, { id: "metric", label: "cm / kg" }]} />
        {metric ? (
          <div className="grid grid-cols-2 gap-3">
            <Field id="cm" label="Height" suffix="cm" value={s.cm} onChange={(v) => set("cm", v)} min={0} />
            <Field id="kg" label="Weight" suffix="kg" value={s.kg} onChange={(v) => set("kg", v)} min={0} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <Field id="ft" label="Height (feet)" suffix="ft" value={s.ft} onChange={(v) => set("ft", v)} min={0} inputMode="numeric" />
            <Field id="in" label="Inches" suffix="in" value={s.in} onChange={(v) => set("in", v)} min={0} />
            <Field id="lb" label="Weight" suffix="lb" value={s.lb} onChange={(v) => set("lb", v)} min={0} />
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field id="waist" label="Waist (optional)" suffix={metric ? "cm" : "in"} value={s.waist} onChange={(v) => set("waist", v)} min={0} hint="Measure just above the hip bones." />
          <Field id="age" label="Age (optional)" suffix="years" value={s.age} onChange={(v) => set("age", v)} min={0} inputMode="numeric" />
        </div>
      </form>
      <ResultCard error={error} label="Your BMI" value={shown.toFixed(1)}>
        {age > 0 && age < 20 ? (
          <p className="mt-2 text-sm text-amber-800" data-testid="teen">Under 20, BMI is judged with age- and sex-specific percentiles (CDC growth charts), not the adult categories below.</p>
        ) : <p className={`mt-1 text-lg font-bold ${cat.tone}`} data-testid="category">{cat.name}</p>}
        <div className="mt-4" aria-hidden>
          <div className="relative h-2.5 overflow-hidden rounded-full" style={{ background: "linear-gradient(90deg,#f59e0b 0 13%,#0d9488 13% 37%,#f59e0b 37% 56%,#ef4444 56%)" }} />
          <div className="relative h-3"><span className="absolute -top-1 h-4 w-1 -translate-x-1/2 rounded bg-[var(--text)]" style={{ left: `${pos}%` }} /></div>
          <div className="relative h-4 text-[11px] subtle">{SCALE.map((x) => <span key={x} className="absolute -translate-x-1/2" style={{ left: `${at(x)}%` }}>{x}</span>)}</div>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Healthy weight for your height" v={`${w(lo)} – ${w(hi)}`} />
          <Stat k={bmi >= 25 ? "To reach BMI 24.9" : bmi < 18.5 ? "To reach BMI 18.5" : "Within healthy range"} v={bmi >= 25 ? `lose ${w(kg - hi)}` : bmi < 18.5 ? `gain ${w(lo - kg)}` : "✓"} />
          {Number.isFinite(whtr) && <Stat k="Waist-to-height ratio" v={`${whtr.toFixed(2)} ${whtr < 0.5 ? "(under 0.5 ✓)" : "(0.5 or more)"}`} />}
          <Stat k="Pregnancy weight gain (single baby)" v={cat.gain} />
        </dl>
        {waistIn > 35 && shown >= 25 && shown < 35 && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800" data-testid="waist">A waist over 35 in (88 cm) with a BMI of 25–34.9 is linked to higher risk of type 2 diabetes, high blood pressure and heart disease (NHLBI).</p>}
        <p className="mt-3 text-xs subtle">Screening tool for adult women, not a diagnosis. BMI doesn&apos;t measure body fat directly and isn&apos;t used during pregnancy; the weight-gain range applies to your pre-pregnancy BMI.</p>
      </ResultCard>
    </div>
  );
}
