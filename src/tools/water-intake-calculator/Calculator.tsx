"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// Adequate Intake of total water for adults (Institute of Medicine / National Academies, 2005); ~19% comes from food.
const AI = { man: 3.7, woman: 2.7, pregnant: 3.0, breastfeeding: 3.8 } as const;
type Who = keyof typeof AI;
const FOOD_SHARE = 0.19, OZ_PER_L = 33.814;

export default function WaterIntakeCalculator() {
  const [s, set] = useUrlState({ who: "man", u: "lb", before: "", after: "", drank: "" });
  const who = (s.who in AI ? s.who : "man") as Who;
  const total = AI[who], fromDrinks = total * (1 - FOOD_SHARE);
  const toKg = s.u === "kg" ? 1 : 0.45359237;
  const before = Number(s.before) * toKg, after = Number(s.after) * toKg, drankL = (Number(s.drank) || 0) / (s.u === "kg" ? 1000 : OZ_PER_L);
  const sweat = before > 0 && after > 0 ? Math.max(0, before - after + drankL) : 0;
  const daily = fromDrinks + sweat;
  const cups = (l: number) => (l * OZ_PER_L) / 8;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Water intake calculator">
        <Segmented label="I am an adult" value={who} onChange={(v) => set("who", v)} options={[{ id: "man", label: "Man" }, { id: "woman", label: "Woman" }, { id: "pregnant", label: "Pregnant" }, { id: "breastfeeding", label: "Breastfeeding" }]} />
        <div>
          <span className="label">Optional: exercise sweat loss (weigh before and after)</span>
          <Segmented label="Units" value={s.u === "kg" ? "kg" : "lb"} onChange={(v) => set("u", v)} options={[{ id: "lb", label: "lb / fl oz" }, { id: "kg", label: "kg / mL" }]} />
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Field id="before" label="Weight before" suffix={s.u === "kg" ? "kg" : "lb"} value={s.before} onChange={(v) => set("before", v)} min={0} />
            <Field id="after" label="Weight after" suffix={s.u === "kg" ? "kg" : "lb"} value={s.after} onChange={(v) => set("after", v)} min={0} />
            <Field id="drank" label="Drank during" suffix={s.u === "kg" ? "mL" : "fl oz"} value={s.drank} onChange={(v) => set("drank", v)} min={0} />
          </div>
          <p className="mt-1 text-xs subtle">Each kilogram (2.2 lb) lost during exercise is about 1 liter of sweat.</p>
        </div>
      </form>
      <ResultCard label="Water to drink today" value={`${daily.toFixed(1)} L`}>
        <p className="mt-1 text-sm muted">≈ {cups(daily).toFixed(1)} cups (8 fl oz) · {Math.round(daily * OZ_PER_L)} fl oz · {Math.ceil(daily / 0.5)} × 500 mL bottles</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Total water needed (all sources)" v={`${total.toFixed(1)} L`} />
          <Stat k="Already from food (~19%)" v={`${(total * FOOD_SHARE).toFixed(1)} L`} />
          <Stat k="Baseline from drinks" v={`${fromDrinks.toFixed(1)} L (${cups(fromDrinks).toFixed(1)} cups)`} />
          {sweat > 0 && <Stat k="Plus sweat to replace" v={<span data-testid="sweat">{sweat.toFixed(2)} L</span>} />}
        </dl>
        <p className="mt-4 text-sm muted">All drinks count, including tea, coffee and milk. Thirst and pale-yellow urine are good everyday guides; hot weather, illness and long exercise raise your needs.</p>
        <p className="mt-2 text-xs subtle">General guidance for healthy adults, based on population intakes. People with kidney, heart or liver conditions, or on fluid limits, should follow their clinician&apos;s advice.</p>
      </ResultCard>
    </div>
  );
}
