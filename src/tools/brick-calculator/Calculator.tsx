"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { BRICKS, bricks } from "@/lib/brick";

const FT = 3.28084, SQFT = 10.7639, MM = 25.4;

export default function BrickCalculator() {
  const [s, set] = useUrlState({ u: "ft", l: "20", h: "8", open: "1", ow: "3", oh: "4", type: "modular", bl: "7.625", bh: "2.25", bd: "3.625", j: "0.375", waste: "5", price: "", yld: "" });
  const m = s.u === "m";
  const preset = BRICKS.find((b) => b.id === s.type);
  const custom = s.type === "custom" || !preset;
  // Brick sizes: inches (imperial) or mm (metric) in the custom fields.
  const conv = (v: string) => Number(v) / (m ? MM : 1);
  const bl = custom ? conv(s.bl) : preset!.l, bh = custom ? conv(s.bh) : preset!.h, bd = custom ? conv(s.bd) : preset!.d;
  const j = custom ? conv(s.j) : (preset!.metric ? preset!.joint : Number(s.j) >= 0 ? conv(s.j) || preset!.joint : preset!.joint);
  const wall = Number(s.l) * Number(s.h) * (m ? SQFT : 1);
  const openings = Math.max(0, Math.round(Number(s.open) || 0)) * (Number(s.ow) || 0) * (Number(s.oh) || 0) * (m ? SQFT : 1);
  const area = Math.max(0, wall - openings);
  const waste = Math.max(0, Number(s.waste) || 0);
  const err = !(Number(s.l) > 0) || !(Number(s.h) > 0) ? "Enter the wall length and height." : !(bl > 0 && bh > 0 && bd > 0) ? "Enter the brick length, height and depth." : !(j >= 0) ? "Enter the mortar joint width." : openings >= wall ? "The openings are bigger than the wall." : null;
  const r = err ? null : bricks({ areaSqft: area, l: bl, h: bh, d: bd, joint: j, wastePct: waste });
  const price = Number(s.price), yld = Number(s.yld);
  const ar = (sqft: number) => (m ? `${(sqft / SQFT).toFixed(2)} m²` : `${Math.round(sqft).toLocaleString("en-US")} sq ft`);
  const vol = (cuft: number) => (m ? `${(cuft * 0.0283168).toFixed(3)} m³` : `${cuft.toFixed(1)} cu ft`);
  const switchUnit = (u: string) => {
    if (u === s.u) return;
    const toM = u === "m";
    for (const k of ["l", "h", "ow", "oh"] as const) { const v = Number(s[k]); if (s[k] !== "" && Number.isFinite(v)) set(k, String(Math.round((toM ? v / FT : v * FT) * 100) / 100)); }
    for (const k of ["bl", "bh", "bd", "j"] as const) { const v = Number(s[k]); if (s[k] !== "" && Number.isFinite(v)) set(k, String(toM ? Math.round(v * MM * 10) / 10 : Math.round((v / MM) * 1000) / 1000)); }
    set("u", u);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Brick calculator">
        <Segmented label="Units" value={m ? "m" : "ft"} onChange={switchUnit} options={[{ id: "ft", label: "Imperial (ft, in)" }, { id: "m", label: "Metric (m, mm)" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="l" label="Wall length" suffix={m ? "m" : "ft"} value={s.l} onChange={(v) => set("l", v)} min={0} />
          <Field id="h" label="Wall height" suffix={m ? "m" : "ft"} value={s.h} onChange={(v) => set("h", v)} min={0} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field id="open" label="Doors / windows" value={s.open} onChange={(v) => set("open", v)} min={0} inputMode="numeric" />
          <Field id="ow" label="Opening width" suffix={m ? "m" : "ft"} value={s.ow} onChange={(v) => set("ow", v)} min={0} />
          <Field id="oh" label="Opening height" suffix={m ? "m" : "ft"} value={s.oh} onChange={(v) => set("oh", v)} min={0} />
        </div>
        <div>
          <label htmlFor="type" className="label">Brick size</label>
          <select id="type" className="field" value={custom ? "custom" : s.type} onChange={(e) => set("type", e.target.value)}>
            {BRICKS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
            <option value="custom">Custom size</option>
          </select>
        </div>
        {custom && <div className="grid grid-cols-3 gap-3">
          <Field id="bl" label="Brick length" suffix={m ? "mm" : "in"} value={s.bl} onChange={(v) => set("bl", v)} min={0} />
          <Field id="bh" label="Brick height" suffix={m ? "mm" : "in"} value={s.bh} onChange={(v) => set("bh", v)} min={0} />
          <Field id="bd" label="Brick depth" suffix={m ? "mm" : "in"} value={s.bd} onChange={(v) => set("bd", v)} min={0} hint="For mortar volume" />
        </div>}
        <div className="grid grid-cols-2 gap-3">
          {(custom || !preset?.metric) && <Field id="j" label="Mortar joint" suffix={m ? "mm" : "in"} value={s.j} onChange={(v) => set("j", v)} min={0} hint={m ? "10 mm is standard" : "⅜″ = 0.375 is standard"} />}
          <Field id="waste" label="Waste / breakage" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} hint="At least 5%" />
          <Field id="price" label="Price per brick (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
          <Field id="yld" label="Mortar bag yield (optional)" suffix={m ? "litres" : "cu ft"} value={s.yld} onChange={(v) => set("yld", v)} min={0} hint="From the bag" />
        </div>
      </form>
      <ResultCard error={err} label="Bricks needed" value={r ? <span data-testid="bricks">{r.total.toLocaleString("en-US")} bricks</span> : "–"}>
        {r && <>
          <p className="mt-1 text-sm muted">{ar(area)} of wall, {waste}% extra</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k={m ? "Bricks per m²" : "Bricks per sq ft"} v={<span data-testid="per">{(m ? r.perSqft * SQFT : r.perSqft).toFixed(2)}</span>} />
            <Stat k="Bricks before waste" v={Math.ceil(r.net - 1e-9).toLocaleString("en-US")} />
            <Stat k="Wall area" v={ar(wall)} />
            <Stat k="Openings" v={`− ${ar(openings)}`} />
            <Stat k="Mortar (before waste)" v={<span data-testid="mortar">{vol(r.mortarCuFt)}</span>} />
            <Stat k="Mortar per 1,000 bricks" v={vol(r.mortarPer1000)} />
            {yld > 0 && <Stat k="Mortar bags" v={<span data-testid="bags">{Math.ceil((m ? r.mortarCuFt * 28.3168 : r.mortarCuFt) / yld - 1e-9)}</span>} />}
            {price > 0 && <Stat k="Brick cost" v={<span data-testid="cost">{(r.total * price).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>} />}
          </dl>
          <details className="mt-4" open>
            <summary className="cursor-pointer text-sm font-semibold">Step by step</summary>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm" data-testid="steps">
              <li>Wall area = {ar(wall)} − openings {ar(openings)} = {ar(area)}</li>
              <li>One brick plus its joint covers ({(bl + j).toFixed(3)} × {(bh + j).toFixed(3)}) in = {((bl + j) * (bh + j)).toFixed(2)} sq in, so 144 ÷ {((bl + j) * (bh + j)).toFixed(2)} = {r.perSqft.toFixed(3)} bricks per sq ft</li>
              <li>Bricks = {Math.round(area * 100) / 100} sq ft × {r.perSqft.toFixed(3)} = {r.net.toFixed(1)}; with {waste}% extra = {r.total.toLocaleString("en-US")}</li>
              <li>Mortar per brick = brick-plus-joint volume − brick volume = {((bl + j) * (bh + j) * bd - bl * bh * bd).toFixed(1)} cu in</li>
            </ol>
          </details>
          <p className="mt-2 text-xs subtle">For a single-wythe wall (one brick thick, like veneer). Double the count for a two-wythe wall. Mortar is the net volume in the joints; buy extra for waste.</p>
        </>}
      </ResultCard>
    </div>
  );
}
