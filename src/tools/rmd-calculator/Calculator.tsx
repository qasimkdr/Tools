"use client";
import { Field, ResultCard, Segmented, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { useToday } from "@/lib/useToday";
import { divisor, project, rmdFor, startAge } from "@/lib/rmd";

const usd = (x: number, d = 0) => (Number.isFinite(x) ? x.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: d, maximumFractionDigits: d }) : "–");

export default function RmdCalculator({ buildISO }: { buildISO: string }) {
  const today = useToday(buildISO);
  const [s, set] = useUrlState({ by: "1952", bal: "500000", yr: "", g: "5", sp: "0", yrs: "15" });
  const year = Number(s.yr) >= 2000 && Number(s.yr) <= 2100 ? Math.round(Number(s.yr)) : today.getFullYear();
  const by = Math.round(Number(s.by)), bal = Number(s.bal), g = (Number(s.g) || 0) / 100;
  const err = !(by >= 1900 && by <= year) ? "Enter your birth year." : !(bal >= 0) || s.bal === "" ? "Enter the account balance on December 31 of last year." : null;
  const age = year - by, sa = err ? 0 : startAge(by), firstYear = by + sa;
  const due = !err && age >= sa;
  const r = !err && due ? rmdFor(bal, age) : null;
  const yrs = Math.min(40, Math.max(5, Math.round(Number(s.yrs) || 15)));
  const rows = err ? [] : project(bal, by, Math.max(year, firstYear), yrs, g);
  const total = rows.reduce((a, x) => a + x.rmd, 0);
  const max = Math.max(1, ...rows.map((x) => x.rmd));
  const spouse = s.sp === "1";

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="RMD calculator">
          <div className="grid grid-cols-2 gap-3">
            <Field id="by" label="Year you were born" value={s.by} onChange={(v) => set("by", v)} min={1900} inputMode="numeric" />
            <Field id="yr" label="RMD for year" value={s.yr || String(year)} onChange={(v) => set("yr", v)} min={2000} inputMode="numeric" />
          </div>
          <Field id="bal" label={`Account balance on December 31, ${year - 1}`} prefix="$" value={s.bal} onChange={(v) => set("bal", v)} min={0} hint="Traditional IRA, SEP, SIMPLE or 401(k)/403(b) balance" />
          <div className="grid grid-cols-2 gap-3">
            <Field id="g" label="Expected yearly growth (projection)" suffix="%" value={s.g} onChange={(v) => set("g", v)} hint="An assumption, not a promise" />
            <Field id="yrs" label="Years to project" value={s.yrs} onChange={(v) => set("yrs", v)} min={5} inputMode="numeric" />
          </div>
          <Segmented label="Is your spouse the sole beneficiary and more than 10 years younger?" value={spouse ? "1" : "0"} onChange={(v) => set("sp", v)} options={[{ id: "0", label: "No" }, { id: "1", label: "Yes" }]} />
          {spouse && <p className="rounded-lg bg-amber-50 p-3 text-sm dark:bg-amber-950/40" data-testid="spouse">You use the IRS Joint and Last Survivor table (Table II) instead, which gives a <strong>smaller</strong> RMD than shown here. Ask your IRA custodian or see IRS Publication 590-B.</p>}
        </form>
        <ResultCard error={err} label={`Required minimum distribution for ${year}`} value={err ? "–" : due ? <span data-testid="rmd">{usd(r!.rmd, 2)}</span> : <span data-testid="rmd">Not required yet</span>}>
          {!err && <>
            <p className="mt-1 text-sm muted">{due ? `Age ${age} in ${year} · IRS divisor ${r!.divisor} (Uniform Lifetime Table)` : `Your RMDs start at age ${sa}, in ${firstYear}.`}</p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Your RMD starting age" v={<span data-testid="start-age">{sa}</span>} />
              <Stat k="First RMD year" v={<span data-testid="first">{firstYear} (due by April 1, {firstYear + 1})</span>} />
              {due && <>
                <Stat k="Share of the balance" v={`${((r!.rmd / bal) * 100).toFixed(2)}%`} />
                <Stat k="Monthly if spread out" v={usd(r!.rmd / 12)} />
                <Stat k={`Deadline for the ${year} RMD`} v={<span data-testid="deadline">{year === firstYear ? `April 1, ${year + 1}` : `December 31, ${year}`}</span>} />
                <Stat k="Excise tax if missed" v="25% of the shortfall (10% if corrected within 2 years)" />
              </>}
            </dl>
            {due && <details className="mt-3" open>
              <summary className="cursor-pointer text-sm font-semibold">Step by step</summary>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm" data-testid="steps">
                <li>Age reached in {year}: {year} − {by} = {age}</li>
                <li>IRS Uniform Lifetime Table divisor for age {age}: {r!.divisor}</li>
                <li>RMD = {usd(bal)} (December 31, {year - 1}) ÷ {r!.divisor} = {usd(r!.rmd, 2)}</li>
                <li>Deadline: {year === firstYear ? `April 1, ${year + 1} (first RMD)` : `December 31, ${year}`}. You can take more; extra doesn&apos;t count toward next year.</li>
              </ol>
            </details>}
            {due && year === firstYear && <p className="mt-2 text-sm" data-testid="double">If you wait until April 1, {year + 1} for your first RMD, you&apos;ll also owe the {year + 1} RMD by December 31, {year + 1}: two taxable withdrawals in one year.</p>}
          </>}
        </ResultCard>
      </div>
      {!err && rows.length > 0 && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Projected RMDs at {s.g || 0}% growth</h2>
            <button type="button" className="btn-ghost text-sm" onClick={() => downloadCsv("rmd-projection.csv", ["Year", "Age", "Balance Jan 1", "Divisor", "RMD", "Balance Dec 31"], rows.map((x) => [x.year, x.age, x.start.toFixed(2), Number.isFinite(x.divisor) ? x.divisor : "", x.rmd.toFixed(2), x.end.toFixed(2)]))}>Download CSV</button>
          </div>
          <div className="mt-3 flex h-28 items-end gap-1" role="img" aria-label="Projected RMD by year">
            {rows.map((x) => <div key={x.year} className="flex-1 rounded-t bg-[var(--color-brand-500)]" style={{ height: `${(x.rmd / max) * 100}%`, minHeight: x.rmd ? 2 : 0 }} title={`${x.year}: ${usd(x.rmd)}`} />)}
          </div>
          <div className="mt-3 max-h-96 min-w-0 overflow-auto rounded-xl border border-[var(--border)]">
            <table className="w-full text-sm" data-testid="projection">
              <thead className="sticky top-0 bg-[var(--surface-2)]"><tr className="text-left"><th className="px-3 py-1.5">Year</th><th className="px-3">Age</th><th className="hidden px-3 sm:table-cell">Start balance</th><th className="hidden px-3 sm:table-cell">Divisor</th><th className="px-3">RMD</th><th className="px-3">End balance</th></tr></thead>
              <tbody>{rows.map((x) => <tr key={x.year} className="border-t border-[var(--border)]"><td className="px-3 py-1">{x.year}</td><td className="px-3">{x.age}</td><td className="hidden px-3 sm:table-cell">{usd(x.start)}</td><td className="hidden px-3 sm:table-cell">{Number.isFinite(x.divisor) ? x.divisor : "–"}</td><td className="px-3 font-semibold">{x.rmd ? usd(x.rmd) : "–"}</td><td className="px-3">{usd(x.end)}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="mt-2 text-xs subtle">Total of the projected RMDs: <strong>{usd(total)}</strong>. Real balances change with markets, extra withdrawals and contributions; each year&apos;s RMD uses the actual December 31 balance. Divisors past age {Math.max(...rows.map((x) => x.age))} keep shrinking (age 120+: {divisor(120)}).</p>
        </div>
      )}
    </div>
  );
}
