"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// Official (College Board exam page): 45 MCQ = 45%; 3 free-response essays = 55%, each scored 0–6 on an analytic rubric.
// Cutoffs aren't published; published calculator estimates differ, so two sets are shown.
const LENIENT = [70, 58, 43, 30], STRICT = [75, 61, 46, 30];
const score = (c: number, b: number[]) => (c >= b[0] ? 5 : c >= b[1] ? 4 : c >= b[2] ? 3 : c >= b[3] ? 2 : 1);
const clamp = (v: string, max: number) => Math.max(0, Math.min(max, Number(v) || 0));
const ESSAYS = [{ k: "e1", label: "Synthesis essay" }, { k: "e2", label: "Rhetorical analysis" }, { k: "e3", label: "Argument essay" }] as const;

export default function ApLangCalculator() {
  const [s, set] = useUrlState({ mc: "32", e1: "4", e2: "4", e3: "3" });
  const mc = clamp(s.mc, 45), essays = ESSAYS.reduce((a, e) => a + clamp(s[e.k], 6), 0);
  const mcPart = (mc / 45) * 45, frPart = (essays / 18) * 55, comp = mcPart + frPart;
  const lo = score(comp, STRICT), hi = score(comp, LENIENT);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="AP English Language score calculator">
        <Field id="mc" label="Multiple choice: questions correct (out of 45)" value={s.mc} onChange={(v) => set("mc", v)} min={0} inputMode="numeric" />
        <div>
          <span className="label">Essay scores (0–6 each)</span>
          <div className="grid grid-cols-3 gap-3">{ESSAYS.map((e) => <Field key={e.k} id={e.k} label={e.label} value={s[e.k]} onChange={(v) => set(e.k, v)} min={0} inputMode="numeric" />)}</div>
          <p className="mt-2 text-xs subtle">Each essay: thesis 0–1, evidence and commentary 0–4, sophistication 0–1.</p>
        </div>
      </form>
      <ResultCard label="Estimated AP score" value={lo === hi ? `${lo}` : `${lo} or ${hi}`}>
        <p className="mt-1 text-sm muted">Composite: <strong className="text-[var(--text)]">{comp.toFixed(1)} / 100</strong></p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k={`Multiple choice (${mc}/45)`} v={`${mcPart.toFixed(1)} of 45`} />
          <Stat k={`Essays (${essays}/18)`} v={`${frPart.toFixed(1)} of 55`} />
          <Stat k="One MC question" v="1.00 composite pt" />
          <Stat k="One essay point" v="3.06 composite pts" />
        </dl>
        {lo !== hi && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">Your composite falls where published estimates disagree, so it could be a {lo} or a {hi}.</p>}
        <p className="mt-3 text-xs subtle">Estimate only: the College Board sets cutoffs after each exam and doesn&apos;t publish them.</p>
      </ResultCard>
    </div>
  );
}
