"use client";
import { useMemo, useState } from "react";
import { Field, ResultCard, Segmented, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { payment, paymentsNeeded, schedule, usd } from "@/lib/money";
import { addMonths, fmtDate, startOfDay } from "@/lib/date";

const FREQ = { monthly: 12, biweekly: 26, weekly: 52 } as const;
type Freq = keyof typeof FREQ;
const DEFAULTS = { mode: "payment", amount: "20000", rate: "6", years: "5", pay: "500", extra: "0", freq: "monthly" };

export default function PaymentCalculator() {
  const [s, set] = useUrlState(DEFAULTS);
  const [showAll, setShowAll] = useState(false);
  const P = Number(s.amount), apr = Number(s.rate) / 100, perYear = FREQ[(s.freq as Freq)] ?? 12;
  const r = apr / perYear, extra = Math.max(0, Number(s.extra) || 0);
  const mode = s.mode === "term" ? "term" : "payment";

  const calc = useMemo(() => {
    if (!(P > 0) || !(apr >= 0) || apr > 1) return { error: "Enter a loan amount above 0 and a rate between 0% and 100%." };
    let n: number, pmt: number;
    if (mode === "payment") {
      n = Math.round(Number(s.years) * perYear);
      if (!(n > 0) || n > 50 * perYear) return { error: "Enter a term between 1 period and 50 years." };
      pmt = payment(P, r, n);
    } else {
      pmt = Number(s.pay);
      const need = paymentsNeeded(P, r, pmt);
      if (!Number.isFinite(need)) return { error: `A payment of ${usd(pmt)} doesn't cover the ${usd(P * r)} of interest charged each period, so the balance would never go down. Increase the payment.` };
      n = Math.ceil(need - 1e-9);
    }
    const base = schedule(P, r, n, 0);
    const rows = extra > 0 ? schedule(P, r, n, extra) : base;
    const interest = rows.reduce((t, x) => t + x.interest, 0);
    const baseInterest = base.reduce((t, x) => t + x.interest, 0);
    return { pmt, n, rows, interest, total: P + interest, saved: baseInterest - interest, savedPeriods: base.length - rows.length };
  }, [P, apr, r, perYear, mode, s.years, s.pay, extra]);

  const unit = s.freq === "monthly" ? "month" : s.freq === "biweekly" ? "2 weeks" : "week";
  const payoff = "rows" in calc && calc.rows ? (s.freq === "monthly" ? addMonths(startOfDay(new Date()), calc.rows.length) : new Date(Date.now() + calc.rows.length * (s.freq === "weekly" ? 7 : 14) * 864e5)) : null;
  const byYear = useMemo(() => {
    if (!("rows" in calc) || !calc.rows) return [];
    const out: { year: number; interest: number; principal: number; balance: number }[] = [];
    calc.rows.forEach((row, i) => {
      const y = Math.floor(i / perYear);
      out[y] ||= { year: y + 1, interest: 0, principal: 0, balance: 0 };
      out[y].interest += row.interest; out[y].principal += row.principal; out[y].balance = row.balance;
    });
    return out;
  }, [calc, perYear]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Payment calculator">
        <Segmented label="Calculate" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "payment", label: "Payment amount" }, { id: "term", label: "Payoff time" }]} />
        <Field id="amount" label="Loan amount" prefix="$" value={s.amount} onChange={(v) => set("amount", v)} min={0} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="rate" label="Interest rate (yearly)" suffix="%" value={s.rate} onChange={(v) => set("rate", v)} min={0} />
          {mode === "payment"
            ? <Field id="years" label="Loan term" suffix="years" value={s.years} onChange={(v) => set("years", v)} min={0} />
            : <Field id="pay" label={`Payment per ${unit}`} prefix="$" value={s.pay} onChange={(v) => set("pay", v)} min={0} />}
        </div>
        <Segmented label="Payment frequency" value={s.freq as Freq} onChange={(v) => set("freq", v)} options={[{ id: "monthly", label: "Monthly" }, { id: "biweekly", label: "Every 2 weeks" }, { id: "weekly", label: "Weekly" }]} />
        <Field id="extra" label={`Extra payment per ${unit} (optional)`} prefix="$" value={s.extra} onChange={(v) => set("extra", v)} min={0} hint="Goes straight to principal." />
      </form>

      <div className="space-y-4">
        <ResultCard error={"error" in calc ? calc.error : null}
          label={mode === "payment" ? (extra > 0 ? `Payment per ${unit} (incl. ${usd(extra)} extra)` : `Payment per ${unit}`) : "Time to pay off"}
          value={"pmt" in calc && calc.pmt !== undefined ? (mode === "payment" ? usd(calc.pmt + extra) : `${Math.floor(calc.rows!.length / perYear)} yr ${calc.rows!.length % perYear} ${s.freq === "monthly" ? "mo" : "payments"}`) : ""}>
          {"rows" in calc && calc.rows && (
            <>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <Stat k="Total interest" v={usd(calc.interest!)} />
                <Stat k="Total paid" v={usd(calc.total!)} />
                <Stat k="Payments" v={calc.rows.length.toLocaleString()} />
                <Stat k="Payoff (if started today)" v={payoff ? fmtDate(payoff) : "—"} />
              </dl>
              {extra > 0 && calc.saved! > 0.5 && (
                <p className="mt-4 rounded-xl bg-[var(--color-brand-50)] px-4 py-3 text-sm text-[var(--color-brand-700)]">
                  Paying {usd(extra)} extra saves <strong>{usd(calc.saved!)}</strong> in interest and finishes <strong>{calc.savedPeriods} payments early</strong>.
                </p>
              )}
              <div className="mt-5" aria-label="Principal versus interest">
                <div className="flex h-3 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <div className="bg-[var(--color-brand-600)]" style={{ width: `${(P / calc.total!) * 100}%` }} />
                  <div className="bg-amber-400" style={{ width: `${(calc.interest! / calc.total!) * 100}%` }} />
                </div>
                <p className="mt-2 flex justify-between text-xs muted"><span>Principal {usd(P, 0)} ({Math.round((P / calc.total!) * 100)}%)</span><span>Interest {usd(calc.interest!, 0)} ({Math.round((calc.interest! / calc.total!) * 100)}%)</span></p>
              </div>
            </>
          )}
        </ResultCard>

        {byYear.length > 0 && (
          <div className="rounded-2xl bg-[var(--surface)] p-5 ring-1 ring-[var(--border)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">Amortization schedule (by year)</h3>
              <div className="flex gap-2">
                <button type="button" className="btn-ghost !py-1.5" onClick={() => "rows" in calc && calc.rows && downloadCsv("loan-schedule.csv", ["Payment #", "Payment", "Interest", "Principal", "Balance"], calc.rows.map((x) => [x.period, x.payment.toFixed(2), x.interest.toFixed(2), x.principal.toFixed(2), x.balance.toFixed(2)]))}>Download CSV</button>
                <button type="button" className="btn-ghost !py-1.5" onClick={() => window.print()}>Print</button>
              </div>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm tabular-nums">
                <thead><tr className="text-left subtle"><th className="py-1.5 pr-3 font-medium">Year</th><th className="pr-3 font-medium">Interest</th><th className="pr-3 font-medium">Principal</th><th className="font-medium">Balance</th></tr></thead>
                <tbody>
                  {(showAll ? byYear : byYear.slice(0, 6)).map((y) => (
                    <tr key={y.year} className="border-t border-[var(--border)]"><td className="py-1.5 pr-3">{y.year}</td><td className="pr-3">{usd(y.interest)}</td><td className="pr-3">{usd(y.principal)}</td><td>{usd(y.balance)}</td></tr>
                  ))}
                </tbody>
              </table>
              {byYear.length > 6 && <button type="button" className="mt-2 text-sm font-medium text-[var(--color-brand-600)]" onClick={() => setShowAll((v) => !v)}>{showAll ? "Show fewer years" : `Show all ${byYear.length} years`}</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
