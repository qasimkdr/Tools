"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import UnitField from "@/components/calc/UnitField";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { FT3_PER_YD3, M3_PER_FT3, toFt } from "@/lib/units";

// Bag yields: Quikrete Concrete Mix (No. 1101) data sheet — 40 lb ≈ 0.30 ft³, 60 lb ≈ 0.45 ft³, 80 lb ≈ 0.60 ft³.
const BAGS = [{ lb: 40, ft3: 0.3 }, { lb: 60, ft3: 0.45 }, { lb: 80, ft3: 0.6 }];
const LB_PER_FT3 = 150; // typical normal-weight concrete (approx.)
type Shape = "slab" | "round" | "steps";

export default function ConcreteCalculator() {
  const [s, set] = useUrlState({ shape: "slab", l: "10", lu: "ft", w: "10", wu: "ft", t: "4", tu: "in", dia: "12", diau: "in", dep: "4", depu: "ft", n: "4", rise: "7", riseu: "in", run: "11", runu: "in", sw: "4", swu: "ft", qty: "1", waste: "5", price: "", per: "yd" });
  const shape = (["slab", "round", "steps"].includes(s.shape) ? s.shape : "slab") as Shape;
  const qty = Math.max(1, Math.floor(Number(s.qty) || 1)), waste = Math.max(0, Number(s.waste) || 0) / 100;
  let one = 0;
  if (shape === "slab") one = toFt(s.l, s.lu) * toFt(s.w, s.wu) * toFt(s.t, s.tu);
  else if (shape === "round") one = Math.PI * (toFt(s.dia, s.diau) / 2) ** 2 * toFt(s.dep, s.depu);
  else { const n = Math.max(0, Math.floor(Number(s.n) || 0)); one = toFt(s.sw, s.swu) * toFt(s.rise, s.riseu) * toFt(s.run, s.runu) * (n * (n + 1)) / 2; }
  const net = one * qty, ft3 = net * (1 + waste), yd3 = ft3 / FT3_PER_YD3;
  const price = Number(s.price);
  const cost = price > 0 ? (s.per === "yd" ? yd3 * price : Math.ceil(ft3 / 0.6) * price) : NaN;
  const error = !(net > 0) ? "Enter dimensions above 0." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Concrete calculator">
        <Segmented label="What are you pouring?" value={shape} onChange={(v) => set("shape", v)}
          options={[{ id: "slab", label: "Slab / footing / wall" }, { id: "round", label: "Post hole / column" }, { id: "steps", label: "Steps" }]} />
        {shape === "slab" && <>
          <div className="grid gap-3 sm:grid-cols-2">
            <UnitField id="l" label="Length" value={s.l} unit={s.lu} onValue={(v) => set("l", v)} onUnit={(u) => set("lu", u)} />
            <UnitField id="w" label="Width" value={s.w} unit={s.wu} onValue={(v) => set("w", v)} onUnit={(u) => set("wu", u)} />
          </div>
          <UnitField id="t" label="Thickness (or height for a wall)" value={s.t} unit={s.tu} onValue={(v) => set("t", v)} onUnit={(u) => set("tu", u)} />
        </>}
        {shape === "round" && <div className="grid gap-3 sm:grid-cols-2">
          <UnitField id="dia" label="Diameter" value={s.dia} unit={s.diau} onValue={(v) => set("dia", v)} onUnit={(u) => set("diau", u)} />
          <UnitField id="dep" label="Depth / height" value={s.dep} unit={s.depu} onValue={(v) => set("dep", v)} onUnit={(u) => set("depu", u)} />
        </div>}
        {shape === "steps" && <>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="n" label="Number of steps" value={s.n} onChange={(v) => set("n", v)} min={1} inputMode="numeric" />
            <UnitField id="sw" label="Step width" value={s.sw} unit={s.swu} onValue={(v) => set("sw", v)} onUnit={(u) => set("swu", u)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <UnitField id="rise" label="Rise (height per step)" value={s.rise} unit={s.riseu} onValue={(v) => set("rise", v)} onUnit={(u) => set("riseu", u)} />
            <UnitField id="run" label="Run (depth per step)" value={s.run} unit={s.runu} onValue={(v) => set("run", v)} onUnit={(u) => set("runu", u)} />
          </div>
        </>}
        <div className="grid grid-cols-2 gap-3">
          <Field id="qty" label="How many" value={s.qty} onChange={(v) => set("qty", v)} min={1} inputMode="numeric" />
          <Field id="waste" label="Extra (spillage, uneven base)" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
        </div>
        <div className="grid grid-cols-[1fr_auto] items-end gap-3">
          <Field id="price" label="Price (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
          <Segmented label="per" value={s.per === "bag" ? "bag" : "yd"} onChange={(v) => set("per", v)} options={[{ id: "yd", label: "yd³" }, { id: "bag", label: "80 lb bag" }]} />
        </div>
      </form>
      <ResultCard error={error} label={`Concrete needed${waste > 0 ? ` (incl. ${+(waste * 100).toFixed(1)}% extra)` : ""}`} value={`${yd3.toFixed(2)} yd³`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat k="Cubic feet" v={`${ft3.toFixed(2)} ft³`} />
          <Stat k="Cubic meters" v={`${(ft3 * M3_PER_FT3).toFixed(2)} m³`} />
          <Stat k="Approx. weight" v={`${Math.round(ft3 * LB_PER_FT3).toLocaleString()} lb`} />
          {BAGS.map((b) => <Stat key={b.lb} k={`${b.lb} lb bags`} v={Math.ceil(ft3 / b.ft3).toLocaleString()} />)}
          {Number.isFinite(cost) && <Stat k="Estimated cost" v={usd(cost)} />}
        </dl>
        <p className="mt-4 text-sm muted">{yd3 >= 1 ? "Over about 1 cubic yard, ready-mix delivery is usually easier and cheaper than mixing bags by hand." : "Small job: pre-mixed bags are usually the practical choice."} Ready-mix is sold by the cubic yard; round up when ordering.</p>
      </ResultCard>
    </div>
  );
}
