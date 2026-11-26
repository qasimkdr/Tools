"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { TORQUE, convertTorque, type TorqueUnit } from "@/lib/torque";

const UNITS = Object.keys(TORQUE) as TorqueUnit[];
const fmt = (x: number) => (Number.isFinite(x) ? Number(x.toPrecision(6)).toLocaleString("en-US", { maximumFractionDigits: 4 }) : "–");

export default function NmToFtLb() {
  const [s, set] = useUrlState({ v: "100", from: "nm", to: "ftlb" });
  const from = (UNITS.includes(s.from as TorqueUnit) ? s.from : "nm") as TorqueUnit;
  const to = (UNITS.includes(s.to as TorqueUnit) ? s.to : "ftlb") as TorqueUnit;
  const v = Number(s.v);
  const err = s.v.trim() === "" || !Number.isFinite(v) ? "Enter a torque value." : null;
  const out = convertTorque(v, from, to);
  const chartFrom: TorqueUnit = from === "ftlb" ? "ftlb" : "nm", chartTo: TorqueUnit = chartFrom === "nm" ? "ftlb" : "nm";
  const steps = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 200, 250, 300, 400, 500];

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Torque converter">
          <Field id="v" label="Torque" value={s.v} onChange={(x) => set("v", x)} />
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
            <div><label htmlFor="from" className="label">From</label><select id="from" className="field" value={from} onChange={(e) => set("from", e.target.value)}>{UNITS.map((u) => <option key={u} value={u}>{TORQUE[u].short}</option>)}</select></div>
            <button type="button" className="btn-ghost mb-0.5 px-3 py-2" aria-label="Swap units" onClick={() => { set("from", to); set("to", from); }}>⇄</button>
            <div><label htmlFor="to" className="label">To</label><select id="to" className="field" value={to} onChange={(e) => set("to", e.target.value)}>{UNITS.map((u) => <option key={u} value={u}>{TORQUE[u].short}</option>)}</select></div>
          </div>
          <p className="text-xs subtle">1 N·m = 0.737562 ft·lb = 8.85075 in·lb · 1 ft·lb = 1.355818 N·m = 12 in·lb</p>
        </form>
        <ResultCard error={err} label={`${fmt(v)} ${TORQUE[from].short} in ${TORQUE[to].short}`} value={err ? "–" : <span data-testid="out">{fmt(out)} {TORQUE[to].short}</span>}>
          {!err && <dl className="mt-3 grid grid-cols-2 gap-3 text-sm" data-testid="all">
            {UNITS.filter((u) => u !== from).map((u) => <Stat key={u} k={TORQUE[u].label} v={<span data-testid={`u-${u}`}>{fmt(convertTorque(v, from, u))}</span>} />)}
          </dl>}
        </ResultCard>
      </div>
      <div>
        <h2 className="text-base font-semibold">{TORQUE[chartFrom].short} to {TORQUE[chartTo].short} chart</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm" data-testid="chart">
            <thead className="bg-[var(--surface-2)]"><tr className="text-left"><th className="px-3 py-1.5">{TORQUE[chartFrom].short}</th><th className="px-3">{TORQUE[chartTo].short}</th><th className="px-3">in·lb</th><th className="px-3">kgf·m</th></tr></thead>
            <tbody>{steps.map((x) => <tr key={x} className="border-t border-[var(--border)]"><td className="px-3 py-1">{x}</td><td className="px-3">{fmt(convertTorque(x, chartFrom, chartTo))}</td><td className="px-3">{fmt(convertTorque(x, chartFrom, "inlb"))}</td><td className="px-3">{fmt(convertTorque(x, chartFrom, "kgfm"))}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
