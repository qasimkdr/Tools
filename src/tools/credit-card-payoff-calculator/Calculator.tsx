"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { fmtMonths, minPayment, paymentFor, simulate } from "@/lib/cardPayoff";

type Mode = "fixed" | "target" | "minimum";

export default function CreditCardPayoffCalculator() {
  const [s, set] = useUrlState({ mode: "fixed", bal: "5000", apr: "22", pay: "200", months: "24", rule: "pi", pct: "1", floor: "25" });
  const mode = (["fixed", "target", "minimum"].includes(s.mode) ? s.mode : "fixed") as Mode;
  const bal = Number(s.bal), apr = Number(s.apr) / 100, n = Math.floor(Number(s.months));
  const rule = { kind: s.rule === "pct" ? "pct" : "pctPlusInterest", pct: Number(s.pct) / 100, floor: Number(s.floor) || 0 } as const;
  const minFn = minPayment(rule);
  const minRes = simulate(bal, apr, minFn);
  const fixedPay = mode === "target" ? paymentFor(bal, apr, n) : Number(s.pay);
  const res = mode === "minimum" ? minRes : simulate(bal, apr, () => fixedPay);
  const p36 = paymentFor(bal, apr, 36), r36 = simulate(bal, apr, () => p36);
  const error = !(bal > 0) ? "Enter your card balance." : !(apr >= 0 && apr < 1) || s.apr === "" ? "Enter the card's APR (for example 22)." : mode === "target" && !(n >= 1 && n <= 600) ? "Enter a payoff time between 1 and 600 months." : mode === "fixed" && !(fixedPay > 0) ? "Enter your monthly payment." : null;
  const label = mode === "target" ? `Monthly payment to be debt-free in ${n} months` : "Time to pay off";
  const value = mode === "target" ? usd(fixedPay) : res.neverPaysOff ? "Never" : fmtMonths(res.months);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Credit card payoff calculator">
        <Segmented label="I want to" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "fixed", label: "Pay a fixed amount" }, { id: "target", label: "Be debt-free by…" }, { id: "minimum", label: "Pay the minimum" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="bal" label="Card balance" prefix="$" value={s.bal} onChange={(v) => set("bal", v)} min={0} />
          <Field id="apr" label="APR" suffix="%" value={s.apr} onChange={(v) => set("apr", v)} min={0} />
        </div>
        {mode === "fixed" && <Field id="pay" label="Monthly payment" prefix="$" value={s.pay} onChange={(v) => set("pay", v)} min={0} />}
        {mode === "target" && <Field id="months" label="Pay off in" suffix="months" value={s.months} onChange={(v) => set("months", v)} min={1} inputMode="numeric" />}
        <div>
          <span className="label">Your card&apos;s minimum payment rule (used for comparison)</span>
          <div className="grid grid-cols-3 gap-3">
            <select aria-label="Minimum payment type" className="field" value={s.rule === "pct" ? "pct" : "pi"} onChange={(e) => set("rule", e.target.value)}>
              <option value="pi">% + interest</option><option value="pct">% only</option>
            </select>
            <Field id="pct" label="Percent" suffix="%" value={s.pct} onChange={(v) => set("pct", v)} min={0} />
            <Field id="floor" label="At least" prefix="$" value={s.floor} onChange={(v) => set("floor", v)} min={0} />
          </div>
          <p className="mt-1 text-xs subtle">Many big issuers use 1% of the balance plus interest, with a $25–$35 floor; some use a flat 2–5%. Check your card agreement.</p>
        </div>
      </form>
      <ResultCard error={error} label={label} value={value}>
        {res.neverPaysOff && mode !== "minimum" && <p className="mt-2 text-sm text-red-700">This payment doesn&apos;t cover the monthly interest ({usd(bal * apr / 12)}), so the balance never goes down.</p>}
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {mode === "target" && <Stat k="Months" v={n} />}
          {mode === "minimum" && <Stat k="First minimum payment" v={usd(minRes.firstPayment)} />}
          <Stat k="Total interest" v={res.neverPaysOff ? "—" : usd(res.interest)} />
          <Stat k="Total paid" v={res.neverPaysOff ? "—" : usd(res.total)} />
          <Stat k="Monthly interest now" v={usd(bal * apr / 12)} />
        </dl>
        <table className="mt-5 w-full text-sm" data-testid="compare">
          <thead><tr className="text-left subtle"><th className="py-1 font-medium">Strategy</th><th className="py-1 text-right font-medium">Time</th><th className="py-1 text-right font-medium">Interest</th></tr></thead>
          <tbody>
            <tr className="border-t border-[var(--border)]"><td className="py-1.5">Minimum payments ({usd(minRes.firstPayment)} at first)</td><td className="py-1.5 text-right">{fmtMonths(minRes.months)}</td><td className="py-1.5 text-right tabular-nums">{minRes.neverPaysOff ? "—" : usd(minRes.interest)}</td></tr>
            <tr className="border-t border-[var(--border)]"><td className="py-1.5">3-year plan ({usd(p36)}/mo)</td><td className="py-1.5 text-right">3 yr 0 mo</td><td className="py-1.5 text-right tabular-nums">{usd(r36.interest)}</td></tr>
            {mode !== "minimum" && <tr className="border-t border-[var(--border)] font-semibold"><td className="py-1.5">Your plan ({usd(fixedPay)}/mo)</td><td className="py-1.5 text-right">{fmtMonths(res.months)}</td><td className="py-1.5 text-right tabular-nums">{res.neverPaysOff ? "—" : usd(res.interest)}</td></tr>}
          </tbody>
        </table>
        {!res.neverPaysOff && !minRes.neverPaysOff && mode !== "minimum" && minRes.interest > res.interest && <p className="mt-3 text-sm muted">Versus minimum payments, your plan saves <strong className="text-[var(--text)]">{usd(minRes.interest - res.interest)}</strong> in interest.</p>}
        <p className="mt-3 text-xs subtle">Assumes no new purchases, a constant APR and interest of APR ÷ 12 per month. Your statement shows the exact figures.</p>
      </ResultCard>
    </div>
  );
}
