"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { AMDR, inToCm, lbToKg, macrosFromPercent, mifflin, PAL_LEVELS, type Sex } from "@/lib/energy";

const GOALS = [
  { id: "-500", label: "Lose" },
  { id: "-250", label: "Lose slowly" },
  { id: "0", label: "Maintain" },
  { id: "250", label: "Gain slowly" },
  { id: "500", label: "Gain" },
];
const SPLITS: Record<string, { label: string; p: number; c: number; f: number }> = {
  balanced: { label: "Balanced", p: 25, c: 50, f: 25 },
  protein: { label: "High protein", p: 35, c: 40, f: 25 },
  lowcarb: { label: "Low carb", p: 30, c: 30, f: 40 },
  keto: { label: "Keto", p: 20, c: 5, f: 75 },
};
const n0 = (x: number) => Math.round(x).toLocaleString("en-US");
const inRange = (v: number, [lo, hi]: readonly [number, number]) => v >= lo - 0.5 && v <= hi + 0.5;

export default function MacroCalculator() {
  const [s, set] = useUrlState({ u: "us", sex: "male", age: "35", ft: "5", in: "10", lb: "180", cm: "178", kg: "82", pal: "1.55", goal: "0", kcal: "", split: "balanced", p: "30", c: "40", f: "30", meals: "3" });
  const metric = s.u === "metric";
  const cm = metric ? Number(s.cm) : inToCm((Number(s.ft) || 0) * 12 + (Number(s.in) || 0));
  const kg = metric ? Number(s.kg) : lbToKg(Number(s.lb));
  const age = Number(s.age), sex: Sex = s.sex === "female" ? "female" : "male";
  const level = PAL_LEVELS.find((x) => x.id === s.pal) ?? PAL_LEVELS[1];
  const custom = s.split === "custom";
  const sp = custom ? { label: "Custom", p: Number(s.p), c: Number(s.c), f: Number(s.f) } : SPLITS[s.split] ?? SPLITS.balanced;
  const bmr = mifflin(sex, kg, cm, age), tdee = bmr * level.pal;
  const own = Number(s.kcal);
  const goalAdj = Number(s.goal) || 0;
  const kcal = own > 0 ? own : tdee + goalAdj;
  const meals = Math.max(1, Math.min(8, Math.round(Number(s.meals) || 3)));
  const sum = sp.p + sp.c + sp.f;
  const err = !(own > 0) && (!(age >= 18 && age <= 90) ? "Enter an age from 18 to 90 (this calculator is for adults)." : !(cm > 120 && cm < 230) ? "Enter a height between 4 and 7.5 feet (120–230 cm)." : !(kg > 35 && kg < 300) ? "Enter a weight between 77 and 660 lb (35–300 kg)." : null)
    || (own > 0 && (own < 800 || own > 8000) ? "Enter daily calories between 800 and 8,000." : null)
    || (custom && (Math.abs(sum - 100) > 0.01 || [sp.p, sp.c, sp.f].some((x) => !(x >= 0))) ? `The percentages must add up to 100 (now ${Number.isFinite(sum) ? sum : 0}).` : null);
  const m = macrosFromPercent(kcal, sp.p, sp.c, sp.f);
  const gPerKg = m.protein / kg;
  const lowFloor = !(own > 0) && kcal < (sex === "female" ? 1200 : 1500);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Macro calculator">
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
        <div>
          <label htmlFor="pal" className="label">Activity level</label>
          <select id="pal" className="field" value={level.id} onChange={(e) => set("pal", e.target.value)}>
            {PAL_LEVELS.map((p) => <option key={p.id} value={p.id}>{p.label}: {p.hint}</option>)}
          </select>
        </div>
        <Segmented label="Goal (kcal per day vs maintenance)" value={GOALS.some((g) => g.id === s.goal) ? s.goal : "0"} onChange={(v) => set("goal", v)} options={GOALS} />
        <Field id="kcal" label="Or enter your own daily calories" suffix="kcal" value={s.kcal} onChange={(v) => set("kcal", v)} min={0} inputMode="numeric" hint="Leave blank to use the estimate" />
        <div>
          <Segmented label="Macro split" value={custom ? "custom" : SPLITS[s.split] ? s.split : "balanced"} onChange={(v) => set("split", v)} options={[...Object.entries(SPLITS).map(([id, x]) => ({ id, label: x.label })), { id: "custom", label: "Custom" }]} />
          {custom && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              <Field id="p" label="Protein" suffix="%" value={s.p} onChange={(v) => set("p", v)} min={0} />
              <Field id="c" label="Carbs" suffix="%" value={s.c} onChange={(v) => set("c", v)} min={0} />
              <Field id="f" label="Fat" suffix="%" value={s.f} onChange={(v) => set("f", v)} min={0} />
            </div>
          )}
        </div>
        <Field id="meals" label="Meals per day" value={s.meals} onChange={(v) => set("meals", v)} min={1} inputMode="numeric" />
      </form>
      <ResultCard error={err || null} label="Daily calories" value={err ? "–" : <span data-testid="kcal">{n0(kcal)} kcal</span>}>
        {!err && <>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            {([["Protein", m.protein, sp.p, "protein"], ["Carbs", m.carbs, sp.c, "carbs"], ["Fat", m.fat, sp.f, "fat"]] as const).map(([name, g, pct, id]) => (
              <div key={id} className="rounded-xl bg-[var(--surface-2)] p-3">
                <div className="text-xs subtle">{name}</div>
                <div className="text-2xl font-bold" data-testid={`g-${id}`}>{n0(g)} g</div>
                <div className="text-xs muted">{pct}% · {n0(g / meals)} g per meal</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex h-2.5 overflow-hidden rounded-full" aria-hidden>
            <span style={{ width: `${sp.p}%`, background: "#0d9488" }} /><span style={{ width: `${sp.c}%`, background: "#f59e0b" }} /><span style={{ width: `${sp.f}%`, background: "#6366f1" }} />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {!(own > 0) && <Stat k="Resting needs (BMR)" v={`${n0(bmr)} kcal`} />}
            {!(own > 0) && <Stat k={`Maintenance (× ${level.pal})`} v={<span data-testid="tdee">{n0(tdee)} kcal</span>} />}
            <Stat k="Protein per kg of body weight" v={<span data-testid="gkg">{gPerKg.toFixed(1)} g/kg ({(m.protein / (kg / 0.45359237)).toFixed(2)} g/lb)</span>} />
            <Stat k="Fiber to aim for" v={`${n0((kcal / 1000) * 14)} g (14 g per 1,000 kcal)`} />
          </dl>
          <ul className="mt-4 space-y-1 text-sm" data-testid="checks">
            <li>{inRange(sp.p, AMDR.protein) ? "✓" : "!"} Protein {sp.p}%: healthy adult range is 10–35% of calories.</li>
            <li>{inRange(sp.c, AMDR.carbs) ? "✓" : "!"} Carbs {sp.c}%: healthy adult range is 45–65%.{sp.c < 45 ? " Lower-carb diets fall outside this range by design." : ""}</li>
            <li>{inRange(sp.f, AMDR.fat) ? "✓" : "!"} Fat {sp.f}%: healthy adult range is 20–35%.</li>
            <li>{gPerKg >= 0.8 ? "✓" : "!"} Protein {gPerKg.toFixed(1)} g/kg: the RDA is 0.8 g/kg; 1.4–2.0 g/kg is suggested for most people who exercise.</li>
          </ul>
          {lowFloor && <p className="mt-3 text-sm text-amber-800">That is a very low intake. Eating this little is hard to meet nutrient needs on; consider a smaller deficit or talk to a dietitian.</p>}
          <p className="mt-3 text-xs subtle">Estimates for healthy adults. Not for pregnancy, breastfeeding (use the breastfeeding calorie calculator), under-18s or medical diets. Adjust after 2–3 weeks based on your weight trend.</p>
        </>}
      </ResultCard>
    </div>
  );
}
