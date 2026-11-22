"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import UnitField from "@/components/calc/UnitField";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { FT3_PER_YD3, LB_PER_TON, M3_PER_FT3, toFt } from "@/lib/units";

const KG_PER_LB = 0.45359237, KGM3_PER_LBFT3 = 16.0184634;
type Shape = "rect" | "circle" | "area";

export default function AsphaltCalculator() {
  const [s, set] = useUrlState({ shape: "rect", l: "50", lu: "ft", w: "12", wu: "ft", dia: "20", diau: "ft", area: "600", d: "3", du: "in", dens: "145", extra: "5", binder: "5.5", price: "" });
  const shape = (["rect", "circle", "area"].includes(s.shape) ? s.shape : "rect") as Shape;
  const area = shape === "circle" ? Math.PI * (toFt(s.dia, s.diau) / 2) ** 2 : shape === "area" ? Number(s.area) : toFt(s.l, s.lu) * toFt(s.w, s.wu);
  const depth = toFt(s.d, s.du), dens = Number(s.dens), extra = Math.max(0, Number(s.extra) || 0) / 100, binder = Math.max(0, Number(s.binder) || 0) / 100;
  const ft3 = area * depth * (1 + extra), lb = ft3 * dens, tons = lb / LB_PER_TON, tonnes = (lb * KG_PER_LB) / 1000;
  const price = Number(s.price);
  const error = !(area > 0) ? "Enter positive dimensions." : !(depth > 0) ? "Enter a thickness above 0." : !(dens >= 100 && dens <= 170) ? "Enter a density between 100 and 170 lb/ft³ (hot mix is usually about 145)." : binder > 0.12 ? "Binder content is usually 4–7% of the mix weight." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Asphalt calculator">
        <Segmented label="Area shape" value={shape} onChange={(v) => set("shape", v)} options={[{ id: "rect", label: "Rectangle" }, { id: "circle", label: "Circle" }, { id: "area", label: "Known area" }]} />
        {shape === "rect" && <div className="grid gap-3 sm:grid-cols-2">
          <UnitField id="l" label="Length" value={s.l} unit={s.lu} onValue={(v) => set("l", v)} onUnit={(u) => set("lu", u)} />
          <UnitField id="w" label="Width" value={s.w} unit={s.wu} onValue={(v) => set("w", v)} onUnit={(u) => set("wu", u)} />
        </div>}
        {shape === "circle" && <UnitField id="dia" label="Diameter" value={s.dia} unit={s.diau} onValue={(v) => set("dia", v)} onUnit={(u) => set("diau", u)} />}
        {shape === "area" && <Field id="area" label="Area" suffix="sq ft" value={s.area} onChange={(v) => set("area", v)} min={0} />}
        <UnitField id="d" label="Compacted thickness" value={s.d} unit={s.du} onValue={(v) => set("d", v)} onUnit={(u) => set("du", u)} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="dens" label="Density" suffix="lb/ft³" value={s.dens} onChange={(v) => set("dens", v)} min={0} hint={`≈ ${Math.round(dens * KGM3_PER_LBFT3).toLocaleString()} kg/m³`} />
          <Field id="extra" label="Extra (waste, edges)" suffix="%" value={s.extra} onChange={(v) => set("extra", v)} min={0} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="binder" label="Bitumen content" suffix="% of mix" value={s.binder} onChange={(v) => set("binder", v)} min={0} hint="Often about 5–6%; check your mix design" />
          <Field id="price" label="Price per ton (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
        </div>
      </form>
      <ResultCard error={error} label={`Asphalt needed${extra > 0 ? ` (incl. ${+(extra * 100).toFixed(1)}% extra)` : ""}`} value={`${tons.toFixed(2)} tons`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat k="Metric tonnes" v={`${tonnes.toFixed(2)} t`} />
          <Stat k="Pounds" v={`${Math.round(lb).toLocaleString()} lb`} />
          <Stat k="Cubic yards" v={`${(ft3 / FT3_PER_YD3).toFixed(2)} yd³`} />
          <Stat k="Cubic meters" v={`${(ft3 * M3_PER_FT3).toFixed(2)} m³`} />
          <Stat k="Bitumen binder" v={`${(lb * binder).toFixed(0)} lb (${(lb * binder * KG_PER_LB).toFixed(0)} kg)`} />
          {price > 0 && <Stat k="Estimated cost" v={usd(tons * price)} />}
        </dl>
        <p className="mt-4 text-sm muted">{area.toFixed(1)} sq ft × {(depth * 12).toFixed(2)} in at {dens} lb/ft³. At this thickness one ton covers about <strong className="text-[var(--text)]">{(LB_PER_TON / (dens * depth)).toFixed(0)} sq ft</strong>.</p>
        <p className="mt-2 text-xs subtle">Bitumen is already part of hot-mix asphalt; the binder figure is for specs or cost checks, not a separate order.</p>
      </ResultCard>
    </div>
  );
}
