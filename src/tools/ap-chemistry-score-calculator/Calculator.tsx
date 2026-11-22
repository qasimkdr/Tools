"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// Official structure (College Board exam page + ap25 scoring statistics): Section I 60 MCQ = 50%; Section II 7 FRQs = 50%,
// Q1–Q3 long (10 points each), Q4–Q7 short (4 each) = 46 points.
// Bands are ESTIMATES on a 100-point composite (72/58/42/27, as used by popular calculators); the College Board doesn't publish cutoffs.
const BANDS = [{ s: 5, min: 72 }, { s: 4, min: 58 }, { s: 3, min: 42 }, { s: 2, min: 27 }, { s: 1, min: 0 }];
const FRQ = [{ k: "q1", max: 10, label: "Q1 (long)" }, { k: "q2", max: 10, label: "Q2 (long)" }, { k: "q3", max: 10, label: "Q3 (long)" }, { k: "q4", max: 4, label: "Q4" }, { k: "q5", max: 4, label: "Q5" }, { k: "q6", max: 4, label: "Q6" }, { k: "q7", max: 4, label: "Q7" }] as const;
const clamp = (v: string, max: number) => Math.max(0, Math.min(max, Number(v) || 0));

export default function ApChemCalculator() {
  const [s, set] = useUrlState({ mc: "40", q1: "6", q2: "5", q3: "5", q4: "3", q5: "2", q6: "2", q7: "2" });
  const mc = clamp(s.mc, 60), frq = FRQ.reduce((a, f) => a + clamp(s[f.k], f.max), 0);
  const mcPart = (mc * 50) / 60, frqPart = (frq * 50) / 46, comp = mcPart + frqPart;
  const band = BANDS.find((b) => comp >= b.min - 1e-9)!;
  const next = BANDS.find((b) => b.s === band.s + 1);
  const nearNext = next && next.min - comp <= 3, nearPrev = band.s > 1 && comp - band.min <= 3;
  const mcNeeded = next ? Math.ceil(((next.min - frqPart) / 50) * 60) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="AP Chemistry score calculator">
        <Field id="mc" label="Multiple choice: questions correct (out of 60)" value={s.mc} onChange={(v) => set("mc", v)} min={0} inputMode="numeric" />
        <div>
          <span className="label">Free-response points</span>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {FRQ.map((f) => <Field key={f.k} id={f.k} label={`${f.label} · 0–${f.max}`} value={s[f.k]} onChange={(v) => set(f.k, v)} min={0} inputMode="numeric" />)}
          </div>
          <p className="mt-2 text-xs subtle">Three long questions (10 points each) and four short questions (4 points each): 46 points in total.</p>
        </div>
      </form>
      <ResultCard label="Estimated AP score" value={`${band.s}`}>
        <p className="mt-1 text-sm muted">Composite: <strong className="text-[var(--text)]">{comp.toFixed(1)} / 100</strong></p>
        {(nearNext || nearPrev) && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">You&apos;re within about 3 points of a boundary. This could plausibly be a {nearNext ? `${band.s} or ${band.s + 1}` : `${band.s - 1} or ${band.s}`}.</p>}
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k={`Multiple choice (${mc}/60)`} v={`${mcPart.toFixed(1)} of 50`} />
          <Stat k={`Free response (${frq}/46)`} v={`${frqPart.toFixed(1)} of 50`} />
          <Stat k="One MC question is worth" v="0.83 pts" />
          <Stat k="One FRQ point is worth" v="1.09 pts" />
        </dl>
        {next && mcNeeded !== null && <p className="mt-4 text-sm muted">For an estimated {next.s} with the same free-response points, you&apos;d need about <strong className="text-[var(--text)]">{mcNeeded <= 60 ? `${mcNeeded} multiple-choice questions` : "more free-response points (multiple choice alone can't get you there)"}</strong> correct.</p>}
        <p className="mt-3 text-xs subtle">Estimate only: the College Board sets real cutoffs after each exam and doesn&apos;t publish them.</p>
      </ResultCard>
    </div>
  );
}
