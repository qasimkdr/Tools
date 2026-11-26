"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { milestone, weightLoss } from "@/lib/weightLoss";

const pct = (x: number, d = 2) => (Number.isFinite(x) ? `${(x * 100).toFixed(d)}%` : "–");

export default function WeightLossPercentageCalculator() {
  const [s, set] = useUrlState({ u: "lb", start: "160", cur: "145", goal: "140", weeks: "10" });
  const u = s.u === "kg" ? "kg" : "lb";
  const start = Number(s.start), cur = Number(s.cur), goal = Number(s.goal), weeks = Number(s.weeks);
  const err = !(start > 0) ? "Enter your starting weight." : !(cur > 0) ? "Enter your current weight." : null;
  const r = err ? null : weightLoss(start, cur, goal > 0 ? goal : undefined, weeks > 0 ? weeks : undefined);
  const w = (x: number) => `${Math.abs(x).toFixed(1)} ${u}`;
  const gained = r ? r.lost < 0 : false;
  const prog = r && Number.isFinite(r.progress) ? Math.max(0, Math.min(1, r.progress)) : NaN;
  // Projection at the current weekly pace (only when losing toward a lower goal).
  const moreWeeks = r && r.perWeek > 0 && goal > 0 && goal < cur ? (cur - goal) / r.perWeek : NaN;
  const chart = r && weeks > 0 && r.lost !== 0 ? (() => {
    const endW = Number.isFinite(moreWeeks) ? weeks + moreWeeks : weeks;
    const ys = [start, cur, ...(goal > 0 ? [goal] : [])];
    const lo = Math.min(...ys), hi = Math.max(...ys), pad = (hi - lo) * 0.12 || 1;
    const X = (w: number) => 40 + (w / endW) * 250, Y = (v: number) => 12 + ((hi + pad - v) / (hi - lo + 2 * pad)) * 120;
    return { endW, X, Y, lo, hi };
  })() : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Weight loss percentage calculator">
        <Segmented label="Units" value={u} onChange={(v) => set("u", v)} options={[{ id: "lb", label: "Imperial (lb)" }, { id: "kg", label: "Metric (kg)" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="start" label="Starting weight" suffix={u} value={s.start} onChange={(v) => set("start", v)} min={0} />
          <Field id="cur" label="Current weight" suffix={u} value={s.cur} onChange={(v) => set("cur", v)} min={0} />
          <Field id="goal" label="Goal weight (optional)" suffix={u} value={s.goal} onChange={(v) => set("goal", v)} min={0} />
          <Field id="weeks" label="Weeks so far (optional)" value={s.weeks} onChange={(v) => set("weeks", v)} min={0} hint="For your weekly rate" />
        </div>
      </form>
      <ResultCard error={err} label={gained ? "Weight gained" : "Weight loss percentage"} value={r ? <span data-testid="pct">{pct(Math.abs(r.pct))}</span> : "–"}>
        {r && <>
          <p className="mt-1 text-sm muted" data-testid="lost">{gained ? "Gained" : "Lost"} {w(r.lost)} of {w(start)}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            {Number.isFinite(r.toGoal) && <>
              <Stat k="Left to reach your goal" v={<span data-testid="to-goal">{r.toGoal > 0 ? w(r.toGoal) : "Goal reached"}</span>} />
              <Stat k="Goal as % of starting weight" v={pct(r.goalPct, 1)} />
              <Stat k="Progress toward goal" v={<span data-testid="progress">{pct(prog, 0)}</span>} />
            </>}
            {Number.isFinite(r.perWeek) && <>
              <Stat k="Average per week" v={<span data-testid="per-week">{w(r.perWeek)}{gained ? " gained" : ""}</span>} />
              <Stat k="Percent per week" v={pct(Math.abs(r.pctPerWeek))} />
            </>}
          </dl>
          {Number.isFinite(moreWeeks) && <p className="mt-2 text-sm" data-testid="eta">At {w(r.perWeek)} a week, you&apos;d reach {w(goal)} in about <strong>{Math.ceil(moreWeeks)} more week{Math.ceil(moreWeeks) === 1 ? "" : "s"}</strong>.</p>}
          {chart && <svg viewBox="0 0 300 150" className="mt-3 w-full" role="img" aria-label={`Weight from ${w(start)} to ${w(cur)} over ${weeks} weeks${Number.isFinite(moreWeeks) ? `, projected to ${w(goal)}` : ""}`} data-testid="chart">
            <line x1={40} x2={290} y1={132} y2={132} stroke="currentColor" strokeOpacity={0.3} />
            {goal > 0 && <><line x1={40} x2={290} y1={chart.Y(goal)} y2={chart.Y(goal)} stroke="var(--color-brand-500)" strokeDasharray="2 3" strokeOpacity={0.6} /><text x={36} y={chart.Y(goal) + 3} fontSize={8} textAnchor="end" fill="currentColor">{Math.round(goal)}</text></>}
            <polyline points={`${chart.X(0)},${chart.Y(start)} ${chart.X(weeks)},${chart.Y(cur)}`} fill="none" stroke="var(--color-brand-500)" strokeWidth={2.5} />
            {Number.isFinite(moreWeeks) && <polyline points={`${chart.X(weeks)},${chart.Y(cur)} ${chart.X(chart.endW)},${chart.Y(goal)}`} fill="none" stroke="var(--color-brand-500)" strokeWidth={2} strokeDasharray="5 4" />}
            <circle cx={chart.X(0)} cy={chart.Y(start)} r={3.5} fill="var(--color-brand-500)" /><circle cx={chart.X(weeks)} cy={chart.Y(cur)} r={3.5} fill="var(--color-brand-500)" />
            <text x={36} y={chart.Y(start) + 3} fontSize={8} textAnchor="end" fill="currentColor">{Math.round(start)}</text>
            <text x={chart.X(weeks)} y={chart.Y(cur) - 7} fontSize={8} textAnchor="middle" fill="currentColor">{Math.round(cur)}</text>
            <text x={40} y={145} fontSize={8} fill="currentColor">Week 0</text>
            <text x={chart.X(weeks)} y={145} fontSize={8} textAnchor="middle" fill="currentColor">{weeks}</text>
            {Number.isFinite(moreWeeks) && <text x={290} y={145} fontSize={8} textAnchor="end" fill="currentColor">{Math.ceil(chart.endW)}</text>}
          </svg>}
          {Number.isFinite(prog) && <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--surface-2)]" role="img" aria-label={`${Math.round(prog * 100)}% of the way to the goal`}><div className="h-full rounded-full bg-[var(--color-brand-500)]" style={{ width: `${prog * 100}%` }} /></div>}
          <h2 className="mt-5 text-sm font-semibold">Milestones from {w(start)}</h2>
          <table className="mt-2 w-full text-sm" data-testid="milestones">
            <thead><tr className="text-left subtle"><th className="py-1">Loss</th><th>Target weight</th><th>Status</th></tr></thead>
            <tbody>{[0.05, 0.1, 0.15, 0.2].map((p) => { const t = milestone(start, p); return <tr key={p} className="border-t border-[var(--border)]"><td className="py-1">{p * 100}%</td><td>{w(t)}</td><td>{cur <= t ? "✓ Reached" : `${w(cur - t)} to go`}</td></tr>; })}</tbody>
          </table>
          <p className="mt-3 text-xs subtle">CDC guidance notes that losing 5–10% of body weight can improve blood pressure, cholesterol and blood sugar, and that a steady 1–2 lb (about 0.5–1 kg) a week is more likely to last.</p>
        </>}
      </ResultCard>
    </div>
  );
}
