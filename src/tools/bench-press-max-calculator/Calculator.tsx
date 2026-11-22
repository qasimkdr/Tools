"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

export const formulas = {
  Epley: (w: number, r: number) => (r === 1 ? w : w * (1 + r / 30)),
  Brzycki: (w: number, r: number) => (w * 36) / (37 - r),
  Lombardi: (w: number, r: number) => w * Math.pow(r, 0.1),
};
const PLATES = { lb: { bar: 45, plates: [45, 35, 25, 10, 5, 2.5] }, kg: { bar: 20, plates: [25, 20, 15, 10, 5, 2.5, 1.25] } };
const PCTS: [number, string][] = [[100, "1"], [95, "2"], [90, "3–4"], [85, "5–6"], [80, "7–8"], [75, "9–10"], [70, "11–12"], [65, "13–15"], [60, "15–20"]];

export function platesPerSide(total: number, unit: "lb" | "kg") {
  const { bar, plates } = PLATES[unit];
  let side = (total - bar) / 2; const out: number[] = [];
  if (side < 0) return { out, rest: side };
  for (const p of plates) while (side >= p - 1e-9) { out.push(p); side -= p; }
  return { out, rest: side };
}

export default function BenchPressMax() {
  const [s, set] = useUrlState({ w: "225", r: "5", u: "lb" });
  const w = Number(s.w), r = Math.round(Number(s.r)), unit = s.u === "kg" ? "kg" : "lb";
  const err = !(w > 0) ? "Enter the weight you lifted." : !(r >= 1 && r <= 15) ? "Enter 1–15 reps (estimates get unreliable at high reps)." : null;
  const est = Object.fromEntries(Object.entries(formulas).map(([k, f]) => [k, f(w, r)])) as Record<keyof typeof formulas, number>;
  const avg = (est.Epley + est.Brzycki + est.Lombardi) / 3;
  const step = unit === "lb" ? 5 : 2.5, roundTo = (x: number) => Math.round(x / step) * step;
  const plates = platesPerSide(roundTo(avg), unit);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Bench press max calculator">
        <Segmented label="Units" value={unit} onChange={(v) => set("u", v)} options={[{ id: "lb", label: "lb" }, { id: "kg", label: "kg" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="w" label="Weight lifted" suffix={unit} value={s.w} onChange={(v) => set("w", v)} min={0} />
          <Field id="r" label="Reps completed" value={s.r} onChange={(v) => set("r", v)} min={1} inputMode="numeric" hint="Best accuracy: 3–6 reps." />
        </div>
        <div className="rounded-xl bg-[var(--surface-2)] p-4 text-sm">
          <p className="font-semibold">Plates per side for ~{roundTo(avg)} {unit}</p>
          <p className="mt-1 muted">{err ? "—" : plates.out.length ? `${plates.out.join(" + ")} ${unit}` : "Just the bar"} <span className="subtle">(on a {PLATES[unit].bar} {unit} bar{plates.rest > 0.01 ? `; ${plates.rest.toFixed(2)} ${unit} short per side` : ""})</span></p>
        </div>
      </form>
      <ResultCard error={err} label="Estimated one-rep max (average)" value={`${avg.toFixed(0)} ${unit}`}>
        <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
          {(Object.keys(est) as (keyof typeof est)[]).map((k) => <Stat key={k} k={k} v={`${est[k].toFixed(1)} ${unit}`} />)}
        </dl>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm tabular-nums">
            <caption className="mb-1 text-left text-xs subtle">Training weights from your estimated max</caption>
            <thead><tr className="text-left subtle"><th className="py-1 font-medium">% of 1RM</th><th className="font-medium">Weight</th><th className="font-medium">Typical reps</th></tr></thead>
            <tbody>{PCTS.map(([p, reps]) => <tr key={p} className="border-t border-[var(--border)]"><td className="py-1">{p}%</td><td>{roundTo((avg * p) / 100)} {unit}</td><td>{reps}</td></tr>)}</tbody>
          </table>
        </div>
      </ResultCard>
    </div>
  );
}
