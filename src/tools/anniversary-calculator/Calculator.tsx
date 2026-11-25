"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { useToday } from "@/lib/useToday";
import { addDays, addMonths, ageBetween, diffDays, fmtLong, fmtShort, nextBirthday, parseISO, toISO, weekday } from "@/lib/date";

// Commonly listed traditional (US) wedding anniversary themes; lists vary by source, so only widely agreed years are shown.
export const GIFTS: Record<number, string> = { 1: "Paper", 2: "Cotton", 3: "Leather", 5: "Wood", 6: "Iron", 7: "Wool or copper", 8: "Bronze or pottery", 10: "Tin or aluminum", 15: "Crystal", 25: "Silver", 45: "Sapphire", 60: "Diamond" };
const ord = (n: number) => { const s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
const n0 = (x: number) => Math.round(x).toLocaleString("en-US");
const TYPES = { wedding: "Wedding", relationship: "Relationship", work: "Work" } as const;

export default function AnniversaryCalculator({ buildISO }: { buildISO: string }) {
  const today = useToday(buildISO);
  const [s, set] = useUrlState({ start: "2015-06-20", type: "wedding", at: "" });
  const type = (s.type in TYPES ? s.type : "wedding") as keyof typeof TYPES;
  const start = parseISO(s.start), at = s.at ? parseISO(s.at) : today;
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(s.start) && !Number.isNaN(start.getTime());
  const span = valid ? ageBetween(start, at) : null;
  const err = !valid ? "Enter the date you married, got together or started the job." : !span ? "The start date is after the date you are counting to." : null;
  const next = valid ? nextBirthday(start, at) : null;
  const totalDays = span ? span.totalDays : 0;
  const noun = type === "work" ? "work anniversary" : "anniversary";
  const dayMilestones = [100, 500, 1000, 2000, 5000, 7500, 10000, 15000, 20000].map((d) => ({ label: `${n0(d)} days`, date: addDays(start, d) }));
  const yearMilestones = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60].map((y) => ({ label: `${ord(y)} ${noun}`, date: addMonths(start, y * 12), y }));
  const upcoming = [...dayMilestones, ...yearMilestones].filter((m) => diffDays(at, m.date) >= 0).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 6);
  const gift = type === "wedding" && next ? GIFTS[next.turning] : undefined;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Anniversary calculator">
        <Segmented label="Anniversary type" value={type} onChange={(v) => set("type", v)} options={Object.entries(TYPES).map(([id, label]) => ({ id: id as keyof typeof TYPES, label }))} />
        <div>
          <label htmlFor="start" className="label">{type === "work" ? "Start date at the job" : type === "wedding" ? "Wedding date" : "Date you got together"}</label>
          <input id="start" type="date" className="field" value={s.start} onChange={(e) => set("start", e.target.value)} />
        </div>
        <div>
          <label htmlFor="at" className="label">Count to</label>
          <input id="at" type="date" className="field" value={s.at || toISO(today)} onChange={(e) => set("at", e.target.value === toISO(today) ? "" : e.target.value)} />
          <p className="mt-1 text-xs subtle">Defaults to today. Pick a date to see how long it will have been.</p>
        </div>
      </form>
      <ResultCard error={err} label={type === "work" ? "Years of service" : type === "wedding" ? "Married for" : "Together for"}
        value={span ? <span data-testid="span">{span.years} yr {span.months} mo {span.days} d</span> : "–"}>
        {span && next && <>
          <p className="mt-1 text-sm muted">Since {fmtLong(start)}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <Stat k="Total days" v={<span data-testid="days">{n0(totalDays)}</span>} />
            <Stat k="Total weeks" v={`${n0(Math.floor(totalDays / 7))} w ${totalDays % 7} d`} />
            <Stat k="Total months" v={n0(span.totalMonths)} />
          </dl>
          <div className="mt-4 rounded-xl bg-[var(--surface-2)] p-4" data-testid="next">
            {next.inDays === 0
              ? <p className="font-semibold">Happy {ord(next.turning)} {noun} today!</p>
              : <p>Your <strong>{ord(next.turning)} {noun}</strong> is on <strong>{fmtLong(next.date)}</strong>, in <strong>{n0(next.inDays)} day{next.inDays === 1 ? "" : "s"}</strong>.</p>}
            {gift && <p className="mt-1 text-sm muted" data-testid="gift">Traditional {ord(next.turning)} anniversary theme: <strong>{gift}</strong>.</p>}
          </div>
          <h2 className="mt-5 text-sm font-semibold">Coming up</h2>
          <table className="mt-2 w-full text-sm" data-testid="milestones">
            <tbody>
              {upcoming.map((m) => {
                const inD = diffDays(at, m.date);
                return <tr key={m.label} className="border-t border-[var(--border)]"><td className="py-1 pr-2">{m.label}</td><td>{fmtShort(m.date)} <span className="subtle">({weekday(m.date).slice(0, 3)})</span></td><td className="text-right subtle">{inD === 0 ? "today" : `in ${n0(inD)} d`}</td></tr>;
              })}
            </tbody>
          </table>
          {start.getMonth() === 1 && start.getDate() === 29 && <p className="mt-3 text-xs subtle">For a February 29 date, anniversaries in common years are counted on February 28.</p>}
        </>}
      </ResultCard>
    </div>
  );
}
