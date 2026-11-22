"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";

type Mode = "pieces" | "area" | "perimeter";
const COLS = "grid grid-cols-[4rem_1fr_1fr] gap-2";

export default function LinearFeetCalculator() {
  const [s, set] = useUrlState({ mode: "area", rows: "4:8:0,2:10:6", sqft: "200", width: "5.5", pl: "12", pw: "14", open: "3", waste: "10", stock: "16", price: "" });
  const mode = (["pieces", "area", "perimeter"].includes(s.mode) ? s.mode : "area") as Mode;
  const rows = s.rows.split(",").map((r) => { const [q = "1", ft = "0", inch = "0"] = r.split(":"); return { q, ft, inch }; });
  const save = (rs: typeof rows) => set("rows", rs.map((r) => `${r.q}:${r.ft}:${r.inch}`).join(","));
  const upd = (i: number, k: "q" | "ft" | "inch", v: string) => save(rows.map((r, j) => (j === i ? { ...r, [k]: v.replace(/[:,]/g, "") } : r)));
  let net = 0, error: string | null = null, note = "";
  if (mode === "pieces") { net = rows.reduce((a, r) => a + (Number(r.q) || 0) * ((Number(r.ft) || 0) + (Number(r.inch) || 0) / 12), 0); note = `${rows.length} line${rows.length === 1 ? "" : "s"} of pieces`; }
  else if (mode === "area") { const w = Number(s.width) / 12; if (!(w > 0)) error = "Enter the material's coverage width in inches."; else { net = Number(s.sqft) / w; note = `${s.sqft} sq ft ÷ ${s.width} in (${+w.toFixed(4)} ft) wide`; } }
  else { net = 2 * ((Number(s.pl) || 0) + (Number(s.pw) || 0)) - Math.max(0, Number(s.open) || 0); note = `2 × (${s.pl} + ${s.pw}) − ${s.open || 0} ft of openings`; }
  if (!error && !(net > 0)) error = "Enter measurements greater than zero.";
  const waste = Math.max(0, Number(s.waste) || 0) / 100, total = net * (1 + waste);
  const stock = Number(s.stock), price = Number(s.price);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Linear feet calculator">
        <Segmented label="Calculate from" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "area", label: "Square feet" }, { id: "pieces", label: "Pieces / lengths" }, { id: "perimeter", label: "Room perimeter" }]} />
        {mode === "area" && <div className="grid grid-cols-2 gap-3">
          <Field id="sqft" label="Area to cover" suffix="sq ft" value={s.sqft} onChange={(v) => set("sqft", v)} min={0} />
          <Field id="width" label="Material width (coverage)" suffix="in" value={s.width} onChange={(v) => set("width", v)} min={0} hint="e.g. 5.5 in for a 6-in deck board" />
        </div>}
        {mode === "pieces" && <div className="space-y-2">
          <div className={`${COLS} text-xs font-medium subtle`}><span>Qty</span><span>Feet</span><span>Inches</span></div>
          {rows.map((r, i) => (
            <div key={i} className={COLS}>
              <input aria-label={`Quantity ${i + 1}`} className="field !px-2 tabular-nums" inputMode="numeric" value={r.q} onChange={(e) => upd(i, "q", e.target.value)} />
              <input aria-label={`Feet ${i + 1}`} className="field !px-2 tabular-nums" inputMode="decimal" value={r.ft} onChange={(e) => upd(i, "ft", e.target.value)} />
              <input aria-label={`Inches ${i + 1}`} className="field !px-2 tabular-nums" inputMode="decimal" value={r.inch} onChange={(e) => upd(i, "inch", e.target.value)} />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button type="button" className="btn-ghost !py-2" disabled={rows.length >= 20} onClick={() => save([...rows, { q: "1", ft: "8", inch: "0" }])}>+ Add line</button>
            <button type="button" className="btn-ghost !py-2" disabled={rows.length <= 1} onClick={() => save(rows.slice(0, -1))}>− Remove last</button>
          </div>
        </div>}
        {mode === "perimeter" && <div className="grid grid-cols-3 gap-3">
          <Field id="pl" label="Room length" suffix="ft" value={s.pl} onChange={(v) => set("pl", v)} min={0} />
          <Field id="pw" label="Room width" suffix="ft" value={s.pw} onChange={(v) => set("pw", v)} min={0} />
          <Field id="open" label="Minus openings" suffix="ft" value={s.open} onChange={(v) => set("open", v)} min={0} hint="Doorways etc." />
        </div>}
        <div className="grid grid-cols-3 gap-3">
          <Field id="waste" label="Waste" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
          <Field id="stock" label="Stock length" suffix="ft" value={s.stock} onChange={(v) => set("stock", v)} min={0} hint="Board or trim length sold" />
          <Field id="price" label="Price per LF" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
        </div>
      </form>
      <ResultCard error={error} label={`Linear feet${waste > 0 ? ` (incl. ${+(waste * 100).toFixed(1)}% waste)` : ""}`} value={`${total.toFixed(2)} LF`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Net (before waste)" v={`${net.toFixed(2)} ft`} />
          <Stat k="Meters / yards" v={`${(total * 0.3048).toFixed(2)} m · ${(total / 3).toFixed(2)} yd`} />
          {stock > 0 && <Stat k={`${s.stock} ft pieces to buy`} v={Math.ceil(total / stock)} />}
          {price > 0 && <Stat k="Estimated cost" v={usd(total * price)} />}
        </dl>
        <p className="mt-4 text-sm muted" data-testid="steps">{note}</p>
        <p className="mt-2 text-xs subtle">Linear feet measure length only. Buying stock lengths can leave offcuts, so plan joints and check that pieces fit your longest runs.</p>
      </ResultCard>
    </div>
  );
}
