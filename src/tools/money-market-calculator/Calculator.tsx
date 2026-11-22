"use client";
import { Field, ResultCard, Segmented, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";

const COMP = { daily: 365, monthly: 12 } as const;

export default function MoneyMarketCalculator() {
  const [s, set] = useUrlState({ dep: "10000", add: "200", rate: "4", rt: "apy", comp: "daily", yrs: "5", tax: "0" });
  const n = COMP[s.comp === "monthly" ? "monthly" : "daily"];
  const r = Number(s.rate) / 100;
  const apy = s.rt === "apr" ? (1 + r / n) ** n - 1 : r;
  const apr = s.rt === "apr" ? r : n * ((1 + apy) ** (1 / n) - 1);
  const g = (1 + apy) ** (1 / 12), months = Math.round(Number(s.yrs) * 12);
  const dep = Math.max(0, Number(s.dep) || 0), add = Number(s.add) || 0, tax = Math.min(100, Math.max(0, Number(s.tax) || 0)) / 100;
  const rows: { y: number; bal: number; contrib: number; int: number }[] = [];
  let bal = dep, contrib = dep, yInt = 0;
  for (let m = 1; m <= months; m++) {
    const i = bal * (g - 1); yInt += i; bal += i + add; contrib += add;
    if (m % 12 === 0 || m === months) { rows.push({ y: Math.ceil(m / 12), bal, contrib, int: yInt }); yInt = 0; }
  }
  const interest = bal - contrib;
  const error = !(months > 0 && months <= 600) ? "Enter a time between 1 month and 50 years." : !(r >= 0 && r < 0.5) ? "Enter a rate between 0% and 50%." : bal < 0 ? "Withdrawals are larger than the balance." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Money market calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="dep" label="Opening deposit" prefix="$" value={s.dep} onChange={(v) => set("dep", v)} min={0} />
          <Field id="add" label="Added each month" prefix="$" value={s.add} onChange={(v) => set("add", v)} hint="Negative for withdrawals" />
        </div>
        <div className="grid grid-cols-[1fr_auto] items-end gap-3">
          <Field id="rate" label="Interest rate" suffix="%" value={s.rate} onChange={(v) => set("rate", v)} min={0} />
          <Segmented label="as" value={s.rt === "apr" ? "apr" : "apy"} onChange={(v) => set("rt", v)} options={[{ id: "apy", label: "APY" }, { id: "apr", label: "APR" }]} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="yrs" label="Time" suffix="years" value={s.yrs} onChange={(v) => set("yrs", v)} min={0} />
          <Segmented label="Compounding" value={s.comp === "monthly" ? "monthly" : "daily"} onChange={(v) => set("comp", v)} options={[{ id: "daily", label: "Daily" }, { id: "monthly", label: "Monthly" }]} />
        </div>
        <Field id="tax" label="Tax rate on interest (optional)" suffix="%" value={s.tax} onChange={(v) => set("tax", v)} min={0} hint="Interest is usually taxed as ordinary income" />
      </form>
      <ResultCard error={error} label={`Balance after ${s.yrs} year${s.yrs === "1" ? "" : "s"}`} value={usd(bal)}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Interest earned" v={usd(interest)} />
          <Stat k="Total deposited" v={usd(contrib)} />
          {tax > 0 && <Stat k="Interest after tax" v={usd(interest * (1 - tax))} />}
          <Stat k={s.rt === "apr" ? "Equivalent APY" : "Equivalent APR"} v={`${((s.rt === "apr" ? apy : apr) * 100).toFixed(3)}%`} />
          <Stat k="First month's interest" v={usd(dep * (g - 1))} />
        </dl>
        <div className="mt-4 max-h-64 overflow-auto">
          <table className="w-full text-sm" data-testid="years">
            <thead><tr className="text-left subtle"><th className="py-1 font-medium">Year</th><th className="py-1 text-right font-medium">Interest</th><th className="py-1 text-right font-medium">Balance</th></tr></thead>
            <tbody>{rows.map((x) => <tr key={x.y} className="border-t border-[var(--border)]"><td className="py-1">{x.y}</td><td className="py-1 text-right tabular-nums">{usd(x.int)}</td><td className="py-1 text-right tabular-nums">{usd(x.bal)}</td></tr>)}</tbody>
          </table>
        </div>
        <button type="button" className="mt-3 text-sm font-semibold text-[var(--color-brand-600)]" onClick={() => downloadCsv("money-market.csv", ["Year", "Interest", "Total deposited", "Balance"], rows.map((x) => [x.y, x.int.toFixed(2), x.contrib.toFixed(2), x.bal.toFixed(2)]))}>Download CSV</button>
        <p className="mt-2 text-xs subtle">Assumes the rate stays the same; money market rates are variable and can change at any time.</p>
      </ResultCard>
    </div>
  );
}
