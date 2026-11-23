"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// 2025 AHA/ACC adult categories (unchanged from 2017). When systolic and diastolic fall in different categories, the higher applies.
const CATS = [
  { id: 0, name: "Normal", range: "below 120 and below 80", color: "#15803d" },
  { id: 1, name: "Elevated", range: "120–129 and below 80", color: "#ca8a04" },
  { id: 2, name: "Stage 1 hypertension", range: "130–139 or 80–89", color: "#ea580c" },
  { id: 3, name: "Stage 2 hypertension", range: "140 or higher, or 90 or higher", color: "#dc2626" },
];
const catOf = (sys: number, dia: number) => {
  const s = sys < 120 ? 0 : sys < 130 ? 1 : sys < 140 ? 2 : 3;
  const d = dia < 80 ? 0 : dia < 90 ? 2 : 3;
  return Math.max(s, d);
};

export default function BloodPressureCalculator() {
  const [s, set] = useUrlState({ age: "45", s1: "128", d1: "78", s2: "", d2: "", s3: "", d3: "" });
  const age = Number(s.age);
  const reads = [[s.s1, s.d1], [s.s2, s.d2], [s.s3, s.d3]].map(([a, b]) => [Number(a), Number(b)]).filter(([a, b]) => a > 0 && b > 0);
  const sys = reads.length ? reads.reduce((t, r) => t + r[0], 0) / reads.length : NaN;
  const dia = reads.length ? reads.reduce((t, r) => t + r[1], 0) / reads.length : NaN;
  const bad = reads.some(([a, b]) => a < 50 || a > 300 || b < 30 || b > 200 || b >= a);
  const err = !(age > 0) ? "Enter your age." : age < 18 ? "These categories are for adults 18 and over. Children's blood pressure is judged against percentiles for their age, sex and height; ask your child's pediatrician." : !reads.length ? "Enter a systolic (top) and diastolic (bottom) reading." : bad ? "Check the numbers: systolic is the higher number and readings are usually between 70 and 250." : null;
  const cat = err ? null : CATS[catOf(Math.round(sys), Math.round(dia))];
  const severe = !err && (sys > 180 || dia > 120);
  const low = !err && (sys < 90 || dia < 60);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Blood pressure calculator">
        <Field id="age" label="Age" suffix="years" value={s.age} onChange={(v) => set("age", v)} min={0} inputMode="numeric" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Field id={`s${i}`} label={`Reading ${i}: systolic${i > 1 ? " (optional)" : ""}`} suffix="mmHg" value={(s as Record<string, string>)[`s${i}`]} onChange={(v) => set(`s${i}` as "s1", v)} min={0} inputMode="numeric" />
            <Field id={`d${i}`} label="Diastolic" suffix="mmHg" value={(s as Record<string, string>)[`d${i}`]} onChange={(v) => set(`d${i}` as "d1", v)} min={0} inputMode="numeric" />
          </div>
        ))}
        <p className="text-xs subtle">For an accurate picture, sit quietly for 5 minutes with your back supported and arm at heart level, then take 2–3 readings a minute apart and average them.</p>
      </form>
      <ResultCard label="Your blood pressure category" error={err} value={cat ? <span style={{ color: cat.color }}>{cat.name}</span> : "–"}>
        {cat && <>
          <p className="mt-1 text-sm muted" data-testid="avg">{reads.length > 1 ? `Average of ${reads.length} readings: ` : ""}{Math.round(sys)}/{Math.round(dia)} mmHg</p>
          {severe && <p className="mt-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800" data-testid="severe">A reading above 180/120 is very high. Wait a few minutes and measure again. If it&apos;s still that high, contact a doctor right away, and call emergency services if you have chest pain, shortness of breath, back pain, numbness or weakness, vision changes or difficulty speaking.</p>}
          {low && !severe && <p className="mt-3 rounded-lg bg-[var(--surface-2)] p-3 text-sm">Readings below 90/60 are generally considered low. Low blood pressure without symptoms is often fine; dizziness or fainting should be discussed with a doctor.</p>}
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Pulse pressure" v={`${Math.round(sys - dia)} mmHg`} />
            <Stat k="Mean arterial pressure" v={<span data-testid="map">{Math.round(dia + (sys - dia) / 3)} mmHg</span>} />
          </dl>
          <table className="mt-4 w-full text-sm">
            <thead><tr className="text-left subtle"><th className="py-1">Category (adults)</th><th>Systolic / diastolic</th></tr></thead>
            <tbody>{CATS.map((c) => <tr key={c.id} className={`border-t border-[var(--border)] ${c.id === cat.id ? "font-semibold" : ""}`}><td className="py-1"><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />{c.name}</td><td>{c.range}</td></tr>)}</tbody>
          </table>
          <p className="mt-4 text-xs subtle">Information only, not a diagnosis. One high reading doesn&apos;t mean you have high blood pressure; a diagnosis is based on repeated readings. Talk to your doctor about your numbers.</p>
        </>}
      </ResultCard>
    </div>
  );
}
