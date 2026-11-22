"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// Official section weights (College Board, AP World History: Modern exam): MCQ 40%, SAQ 20%, DBQ 25%, LEQ 15%.
// Score bands are ESTIMATES (cutoffs commonly used by score calculators, ≈ 97/80/62/44 of a 130-point composite).
const BANDS = [{ s: 5, min: 97 / 130 }, { s: 4, min: 80 / 130 }, { s: 3, min: 62 / 130 }, { s: 2, min: 44 / 130 }, { s: 1, min: 0 }];
const clamp = (v: string, max: number) => Math.max(0, Math.min(max, Number(v) || 0));

export default function ApWorldCalculator() {
  const [s, set] = useUrlState({ mc: "40", s1: "2", s2: "2", s3: "2", dbq: "4", leq: "3" });
  const mc = clamp(s.mc, 55), saq = clamp(s.s1, 3) + clamp(s.s2, 3) + clamp(s.s3, 3), dbq = clamp(s.dbq, 7), leq = clamp(s.leq, 6);
  const parts = { mc: 0.4 * (mc / 55), saq: 0.2 * (saq / 9), dbq: 0.25 * (dbq / 7), leq: 0.15 * (leq / 6) };
  const pct = parts.mc + parts.saq + parts.dbq + parts.leq;
  const band = BANDS.find((b) => pct >= b.min)!;
  const next = BANDS.find((b) => b.s === band.s + 1);
  const nearNext = next && next.min - pct <= 0.03, nearPrev = band.s > 1 && pct - band.min <= 0.03;
  const mcNeeded = next ? Math.ceil(((next.min - (pct - parts.mc)) / 0.4) * 55) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="AP World History score calculator">
        <Field id="mc" label="Multiple choice: questions correct (out of 55)" value={s.mc} onChange={(v) => set("mc", v)} min={0} inputMode="numeric" />
        <div>
          <span className="label">Short-answer points (0–3 each)</span>
          <div className="grid grid-cols-3 gap-3">
            {(["s1", "s2", "s3"] as const).map((k, i) => <Field key={k} id={k} label={`SAQ ${i + 1}`} value={s[k]} onChange={(v) => set(k, v)} min={0} inputMode="numeric" />)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="dbq" label="DBQ (0–7)" value={s.dbq} onChange={(v) => set("dbq", v)} min={0} inputMode="numeric" />
          <Field id="leq" label="Long essay (0–6)" value={s.leq} onChange={(v) => set("leq", v)} min={0} inputMode="numeric" />
        </div>
      </form>
      <ResultCard label="Estimated AP score" value={`${band.s}`}>
        <p className="mt-1 text-sm muted">Weighted score: <strong className="text-[var(--text)]">{(pct * 100).toFixed(1)}%</strong> (≈ {Math.round(pct * 130)} / 130 composite)</p>
        {(nearNext || nearPrev) && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">You&apos;re within about 3 points of a boundary. This could plausibly be a {nearNext ? `${band.s} or ${band.s + 1}` : `${band.s - 1} or ${band.s}`}.</p>}
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Multiple choice (40%)" v={`${(parts.mc * 100).toFixed(1)} pts`} />
          <Stat k="Short answer (20%)" v={`${(parts.saq * 100).toFixed(1)} pts`} />
          <Stat k="DBQ (25%)" v={`${(parts.dbq * 100).toFixed(1)} pts`} />
          <Stat k="Long essay (15%)" v={`${(parts.leq * 100).toFixed(1)} pts`} />
        </dl>
        {next && mcNeeded !== null && <p className="mt-4 text-sm muted">For an estimated {next.s} with the same written scores, you&apos;d need about <strong className="text-[var(--text)]">{mcNeeded <= 55 ? `${mcNeeded} multiple-choice questions` : "more written-response points (multiple choice alone can't get you there)"}</strong> correct.</p>}
        <p className="mt-3 text-xs subtle">Estimate only: the College Board sets real cutoffs after each exam.</p>
      </ResultCard>
    </div>
  );
}
