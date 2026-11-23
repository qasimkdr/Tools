"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { L_PER_UKGAL, L_PER_USGAL, M3_PER, SOLIDS } from "@/lib/volumeShapes";

const fmt = (n: number) => Number(n.toPrecision(7)).toLocaleString("en-US", { maximumFractionDigits: 4 });
const UNITS = ["in", "ft", "yd", "mm", "cm", "m"];

export default function VolumeCalculator() {
  const [s, set] = useUrlState({ shape: "box", u: "ft", l: "10", w: "6", h: "3", a: "4", b: "3", c: "2", r: "4", R: "5" });
  const shape = SOLIDS.find((x) => x.id === s.shape) ?? SOLIDS[0];
  const u = UNITS.includes(s.u) ? s.u : "ft";
  const vals = Object.fromEntries(shape.inputs.map(({ k }) => [k, Number((s as Record<string, string>)[k])]));
  const v = shape.calc(vals);
  const m3 = v != null ? v * M3_PER[u] : NaN, liters = m3 * 1000;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Volume calculator">
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div><label htmlFor="shape" className="label">Shape</label>
            <select id="shape" className="field" value={shape.id} onChange={(e) => set("shape", e.target.value)}>{SOLIDS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
          <div><label htmlFor="u" className="label">Units</label>
            <select id="u" className="field" value={u} onChange={(e) => set("u", e.target.value)}>{UNITS.map((x) => <option key={x}>{x}</option>)}</select></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {shape.inputs.map(({ k, label }) => <Field key={k} id={k} label={label} suffix={u} value={(s as Record<string, string>)[k]} onChange={(val) => set(k as keyof typeof s, val)} min={0} />)}
        </div>
        <div className="formula">{shape.formula}</div>
      </form>
      <ResultCard label={`Volume of the ${shape.name.replace(/ \(.*\)/, "").toLowerCase()}`} error={v == null ? (shape.id === "tube" ? "The outer radius must be larger than the inner radius." : "Enter positive measurements.") : null} value={v != null ? `${fmt(v)} ${u}³` : "–"}>
        {v != null && <>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="US gallons" v={<span data-testid="gal">{fmt(liters / L_PER_USGAL)}</span>} />
            <Stat k="Liters" v={<span data-testid="liters">{fmt(liters)}</span>} />
            <Stat k="Cubic feet" v={fmt(m3 / M3_PER.ft)} />
            <Stat k="Cubic meters" v={fmt(m3)} />
            <Stat k="Cubic yards" v={fmt(m3 / M3_PER.yd)} />
            <Stat k="UK (imperial) gallons" v={fmt(liters / L_PER_UKGAL)} />
          </dl>
          <p className="mt-4 text-sm muted">Water weighs about {fmt(liters)} kg ({fmt(liters * 2.20462)} lb) at this volume.</p>
          <p className="mt-2 text-xs subtle">For ponds and tanks, use the average depth (or fill height) and remember the real capacity is a little less once rocks, plants and freeboard are accounted for.</p>
        </>}
      </ResultCard>
    </div>
  );
}
