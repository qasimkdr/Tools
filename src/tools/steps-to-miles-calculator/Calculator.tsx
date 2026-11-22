"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const IN_PER_MI = 63360, CM_PER_IN = 2.54;
// Common pedometer rule: step length ≈ height × 0.415 (men) or × 0.413 (women).
const FACTOR = { m: 0.415, f: 0.413 } as const;
const fmt = (n: number, d = 2) => n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });

export default function StepsToMilesCalculator() {
  const [s, set] = useUrlState({ dir: "steps", n: "10000", dist: "3", du: "mi", sex: "m", src: "height", u: "imp", ft: "5", in: "9", cm: "175", step: "" });
  const metric = s.u === "met";
  const heightIn = metric ? Number(s.cm) / CM_PER_IN : Number(s.ft) * 12 + (Number(s.in) || 0);
  const measured = Number(s.step) > 0 ? (metric ? Number(s.step) / CM_PER_IN : Number(s.step)) : 0;
  const stepIn = s.src === "measured" ? measured : heightIn * FACTOR[s.sex === "f" ? "f" : "m"];
  const ok = stepIn > 5 && stepIn < 80;
  const toSteps = s.dir === "dist";
  const steps = toSteps ? (Number(s.dist) * (s.du === "km" ? 100000 / CM_PER_IN : IN_PER_MI)) / stepIn : Number(s.n);
  const miles = (steps * stepIn) / IN_PER_MI, km = (steps * stepIn * CM_PER_IN) / 100000;
  const err = !ok ? (s.src === "measured" ? "Enter your measured step length." : "Enter a valid height.") : !(steps > 0) ? (toSteps ? "Enter a distance." : "Enter a number of steps.") : null;
  const lenUnit = metric ? "cm" : "in";
  const stepShown = metric ? stepIn * CM_PER_IN : stepIn;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Steps to miles calculator">
        <Segmented label="Convert" value={toSteps ? "dist" : "steps"} onChange={(v) => set("dir", v)} options={[{ id: "steps", label: "Steps → distance" }, { id: "dist", label: "Distance → steps" }]} />
        {toSteps ? (
          <div className="grid grid-cols-[1fr_auto] items-end gap-3">
            <Field id="dist" label="Distance" value={s.dist} onChange={(v) => set("dist", v)} min={0} />
            <Segmented label="Unit" value={s.du === "km" ? "km" : "mi"} onChange={(v) => set("du", v)} options={[{ id: "mi", label: "mi" }, { id: "km", label: "km" }]} />
          </div>
        ) : (
          <Field id="n" label="Steps" value={s.n} onChange={(v) => set("n", v)} min={0} inputMode="numeric" />
        )}
        <Segmented label="Step length from" value={s.src === "measured" ? "measured" : "height"} onChange={(v) => set("src", v)} options={[{ id: "height", label: "My height" }, { id: "measured", label: "Measured step" }]} />
        <Segmented label="Units" value={metric ? "met" : "imp"} onChange={(v) => set("u", v)} options={[{ id: "imp", label: "ft / in" }, { id: "met", label: "cm" }]} />
        {s.src === "measured" ? (
          <Field id="step" label="Step length" suffix={lenUnit} value={s.step} onChange={(v) => set("step", v)} min={0} hint="Walk 10 steps, measure the distance, divide by 10." />
        ) : (
          <>
            <Segmented label="Sex" value={s.sex === "f" ? "f" : "m"} onChange={(v) => set("sex", v)} options={[{ id: "m", label: "Male" }, { id: "f", label: "Female" }]} />
            {metric ? <Field id="cm" label="Height" suffix="cm" value={s.cm} onChange={(v) => set("cm", v)} min={0} /> : (
              <div className="grid grid-cols-2 gap-3">
                <Field id="ft" label="Feet" suffix="ft" value={s.ft} onChange={(v) => set("ft", v)} min={0} />
                <Field id="in" label="Inches" suffix="in" value={s.in} onChange={(v) => set("in", v)} min={0} />
              </div>
            )}
          </>
        )}
      </form>
      <ResultCard label={toSteps ? "Steps" : "Distance"} error={err}
        value={toSteps ? Math.round(steps).toLocaleString("en-US") : `${fmt(miles)} mi`}>
        <p className="mt-1 text-sm muted">{toSteps ? `for ${s.dist} ${s.du === "km" ? "km" : "mi"}` : `${fmt(km)} km · ${Math.round(steps).toLocaleString("en-US")} steps`}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Step length" v={`${fmt(stepShown, 1)} ${lenUnit}`} />
          <Stat k="Steps per mile" v={<span data-testid="per-mile">{Math.round(IN_PER_MI / stepIn).toLocaleString("en-US")}</span>} />
          <Stat k="Steps per km" v={Math.round(100000 / CM_PER_IN / stepIn).toLocaleString("en-US")} />
          <Stat k="10,000 steps" v={`${fmt((10000 * stepIn) / IN_PER_MI)} mi`} />
        </dl>
        <p className="mt-4 text-xs subtle">{s.src === "measured" ? "Using your measured step length, the most accurate option." : `Estimated as height × ${FACTOR[s.sex === "f" ? "f" : "m"]}. Running steps are longer, so measure your step if you run.`}</p>
      </ResultCard>
    </div>
  );
}
