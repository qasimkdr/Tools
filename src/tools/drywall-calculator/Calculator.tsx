"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { drywall, sheetsFor } from "@/lib/drywall";

const SHEETS = [{ id: "32", label: "4 × 8 ft (32 sq ft)" }, { id: "40", label: "4 × 10 ft (40 sq ft)" }, { id: "48", label: "4 × 12 ft (48 sq ft)" }, { id: "54", label: "4.5 × 12 ft (54 sq ft)" }];
const FT_PER_M = 3.28084;
const n0 = (x: number) => Math.round(x).toLocaleString("en-US");

export default function DrywallCalculator() {
  const [s, set] = useUrlState({ mode: "room", u: "ft", l: "14", w: "12", h: "8", ceil: "1", doors: "1", da: "21", win: "2", wa: "15", area: "500", sheet: "32", waste: "10", price: "" });
  const m = s.u === "m";
  const k = m ? FT_PER_M : 1, k2 = k * k;
  const sheetArea = Number(s.sheet) || 32;
  const waste = Math.max(0, Number(s.waste) || 0);
  const room = s.mode !== "area";
  const L = Number(s.l) * k, W = Number(s.w) * k, H = Number(s.h) * k;
  const err = room ? (!(L > 0) || !(W > 0) || !(H > 0) ? "Enter the room length, width and wall height." : null) : !(Number(s.area) > 0) ? "Enter the total area to cover." : null;
  const r = err ? null : room
    ? drywall({ length: L, width: W, height: H, ceiling: s.ceil === "1", doors: Math.max(0, Number(s.doors) || 0), doorArea: (Number(s.da) || 0) * k2, windows: Math.max(0, Number(s.win) || 0), windowArea: (Number(s.wa) || 0) * k2, sheetArea, wastePct: waste })
    : sheetsFor(Number(s.area) * k2, sheetArea, waste);
  const area = (sqft: number) => (m ? `${(sqft / k2).toFixed(1)} m²` : `${n0(sqft)} sq ft`);
  const price = Number(s.price);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Drywall calculator">
        <div className="grid gap-3 sm:grid-cols-2">
          <Segmented label="Measure by" value={room ? "room" : "area"} onChange={(v) => set("mode", v)} options={[{ id: "room", label: "Room size" }, { id: "area", label: "Total area" }]} />
          <Segmented label="Units" value={m ? "m" : "ft"} onChange={(v) => set("u", v)} options={[{ id: "ft", label: "Feet" }, { id: "m", label: "Meters" }]} />
        </div>
        {room ? <>
          <div className="grid grid-cols-3 gap-3">
            <Field id="l" label="Length" suffix={s.u} value={s.l} onChange={(v) => set("l", v)} min={0} />
            <Field id="w" label="Width" suffix={s.u} value={s.w} onChange={(v) => set("w", v)} min={0} />
            <Field id="h" label="Wall height" suffix={s.u} value={s.h} onChange={(v) => set("h", v)} min={0} />
          </div>
          <Segmented label="Include the ceiling?" value={s.ceil === "1" ? "1" : "0"} onChange={(v) => set("ceil", v)} options={[{ id: "1", label: "Walls + ceiling" }, { id: "0", label: "Walls only" }]} />
          <div className="grid grid-cols-2 gap-3">
            <Field id="doors" label="Doors" value={s.doors} onChange={(v) => set("doors", v)} min={0} inputMode="numeric" />
            <Field id="da" label="Area per door" suffix={m ? "m²" : "sq ft"} value={s.da} onChange={(v) => set("da", v)} min={0} hint={m ? "0.9 × 2.0 m ≈ 1.8 m²" : "3 × 7 ft = 21 sq ft"} />
            <Field id="win" label="Windows" value={s.win} onChange={(v) => set("win", v)} min={0} inputMode="numeric" />
            <Field id="wa" label="Area per window" suffix={m ? "m²" : "sq ft"} value={s.wa} onChange={(v) => set("wa", v)} min={0} hint={m ? "1.0 × 1.4 m = 1.4 m²" : "3 × 5 ft = 15 sq ft"} />
          </div>
        </> : <Field id="area" label="Total wall and ceiling area" suffix={m ? "m²" : "sq ft"} value={s.area} onChange={(v) => set("area", v)} min={0} hint="Already minus doors and windows" />}
        <div>
          <label htmlFor="sheet" className="label">Sheet size</label>
          <select id="sheet" className="field" value={String(sheetArea)} onChange={(e) => set("sheet", e.target.value)}>{SHEETS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}</select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="waste" label="Waste allowance" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} hint="10% typical; 15% for many cuts" />
          <Field id="price" label="Price per sheet (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
        </div>
      </form>
      <ResultCard error={err} label="Drywall sheets needed" value={r ? <span data-testid="sheets">{r.sheets} sheets</span> : "–"}>
        {r && <>
          <p className="mt-1 text-sm muted">{SHEETS.find((x) => Number(x.id) === sheetArea)?.label}, {waste}% waste</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Area to cover" v={<span data-testid="net">{area(r.net)}</span>} />
            <Stat k="With waste" v={area(r.withWaste)} />
            {room && <>
              <Stat k="Walls" v={area(r.walls)} />
              <Stat k="Ceiling" v={area(r.ceil)} />
              <Stat k="Doors and windows" v={`− ${area(r.openings)}`} />
            </>}
            {price > 0 && <Stat k="Drywall cost" v={<span data-testid="cost">{(r.sheets * price).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>} />}
            <Stat k="Joint compound (ready-mix)" v={<span data-testid="mud">{r.mud.toFixed(1)} gal · {r.pails} × 4.5 gal pail{r.pails === 1 ? "" : "s"}</span>} />
            <Stat k="Joint tape" v={<span data-testid="tape">{n0(r.tape)} ft · {r.tapeRolls250} × 250 ft roll{r.tapeRolls250 === 1 ? "" : "s"}</span>} />
          </dl>
          <h2 className="mt-5 text-sm font-semibold">Sheets by size for this area</h2>
          <table className="mt-2 w-full text-sm" data-testid="by-size">
            <thead><tr className="text-left subtle"><th className="py-1">Sheet</th><th>Sheets</th>{price > 0 && <th>Cost at your price</th>}</tr></thead>
            <tbody>{SHEETS.map((x) => { const n = Math.ceil(r.withWaste / Number(x.id) - 1e-9); return <tr key={x.id} className={`border-t border-[var(--border)] ${Number(x.id) === sheetArea ? "font-semibold" : ""}`}><td className="py-1">{x.label}</td><td>{n}</td>{price > 0 && <td>{Number(x.id) === sheetArea ? (n * price).toLocaleString("en-US", { style: "currency", currency: "USD" }) : "–"}</td>}</tr>; })}</tbody>
          </table>
          <p className="mt-2 text-xs subtle">Compound and tape use USG&apos;s finishing rates (about 9–10 gallons of ready-mix and 370 ft of tape per 1,000 sq ft); textured or Level 5 finishes use more.</p>
        </>}
      </ResultCard>
    </div>
  );
}
