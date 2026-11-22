"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const TYPES = { full: { f: 1, label: "Full" }, three: { f: 0.75, label: "¾" }, half: { f: 0.5, label: "Half" }, quarter: { f: 0.25, label: "Quarter" } } as const;
type T = keyof typeof TYPES;

/** Fabric length for a layout (inches), or null if the fabric is too narrow. */
function fabricLength(type: T, R: number, width: number) {
  if (type === "quarter") return width >= R ? { len: R, note: "One quarter-circle piece" } : null;
  if (type === "half") return width >= 2 * R ? { len: R, note: "One half-circle piece, diameter across the width" } : width >= R ? { len: 2 * R, note: "One half-circle piece, diameter along the length" } : null;
  // full and ¾: cut as one piece if it fits, otherwise as two half (or ½ + ¼) pieces along the length
  return width >= 2 * R ? { len: 2 * R, note: "One piece (a full circle fits across the width)" } : width >= R ? { len: type === "full" ? 4 * R : 3 * R, note: "Pieced: too wide for one piece, cut as separate sections with side seams" } : null;
}

export default function CircleSkirtCalculator() {
  const [s, set] = useUrlState({ type: "full", u: "in", waist: "28", len: "22", sa: "0.625", hem: "1", fw: "60" });
  const type = (s.type in TYPES ? s.type : "full") as T, cm = s.u === "cm";
  const W = Number(s.waist), L = Number(s.len), SA = Math.max(0, Number(s.sa) || 0), H = Math.max(0, Number(s.hem) || 0), FW = Number(s.fw);
  const r = W / (2 * Math.PI * TYPES[type].f), R = r + L + H;
  const unit = cm ? "cm" : "in";
  const toIn = cm ? 1 / 2.54 : 1;
  const lay = fabricLength(type, R * toIn, FW * toIn);
  const yards = lay ? lay.len / 36 : NaN, meters = lay ? (lay.len * 2.54) / 100 : NaN;
  const f2 = (v: number) => (+v.toFixed(2)).toString();
  const error = !(W > 0) ? "Enter your waist measurement." : !(L > 0) ? "Enter the finished skirt length." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Circle skirt calculator">
        <Segmented label="Skirt type" value={type} onChange={(v) => set("type", v)} options={(Object.keys(TYPES) as T[]).map((k) => ({ id: k, label: `${TYPES[k].label} circle` }))} />
        <Segmented label="Units" value={cm ? "cm" : "in"} onChange={(v) => set("u", v)} options={[{ id: "in", label: "Inches" }, { id: "cm", label: "Centimeters" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="waist" label="Waist measurement" suffix={unit} value={s.waist} onChange={(v) => set("waist", v)} min={0} hint="Where the skirt will sit" />
          <Field id="len" label="Finished skirt length" suffix={unit} value={s.len} onChange={(v) => set("len", v)} min={0} hint="Waist to hem" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field id="sa" label="Waist seam allowance" suffix={unit} value={s.sa} onChange={(v) => set("sa", v)} min={0} />
          <Field id="hem" label="Hem allowance" suffix={unit} value={s.hem} onChange={(v) => set("hem", v)} min={0} />
          <Field id="fw" label="Fabric width" suffix={unit} value={s.fw} onChange={(v) => set("fw", v)} min={0} hint={cm ? "Often 112 or 150" : "Often 45 or 60"} />
        </div>
      </form>
      <ResultCard error={error} label="Waist radius (finished)" value={`${f2(r)} ${unit}`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Cut the waist circle at" v={`${f2(r - SA)} ${unit} radius`} />
          <Stat k="Cut the hem circle at" v={`${f2(R)} ${unit} radius`} />
          <Stat k="Hem circumference (finished)" v={`${f2(2 * Math.PI * TYPES[type].f * (r + L))} ${unit}`} />
          <Stat k="Fabric needed" v={lay ? `${f2(cm ? meters : yards)} ${cm ? "m" : "yd"} (${f2(lay.len / toIn)} ${unit})` : "Fabric too narrow"} />
        </dl>
        <p className="mt-4 text-sm muted" data-testid="layout">{lay ? lay.note : `The cutting radius (${f2(R)} ${unit}) is wider than the fabric; use wider fabric or cut more, smaller sections.`}</p>
        <p className="mt-2 text-xs subtle">Measure the radii from the same center point. Add extra for a waistband, pockets, matching prints or fabric with a nap, and let the skirt hang 24 hours before hemming, since bias sections stretch.</p>
      </ResultCard>
    </div>
  );
}
