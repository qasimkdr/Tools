"use client";
import { ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { useToday } from "@/lib/useToday";
import { ageBetween, fmtLong, nextBirthday, parseISO, toISO, weekday } from "@/lib/date";

export default function AgeCalculator({ buildISO }: { buildISO: string }) {
  const today = useToday(buildISO);
  const [s, set] = useUrlState({ dob: "1990-05-15", at: "" });
  const dob = s.dob ? parseISO(s.dob) : null;
  const at = s.at ? parseISO(s.at) : today;
  const age = dob ? ageBetween(dob, at) : null;
  const nb = dob && age ? nextBirthday(dob, at) : null;
  const error = !dob ? "Enter a date of birth." : !age ? "The 'Age on' date is before the date of birth." : null;
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Age calculator">
        <div>
          <label htmlFor="dob" className="label">Date of birth</label>
          <input id="dob" type="date" className="field" value={s.dob} max="9999-12-31" onChange={(e) => set("dob", e.target.value)} />
        </div>
        <div>
          <label htmlFor="at" className="label">Age on</label>
          <input id="at" type="date" className="field" value={s.at || toISO(today)} onChange={(e) => set("at", e.target.value === toISO(today) ? "" : e.target.value)} />
          <p className="mt-1 text-xs subtle">Defaults to today. Pick any past or future date.</p>
        </div>
        {dob && <p className="text-sm muted">Born on a <strong className="text-[var(--text)]">{weekday(dob)}</strong>.</p>}
      </form>
      <ResultCard error={error} label={s.at ? `Age on ${fmtLong(at)}` : "Your age today"}
        value={age ? `${plural(age.years, "year")}, ${plural(age.months, "month")}, ${plural(age.days, "day")}` : ""}>
        {age && nb && (
          <>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <Stat k="Total months" v={age.totalMonths.toLocaleString()} />
              <Stat k="Total weeks" v={`${Math.floor(age.totalDays / 7).toLocaleString()} wk ${age.totalDays % 7} d`} />
              <Stat k="Total days" v={age.totalDays.toLocaleString()} />
              <Stat k="Approx. hours" v={(age.totalDays * 24).toLocaleString()} />
              <Stat k="Age in years (decimal)" v={(age.totalDays / 365.2425).toFixed(2)} />
              <Stat k="Next birthday" v={nb.inDays === 0 ? "Today! 🎉" : `in ${plural(nb.inDays, "day")}`} />
            </dl>
            <p className="mt-4 text-sm muted">
              {nb.inDays === 0 ? `Happy birthday! You turn ${nb.turning} today.` : <>You turn <strong className="text-[var(--text)]">{nb.turning}</strong> on {fmtLong(nb.date)}.</>}
            </p>
          </>
        )}
      </ResultCard>
    </div>
  );
}
