"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { project } from "@/lib/invest";

const usd = (x: number) => (Number.isFinite(x) ? x.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "–");
// VOO since-inception average annual return (NAV), Vanguard fact sheet, data through Sept 30, 2025. Past performance is not a forecast.
const SINCE_INCEPTION = 14.89;
const PRESETS = [{ r: "6", label: "6%" }, { r: "8", label: "8%" }, { r: "10", label: "10%" }, { r: String(SINCE_INCEPTION), label: `${SINCE_INCEPTION}% (VOO since 2010)` }];

export default function VooCalculator() {
  const [s, set] = useUrlState({ initial: "10000", monthly: "500", years: "20", ret: "10", er: "0.03", infl: "3" });
  const initial = Number(s.initial) || 0, monthly = Number(s.monthly) || 0, years = Number(s.years), ret = Number(s.ret), er = Number(s.er) || 0, infl = Number(s.infl) || 0;
  const err = !(years > 0 && years <= 60) ? "Enter how many years you plan to invest (up to 60)." : !(initial > 0 || monthly > 0) ? "Enter a starting amount or a monthly contribution." : !(ret > -50 && ret < 50) ? "Enter an expected yearly return between −50% and 50%." : null;
  const r = err ? null : project({ initial, monthly, years, annualReturn: ret, expenseRatio: er, inflation: infl });
  const scen = err ? [] : [6, 8, 10, SINCE_INCEPTION].map((x) => ({ x, v: project({ initial, monthly, years, annualReturn: x, expenseRatio: er, inflation: infl }).final.balance }));
  const max = Math.max(1, ...(r?.rows.map((x) => x.balance) ?? [1]));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="VOO calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="initial" label="Starting investment" prefix="$" value={s.initial} onChange={(v) => set("initial", v)} min={0} />
          <Field id="monthly" label="Monthly contribution" prefix="$" value={s.monthly} onChange={(v) => set("monthly", v)} min={0} />
          <Field id="years" label="Years invested" suffix="years" value={s.years} onChange={(v) => set("years", v)} min={1} />
          <Field id="ret" label="Expected yearly return" suffix="%" value={s.ret} onChange={(v) => set("ret", v)} hint="Total return, dividends reinvested" />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Return presets">
          {PRESETS.map((p) => <button key={p.r} type="button" aria-pressed={s.ret === p.r} onClick={() => set("ret", p.r)} className={`btn-ghost px-3 py-1.5 text-xs ${s.ret === p.r ? "ring-2 ring-[var(--color-brand-500)]" : ""}`}>{p.label}</button>)}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="er" label="Expense ratio" suffix="%" value={s.er} onChange={(v) => set("er", v)} min={0} hint="VOO: 0.03% a year" />
          <Field id="infl" label="Inflation" suffix="%" value={s.infl} onChange={(v) => set("infl", v)} hint="For today's-dollars value" />
        </div>
      </form>
      <ResultCard error={err} label={`Estimated value after ${years} years`} value={r ? <span data-testid="final">{usd(r.final.balance)}</span> : "–"}>
        {r && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="You put in" v={<span data-testid="contributed">{usd(r.final.contributed)}</span>} />
            <Stat k="Investment growth" v={usd(r.final.growth)} />
            <Stat k="In today's dollars" v={<span data-testid="real">{usd(r.final.real)}</span>} />
            <Stat k="Fund fees paid (expense ratio)" v={<span data-testid="fees">{usd(r.final.fees)}</span>} />
          </dl>
          <h2 className="mt-5 text-sm font-semibold">Growth chart</h2>
          <div className="mt-2 flex h-32 items-end gap-[2px]" role="img" aria-label="Balance by year">
            {r.rows.map((x) => (
              <div key={x.year} className="flex flex-1 flex-col justify-end overflow-hidden rounded-t bg-[var(--color-brand-500)]/60" style={{ height: `${(x.balance / max) * 100}%`, minWidth: 2 }} title={`Year ${x.year}: ${usd(x.balance)}`}>
                <div className="bg-[var(--color-brand-700)]" style={{ height: `${Math.min(100, (x.contributed / x.balance) * 100)}%` }} />
              </div>
            ))}
          </div>
          <p className="mt-1 text-xs subtle">Bars: balance each year; darker part: money you contributed.</p>
          <h2 className="mt-5 text-sm font-semibold">Same plan, different returns</h2>
          <table className="mt-2 w-full text-sm" data-testid="scenarios">
            <tbody>{scen.map((x) => <tr key={x.x} className={`border-t border-[var(--border)] ${Math.abs(x.x - ret) < 1e-9 ? "font-semibold" : ""}`}><td className="py-1">{x.x}% a year{x.x === SINCE_INCEPTION ? " (VOO's average since 2010)" : ""}</td><td className="text-right">{usd(x.v)}</td></tr>)}</tbody>
          </table>
          <details className="mt-4 text-sm">
            <summary className="cursor-pointer font-semibold">Year-by-year table</summary>
            <div className="mt-2 max-h-64 overflow-auto">
              <table className="w-full text-xs" data-testid="years">
                <thead><tr className="text-left subtle"><th className="py-1">Year</th><th>Contributed</th><th>Balance</th><th className="text-right">Today&apos;s $</th></tr></thead>
                <tbody>{r.rows.map((x) => <tr key={x.year} className="border-t border-[var(--border)]"><td className="py-1">{x.year}</td><td>{usd(x.contributed)}</td><td>{usd(x.balance)}</td><td className="text-right">{usd(x.real)}</td></tr>)}</tbody>
              </table>
            </div>
          </details>
          <p className="mt-3 text-xs subtle">A projection, not a prediction: real returns vary a lot from year to year and can be negative. Taxes and trading costs are not included. Not investment advice.</p>
        </>}
      </ResultCard>
    </div>
  );
}
