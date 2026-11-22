"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import UnitField from "@/components/calc/UnitField";
import { toFt } from "@/lib/units";

const DEFAULTS = { shape: "rect", l: "12", lu: "ft", w: "14", wu: "ft", d: "9", du: "in", dia: "10", diau: "ft", area: "200", qty: "1", waste: "5", price: "" };

export default function CubicYardCalculator() {
  const [s, set] = useUrlState(DEFAULTS);
  const f = toFt;
  const depthFt = f(s.d, s.du), qty = Math.max(1, Math.floor(Number(s.qty) || 1)), waste = Math.max(0, Number(s.waste) || 0) / 100;
  let areaFt2 = NaN;
  if (s.shape === "rect") areaFt2 = f(s.l, s.lu) * f(s.w, s.wu);
  else if (s.shape === "circle") areaFt2 = Math.PI * (f(s.dia, s.diau) / 2) ** 2;
  else areaFt2 = Number(s.area);
  const ft3 = areaFt2 * depthFt * qty, yd3 = ft3 / 27, withWaste = yd3 * (1 + waste);
  const error = !(areaFt2 > 0) ? "Enter positive dimensions." : !(depthFt > 0) ? "Enter a depth above 0." : null;
  const price = Number(s.price);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Cubic yard calculator">
        <Segmented label="Shape" value={(["rect", "circle", "area"].includes(s.shape) ? s.shape : "rect") as "rect" | "circle" | "area"} onChange={(v) => set("shape", v)}
          options={[{ id: "rect", label: "Rectangle" }, { id: "circle", label: "Circle" }, { id: "area", label: "Known area" }]} />
        {s.shape === "rect" && <div className="grid gap-3 sm:grid-cols-2">
          <UnitField id="l" label="Length" value={s.l} unit={s.lu} onValue={(v) => set("l", v)} onUnit={(u) => set("lu", u)} />
          <UnitField id="w" label="Width" value={s.w} unit={s.wu} onValue={(v) => set("w", v)} onUnit={(u) => set("wu", u)} />
        </div>}
        {s.shape === "circle" && <UnitField id="dia" label="Diameter" value={s.dia} unit={s.diau} onValue={(v) => set("dia", v)} onUnit={(u) => set("diau", u)} />}
        {s.shape === "area" && <Field id="area" label="Area" suffix="sq ft" value={s.area} onChange={(v) => set("area", v)} min={0} />}
        <UnitField id="d" label="Depth / thickness" value={s.d} unit={s.du} onValue={(v) => set("d", v)} onUnit={(u) => set("du", u)} />
        <div className="grid grid-cols-3 gap-3">
          <Field id="qty" label="Quantity" value={s.qty} onChange={(v) => set("qty", v)} min={1} inputMode="numeric" />
          <Field id="waste" label="Extra" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
          <Field id="price" label="Price / yd³" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
        </div>
      </form>
      <ResultCard error={error} label={waste > 0 ? `Cubic yards (incl. ${+(waste * 100).toFixed(1)}% extra)` : "Cubic yards"} value={`${withWaste.toFixed(2)} yd³`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat k="Exact volume" v={`${yd3.toFixed(2)} yd³`} />
          <Stat k="Cubic feet" v={`${ft3.toFixed(1)} ft³`} />
          <Stat k="Cubic meters" v={`${(ft3 * 0.0283168).toFixed(2)} m³`} />
          <Stat k="Order (rounded up)" v={`${(Math.ceil(withWaste * 2) / 2).toFixed(1)} yd³`} />
          <Stat k="2 cu ft bags" v={Math.ceil((ft3 * (1 + waste)) / 2).toLocaleString()} />
          {price > 0 && <Stat k="Estimated cost" v={usd(withWaste * price)} />}
        </dl>
        <p className="mt-4 text-sm muted">Area: {areaFt2.toFixed(1)} sq ft × depth {(depthFt * 12).toFixed(2)} in{qty > 1 ? ` × ${qty}` : ""}. Bulk suppliers usually sell by the half or whole yard.</p>
      </ResultCard>
    </div>
  );
}
