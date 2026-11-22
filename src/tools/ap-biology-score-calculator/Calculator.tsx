"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// Official structure (College Board AP Biology exam page + 2025 scoring statistics): Section I 60 MCQ = 50%;
// Section II 6 FRQs = 50%, Q1–Q2 worth 9 points each, Q3–Q6 worth 4 each (34 points).
// Score bands are ESTIMATES: the College Board doesn't publish cutoffs. Bands ≈ 93/74/51/28 of a 120-point composite,
// the approximate cutoffs used by popular score calculators.
const BANDS = [{ s: 5, min: 93 / 120 }, { s: 4, min: 74 / 120 }, { s: 3, min: 51 / 120 }, { s: 2, min: 28 / 120 }, { s: 1, min: 0 }];
const FRQ = [{ k: "q1", max: 9, label: "Q1 (long)" }, { k: "q2", max: 9, label: "Q2 (long)" }, { k: "q3", max: 4, label: "Q3" }, { k: "q4", max: 4, label: "Q4" }, { k: "q5", max: 4, label: "Q5" }, { k: "q6", max: 4, label: "Q6" }] as const;
const clamp = (v: string, max: number) => Math.max(0, Math.min(max, Number(v) || 0));

export default function ApBioCalculator() {
  const [s, set] = useUrlState({ mc: "45", q1: "6", q2: "6", q3: "3", q4: "3", q5: "3", q6: "3" });
  const mc = clamp(s.mc, 60), frq = FRQ.reduce((a, f) => a + clamp(s[f.k], f.max), 0);
  const mcPart = 0.5 * (mc / 60), frqPart = 0.5 * (frq / 34), pct = mcPart + frqPart;
  const band = BANDS.find((b) => pct >= b.min - 1e-9)!;
  const next = BANDS.find((b) => b.s === band.s + 1);
  const nearNext = next && next.min - pct <= 0.025, nearPrev = band.s > 1 && pct - band.min <= 0.025;
  const mcNeeded = next ? Math.ceil(((next.min - frqPart) / 0.5) * 60) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="AP Biology score calculator">
        <Field id="mc" label="Multiple choice: questions correct (out of 60)" value={s.mc} onChange={(v) => set("mc", v)} min={0} inputMode="numeric" />
        <div>
          <span className="label">Free-response points</span>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {FRQ.map((f) => <Field key={f.k} id={f.k} label={`${f.label} · 0–${f.max}`} value={s[f.k]} onChange={(v) => set(f.k, v)} min={0} inputMode="numeric" />)}
          </div>
          <p className="mt-2 text-xs subtle">Q1–Q2: interpreting and evaluating experimental results (Q2 with graphing). Q3–Q6: scientific investigation, conceptual analysis, models, data analysis.</p>
        </div>
      </form>
      <ResultCard label="Estimated AP score" value={`${band.s}`}>
        <p className="mt-1 text-sm muted">Weighted score: <strong className="text-[var(--text)]">{(pct * 100).toFixed(1)}%</strong> (≈ {Math.round(pct * 120)} / 120 composite)</p>
        {(nearNext || nearPrev) && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">You&apos;re within about 3 composite points of a boundary. This could plausibly be a {nearNext ? `${band.s} or ${band.s + 1}` : `${band.s - 1} or ${band.s}`}.</p>}
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k={`Multiple choice (${mc}/60)`} v={`${(mcPart * 100).toFixed(1)} of 50`} />
          <Stat k={`Free response (${frq}/34)`} v={`${(frqPart * 100).toFixed(1)} of 50`} />
          <Stat k="One MC question is worth" v="0.83%" />
          <Stat k="One FRQ point is worth" v="1.47%" />
        </dl>
        {next && mcNeeded !== null && <p className="mt-4 text-sm muted">For an estimated {next.s} with the same free-response points, you&apos;d need about <strong className="text-[var(--text)]">{mcNeeded <= 60 ? `${mcNeeded} multiple-choice questions` : "more free-response points (multiple choice alone can't get you there)"}</strong> correct.</p>}
        <p className="mt-3 text-xs subtle">Estimate only: the College Board sets real cutoffs after each exam and doesn&apos;t publish them.</p>
      </ResultCard>
    </div>
  );
}
