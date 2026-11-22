"use client";
import { ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { useToday } from "@/lib/useToday";
import { addDays, addMonths, diffDays, fmtLong, parseISO, startOfDay } from "@/lib/date";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function HalfBirthdayCalculator({ buildISO }: { buildISO: string }) {
  const today = useToday(buildISO);
  const [s, set] = useUrlState({ dob: "2018-03-15" });
  const dob = /^\d{4}-\d{2}-\d{2}$/.test(s.dob) ? parseISO(s.dob) : null;
  const valid = dob && !Number.isNaN(dob.getTime()) && dob <= today;

  // Six-month method with end-of-month clamping (Aug 31 → Feb 28/29).
  let k = 0, next = valid ? addMonths(dob, 6) : null;
  if (valid) while (next! < startOfDay(today)) { k++; next = addMonths(dob, 12 * k + 6); }
  const day = valid ? dob.getDate() : 0, halfMonth = valid ? (dob.getMonth() + 6) % 12 : 0;
  const clamps = valid && day > new Date(2001, halfMonth + 1, 0).getDate(); // day doesn't exist in the half month (common year)
  const leapNote = clamps && halfMonth === 1 ? `February 28 (February 29 in leap years)` : clamps ? `${MONTHS[halfMonth]} ${new Date(2001, halfMonth + 1, 0).getDate()}` : `${MONTHS[halfMonth]} ${day}`;
  // Midpoint method: halfway (in days) between the birthday that starts this cycle and the next one.
  const bStart = valid ? addMonths(dob, 12 * k) : null, bEnd = valid ? addMonths(dob, 12 * (k + 1)) : null;
  const mid = valid ? addDays(bStart!, Math.floor(diffDays(bStart!, bEnd!) / 2)) : null;
  const upcoming = valid ? [1, 2, 3].map((i) => addMonths(dob, 12 * (k + i) + 6)) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Half birthday calculator">
        <div>
          <label htmlFor="dob" className="label">Date of birth</label>
          <input id="dob" type="date" className="field" value={s.dob} onChange={(e) => set("dob", e.target.value)} max={buildISO} />
        </div>
        <p className="text-sm muted">Your half birthday is <strong className="text-[var(--text)]" data-testid="every">{valid ? `every ${leapNote}` : "…"}</strong>.</p>
      </form>
      <ResultCard error={!valid ? "Enter a date of birth in the past." : null} label="Your next half birthday" value={next ? fmtLong(next) : ""}>
        {next && <>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Days to go" v={diffDays(today, next) === 0 ? "It's today! 🎉" : diffDays(today, next).toLocaleString()} />
            <Stat k="You'll be" v={`${k}½`} />
            <Stat k="Exact midpoint method" v={fmtLong(mid!)} />
            <Stat k="Next birthday after it" v={fmtLong(bEnd!)} />
          </dl>
          <p className="mt-4 text-sm font-medium">Upcoming half birthdays</p>
          <ul className="mt-1 space-y-1 text-sm muted">{upcoming.map((d, i) => <li key={i}>{fmtLong(d)} · {k + i + 1}½</li>)}</ul>
        </>}
      </ResultCard>
    </div>
  );
}
