"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// May 2027 format (College Board CED effective fall 2026): 42 MCQ = 50%; 4 FRQs × 10 points, each 12.5%.
// No cutoffs exist for this format yet. Published calculator estimates (older format) disagree, so we show two:
const LENIENT = [65, 50, 38, 27], STRICT = [75, 60, 45, 30]; // minimum composite for 5, 4, 3, 2
const score = (c: number, b: number[]) => (c >= b[0] ? 5 : c >= b[1] ? 4 : c >= b[2] ? 3 : c >= b[3] ? 2 : 1);
const clamp = (v: string, max: number) => Math.max(0, Math.min(max, Number(v) || 0));
const FRQ = ["q1", "q2", "q3", "q4"] as const;
const LABEL = { q1: "Q1 · multi-focus (practices 1–2)", q2: "Q2 · multi-focus (practices 3–4)", q3: "Q3 · inference", q4: "Q4 · multi-focus (practices 2–4)" };

export default function ApStatsCalculator() {
  const [s, set] = useUrlState({ mc: "30", q1: "6", q2: "6", q3: "5", q4: "7" });
  const mc = clamp(s.mc, 42), frq = FRQ.reduce((a, k) => a + clamp(s[k], 10), 0);
  const mcPart = (mc / 42) * 50, frqPart = (frq / 40) * 50, comp = mcPart + frqPart;
  const lo = score(comp, STRICT), hi = score(comp, LENIENT);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="AP Statistics score calculator">
        <Field id="mc" label="Multiple choice: questions correct (out of 42)" value={s.mc} onChange={(v) => set("mc", v)} min={0} inputMode="numeric" />
        <div>
          <span className="label">Free-response points (0–10 each)</span>
          <div className="grid grid-cols-2 gap-3">
            {FRQ.map((k) => <Field key={k} id={k} label={LABEL[k]} value={s[k]} onChange={(v) => set(k, v)} min={0} inputMode="numeric" />)}
          </div>
          <p className="mt-2 text-xs subtle">Focus areas follow the College Board's course and exam description. Score each response with the 10-point analytic rubric.</p>
        </div>
      </form>
      <ResultCard label="Estimated AP score" value={lo === hi ? `${lo}` : `${lo} or ${hi}`}>
        <p className="mt-1 text-sm muted">Composite: <strong className="text-[var(--text)]">{comp.toFixed(1)} / 100</strong></p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k={`Multiple choice (${mc}/42)`} v={`${mcPart.toFixed(1)} of 50`} />
          <Stat k={`Free response (${frq}/40)`} v={`${frqPart.toFixed(1)} of 50`} />
          <Stat k="With stricter cutoffs" v={lo} />
          <Stat k="With lenient cutoffs" v={hi} />
          <Stat k="One MC question" v="1.19 composite pts" />
          <Stat k="One FRQ point" v="1.25 composite pts" />
        </dl>
        {lo !== hi && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">Your composite falls where published estimates disagree, so it could be a {lo} or a {hi}.</p>}
        <p className="mt-3 text-xs subtle">Estimate only. May 2027 is the first exam in this format, so no official cutoffs exist; the College Board sets them after scoring.</p>
      </ResultCard>
    </div>
  );
}
