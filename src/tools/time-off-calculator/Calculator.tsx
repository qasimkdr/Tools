"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const FREQ: Record<string, [number, string]> = { weekly: [52, "Weekly"], biweekly: [26, "Every 2 weeks"], semimonthly: [24, "Twice a month"], monthly: [12, "Monthly"] };
const f = (x: number, d = 2) => (Number.isFinite(x) ? x.toLocaleString("en-US", { maximumFractionDigits: d }) : "–");

export default function TimeOffCalculator() {
  const [s, set] = useUrlState({ amt: "15", unit: "days", hpd: "8", freq: "biweekly", hpw: "40", bal: "24", periods: "13", use: "16", cap: "" });
  const hpd = Number(s.hpd) || 8, annual = s.unit === "hours" ? Number(s.amt) : Number(s.amt) * hpd;
  const [perYear] = FREQ[s.freq] ?? FREQ.biweekly;
  const perPeriod = annual / perYear, hoursWorked = (Number(s.hpw) || 40) * 52, perHour = annual / hoursWorked;
  const bal = Number(s.bal) || 0, periods = Math.max(0, Math.round(Number(s.periods) || 0)), use = Number(s.use) || 0, cap = Number(s.cap);
  const raw = bal + perPeriod * periods - use;
  const future = cap > 0 ? Math.min(raw, cap) : raw;
  const err = !(annual > 0) ? "Enter how much time off you earn per year." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Time off calculator">
        <div className="grid grid-cols-[1fr_auto] items-end gap-3">
          <Field id="amt" label="Time off earned per year" value={s.amt} onChange={(v) => set("amt", v)} min={0} />
          <Segmented label="In" value={s.unit === "hours" ? "hours" : "days"} onChange={(v) => set("unit", v)} options={[{ id: "days", label: "Days" }, { id: "hours", label: "Hours" }]} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="hpd" label="Hours in a workday" suffix="h" value={s.hpd} onChange={(v) => set("hpd", v)} min={0} />
          <Field id="hpw" label="Hours worked per week" suffix="h" value={s.hpw} onChange={(v) => set("hpw", v)} min={0} />
        </div>
        <div><label htmlFor="freq" className="label">Pay frequency</label>
          <select id="freq" className="field" value={s.freq in FREQ ? s.freq : "biweekly"} onChange={(e) => set("freq", e.target.value)}>{Object.entries(FREQ).map(([k, [, l]]) => <option key={k} value={k}>{l}</option>)}</select></div>
        <div>
          <span className="label">Project your balance</span>
          <div className="grid grid-cols-2 gap-3">
            <Field id="bal" label="Current balance" suffix="h" value={s.bal} onChange={(v) => set("bal", v)} />
            <Field id="periods" label="Pay periods ahead" value={s.periods} onChange={(v) => set("periods", v)} min={0} inputMode="numeric" />
            <Field id="use" label="Time off you'll take" suffix="h" value={s.use} onChange={(v) => set("use", v)} min={0} />
            <Field id="cap" label="Balance cap (optional)" suffix="h" value={s.cap} onChange={(v) => set("cap", v)} min={0} />
          </div>
        </div>
      </form>
      <ResultCard label="PTO earned each pay period" error={err} value={err ? "–" : `${f(perPeriod, 3)} hours`}>
        {!err && <>
          <p className="mt-1 text-sm muted">{f(annual)} hours a year ÷ {perYear} pay periods</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Per hour worked" v={<span data-testid="per-hour">{f(perHour, 4)} h (1 h per {f(1 / perHour)} h worked)</span>} />
            <Stat k="Per month" v={`${f(annual / 12, 2)} h`} />
            <Stat k={`Balance after ${periods} periods`} v={<span data-testid="future">{f(future)} h</span>} />
            <Stat k="In workdays" v={<span data-testid="future-days">{f(future / hpd)} days</span>} />
          </dl>
          {cap > 0 && raw > cap && <p className="mt-3 text-sm muted">You&apos;d reach the {f(cap)} h cap and stop accruing {f(raw - cap)} h. Plan time off to avoid losing it.</p>}
          {future < 0 && <p className="mt-3 text-sm muted">That plan would leave a negative balance; check whether your employer allows borrowing ahead.</p>}
          <p className="mt-4 text-xs subtle">Employers set their own accrual rules, waiting periods, caps and carryover limits, and some state laws set minimum paid sick leave. Check your policy or pay stub.</p>
        </>}
      </ResultCard>
    </div>
  );
}
