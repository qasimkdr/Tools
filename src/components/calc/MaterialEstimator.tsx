"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import UnitField from "@/components/calc/UnitField";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { FT3_PER_YD3, LB_PER_TON, M3_PER_FT3, toFt } from "@/lib/units";

export type Material = { id: string; label: string; tonsPerYd3: number };

/**
 * Shared volume → weight estimator for bulk materials (gravel, sand, …). Density is always editable because real
 * weights vary by supplier, moisture and grading; presets are typical values, not guarantees.
 */
export default function MaterialEstimator({ materials, defaults, bagLb = 50, noun }: {
  materials: Material[]; defaults: { l: string; w: string; d: string; du: string; extra: string }; bagLb?: number; noun: string;
}) {
  const [s, set] = useUrlState({
    shape: "rect", l: defaults.l, lu: "ft", w: defaults.w, wu: "ft", dia: "10", diau: "ft", area: "200",
    d: defaults.d, du: defaults.du, mat: materials[0].id, dens: "", extra: defaults.extra, price: "", priceUnit: "ton", bag: String(bagLb),
  });
  const mat = materials.find((m) => m.id === s.mat) ?? materials[0];
  const tpy = Number(s.dens) > 0 ? Number(s.dens) : mat.tonsPerYd3;
  const area = s.shape === "circle" ? Math.PI * (toFt(s.dia, s.diau) / 2) ** 2 : s.shape === "area" ? Number(s.area) : toFt(s.l, s.lu) * toFt(s.w, s.wu);
  const depth = toFt(s.d, s.du), extra = Math.max(0, Number(s.extra) || 0) / 100;
  const ft3 = area * depth * (1 + extra), yd3 = ft3 / FT3_PER_YD3, tons = yd3 * tpy, lbs = tons * LB_PER_TON;
  const error = !(area > 0) ? "Enter positive dimensions." : !(depth > 0) ? "Enter a depth above 0." : !(tpy > 0 && tpy < 5) ? "Enter a density between 0 and 5 tons per cubic yard." : null;
  const price = Number(s.price), bag = Number(s.bag) || bagLb;
  const cost = price > 0 ? (s.priceUnit === "yd" ? yd3 * price : tons * price) : NaN;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label={`${noun} calculator`}>
        <Segmented label="Area shape" value={(["rect", "circle", "area"].includes(s.shape) ? s.shape : "rect") as "rect" | "circle" | "area"} onChange={(v) => set("shape", v)}
          options={[{ id: "rect", label: "Rectangle" }, { id: "circle", label: "Circle" }, { id: "area", label: "Known area" }]} />
        {s.shape === "rect" && <div className="grid gap-3 sm:grid-cols-2">
          <UnitField id="l" label="Length" value={s.l} unit={s.lu} onValue={(v) => set("l", v)} onUnit={(u) => set("lu", u)} />
          <UnitField id="w" label="Width" value={s.w} unit={s.wu} onValue={(v) => set("w", v)} onUnit={(u) => set("wu", u)} />
        </div>}
        {s.shape === "circle" && <UnitField id="dia" label="Diameter" value={s.dia} unit={s.diau} onValue={(v) => set("dia", v)} onUnit={(u) => set("diau", u)} />}
        {s.shape === "area" && <Field id="area" label="Area" suffix="sq ft" value={s.area} onChange={(v) => set("area", v)} min={0} />}
        <UnitField id="d" label="Depth" value={s.d} unit={s.du} onValue={(v) => set("d", v)} onUnit={(u) => set("du", u)} />
        <div>
          <label htmlFor="mat" className="label">Material (sets a typical density)</label>
          <select id="mat" className="field" value={mat.id} onChange={(e) => { set("mat", e.target.value); set("dens", ""); }}>
            {materials.map((m) => <option key={m.id} value={m.id}>{m.label} (~{m.tonsPerYd3} t/yd³)</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="dens" label="Density (tons / yd³)" value={s.dens || String(mat.tonsPerYd3)} onChange={(v) => set("dens", v)} min={0} hint="Use your supplier's figure if you have it." />
          <Field id="extra" label="Extra (compaction, waste)" suffix="%" value={s.extra} onChange={(v) => set("extra", v)} min={0} />
        </div>
        <div className="grid grid-cols-[1fr_auto] items-end gap-3">
          <Field id="price" label="Price (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
          <Segmented label="per" value={s.priceUnit === "yd" ? "yd" : "ton"} onChange={(v) => set("priceUnit", v)} options={[{ id: "ton", label: "ton" }, { id: "yd", label: "yd³" }]} />
        </div>
      </form>
      <ResultCard error={error} label={`${noun} needed${extra > 0 ? ` (incl. ${+(extra * 100).toFixed(1)}% extra)` : ""}`} value={`${tons.toFixed(2)} tons`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat k="Cubic yards" v={`${yd3.toFixed(2)} yd³`} />
          <Stat k="Cubic feet" v={`${ft3.toFixed(1)} ft³`} />
          <Stat k="Cubic meters" v={`${(ft3 * M3_PER_FT3).toFixed(2)} m³`} />
          <Stat k="Pounds" v={`${Math.round(lbs).toLocaleString()} lb`} />
          <Stat k={`${bag} lb bags`} v={Math.ceil(lbs / bag).toLocaleString()} />
          {Number.isFinite(cost) && <Stat k="Estimated cost" v={usd(cost)} />}
        </dl>
        <p className="mt-4 text-sm muted">Area {area.toFixed(1)} sq ft × {(depth * 12).toFixed(2)} in deep, at {tpy} tons per cubic yard. Order a little extra, since bulk suppliers usually sell by the ton or half yard.</p>
      </ResultCard>
    </div>
  );
}
