"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { useToday } from "@/lib/useToday";
import { addDays, diffDays, fmtLong, fmtShort, parseISO } from "@/lib/date";

// Average ≈ 340 days; normal range ≈ 320–370 days (University of Nebraska Extension); most mares foal ~330–345 days.
const STEPS = [
  { d: 15, t: "Ultrasound pregnancy check, including a check for twins (around days 14–16)." },
  { d: 28, t: "A heartbeat is usually visible on ultrasound by about day 25–30." },
  { d: 150, t: "Month 5: many vets begin EHV-1 (rhinopneumonitis) vaccination, often repeated at months 7 and 9." },
  { d: 280, t: "Pre-foaling vaccine boosters are commonly given 4–6 weeks before the due date; plan with your vet." },
  { d: 310, t: "Prepare a clean, roomy foaling stall and watch for udder development." },
];

export default function HorseGestationCalculator({ buildISO }: { buildISO: string }) {
  const today = useToday(buildISO);
  const [s, set] = useUrlState({ date: buildISO, len: "340" });
  const start = /^\d{4}-\d{2}-\d{2}$/.test(s.date) ? parseISO(s.date) : null;
  const ok = start && !Number.isNaN(start.getTime());
  const len = Math.min(380, Math.max(300, Math.round(Number(s.len) || 340)));
  const due = ok ? addDays(start, len) : null;
  const day = ok ? diffDays(start, today) : 0, left = due ? diffDays(today, due) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Horse gestation calculator">
        <div>
          <label htmlFor="date" className="label">Breeding (last cover) date</label>
          <input id="date" type="date" className="field" value={s.date} onChange={(e) => set("date", e.target.value)} />
          <p className="mt-1 text-xs subtle">With several covers, use the last one; with AI or a known ovulation date, use that.</p>
        </div>
        <Field id="len" label="Gestation length to use" suffix="days" value={s.len} onChange={(v) => set("len", v)} min={300} inputMode="numeric" hint="340 is the average; use your mare's previous pregnancies if you know them" />
      </form>
      <ResultCard error={!ok ? "Enter a valid breeding date." : null} label="Estimated foaling date" value={due ? fmtLong(due) : ""}>
        {due && <>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Most mares foal (330–345 days)" v={`${fmtShort(addDays(start!, 330))} – ${fmtShort(addDays(start!, 345))}`} />
            <Stat k="Normal range (320–370 days)" v={`${fmtShort(addDays(start!, 320))} – ${fmtShort(addDays(start!, 370))}`} />
            <Stat k="Today" v={day < 0 ? "Not started" : day > 380 ? "Past the window" : `Day ${day} · month ${Math.floor(day / 30.4) + 1}`} />
            <Stat k={left >= 0 ? "Days until due date" : "Days past due date"} v={Math.abs(left)} />
          </dl>
          <p className="mt-4 text-sm font-medium">Timeline</p>
          <ol className="mt-1 space-y-2 text-sm" data-testid="timeline">
            {STEPS.map((st) => { const d = addDays(start!, st.d); return <li key={st.d} className={d <= today ? "muted line-through decoration-1" : ""}><strong className="text-[var(--text)]">{fmtShort(d)}</strong> · {st.t}</li>; })}
            <li><strong className="text-[var(--text)]">{fmtShort(addDays(start!, 320))}</strong> · Foaling window opens. Signs include waxing teats, a relaxed tailhead and restlessness.</li>
          </ol>
          <p className="mt-3 text-xs subtle">Estimate only. Gestation varies by mare, season and breed; confirm pregnancy and plan foaling with your veterinarian.</p>
        </>}
      </ResultCard>
    </div>
  );
}
