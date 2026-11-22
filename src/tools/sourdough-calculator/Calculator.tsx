"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const g = (n: number) => `${Math.round(n).toLocaleString("en-US")} g`;
const pct = (n: number) => `${(n * 100).toFixed(1).replace(/\.0$/, "")}%`;

export default function SourdoughCalculator() {
  const [s, set] = useUrlState({ mode: "recipe", basis: "dough", loaves: "1", dough: "900", flour: "500", hyd: "75", starter: "20", sh: "100", salt: "2", fs: "1", ff: "1", fw: "1", ft: "150" });
  const recipe = s.mode !== "feed";
  const h = Number(s.hyd) / 100, sp = Number(s.starter) / 100, sh = Number(s.sh) / 100, z = Number(s.salt) / 100;
  const loaves = Math.max(1, Math.round(Number(s.loaves) || 1));
  const F = s.basis === "flour" ? Number(s.flour) * loaves : (Number(s.dough) * loaves) / (1 + h + z); // total flour, incl. starter's
  const S = sp * F, sFlour = S / (1 + sh), sWater = S - sFlour;
  const addFlour = F - sFlour, addWater = h * F - sWater, salt = z * F, total = F * (1 + h + z);
  const err = !recipe ? null : !(F > 0) ? "Enter a dough weight or flour amount." : !(h > 0 && h < 1.5) ? "Enter a hydration between 1% and 150%." : sp < 0 || sh < 0 || z < 0 ? "Percentages can't be negative." : addWater < 0 ? "The starter holds more water than the recipe needs. Lower the starter % or raise hydration." : null;

  // Starter feeding: parts starter : flour : water
  const fs = Number(s.fs), ff = Number(s.ff), fw = Number(s.fw), ft = Number(s.ft), parts = fs + ff + fw;
  const feedErr = recipe ? null : !(parts > 0 && ft > 0) ? "Enter a ratio and the amount you want." : null;
  const unit = parts > 0 ? ft / parts : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Sourdough calculator">
        <Segmented label="Calculate" value={recipe ? "recipe" : "feed"} onChange={(v) => set("mode", v)} options={[{ id: "recipe", label: "Bread recipe" }, { id: "feed", label: "Starter feeding" }]} />
        {recipe ? <>
          <Segmented label="Start from" value={s.basis === "flour" ? "flour" : "dough"} onChange={(v) => set("basis", v)} options={[{ id: "dough", label: "Dough weight" }, { id: "flour", label: "Total flour" }]} />
          <div className="grid grid-cols-2 gap-3">
            {s.basis === "flour"
              ? <Field id="flour" label="Total flour per loaf" suffix="g" value={s.flour} onChange={(v) => set("flour", v)} min={0} />
              : <Field id="dough" label="Dough weight per loaf" suffix="g" value={s.dough} onChange={(v) => set("dough", v)} min={0} />}
            <Field id="loaves" label="Loaves" value={s.loaves} onChange={(v) => set("loaves", v)} min={1} inputMode="numeric" />
            <Field id="hyd" label="Hydration" suffix="%" value={s.hyd} onChange={(v) => set("hyd", v)} min={0} hint="Water ÷ flour; 65–80% is typical" />
            <Field id="starter" label="Starter" suffix="% of flour" value={s.starter} onChange={(v) => set("starter", v)} min={0} />
            <Field id="sh" label="Starter hydration" suffix="%" value={s.sh} onChange={(v) => set("sh", v)} min={0} hint="100% = equal flour and water" />
            <Field id="salt" label="Salt" suffix="% of flour" value={s.salt} onChange={(v) => set("salt", v)} min={0} />
          </div>
        </> : <>
          <span className="label">Feeding ratio (starter : flour : water)</span>
          <div className="grid grid-cols-3 gap-3">
            <Field id="fs" label="Starter" value={s.fs} onChange={(v) => set("fs", v)} min={0} />
            <Field id="ff" label="Flour" value={s.ff} onChange={(v) => set("ff", v)} min={0} />
            <Field id="fw" label="Water" value={s.fw} onChange={(v) => set("fw", v)} min={0} />
          </div>
          <Field id="ft" label="Starter you want after feeding" suffix="g" value={s.ft} onChange={(v) => set("ft", v)} min={0} />
        </>}
      </form>
      {recipe ? (
        <ResultCard label="Your recipe" error={err} value={err ? "–" : g(total)}>
          {!err && <>
            <p className="mt-1 text-sm muted">{loaves > 1 ? `${loaves} loaves · ` : ""}{pct(h)} hydration · total flour {g(F)}</p>
            <table className="mt-4 w-full text-sm" data-testid="recipe">
              <thead><tr className="text-left subtle"><th className="py-1">Ingredient</th><th>Weigh out</th><th>Baker&apos;s %</th></tr></thead>
              <tbody>
                <tr className="border-t border-[var(--border)]"><td className="py-1">Flour</td><td className="font-semibold">{g(addFlour)}</td><td>{pct(addFlour / F)}</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="py-1">Water</td><td className="font-semibold">{g(addWater)}</td><td>{pct(addWater / F)}</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="py-1">Starter (levain)</td><td className="font-semibold">{g(S)}</td><td>{pct(sp)}</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="py-1">Salt</td><td className="font-semibold">{g(salt)}</td><td>{pct(z)}</td></tr>
              </tbody>
            </table>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Flour in the starter" v={g(sFlour)} />
              <Stat k="Water in the starter" v={g(sWater)} />
              <Stat k="Total water" v={g(h * F)} />
              <Stat k="Pre-fermented flour" v={pct(sFlour / F)} />
            </dl>
            <p className="mt-4 text-xs subtle">Baker&apos;s percentages are relative to total flour, including the flour in the starter, so hydration is the true water-to-flour ratio of the finished dough.</p>
          </>}
        </ResultCard>
      ) : (
        <ResultCard label="Feed your starter" error={feedErr} value={feedErr ? "–" : `${fs}:${ff}:${fw}`}>
          {!feedErr && <>
            <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <Stat k="Starter" v={<span data-testid="feed-s">{g(unit * fs)}</span>} />
              <Stat k="Flour" v={g(unit * ff)} />
              <Stat k="Water" v={g(unit * fw)} />
            </dl>
            <p className="mt-4 text-sm muted">New starter hydration: about {ff > 0 ? pct(fw / ff) : "–"} (assuming the existing starter is at the same hydration). Higher ratios such as 1:5:5 dilute the starter more and take longer to peak.</p>
          </>}
        </ResultCard>
      )}
    </div>
  );
}
