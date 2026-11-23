"use client";
import { Field, ResultCard, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { drawdown, sustainableWithdrawal } from "@/lib/drawdown";

const usd = (x: number, d = 0) => x.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: d, minimumFractionDigits: d });

export default function RetirementSavingsLastCalculator() {
  const [s, set] = useUrlState({ bal: "500000", w: "3000", ret: "5", inf: "3", target: "30" });
  const bal = Number(s.bal), w = Number(s.w), ret = Number(s.ret) / 100, inf = Number(s.inf) / 100, target = Math.min(60, Math.max(1, Math.round(Number(s.target) || 30)));
  const err = !(bal > 0) ? "Enter your retirement savings." : !(w > 0) ? "Enter how much you'll withdraw each month." : ret <= -1 || inf <= -1 ? "Check the return and inflation rates." : null;
  const r = err ? null : drawdown(bal, w, ret, inf);
  const safe = err ? NaN : sustainableWithdrawal(bal, ret, inf, target);
  const four = bal * 0.04 / 12;
  const label = r ? (r.depleted ? `${Math.floor(r.months / 12)} years, ${r.months % 12} months` : "100+ years") : "–";

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Retirement savings calculator">
          <div className="grid grid-cols-2 gap-3">
            <Field id="bal" label="Retirement savings" prefix="$" value={s.bal} onChange={(v) => set("bal", v)} min={0} />
            <Field id="w" label="Monthly withdrawal" prefix="$" value={s.w} onChange={(v) => set("w", v)} min={0} hint="After Social Security or pension income" />
            <Field id="ret" label="Annual investment return" suffix="%" value={s.ret} onChange={(v) => set("ret", v)} />
            <Field id="inf" label="Inflation (raise withdrawals yearly)" suffix="%" value={s.inf} onChange={(v) => set("inf", v)} />
            <Field id="target" label="Want it to last" suffix="years" value={s.target} onChange={(v) => set("target", v)} min={1} inputMode="numeric" />
          </div>
        </form>
        <ResultCard label="Your savings will last" error={err} value={label}>
          {r && <>
            <p className="mt-1 text-sm muted" data-testid="months">{r.depleted ? `Money runs out after ${r.months} monthly withdrawals` : `After 100 years you'd still have ${usd(r.end)}`}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k={`Monthly withdrawal that lasts ${target} years`} v={<span data-testid="safe">{usd(safe, 2)}</span>} />
              <Stat k="Total withdrawn" v={usd(r.withdrawn)} />
              <Stat k="First-year withdrawal rate" v={`${((w * 12 / bal) * 100).toFixed(2)}%`} />
              <Stat k="4% rule starting withdrawal" v={`${usd(four, 2)}/mo`} />
            </dl>
            <p className="mt-4 text-xs subtle">Assumes a steady return every year. Real markets vary, and a bad run of returns early in retirement can shorten how long money lasts, so plan with a margin and review yearly. Not financial advice.</p>
          </>}
        </ResultCard>
      </div>
      {r && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold">Year-by-year balance</h3>
            <button type="button" className="btn-ghost text-sm" onClick={() => downloadCsv("retirement-drawdown.csv", ["Year", "Start", "Growth", "Withdrawn", "End"], r.years.map((y) => [y.year, y.start.toFixed(2), y.growth.toFixed(2), y.withdrawn.toFixed(2), y.end.toFixed(2)]))}>Download CSV</button>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full max-w-2xl text-sm">
              <thead><tr className="text-left subtle"><th className="py-1">Year</th><th>Start</th><th>Growth</th><th>Withdrawn</th><th>End</th></tr></thead>
              <tbody>{r.years.slice(0, 60).map((y) => <tr key={y.year} className="border-t border-[var(--border)]"><td className="py-1">{y.year}</td><td>{usd(y.start)}</td><td>{usd(y.growth)}</td><td>{usd(y.withdrawn)}</td><td>{usd(y.end)}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
