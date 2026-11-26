"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { fence, postConcrete, shadowboxBoards } from "@/lib/fence";

const usd = (x: number) => x.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function FenceCalculator() {
  const [s, set] = useUrlState({ u: "ft", style: "privacy", len: "100", sp: "8", h: "6", gates: "1", gw: "4", rails: "3", bw: "5.5", gap: "2.5", waste: "5", bury: "2", hole: "10", pw: "3.5", sbgap: "3.5", pp: "", rp: "", bp: "" });
  const style = s.style === "picket" ? "picket" : s.style === "shadowbox" ? "shadowbox" : "privacy";
  const privacy = style !== "picket";
  const m = s.u === "m";
  const FT = 3.28084, CM_IN = 1 / 2.54;
  // Lengths are entered in ft or m, board widths in inches or cm; everything is computed in feet and inches.
  const n = (k: keyof typeof s) => { const v = Number(s[k]); if (!m) return v; if (k === "len" || k === "sp" || k === "h" || k === "gw" || k === "bury") return v * FT; if (k === "bw" || k === "gap" || k === "hole" || k === "pw" || k === "sbgap") return v * CM_IN; return v; };
  const L = m ? "m" : "ft", W = m ? "cm" : "in";
  const len = (ft: number) => (m ? `${(ft / FT).toFixed(2).replace(/\.?0+$/, "")} m` : `${Math.round(ft * 100) / 100} ft`);
  const err = !(n("len") > 0) ? "Enter the total fence length." : !(n("sp") > 0) ? "Enter the post spacing." : !(n("h") > 0) ? "Enter the fence height." : !(n("bw") > 0) ? "Enter the board width." : n("gates") * n("gw") >= n("len") ? "The gates are wider than the fence." : null;
  const r = err ? null : fence({ length: n("len"), spacing: n("sp"), height: n("h"), gates: Math.max(0, Math.round(n("gates") || 0)), gateW: n("gw") || 0, rails: Math.max(1, Math.round(n("rails") || 2)), boardW: n("bw"), gap: style === "picket" ? Math.max(0, n("gap") || 0) : 0, wastePct: Math.max(0, n("waste") || 0), bury: Math.max(0, n("bury") || 0) });
  const boards = r ? (style === "shadowbox" ? shadowboxBoards(r.run, n("bw"), Math.max(0, n("sbgap") || 0), Math.max(0, n("waste") || 0)) : r.pickets) : 0;
  const perPost = postConcrete(n("hole") || 0, Math.max(0, n("bury") || 0), n("pw") || 0);
  const totalFt3 = r ? perPost * r.posts : 0;
  const switchUnit = (u: string) => {
    if (u === s.u) return;
    const toM = u === "m";
    for (const k of ["len", "sp", "h", "gw", "bury"] as const) { const v = Number(s[k]); if (s[k] !== "" && Number.isFinite(v)) set(k, String(Math.round((toM ? v / FT : v * FT) * 100) / 100)); }
    for (const k of ["bw", "gap", "hole", "pw", "sbgap"] as const) { const v = Number(s[k]); if (s[k] !== "" && Number.isFinite(v)) set(k, String(Math.round((toM ? v * 2.54 : v / 2.54) * 10) / 10)); }
    set("u", u);
  };
  const cost = r ? (n("pp") || 0) * r.posts + (n("rp") || 0) * r.rails + (n("bp") || 0) * boards : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Fence calculator">
        <Segmented label="Units" value={m ? "m" : "ft"} onChange={switchUnit} options={[{ id: "ft", label: "Imperial (ft, in)" }, { id: "m", label: "Metric (m, cm)" }]} />
        <Segmented label="Fence style" value={style} onChange={(v) => set("style", v)} options={[{ id: "privacy", label: "Privacy / stockade" }, { id: "shadowbox", label: "Shadowbox" }, { id: "picket", label: "Picket" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="len" label="Total fence length" suffix={L} value={s.len} onChange={(v) => set("len", v)} min={0} hint="Including gates" />
          <Field id="h" label="Fence height" suffix={L} value={s.h} onChange={(v) => set("h", v)} min={0} />
          <Field id="sp" label="Post spacing" suffix={L} value={s.sp} onChange={(v) => set("sp", v)} min={0} hint={m ? "2.4 m max for 2.4 m rails" : "8 ft max for 8 ft rails"} />
          <Field id="rails" label="Rails per section" value={s.rails} onChange={(v) => set("rails", v)} min={1} inputMode="numeric" hint="2 up to ~4 ft; 3 for 6 ft" />
          <Field id="gates" label="Gates" value={s.gates} onChange={(v) => set("gates", v)} min={0} inputMode="numeric" />
          <Field id="gw" label="Gate width" suffix={L} value={s.gw} onChange={(v) => set("gw", v)} min={0} />
          <Field id="bw" label={privacy ? "Board width (actual)" : "Picket width (actual)"} suffix={W} value={s.bw} onChange={(v) => set("bw", v)} min={0} hint={m ? "e.g. 14 cm" : "Nominal 6″ = 5½″"} />
          {style === "picket" && <Field id="gap" label="Gap between pickets" suffix={W} value={s.gap} onChange={(v) => set("gap", v)} min={0} />}
          {style === "shadowbox" && <Field id="sbgap" label="Gap between boards (same side)" suffix={W} value={s.sbgap} onChange={(v) => set("sbgap", v)} min={0} hint="Less than a board width so they overlap" />}
          <Field id="waste" label="Extra boards" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
          <Field id="bury" label="Post depth in ground" suffix={L} value={s.bury} onChange={(v) => set("bury", v)} min={0} hint="Often ⅓–½ of the fence height" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="hole" label="Post hole diameter" suffix={W} value={s.hole} onChange={(v) => set("hole", v)} min={0} hint={m ? "About 3× the post width" : "About 3× the post width"} />
          <Field id="pw" label="Post width (actual)" suffix={W} value={s.pw} onChange={(v) => set("pw", v)} min={0} hint={m ? "4×4 post ≈ 8.9 cm" : "4×4 post = 3½″"} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field id="pp" label="Price per post" prefix="$" value={s.pp} onChange={(v) => set("pp", v)} min={0} />
          <Field id="rp" label="Price per rail" prefix="$" value={s.rp} onChange={(v) => set("rp", v)} min={0} />
          <Field id="bp" label={privacy ? "Price per board" : "Price per picket"} prefix="$" value={s.bp} onChange={(v) => set("bp", v)} min={0} />
        </div>
      </form>
      <ResultCard error={err} label="Fence posts" value={r ? <span data-testid="posts">{r.posts} posts</span> : "–"}>
        {r && <>
          <p className="mt-1 text-sm muted">{r.sections} sections of up to {len(n("sp"))}{n("gates") > 0 ? `, ${n("gates")} gate${n("gates") > 1 ? "s" : ""}` : ""}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Post length" v={<span data-testid="post-len">{len(r.postLen)}</span>} />
            <Stat k={`Rails (${len(n("sp"))})`} v={<span data-testid="rails">{r.rails}</span>} />
            <Stat k={style === "picket" ? "Pickets" : style === "shadowbox" ? "Boards (both sides)" : "Privacy boards"} v={<span data-testid="pickets">{boards}</span>} />
            <Stat k="Concrete per post" v={<span data-testid="concrete">{(m ? perPost * 28.3168 : perPost).toFixed(2)} {m ? "L" : "cu ft"}</span>} />
            <Stat k="80 lb bags (0.6 cu ft each)" v={<span data-testid="bags">{Math.ceil(totalFt3 / 0.6 - 1e-9)}</span>} />
            <Stat k="Fenced length (no gates)" v={len(r.run)} />
            <Stat k="Fence face area" v={m ? `${(r.area / FT / FT).toFixed(1)} m²` : `${r.area.toLocaleString("en-US")} sq ft`} />
            {cost > 0 && <Stat k="Material cost (posts, rails, boards)" v={<span data-testid="cost">{usd(cost)}</span>} />}
          </dl>
          <h2 className="mt-5 text-sm font-semibold">Posts at other spacings</h2>
          <table className="mt-2 w-full text-sm" data-testid="spacings">
            <thead><tr className="text-left subtle"><th className="py-1">Spacing</th><th>Sections</th><th>Posts</th><th>Rails</th></tr></thead>
            <tbody>{(m ? [1.8, 2.1, 2.4].map((x) => x * FT) : [6, 7, 8]).map((sp) => { const x = fence({ length: n("len"), spacing: sp, height: n("h"), gates: Math.max(0, Math.round(n("gates") || 0)), gateW: n("gw") || 0, rails: Math.max(1, Math.round(n("rails") || 2)), boardW: n("bw"), gap: 0, wastePct: 0, bury: 0 }); return <tr key={sp} className={`border-t border-[var(--border)] ${Math.abs(sp - n("sp")) < 0.01 ? "font-semibold" : ""}`}><td className="py-1">{len(sp)}</td><td>{x.sections}</td><td>{x.posts}</td><td>{x.rails}</td></tr>; })}</tbody>
          </table>
          <p className="mt-2 text-xs subtle">Add a post at each corner or end of a separate run. Concrete assumes round holes filled to the depth above, minus the post; gravel at the bottom of the hole reduces it. Gate hardware and fasteners are extra.</p>
        </>}
      </ResultCard>
    </div>
  );
}
