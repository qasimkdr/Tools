"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { inToCm, lactationExtra, lbToKg, mifflin, PAL_LEVELS } from "@/lib/energy";

const SHARES = [
  { id: "1", label: "Only breast milk" },
  { id: "0.75", label: "Mostly" },
  { id: "0.5", label: "About half" },
  { id: "0.25", label: "A little" },
];
const FLOOR = 1800; // Academy of Nutrition and Dietetics: below 1,800 kcal/day may reduce milk supply
const kcal = (x: number) => Math.round(x).toLocaleString("en-US");

export default function BreastfeedingCalorieCalculator() {
  const [s, set] = useUrlState({ u: "us", age: "30", ft: "5", in: "5", lb: "150", cm: "165", kg: "68", pal: "1.55", stage: "0-6", share: "1", goal: "maintain" });
  const metric = s.u === "metric";
  const cm = metric ? Number(s.cm) : inToCm((Number(s.ft) || 0) * 12 + (Number(s.in) || 0));
  const kg = metric ? Number(s.kg) : lbToKg(Number(s.lb));
  const age = Number(s.age);
  const level = PAL_LEVELS.find((p) => p.id === s.pal) ?? PAL_LEVELS[1];
  const share = Number(SHARES.find((x) => x.id === s.share)?.id ?? 1);
  const stage = s.stage === "7-12" ? "7-12" : "0-6";
  const err = !(age >= 14 && age <= 60) ? "Enter your age (14–60)." : !(cm > 120 && cm < 220) ? "Enter a height between 4 and 7 feet (120–220 cm)." : !(kg > 35 && kg < 250) ? "Enter a weight between 77 and 550 lb (35–250 kg)." : null;
  const bmr = mifflin("female", kg, cm, age);
  const base = bmr * level.pal;
  const extra = lactationExtra(stage, share);
  const maintain = base + extra;
  const loseRaw = maintain - 500;
  const lose = Math.max(FLOOR, loseRaw);
  const target = s.goal === "lose" ? lose : maintain;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Breastfeeding calorie calculator">
        <Segmented label="Units" value={metric ? "metric" : "us"} onChange={(v) => set("u", v)} options={[{ id: "us", label: "ft / in / lb" }, { id: "metric", label: "cm / kg" }]} />
        {metric ? (
          <div className="grid grid-cols-3 gap-3">
            <Field id="age" label="Age" suffix="yr" value={s.age} onChange={(v) => set("age", v)} min={0} inputMode="numeric" />
            <Field id="cm" label="Height" suffix="cm" value={s.cm} onChange={(v) => set("cm", v)} min={0} />
            <Field id="kg" label="Weight now" suffix="kg" value={s.kg} onChange={(v) => set("kg", v)} min={0} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Field id="age" label="Age" suffix="yr" value={s.age} onChange={(v) => set("age", v)} min={0} inputMode="numeric" />
            <Field id="ft" label="Height" suffix="ft" value={s.ft} onChange={(v) => set("ft", v)} min={0} inputMode="numeric" />
            <Field id="in" label="Inches" suffix="in" value={s.in} onChange={(v) => set("in", v)} min={0} />
            <Field id="lb" label="Weight now" suffix="lb" value={s.lb} onChange={(v) => set("lb", v)} min={0} />
          </div>
        )}
        <div>
          <label htmlFor="pal" className="label">Activity level</label>
          <select id="pal" className="field" value={level.id} onChange={(e) => set("pal", e.target.value)}>
            {PAL_LEVELS.map((p) => <option key={p.id} value={p.id}>{p.label}: {p.hint}</option>)}
          </select>
        </div>
        <Segmented label="Baby's age" value={stage} onChange={(v) => set("stage", v)} options={[{ id: "0-6", label: "0–6 months" }, { id: "7-12", label: "7–12 months" }]} />
        <Segmented label="How much of baby's milk is breast milk?" value={s.share} onChange={(v) => set("share", v)} options={SHARES} />
        <Segmented label="Goal" value={s.goal === "lose" ? "lose" : "maintain"} onChange={(v) => set("goal", v)} options={[{ id: "maintain", label: "Maintain weight" }, { id: "lose", label: "Lose weight gradually" }]} />
      </form>
      <ResultCard error={err} label={s.goal === "lose" ? "Daily calories for gradual weight loss" : "Daily calories to maintain your weight"} value={err ? "–" : <span data-testid="target">{kcal(target)} kcal</span>}>
        {!err && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Resting needs (BMR)" v={`${kcal(bmr)} kcal`} />
            <Stat k={`Usual needs (× ${level.pal})`} v={<span data-testid="base">{kcal(base)} kcal</span>} />
            <Stat k="Extra for breastfeeding" v={<span data-testid="extra">+{kcal(extra)} kcal</span>} />
            <Stat k="To maintain weight" v={<span data-testid="maintain">{kcal(maintain)} kcal</span>} />
          </dl>
          {s.goal === "lose" && (
            <p className="mt-3 text-sm" data-testid="lose-note">
              {loseRaw < FLOOR
                ? <>A 500 kcal cut would take you below <strong>1,800 kcal</strong>, which may reduce milk supply, so the target is held at 1,800. Expect slower loss.</>
                : <>About 500 kcal below maintenance, which is roughly <strong>1 lb (0.45 kg) a week</strong>, the pace the Academy of Nutrition and Dietetics calls safe while breastfeeding.</>}
            </p>
          )}
          <p className="mt-3 text-xs subtle">This is an estimate for one baby. Talk to your doctor, midwife or a lactation consultant if you have twins, a low milk supply, a medical condition, or your baby isn&apos;t gaining weight. Watch your milk supply and hunger, and eat more if either drops.</p>
        </>}
      </ResultCard>
    </div>
  );
}
