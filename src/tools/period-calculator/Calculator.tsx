"use client";
import { ResultCard, Stat } from "@/components/calc/ui";
import { useState } from "react";
import { useToday } from "@/lib/useToday";
import { addDays, diffDays, fmtShort, parseISO, toISO, weekday } from "@/lib/date";

export default function PeriodCalculator({ buildISO }: { buildISO: string }) {
  const today = useToday(buildISO);
  // Not synced to the URL on purpose: health dates stay out of shareable links and browser history.
  const [s, setS] = useState({ lmp: "", cycle: "28", len: "5" });
  const set = (k: "lmp" | "cycle" | "len", v: string) => setS((x) => ({ ...x, [k]: v }));
  const lmp = s.lmp ? parseISO(s.lmp) : addDays(today, -10);
  const cycle = Math.round(Number(s.cycle)), len = Math.round(Number(s.len));
  const error = !(cycle >= 20 && cycle <= 45) ? "Enter an average cycle length between 20 and 45 days." : !(len >= 1 && len <= 10) ? "Enter a period length between 1 and 10 days." : lmp > today ? "The first day of your last period can't be in the future." : null;

  // Upcoming cycles: skip any that already started before today.
  const rows: { start: Date; end: Date; ovu: Date; fertileStart: Date; fertileEnd: Date }[] = [];
  if (!error) {
    let k = 1;
    while (rows.length < 6 && k < 200) {
      const start = addDays(lmp, k * cycle);
      if (addDays(start, len - 1) >= today) {
        const ovu = addDays(start, -14);
        rows.push({ start, end: addDays(start, len - 1), ovu, fertileStart: addDays(ovu, -5), fertileEnd: addDays(ovu, 1) });
      }
      k++;
    }
  }
  const next = rows[0];
  const cycleDay = !error ? (diffDays(lmp, today) % cycle) + 1 : 0;
  const inDays = next ? diffDays(today, next.start) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Period calculator">
        <div>
          <label htmlFor="lmp" className="label">First day of your last period</label>
          <input id="lmp" type="date" className="field" max={toISO(today)} value={s.lmp || toISO(lmp)} onChange={(e) => set("lmp", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="cycle" className="label">Average cycle length</label>
            <select id="cycle" className="field" value={s.cycle} onChange={(e) => set("cycle", e.target.value)}>
              {Array.from({ length: 26 }, (_, i) => i + 20).map((d) => <option key={d} value={d}>{d} days{d === 28 ? " (average)" : ""}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="len" className="label">Period length</label>
            <select id="len" className="field" value={s.len} onChange={(e) => set("len", e.target.value)}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d} day{d > 1 ? "s" : ""}</option>)}
            </select>
          </div>
        </div>
        <p className="rounded-xl bg-[var(--surface-2)] px-4 py-3 text-xs muted">
          🔒 Private: everything is calculated in your browser and nothing is saved. Estimates only. Not a method of birth control or a medical diagnosis.
        </p>
      </form>
      <ResultCard error={error} label="Next period expected" value={next ? `${weekday(next.start)}, ${fmtShort(next.start)}` : ""}>
        {next && (
          <>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <Stat k="Starts in" v={inDays <= 0 ? "Now (ongoing)" : `${inDays} day${inDays === 1 ? "" : "s"}`} />
              <Stat k="Expected to end" v={fmtShort(next.end)} />
              <Stat k="Today is cycle day" v={cycleDay} />
              <Stat k="Est. ovulation" v={fmtShort(next.ovu)} />
              <Stat k="Est. fertile window" v={`${fmtShort(next.fertileStart).replace(/, \d{4}$/, "")} – ${fmtShort(next.fertileEnd).replace(/, \d{4}$/, "")}`} />
            </dl>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm tabular-nums">
                <caption className="mb-1 text-left text-xs subtle">Upcoming cycles (estimates)</caption>
                <thead><tr className="text-left subtle"><th className="py-1 pr-3 font-medium">Period</th><th className="pr-3 font-medium">Est. ovulation</th><th className="font-medium">Fertile window</th></tr></thead>
                <tbody>{rows.map((r) => (
                  <tr key={toISO(r.start)} className="border-t border-[var(--border)]">
                    <td className="py-1.5 pr-3">{fmtShort(r.start).replace(/, \d{4}$/, "")} – {fmtShort(r.end)}</td>
                    <td className="pr-3">{fmtShort(r.ovu).replace(/, \d{4}$/, "")}</td>
                    <td>{fmtShort(r.fertileStart).replace(/, \d{4}$/, "")} – {fmtShort(r.fertileEnd).replace(/, \d{4}$/, "")}</td>
                  </tr>))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </ResultCard>
    </div>
  );
}
