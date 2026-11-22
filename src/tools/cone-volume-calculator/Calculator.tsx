"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import UnitField from "@/components/calc/UnitField";
import { useUrlState } from "@/lib/useUrlState";
import { toFt } from "@/lib/units";
import { FT3, frustumLateral, frustumSlant, frustumVolume } from "@/lib/geometry";

const fmt = (v: number, d = 3) => (Math.abs(v) >= 1e6 ? v.toExponential(4) : v.toLocaleString("en-US", { maximumFractionDigits: d }));

export default function ConeVolumeCalculator() {
  const [s, set] = useUrlState({ shape: "cone", by: "d", size: "2", su: "ft", top: "1", tu: "ft", h: "3", hu: "ft" });
  const frustum = s.shape === "frustum", div = s.by === "r" ? 1 : 2;
  const R = toFt(s.size, s.su) / div, r = frustum ? toFt(s.top, s.tu) / div : 0, h = toFt(s.h, s.hu);
  const V = frustumVolume(R, r, h), slant = frustumSlant(R, r, h), lateral = frustumLateral(R, r, h);
  const total = lateral + Math.PI * R * R + Math.PI * r * r;
  const sameUnits = s.su === s.hu && (!frustum || s.tu === s.su);
  const rD = Number(s.size) / div, hD = Number(s.h);
  const error = !(R > 0) || !(h > 0) ? `Enter a ${frustum ? "bottom " : ""}${s.by === "r" ? "radius" : "diameter"} and height above 0.` : frustum && !(r >= 0) ? "Enter the top size (0 or more)." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Cone volume calculator">
        <Segmented label="Shape" value={frustum ? "frustum" : "cone"} onChange={(v) => set("shape", v)} options={[{ id: "cone", label: "Cone" }, { id: "frustum", label: "Truncated cone (frustum)" }]} />
        <Segmented label="I know the" value={s.by === "r" ? "r" : "d"} onChange={(v) => set("by", v)} options={[{ id: "d", label: "Diameter" }, { id: "r", label: "Radius" }]} />
        <UnitField id="size" label={`${frustum ? "Bottom " : "Base "}${s.by === "r" ? "radius" : "diameter"}`} value={s.size} unit={s.su} onValue={(v) => set("size", v)} onUnit={(u) => set("su", u)} />
        {frustum && <UnitField id="top" label={`Top ${s.by === "r" ? "radius" : "diameter"}`} value={s.top} unit={s.tu} onValue={(v) => set("top", v)} onUnit={(u) => set("tu", u)} />}
        <UnitField id="h" label="Height (perpendicular, not slant)" value={s.h} unit={s.hu} onValue={(v) => set("h", v)} onUnit={(u) => set("hu", u)} />
      </form>
      <ResultCard error={error} label={frustum ? "Frustum volume" : "Cone volume"} value={`${fmt(V)} ft³`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat k="US gallons" v={fmt(V * FT3.galUS, 2)} />
          <Stat k="Liters" v={fmt(V * FT3.L, 2)} />
          <Stat k="Cubic inches" v={fmt(V * FT3.in3, 1)} />
          <Stat k="Cubic meters" v={fmt(V * FT3.m3, 4)} />
          <Stat k="Slant height" v={`${fmt(slant, 3)} ft`} />
          <Stat k="Total surface area" v={`${fmt(total, 2)} ft²`} />
          <Stat k="Side (lateral) area" v={`${fmt(lateral, 2)} ft²`} />
        </dl>
        {!frustum && sameUnits && <p className="mt-4 text-sm muted" data-testid="steps">V = ⅓ × π × r² × h = ⅓ × π × {fmt(rD, 4)}² × {hD} = <strong className="text-[var(--text)]">{fmt((Math.PI * rD * rD * hD) / 3, 4)} {s.su}³</strong>, one third of a cylinder the same size.</p>}
      </ResultCard>
    </div>
  );
}
