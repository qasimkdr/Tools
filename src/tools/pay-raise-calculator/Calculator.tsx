"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function PayRaiseCalculator() {
  const [s, set] = useUrlState({ mode: "pct", type: "salary", cur: "60000", pct: "4", amt: "2500", nw: "63000", hpw: "40", infl: "", yrs: "5" });
  const hourly = s.type === "hourly";
  const hpw = Number(s.hpw) || 40, perYear = hourly ? hpw * 52 : 1; // annualise hourly pay
  const cur = Number(s.cur);
  const next = s.mode === "amt" ? cur + Number(s.amt) : s.mode === "find" ? Number(s.nw) : cur * (1 + Number(s.pct) / 100);
  const rate = cur > 0 ? next / cur - 1 : NaN;
  const err = !(cur > 0) ? "Enter your current pay." : !(next > 0) ? "Enter the raise or new pay." : null;
  const annualOld = cur * perYear, annualNew = next * perYear, diff = annualNew - annualOld;
  const infl = Number(s.infl), real = s.infl.trim() !== "" ? (1 + rate) / (1 + infl / 100) - 1 : NaN;
  const yrs = Math.min(40, Math.max(1, Math.round(Number(s.yrs) || 5)));

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Pay raise calculator">
          <Segmented label="I know the" value={s.mode === "amt" || s.mode === "find" ? s.mode : "pct"} onChange={(v) => set("mode", v)} options={[{ id: "pct", label: "Raise %" }, { id: "amt", label: "Raise $" }, { id: "find", label: "New pay" }]} />
          <Segmented label="Pay type" value={hourly ? "hourly" : "salary"} onChange={(v) => set("type", v)} options={[{ id: "salary", label: "Annual salary" }, { id: "hourly", label: "Hourly wage" }]} />
          <div className="grid grid-cols-2 gap-3">
            <Field id="cur" label={hourly ? "Current hourly wage" : "Current salary"} prefix="$" value={s.cur} onChange={(v) => set("cur", v)} min={0} />
            {s.mode === "amt" ? <Field id="amt" label={hourly ? "Raise per hour" : "Raise per year"} prefix="$" value={s.amt} onChange={(v) => set("amt", v)} />
              : s.mode === "find" ? <Field id="nw" label={hourly ? "New hourly wage" : "New salary"} prefix="$" value={s.nw} onChange={(v) => set("nw", v)} min={0} />
              : <Field id="pct" label="Raise" suffix="%" value={s.pct} onChange={(v) => set("pct", v)} />}
            {hourly && <Field id="hpw" label="Hours per week" value={s.hpw} onChange={(v) => set("hpw", v)} min={0} />}
            <Field id="infl" label="Inflation (optional)" suffix="%" value={s.infl} onChange={(v) => set("infl", v)} hint="Compare with the yearly CPI rate" />
          </div>
        </form>
        <ResultCard label={s.mode === "find" ? "Your raise" : hourly ? "New hourly wage" : "New salary"} error={err}
          value={err ? "–" : s.mode === "find" ? `${(rate * 100).toFixed(2)}%` : usd(next)}>
          {!err && <>
            <p className="mt-1 text-sm muted">{s.mode === "find" ? `${usd(next - cur)} more ${hourly ? "per hour" : "per year"}` : `+${usd(next - cur)} ${hourly ? "per hour" : "per year"} · ${(rate * 100).toFixed(2)}% raise`}</p>
            <table className="mt-4 w-full text-sm" data-testid="periods">
              <thead><tr className="text-left subtle"><th className="py-1">Gross pay</th><th>Before</th><th>After</th><th>Increase</th></tr></thead>
              <tbody>
                {([["Year", 1], ["Month", 12], ["Every 2 weeks", 26], ["Week", 52], ...(hourly ? [] : [["Hour (40 h/wk)", 2080]])] as [string, number][]).map(([k, d]) => (
                  <tr key={k} className="border-t border-[var(--border)]"><td className="py-1">{k}</td><td>{usd(annualOld / d)}</td><td>{usd(annualNew / d)}</td><td>{usd(diff / d)}</td></tr>
                ))}
                {hourly && <tr className="border-t border-[var(--border)]"><td className="py-1">Hour</td><td>{usd(cur)}</td><td>{usd(next)}</td><td>{usd(next - cur)}</td></tr>}
              </tbody>
            </table>
            {Number.isFinite(real) && <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Real raise after inflation" v={<span data-testid="real">{(real * 100).toFixed(2)}%</span>} />
              <Stat k="Buying power" v={real >= 0 ? "Up" : "Down"} />
            </dl>}
            <p className="mt-4 text-xs subtle">Gross (before-tax) pay. Taxes and deductions take a share of the raise; see the paycheck calculator for take-home pay.</p>
          </>}
        </ResultCard>
      </div>
      {!err && rate > 0 && (
        <div>
          <div className="flex flex-wrap items-end gap-3">
            <h2 className="text-base font-semibold">If you got the same {(rate * 100).toFixed(2)}% raise every year</h2>
            <div className="w-28"><Field id="yrs" label="Years" value={s.yrs} onChange={(v) => set("yrs", v)} min={1} inputMode="numeric" /></div>
          </div>
          <table className="mt-3 w-full max-w-lg text-sm">
            <thead><tr className="text-left subtle"><th className="py-1">Year</th><th>Annual pay</th><th>Total increase</th></tr></thead>
            <tbody>
              {Array.from({ length: yrs }, (_, i) => annualOld * (1 + rate) ** (i + 1)).map((v, i) => (
                <tr key={i} className="border-t border-[var(--border)]"><td className="py-1">{i + 1}</td><td>{usd(v)}</td><td>{usd(v - annualOld)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
