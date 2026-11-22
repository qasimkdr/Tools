"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { useToday } from "@/lib/useToday";
import { addDays, diffDays, fmtLong, fmtShort, parseISO } from "@/lib/date";

// Gestation (veterinary sources): ~63 days from ovulation (±1–2, Cornell); 64–66 days from the LH surge / progesterone rise (Merck);
// from breeding the spread is wider, most whelp 58–68 days after mating (breeding dates are imprecise).
const BASIS = {
  breeding: { label: "Breeding (mating) date", due: 63, lo: 58, hi: 68 },
  ovulation: { label: "Ovulation date", due: 63, lo: 61, hi: 65 },
  lh: { label: "LH surge / progesterone rise", due: 65, lo: 64, hi: 66 },
} as const;
type Basis = keyof typeof BASIS;
const STEPS = [
  { d: 21, t: "Embryos implant in the uterus (around days 18–21)." },
  { d: 28, t: "A vet can often confirm pregnancy by palpation or ultrasound (from about day 25–35)." },
  { d: 35, t: "Appetite and weight start to rise; increase food gradually as your vet advises." },
  { d: 45, t: "Puppy skeletons show on X-ray, so the vet can count the litter (after about day 45)." },
  { d: 55, t: "Set up a quiet whelping box; start taking her rectal temperature twice a day." },
];

export default function DogPregnancyCalculator({ buildISO }: { buildISO: string }) {
  const today = useToday(buildISO);
  const [s, set] = useUrlState({ basis: "breeding", date: buildISO });
  const basis = (s.basis in BASIS ? s.basis : "breeding") as Basis, b = BASIS[basis];
  const start = /^\d{4}-\d{2}-\d{2}$/.test(s.date) ? parseISO(s.date) : null;
  const ok = start && !Number.isNaN(start.getTime());
  const due = ok ? addDays(start, b.due) : null;
  // Milestones are placed relative to the due date (as days of a 63-day pregnancy), so they line up for every date type.
  const dayNow = ok ? diffDays(start, today) : 0;
  const left = due ? diffDays(today, due) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Dog pregnancy calculator">
        <Segmented label="I know the" value={basis} onChange={(v) => set("basis", v)}
          options={[{ id: "breeding", label: "Breeding date" }, { id: "ovulation", label: "Ovulation date" }, { id: "lh", label: "LH surge" }]} />
        <div>
          <label htmlFor="date" className="label">{b.label}</label>
          <input id="date" type="date" className="field" value={s.date} onChange={(e) => set("date", e.target.value)} />
          <p className="mt-1 text-xs subtle">{basis === "breeding" ? "If she was mated more than once, use the first date and expect the later end of the window." : "Ovulation and LH dates come from your vet's progesterone or LH tests and give the most precise due date."}</p>
        </div>
      </form>
      <ResultCard error={!ok ? "Enter a valid date." : null} label="Estimated due date" value={due ? fmtLong(due) : ""}>
        {due && <>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Likely whelping window" v={`${fmtShort(addDays(start!, b.lo))} – ${fmtShort(addDays(start!, b.hi))}`} />
            <Stat k={dayNow < 0 ? "Starts in" : left >= 0 ? "Days until due date" : "Days past due date"} v={dayNow < 0 ? `${-dayNow} days` : `${Math.abs(left)}`} />
            <Stat k="Today" v={dayNow < 0 ? "Not started" : dayNow > b.hi + 3 ? "Past the window" : `Day ${dayNow} · week ${Math.floor(dayNow / 7) + 1}`} />
            <Stat k="Gestation used" v={`${b.due} days (range ${b.lo}–${b.hi})`} />
          </dl>
          <p className="mt-4 text-sm font-medium">Timeline</p>
          <ol className="mt-1 space-y-2 text-sm" data-testid="timeline">
            {[...STEPS.map((st) => ({ date: addDays(due, st.d - 63), t: st.t })),
              { date: addDays(start!, b.lo), t: "Whelping window opens. A rectal temperature drop below about 99°F (37.2°C) usually means labor within 24 hours." }].map((st) => (
              <li key={st.t} className={st.date <= today ? "muted line-through decoration-1" : ""}><strong className="text-[var(--text)]">{fmtShort(st.date)}</strong> · {st.t}</li>
            ))}
          </ol>
          {left < -3 && dayNow <= b.hi + 7 && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">More than a few days past the due date: call your vet.</p>}
          <p className="mt-3 text-xs subtle">Estimate only. Only a vet can confirm pregnancy and how far along she is.</p>
        </>}
      </ResultCard>
    </div>
  );
}
