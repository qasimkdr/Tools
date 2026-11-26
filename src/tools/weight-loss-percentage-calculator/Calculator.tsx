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

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Weight loss percentage calculator">
        <Segmented label="Units" value={u} onChange={(v) => set("u", v)} options={[{ id: "lb", label: "Pounds" }, { id: "kg", label: "Kilograms" }]} />
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
