"use client";
import { Field, ResultCard, Segmented, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const N: Record<string, number> = { annually: 1, semiannually: 2, quarterly: 4, monthly: 12, daily: 365, continuous: Infinity };
const usd = (x: number) => x.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function InterestCalculator() {
  const [s, set] = useUrlState({ type: "compound", p: "10000", r: "5", y: "10", m: "0", c: "monthly", pmt: "0" });
  const P = Number(s.p), r = Number(s.r) / 100, years = (Number(s.y) || 0) + (Number(s.m) || 0) / 12;
  const compound = s.type !== "simple";
  const n = N[s.c] ?? 12, pmt = compound ? Number(s.pmt) || 0 : 0;
  const err = !(P >= 0) || !(P > 0 || pmt > 0) ? "Enter a principal or a monthly contribution." : !(r >= 0 && r <= 1) ? "Enter a rate between 0% and 100%." : !(years > 0 && years <= 100) ? "Enter a time of up to 100 years." : null;
  // Equivalent monthly growth factor for the chosen compounding (used for contributions and the table).
  const gMonth = n === Infinity ? Math.exp(r / 12) : (1 + r / n) ** (n / 12);
  const balanceAt = (t: number) => {
    if (!compound) return P * (1 + r * t);
    const lump = n === Infinity ? P * Math.exp(r * t) : P * (1 + r / n) ** (n * t);
    const months = Math.round(t * 12), i = gMonth - 1;
    const contrib = pmt > 0 ? (i > 0 ? pmt * ((gMonth ** months - 1) / i) : pmt * months) : 0; // deposits at the end of each month
    return lump + contrib;
  };
  const fv = balanceAt(years), deposits = P + pmt * Math.round(years * 12), interest = fv - deposits;
  const apy = compound ? (n === Infinity ? Math.exp(r) - 1 : (1 + r / n) ** n - 1) : r;
  const rows = Array.from({ length: Math.ceil(years) }, (_, k) => { const t = Math.min(k + 1, years); const b = balanceAt(t); const d = P + pmt * Math.round(t * 12); return [k + 1, d, b - d, b] as const; });

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Interest calculator">
          <Segmented label="Interest type" value={compound ? "compound" : "simple"} onChange={(v) => set("type", v)} options={[{ id: "compound", label: "Compound" }, { id: "simple", label: "Simple" }]} />
          <div className="grid grid-cols-2 gap-3">
            <Field id="p" label="Principal" prefix="$" value={s.p} onChange={(v) => set("p", v)} min={0} />
            <Field id="r" label="Annual interest rate" suffix="%" value={s.r} onChange={(v) => set("r", v)} min={0} />
            <Field id="y" label="Years" value={s.y} onChange={(v) => set("y", v)} min={0} inputMode="numeric" />
            <Field id="m" label="Months" value={s.m} onChange={(v) => set("m", v)} min={0} inputMode="numeric" />
          </div>
          {compound && <>
            <div><label htmlFor="c" className="label">Compounding</label>
              <select id="c" className="field" value={s.c in N ? s.c : "monthly"} onChange={(e) => set("c", e.target.value)}>
                {Object.keys(N).map((k) => <option key={k} value={k}>{k[0].toUpperCase() + k.slice(1)}</option>)}
              </select></div>
            <Field id="pmt" label="Monthly contribution (optional)" prefix="$" value={s.pmt} onChange={(v) => set("pmt", v)} min={0} hint="Added at the end of each month" />
          </>}
        </form>
        <ResultCard label="Final balance" error={err} value={err ? "–" : usd(fv)}>
          {!err && <>
            <p className="mt-1 text-sm muted">Total interest <strong data-testid="interest">{usd(interest)}</strong></p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Principal + deposits" v={usd(deposits)} />
              <Stat k={compound ? "Effective annual rate (APY)" : "Rate"} v={<span data-testid="apy">{(apy * 100).toFixed(3)}%</span>} />
              {compound && <Stat k="Simple interest instead" v={<span data-testid="simple">{usd(P * r * years)}</span>} />}
              <Stat k="Interest share of balance" v={`${fv > 0 ? ((interest / fv) * 100).toFixed(1) : "0"}%`} />
            </dl>
            <p className="mt-4 text-xs subtle">Assumes a fixed rate and no withdrawals, taxes or fees. For loans, this shows interest that accrues if nothing is repaid; amortizing loans charge less.</p>
          </>}
        </ResultCard>
      </div>
      {!err && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold">Year-by-year growth</h3>
            <button type="button" className="btn-ghost text-sm" onClick={() => downloadCsv("interest.csv", ["Year", "Deposits", "Interest", "Balance"], rows.map(([y, d, i, b]) => [y, d.toFixed(2), i.toFixed(2), b.toFixed(2)]))}>Download CSV</button>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full max-w-xl text-sm">
              <thead><tr className="text-left subtle"><th className="py-1">Year</th><th>Deposits</th><th>Interest earned</th><th>Balance</th></tr></thead>
              <tbody>{rows.slice(0, 100).map(([y, d, i, b]) => <tr key={y} className="border-t border-[var(--border)]"><td className="py-1">{y}</td><td>{usd(d)}</td><td>{usd(i)}</td><td>{usd(b)}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
