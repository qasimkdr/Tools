"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// Empirical drag-racing formulas (Huntington-style). Common constants 5.825 / 234; Huntington's original 6.290 / 224.
const C = { common: { et: 5.825, mph: 234, label: "Common (5.825 / 234)" }, huntington: { et: 6.29, mph: 224, label: "Huntington original (6.290 / 224)" } };
const f = (x: number, d = 2) => (Number.isFinite(x) ? x.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d }) : "–");

export default function QuarterMileCalculator() {
  const [s, set] = useUrlState({ mode: "predict", w: "3500", hp: "400", et: "12", mph: "113.5", k: "common" });
  const k = C[s.k === "huntington" ? "huntington" : "common"];
  const W = Number(s.w);
  const predict = s.mode !== "hp";
  const hpIn = Number(s.hp), hp = hpIn; // flywheel (crank) horsepower, as the formulas assume
  const et = k.et * Math.cbrt(W / hp), mph = k.mph * Math.cbrt(hp / W);
  const hpFromEt = W / (Number(s.et) / k.et) ** 3, hpFromMph = W * (Number(s.mph) / k.mph) ** 3;
  const err = !(W > 300) ? "Enter the race weight (car + driver) in pounds." : predict ? (!(hpIn > 0) ? "Enter the horsepower." : null) : !(Number(s.et) > 0 || Number(s.mph) > 0) ? "Enter an elapsed time or trap speed." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Quarter mile calculator">
        <Segmented label="Calculate" value={predict ? "predict" : "hp"} onChange={(v) => set("mode", v)} options={[{ id: "predict", label: "ET & trap speed" }, { id: "hp", label: "Horsepower from time slip" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="w" label="Race weight (car + driver)" suffix="lb" value={s.w} onChange={(v) => set("w", v)} min={0} />
          {predict ? <>
            <Field id="hp" label="Flywheel horsepower" suffix="hp" value={s.hp} onChange={(v) => set("hp", v)} min={0} />
          </> : <>
            <Field id="et" label="Elapsed time (ET)" suffix="s" value={s.et} onChange={(v) => set("et", v)} min={0} />
            <Field id="mph" label="Trap speed" suffix="mph" value={s.mph} onChange={(v) => set("mph", v)} min={0} />
          </>}
        </div>
        <Segmented label="Formula constants" value={s.k === "huntington" ? "huntington" : "common"} onChange={(v) => set("k", v)} options={[{ id: "common", label: C.common.label }, { id: "huntington", label: C.huntington.label }]} />
      </form>
      {predict ? (
        <ResultCard label="Estimated quarter-mile ET" error={err} value={err ? "–" : `${f(et)} s`}>
          {!err && <>
            <p className="mt-1 text-sm muted">Trap speed about <strong data-testid="mph">{f(mph, 1)} mph</strong> ({f(mph * 1.609344, 1)} km/h)</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Weight-to-power" v={`${f(W / hp, 2)} lb/hp`} />
              <Stat k="Power-to-weight" v={`${f((hp / W) * 1000, 1)} hp per 1,000 lb`} />
              <Stat k="Average speed over the run" v={`${f((0.25 / et) * 3600, 1)} mph`} />
              <Stat k="+100 hp would give" v={`${f(k.et * Math.cbrt(W / (hp + 100)))} s`} />
            </dl>
            <p className="mt-4 text-xs subtle">Estimates assume good traction and a well-tuned car at sea level. Launch, gearing, tires, weather and altitude change real results by several tenths.</p>
          </>}
        </ResultCard>
      ) : (
        <ResultCard label="Estimated horsepower" error={err} value={err ? "–" : `${f(Number(s.mph) > 0 ? hpFromMph : hpFromEt, 0)} hp`}>
          {!err && <>
            <p className="mt-1 text-sm muted">{Number(s.mph) > 0 ? "From trap speed (usually more reliable than ET, which depends heavily on the launch)" : "From elapsed time"}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {Number(s.et) > 0 && <Stat k="From ET" v={<span data-testid="hp-et">{f(hpFromEt, 0)} hp</span>} />}
              {Number(s.mph) > 0 && <Stat k="From trap speed" v={<span data-testid="hp-mph">{f(hpFromMph, 0)} hp</span>} />}
            </dl>
          </>}
        </ResultCard>
      )}
    </div>
  );
}
