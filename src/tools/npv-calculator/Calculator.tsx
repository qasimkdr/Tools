"use client";
import { Field, ResultCard, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { irr, npv, payback, pvFlows } from "@/lib/npv";

const MAX = 30;
const yrs = (v: number | null) => (v === null ? "Not within these years" : `${v.toFixed(2)} years`);

export default function NpvCalculator() {
  const [s, set] = useUrlState({ init: "10000", rate: "8", cf: "3000,4000,5000,3000" });
  const raw = s.cf.split(",").slice(0, MAX);
  const flows = raw.map((v) => Number(v) || 0);
  const rate = Number(s.rate) / 100, init = Number(s.init) || 0;
  const value = npv(init, flows, rate), pvs = pvFlows(flows, rate), pvSum = pvs.reduce((a, b) => a + b, 0);
  const r = irr(init, flows);
  const setFlow = (i: number, v: string) => set("cf", raw.map((x, j) => (j === i ? v : x)).join(","));
  const error = !(rate > -1) || s.rate === "" ? "Enter a discount rate (e.g. 8 for 8%)." : !flows.length ? "Add at least one cash flow." : null;
  let cum = -init;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="NPV calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="init" label="Initial investment" prefix="$" value={s.init} onChange={(v) => set("init", v)} min={0} />
          <Field id="rate" label="Discount rate (per year)" suffix="%" value={s.rate} onChange={(v) => set("rate", v)} />
        </div>
        <div>
          <span className="label">Cash flow at the end of each year</span>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {raw.map((v, i) => <Field key={i} id={`cf${i}`} label={`Year ${i + 1}`} prefix="$" value={v} onChange={(x) => setFlow(i, x)} />)}
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" className="btn-ghost !py-2" disabled={raw.length >= MAX} onClick={() => set("cf", [...raw, raw[raw.length - 1] ?? "0"].join(","))}>+ Add year</button>
            <button type="button" className="btn-ghost !py-2" disabled={raw.length <= 1} onClick={() => set("cf", raw.slice(0, -1).join(","))}>− Remove last</button>
          </div>
          <p className="mt-2 text-xs subtle">Use a minus sign for years with net costs, e.g. −2000.</p>
        </div>
      </form>
      <ResultCard error={error} label="Net present value (NPV)" value={usd(value)}>
        <p className={`mt-1 text-sm font-semibold ${value >= 0 ? "text-[var(--color-brand-600)]" : "text-red-700"}`} data-testid="verdict">
          {value > 0 ? "Positive: the investment beats your required return." : value < 0 ? "Negative: it falls short of your required return." : "Zero: it exactly earns your required return."}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k="IRR" v={r === null ? "n/a" : `${(r * 100).toFixed(2)}%`} />
          <Stat k="Profitability index" v={init > 0 ? (pvSum / init).toFixed(3) : "n/a"} />
          <Stat k="Payback period" v={yrs(payback(init, flows))} />
          <Stat k="Discounted payback" v={yrs(payback(init, flows, rate))} />
        </dl>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm" data-testid="npv-table">
            <thead><tr className="text-left subtle"><th className="py-1 font-medium">Year</th><th className="py-1 text-right font-medium">Cash flow</th><th className="py-1 text-right font-medium">Present value</th><th className="py-1 text-right font-medium">Cumulative</th></tr></thead>
            <tbody>
              <tr className="border-t border-[var(--border)]"><td className="py-1.5">0</td><td className="py-1.5 text-right tabular-nums">{usd(-init)}</td><td className="py-1.5 text-right tabular-nums">{usd(-init)}</td><td className="py-1.5 text-right tabular-nums">{usd(-init)}</td></tr>
              {flows.map((c, i) => { cum += pvs[i]; return (
                <tr key={i} className="border-t border-[var(--border)]"><td className="py-1.5">{i + 1}</td><td className="py-1.5 text-right tabular-nums">{usd(c)}</td><td className="py-1.5 text-right tabular-nums">{usd(pvs[i])}</td><td className="py-1.5 text-right tabular-nums">{usd(cum)}</td></tr>
              ); })}
            </tbody>
          </table>
        </div>
        <button type="button" className="mt-3 text-sm font-semibold text-[var(--color-brand-600)]" onClick={() => { let c = -init; downloadCsv("npv.csv", ["Year", "Cash flow", "Present value", "Cumulative PV"], [[0, -init, -init, -init], ...flows.map((f, i) => { c += pvs[i]; return [i + 1, f, +pvs[i].toFixed(2), +c.toFixed(2)]; })]); }}>Download CSV</button>
      </ResultCard>
    </div>
  );
}
