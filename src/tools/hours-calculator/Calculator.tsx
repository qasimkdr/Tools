"use client";
import { useEffect, useState } from "react";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { usd } from "@/lib/money";

const toMin = (t: string) => { const [h, m] = t.split(":").map(Number); return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : NaN; };
/** Minutes worked between two HH:MM times; crosses midnight if end ≤ start. */
export const shiftMinutes = (start: string, end: string, breakMin = 0) => {
  const s = toMin(start), e = toMin(end);
  if (!Number.isFinite(s) || !Number.isFinite(e)) return NaN;
  return Math.max(0, (e > s ? e - s : e + 1440 - s) - breakMin);
};
const hm = (min: number) => `${Math.floor(min / 60)} h ${String(Math.round(min % 60)).padStart(2, "0")} min`;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HoursCalculator() {
  const [mode, setMode] = useState<"between" | "week" | "from">("between");
  const [st, setSt] = useState("09:00"); const [en, setEn] = useState("17:30"); const [br, setBr] = useState("30");
  const [week, setWeek] = useState(DAYS.map((d, i) => ({ d, start: i < 5 ? "09:00" : "", end: i < 5 ? "17:30" : "", brk: i < 5 ? "30" : "0" })));
  const [rate, setRate] = useState(""); const [otAfter, setOtAfter] = useState("40");
  const [now, setNow] = useState<Date | null>(null); const [base, setBase] = useState(""); const [addH, setAddH] = useState("8"); const [addM, setAddM] = useState("0");
  useEffect(() => { setNow(new Date()); }, []);

  const between = shiftMinutes(st, en, Number(br) || 0);
  const weekMin = week.map((w) => (w.start && w.end ? shiftMinutes(w.start, w.end, Number(w.brk) || 0) : 0));
  const total = weekMin.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
  const otLimit = (Number(otAfter) || 40) * 60, reg = Math.min(total, otLimit), ot = Math.max(0, total - otLimit), r = Number(rate);
  const from = (() => {
    const b = base ? (() => { const d = new Date(now ?? Date.now()); const [h, m] = base.split(":").map(Number); d.setHours(h, m, 0, 0); return d; })() : now;
    return b ? new Date(b.getTime() + ((Number(addH) || 0) * 60 + (Number(addM) || 0)) * 60000) : null;
  })();

  return (
    <div className="space-y-6">
      <Segmented label="Calculate" value={mode} onChange={setMode} options={[{ id: "between", label: "Between two times" }, { id: "week", label: "Weekly timesheet" }, { id: "from", label: "Hours from now" }]} />
      {mode === "between" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <form className="grid grid-cols-2 gap-3 sm:grid-cols-3" onSubmit={(e) => e.preventDefault()} aria-label="Time between two times">
            <div><label htmlFor="st" className="label">Start</label><input id="st" type="time" className="field" value={st} onChange={(e) => setSt(e.target.value)} /></div>
            <div><label htmlFor="en" className="label">End</label><input id="en" type="time" className="field" value={en} onChange={(e) => setEn(e.target.value)} /></div>
            <div className="col-span-2 sm:col-span-1"><Field id="br" label="Break" suffix="min" value={br} onChange={setBr} min={0} /></div>
            <p className="col-span-2 text-sm muted sm:col-span-3">An end time earlier than the start is treated as the next day (overnight shift).</p>
          </form>
          <ResultCard label="Time worked" value={Number.isFinite(between) ? hm(between) : "—"}>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Decimal hours" v={Number.isFinite(between) ? (between / 60).toFixed(2) : "—"} />
              <Stat k="Total minutes" v={Number.isFinite(between) ? Math.round(between) : "—"} />
            </dl>
          </ResultCard>
        </div>
      )}
      {mode === "week" && (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="space-y-2">
            <div className="grid grid-cols-[3rem_1fr_1fr] gap-2 text-xs font-medium subtle sm:grid-cols-[3rem_1fr_1fr_5rem_4.5rem]"><span>Day</span><span>In</span><span>Out</span><span className="hidden sm:block">Break (min)</span><span className="hidden text-right sm:block">Hours</span></div>
            {week.map((w, i) => (
              <div key={w.d} className="grid grid-cols-[3rem_1fr_1fr] items-center gap-2 border-b border-[var(--border)] pb-2 sm:grid-cols-[3rem_1fr_1fr_5rem_4.5rem] sm:border-0 sm:pb-0">
                <span className="text-sm font-medium">{w.d}</span>
                <input aria-label={`${w.d} in`} type="time" className="field !px-2 !py-1.5" value={w.start} onChange={(e) => setWeek((x) => x.map((y, j) => (j === i ? { ...y, start: e.target.value } : y)))} />
                <input aria-label={`${w.d} out`} type="time" className="field !px-2 !py-1.5" value={w.end} onChange={(e) => setWeek((x) => x.map((y, j) => (j === i ? { ...y, end: e.target.value } : y)))} />
                <div className="relative col-start-2 sm:col-start-auto"><input aria-label={`${w.d} break`} type="number" min={0} className="field !px-2 !py-1.5 pr-16 tabular-nums sm:pr-2" value={w.brk} onChange={(e) => setWeek((x) => x.map((y, j) => (j === i ? { ...y, brk: e.target.value } : y)))} /><span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs subtle sm:hidden">min break</span></div>
                <span className="text-right text-sm tabular-nums">{weekMin[i] ? (weekMin[i] / 60).toFixed(2) : "—"}</span>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Field id="rate" label="Hourly rate (optional)" prefix="$" value={rate} onChange={setRate} min={0} />
              <Field id="ot" label="Overtime after" suffix="h/week" value={otAfter} onChange={setOtAfter} min={0} />
            </div>
          </div>
          <ResultCard label="Total for the week" value={hm(total)}>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Decimal hours" v={(total / 60).toFixed(2)} />
              <Stat k="Regular / overtime" v={`${(reg / 60).toFixed(2)} / ${(ot / 60).toFixed(2)} h`} />
              {r > 0 && <Stat k="Regular pay" v={usd((reg / 60) * r)} />}
              {r > 0 && <Stat k="Overtime pay (1.5×)" v={usd((ot / 60) * r * 1.5)} />}
              {r > 0 && <Stat k="Gross pay" v={usd((reg / 60) * r + (ot / 60) * r * 1.5)} />}
            </dl>
          </ResultCard>
        </div>
      )}
      {mode === "from" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <form className="grid grid-cols-2 gap-3 sm:grid-cols-3" onSubmit={(e) => e.preventDefault()} aria-label="Hours from now">
            <div className="col-span-2 sm:col-span-1"><label htmlFor="base" className="label">Start (blank = now)</label><input id="base" type="time" className="field" value={base} onChange={(e) => setBase(e.target.value)} /></div>
            <Field id="addh" label="Add hours" value={addH} onChange={setAddH} />
            <Field id="addm" label="Add minutes" value={addM} onChange={setAddM} />
          </form>
          <ResultCard label={`${Number(addH) || 0} h ${Number(addM) || 0} min from ${base || "now"}`} value={from ? from.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "—"}>
            {from && <p className="mt-2 text-sm muted">{from.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {from.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} (24-hour)</p>}
          </ResultCard>
        </div>
      )}
    </div>
  );
}
