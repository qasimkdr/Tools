"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { courseGrade, letter, neededOnFinal, weighted } from "@/lib/grades";

const TARGETS = [90, 80, 70, 60];
const pct = (v: number) => `${+v.toFixed(2)}%`;

export default function GradeCalculator() {
  const [s, set] = useUrlState({ mode: "final", cur: "82", w: "25", tgt: "85", rows: "Homework:95:20,Quizzes:88:20,Midterm:78:25,Project:91:15" });
  const mode = s.mode === "weighted" ? "weighted" : "final";
  const rows = s.rows.split(",").map((r) => { const [name = "", score = "", weight = ""] = r.split(":"); return { name, score, weight }; });
  const setRow = (i: number, k: "name" | "score" | "weight", v: string) =>
    set("rows", rows.map((r, j) => (j === i ? { ...r, [k]: v.replace(/[:,]/g, "") } : r)).map((r) => `${r.name}:${r.score}:${r.weight}`).join(","));
  const cur = Number(s.cur), w = Number(s.w) / 100, tgt = Number(s.tgt);
  const need = neededOnFinal(cur, w, tgt);
  const wg = weighted(rows.map((r) => ({ score: Number(r.score), weight: Number(r.weight) })));
  const error = mode === "final"
    ? (!(cur >= 0) || s.cur === "" ? "Enter your current grade." : !(w > 0 && w < 1) ? "Enter the final's weight as a percentage between 0 and 100." : null)
    : (!(wg.weight > 0) ? "Enter at least one score with a weight above 0." : null);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Grade calculator">
        <Segmented label="What do you want to know?" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "final", label: "Score needed on final" }, { id: "weighted", label: "Weighted grade" }]} />
        {mode === "final" ? <>
          <Field id="cur" label="Current grade (before the final)" suffix="%" value={s.cur} onChange={(v) => set("cur", v)} min={0} />
          <div className="grid grid-cols-2 gap-3">
            <Field id="w" label="Final exam weight" suffix="%" value={s.w} onChange={(v) => set("w", v)} min={0} hint="From your syllabus" />
            <Field id="tgt" label="Grade you want" suffix="%" value={s.tgt} onChange={(v) => set("tgt", v)} min={0} />
          </div>
        </> : <>
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_5.5rem_5.5rem] gap-2 text-xs font-medium subtle"><span>Category / assignment</span><span>Score %</span><span>Weight %</span></div>
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-[1fr_5.5rem_5.5rem] gap-2">
                <input aria-label={`Name ${i + 1}`} className="field" value={r.name} onChange={(e) => setRow(i, "name", e.target.value)} />
                <input aria-label={`Score ${i + 1}`} className="field tabular-nums" type="number" inputMode="decimal" value={r.score} onChange={(e) => setRow(i, "score", e.target.value)} />
                <input aria-label={`Weight ${i + 1}`} className="field tabular-nums" type="number" inputMode="decimal" value={r.weight} onChange={(e) => setRow(i, "weight", e.target.value)} />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-ghost !py-2" disabled={rows.length >= 15} onClick={() => set("rows", `${s.rows},:: `.trim())}>+ Add row</button>
            <button type="button" className="btn-ghost !py-2" disabled={rows.length <= 1} onClick={() => set("rows", s.rows.split(",").slice(0, -1).join(","))}>− Remove last</button>
          </div>
        </>}
      </form>
      {mode === "final" ? (
        <ResultCard error={error} label={`You need on the final to get ${pct(tgt)}`} value={pct(need)}>
          <p className={`mt-1 text-sm font-semibold ${need > 100 ? "text-red-700" : need <= 0 ? "text-[var(--color-brand-600)]" : "muted"}`} data-testid="verdict">
            {need > 100 ? "Above 100%: not reachable without extra credit." : need <= 0 ? "You've already secured it, even with a 0 on the final." : `That's ${/^[AF]/.test(letter(need)) ? "an" : "a"} ${letter(need)} on the exam.`}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {TARGETS.map((t) => { const n = neededOnFinal(cur, w, t); return <Stat key={t} k={`For ${t}% (${letter(t)})`} v={n > 100 ? "Not possible" : n <= 0 ? "Secured" : pct(n)} />; })}
          </dl>
          <p className="mt-4 text-sm font-medium">If you score…</p>
          <table className="mt-1 w-full text-sm" data-testid="whatif">
            <tbody>{[100, 90, 80, 70, 60, 50].map((f) => { const g = courseGrade(cur, w, f); return (
              <tr key={f} className="border-t border-[var(--border)]"><td className="py-1">{f}% on the final</td><td className="py-1 text-right tabular-nums">{pct(g)} · {letter(g)}</td></tr>
            ); })}</tbody>
          </table>
        </ResultCard>
      ) : (
        <ResultCard error={error} label="Weighted grade" value={`${pct(wg.pct)} · ${letter(wg.pct)}`}>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Weights entered" v={`${+wg.weight.toFixed(2)}%`} />
            <Stat k="Remaining weight" v={wg.weight < 100 ? `${+(100 - wg.weight).toFixed(2)}%` : "—"} />
          </dl>
          {wg.weight < 100 && <p className="mt-3 text-sm muted">Your grade so far, based on the {+wg.weight.toFixed(2)}% of the course that&apos;s graded. Switch to &quot;Score needed on final&quot; with {pct(wg.pct)} as your current grade and {+(100 - wg.weight).toFixed(2)}% as the final&apos;s weight to plan the rest.</p>}
          {wg.weight > 100 && <p className="mt-3 text-sm text-amber-800">Weights add up to more than 100%; the result is scaled to the total entered.</p>}
        </ResultCard>
      )}
    </div>
  );
}
