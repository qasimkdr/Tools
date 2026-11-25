"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { PROTEIN_TARGETS } from "@/lib/energy";

const n0 = (x: number) => Math.round(x).toLocaleString("en-US");
const g1 = (x: number) => x.toFixed(1);

export default function ProteinCalculator() {
  const [s, set] = useUrlState({ u: "us", lb: "180", kg: "82", goal: "active", kcal: "", meals: "4" });
  const metric = s.u === "metric";
  const kg = metric ? Number(s.kg) : Number(s.lb) * 0.45359237;
  const t = PROTEIN_TARGETS.find((x) => x.id === s.goal) ?? PROTEIN_TARGETS[2];
  const lo = kg * t.lo, hi = kg * t.hi;
  const meals = Math.max(1, Math.min(8, Math.round(Number(s.meals) || 4)));
  const kcal = Number(s.kcal);
  const err = !(kg > 30 && kg < 300) ? "Enter a weight between 66 and 660 lb (30–300 kg)." : s.kcal.trim() !== "" && !(kcal >= 800 && kcal <= 8000) ? "Enter daily calories between 800 and 8,000, or leave it blank." : null;
  const range = (a: number, b: number) => (Math.round(a) === Math.round(b) ? `${n0(a)} g` : `${n0(a)}–${n0(b)} g`);
  const perMeal = kg * 0.25;
  const pctLo = (lo * 4 * 100) / kcal, pctHi = (hi * 4 * 100) / kcal;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Protein calculator">
        <div className="grid grid-cols-[auto_1fr] items-end gap-3">
          <Segmented label="Units" value={metric ? "metric" : "us"} onChange={(v) => set("u", v)} options={[{ id: "us", label: "lb" }, { id: "metric", label: "kg" }]} />
          {metric
            ? <Field id="kg" label="Body weight" suffix="kg" value={s.kg} onChange={(v) => set("kg", v)} min={0} />
            : <Field id="lb" label="Body weight" suffix="lb" value={s.lb} onChange={(v) => set("lb", v)} min={0} />}
        </div>
        <fieldset>
          <legend className="label">Which fits you best?</legend>
          <div className="space-y-2">
            {PROTEIN_TARGETS.map((x) => (
              <label key={x.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm ${x.id === t.id ? "border-[var(--color-brand-500)] bg-[var(--surface-2)]" : "border-[var(--border)]"}`}>
                <span className="flex items-center gap-2"><input type="radio" name="goal" value={x.id} checked={x.id === t.id} onChange={() => set("goal", x.id)} />{x.label}</span>
                <span className="subtle whitespace-nowrap">{x.lo === x.hi ? g1(x.lo) : `${g1(x.lo)}–${g1(x.hi)}`} g/kg</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-3">
          <Field id="meals" label="Meals per day" value={s.meals} onChange={(v) => set("meals", v)} min={1} inputMode="numeric" />
          <Field id="kcal" label="Daily calories (optional)" suffix="kcal" value={s.kcal} onChange={(v) => set("kcal", v)} min={0} inputMode="numeric" hint="Shows protein as % of calories" />
        </div>
      </form>
      <ResultCard error={err} label="Protein per day" value={err ? "–" : <span data-testid="protein">{range(lo, hi)}</span>}>
        {!err && <>
          <p className="mt-1 text-sm muted">{t.lo === t.hi ? g1(t.lo) : `${g1(t.lo)}–${g1(t.hi)}`} g per kg of body weight ({(t.lo * 0.45359237).toFixed(2)}{t.lo === t.hi ? "" : `–${(t.hi * 0.45359237).toFixed(2)}`} g per lb) · {t.src}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k={`Per meal (${meals} meals)`} v={<span data-testid="per-meal">{range(lo / meals, hi / meals)}</span>} />
            <Stat k="Good dose per meal (0.25 g/kg)" v={`about ${n0(perMeal)} g`} />
            {kcal > 0 && <Stat k="Share of calories" v={<span data-testid="pct">{Math.round(pctLo) === Math.round(pctHi) ? `${Math.round(pctLo)}%` : `${Math.round(pctLo)}–${Math.round(pctHi)}%`}</span>} />}
            {kcal > 0 && <Stat k="Healthy adult range" v="10–35% of calories" />}
          </dl>
          <h2 className="mt-5 text-sm font-semibold">Your weight, every target</h2>
          <table className="mt-2 w-full text-sm" data-testid="all-targets">
            <tbody>
              {PROTEIN_TARGETS.map((x) => (
                <tr key={x.id} className={`border-t border-[var(--border)] ${x.id === t.id ? "font-semibold" : ""}`}><td className="py-1 pr-2">{x.label}</td><td className="text-right whitespace-nowrap">{range(kg * x.lo, kg * x.hi)}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs subtle">If you have kidney disease or another medical condition, ask your doctor before raising your protein intake: some people need to limit it.</p>
        </>}
      </ResultCard>
    </div>
  );
}
