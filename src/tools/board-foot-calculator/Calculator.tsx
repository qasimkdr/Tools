"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { parseQ, toNum } from "@/lib/rational";

const num = (s: string) => { const q = parseQ(s); return q ? toNum(q) : NaN; };
const COLS = "grid grid-cols-[3.5rem_1fr_1fr_1fr] gap-2";

export default function BoardFootCalculator() {
  const [s, set] = useUrlState({ rows: "4:2:6:8,6:4/4:6:10", lu: "ft", waste: "10", price: "" });
  const rows = s.rows.split(",").map((r) => { const [q = "1", t = "", w = "", l = ""] = r.split(":"); return { q, t, w, l }; });
  const save = (rs: typeof rows) => set("rows", rs.map((r) => `${r.q}:${r.t}:${r.w}:${r.l}`).join(","));
  const upd = (i: number, k: "q" | "t" | "w" | "l", v: string) => save(rows.map((r, j) => (j === i ? { ...r, [k]: v.replace(/[:,]/g, "") } : r)));
  const lenFt = (l: string) => num(l) / (s.lu === "in" ? 12 : 1);
  const each = rows.map((r) => { const bf = (num(r.t) * num(r.w) * lenFt(r.l)) / 12; return { per: bf, total: bf * (Number(r.q) || 0) }; });
  const valid = each.every((e) => Number.isFinite(e.total) && e.total >= 0);
  const net = each.reduce((a, e) => a + (Number.isFinite(e.total) ? e.total : 0), 0);
  const waste = Math.max(0, Number(s.waste) || 0) / 100, gross = net * (1 + waste), price = Number(s.price);
  const error = !valid ? "Check each row: thickness and width in inches (fractions like 3/4 or 8/4 are fine), length, and a quantity." : !(net > 0) ? "Enter at least one board." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Board foot calculator">
        <div className="space-y-2">
          <div className={`${COLS} text-xs font-medium subtle`}><span>Qty</span><span>Thick (in)</span><span>Width (in)</span><span>Length ({s.lu})</span></div>
          {rows.map((r, i) => (
            <div key={i} className={COLS}>
              <input aria-label={`Quantity ${i + 1}`} className="field !px-2 tabular-nums" inputMode="numeric" value={r.q} onChange={(e) => upd(i, "q", e.target.value)} />
              <input aria-label={`Thickness ${i + 1}`} className="field !px-2 tabular-nums" value={r.t} onChange={(e) => upd(i, "t", e.target.value)} />
              <input aria-label={`Width ${i + 1}`} className="field !px-2 tabular-nums" value={r.w} onChange={(e) => upd(i, "w", e.target.value)} />
              <input aria-label={`Length ${i + 1}`} className="field !px-2 tabular-nums" value={r.l} onChange={(e) => upd(i, "l", e.target.value)} />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button type="button" className="btn-ghost !py-2" disabled={rows.length >= 20} onClick={() => save([...rows, { q: "1", t: "1", w: "6", l: "8" }])}>+ Add board</button>
            <button type="button" className="btn-ghost !py-2" disabled={rows.length <= 1} onClick={() => save(rows.slice(0, -1))}>− Remove last</button>
          </div>
          <p className="text-xs subtle">Thickness accepts hardwood quarters (4/4 = 1 in, 8/4 = 2 in) or fractions like 3/4.</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Segmented label="Length in" value={s.lu === "in" ? "in" : "ft"} onChange={(v) => set("lu", v)} options={[{ id: "ft", label: "ft" }, { id: "in", label: "in" }]} />
          <Field id="waste" label="Waste" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
          <Field id="price" label="$ per bd ft" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
        </div>
      </form>
      <ResultCard error={error} label={`Board feet${waste > 0 ? ` (incl. ${+(waste * 100).toFixed(1)}% waste)` : ""}`} value={`${gross.toFixed(2)} bd ft`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Net (before waste)" v={`${net.toFixed(2)} bd ft`} />
          <Stat k="Volume" v={`${(gross / 12).toFixed(2)} ft³ · ${((gross / 12) * 0.0283168).toFixed(3)} m³`} />
          {price > 0 && <Stat k="Estimated cost" v={usd(gross * price)} />}
          {price > 0 && <Stat k="Cost before waste" v={usd(net * price)} />}
        </dl>
        <table className="mt-4 w-full text-sm" data-testid="rows">
          <thead><tr className="text-left subtle"><th className="py-1 font-medium">Board</th><th className="py-1 text-right font-medium">Each</th><th className="py-1 text-right font-medium">Total</th></tr></thead>
          <tbody>{rows.map((r, i) => (
            <tr key={i} className="border-t border-[var(--border)]"><td className="py-1">{r.q} × {r.t}″ × {r.w}″ × {r.l}{s.lu === "in" ? "″" : "′"}</td><td className="py-1 text-right tabular-nums">{Number.isFinite(each[i].per) ? each[i].per.toFixed(3) : "—"}</td><td className="py-1 text-right tabular-nums">{Number.isFinite(each[i].total) ? each[i].total.toFixed(2) : "—"}</td></tr>
          ))}</tbody>
        </table>
        <p className="mt-3 text-xs subtle">Board feet = thickness (in) × width (in) × length (ft) ÷ 12. Softwood dimension lumber is usually figured on nominal sizes (a 2×4 counts as 2 × 4); hardwood on rough thickness.</p>
      </ResultCard>
    </div>
  );
}
