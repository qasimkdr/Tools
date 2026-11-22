"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const COUNTS = ["11", "14", "16", "18", "20", "25", "28", "32", "36"];
const f2 = (v: number) => (+v.toFixed(2)).toString();

export default function CrossStitchCalculator() {
  const [s, set] = useUrlState({ w: "140", h: "100", count: "14", over: "1", margin: "3", u: "in" });
  const w = Math.floor(Number(s.w)), h = Math.floor(Number(s.h)), count = Number(s.count), over = s.over === "2" ? 2 : 1;
  const spi = count / over, cm = s.u === "cm";
  const margin = Math.max(0, Number(s.margin) || 0), mIn = cm ? margin / 2.54 : margin;
  const dW = w / spi, dH = h / spi, fW = dW + 2 * mIn, fH = dH + 2 * mIn;
  const show = (inches: number) => (cm ? `${f2(inches * 2.54)} cm` : `${f2(inches)} in`);
  const error = !(w > 0 && h > 0) ? "Enter the design width and height in stitches (from the chart)." : !(count > 0) ? "Enter the fabric count (stitches or threads per inch)." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Cross stitch calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="w" label="Design width (stitches)" value={s.w} onChange={(v) => set("w", v)} min={1} inputMode="numeric" />
          <Field id="h" label="Design height (stitches)" value={s.h} onChange={(v) => set("h", v)} min={1} inputMode="numeric" />
        </div>
        <div>
          <label htmlFor="count" className="label">Fabric count (per inch)</label>
          <select id="count" className="field" value={COUNTS.includes(s.count) ? s.count : "14"} onChange={(e) => { set("count", e.target.value); set("over", Number(e.target.value) >= 25 ? "2" : "1"); }}>
            {COUNTS.map((c) => <option key={c} value={c}>{c}-count {Number(c) >= 25 ? "evenweave / linen" : "Aida"}</option>)}
          </select>
        </div>
        <Segmented label="Stitch over" value={over === 2 ? "2" : "1"} onChange={(v) => set("over", v)} options={[{ id: "1", label: "One thread / block" }, { id: "2", label: "Two threads" }]} />
        <div className="grid grid-cols-[1fr_auto] items-end gap-3">
          <Field id="margin" label="Margin on each side" value={s.margin} onChange={(v) => set("margin", v)} min={0} hint="For framing or hooping; 2–3 in is common" />
          <Segmented label="Units" value={cm ? "cm" : "in"} onChange={(v) => set("u", v)} options={[{ id: "in", label: "in" }, { id: "cm", label: "cm" }]} />
        </div>
      </form>
      <ResultCard error={error} label="Fabric to cut" value={`${show(fW)} × ${show(fH)}`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Finished design size" v={`${show(dW)} × ${show(dH)}`} />
          <Stat k="Stitches per inch" v={f2(spi)} />
          <Stat k="Total stitches (if fully stitched)" v={(w * h).toLocaleString()} />
          <Stat k="Stitch count" v={`${w} × ${h}`} />
        </dl>
        <table className="mt-4 w-full text-sm" data-testid="compare">
          <thead><tr className="text-left subtle"><th className="py-1 font-medium">Fabric</th><th className="py-1 text-right font-medium">Design size</th><th className="py-1 text-right font-medium">Fabric to cut</th></tr></thead>
          <tbody>{[[11, 1], [14, 1], [16, 1], [18, 1], [28, 2], [32, 2]].map(([c, o]) => { const p = c / o; return (
            <tr key={`${c}-${o}`} className={`border-t border-[var(--border)] ${c === count && o === over ? "font-semibold text-[var(--color-brand-600)]" : ""}`}><td className="py-1">{c}-ct{o === 2 ? " over 2" : ""}</td><td className="py-1 text-right">{show(w / p)} × {show(h / p)}</td><td className="py-1 text-right">{show(w / p + 2 * mIn)} × {show(h / p + 2 * mIn)}</td></tr>
          ); })}</tbody>
        </table>
      </ResultCard>
    </div>
  );
}
