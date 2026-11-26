"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { STATUS_LABEL, type Status } from "@/lib/incomeTax";
import { defaultLlc, sCorp, QBI_THRESHOLD_2026 } from "@/lib/llcTax";

const usd = (x: number) => (Number.isFinite(x) ? x.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "–");
const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

export default function LlcTaxCalculator() {
  const [s, set] = useUrlState({ profit: "90000", share: "100", st: "single", other: "0", salary: "50000", state: "0", view: "llc" });
  const st = (["single", "mfj", "hoh", "mfs"].includes(s.st) ? s.st : "single") as Status;
  const share = Math.max(0, Math.min(100, Number(s.share) || 0)) / 100;
  const profit = (Number(s.profit) || 0) * share, other = Number(s.other) || 0, stateRate = Number(s.state) || 0, salary = Number(s.salary) || 0;
  const err = !(Number(s.profit) > 0) ? "Enter the LLC's net profit (income minus business expenses)." : !(share > 0) ? "Enter your ownership share (1–100%)." : null;
  const a = err ? null : defaultLlc({ profit, status: st, otherIncome: other, stateRate });
  const b = err ? null : sCorp({ profit, salary, status: st, otherIncome: other, stateRate });
  const sc = s.view === "scorp";
  const r = sc ? b : a;
  const saving = a && b ? a.total - b.total : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="LLC tax calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="profit" label="LLC net profit for 2026" prefix="$" value={s.profit} onChange={(v) => set("profit", v)} min={0} hint="Revenue minus business expenses" />
          <Field id="share" label="Your ownership share" suffix="%" value={s.share} onChange={(v) => set("share", v)} min={0} hint="100% for a single-member LLC" />
        </div>
        <div>
          <label htmlFor="st" className="label">Filing status</label>
          <select id="st" className="field" value={st} onChange={(e) => set("st", e.target.value)}>
            {(Object.keys(STATUS_LABEL) as Status[]).map((k) => <option key={k} value={k}>{STATUS_LABEL[k]}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="other" label="Other taxable income" prefix="$" value={s.other} onChange={(v) => set("other", v)} min={0} hint="E.g. a spouse's wages" />
          <Field id="state" label="State income tax (optional)" suffix="%" value={s.state} onChange={(v) => set("state", v)} min={0} hint="Flat estimate" />
        </div>
        <Segmented label="Show" value={sc ? "scorp" : "llc"} onChange={(v) => set("view", v)} options={[{ id: "llc", label: "Default LLC" }, { id: "scorp", label: "With S-corp election" }]} />
        {sc && <Field id="salary" label="Your S-corp salary" prefix="$" value={s.salary} onChange={(v) => set("salary", v)} min={0} hint="Must be a reasonable wage for your work" />}
      </form>
      <ResultCard error={err} label={sc ? "Estimated 2026 federal tax with an S-corp" : "Estimated 2026 federal tax on your LLC profit"} value={r ? <span data-testid="total">{usd(r.total - r.stateTax)}</span> : "–"}>
        {r && a && b && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            {sc
              ? <Stat k="Payroll tax on salary (15.3%)" v={<span data-testid="payroll">{usd(r.payrollTax)}</span>} />
              : <Stat k="Self-employment tax (15.3%)" v={<span data-testid="se">{usd(r.seTax)}</span>} />}
            <Stat k="Federal income tax" v={<span data-testid="income">{usd(r.incomeTax)}</span>} />
            <Stat k="QBI deduction (20%)" v={r.qbiLimited ? "limits apply" : usd(r.qbiDeduction)} />
            <Stat k="Taxable income" v={usd(r.taxableIncome)} />
            {r.addlMedicare > 0 && <Stat k="Additional Medicare (0.9%)" v={usd(r.addlMedicare)} />}
            {stateRate > 0 && <Stat k="State income tax (estimate)" v={usd(r.stateTax)} />}
            <Stat k="Effective rate on profit" v={pct(r.effective)} />
            <Stat k="Quarterly estimated payment" v={usd(r.total / 4)} />
          </dl>
          <h2 className="mt-5 text-sm font-semibold">Default LLC vs S-corp election</h2>
          <table className="mt-2 w-full text-sm" data-testid="compare">
            <thead><tr className="text-left subtle"><th className="py-1"></th><th>Default LLC</th><th>S-corp ({usd(Math.min(salary, profit / 1.0765))} salary)</th></tr></thead>
            <tbody>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Self-employment / payroll tax</td><td>{usd(a.seTax)}</td><td>{usd(b.payrollTax)}</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Income tax</td><td>{usd(a.incomeTax)}</td><td>{usd(b.incomeTax)}</td></tr>
              {(a.addlMedicare > 0 || b.addlMedicare > 0) && <tr className="border-t border-[var(--border)]"><td className="py-1">Additional Medicare</td><td>{usd(a.addlMedicare)}</td><td>{usd(b.addlMedicare)}</td></tr>}
              {stateRate > 0 && <tr className="border-t border-[var(--border)]"><td className="py-1">State (estimate)</td><td>{usd(a.stateTax)}</td><td>{usd(b.stateTax)}</td></tr>}
              <tr className="border-t border-[var(--border)] font-semibold"><td className="py-1">Total</td><td>{usd(a.total)}</td><td>{usd(b.total)}</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">You keep</td><td>{usd(a.takeHome)}</td><td>{usd(b.takeHome)}</td></tr>
            </tbody>
          </table>
          <p className="mt-2 text-sm" data-testid="saving">{saving > 0 ? <>An S-corp with this salary could save about <strong>{usd(saving)}</strong> a year in federal tax, before the extra costs of payroll, a separate tax return and state fees.</> : <>At this salary, an S-corp would not lower your federal tax.</>}</p>
          {(a.qbiLimited || b.qbiLimited) && <p className="mt-2 text-xs text-amber-800">Taxable income is above the 2026 QBI threshold ({usd(QBI_THRESHOLD_2026[st])}), where wage, property and service-business limits apply. The QBI deduction is left out, so the estimate is on the high side.</p>}
          <p className="mt-3 text-xs subtle">Federal estimate for 2026 using IRS and SSA figures; assumes the standard deduction and no other deductions or credits. Not tax advice: ask a CPA before choosing an S-corp election.</p>
        </>}
      </ResultCard>
    </div>
  );
}
