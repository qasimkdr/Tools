"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { layout, suggestPanels } from "@/lib/wainscot";

const CM = 2.54;
const LEN_KEYS = ["wall", "height", "gap", "top", "bottom", "stick"] as const;

/** Inches to the nearest 1/16 as a mixed fraction, e.g. 31.625 → 31 5/8″. */
function inch(x: number) {
  if (!Number.isFinite(x)) return "–";
  const s = Math.round(x * 16);
  const whole = Math.floor(s / 16);
  let n = s % 16, d = 16;
  while (n && n % 2 === 0) { n /= 2; d /= 2; }
  return `${whole}${n ? ` ${n}/${d}` : ""}″`;
}

export default function WainscotingCalculator() {
  const [s, set] = useUrlState({ unit: "in", wall: "144", height: "32", panels: "4", gap: "3.5", top: "3.5", bottom: "5.5", waste: "10", stick: "96", price: "" });
  const metric = s.unit === "cm";
  const f = metric ? 1 / CM : 1; // input unit → inches
  const n = (k: string) => Number(k);
  const wall = n(s.wall) * f, height = n(s.height) * f, gap = n(s.gap) * f, top = n(s.top) * f, bottom = n(s.bottom) * f, stick = n(s.stick) * f;
  const panels = Math.round(n(s.panels));
  const err = !(wall > 0) ? "Enter the wall width." : !(height > 0) ? "Enter the wainscoting height." : !(panels >= 1 && panels <= 100) ? "Enter the number of panels (1–100)." : !(gap >= 0) ? "Enter the stile width (0 or more)." : !(stick > 0) ? "Enter the length of one moulding stick." : null;
  const r = err ? null : layout({ wall, height, panels, gap, top: top || 0, bottom: bottom || 0, wastePct: Math.max(0, n(s.waste) || 0), stick });
  const bad = r && (r.panelW <= 0 ? "The stiles take up the whole wall. Use fewer panels or narrower stiles." : r.panelH <= 0 ? "The top and bottom rails are taller than the wainscoting." : null);
  const len = (x: number) => (metric ? `${(x * CM).toFixed(1)} cm` : inch(x));
  const run = (x: number) => (metric ? `${((x * CM) / 100).toFixed(2)} m` : `${(x / 12).toFixed(1)} ft`);
  const price = n(s.price);
  const cost = r && price > 0 ? r.sticks * price : 0;
  const switchUnit = (u: string) => {
    if (u === s.unit) return;
    const k = u === "cm" ? CM : 1 / CM;
    for (const key of LEN_KEYS) { const v = Number(s[key]); if (s[key] !== "" && Number.isFinite(v)) set(key, String(Math.round(v * k * 100) / 100)); }
    set("unit", u);
  };
  const suggest = r ? suggestPanels(wall, gap, metric ? 76.2 / CM : 30) : 0;
  const u = metric ? "cm" : "in";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Wainscoting calculator">
        <Segmented label="Units" value={metric ? "cm" : "in"} onChange={switchUnit} options={[{ id: "in", label: "Inches" }, { id: "cm", label: "Centimeters" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="wall" label="Wall width" suffix={u} value={s.wall} onChange={(v) => set("wall", v)} min={0} />
          <Field id="height" label="Wainscoting height" suffix={u} value={s.height} onChange={(v) => set("height", v)} min={0} hint="Floor to chair rail" />
          <Field id="panels" label="Number of panels" value={s.panels} onChange={(v) => set("panels", v)} min={1} step="1" inputMode="numeric" />
          <Field id="gap" label="Stile width (space between panels)" suffix={u} value={s.gap} onChange={(v) => set("gap", v)} min={0} />
          <Field id="top" label="Top rail (below chair rail)" suffix={u} value={s.top} onChange={(v) => set("top", v)} min={0} />
          <Field id="bottom" label="Bottom rail (above floor)" suffix={u} value={s.bottom} onChange={(v) => set("bottom", v)} min={0} hint="Include the baseboard" />
          <Field id="waste" label="Waste allowance" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
          <Field id="stick" label="Moulding stick length" suffix={u} value={s.stick} onChange={(v) => set("stick", v)} min={0} hint={metric ? "244 cm = 8 ft" : "96 in = 8 ft"} />
        </div>
        <Field id="price" label="Price per stick (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
      </form>
      <ResultCard error={err || bad} label="Panel (box) size" value={r && !bad ? <span data-testid="panel">{len(r.panelW)} × {len(r.panelH)}</span> : "–"}>
        {r && !bad && <>
          <svg viewBox={`0 0 ${wall} ${height}`} className="mt-3 w-full rounded-md border border-[var(--border)] bg-[var(--surface-2)]" style={{ maxHeight: 160 }} role="img" aria-label={`Elevation of the wall with ${panels} panels`}>
            <rect x={0} y={0} width={wall} height={top} fill="var(--color-brand-500)" opacity={0.25} />
            <rect x={0} y={height - bottom} width={wall} height={bottom} fill="var(--color-brand-500)" opacity={0.25} />
            {Array.from({ length: panels }, (_, i) => <rect key={i} x={gap + i * (r.panelW + gap)} y={top} width={r.panelW} height={r.panelH} fill="none" stroke="var(--color-brand-500)" strokeWidth={Math.max(wall, height) / 150} />)}
          </svg>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Moulding for the boxes" v={<span data-testid="moulding">{run(r.moulding)}</span>} />
            <Stat k={`With ${Math.max(0, n(s.waste) || 0)}% waste`} v={<span data-testid="waste">{run(r.withWaste)}</span>} />
            <Stat k={`Sticks to buy (${metric ? `${(stick * CM).toFixed(0)} cm` : `${(stick / 12).toFixed(stick % 12 ? 1 : 0)} ft`})`} v={<span data-testid="sticks">{r.sticks}</span>} />
            {cost > 0 && <Stat k="Moulding cost" v={<span data-testid="cost">{cost.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>} />}
            <Stat k="Moulding per box" v={run(r.perBox)} />
            <Stat k="Chair rail and baseboard" v={`${run(r.chairRail)} each`} />
            <Stat k="Stiles (board and batten)" v={`${r.battens} × ${len(r.battenLength)}`} />
            <Stat k="Wainscot area" v={metric ? `${((wall * CM / 100) * (height * CM / 100)).toFixed(2)} m²` : `${r.area.toFixed(1)} sq ft`} />
          </dl>
          {suggest !== panels && <p className="mt-2 text-xs subtle">Tip: {suggest} panels would give boxes close to {metric ? "76 cm" : "30 inches"} wide on this wall.</p>}
          <h2 className="mt-5 text-sm font-semibold">Marking list (from the left corner)</h2>
          <div className="mt-2 max-h-56 overflow-auto">
            <table className="w-full text-sm" data-testid="marks">
              <thead><tr className="text-left subtle"><th className="py-1">Panel</th><th>Left edge</th><th>Center</th><th>Right edge</th></tr></thead>
              <tbody>{r.centers.map((c, i) => (
                <tr key={i} className="border-t border-[var(--border)]"><td className="py-1">{i + 1}</td><td>{len(c - r.panelW / 2)}</td><td>{len(c)}</td><td>{len(c + r.panelW / 2)}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </>}
      </ResultCard>
    </div>
  );
}
