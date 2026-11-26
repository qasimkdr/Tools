"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { roof, pitchAngle, type RoofType } from "@/lib/roof";

const ft = (x: number, d = 1) => `${x.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d })} ft`;
const TYPES: RoofType[] = ["gable", "hip", "shed", "flat"];

export default function RoofingCalculator() {
  const [s, set] = useUrlState({ type: "gable", length: "40", width: "30", overhang: "1", pitch: "6", waste: "10", bundles: "3", roll: "1000", price: "", pu: "in12", spb: "", nps: "4" });
  const type = (TYPES.includes(s.type as RoofType) ? s.type : "gable") as RoofType;
  const deg = s.pu === "deg";
  const L = Number(s.length), W = Number(s.width), oh = Number(s.overhang) || 0, bps = Number(s.bundles);
  const pitch = deg ? (Number(s.pitch) > 0 && Number(s.pitch) < 90 ? 12 * Math.tan((Number(s.pitch) * Math.PI) / 180) : NaN) : Number(s.pitch);
  const err = !(L > 0) || !(W > 0) ? "Enter the house length and width (outside walls, in feet)." : type !== "flat" && !(pitch > 0 && pitch <= 24) ? (deg ? "Enter a roof angle between 1° and 63°." : "Enter a roof pitch between 1 and 24 (inches of rise per 12 inches).") : !(oh >= 0) ? "The overhang can't be negative." : !(bps > 0) ? "Enter bundles per square (3 for most asphalt shingles)." : null;
  const r = err ? null : roof({ length: L, width: W, overhang: oh, pitch: type === "flat" ? 0 : pitch, type, wastePct: Math.max(0, Number(s.waste) || 0), bundlesPerSq: bps });
  const roll = Number(s.roll), price = Number(s.price);
  const rolls = r && roll > 0 ? Math.ceil((r.area * (1 + Math.max(0, Number(s.waste) || 0) / 100)) / roll) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Roofing calculator">
        <Segmented label="Roof shape" value={type} onChange={(v) => set("type", v)} options={[{ id: "gable", label: "Gable" }, { id: "hip", label: "Hip" }, { id: "shed", label: "Shed" }, { id: "flat", label: "Flat" }]} />
        {type !== "flat" && <Segmented label="Pitch entered as" value={deg ? "deg" : "in12"} onChange={(v) => { const cur = Number(s.pitch); if (v !== s.pu && cur > 0) set("pitch", String(v === "deg" ? Math.round((Math.atan(cur / 12) * 180) / Math.PI * 10) / 10 : Math.round(12 * Math.tan((cur * Math.PI) / 180) * 100) / 100)); set("pu", v); }} options={[{ id: "in12", label: "Rise per 12 in (6/12)" }, { id: "deg", label: "Degrees (26.6°)" }]} />}
        <div className="grid grid-cols-2 gap-3">
          <Field id="length" label="House length" suffix="ft" value={s.length} onChange={(v) => set("length", v)} min={0} hint="Along the ridge" />
          <Field id="width" label="House width" suffix="ft" value={s.width} onChange={(v) => set("width", v)} min={0} />
          <Field id="overhang" label="Eave overhang" suffix="ft" value={s.overhang} onChange={(v) => set("overhang", v)} min={0} hint="Each side" />
          {type !== "flat" && <Field id="pitch" label={deg ? "Roof angle" : "Roof pitch"} suffix={deg ? "°" : "/ 12"} value={s.pitch} onChange={(v) => set("pitch", v)} min={0} hint={deg ? "Degrees from horizontal" : "Rise in inches per foot"} />}
          <Field id="waste" label="Waste allowance" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} hint="10% gable, 15% hip" />
          <Field id="bundles" label="Bundles per square" value={s.bundles} onChange={(v) => set("bundles", v)} min={1} hint="Check the wrapper" />
          <Field id="roll" label="Underlayment per roll" suffix="sq ft" value={s.roll} onChange={(v) => set("roll", v)} min={0} hint="From the product label" />
          <Field id="spb" label="Shingles per bundle (optional)" value={s.spb} onChange={(v) => set("spb", v)} min={0} inputMode="numeric" hint="From the wrapper, for nails" />
          <Field id="nps" label="Nails per shingle" value={s.nps} onChange={(v) => set("nps", v)} min={0} inputMode="numeric" hint="4 standard; 6 high-wind" />
          <Field id="price" label="Cost per square (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} hint="Material or installed" />
        </div>
      </form>
      <ResultCard error={err} label="Roof area" value={r ? <span data-testid="area">{Math.round(r.area).toLocaleString("en-US")} sq ft</span> : "–"}>
        {r && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Roofing squares" v={<span data-testid="squares">{r.squares.toFixed(2)}</span>} />
            <Stat k="Squares with waste" v={r.withWaste.toFixed(2)} />
            <Stat k={`Shingle bundles (${bps}/square)`} v={<span data-testid="bundles">{r.bundles}</span>} />
            {price > 0 && <Stat k="Estimated cost" v={<span data-testid="cost">{(r.withWaste * price).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</span>} />}
            <Stat k="Underlayment rolls" v={rolls || "–"} />
            {Number(s.spb) > 0 && Number(s.nps) > 0 && <Stat k="Roofing nails (field shingles)" v={<span data-testid="nails">{(r.bundles * Number(s.spb) * Number(s.nps)).toLocaleString("en-US")}</span>} />}
            {type !== "flat" && <Stat k="Pitch factor / angle" v={<span data-testid="factor">{r.factor.toFixed(3)} · {pitchAngle(pitch).toFixed(1)}° · {(Math.round(pitch * 10) / 10)}/12</span>} />}
            {r.ridgeCap > 0 && <Stat k={type === "hip" ? "Ridge + hips (ridge cap)" : "Ridge (ridge cap)"} v={<span data-testid="ridge">{ft(r.ridgeCap)}</span>} />}
            <Stat k="Drip edge (eaves + rakes)" v={<span data-testid="drip">{ft(r.dripEdge)}</span>} />
            {type !== "flat" && <Stat k={type === "shed" ? "Rafter length" : "Rafter length (eave to ridge)"} v={ft(r.rafter, 2)} />}
            <Stat k="Footprint with overhangs" v={`${ft(r.L, 0)} × ${ft(r.W, 0)}`} />
          </dl>
          <h2 className="mt-5 text-sm font-semibold">Roof area at other pitches (same footprint)</h2>
          <table className="mt-2 w-full text-sm" data-testid="pitches">
            <thead><tr className="text-left subtle"><th className="py-1">Pitch</th><th>Factor</th><th>Area</th><th>Squares</th></tr></thead>
            <tbody>{[3, 4, 6, 8, 10, 12].map((p) => { const f = Math.sqrt(1 + (p / 12) ** 2); return (
              <tr key={p} className={`border-t border-[var(--border)] ${type !== "flat" && Math.abs(p - pitch) < 0.05 ? "font-semibold" : ""}`}><td className="py-1">{p}/12</td><td>{f.toFixed(3)}</td><td>{Math.round(r.footprint * f).toLocaleString("en-US")} sq ft</td><td>{(r.footprint * f / 100).toFixed(1)}</td></tr>); })}</tbody>
          </table>
          <p className="mt-2 text-xs subtle">An estimate for a simple roof. Dormers, valleys and sections with a different pitch need to be measured and added separately.</p>
        </>}
      </ResultCard>
    </div>
  );
}
