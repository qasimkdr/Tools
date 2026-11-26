"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { deck, stairTreads } from "@/lib/deck";

const FT = 3.28084, MM = 25.4;
const BOARDS = [
  { id: "5.5", label: "5½″ (nominal 6″ / 5/4 × 6)", mlabel: "140 mm (5½″)" },
  { id: "3.5", label: "3½″ (nominal 4″)", mlabel: "90 mm (3½″)" },
  { id: "7.25", label: "7¼″ (nominal 8″)", mlabel: "184 mm (7¼″)" },
];
const LENGTHS = [8, 10, 12, 16, 20]; // ft
const LENGTHS_M = [2.4, 3.0, 3.6, 4.2, 4.8, 5.4]; // common metric stock lengths

export default function DeckingCalculator() {
  const [s, set] = useUrlState({ u: "ft", l: "16", w: "12", bw: "5.5", gap: "0.125", len: "16", waste: "10", js: "16", price: "", steps: "0", sw: "4", td: "11.25" });
  const m = s.u === "m";
  // Inputs are in ft/in (imperial) or m/mm (metric); everything is computed in feet and inches.
  const L = Number(s.l) * (m ? FT : 1), W = Number(s.w) * (m ? FT : 1), bw = Number(s.bw);
  const gap = Number(s.gap) / (m ? MM : 1), len = Number(s.len) * (m ? FT : 1), js = Number(s.js) / (m ? MM : 1);
  const sw = (Number(s.sw) || 0) * (m ? FT : 1), td = (Number(s.td) || 0) / (m ? MM : 1);
  const waste = Math.max(0, Number(s.waste) || 0);
  const err = !(L > 0) || !(W > 0) ? "Enter the deck length (the direction the boards run) and width." : !(bw > 0) ? "Choose the board width." : !(gap >= 0) ? "Enter the gap between boards (0 or more)." : !(len > 0) ? "Choose a board length." : !(js > 0) ? "Enter the joist spacing." : null;
  const r = err ? null : deck({ length: L, width: W, boardW: bw, gap, boardLen: len, wastePct: waste, joistSpacing: js });
  const price = Number(s.price);
  const st = r ? stairTreads(Math.max(0, Math.round(Number(s.steps) || 0)), td, sw, bw, gap, len) : null;
  const totalBoards = r ? r.boards + (st?.boards ?? 0) : 0;
  const lenOpts = m ? LENGTHS_M : LENGTHS;
  const lenLabel = (x: number) => (m ? `${x.toFixed(1)} m` : `${x} ft`);
  const run = (ft: number) => (m ? `${Math.round(ft / FT).toLocaleString("en-US")} m` : `${Math.round(ft).toLocaleString("en-US")} ft`);
  const dim = (ft: number) => (m ? `${(ft / FT).toFixed(2).replace(/\.?0+$/, "")} m` : `${Math.round(ft * 100) / 100} ft`);
  const switchUnit = (u: string) => {
    if (u === s.u) return;
    const toM = u === "m";
    for (const k of ["l", "w", "sw"] as const) { const v = Number(s[k]); if (s[k] !== "" && Number.isFinite(v)) set(k, String(Math.round((toM ? v / FT : v * FT) * 100) / 100)); }
    for (const k of ["gap", "js", "td"] as const) { const v = Number(s[k]); if (s[k] !== "" && Number.isFinite(v)) set(k, String(toM ? Math.round(v * MM) : Math.round((v / MM) * 1000) / 1000)); }
    const lv = Number(s.len) * (toM ? 1 / FT : FT);
    const opts = toM ? LENGTHS_M : LENGTHS;
    set("len", String(opts.reduce((a, b) => (Math.abs(b - lv) < Math.abs(a - lv) ? b : a))));
    set("u", u);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Decking calculator">
        <Segmented label="Units" value={m ? "m" : "ft"} onChange={switchUnit} options={[{ id: "ft", label: "Imperial (ft, in)" }, { id: "m", label: "Metric (m, mm)" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="l" label="Deck length (board direction)" suffix={m ? "m" : "ft"} value={s.l} onChange={(v) => set("l", v)} min={0} />
          <Field id="w" label="Deck width" suffix={m ? "m" : "ft"} value={s.w} onChange={(v) => set("w", v)} min={0} hint="Across the boards" />
        </div>
        <div>
          <label htmlFor="bw" className="label">Board width (actual)</label>
          <select id="bw" className="field" value={BOARDS.some((b) => b.id === s.bw) ? s.bw : "5.5"} onChange={(e) => set("bw", e.target.value)}>{BOARDS.map((b) => <option key={b.id} value={b.id}>{m ? b.mlabel : b.label}</option>)}</select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="gap" label="Gap between boards" suffix={m ? "mm" : "in"} value={s.gap} onChange={(v) => set("gap", v)} min={0} hint={m ? "3–6 mm; check your board's guide" : "⅛″ = 0.125; check your board's guide"} />
          <div>
            <label htmlFor="len" className="label">Board length</label>
            <select id="len" className="field" value={String(Number(s.len))} onChange={(e) => set("len", e.target.value)}>{lenOpts.map((x) => <option key={x} value={String(x)}>{lenLabel(x)}</option>)}</select>
          </div>
          <Field id="waste" label="Waste allowance" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} hint="10% straight; 15%+ diagonal" />
          <Field id="js" label="Joist spacing" suffix={m ? "mm o.c." : "in o.c."} value={s.js} onChange={(v) => set("js", v)} min={0} hint={m ? "400 mm typical; 300 for diagonal" : "16″ typical; 12″ for diagonal"} />
        </div>
        <details className="rounded-xl border border-[var(--border)] p-3" open={Number(s.steps) > 0}>
          <summary className="cursor-pointer text-sm font-semibold">Deck stairs (treads)</summary>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Field id="steps" label="Number of steps" value={s.steps} onChange={(v) => set("steps", v)} min={0} inputMode="numeric" />
            <Field id="sw" label="Stair width" suffix={m ? "m" : "ft"} value={s.sw} onChange={(v) => set("sw", v)} min={0} />
            <Field id="td" label="Tread depth" suffix={m ? "mm" : "in"} value={s.td} onChange={(v) => set("td", v)} min={0} hint={m ? "Two 140 mm boards ≈ 286 mm" : "Two 5½″ boards ≈ 11¼″"} />
          </div>
        </details>
        <Field id="price" label="Price per board (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
      </form>
      <ResultCard error={err} label={st && st.boards ? "Deck boards needed (deck + stairs)" : "Deck boards needed"} value={r ? <span data-testid="boards">{totalBoards} × {lenLabel(Number(s.len))}</span> : "–"}>
        {r && <>
          <p className="mt-1 text-sm muted">{r.rows} rows across a {dim(W)} width, {waste}% waste</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Deck area" v={m ? `${(r.area / FT / FT).toFixed(1)} m²` : `${r.area.toLocaleString("en-US")} sq ft`} />
            {st && st.boards > 0 && <>
              <Stat k="Boards for the deck surface" v={r.boards} />
              <Stat k={`Stair treads (${st.perTread} per step)`} v={<span data-testid="stairs">{st.pieces} pieces · {st.boards} board{st.boards === 1 ? "" : "s"}</span>} />
            </>}
            <Stat k="Board rows" v={<span data-testid="rows">{r.rows}</span>} />
            <Stat k={m ? "Linear metres of decking" : "Linear feet of decking"} v={<span data-testid="linear">{run(r.linear)}</span>} />
            <Stat k="With waste" v={run(r.withWaste)} />
            <Stat k={`Joists at ${s.js}${m ? " mm" : "″"} on center`} v={<span data-testid="joists">{r.joists} × {dim(W)}</span>} />
            <Stat k="Deck screws (2 per joist)" v={<span data-testid="screws">{r.screws.toLocaleString("en-US")}</span>} />
            <Stat k="Hidden clips (1 per joist)" v={r.crossings.toLocaleString("en-US")} />
            {price > 0 && <Stat k="Decking cost" v={<span data-testid="cost">{(totalBoards * price).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>} />}
          </dl>
          <h2 className="mt-5 text-sm font-semibold">Boards by length</h2>
          <table className="mt-2 w-full text-sm" data-testid="lengths">
            <thead><tr className="text-left subtle"><th className="py-1">Length</th><th>Boards</th><th>Butt joints per row</th></tr></thead>
            <tbody>{lenOpts.map((x) => { const xf = x * (m ? FT : 1); return <tr key={x} className={`border-t border-[var(--border)] ${Math.abs(xf - len) < 0.01 ? "font-semibold" : ""}`}><td className="py-1">{lenLabel(x)}</td><td>{Math.ceil(r.withWaste / xf - 1e-9)}</td><td>{Math.max(0, Math.ceil(L / xf - 1e-9) - 1)}</td></tr>; })}</tbody>
          </table>
          <p className="mt-2 text-xs subtle">Boards that span the full deck length avoid butt joints. Where boards meet end to end, the joint must land on a joist (often a doubled joist).</p>
        </>}
      </ResultCard>
    </div>
  );
}
