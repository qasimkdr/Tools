"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { effectiveAnnual, growthRate, pct, rateFor, usd } from "@/lib/money";

const COMP = { "1": "Yearly", "4": "Quarterly", "12": "Monthly", "365": "Daily" } as const;
const DEFAULTS = { mode: "loan", amount: "20000", pay: "386.66", months: "60", start: "10000", end: "12000", years: "3", comp: "12" };

export default function InterestRateCalculator() {
  const [s, set] = useUrlState(DEFAULTS);
  const mode = s.mode === "savings" ? "savings" : "loan";
  let error: string | null = null, nominal = NaN, periodic = NaN, m = 12, extra: { k: string; v: string }[] = [];

  if (mode === "loan") {
    const P = Number(s.amount), pmt = Number(s.pay), n = Math.round(Number(s.months));
    if (!(P > 0 && pmt > 0 && n > 0)) error = "Enter a loan amount, payment and number of months above 0.";
    else if (pmt * n < P) error = `${n} payments of ${usd(pmt)} add up to ${usd(pmt * n)}, which is less than the ${usd(P)} borrowed. That would need a negative interest rate. Check the numbers.`;
    else {
      periodic = rateFor(P, pmt, n); nominal = periodic * 12; m = 12;
      extra = [{ k: "Total interest", v: usd(pmt * n - P) }, { k: "Total paid", v: usd(pmt * n) }];
      if (periodic >= 0.999) error = "That payment implies an interest rate above 1,000% a year. Check the numbers.";
    }
  } else {
    const a = Number(s.start), b = Number(s.end), y = Number(s.years); m = Number(s.comp) || 12;
    if (!(a > 0 && b > 0 && y > 0)) error = "Enter a starting balance, ending balance and number of years above 0.";
    else { nominal = growthRate(a, b, y, m); periodic = nominal / m; extra = [{ k: "Interest earned", v: usd(b - a) }, { k: "Total growth", v: pct(b / a - 1, 2) }]; }
  }
  const ear = effectiveAnnual(nominal, m);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Interest rate calculator">
        <Segmented label="I want the rate for" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "loan", label: "A loan" }, { id: "savings", label: "Savings / investment" }]} />
        {mode === "loan" ? (
          <>
            <Field id="amount" label="Loan amount (received)" prefix="$" value={s.amount} onChange={(v) => set("amount", v)} min={0} />
            <div className="grid grid-cols-2 gap-3">
              <Field id="pay" label="Monthly payment" prefix="$" value={s.pay} onChange={(v) => set("pay", v)} min={0} />
              <Field id="months" label="Number of payments" suffix="months" value={s.months} onChange={(v) => set("months", v)} min={1} inputMode="numeric" />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field id="start" label="Starting balance" prefix="$" value={s.start} onChange={(v) => set("start", v)} min={0} />
              <Field id="end" label="Ending balance" prefix="$" value={s.end} onChange={(v) => set("end", v)} min={0} />
            </div>
            <Field id="years" label="Time" suffix="years" value={s.years} onChange={(v) => set("years", v)} min={0} />
            <Segmented label="Compounding" value={s.comp as keyof typeof COMP} onChange={(v) => set("comp", v)} options={Object.entries(COMP).map(([id, label]) => ({ id: id as keyof typeof COMP, label }))} />
          </>
        )}
      </form>
      <ResultCard error={error} label="Interest rate (nominal, per year)" value={pct(nominal, 3)}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Effective annual rate" v={pct(ear, 3)} />
          <Stat k={`Rate per ${m === 12 ? "month" : m === 4 ? "quarter" : m === 365 ? "day" : "year"}`} v={pct(periodic, 4)} />
          {extra.map((x) => <Stat key={x.k} k={x.k} v={x.v} />)}
        </dl>
        <p className="mt-4 text-sm muted">
          {mode === "loan" ? "Loan payments compound monthly. The effective rate shows the true yearly cost." : `Assumes no deposits or withdrawals, compounded ${COMP[s.comp as keyof typeof COMP]?.toLowerCase() ?? "monthly"}.`}
        </p>
      </ResultCard>
    </div>
  );
}
