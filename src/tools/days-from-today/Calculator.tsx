"use client";
import { useEffect, useMemo, useState } from "react";
import {
  type Unit, addDays, countBusinessDays, dayOfYear, diffDays, fmtLong, fmtShort, holidaysBetween,
  isoWeek, parseISO, shift, toISO, isWeekend, isHoliday,
} from "@/lib/date";
import { useToday } from "@/lib/useToday";

const UNITS: { id: Unit; label: string }[] = [
  { id: "days", label: "Days" }, { id: "weeks", label: "Weeks" }, { id: "months", label: "Months" },
  { id: "years", label: "Years" }, { id: "business", label: "Business days" },
];
const QUICK: Record<Unit, number[]> = {
  days: [7, 14, 30, 45, 60, 90, 120, 180],
  weeks: [2, 4, 6, 8, 10, 12, 20, 40],
  months: [1, 3, 6, 9, 12, 18],
  years: [1, 2, 5, 10],
  business: [3, 5, 10, 15, 30, 60],
};

export default function DaysFromTodayCalculator({ buildISO, initialAmount = 14, initialUnit = "days", syncUrl = true }: {
  buildISO: string; initialAmount?: number; initialUnit?: Unit; syncUrl?: boolean;
}) {
  const today = useToday(buildISO);
  const [amount, setAmount] = useState<string>(String(initialAmount));
  const [unit, setUnit] = useState<Unit>(initialUnit);
  const [dir, setDir] = useState<"after" | "before">("after");
  const [start, setStart] = useState<string>(""); // "" = today
  const [skipHolidays, setSkipHolidays] = useState(true);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(!syncUrl); // don't write the URL until shared params have been read

  // Shareable state via query string (static-hosting friendly).
  useEffect(() => {
    if (!syncUrl) return;
    const q = new URLSearchParams(location.search);
    if (q.get("n")) setAmount(q.get("n")!);
    const u = q.get("u") as Unit | null; if (u && UNITS.some((x) => x.id === u)) setUnit(u);
    if (q.get("dir") === "before") setDir("before");
    if (q.get("start")) setStart(q.get("start")!);
    setReady(true);
  }, [syncUrl]);
  useEffect(() => {
    if (!syncUrl || !ready) return;
    const q = new URLSearchParams({ n: amount, u: unit, ...(dir === "before" ? { dir } : {}), ...(start ? { start } : {}) });
    history.replaceState(null, "", `${location.pathname}?${q}`);
  }, [amount, unit, dir, start, syncUrl, ready]);

  const base = start ? parseISO(start) : today;
  const n = Math.max(0, Math.min(100000, Math.floor(Number(amount) || 0)));
  const signed = dir === "after" ? n : -n;
  const result = useMemo(() => shift(base, signed, unit, skipHolidays), [base, signed, unit, skipHolidays]);
  const span = diffDays(base, result);
  const absSpan = Math.abs(span);
  const bdays = countBusinessDays(base, result, skipHolidays);
  const hols = holidaysBetween(base, result);
  const unitLabel = unit === "business" ? "business days" : unit;
  const summary = `${n} ${n === 1 ? unitLabel.replace(/s$/, "") : unitLabel} ${dir === "after" ? "from" : "before"} ${start ? fmtShort(base) : "today"}`;

  const copy = async () => {
    await navigator.clipboard?.writeText(`${summary} is ${fmtLong(result)}`);
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  const ics = () => {
    const d = toISO(result).replace(/-/g, ""), d2 = toISO(addDays(result, 1)).replace(/-/g, "");
    const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Mathico//Days From Today//EN", "BEGIN:VEVENT",
      `UID:${d}-${Date.now()}@mathico.xyz`, `DTSTAMP:${toISO(new Date()).replace(/-/g, "")}T000000Z`,
      `DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${d2}`, `SUMMARY:${summary}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
    a.download = `date-${toISO(result)}.ics`; a.click();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Inputs */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Days from today calculator">
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div>
            <label htmlFor="amt" className="label">Amount</label>
            <input id="amt" inputMode="numeric" type="number" min={0} max={100000} className="field text-lg font-semibold tabular-nums"
              value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <span className="label">Direction</span>
            <div role="group" aria-label="Direction" className="flex rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
              {(["after", "before"] as const).map((d) => (
                <button key={d} type="button" aria-pressed={dir === d} onClick={() => setDir(d)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${dir === d ? "bg-[var(--color-brand-600)] text-white" : "muted"}`}>
                  {d === "after" ? "From" : "Ago"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <span className="label">Unit</span>
          <div role="group" aria-label="Unit" className="flex flex-wrap gap-2">
            {UNITS.map((u) => (
              <button key={u.id} type="button" className="chip" aria-pressed={unit === u.id} onClick={() => setUnit(u.id)}>{u.label}</button>
            ))}
          </div>
        </div>
        <div>
          <span className="label">Quick picks</span>
          <div className="flex flex-wrap gap-2">
            {QUICK[unit].map((q) => (
              <button key={q} type="button" className="chip" aria-pressed={n === q} onClick={() => setAmount(String(q))}>{q}</button>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="start" className="label">Start date</label>
            <input id="start" type="date" className="field" value={start || toISO(today)} onChange={(e) => setStart(e.target.value === toISO(today) ? "" : e.target.value)} />
          </div>
          {unit === "business" && (
            <label className="flex items-end gap-2 pb-3 text-sm muted">
              <input type="checkbox" className="size-4 accent-[var(--color-brand-600)]" checked={skipHolidays} onChange={(e) => setSkipHolidays(e.target.checked)} />
              Skip US federal holidays
            </label>
          )}
        </div>
      </form>

      {/* Result */}
      <div aria-live="polite" data-testid="result" className="rounded-2xl bg-[var(--surface)] p-5 shadow-sm ring-1 ring-[var(--border)] sm:p-6">
        <p className="text-sm font-medium muted">{summary}</p>
        <p key={toISO(result)} className="mt-1 animate-pop text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span className="text-gradient">{fmtLong(result)}</span>
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <Stat k="Calendar days" v={absSpan.toLocaleString()} />
          <Stat k="Business days" v={bdays.toLocaleString()} />
          <Stat k="Weeks + days" v={`${Math.floor(absSpan / 7)}w ${absSpan % 7}d`} />
          <Stat k="Day of year" v={`${dayOfYear(result)} · W${isoWeek(result)}`} />
        </dl>
        <MiniCalendar date={result} start={base} />
        {hols.length > 0 && (
          <p className="mt-4 text-sm muted">
            <strong className="text-[var(--text)]">US holidays in this span:</strong>{" "}
            {hols.slice(0, 6).map((h) => `${h.name} (${fmtShort(h.date)})`).join(", ")}{hols.length > 6 ? ` +${hols.length - 6} more` : ""}
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={copy}>{copied ? "Copied ✓" : "Copy result"}</button>
          <button type="button" className="btn-ghost" onClick={ics}>Add to calendar (.ics)</button>
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-[var(--surface-2)] px-3 py-2.5">
      <dt className="text-xs subtle">{k}</dt>
      <dd className="mt-0.5 font-semibold tabular-nums">{v}</dd>
    </div>
  );
}

function MiniCalendar({ date, start }: { date: Date; start: Date }) {
  const y = date.getFullYear(), m = date.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = Array.from({ length: first + days }, (_, i) => (i < first ? null : i - first + 1));
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-semibold">{date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs tabular-nums" role="grid" aria-label="Month calendar">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} className="py-1 subtle">{d}</span>)}
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const cur = new Date(y, m, d);
          const hit = d === date.getDate();
          const isStart = toISO(cur) === toISO(start);
          const off = isWeekend(cur) || isHoliday(cur);
          return (
            <span key={i} className={`rounded-lg py-1.5 ${hit ? "bg-[var(--color-brand-600)] font-bold text-white shadow-md" : isStart ? "ring-2 ring-[var(--color-brand-400)]" : off ? "subtle" : ""}`}>
              {d}
            </span>
          );
        })}
      </div>
    </div>
  );
}
