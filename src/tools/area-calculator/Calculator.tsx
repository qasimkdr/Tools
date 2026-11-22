"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { SHAPES } from "@/lib/areaShapes";

const fmt = (n: number) => Number(n.toPrecision(8)).toLocaleString("en-US", { maximumFractionDigits: 6 });
const UNITS = ["", "mm", "cm", "m", "in", "ft", "yd"];

export default function AreaCalculator() {
  const [s, set] = useUrlState({ dim: "2", shape: "rectangle", u: "ft", a: "6", b: "8", c: "10", h: "6", l: "12", w: "10", r: "5", deg: "90" });
  const dim = s.dim === "3" ? 3 : 2;
  const list = SHAPES.filter((x) => x.dim === dim);
  const shape = list.find((x) => x.id === s.shape) ?? list[0];
  const vals = Object.fromEntries(shape.inputs.map(({ k }) => [k, Number((s as Record<string, string>)[k])]));
  const r = shape.calc(vals);
  const u = UNITS.includes(s.u) ? s.u : "";
  const sq = u ? ` ${u}²` : " sq units", cu = u ? ` ${u}³` : " cubic units", lin = u ? ` ${u}` : "";
  const unitFor = (k: string) => (k === "Volume" ? cu : /area|surface/i.test(k) ? sq : lin);
  const switchDim = (v: string) => { set("dim", v); set("shape", SHAPES.find((x) => x.dim === Number(v))!.id); };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Area calculator">
        <Segmented label="Find" value={dim === 3 ? "3" : "2"} onChange={switchDim} options={[{ id: "2", label: "Area (2D shape)" }, { id: "3", label: "Surface area (3D solid)" }]} />
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div><label htmlFor="shape" className="label">Shape</label>
            <select id="shape" className="field" value={shape.id} onChange={(e) => set("shape", e.target.value)}>{list.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
          <div><label htmlFor="u" className="label">Units</label>
            <select id="u" className="field" value={u} onChange={(e) => set("u", e.target.value)}>{UNITS.map((x) => <option key={x} value={x}>{x || "none"}</option>)}</select></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {shape.inputs.map(({ k, label }) => (
            <Field key={k} id={k} label={label} suffix={k === "deg" ? "°" : u} value={(s as Record<string, string>)[k]} onChange={(v) => set(k as keyof typeof s, v)} min={0} />
          ))}
        </div>
        <div className="formula" data-testid="formula">{shape.formula}</div>
      </form>
      <ResultCard label={dim === 3 ? `Surface area of the ${shape.name.toLowerCase()}` : `Area of the ${shape.name.toLowerCase().replace(/ \(.*\)/, "")}`}
        error={r ? null : shape.id === "heron" ? "Enter three sides that can form a triangle (each shorter than the other two combined)." : "Enter positive measurements."}
        value={r ? `${fmt(r.area)}${sq}` : "–"}>
        {r?.extra && <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {r.extra.map(([k, v]) => <Stat key={k} k={k} v={<span data-testid={`x-${k.split(" ")[0].toLowerCase()}`}>{fmt(v)}{unitFor(k)}</span>} />)}
        </dl>}
        {r && u === "ft" && <p className="mt-4 text-sm muted">= {fmt(r.area / 9)} sq yd · {fmt(r.area * 0.09290304)} m²</p>}
        {r && u === "m" && <p className="mt-4 text-sm muted">= {fmt(r.area * 10.7639104)} sq ft · {fmt(r.area / 10000)} hectares</p>}
        {r && u === "in" && <p className="mt-4 text-sm muted">= {fmt(r.area / 144)} sq ft · {fmt(r.area * 6.4516)} cm²</p>}
        {r && u === "cm" && <p className="mt-4 text-sm muted">= {fmt(r.area / 10000)} m² · {fmt(r.area / 6.4516)} sq in</p>}
      </ResultCard>
    </div>
  );
}
