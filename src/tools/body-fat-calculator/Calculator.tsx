"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const CM = 2.54, LB_PER_KG = 2.20462262;
const L = Math.log10;
/** U.S. Navy circumference equations (Hodgdon & Beckett), all measurements in inches. */
const navy = (sex: "m" | "f", h: number, waist: number, neck: number, hip: number) =>
  sex === "m" ? 86.01 * L(waist - neck) - 70.041 * L(h) + 36.76 : 163.205 * L(waist + hip - neck) - 97.684 * L(h) - 78.387;
// American Council on Exercise body fat categories.
const ACE = { m: [[2, "Essential fat"], [6, "Athletes"], [14, "Fitness"], [18, "Average"], [25, "Obese"]], f: [[10, "Essential fat"], [14, "Athletes"], [21, "Fitness"], [25, "Average"], [32, "Obese"]] } as const;
const category = (sex: "m" | "f", bf: number) => { let c = "Below essential fat"; for (const [min, name] of ACE[sex]) if (bf >= min) c = name; return c; };

export default function BodyFatCalculator() {
  const [s, set] = useUrlState({ u: "in", sex: "m", age: "35", wt: "180", h: "70", waist: "34", neck: "15", hip: "40" });
  const cm = s.u === "cm", sex = s.sex === "f" ? "f" : "m";
  const toIn = (v: string) => (cm ? Number(v) / CM : Number(v));
  const h = toIn(s.h), waist = toIn(s.waist), neck = toIn(s.neck), hip = toIn(s.hip);
  const lb = cm ? Number(s.wt) * LB_PER_KG : Number(s.wt), age = Number(s.age);
  const okMeas = h > 0 && waist > 0 && neck > 0 && (sex === "m" || hip > 0);
  const err = !okMeas ? "Enter height, neck and waist" + (sex === "f" ? " and hips." : ".") : sex === "m" && waist <= neck ? "Waist must be larger than neck." : null;
  const bf = err ? NaN : navy(sex, h, waist, neck, hip);
  const valid = Number.isFinite(bf) && bf > 0 && bf < 75;
  const bmi = lb > 0 && h > 0 ? (703 * lb) / (h * h) : NaN;
  const deur = bmi > 0 && age >= 18 ? 1.2 * bmi + 0.23 * age - 10.8 * (sex === "m" ? 1 : 0) - 5.4 : NaN;
  const mass = (x: number) => (cm ? `${(x / LB_PER_KG).toFixed(1)} kg` : `${x.toFixed(1)} lb`);
  const u = cm ? "cm" : "in";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Body fat calculator">
        <div className="flex flex-wrap gap-4">
          <Segmented label="Sex" value={sex} onChange={(v) => set("sex", v)} options={[{ id: "m", label: "Male" }, { id: "f", label: "Female" }]} />
          <Segmented label="Units" value={cm ? "cm" : "in"} onChange={(v) => set("u", v)} options={[{ id: "in", label: "in / lb" }, { id: "cm", label: "cm / kg" }]} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="h" label="Height" suffix={u} value={s.h} onChange={(v) => set("h", v)} min={0} />
          <Field id="neck" label="Neck" suffix={u} value={s.neck} onChange={(v) => set("neck", v)} min={0} hint="Just below the larynx" />
          <Field id="waist" label="Waist" suffix={u} value={s.waist} onChange={(v) => set("waist", v)} min={0} hint={sex === "m" ? "Around the navel" : "At the narrowest point"} />
          {sex === "f" && <Field id="hip" label="Hips" suffix={u} value={s.hip} onChange={(v) => set("hip", v)} min={0} hint="At the widest point" />}
          <Field id="wt" label="Weight (for fat mass)" suffix={cm ? "kg" : "lb"} value={s.wt} onChange={(v) => set("wt", v)} min={0} />
          <Field id="age" label="Age (for BMI method)" suffix="years" value={s.age} onChange={(v) => set("age", v)} min={0} inputMode="numeric" />
        </div>
        <p className="text-xs subtle">Measure on bare skin with a flexible tape, snug but not compressing, and round to the nearest half inch (1 cm). Take each measurement twice.</p>
      </form>
      <ResultCard label="Body fat (U.S. Navy method)" error={err ?? (valid ? null : "These measurements fall outside the formula's range. Check them and the units.")} value={valid ? `${bf.toFixed(1)}%` : "–"}>
        {valid && <>
          <p className="mt-1 text-sm muted">Category: <strong data-testid="cat">{category(sex, bf)}</strong> (American Council on Exercise)</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {lb > 0 && <Stat k="Fat mass" v={<span data-testid="fat">{mass((lb * bf) / 100)}</span>} />}
            {lb > 0 && <Stat k="Lean mass" v={mass(lb * (1 - bf / 100))} />}
            <Stat k="BMI" v={Number.isFinite(bmi) ? bmi.toFixed(1) : "–"} />
            <Stat k="BMI-method estimate" v={<span data-testid="deur">{Number.isFinite(deur) ? `${deur.toFixed(1)}%` : "–"}</span>} />
          </dl>
          <table className="mt-4 w-full text-sm">
            <thead><tr className="text-left subtle"><th className="py-1">Category</th><th>Men</th><th>Women</th></tr></thead>
            <tbody>
              {[["Essential fat", "2–5%", "10–13%"], ["Athletes", "6–13%", "14–20%"], ["Fitness", "14–17%", "21–24%"], ["Average", "18–24%", "25–31%"], ["Obese", "25%+", "32%+"]].map(([c, m, f]) => (
                <tr key={c} className={`border-t border-[var(--border)] ${c === category(sex, bf) ? "font-semibold" : ""}`}><td className="py-1">{c}</td><td>{m}</td><td>{f}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs subtle">An estimate: tape methods can differ by several percentage points from lab methods such as DEXA, especially for very muscular people. Not an official military body composition assessment.</p>
        </>}
      </ResultCard>
    </div>
  );
}
