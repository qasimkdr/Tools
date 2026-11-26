"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { binding } from "@/lib/quiltBinding";

const CM = 2.54;
const SIZES = [{ n: "Baby", w: 36, l: 52 }, { n: "Throw", w: 50, l: 65 }, { n: "Twin", w: 70, l: 90 }, { n: "Queen", w: 90, l: 108 }, { n: "King", w: 108, l: 108 }];
const frac = (yd: number) => { const e = Math.round(yd * 8); const w = Math.floor(e / 8), r = e % 8; const f = ["", "⅛", "¼", "⅜", "½", "⅝", "¾", "⅞"][r]; return `${w ? w : ""}${w && f ? " " : ""}${f || (w ? "" : "0")} yd`; };

export default function BindingCalculator() {
  const [s, set] = useUrlState({ unit: "in", w: "60", l: "72", strip: "2.5", wof: "42", extra: "10", type: "straight" });
  const metric = s.unit === "cm";
  const k = metric ? 1 / CM : 1;
  const o = { width: Number(s.w) * k, length: Number(s.l) * k, strip: Number(s.strip) * k, wof: Number(s.wof) * k, extra: (Number(s.extra) || 0) * k };
  const err = !(o.width > 0) || !(o.length > 0) ? "Enter the quilt's width and length." : !(o.strip > 0) ? "Enter the strip width you cut." : !(o.wof > o.strip) ? "Enter the usable width of the fabric (selvage to selvage, minus selvages)." : null;
  const r = err ? null : binding(o);
  const bias = s.type === "bias";
  const len = (inch: number) => (metric ? `${(inch * CM).toFixed(0)} cm` : `${inch.toFixed(inch % 1 ? 1 : 0)}″`);
  const yd = (inch: number) => (metric ? `${((inch * CM) / 100).toFixed(2)} m` : frac(Math.ceil((inch / 36) * 8 - 1e-9) / 8));
  const switchUnit = (u: string) => {
    if (u === s.unit) return;
    const f = u === "cm" ? CM : 1 / CM;
    for (const key of ["w", "l", "strip", "wof", "extra"] as const) { const v = Number(s[key]); if (s[key] !== "" && Number.isFinite(v)) set(key, String(Math.round(v * f * 10) / 10)); }
    set("unit", u);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Quilt binding calculator">
        <Segmented label="Units" value={metric ? "cm" : "in"} onChange={switchUnit} options={[{ id: "in", label: "Inches" }, { id: "cm", label: "Centimeters" }]} />
        <div>
          <span className="label">Common quilt sizes (they vary by pattern)</span>
          <div className="flex flex-wrap gap-2">{SIZES.map((z) => (
            <button key={z.n} type="button" className="btn-ghost px-2.5 py-1 text-xs" onClick={() => { set("w", String(metric ? Math.round(z.w * CM) : z.w)); set("l", String(metric ? Math.round(z.l * CM) : z.l)); }}>{z.n} {z.w}×{z.l}″</button>
          ))}</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="w" label="Quilt width" suffix={s.unit} value={s.w} onChange={(v) => set("w", v)} min={0} />
          <Field id="l" label="Quilt length" suffix={s.unit} value={s.l} onChange={(v) => set("l", v)} min={0} />
          <Field id="strip" label="Strip width" suffix={s.unit} value={s.strip} onChange={(v) => set("strip", v)} min={0} hint={metric ? "6.4 cm is common" : "2½″ is common; 2¼″ for a narrow binding"} />
          <Field id="wof" label="Usable fabric width" suffix={s.unit} value={s.wof} onChange={(v) => set("wof", v)} min={0} hint={metric ? "About 107 cm for quilting cotton" : "About 40–42″ for quilting cotton"} />
          <Field id="extra" label="Extra for joins and ends" suffix={s.unit} value={s.extra} onChange={(v) => set("extra", v)} min={0} hint={metric ? "25–50 cm" : "10–20″"} />
        </div>
        <Segmented label="Binding type" value={bias ? "bias" : "straight"} onChange={(v) => set("type", v)} options={[{ id: "straight", label: "Straight grain (crosswise strips)" }, { id: "bias", label: "Continuous bias" }]} />
      </form>
      <ResultCard error={err} label={bias ? "Square to cut for continuous bias" : "Strips to cut"} value={r ? (bias ? <span data-testid="square">{len(r.biasSquare)} × {len(r.biasSquare)}</span> : <span data-testid="strips">{r.strips} strips</span>) : "–"}>
        {r && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Quilt perimeter" v={len(r.perimeter)} />
            <Stat k="Binding length needed" v={<span data-testid="total">{len(r.total)}</span>} />
            {bias ? <>
              <Stat k="Fabric to buy" v={<span data-testid="buy">{yd(r.biasSquare)}</span>} />
              <Stat k="Fabric area used" v={metric ? `${Math.round(r.biasArea * CM * CM).toLocaleString("en-US")} cm²` : `${Math.round(r.biasArea).toLocaleString("en-US")} sq in`} />
            </> : <>
              <Stat k="Fabric to buy" v={<span data-testid="buy">{yd(r.fabric)}</span>} />
              <Stat k="Fabric used" v={`${len(r.fabric)} (${r.strips} × ${len(o.strip)})`} />
              <Stat k="Seams to join strips" v={r.seams} />
              <Stat k="Binding left over" v={len(r.strips * o.wof - r.total)} />
            </>}
          </dl>
          {bias && r.biasSquare > o.wof && <p className="mt-2 text-sm">The square is wider than your fabric. Cut two smaller squares (each half the area) or use straight-grain strips.</p>}
          <p className="mt-3 text-xs subtle">Straight-grain strips are cut selvage to selvage and joined end to end with diagonal seams. Bias binding stretches around curves and rounded corners. Buy a little extra if you pre-wash fabric.</p>
        </>}
      </ResultCard>
    </div>
  );
}
