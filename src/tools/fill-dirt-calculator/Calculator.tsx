"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import UnitField from "@/components/calc/UnitField";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { FT3_PER_YD3, M3_PER_FT3, toFt } from "@/lib/units";

// Weights vary with moisture and soil type; presets are typical mid-range values (≈2,400 lb/yd³ dry; wet 3,000–3,500 lb/yd³).
const SOILS = [
  { id: "dry", label: "Dry fill dirt", t: 1.2 },
  { id: "clay", label: "Clay-heavy fill", t: 1.5 },
  { id: "wet", label: "Wet fill dirt", t: 1.6 },
];
type Shape = "rect" | "circle" | "area";

export default function FillDirtCalculator() {
  const [s, set] = useUrlState({ shape: "rect", l: "30", lu: "ft", w: "20", wu: "ft", dia: "10", diau: "ft", area: "600", d: "6", du: "in", comp: "20", soil: "dry", dens: "", truck: "10", price: "", per: "yd" });
  const shape = (["rect", "circle", "area"].includes(s.shape) ? s.shape : "rect") as Shape;
  const soil = SOILS.find((x) => x.id === s.soil) ?? SOILS[0];
  const tpy = Number(s.dens) > 0 ? Number(s.dens) : soil.t;
  const area = shape === "circle" ? Math.PI * (toFt(s.dia, s.diau) / 2) ** 2 : shape === "area" ? Number(s.area) : toFt(s.l, s.lu) * toFt(s.w, s.wu);
  const depth = toFt(s.d, s.du), comp = Math.max(0, Number(s.comp) || 0) / 100;
  const netYd = (area * depth) / FT3_PER_YD3, yd = netYd * (1 + comp), tons = yd * tpy;
  const truck = Number(s.truck), price = Number(s.price);
  const cost = price > 0 ? (s.per === "ton" ? tons * price : yd * price) : NaN;
  const error = !(area > 0) ? "Enter the area to fill." : !(depth > 0) ? "Enter the fill depth." : !(tpy > 0 && tpy < 3) ? "Enter a density between 0 and 3 tons per cubic yard." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Fill dirt calculator">
        <Segmented label="Area shape" value={shape} onChange={(v) => set("shape", v)} options={[{ id: "rect", label: "Rectangle" }, { id: "circle", label: "Circle" }, { id: "area", label: "Known area" }]} />
        {shape === "rect" && <div className="grid gap-3 sm:grid-cols-2">
          <UnitField id="l" label="Length" value={s.l} unit={s.lu} onValue={(v) => set("l", v)} onUnit={(u) => set("lu", u)} />
          <UnitField id="w" label="Width" value={s.w} unit={s.wu} onValue={(v) => set("w", v)} onUnit={(u) => set("wu", u)} />
        </div>}
        {shape === "circle" && <UnitField id="dia" label="Diameter" value={s.dia} unit={s.diau} onValue={(v) => set("dia", v)} onUnit={(u) => set("diau", u)} />}
        {shape === "area" && <Field id="area" label="Area" suffix="sq ft" value={s.area} onChange={(v) => set("area", v)} min={0} />}
        <UnitField id="d" label="Average depth to fill" value={s.d} unit={s.du} onValue={(v) => set("d", v)} onUnit={(u) => set("du", u)} />
        <Field id="comp" label="Compaction / settling allowance" suffix="%" value={s.comp} onChange={(v) => set("comp", v)} min={0} hint="Loose fill shrinks when compacted; 10–25% is typical for ordinary soil" />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="soil" className="label">Soil (sets a typical weight)</label>
            <select id="soil" className="field" value={soil.id} onChange={(e) => { set("soil", e.target.value); set("dens", ""); }}>
              {SOILS.map((x) => <option key={x.id} value={x.id}>{x.label} (~{x.t} t/yd³)</option>)}
            </select>
          </div>
          <Field id="dens" label="Weight (tons / yd³)" value={s.dens || String(soil.t)} onChange={(v) => set("dens", v)} min={0} hint="Use your supplier's figure" />
        </div>
        <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
          <Field id="truck" label="Truck load" suffix="tons" value={s.truck} onChange={(v) => set("truck", v)} min={0} hint="Ask your hauler" />
          <Field id="price" label="Price (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
          <Segmented label="per" value={s.per === "ton" ? "ton" : "yd"} onChange={(v) => set("per", v)} options={[{ id: "yd", label: "yd³" }, { id: "ton", label: "ton" }]} />
        </div>
      </form>
      <ResultCard error={error} label={`Fill dirt to order${comp > 0 ? ` (incl. ${+(comp * 100).toFixed(1)}% compaction)` : ""}`} value={`${yd.toFixed(2)} yd³`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat k="Weight" v={`${tons.toFixed(2)} tons`} />
          <Stat k="Pounds" v={`${Math.round(tons * 2000).toLocaleString()} lb`} />
          <Stat k="Compacted volume" v={`${netYd.toFixed(2)} yd³`} />
          <Stat k="Cubic meters" v={`${(yd * FT3_PER_YD3 * M3_PER_FT3).toFixed(2)} m³`} />
          {truck > 0 && <Stat k={`Truckloads (${truck} t)`} v={Math.ceil(tons / truck)} />}
          {Number.isFinite(cost) && <Stat k="Estimated cost" v={usd(cost)} />}
        </dl>
        <p className="mt-4 text-sm muted">{area.toFixed(1)} sq ft × {(depth * 12).toFixed(2)} in = {(area * depth).toFixed(1)} ft³ in place. A cubic yard of dry fill weighs around 2,400 lb, more than many pickups can safely carry; check your truck&apos;s payload.</p>
        <p className="mt-2 text-xs subtle">For structural fill under slabs, foundations or driveways, follow the engineer&apos;s compaction spec; ordinary fill dirt isn&apos;t a substitute for engineered fill.</p>
      </ResultCard>
    </div>
  );
}
