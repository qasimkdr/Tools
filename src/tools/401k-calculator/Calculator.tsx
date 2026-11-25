"use client";
import { useState } from "react";
import { Field, ResultCard, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { project } from "@/lib/retirement";

const DEFAULTS = { age: "30", ret: "67", bal: "20000", sal: "60000", c: "6", m: "50", mu: "6", g: "2", r: "6", inf: "2.5" };

export default function Retirement401k() {
  const [s, set] = useUrlState(DEFAULTS);
  const [all, setAll] = useState(false);
  const N = (k: keyof typeof DEFAULTS) => Number(s[k]);
  const age = Math.floor(N("age")), ret = Math.floor(N("ret"));
  const err = !(age >= 16 && age < 100) ? "Enter your current age." : !(ret > age && ret <= 100) ? "Retirement age must be after your current age." :
    !(N("sal") > 0) ? "Enter your annual salary." : !(N("c") >= 0 && N("c") <= 100) ? "Contribution must be 0–100% of salary." : null;
  const p = err ? null : project({ age, retireAge: ret, balance: N("bal") || 0, salary: N("sal"), contribPct: N("c") / 100, matchPct: (N("m") || 0) / 100, matchUpToPct: (N("mu") || 0) / 100, salaryGrowth: (N("g") || 0) / 100, returnRate: (N("r") || 0) / 100 });
  const yrs = ret - age, real = p ? p.final / Math.pow(1 + (N("inf") || 0) / 100, yrs) : 0;
  const missed = !err && N("c") < N("mu") && N("m") > 0 ? N("sal") * ((N("mu") - N("c")) / 100) * (N("m") / 100) : 0;
  const maxBal = p ? Math.max(...p.years.map((y) => y.balance), 1) : 1;
  const anyCapped = p?.years.some((y) => y.capped);

  return (
    <div className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="401(k) calculator">
          <div className="grid grid-cols-2 gap-3">
            <Field id="age" label="Current age" value={s.age} onChange={(v) => set("age", v)} inputMode="numeric" />
            <Field id="ret" label="Retirement age" value={s.ret} onChange={(v) => set("ret", v)} inputMode="numeric" />
            <Field id="bal" label="Current 401(k) balance" prefix="$" value={s.bal} onChange={(v) => set("bal", v)} min={0} />
            <Field id="sal" label="Annual salary" prefix="$" value={s.sal} onChange={(v) => set("sal", v)} min={0} />
            <Field id="c" label="Your contribution" suffix="% of pay" value={s.c} onChange={(v) => set("c", v)} min={0} />
            <Field id="g" label="Yearly raise" suffix="%" value={s.g} onChange={(v) => set("g", v)} />
            <Field id="m" label="Employer match" suffix="% of yours" value={s.m} onChange={(v) => set("m", v)} min={0} />
            <Field id="mu" label="Match up to" suffix="% of pay" value={s.mu} onChange={(v) => set("mu", v)} min={0} />
            <Field id="r" label="Annual return" suffix="%" value={s.r} onChange={(v) => set("r", v)} />
            <Field id="inf" label="Inflation" suffix="%" value={s.inf} onChange={(v) => set("inf", v)} />
          </div>
        </form>
        <ResultCard error={err} label={`Estimated balance at ${ret}`} value={p ? usd(p.final, 0) : ""}>
          {p && (
            <>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Stat k="In today's dollars" v={usd(real, 0)} />
                <Stat k="4% rule: first-year income" v={`${usd(p.final * 0.04, 0)}/yr`} />
                <Stat k="Your contributions" v={usd(p.employeeTotal, 0)} />
                <Stat k="Employer contributions" v={usd(p.employerTotal, 0)} />
                <Stat k="Investment growth" v={usd(p.growth, 0)} />
                <Stat k="Years of saving" v={yrs} />
              </dl>
              {missed > 0.5 && <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">You&apos;re leaving about <strong>{usd(missed, 0)} a year</strong> of employer match unclaimed. Contributing {N("mu")}% would capture all of it.</p>}
              {anyCapped && <p className="mt-3 text-xs muted">Your contribution hits the IRS limit in some years and is capped there (2026 limits applied by age; catch-up included from 50).</p>}
            </>
          )}
        </ResultCard>
      </div>

      {p && p.years.length > 0 && (
        <div className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold">Balance by year</h2>
            <button type="button" className="btn-ghost !py-1.5" onClick={() => downloadCsv("401k-projection.csv", ["Age", "Salary", "Your contribution", "Employer", "End balance"], p.years.map((y) => [y.age, y.salary.toFixed(0), y.employee.toFixed(0), y.employer.toFixed(0), y.balance.toFixed(0)]))}>Download CSV</button>
          </div>
          <div className="mt-4 flex h-40 items-end gap-[2px]" aria-label="Balance growth chart">
            {p.years.map((y) => <div key={y.age} title={`Age ${y.age + 1}: ${usd(y.balance, 0)}`} className="flex-1 rounded-t bg-[var(--color-brand-500)] opacity-80 hover:opacity-100" style={{ height: `${(y.balance / maxBal) * 100}%` }} />)}
          </div>
          <p className="mt-1 flex justify-between text-xs subtle"><span>Age {age}</span><span>Age {ret}</span></p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <thead><tr className="text-left subtle"><th className="py-1 pr-3 font-medium">Age</th><th className="pr-3 font-medium">You</th><th className="pr-3 font-medium">Employer</th><th className="font-medium">End balance</th></tr></thead>
              <tbody>{(all ? p.years : p.years.filter((_, i) => i % 5 === 0 || i === p.years.length - 1)).map((y) => (
                <tr key={y.age} className="border-t border-[var(--border)]"><td className="py-1 pr-3">{y.age}</td><td className="pr-3">{usd(y.employee, 0)}</td><td className="pr-3">{usd(y.employer, 0)}</td><td>{usd(y.balance, 0)}</td></tr>))}
              </tbody>
            </table>
            <button type="button" className="mt-2 text-sm font-medium text-[var(--color-brand-600)]" onClick={() => setAll((v) => !v)}>{all ? "Show every 5 years" : "Show every year"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
