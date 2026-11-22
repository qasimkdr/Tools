"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// Standing reach ≈ 1.33 × height when not measured (population average; varies with arm length). Regulation rim = 10 ft.
const RIMS = { "120": "10 ft (regulation)", "108": "9 ft", "96": "8 ft" } as const;

export default function DunkCalculator() {
  const [s, set] = useUrlState({ u: "in", ft: "6", in: "0", cm: "183", reach: "", vert: "26", rim: "120", custom: "114", clear: "6" });
  const cm = s.u === "cm", toIn = (v: number) => (cm ? v / 2.54 : v);
  const height = cm ? Number(s.cm) / 2.54 : (Number(s.ft) || 0) * 12 + (Number(s.in) || 0);
  const measured = Number(s.reach) > 0, reach = measured ? toIn(Number(s.reach)) : height * 1.33;
  const rim = s.rim === "custom" ? toIn(Number(s.custom)) : Number(s.rim), clear = toIn(Number(s.clear) || 0);
  const touch = rim - reach, dunk = rim + clear - reach;
  const vert = s.vert === "" ? NaN : toIn(Number(s.vert)), maxReach = reach + vert;
  const show = (inches: number) => (cm ? `${(inches * 2.54).toFixed(1)} cm` : `${inches.toFixed(1)} in`);
  const error = !(height > 36 && height < 100) ? "Enter your height." : !(rim > 48) ? "Enter the rim height." : null;
  const verdict = !Number.isFinite(vert) ? null : maxReach >= rim + clear ? "You can reach high enough to dunk." : maxReach >= rim ? `You can touch the rim. Add about ${show(rim + clear - maxReach)} of vertical to dunk.` : `You're ${show(rim - maxReach)} short of touching the rim and ${show(rim + clear - maxReach)} short of dunking.`;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Dunk calculator">
        <Segmented label="Units" value={cm ? "cm" : "in"} onChange={(v) => set("u", v)} options={[{ id: "in", label: "Feet / inches" }, { id: "cm", label: "Centimeters" }]} />
        {cm ? <Field id="cm" label="Height" suffix="cm" value={s.cm} onChange={(v) => set("cm", v)} min={0} />
          : <div className="grid grid-cols-2 gap-3"><Field id="ft" label="Height (feet)" suffix="ft" value={s.ft} onChange={(v) => set("ft", v)} min={0} inputMode="numeric" /><Field id="in" label="Inches" suffix="in" value={s.in} onChange={(v) => set("in", v)} min={0} /></div>}
        <div className="grid grid-cols-2 gap-3">
          <Field id="reach" label="Standing reach (optional)" suffix={cm ? "cm" : "in"} value={s.reach} onChange={(v) => set("reach", v)} min={0} hint={measured ? "Using your measurement" : `Estimated: ${show(height * 1.33)}`} />
          <Field id="vert" label="Your vertical jump (optional)" suffix={cm ? "cm" : "in"} value={s.vert} onChange={(v) => set("vert", v)} min={0} />
        </div>
        <Segmented label="Rim height" value={s.rim in RIMS ? (s.rim as "120") : ("custom" as "120")} onChange={(v) => set("rim", v)} options={[...Object.entries(RIMS).map(([id, label]) => ({ id: id as "120", label })), { id: "custom" as "120", label: "Custom" }]} />
        {s.rim === "custom" && <Field id="custom" label="Rim height" suffix={cm ? "cm" : "in"} value={s.custom} onChange={(v) => set("custom", v)} min={0} />}
        <Field id="clear" label="Clearance above the rim to dunk" suffix={cm ? "cm" : "in"} value={s.clear} onChange={(v) => set("clear", v)} min={0} hint="About 6 in to get a hand and ball over the rim" />
      </form>
      <ResultCard error={error} label="Vertical jump needed to dunk" value={show(Math.max(0, dunk))}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="To touch the rim" v={show(Math.max(0, touch))} />
          <Stat k={measured ? "Standing reach (measured)" : "Standing reach (estimated)"} v={show(reach)} />
          {Number.isFinite(vert) && <Stat k="Your max reach" v={show(maxReach)} />}
          <Stat k="Target height" v={show(rim + clear)} />
        </dl>
        {verdict && <p className="mt-4 text-sm font-semibold" data-testid="verdict">{verdict}</p>}
        <p className="mt-2 text-xs subtle">Uses a running-jump-style vertical; a standing vertical is usually lower. Estimated reach uses 1.33 × height and can be off by a few inches; measure for accuracy.</p>
      </ResultCard>
    </div>
  );
}
