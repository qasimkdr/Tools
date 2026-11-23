"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const IN3_PER_FLOZ = 1.8046875, IN3_PER_GAL = 231, ML_PER_IN3 = 16.387064;
const LEN: Record<string, number> = { in: 1, ft: 12, cm: 1 / 2.54, mm: 1 / 25.4 };
const f = (x: number, d = 1) => (Number.isFinite(x) ? x.toLocaleString("en-US", { maximumFractionDigits: d }) : "–");

export default function EpoxyResinCalculator() {
  const [s, set] = useUrlState({ shape: "rect", u: "in", l: "48", w: "24", dia: "24", depth: "0.125", du: "in", fill: "100", ratio: "1:1", waste: "10", kit: "" });
  const lu = LEN[s.u] ?? 1, du = LEN[s.du] ?? 1;
  const areaIn2 = s.shape === "circle" ? Math.PI * ((Number(s.dia) * lu) / 2) ** 2 : Number(s.l) * lu * Number(s.w) * lu;
  const fill = Math.min(100, Math.max(0, Number(s.fill) || 100)) / 100; // share of area that gets epoxy (river tables)
  const depthIn = Number(s.depth) * du;
  const waste = Number(s.waste) || 0;
  const vol = areaIn2 * fill * depthIn * (1 + waste / 100); // in³
  const [ra, rb] = (/^\d+(\.\d+)?:\d+(\.\d+)?$/.test(s.ratio) ? s.ratio : "1:1").split(":").map(Number);
  const flOz = vol / IN3_PER_FLOZ, ml = vol * ML_PER_IN3;
  const kit = Number(s.kit);
  const err = !(areaIn2 > 0) ? "Enter the size of the surface or mold." : !(depthIn > 0) ? "Enter the pour depth." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Epoxy resin calculator">
        <div className="flex flex-wrap gap-4">
          <Segmented label="Shape" value={s.shape === "circle" ? "circle" : "rect"} onChange={(v) => set("shape", v)} options={[{ id: "rect", label: "Rectangle" }, { id: "circle", label: "Round" }]} />
          <div><label htmlFor="u" className="label">Size units</label><select id="u" className="field" value={s.u in LEN ? s.u : "in"} onChange={(e) => set("u", e.target.value)}>{Object.keys(LEN).map((k) => <option key={k}>{k}</option>)}</select></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {s.shape === "circle" ? <Field id="dia" label="Diameter" suffix={s.u} value={s.dia} onChange={(v) => set("dia", v)} min={0} /> : <>
            <Field id="l" label="Length" suffix={s.u} value={s.l} onChange={(v) => set("l", v)} min={0} />
            <Field id="w" label="Width" suffix={s.u} value={s.w} onChange={(v) => set("w", v)} min={0} />
          </>}
          <div className="grid grid-cols-[1fr_auto] items-end gap-2">
            <Field id="depth" label="Pour depth" value={s.depth} onChange={(v) => set("depth", v)} min={0} hint="⅛ in = 0.125 (flood coat)" />
            <select aria-label="Depth unit" className="field !w-auto" value={s.du in LEN ? s.du : "in"} onChange={(e) => set("du", e.target.value)}><option>in</option><option>mm</option><option>cm</option></select>
          </div>
          <Field id="fill" label="Area filled with epoxy" suffix="%" value={s.fill} onChange={(v) => set("fill", v)} min={0} hint="e.g. 30% for a river channel" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div><label htmlFor="ratio" className="label">Mix ratio (A:B)</label><select id="ratio" className="field" value={s.ratio} onChange={(e) => set("ratio", e.target.value)}>{["1:1", "2:1", "3:1", "4:1"].map((r) => <option key={r}>{r}</option>)}</select></div>
          <Field id="waste" label="Extra" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
          <Field id="kit" label="Kit size" suffix="fl oz" value={s.kit} onChange={(v) => set("kit", v)} min={0} />
        </div>
      </form>
      <ResultCard label="Mixed epoxy needed" error={err} value={err ? "–" : `${f(flOz)} fl oz`}>
        {!err && <>
          <p className="mt-1 text-sm muted">{f(vol / IN3_PER_GAL, 2)} gallons · {f(ml / 1000, 2)} liters · {f(vol, 1)} in³ (incl. {waste}% extra)</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k={`Part A (resin, ${ra} part${ra === 1 ? "" : "s"})`} v={<span data-testid="part-a">{f((flOz * ra) / (ra + rb))} fl oz</span>} />
            <Stat k={`Part B (hardener, ${rb} part${rb === 1 ? "" : "s"})`} v={<span data-testid="part-b">{f((flOz * rb) / (ra + rb))} fl oz</span>} />
            <Stat k="Surface area" v={`${f(areaIn2 / 144, 2)} sq ft`} />
            <Stat k="Per square foot" v={`${f(flOz / ((areaIn2 * fill) / 144), 2)} fl oz`} />
            {kit > 0 && <Stat k={`${kit} fl oz kits`} v={<span data-testid="kits">{Math.ceil(flOz / kit - 1e-9)}</span>} />}
          </dl>
          <p className="mt-4 text-xs subtle">Ratios here are by volume; some epoxies are mixed by weight, so follow the label. Check the product&apos;s maximum pour depth: thick pours may need several layers or a deep-pour resin.</p>
        </>}
      </ResultCard>
    </div>
  );
}
