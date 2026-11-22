"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import UnitField from "@/components/calc/UnitField";
import { useUrlState } from "@/lib/useUrlState";
import { toFt } from "@/lib/units";
import { ftIn } from "@/lib/feetInches";

const LUMBER = [8, 10, 12, 14, 16, 18, 20, 22, 24];
const deg = (r: number) => (r * 180) / Math.PI;

export default function RafterCalculator() {
  const [s, set] = useUrlState({ by: "span", span: "24", su: "ft", pm: "ratio", pitch: "6", ang: "26.57", ridge: "1.5", oh: "12", ou: "in" });
  const run0 = toFt(s.span, s.su) / (s.by === "run" ? 1 : 2);
  const ridgeFt = Math.max(0, Number(s.ridge) || 0) / 12;
  const run = s.by === "run" ? run0 : run0 - ridgeFt / 2;
  const slope = s.pm === "angle" ? Math.tan((Number(s.ang) * Math.PI) / 180) : Number(s.pitch) / 12; // rise per unit run
  const factor = Math.sqrt(1 + slope * slope), angle = deg(Math.atan(slope));
  const line = run * factor, tail = toFt(s.oh, s.ou) * factor, total = line + tail;
  const buy = LUMBER.find((l) => l >= total);
  const error = !(run > 0) ? "Enter a span (or run) larger than the ridge board." : !(slope > 0 && angle < 80) ? "Enter a pitch above 0 (e.g. 6 for 6/12) or an angle under 80°." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Rafter length calculator">
        <Segmented label="I know the" value={s.by === "run" ? "run" : "span"} onChange={(v) => set("by", v)} options={[{ id: "span", label: "Building span (wall to wall)" }, { id: "run", label: "Rafter run" }]} />
        <UnitField id="span" label={s.by === "run" ? "Run (horizontal, plate to ridge center)" : "Span (outside of wall to outside of wall)"} value={s.span} unit={s.su} onValue={(v) => set("span", v)} onUnit={(u) => set("su", u)} />
        <Segmented label="Roof pitch as" value={s.pm === "angle" ? "angle" : "ratio"} onChange={(v) => set("pm", v)} options={[{ id: "ratio", label: "Rise per 12 (e.g. 6/12)" }, { id: "angle", label: "Degrees" }]} />
        {s.pm === "angle"
          ? <Field id="ang" label="Roof angle" suffix="°" value={s.ang} onChange={(v) => set("ang", v)} min={0} />
          : <Field id="pitch" label="Pitch: inches of rise per 12 inches of run" suffix="/ 12" value={s.pitch} onChange={(v) => set("pitch", v)} min={0} />}
        <div className="grid grid-cols-2 gap-3">
          {s.by !== "run" && <Field id="ridge" label="Ridge board thickness" suffix="in" value={s.ridge} onChange={(v) => set("ridge", v)} min={0} hint="1.5 in for a 2× board; 0 for none" />}
          <UnitField id="oh" label="Overhang (horizontal)" value={s.oh} unit={s.ou} onValue={(v) => set("oh", v)} onUnit={(u) => set("ou", u)} />
        </div>
      </form>
      <ResultCard error={error} label="Total rafter length (with overhang)" value={ftIn(total)}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Ridge to wall plate (line length)" v={ftIn(line)} />
          <Stat k="Overhang (tail) along the slope" v={ftIn(tail)} />
          <Stat k="Rise" v={ftIn(run * slope)} />
          <Stat k="Run used" v={ftIn(run)} />
          <Stat k="Pitch" v={`${(slope * 12).toFixed(2).replace(/\.00$/, "")}/12 · ${angle.toFixed(1)}°`} />
          <Stat k="Slope factor" v={factor.toFixed(4)} />
          <Stat k="Plumb cut angle (speed square)" v={`${angle.toFixed(1)}°`} />
          <Stat k="Seat (level) cut" v="90° to the plumb cut" />
        </dl>
        <p className="mt-4 text-sm muted">Decimal: {total.toFixed(3)} ft ({(total * 12).toFixed(2)} in, {(total * 0.3048).toFixed(3)} m). {buy ? <>Buy <strong className="text-[var(--text)]">{buy} ft</strong> lumber to allow for the cuts.</> : "Longer than standard 24 ft lumber: consider engineered lumber or a truss."}</p>
        <p className="mt-2 text-xs subtle">Geometry only: lumber size and spacing must meet your local building code for span and loads.</p>
      </ResultCard>
    </div>
  );
}
