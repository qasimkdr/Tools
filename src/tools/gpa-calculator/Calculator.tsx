"use client";
import { useState } from "react";
import { Field, ResultCard, Stat } from "@/components/calc/ui";

const GRADES: [string, number][] = [["A+", 4], ["A", 4], ["A-", 3.7], ["B+", 3.3], ["B", 3], ["B-", 2.7], ["C+", 2.3], ["C", 2], ["C-", 1.7], ["D+", 1.3], ["D", 1], ["D-", 0.7], ["F", 0]];
const BONUS = { reg: 0, hon: 0.5, ap: 1 } as const;
type Row = { name: string; grade: string; credits: string; type: keyof typeof BONUS };
const blank = (): Row => ({ name: "", grade: "A", credits: "3", type: "reg" });

export default function GpaCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { name: "English", grade: "A", credits: "3", type: "reg" }, { name: "Biology", grade: "B+", credits: "4", type: "reg" },
    { name: "History", grade: "A-", credits: "3", type: "reg" }, { name: "Art", grade: "C", credits: "2", type: "reg" },
  ]);
  const [prevGpa, setPrevGpa] = useState(""); const [prevCr, setPrevCr] = useState("");
  const [target, setTarget] = useState(""); const [nextCr, setNextCr] = useState("15");
  const upd = (i: number, k: keyof Row, v: string) => setRows((r) => r.map((x, j) => (j === i ? { ...x, [k]: v } : x)));

  let cr = 0, qp = 0, qpw = 0;
  for (const r of rows) {
    const c = Number(r.credits), g = GRADES.find(([l]) => l === r.grade)?.[1] ?? 0;
    if (!(c > 0)) continue;
    cr += c; qp += g * c; qpw += (g > 0 ? g + BONUS[r.type] : 0) * c; // no bonus on an F
  }
  const gpa = cr ? qp / cr : NaN, wgpa = cr ? qpw / cr : NaN;
  const pg = Number(prevGpa), pc = Number(prevCr);
  const cum = pg >= 0 && pc > 0 && cr ? (pg * pc + qp) / (pc + cr) : NaN;
  const baseGpa = Number.isFinite(cum) ? cum : gpa, baseCr = (Number.isFinite(cum) ? pc : 0) + cr;
  const t = Number(target), nc = Number(nextCr);
  const needed = t > 0 && nc > 0 && baseCr > 0 ? (t * (baseCr + nc) - baseGpa * baseCr) / nc : NaN;

  return (
    <div className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_1.1fr_auto] gap-2 text-xs font-medium subtle sm:grid"><span>Class (optional)</span><span>Grade</span><span>Credits</span><span>Level</span><span /></div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 rounded-xl border border-[var(--border)] p-2 sm:grid-cols-[1.4fr_1fr_0.8fr_1.1fr_auto] sm:border-0 sm:p-0">
              <input aria-label={`Class ${i + 1} name`} className="field col-span-2 sm:col-span-1" placeholder={`Class ${i + 1}`} value={r.name} onChange={(e) => upd(i, "name", e.target.value)} />
              <select aria-label={`Class ${i + 1} grade`} className="field" value={r.grade} onChange={(e) => upd(i, "grade", e.target.value)}>{GRADES.map(([l, p]) => <option key={l} value={l}>{l} ({p.toFixed(1)})</option>)}</select>
              <input aria-label={`Class ${i + 1} credits`} type="number" min={0} step="any" inputMode="decimal" className="field tabular-nums" value={r.credits} onChange={(e) => upd(i, "credits", e.target.value)} />
              <select aria-label={`Class ${i + 1} level`} className="field" value={r.type} onChange={(e) => upd(i, "type", e.target.value)}><option value="reg">Regular</option><option value="hon">Honors (+0.5)</option><option value="ap">AP / IB (+1.0)</option></select>
              <button type="button" aria-label={`Remove class ${i + 1}`} className="btn-ghost !px-3" onClick={() => setRows((x) => x.filter((_, j) => j !== i))}>✕</button>
            </div>
          ))}
          <button type="button" className="btn-ghost" onClick={() => setRows((x) => [...x, blank()])}>+ Add class</button>
        </div>
        <ResultCard label="Unweighted GPA (4.0 scale)" value={Number.isFinite(gpa) ? gpa.toFixed(2) : "—"} error={cr ? null : "Add at least one class with credits."}>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Weighted GPA" v={Number.isFinite(wgpa) ? wgpa.toFixed(2) : "—"} />
            <Stat k="Credits" v={cr} />
            <Stat k="Quality points" v={qp.toFixed(1)} />
            {Number.isFinite(cum) && <Stat k="Cumulative GPA" v={cum.toFixed(2)} />}
          </dl>
        </ResultCard>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card space-y-3 p-5">
          <h2 className="font-semibold">Cumulative GPA (optional)</h2>
          <div className="grid grid-cols-2 gap-3">
            <Field id="pg" label="Current GPA" value={prevGpa} onChange={setPrevGpa} min={0} />
            <Field id="pc" label="Credits so far" value={prevCr} onChange={setPrevCr} min={0} />
          </div>
        </div>
        <div className="card space-y-3 p-5">
          <h2 className="font-semibold">Target GPA planner</h2>
          <div className="grid grid-cols-2 gap-3">
            <Field id="tg" label="Target GPA" value={target} onChange={setTarget} min={0} />
            <Field id="nc" label="Upcoming credits" value={nextCr} onChange={setNextCr} min={0} />
          </div>
          {Number.isFinite(needed) && (
            <p className="text-sm muted" data-testid="target">
              {needed > 4 ? <>Even straight A&apos;s ({nextCr} credits at 4.0) won&apos;t reach {target}. You&apos;d need {needed.toFixed(2)}.</> : needed <= 0 ? <>You&apos;re already at or above {target}.</> : <>You need about a <strong className="text-[var(--text)]">{needed.toFixed(2)}</strong> GPA over the next {nextCr} credits.</>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
