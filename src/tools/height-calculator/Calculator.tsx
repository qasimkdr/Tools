"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { khamisRoche, midParental } from "@/lib/khamisRoche";

const CM = 2.54, LB_PER_KG = 2.20462262;
const ftIn = (inches: number) => { let f = Math.floor(inches / 12), i = Math.round((inches - f * 12) * 10) / 10; if (i >= 12) { f++; i -= 12; } return `${f} ft ${i} in`; };

export default function HeightCalculator() {
  const [s, set] = useUrlState({ u: "us", sex: "m", age: "10", mo: "0", hf: "4", hi: "7", hcm: "140", w: "75", mf: "5", mi: "4", mcm: "163", ff: "5", fi: "10", fcm: "178" });
  const metric = s.u === "metric", sex = s.sex === "f" ? "f" : "m";
  const n = (v: string) => (v.trim() === "" ? NaN : Number(v));
  const inch = (f: string, i: string, cm: string) => (metric ? n(cm) / CM : n(f) * 12 + (Number(i) || 0));
  const age = n(s.age) + (Number(s.mo) || 0) / 12;
  const child = inch(s.hf, s.hi, s.hcm), mom = inch(s.mf, s.mi, s.mcm), dad = inch(s.ff, s.fi, s.fcm);
  const wLb = metric ? n(s.w) * LB_PER_KG : n(s.w);
  const parentsOk = mom > 48 && mom < 90 && dad > 48 && dad < 90;
  const childOk = child > 24 && child < 90 && wLb > 15 && wLb < 400;
  const kr = parentsOk && childOk ? khamisRoche(sex, age, child, wLb, mom, dad) : null;
  const mph = parentsOk ? midParental(sex, mom, dad) : NaN;
  const err = !parentsOk ? "Enter both parents' heights." : !(age >= 0 && age < 25) ? "Enter the child's age." : null;
  const show = (inches: number) => (metric ? `${(inches * CM).toFixed(1)} cm` : ftIn(inches));
  const band = 8.5 / CM; // ±8.5 cm target range
  const main = kr ?? mph;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Height prediction calculator">
        <div className="flex flex-wrap gap-4">
          <Segmented label="Units" value={metric ? "metric" : "us"} onChange={(v) => set("u", v)} options={[{ id: "us", label: "ft / in / lb" }, { id: "metric", label: "cm / kg" }]} />
          <Segmented label="Child" value={sex} onChange={(v) => set("sex", v)} options={[{ id: "m", label: "Boy" }, { id: "f", label: "Girl" }]} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="age" label="Age" suffix="years" value={s.age} onChange={(v) => set("age", v)} min={0} inputMode="numeric" />
          <Field id="mo" label="and" suffix="months" value={s.mo} onChange={(v) => set("mo", v)} min={0} inputMode="numeric" />
        </div>
        <Pair metric={metric} label="Child's height" f={s.hf} i={s.hi} cm={s.hcm} set={(k, v) => set(k === "f" ? "hf" : k === "i" ? "hi" : "hcm", v)} id="h" />
        <Field id="w" label="Child's weight" suffix={metric ? "kg" : "lb"} value={s.w} onChange={(v) => set("w", v)} min={0} />
        <Pair metric={metric} label="Mother's height" f={s.mf} i={s.mi} cm={s.mcm} set={(k, v) => set(k === "f" ? "mf" : k === "i" ? "mi" : "mcm", v)} id="m" />
        <Pair metric={metric} label="Father's height" f={s.ff} i={s.fi} cm={s.fcm} set={(k, v) => set(k === "f" ? "ff" : k === "i" ? "fi" : "fcm", v)} id="f" />
      </form>
      <ResultCard label={kr != null ? "Predicted adult height (Khamis-Roche)" : "Mid-parental target height"} error={err} value={err ? "–" : show(main)}>
        {!err && <>
          <p className="mt-1 text-sm muted">
            {kr != null ? `Likely range about ${show(kr - 2)} to ${show(kr + 2)}` : age >= 4 && age <= 17.5 ? "Enter the child's height and weight for a Khamis-Roche prediction." : "The Khamis-Roche method covers ages 4 to 17½, so this is the parents-only estimate."}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Mid-parental target" v={<span data-testid="mph">{show(mph)}</span>} />
            <Stat k="Target range (±8.5 cm)" v={`${show(mph - band)} – ${show(mph + band)}`} />
            {kr != null && <Stat k="Adult height reached so far" v={`${Math.min(100, (100 * child) / kr).toFixed(1)}%`} />}
            {kr != null && <Stat k="Still to grow" v={show(Math.max(0, kr - child))} />}
          </dl>
          <p className="mt-4 text-xs subtle">An estimate, not a diagnosis. Puberty timing, nutrition and health change final height. If you&apos;re worried about a child&apos;s growth, talk to their pediatrician, who can plot it on a growth chart.</p>
        </>}
      </ResultCard>
    </div>
  );
}

function Pair({ metric, label, f, i, cm, set, id }: { metric: boolean; label: string; f: string; i: string; cm: string; set: (k: "f" | "i" | "cm", v: string) => void; id: string }) {
  return metric ? <Field id={`${id}cm`} label={label} suffix="cm" value={cm} onChange={(v) => set("cm", v)} min={0} /> : (
    <div className="grid grid-cols-2 gap-3">
      <Field id={`${id}f`} label={label} suffix="ft" value={f} onChange={(v) => set("f", v)} min={0} inputMode="numeric" />
      <Field id={`${id}i`} label="Inches" suffix="in" value={i} onChange={(v) => set("i", v)} min={0} />
    </div>
  );
}
