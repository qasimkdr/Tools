"use client";
import type { ReactNode } from "react";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { HP_CONST, NM_PER_LBFT, W_PER_EHP, W_PER_HP, W_PER_PS, hpFromWork } from "@/lib/power";

const f = (x: number, d = 1) => (Number.isFinite(x) ? x.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d }) : "–");
const UNITS = { hp: W_PER_HP, kw: 1000, ps: W_PER_PS, ehp: W_PER_EHP, w: 1 } as const;
type U = keyof typeof UNITS;
const LABEL: Record<U, string> = { hp: "hp (mechanical)", kw: "kW", ps: "PS (metric hp)", ehp: "hp (electric)", w: "W" };

export default function HorsepowerCalculator() {
  const [s, set] = useUrlState({ mode: "torque", find: "hp", torque: "300", tu: "lbft", rpm: "5000", hp: "400", pv: "100", pu: "hp", lbf: "150", dist: "10", sec: "2" });
  const mode = ["torque", "convert", "work"].includes(s.mode) ? s.mode : "torque";
  const rpm = Number(s.rpm);
  const lbft = Number(s.torque) / (s.tu === "nm" ? NM_PER_LBFT : 1);

  let watts = NaN, err: string | null = null, extra: ReactNode = null;
  if (mode === "torque") {
    if (!(rpm > 0)) err = "Enter the engine speed in RPM.";
    else if (s.find === "torque") {
      const hp = Number(s.hp);
      if (!(hp > 0)) err = "Enter the horsepower.";
      else { watts = hp * W_PER_HP; const t = (hp * HP_CONST) / rpm; extra = <><Stat k="Torque (lb-ft)" v={<span data-testid="torque">{f(t)}</span>} /><Stat k="Torque (N·m)" v={f(t * NM_PER_LBFT)} /></>; }
    } else if (!(lbft > 0)) err = "Enter the torque.";
    else watts = ((lbft * rpm) / HP_CONST) * W_PER_HP;
  } else if (mode === "convert") {
    const v = Number(s.pv), u = (s.pu in UNITS ? s.pu : "hp") as U;
    if (!(v >= 0) || s.pv === "") err = "Enter a power value."; else watts = v * UNITS[u];
  } else {
    const hp = hpFromWork(Number(s.lbf), Number(s.dist), Number(s.sec));
    if (!(Number(s.lbf) > 0) || !(Number(s.dist) > 0) || !(Number(s.sec) > 0)) err = "Enter the weight, distance and time (all above 0).";
    else { watts = hp * W_PER_HP; extra = <Stat k="Work done" v={`${f(Number(s.lbf) * Number(s.dist), 0)} ft·lbf (${f(Number(s.lbf) * Number(s.dist) * NM_PER_LBFT, 0)} J)`} />; }
  }
  const hp = watts / W_PER_HP;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Horsepower calculator">
        <Segmented label="Calculate" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "torque", label: "Torque and RPM" }, { id: "convert", label: "Convert units" }, { id: "work", label: "Work and time" }]} />
        {mode === "torque" && <>
          <Segmented label="Find" value={s.find === "torque" ? "torque" : "hp"} onChange={(v) => set("find", v)} options={[{ id: "hp", label: "Horsepower" }, { id: "torque", label: "Torque" }]} />
          <div className="grid grid-cols-2 gap-3">
            {s.find === "torque"
              ? <Field id="hp" label="Horsepower" suffix="hp" value={s.hp} onChange={(v) => set("hp", v)} min={0} />
              : <>
                <Field id="torque" label="Torque" suffix={s.tu === "nm" ? "N·m" : "lb-ft"} value={s.torque} onChange={(v) => set("torque", v)} min={0} />
                <div><label htmlFor="tu" className="label">Torque unit</label><select id="tu" className="field" value={s.tu === "nm" ? "nm" : "lbft"} onChange={(e) => set("tu", e.target.value)}><option value="lbft">lb-ft</option><option value="nm">N·m</option></select></div>
              </>}
            <Field id="rpm" label="Engine speed" suffix="RPM" value={s.rpm} onChange={(v) => set("rpm", v)} min={0} />
          </div>
        </>}
        {mode === "convert" && <div className="grid grid-cols-2 gap-3">
          <Field id="pv" label="Power" value={s.pv} onChange={(v) => set("pv", v)} min={0} />
          <div><label htmlFor="pu" className="label">Unit</label><select id="pu" className="field" value={s.pu in UNITS ? s.pu : "hp"} onChange={(e) => set("pu", e.target.value)}>{(Object.keys(UNITS) as U[]).map((u) => <option key={u} value={u}>{LABEL[u]}</option>)}</select></div>
        </div>}
        {mode === "work" && <div className="grid grid-cols-2 gap-3">
          <Field id="lbf" label="Weight (force)" suffix="lb" value={s.lbf} onChange={(v) => set("lbf", v)} min={0} />
          <Field id="dist" label="Lifted or moved" suffix="ft" value={s.dist} onChange={(v) => set("dist", v)} min={0} />
          <Field id="sec" label="In a time of" suffix="s" value={s.sec} onChange={(v) => set("sec", v)} min={0} />
        </div>}
      </form>
      <ResultCard error={err} label={mode === "torque" && s.find === "torque" ? "Power" : "Horsepower"} value={err ? "–" : <span data-testid="hp">{f(hp, hp < 10 ? 3 : 1)} hp</span>}>
        {!err && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            {extra}
            <Stat k="Kilowatts" v={<span data-testid="kw">{f(watts / 1000, watts < 10000 ? 3 : 1)} kW</span>} />
            <Stat k="Metric horsepower" v={<span data-testid="ps">{f(watts / W_PER_PS, 1)} PS</span>} />
            <Stat k="Watts" v={`${f(watts, 0)} W`} />
            <Stat k="Electric horsepower (746 W)" v={`${f(watts / W_PER_EHP, 2)} hp`} />
            <Stat k="ft·lbf per second" v={f(hp * 550, 0)} />
            {mode === "torque" && s.find !== "torque" && <Stat k="Torque (N·m)" v={f(lbft * NM_PER_LBFT)} />}
          </dl>
          {mode === "torque" && rpm > 0 && <>
            <h2 className="mt-5 text-sm font-semibold">{s.find === "torque" ? `Torque for ${f(Number(s.hp), 0)} hp at other speeds` : `Horsepower from ${f(lbft, 0)} lb-ft at other speeds`}</h2>
            <table className="mt-2 w-full text-sm" data-testid="rpm-table">
              <thead><tr className="text-left subtle"><th className="py-1">RPM</th><th>{s.find === "torque" ? "Torque (lb-ft)" : "Horsepower"}</th><th>{s.find === "torque" ? "Torque (N·m)" : "kW"}</th></tr></thead>
              <tbody>{[1000, 2000, 3000, 4000, 5252, 6000, 7000].map((r) => {
                const a = s.find === "torque" ? (Number(s.hp) * HP_CONST) / r : (lbft * r) / HP_CONST;
                return <tr key={r} className="border-t border-[var(--border)]"><td className="py-1">{r.toLocaleString("en-US")}</td><td>{f(a)}</td><td>{s.find === "torque" ? f(a * NM_PER_LBFT) : f((a * W_PER_HP) / 1000)}</td></tr>;
              })}</tbody>
            </table>
            <p className="mt-1 text-xs subtle">At 5,252 RPM, horsepower and lb-ft of torque are equal. Real engines don&apos;t hold constant torque across the rev range, so read this as &quot;if torque stayed the same&quot;.</p>
          </>}
        </>}
      </ResultCard>
    </div>
  );
}
