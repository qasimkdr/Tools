"use client";
import { Field, ResultCard, Segmented, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const FREQ: Record<string, number> = { daily: 365, monthly: 12, quarterly: 4, annually: 1 };
const CUR: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", INR: "₹" };

export default function CdCalculator() {
  const [s, set] = useUrlState({ p: "10000", r: "4.25", rt: "apy", n: "18", tu: "months", c: "daily", tax: "", pen: "3", cur: "USD" });
  const cur = s.cur in CUR ? s.cur : "USD";
  const money = (x: number) => x.toLocaleString(cur === "INR" ? "en-IN" : "en-US", { style: "currency", currency: cur });
  const P = Number(s.p), rate = Number(s.r) / 100, nPer = FREQ[s.c] ?? 365;
  const years = s.tu === "years" ? Number(s.n) : Number(s.n) / 12;
  // Work in APY (effective annual yield); convert a nominal APR with the chosen compounding.
  const apy = s.rt === "apr" ? (1 + rate / nPer) ** nPer - 1 : rate;
  const apr = s.rt === "apr" ? rate : nPer * ((1 + rate) ** (1 / nPer) - 1);
  const value = (t: number) => P * (1 + apy) ** t;
  const err = !(P > 0) ? "Enter the deposit amount." : !(rate >= 0 && rate < 1) ? "Enter an interest rate between 0% and 100%." : !(years > 0 && years <= 30) ? "Enter a term of up to 30 years." : null;
  const fv = value(years), interest = fv - P;
  const tax = Number(s.tax) / 100;
  const penMonths = Number(s.pen) || 0, penalty = P * ((1 + apy) ** (penMonths / 12) - 1);
  const months = Math.round(years * 12);
  const rows = Array.from({ length: Math.min(months, 360) }, (_, i) => { const v = value((i + 1) / 12); return [i + 1, v - P, v] as const; });

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="CD calculator">
          <div className="grid grid-cols-2 gap-3">
            <Field id="p" label="Deposit" prefix={CUR[cur]} value={s.p} onChange={(v) => set("p", v)} min={0} />
            <Field id="r" label="Interest rate" suffix="%" value={s.r} onChange={(v) => set("r", v)} min={0} />
            <Field id="n" label="Term" value={s.n} onChange={(v) => set("n", v)} min={0} />
            <Segmented label="Term in" value={s.tu === "years" ? "years" : "months"} onChange={(v) => set("tu", v)} options={[{ id: "months", label: "Months" }, { id: "years", label: "Years" }]} />
          </div>
          <Segmented label="The rate is" value={s.rt === "apr" ? "apr" : "apy"} onChange={(v) => set("rt", v)} options={[{ id: "apy", label: "APY (yield)" }, { id: "apr", label: "APR / nominal rate" }]} />
          <Segmented label="Compounding" value={s.c in FREQ ? s.c : "daily"} onChange={(v) => set("c", v)} options={[{ id: "daily", label: "Daily" }, { id: "monthly", label: "Monthly" }, { id: "quarterly", label: "Quarterly" }, { id: "annually", label: "Yearly" }]} />
          <div className="grid grid-cols-3 gap-3">
            <Field id="tax" label="Tax rate (optional)" suffix="%" value={s.tax} onChange={(v) => set("tax", v)} min={0} />
            <Field id="pen" label="Early penalty" suffix="months" value={s.pen} onChange={(v) => set("pen", v)} min={0} hint="of interest" />
            <div><label htmlFor="cur" className="label">Currency</label>
              <select id="cur" className="field" value={cur} onChange={(e) => set("cur", e.target.value)}>{Object.keys(CUR).map((k) => <option key={k}>{k}</option>)}</select></div>
          </div>
        </form>
        <ResultCard label="Value at maturity" error={err} value={err ? "–" : money(fv)}>
          {!err && <>
            <p className="mt-1 text-sm muted">Interest earned <strong data-testid="interest">{money(interest)}</strong> over {months} months</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="APY" v={<span data-testid="apy">{(apy * 100).toFixed(3)}%</span>} />
              <Stat k={`APR (${s.c in FREQ ? s.c : "daily"} compounding)`} v={`${(apr * 100).toFixed(3)}%`} />
              <Stat k="Total return" v={`${((interest / P) * 100).toFixed(2)}%`} />
              <Stat k="Interest per month (avg)" v={money(interest / months)} />
              {tax > 0 && <Stat k={`Interest after ${s.tax}% tax`} v={<span data-testid="after-tax">{money(interest * (1 - tax))}</span>} />}
              {penMonths > 0 && <Stat k={`Early withdrawal penalty (${penMonths} mo interest)`} v={<span data-testid="penalty">{money(penalty)}</span>} />}
            </dl>
            <p className="mt-4 text-xs subtle">Assumes the rate stays fixed and interest stays in the CD until maturity. Penalty rules vary by bank; check your account terms.</p>
          </>}
        </ResultCard>
      </div>
      {!err && (
        <details>
          <summary className="cursor-pointer text-sm font-semibold">Month-by-month growth ({months} months)</summary>
          <button type="button" className="btn-ghost mt-3 text-sm" onClick={() => downloadCsv("cd-growth.csv", ["Month", "Interest to date", "Balance"], rows.map(([m, i, v]) => [m, i.toFixed(2), v.toFixed(2)]))}>Download CSV</button>
          <table className="mt-3 w-full max-w-lg text-sm">
            <thead><tr className="text-left subtle"><th className="py-1">Month</th><th>Interest to date</th><th>Balance</th></tr></thead>
            <tbody>{rows.map(([m, i, v]) => <tr key={m} className="border-t border-[var(--border)]"><td className="py-1">{m}</td><td>{money(i)}</td><td>{money(v)}</td></tr>)}</tbody>
          </table>
        </details>
      )}
    </div>
  );
}
