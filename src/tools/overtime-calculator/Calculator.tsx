"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { splitWeek, type OtRule } from "@/lib/pay";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const h = (v: number) => `${+v.toFixed(2)} h`;

export default function OvertimeCalculator() {
  const [s, set] = useUrlState({ mode: "week", rate: "20", hours: "48", thr: "40", mult: "1.5", dth: "0", rule: "federal", d0: "8", d1: "8", d2: "10", d3: "8", d4: "12", d5: "0", d6: "0" });
  const rate = Number(s.rate), daily = s.mode === "days";
  const rule = (s.rule === "california" ? "california" : "federal") as OtRule;
  let reg: number, ot: number, dt: number, mult: number, flsaOt: number, total: number;
  if (daily) {
    const r = splitWeek(DAYS.map((_, i) => Number(s[`d${i}` as "d0"])), rule);
    ({ reg, ot, dt, flsaOt, total } = r); mult = 1.5;
  } else {
    const hours = Math.max(0, Number(s.hours) || 0), thr = Math.max(0, Number(s.thr) || 0), dth = Math.min(Math.max(0, Number(s.dth) || 0), Math.max(0, hours - thr));
    mult = Number(s.mult) || 1.5; total = hours; reg = Math.min(hours, thr); dt = dth; ot = Math.max(0, hours - thr - dth); flsaOt = Math.max(0, hours - 40);
  }
  const regPay = reg * rate, otPay = ot * rate * mult, dtPay = dt * rate * 2, gross = regPay + otPay + dtPay;
  const premium = flsaOt * rate * 0.5;
  const error = !(rate > 0) ? "Enter an hourly rate above 0." : !(total > 0) ? "Enter the hours worked." : !daily && !(mult >= 1) ? "The overtime multiplier should be 1 or more (1.5 = time and a half)." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Overtime calculator">
        <Segmented label="Enter hours" value={daily ? "days" : "week"} onChange={(v) => set("mode", v)} options={[{ id: "week", label: "Weekly total" }, { id: "days", label: "Day by day" }]} />
        <Field id="rate" label="Regular hourly rate" prefix="$" value={s.rate} onChange={(v) => set("rate", v)} min={0} />
        {!daily && <>
          <div className="grid grid-cols-2 gap-3">
            <Field id="hours" label="Hours worked this week" value={s.hours} onChange={(v) => set("hours", v)} min={0} />
            <Field id="thr" label="Overtime after" suffix="hours" value={s.thr} onChange={(v) => set("thr", v)} min={0} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field id="mult" label="Overtime multiplier" suffix="×" value={s.mult} onChange={(v) => set("mult", v)} min={1} hint="1.5 = time and a half" />
            <Field id="dth" label="Of which double time" suffix="hours" value={s.dth} onChange={(v) => set("dth", v)} min={0} hint="Paid at 2× (optional)" />
          </div>
        </>}
        {daily && <>
          <Segmented label="Overtime rules" value={rule} onChange={(v) => set("rule", v)} options={[{ id: "federal", label: "Federal (over 40/week)" }, { id: "california", label: "California (daily)" }]} />
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {DAYS.map((d, i) => <Field key={d} id={`d${i}`} label={d} value={s[`d${i}` as "d0"]} onChange={(v) => set(`d${i}` as "d0", v)} min={0} />)}
          </div>
          <p className="text-xs subtle">{rule === "california" ? "California: 1.5× over 8 hours a day or 40 a week, 2× over 12 a day; on a 7th consecutive workday, 1.5× for the first 8 hours and 2× after." : "Federal FLSA: 1.5× for hours over 40 in the workweek. Some states add daily overtime."}</p>
        </>}
      </form>
      <ResultCard error={error} label="Total gross pay" value={usd(gross)}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat k={`Regular (${h(reg)})`} v={usd(regPay)} />
          <Stat k={`Overtime (${h(ot)} × ${mult})`} v={usd(otPay)} />
          {dt > 0 && <Stat k={`Double time (${h(dt)})`} v={usd(dtPay)} />}
          <Stat k="Overtime rate" v={`${usd(rate * mult)}/h`} />
          <Stat k="Double-time rate" v={`${usd(rate * 2)}/h`} />
          <Stat k="Average per hour" v={`${usd(gross / total)}/h`} />
        </dl>
        {premium > 0 && <p className="mt-4 text-sm muted" data-testid="premium">Federal (FLSA) overtime premium this week: <strong className="text-[var(--text)]">{usd(premium)}</strong> (the &quot;half&quot; in time and a half on {h(flsaOt)} over 40). For 2025–2028 this part may be deductible on your federal return.</p>}
        <p className="mt-3 text-xs subtle">Gross pay before taxes. If every week looked like this: {usd(gross * 52)} a year.</p>
      </ResultCard>
    </div>
  );
}
