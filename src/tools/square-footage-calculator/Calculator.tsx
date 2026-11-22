"use client";
import { useState } from "react";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { usd } from "@/lib/money";
import { LENGTH_UNITS, toFt } from "@/lib/units";

type Shape = "rect" | "tri" | "circle" | "trap";
type Area = { shape: Shape; a: string; b: string; c: string; unit: string; label: string };
const SHAPES: Record<Shape, { name: string; fields: string[] }> = {
  rect: { name: "Rectangle / square", fields: ["Length", "Width"] },
  tri: { name: "Triangle", fields: ["Base", "Height"] },
  circle: { name: "Circle", fields: ["Diameter"] },
  trap: { name: "Trapezoid", fields: ["Side A (parallel)", "Side B (parallel)", "Height"] },
};
function sqft(x: Area) {
  const a = toFt(x.a, x.unit), b = toFt(x.b, x.unit), c = toFt(x.c, x.unit);
  if (x.shape === "rect") return a * b;
  if (x.shape === "tri") return (a * b) / 2;
  if (x.shape === "circle") return Math.PI * (a / 2) ** 2;
  return ((a + b) / 2) * c;
}

export default function SquareFootageCalculator() {
  const [areas, setAreas] = useState<Area[]>([{ shape: "rect", a: "12", b: "12", c: "", unit: "ft", label: "Room 1" }]);
  const [waste, setWaste] = useState("0"); const [price, setPrice] = useState("");
  const upd = (i: number, k: keyof Area, v: string) => setAreas((r) => r.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const each = areas.map(sqft);
  const total = each.reduce((t, v) => t + (Number.isFinite(v) && v > 0 ? v : 0), 0);
  const w = Math.max(0, Number(waste) || 0) / 100, withWaste = total * (1 + w), p = Number(price);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        {areas.map((x, i) => (
          <div key={i} className="card space-y-3 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <input aria-label={`Area ${i + 1} name`} className="field !w-36 !py-1.5" value={x.label} onChange={(e) => upd(i, "label", e.target.value)} />
              <select aria-label={`Area ${i + 1} shape`} className="field !w-auto !py-1.5" value={x.shape} onChange={(e) => upd(i, "shape", e.target.value)}>
                {(Object.keys(SHAPES) as Shape[]).map((k) => <option key={k} value={k}>{SHAPES[k].name}</option>)}
              </select>
              <select aria-label={`Area ${i + 1} unit`} className="field !w-20 !py-1.5" value={x.unit} onChange={(e) => upd(i, "unit", e.target.value)}>{LENGTH_UNITS.map((u) => <option key={u}>{u}</option>)}</select>
              <span className="ml-auto text-sm font-semibold tabular-nums">{Number.isFinite(each[i]) && each[i] > 0 ? `${each[i].toFixed(2)} sq ft` : "—"}</span>
              {areas.length > 1 && <button type="button" aria-label={`Remove area ${i + 1}`} className="btn-ghost !px-2.5 !py-1" onClick={() => setAreas((r) => r.filter((_, j) => j !== i))}>✕</button>}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {SHAPES[x.shape].fields.map((f, j) => {
                const k = (["a", "b", "c"] as const)[j];
                return <Field key={f} id={`ar${i}${k}`} label={f} suffix={x.unit} value={x[k]} onChange={(v) => upd(i, k, v)} min={0} />;
              })}
            </div>
          </div>
        ))}
        <button type="button" className="btn-ghost" onClick={() => setAreas((r) => [...r, { shape: "rect", a: "", b: "", c: "", unit: r.at(-1)?.unit ?? "ft", label: `Room ${r.length + 1}` }])}>+ Add another area</button>
        <div className="grid grid-cols-2 gap-3">
          <Field id="waste" label="Extra for waste" suffix="%" value={waste} onChange={setWaste} min={0} hint="Flooring: 5–10% (15% for diagonal)." />
          <Field id="price" label="Price per sq ft" prefix="$" value={price} onChange={setPrice} min={0} />
        </div>
      </div>
      <ResultCard label={w > 0 ? `Total area (incl. ${+(w * 100).toFixed(1)}% extra)` : "Total area"} value={`${withWaste.toFixed(2)} sq ft`} error={total > 0 ? null : "Enter the measurements for at least one area."}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Square meters" v={`${(withWaste * 0.092903).toFixed(2)} m²`} />
          <Stat k="Square yards" v={`${(withWaste / 9).toFixed(2)} yd²`} />
          <Stat k="Square inches" v={Math.round(withWaste * 144).toLocaleString()} />
          <Stat k="Acres" v={(withWaste / 43560).toFixed(4)} />
          {p > 0 && <Stat k="Estimated cost" v={usd(withWaste * p)} />}
          {areas.length > 1 && <Stat k="Areas" v={areas.length} />}
        </dl>
      </ResultCard>
    </div>
  );
}
