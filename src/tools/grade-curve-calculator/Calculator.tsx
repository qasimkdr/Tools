"use client";
import { Field, ResultCard, Segmented, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { parseNumbers } from "@/lib/descriptive";
import { curve, letter, type CurveMethod } from "@/lib/gradeCurve";

const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
const METHODS: { id: CurveMethod; label: string }[] = [{ id: "flat", label: "Flat points" }, { id: "mean", label: "Target average" }, { id: "scale", label: "Scale to top" }, { id: "sqrt", label: "Square root" }, { id: "bell", label: "Bell curve" }];

export default function GradeCurveCalculator() {
  const [s, set] = useUrlState({ scores: "52, 61, 64, 68, 70, 73, 75, 78, 81, 88", outOf: "100", m: "flat", top: "100", pts: "", mean: "75", sd: "10", cap: "1" });
  const { nums, bad } = parseNumbers(s.scores);
  const outOf = Number(s.outOf) || 100;
  const pctScores = nums.map((x) => (x / outOf) * 100);
  const method = (METHODS.some((x) => x.id === s.m) ? s.m : "flat") as CurveMethod;
  const r = bad.length || !nums.length ? null : curve(pctScores, method, { top: Number(s.top) || 100, mean: Number(s.mean), sd: Number(s.sd), points: Number(s.pts) || 0, cap: s.cap === "1" });
  const err = bad.length ? `Not a number: ${bad.slice(0, 3).join(", ")}` : !nums.length ? "Enter the class's scores." : null;
  const count = (arr: number[]) => ["A", "B", "C", "D", "F"].map((g) => arr.filter((x) => letter(x) === g).length);

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Grade curve calculator">
          <div>
            <label htmlFor="scores" className="label">Test scores</label>
            <textarea id="scores" rows={4} className="field font-mono" value={s.scores} onChange={(e) => set("scores", e.target.value)} spellCheck={false} />
            <p className="mt-1 text-xs subtle">Separate with commas, spaces or new lines, or paste a spreadsheet column.</p>
          </div>
          <Field id="outOf" label="Scores are out of" suffix="points" value={s.outOf} onChange={(v) => set("outOf", v)} min={1} />
          <Segmented label="Curve method" value={method} onChange={(v) => set("m", v)} options={METHODS} />
          <div className="grid grid-cols-2 gap-3">
            {(method === "flat" || method === "scale") && <Field id="top" label="Top score becomes" suffix="%" value={s.top} onChange={(v) => set("top", v)} min={0} />}
            {method === "flat" && <Field id="pts" label="Or add exactly" suffix="points" value={s.pts} onChange={(v) => set("pts", v)} min={0} hint="Leave blank to lift the top score" />}
            {(method === "mean" || method === "bell") && <Field id="mean" label="Target average" suffix="%" value={s.mean} onChange={(v) => set("mean", v)} />}
            {method === "bell" && <Field id="sd" label="Target spread (SD)" suffix="points" value={s.sd} onChange={(v) => set("sd", v)} min={0} />}
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.cap === "1"} onChange={(e) => set("cap", e.target.checked ? "1" : "0")} /> Cap curved scores at 100%</label>
        </form>
        <ResultCard label="New class average" error={err} value={r ? `${f1(r.newMean)}%` : "–"}>
          {r && <>
            <p className="mt-1 text-sm muted" data-testid="note">{r.note}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Original average" v={<span data-testid="old-mean">{f1(r.mean)}%</span>} />
              <Stat k="Original high / low" v={`${f1(r.max)}% / ${f1(r.min)}%`} />
              <Stat k="Grades before (A–F)" v={count(pctScores).join(" · ")} />
              <Stat k="Grades after (A–F)" v={<span data-testid="after">{count(r.out).join(" · ")}</span>} />
            </dl>
            <p className="mt-4 text-xs subtle">Letter grades use the common 90/80/70/60 scale. Instructors set their own curve policies.</p>
          </>}
        </ResultCard>
      </div>
      {r && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold">Curved scores</h3>
            <button type="button" className="btn-ghost text-sm" onClick={() => downloadCsv("curved-scores.csv", ["Original %", "Curved %", "Letter"], pctScores.map((x, i) => [x.toFixed(1), r.out[i].toFixed(1), letter(r.out[i])]))}>Download CSV</button>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full max-w-lg text-sm" data-testid="table">
              <thead><tr className="text-left subtle"><th className="py-1">#</th><th>Original</th><th>Curved</th><th>Change</th><th>Grade</th></tr></thead>
              <tbody>{pctScores.slice(0, 200).map((x, i) => (
                <tr key={i} className="border-t border-[var(--border)]"><td className="py-1">{i + 1}</td><td>{f1(x)}% ({letter(x)})</td><td className="font-semibold">{f1(r.out[i])}%</td><td>{r.out[i] - x >= 0 ? "+" : ""}{f1(r.out[i] - x)}</td><td>{letter(r.out[i])}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
