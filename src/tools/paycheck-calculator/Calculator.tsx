"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { STD_DEDUCTION, TAX_YEAR, fica, incomeTax, overtimeDeduction, type Filing } from "@/lib/pay";

const FREQ = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 } as const;
type Freq = keyof typeof FREQ;

export default function PaycheckCalculator() {
  const [s, set] = useUrlState({ rate: "25", hours: "40", ot: "0", freq: "biweekly", filing: "single", k401: "0", health: "0", state: "0" });
  const freq = (s.freq in FREQ ? s.freq : "biweekly") as Freq, n = FREQ[freq];
  const filing = (s.filing === "joint" ? "joint" : "single") as Filing;
  const rate = Number(s.rate), hours = Math.max(0, Number(s.hours) || 0), ot = Math.max(0, Number(s.ot) || 0);
  const gross = (rate * hours + rate * 1.5 * ot) * 52;
  const k401 = Math.max(0, Number(s.k401) || 0) * n, health = Math.max(0, Number(s.health) || 0) * n;
  const stateRate = Math.max(0, Number(s.state) || 0) / 100;
  const agi = gross - k401 - health;
  const fed = incomeTax(agi - STD_DEDUCTION[filing], filing);
  const { ss, medicare } = fica(gross - health);
  const state = Math.max(0, agi) * stateRate;
  const net = gross - k401 - health - fed.tax - ss - medicare - state;
  const otPremium = rate * 0.5 * Math.max(0, Math.min(ot, Math.max(0, hours + ot - 40))) * 52;
  const otDed = overtimeDeduction(otPremium, agi, filing);
  const otSaving = fed.tax - incomeTax(agi - STD_DEDUCTION[filing] - otDed, filing).tax;
  const error = !(rate > 0) ? "Enter an hourly wage above 0." : !(hours + ot > 0) ? "Enter the hours you work per week." : k401 + health >= gross ? "Pre-tax deductions can't exceed your pay." : stateRate > 0.15 ? "State tax rates are below 15%; enter a percentage like 4.5." : null;
  const rows: [string, number][] = [["Gross pay", gross], ["401(k) / pre-tax retirement", -k401], ["Health / FSA (pre-tax)", -health], ["Federal income tax", -fed.tax], ["Social Security (6.2%)", -ss], ["Medicare (1.45%)", -medicare], ["State income tax", -state]];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Paycheck calculator">
        <div className="grid grid-cols-3 gap-3">
          <Field id="rate" label="Hourly wage" prefix="$" value={s.rate} onChange={(v) => set("rate", v)} min={0} />
          <Field id="hours" label="Hours / week" value={s.hours} onChange={(v) => set("hours", v)} min={0} />
          <Field id="ot" label="Overtime / week" value={s.ot} onChange={(v) => set("ot", v)} min={0} hint="Paid at 1.5×" />
        </div>
        <div>
          <label htmlFor="freq" className="label">Pay frequency</label>
          <select id="freq" className="field" value={freq} onChange={(e) => set("freq", e.target.value)}>
            <option value="weekly">Weekly (52 a year)</option><option value="biweekly">Every two weeks (26)</option>
            <option value="semimonthly">Twice a month (24)</option><option value="monthly">Monthly (12)</option>
          </select>
        </div>
        <Segmented label="Filing status" value={filing} onChange={(v) => set("filing", v)} options={[{ id: "single", label: "Single" }, { id: "joint", label: "Married filing jointly" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="k401" label="401(k) per paycheck" prefix="$" value={s.k401} onChange={(v) => set("k401", v)} min={0} hint="Pre-tax; still pays FICA" />
          <Field id="health" label="Health / FSA per paycheck" prefix="$" value={s.health} onChange={(v) => set("health", v)} min={0} hint="Pre-tax (Section 125)" />
        </div>
        <Field id="state" label="State income tax rate (estimate)" suffix="%" value={s.state} onChange={(v) => set("state", v)} min={0} hint="0 for states with no wage income tax, e.g. TX, FL, WA. Use your state's rate otherwise." />
      </form>
      <ResultCard error={error} label={`Take-home pay per paycheck (${freq})`} value={usd(net / n)}>
        <table className="mt-4 w-full text-sm" data-testid="breakdown">
          <thead><tr className="text-left subtle"><th className="py-1 font-medium">{TAX_YEAR}</th><th className="py-1 text-right font-medium">Per paycheck</th><th className="py-1 text-right font-medium">Per year</th></tr></thead>
          <tbody>
            {rows.filter(([k, v]) => v !== 0 || k === "Federal income tax").map(([k, v]) => (
              <tr key={k} className="border-t border-[var(--border)]"><td className="py-1.5">{k}</td><td className="py-1.5 text-right tabular-nums">{usd(v / n)}</td><td className="py-1.5 text-right tabular-nums">{usd(v)}</td></tr>
            ))}
            <tr className="border-t-2 border-[var(--border)] font-semibold"><td className="py-1.5">Take-home pay</td><td className="py-1.5 text-right tabular-nums">{usd(net / n)}</td><td className="py-1.5 text-right tabular-nums">{usd(net)}</td></tr>
          </tbody>
        </table>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat k="Total tax rate" v={`${(((fed.tax + ss + medicare + state) / gross) * 100).toFixed(1)}%`} />
          <Stat k="Federal tax bracket" v={`${Math.round(fed.marginal * 100)}%`} />
          <Stat k="Take-home per hour" v={`${usd(net / 52 / (hours + ot))}`} />
        </dl>
        {otSaving > 0.5 && <p className="mt-4 text-sm muted" data-testid="ot-deduction">Overtime deduction: about {usd(otDed)} of your yearly overtime premium may be deductible ({TAX_YEAR}), which could lower your federal tax by about <strong className="text-[var(--text)]">{usd(otSaving)}</strong> when you file. Paychecks don&apos;t reflect it unless you adjust your W-4.</p>}
        <p className="mt-3 text-xs subtle">Estimate using {TAX_YEAR} IRS brackets and the standard deduction, assuming the same pay all year. Actual withholding depends on your W-4, credits and local taxes.</p>
      </ResultCard>
    </div>
  );
}
