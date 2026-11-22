"use client";
import { useState } from "react";
import { Field, ResultCard, Segmented, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { payment, schedule, usd } from "@/lib/money";
import { addMonths, startOfDay } from "@/lib/date";

const DEFAULTS = { price: "400000", down: "20", dtype: "pct", rate: "6.5", years: "30", tax: "1.1", ins: "1500", pmi: "0.5", hoa: "0" };
const COLORS = { pi: "#0d6b5a", tax: "#3aa48d", ins: "#d97706", pmi: "#f2c98a", hoa: "#78716c" };

export default function MortgageCalculator() {
  const [s, set] = useUrlState(DEFAULTS);
  const [all, setAll] = useState(false);
  const price = Number(s.price), years = Math.round(Number(s.years)), rate = Number(s.rate) / 100;
  const down = s.dtype === "amt" ? Number(s.down) : (price * Number(s.down)) / 100;
  const loan = price - down, n = years * 12, r = rate / 12;
  const err = !(price > 0) ? "Enter the home price." : !(down >= 0 && down < price) ? "The down payment must be less than the price." : !(years >= 1 && years <= 50) ? "Enter a loan term of 1–50 years." : !(rate >= 0 && rate < 0.3) ? "Enter an interest rate between 0% and 30%." : null;
  const pi = err ? 0 : payment(loan, r, n);
  const tax = (price * (Number(s.tax) || 0)) / 100 / 12, ins = (Number(s.ins) || 0) / 12, hoa = Number(s.hoa) || 0;
  const needsPmi = down / price < 0.2;
  const rows = err ? [] : schedule(loan, r, n);
  const m80 = rows.findIndex((x) => x.balance <= price * 0.8) + 1, m78 = rows.findIndex((x) => x.balance <= price * 0.78) + 1;
  const pmiMonthly = needsPmi ? (loan * (Number(s.pmi) || 0)) / 100 / 12 : 0;
  const pmiMonths = needsPmi ? (m78 > 0 ? m78 - 1 : Math.ceil(n / 2)) : 0;
  const total = pi + tax + ins + pmiMonthly + hoa;
  const interest = rows.reduce((t, x) => t + x.interest, 0);
  const today = startOfDay(new Date());
  const parts = [{ k: "Principal & interest", v: pi, c: COLORS.pi }, { k: "Property tax", v: tax, c: COLORS.tax }, { k: "Insurance", v: ins, c: COLORS.ins }, { k: "PMI", v: pmiMonthly, c: COLORS.pmi }, { k: "HOA", v: hoa, c: COLORS.hoa }].filter((p) => p.v > 0);
  const byYear = rows.reduce<{ y: number; interest: number; principal: number; balance: number }[]>((acc, x, i) => { const y = Math.floor(i / 12); acc[y] ||= { y: y + 1, interest: 0, principal: 0, balance: 0 }; acc[y].interest += x.interest; acc[y].principal += x.principal; acc[y].balance = x.balance; return acc; }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="Mortgage calculator">
          <Field id="price" label="Home price" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
          <div className="grid grid-cols-[1fr_auto] items-end gap-3">
            <Field id="down" label="Down payment" prefix={s.dtype === "amt" ? "$" : undefined} suffix={s.dtype === "amt" ? undefined : "%"} value={s.down} onChange={(v) => set("down", v)} min={0} />
            <Segmented label="as" value={s.dtype === "amt" ? "amt" : "pct"} onChange={(v) => set("dtype", v)} options={[{ id: "pct", label: "%" }, { id: "amt", label: "$" }]} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field id="rate" label="Interest rate" suffix="%" value={s.rate} onChange={(v) => set("rate", v)} min={0} />
            <div><span className="label">Term</span><div className="flex gap-1">{["15", "20", "30"].map((y) => <button key={y} type="button" className="chip flex-1" aria-pressed={s.years === y} onClick={() => set("years", y)}>{y} yr</button>)}</div></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field id="tax" label="Property tax (per year)" suffix="% of price" value={s.tax} onChange={(v) => set("tax", v)} min={0} />
            <Field id="ins" label="Home insurance (per year)" prefix="$" value={s.ins} onChange={(v) => set("ins", v)} min={0} />
            <Field id="pmi" label="PMI rate (per year)" suffix="% of loan" value={s.pmi} onChange={(v) => set("pmi", v)} min={0} hint={needsPmi ? "Applies: down payment under 20%." : "Not needed at 20%+ down."} />
            <Field id="hoa" label="HOA dues (per month)" prefix="$" value={s.hoa} onChange={(v) => set("hoa", v)} min={0} />
          </div>
          <p className="text-xs subtle">Tax, insurance and PMI defaults are examples. Replace them with your local tax rate and real quotes.</p>
        </form>
        <ResultCard error={err} label="Estimated monthly payment" value={usd(total)}>
          <div className="mt-4 flex h-3 overflow-hidden rounded-full" aria-label="Payment breakdown">{parts.map((p) => <div key={p.k} style={{ width: `${(p.v / total) * 100}%`, background: p.c }} />)}</div>
          <ul className="mt-3 space-y-1.5 text-sm">{parts.map((p) => <li key={p.k} className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="size-2.5 rounded-full" style={{ background: p.c }} />{p.k}</span><span className="font-semibold tabular-nums">{usd(p.v)}</span></li>)}</ul>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Loan amount" v={usd(loan, 0)} />
            <Stat k="Total interest" v={usd(interest, 0)} />
            <Stat k="Payoff (if started now)" v={addMonths(today, n).toLocaleDateString("en-US", { month: "short", year: "numeric" })} />
            {needsPmi && m78 > 0 && <Stat k="PMI ends automatically" v={`${addMonths(today, m78).toLocaleDateString("en-US", { month: "short", year: "numeric" })} (78%)`} />}
            {needsPmi && m80 > 0 && <Stat k="Can request PMI removal" v={`${addMonths(today, m80).toLocaleDateString("en-US", { month: "short", year: "numeric" })} (80%)`} />}
            {needsPmi && <Stat k="Total PMI paid (approx.)" v={usd(pmiMonthly * pmiMonths, 0)} />}
          </dl>
        </ResultCard>
      </div>
      {byYear.length > 0 && (
        <div className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">Amortization by year</h3>
            <button type="button" className="btn-ghost !py-1.5" onClick={() => downloadCsv("mortgage-schedule.csv", ["Month", "Payment (P&I)", "Interest", "Principal", "Balance"], rows.map((x) => [x.period, x.payment.toFixed(2), x.interest.toFixed(2), x.principal.toFixed(2), x.balance.toFixed(2)]))}>Download CSV</button>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <thead><tr className="text-left subtle"><th className="py-1 pr-3 font-medium">Year</th><th className="pr-3 font-medium">Interest</th><th className="pr-3 font-medium">Principal</th><th className="font-medium">Balance</th></tr></thead>
              <tbody>{(all ? byYear : byYear.filter((_, i) => i < 5 || i % 5 === 4)).map((y) => <tr key={y.y} className="border-t border-[var(--border)]"><td className="py-1 pr-3">{y.y}</td><td className="pr-3">{usd(y.interest, 0)}</td><td className="pr-3">{usd(y.principal, 0)}</td><td>{usd(y.balance, 0)}</td></tr>)}</tbody>
            </table>
            <button type="button" className="mt-2 text-sm font-medium text-[var(--color-brand-600)]" onClick={() => setAll((v) => !v)}>{all ? "Show fewer years" : `Show all ${byYear.length} years`}</button>
          </div>
        </div>
      )}
    </div>
  );
}
