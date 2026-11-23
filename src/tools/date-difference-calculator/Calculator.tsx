"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { addDays, ageBetween, countBusinessDays, fmtLong, holidaysBetween, parseISO, toISO } from "@/lib/date";

const n = (x: number) => x.toLocaleString("en-US");
const plural = (x: number, w: string) => `${n(x)} ${w}${x === 1 ? "" : "s"}`;

export default function DateDifferenceCalculator() {
  const [s, set] = useUrlState({ a: "2026-01-01", b: "2026-12-25", ta: "", tb: "", inc: "0" });
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(s.a) && /^\d{4}-\d{2}-\d{2}$/.test(s.b);
  const A = parseISO(s.a), B = parseISO(s.b);
  const [start, end] = A <= B ? [A, B] : [B, A];
  const inc = s.inc === "1";
  const endX = inc ? addDays(end, 1) : end; // counting the end day adds one day
  const ymd = valid ? ageBetween(start, endX) : null;
  const days = ymd?.totalDays ?? 0;
  const biz = valid ? countBusinessDays(addDays(start, -1), inc ? end : addDays(end, -1)) : 0; // weekdays from start up to (not incl.) end, or incl. end
  const hols = valid ? holidaysBetween(addDays(start, -1), inc ? end : addDays(end, -1)).filter((h) => h.date.getDay() !== 0 && h.date.getDay() !== 6) : [];
  const withTime = s.ta !== "" || s.tb !== "";
  const toMs = (iso: string, t: string) => { const [h, m] = (t || "00:00").split(":").map(Number); const d = parseISO(iso); d.setHours(h || 0, m || 0); return d.getTime(); };
  const ms = valid && withTime ? Math.abs(toMs(s.b, s.tb) - toMs(s.a, s.ta)) : days * 86400000;
  const totalH = ms / 3600000;
  const err = !valid ? "Enter both dates." : null;
  const swap = A > B;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Date difference calculator">
        <div className="grid grid-cols-2 gap-3">
          <div><label htmlFor="a" className="label">Start date</label><input id="a" type="date" className="field" value={s.a} onChange={(e) => set("a", e.target.value)} /></div>
          <div><label htmlFor="b" className="label">End date</label><input id="b" type="date" className="field" value={s.b} onChange={(e) => set("b", e.target.value)} /></div>
          <div><label htmlFor="ta" className="label">Start time (optional)</label><input id="ta" type="time" className="field" value={s.ta} onChange={(e) => set("ta", e.target.value)} /></div>
          <div><label htmlFor="tb" className="label">End time (optional)</label><input id="tb" type="time" className="field" value={s.tb} onChange={(e) => set("tb", e.target.value)} /></div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inc} onChange={(e) => set("inc", e.target.checked ? "1" : "0")} /> Include the end date (+1 day)</label>
          <button type="button" className="btn-ghost text-sm" onClick={() => set("a", toISO(new Date()))}>Start = today</button>
          <button type="button" className="btn-ghost text-sm" onClick={() => set("b", toISO(new Date()))}>End = today</button>
        </div>
        {swap && <p className="text-xs subtle">The end date is before the start date, so the dates were swapped.</p>}
      </form>
      <ResultCard label="Time between the dates" error={err} value={ymd ? [ymd.years && plural(ymd.years, "year"), ymd.months && plural(ymd.months, "month"), plural(ymd.days, "day")].filter(Boolean).join(", ") : "–"}>
        {ymd && <>
          <p className="mt-1 text-sm muted">{fmtLong(start)} → {fmtLong(end)}{inc ? " (end date included)" : ""}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Total days" v={<span data-testid="days">{n(days)}</span>} />
            <Stat k="Weeks" v={<span data-testid="weeks">{plural(Math.floor(days / 7), "week")}{days % 7 ? `, ${plural(days % 7, "day")}` : ""}</span>} />
            <Stat k="Total months" v={`${n(ymd.totalMonths)} months, ${plural(ymd.days, "day")}`} />
            <Stat k="Business days (Mon–Fri)" v={<span data-testid="biz">{n(biz)}</span>} />
            <Stat k="…minus U.S. federal holidays" v={<span data-testid="biz-h">{n(biz - hols.length)}</span>} />
            <Stat k={withTime ? "Exact hours" : "Hours"} v={n(Math.round(totalH * 100) / 100)} />
            <Stat k="Minutes" v={n(Math.round(ms / 60000))} />
            <Stat k="Seconds" v={n(Math.round(ms / 1000))} />
          </dl>
          {hols.length > 0 && <p className="mt-4 text-xs subtle">Weekday holidays in range: {hols.map((h) => h.name).join(", ")}.</p>}
        </>}
      </ResultCard>
    </div>
  );
}
