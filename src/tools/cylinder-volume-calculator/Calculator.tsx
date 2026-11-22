"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import UnitField from "@/components/calc/UnitField";
import { useUrlState } from "@/lib/useUrlState";
import { toFt } from "@/lib/units";
import { FT3, cylLateral, cylTotalArea, cylVolume, horizontalFill, hollowVolume } from "@/lib/geometry";

type Shape = "solid" | "hollow" | "tank";
const fmt = (v: number, d = 3) => (Math.abs(v) >= 1e6 ? v.toExponential(4) : v.toLocaleString("en-US", { maximumFractionDigits: d }));

export default function CylinderVolumeCalculator() {
  const [s, set] = useUrlState({ shape: "solid", by: "d", size: "4", su: "ft", h: "5", hu: "ft", inner: "3", iu: "ft", orient: "v", fill: "2", fu: "ft" });
  const shape = (["solid", "hollow", "tank"].includes(s.shape) ? s.shape : "solid") as Shape;
  const r = toFt(s.size, s.su) / (s.by === "r" ? 1 : 2), h = toFt(s.h, s.hu);
  const rIn = toFt(s.inner, s.iu) / (s.by === "r" ? 1 : 2), fill = toFt(s.fill, s.fu);
  const full = cylVolume(r, h);
  const horiz = s.orient === "h";
  let vol = full, error: string | null = null;
  if (!(r > 0) || !(h > 0)) error = `Enter a ${s.by === "r" ? "radius" : "diameter"} and ${shape === "tank" && horiz ? "length" : "height"} above 0.`;
  else if (shape === "hollow") { if (!(rIn >= 0) || rIn >= r) error = "The inner size must be smaller than the outer size."; else vol = hollowVolume(r, rIn, h); }
  else if (shape === "tank") {
    const max = horiz ? 2 * r : h;
    if (!(fill >= 0) || fill > max + 1e-9) error = `Fill depth must be between 0 and ${horiz ? "the diameter" : "the height"}.`;
    else vol = horiz ? horizontalFill(r, h, fill) : cylVolume(r, fill);
  }
  const unitLabel = s.su;
  const rDisp = Number(s.size) / (s.by === "r" ? 1 : 2);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Cylinder volume calculator">
        <Segmented label="What are you measuring?" value={shape} onChange={(v) => set("shape", v)}
          options={[{ id: "solid", label: "Cylinder" }, { id: "hollow", label: "Pipe / tube" }, { id: "tank", label: "Partly filled tank" }]} />
        <Segmented label="I know the" value={s.by === "r" ? "r" : "d"} onChange={(v) => set("by", v)} options={[{ id: "d", label: "Diameter" }, { id: "r", label: "Radius" }]} />
        <UnitField id="size" label={shape === "hollow" ? `Outer ${s.by === "r" ? "radius" : "diameter"}` : s.by === "r" ? "Radius" : "Diameter"} value={s.size} unit={s.su} onValue={(v) => set("size", v)} onUnit={(u) => set("su", u)} />
        {shape === "hollow" && <UnitField id="inner" label={`Inner ${s.by === "r" ? "radius" : "diameter"}`} value={s.inner} unit={s.iu} onValue={(v) => set("inner", v)} onUnit={(u) => set("iu", u)} />}
        {shape === "tank" && <Segmented label="Tank position" value={horiz ? "h" : "v"} onChange={(v) => set("orient", v)} options={[{ id: "v", label: "Standing (vertical)" }, { id: "h", label: "Lying (horizontal)" }]} />}
        <UnitField id="h" label={shape === "tank" && horiz ? "Length" : "Height"} value={s.h} unit={s.hu} onValue={(v) => set("h", v)} onUnit={(u) => set("hu", u)} />
        {shape === "tank" && <UnitField id="fill" label="Liquid depth" value={s.fill} unit={s.fu} onValue={(v) => set("fill", v)} onUnit={(u) => set("fu", u)} />}
        <p className="text-xs subtle">Mix units freely (e.g. diameter in inches, height in feet); everything is converted before calculating.</p>
      </form>
      <ResultCard error={error} label={shape === "hollow" ? "Material volume (wall)" : shape === "tank" ? "Liquid volume" : "Volume"} value={`${fmt(vol)} ft³`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat k="US gallons" v={fmt(vol * FT3.galUS, 2)} />
          <Stat k="Liters" v={fmt(vol * FT3.L, 2)} />
          <Stat k="Cubic meters" v={fmt(vol * FT3.m3, 4)} />
          <Stat k="Cubic inches" v={fmt(vol * FT3.in3, 1)} />
          <Stat k="Cubic yards" v={fmt(vol * FT3.yd3, 3)} />
          {shape === "tank" && <Stat k="Percent full" v={`${fmt((vol / full) * 100, 1)}%`} />}
          {shape === "solid" && <Stat k="Total surface area" v={`${fmt(cylTotalArea(r, h), 2)} ft²`} />}
          {shape === "solid" && <Stat k="Side (lateral) area" v={`${fmt(cylLateral(r, h), 2)} ft²`} />}
          {shape === "hollow" && <Stat k="Inside capacity" v={`${fmt(cylVolume(rIn, h) * FT3.galUS, 2)} gal`} />}
        </dl>
        {shape === "solid" && s.su === s.hu && <p className="mt-4 text-sm muted" data-testid="steps">V = π × r² × h = π × {fmt(rDisp, 4)}² × {s.h} = <strong className="text-[var(--text)]">{fmt(Math.PI * rDisp * rDisp * Number(s.h), 4)} {unitLabel}³</strong></p>}
        {shape === "tank" && <p className="mt-4 text-sm muted">Full capacity: {fmt(full * FT3.galUS, 2)} US gallons ({fmt(full * FT3.L, 1)} L).</p>}
      </ResultCard>
    </div>
  );
}
