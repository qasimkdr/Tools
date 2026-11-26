"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { deck, stairTreads } from "@/lib/deck";

const BOARDS = [{ id: "5.5", label: "5½″ (nominal 6″ / 5/4 × 6)" }, { id: "3.5", label: "3½″ (nominal 4″)" }, { id: "7.25", label: "7¼″ (nominal 8″)" }];
const LENGTHS = [8, 10, 12, 16, 20];

export default function DeckingCalculator() {
  const [s, set] = useUrlState({ l: "16", w: "12", bw: "5.5", gap: "0.125", len: "16", waste: "10", js: "16", price: "", steps: "0", sw: "4", td: "11.25" });
  const L = Number(s.l), W = Number(s.w), bw = Number(s.bw), gap = Number(s.gap), len = Number(s.len), js = Number(s.js);
  const waste = Math.max(0, Number(s.waste) || 0);
  const err = !(L > 0) || !(W > 0) ? "Enter the deck length (the direction the boards run) and width." : !(bw > 0) ? "Enter the actual board width in inches." : !(gap >= 0) ? "Enter the gap between boards (0 or more)." : !(len > 0) ? "Choose a board length." : !(js > 0) ? "Enter the joist spacing." : null;
  const r = err ? null : deck({ length: L, width: W, boardW: bw, gap, boardLen: len, wastePct: waste, joistSpacing: js });
  const price = Number(s.price);
  const st = r ? stairTreads(Math.max(0, Math.round(Number(s.steps) || 0)), Number(s.td) || 0, Number(s.sw) || 0, bw, gap, len) : null;
  const totalBoards = r ? r.boards + (st?.boards ?? 0) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Decking calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="l" label="Deck length (board direction)" suffix="ft" value={s.l} onChange={(v) => set("l", v)} min={0} />
          <Field id="w" label="Deck width" suffix="ft" value={s.w} onChange={(v) => set("w", v)} min={0} hint="Across the boards" />
        </div>
        <div>
          <label htmlFor="bw" className="label">Board width (actual)</label>
          <select id="bw" className="field" value={BOARDS.some((b) => b.id === s.bw) ? s.bw : "5.5"} onChange={(e) => set("bw", e.target.value)}>{BOARDS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}</select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="gap" label="Gap between boards" suffix="in" value={s.gap} onChange={(v) => set("gap", v)} min={0} hint="⅛″ = 0.125; check your board's guide" />
          <div>
            <label htmlFor="len" className="label">Board length</label>
            <select id="len" className="field" value={String(len)} onChange={(e) => set("len", e.target.value)}>{LENGTHS.map((x) => <option key={x} value={x}>{x} ft</option>)}</select>
          </div>
          <Field id="waste" label="Waste allowance" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} hint="10% straight; 15%+ diagonal" />
          <Field id="js" label="Joist spacing" suffix="in o.c." value={s.js} onChange={(v) => set("js", v)} min={0} hint="16″ typical; 12″ for diagonal" />
        </div>
        <details className="rounded-xl border border-[var(--border)] p-3" open={Number(s.steps) > 0}>
          <summary className="cursor-pointer text-sm font-semibold">Deck stairs (treads)</summary>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Field id="steps" label="Number of steps" value={s.steps} onChange={(v) => set("steps", v)} min={0} inputMode="numeric" />
            <Field id="sw" label="Stair width" suffix="ft" value={s.sw} onChange={(v) => set("sw", v)} min={0} />
            <Field id="td" label="Tread depth" suffix="in" value={s.td} onChange={(v) => set("td", v)} min={0} hint="Two 5½″ boards ≈ 11¼″" />
          </div>
        </details>
        <Field id="price" label="Price per board (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
      </form>
      <ResultCard error={err} label={st && st.boards ? "Deck boards needed (deck + stairs)" : "Deck boards needed"} value={r ? <span data-testid="boards">{totalBoards} × {len} ft</span> : "–"}>
        {r && <>
          <p className="mt-1 text-sm muted">{r.rows} rows across a {W} ft width, {waste}% waste</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Deck area" v={`${r.area.toLocaleString("en-US")} sq ft`} />
            {st && st.boards > 0 && <>
              <Stat k="Boards for the deck surface" v={r.boards} />
              <Stat k={`Stair treads (${st.perTread} per step)`} v={<span data-testid="stairs">{st.pieces} pieces · {st.boards} board{st.boards === 1 ? "" : "s"}</span>} />
            </>}
            <Stat k="Board rows" v={<span data-testid="rows">{r.rows}</span>} />
            <Stat k="Linear feet of decking" v={<span data-testid="linear">{Math.round(r.linear).toLocaleString("en-US")} ft</span>} />
            <Stat k="With waste" v={`${Math.round(r.withWaste).toLocaleString("en-US")} ft`} />
            <Stat k={`Joists at ${js}″ on center`} v={<span data-testid="joists">{r.joists} × {W} ft</span>} />
            <Stat k="Deck screws (2 per joist)" v={<span data-testid="screws">{r.screws.toLocaleString("en-US")}</span>} />
            <Stat k="Hidden clips (1 per joist)" v={r.crossings.toLocaleString("en-US")} />
            {price > 0 && <Stat k="Decking cost" v={<span data-testid="cost">{(totalBoards * price).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>} />}
          </dl>
          <h2 className="mt-5 text-sm font-semibold">Boards by length</h2>
          <table className="mt-2 w-full text-sm" data-testid="lengths">
            <thead><tr className="text-left subtle"><th className="py-1">Length</th><th>Boards</th><th>Butt joints per row</th></tr></thead>
            <tbody>{LENGTHS.map((x) => <tr key={x} className={`border-t border-[var(--border)] ${x === len ? "font-semibold" : ""}`}><td className="py-1">{x} ft</td><td>{Math.ceil(r.withWaste / x - 1e-9)}</td><td>{Math.max(0, Math.ceil(L / x - 1e-9) - 1)}</td></tr>)}</tbody>
          </table>
          <p className="mt-2 text-xs subtle">Boards that span the full deck length avoid butt joints. Where boards meet end to end, the joint must land on a joist (often a doubled joist).</p>
        </>}
      </ResultCard>
    </div>
  );
}
