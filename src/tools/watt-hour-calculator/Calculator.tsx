"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { ahFromWh, faaTier, runtimeHours, whFromBattery, whFromPower } from "@/lib/energyWh";

const f = (x: number, d = 1) => (Number.isFinite(x) ? x.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d }) : "–");
const hm = (h: number) => { if (!Number.isFinite(h)) return "–"; const t = Math.round(h * 60); return `${Math.floor(t / 60)} h ${t % 60} min`; };

export default function WattHourCalculator() {
  const [s, set] = useUrlState({ mode: "power", w: "60", h: "8", days: "30", rate: "0.15", cap: "5000", cu: "mah", v: "3.7", bwh: "600", load: "60", eff: "100" });
  const mode = ["power", "battery", "runtime"].includes(s.mode) ? s.mode : "power";
  let err: string | null = null, wh = NaN;
  if (mode === "power") { const w = Number(s.w), h = Number(s.h); if (!(w >= 0) || !(h >= 0) || s.w === "" || s.h === "") err = "Enter the power in watts and the hours of use."; else wh = whFromPower(w, h); }
  else if (mode === "battery") { const cap = Number(s.cap), v = Number(s.v); if (!(cap > 0) || !(v > 0)) err = "Enter the battery capacity and voltage."; else wh = whFromBattery(v, s.cu === "ah" ? cap : cap / 1000); }
  else { wh = Number(s.bwh); if (!(wh > 0) || !(Number(s.load) > 0)) err = "Enter the battery's watt-hours and the load in watts."; }
  const days = Number(s.days), rate = Number(s.rate);
  const run = runtimeHours(wh, Number(s.load), Math.min(100, Math.max(1, Number(s.eff) || 100)));
  const tier = mode === "battery" && !err ? faaTier(wh) : null;
  const label = mode === "runtime" ? "Runtime" : "Energy";
  const value = mode === "runtime" ? hm(run) : `${f(wh, wh < 10 ? 2 : 1)} Wh`;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Watt hour calculator">
        <Segmented label="Calculate" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "power", label: "Watts × hours" }, { id: "battery", label: "Battery capacity" }, { id: "runtime", label: "Runtime" }]} />
        {mode === "power" && <div className="grid grid-cols-2 gap-3">
          <Field id="w" label="Power" suffix="W" value={s.w} onChange={(v) => set("w", v)} min={0} hint="From the label or a plug meter" />
          <Field id="h" label="Hours of use" suffix="h" value={s.h} onChange={(v) => set("h", v)} min={0} hint="Per day, for the cost" />
          <Field id="rate" label="Electricity price" prefix="$" suffix="/kWh" value={s.rate} onChange={(v) => set("rate", v)} min={0} hint="From your bill" />
          <Field id="days" label="Days of use" value={s.days} onChange={(v) => set("days", v)} min={0} inputMode="numeric" />
        </div>}
        {mode === "battery" && <>
          <div className="grid grid-cols-2 gap-3">
            <Field id="cap" label="Capacity" suffix={s.cu === "ah" ? "Ah" : "mAh"} value={s.cap} onChange={(v) => set("cap", v)} min={0} />
            <Field id="v" label="Voltage" suffix="V" value={s.v} onChange={(v) => set("v", v)} min={0} hint="Li-ion cells: 3.6–3.7 V nominal" />
          </div>
          <Segmented label="Capacity unit" value={s.cu === "ah" ? "ah" : "mah"} onChange={(v) => set("cu", v)} options={[{ id: "mah", label: "mAh" }, { id: "ah", label: "Ah" }]} />
        </>}
        {mode === "runtime" && <div className="grid grid-cols-2 gap-3">
          <Field id="bwh" label="Battery energy" suffix="Wh" value={s.bwh} onChange={(v) => set("bwh", v)} min={0} hint="Volts × amp-hours" />
          <Field id="load" label="Device power" suffix="W" value={s.load} onChange={(v) => set("load", v)} min={0} />
          <Field id="eff" label="Efficiency" suffix="%" value={s.eff} onChange={(v) => set("eff", v)} min={1} hint="Lower it for inverter or converter losses" />
        </div>}
      </form>
      <ResultCard error={err} label={label} value={err ? "–" : <span data-testid="out">{value}</span>}>
        {!err && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            {mode !== "runtime" && <>
              <Stat k="Kilowatt-hours" v={<span data-testid="kwh">{f(wh / 1000, 3)} kWh</span>} />
              <Stat k="Joules" v={`${f(wh * 3600, 0)} J`} />
            </>}
            {mode === "power" && <>
              <Stat k="Cost per day" v={<span data-testid="cost-day">${f((wh / 1000) * rate, 2)}</span>} />
              <Stat k={`Energy over ${days || 0} days`} v={`${f((wh * days) / 1000, 2)} kWh`} />
              <Stat k={`Cost over ${days || 0} days`} v={<span data-testid="cost-period">${f(((wh * days) / 1000) * rate, 2)}</span>} />
            </>}
            {mode === "battery" && <>
              <Stat k="At 12 V that is" v={`${f(ahFromWh(wh, 12), 2)} Ah`} />
              <Stat k="Runs a 10 W device for" v={hm(wh / 10)} />
            </>}
            {mode === "runtime" && <>
              <Stat k="Usable energy" v={`${f((wh * (Number(s.eff) || 100)) / 100, 1)} Wh`} />
              <Stat k="Hours (decimal)" v={<span data-testid="hours">{f(run, 2)} h</span>} />
              <Stat k="Battery at 12 V" v={`${f(ahFromWh(wh, 12), 1)} Ah`} />
            </>}
          </dl>
          {tier && <p className={`mt-3 rounded-lg p-2 text-sm ${tier.tier === "allowed" ? "bg-[var(--surface-2)]" : "bg-amber-50 dark:bg-amber-950/40"}`} data-testid="faa">✈ {tier.text}</p>}
          {mode === "runtime" && <p className="mt-2 text-xs subtle">Real runtime is usually shorter: batteries lose capacity with age and cold, and many shouldn&apos;t be drained to 0%.</p>}
        </>}
      </ResultCard>
    </div>
  );
}
