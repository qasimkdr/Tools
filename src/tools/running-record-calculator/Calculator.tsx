"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { runningRecord } from "@/lib/runningRecord";
import { parseTime } from "@/lib/multiEvents";

const ratio = (x: number) => (Number.isFinite(x) ? `1:${Math.round(x)}` : "–");

export default function RunningRecordCalculator() {
  const [s, set] = useUrlState({ words: "99", err: "8", sc: "4", time: "1:30" });
  const words = Math.round(Number(s.words)), errors = Math.round(Number(s.err) || 0), sc = Math.round(Number(s.sc) || 0);
  const sec = s.time.trim() ? parseTime(s.time) : NaN;
  const err = !(words > 0) ? "Enter the number of running words in the passage." : errors < 0 || sc < 0 ? "Errors and self-corrections can't be negative." : errors > words ? "There can't be more errors than words." : s.time.trim() && !(sec > 0) ? "Enter the reading time as minutes:seconds, e.g. 1:30." : null;
  const r = err ? null : runningRecord(words, errors, sc, sec > 0 ? sec : undefined);
  const tone = r?.level === "Independent" ? "text-emerald-700 dark:text-emerald-400" : r?.level === "Instructional" ? "text-amber-700 dark:text-amber-400" : "text-red-700 dark:text-red-400";
  const maxErr = (p: number) => Math.floor(words * (1 - p) + 1e-9);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Running record calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="words" label="Running words" value={s.words} onChange={(v) => set("words", v)} min={1} inputMode="numeric" hint="Words in the passage read" />
          <Field id="err" label="Errors" value={s.err} onChange={(v) => set("err", v)} min={0} inputMode="numeric" hint="Not counting self-corrections" />
          <Field id="sc" label="Self-corrections" value={s.sc} onChange={(v) => set("sc", v)} min={0} inputMode="numeric" />
          <div>
            <label htmlFor="time" className="label">Reading time (optional)</label>
            <input id="time" className="field" value={s.time} onChange={(e) => set("time", e.target.value)} placeholder="m:ss" inputMode="numeric" autoComplete="off" />
            <p className="mt-1 text-xs subtle">For words per minute</p>
          </div>
        </div>
      </form>
      <ResultCard error={err} label="Accuracy" value={r ? <span data-testid="acc">{(r.accuracy * 100).toFixed(1)}%</span> : "–"}>
        {r && <>
          <p className={`mt-1 text-sm font-semibold ${tone}`} data-testid="level">{r.level} level</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Error rate" v={<span data-testid="er">{errors ? ratio(r.errorRate) : "No errors"}</span>} />
            <Stat k="Self-correction rate" v={<span data-testid="scr">{sc ? ratio(r.scRate) : "None"}</span>} />
            <Stat k="Words read correctly" v={(words - errors).toLocaleString("en-US")} />
            {Number.isFinite(r.wpm) && <>
              <Stat k="Words per minute" v={<span data-testid="wpm">{Math.round(r.wpm)}</span>} />
              <Stat k="Words correct per minute" v={<span data-testid="wcpm">{Math.round(r.wcpm)}</span>} />
            </>}
          </dl>
          <h2 className="mt-5 text-sm font-semibold">Errors allowed for this passage ({words} words)</h2>
          <table className="mt-2 w-full text-sm" data-testid="bands">
            <thead><tr className="text-left subtle"><th className="py-1">Level</th><th>Accuracy</th><th>Errors</th></tr></thead>
            <tbody>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Independent</td><td>95–100%</td><td>0–{maxErr(0.95)}</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Instructional</td><td>90–94%</td><td>{maxErr(0.95) + 1}–{maxErr(0.9)}</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Frustrational</td><td>Below 90%</td><td>{maxErr(0.9) + 1} or more</td></tr>
            </tbody>
          </table>
          <p className="mt-2 text-xs subtle">A self-correction rate of about 1:4 or better (1:3, 1:2) suggests the reader is monitoring their reading. Schools and programs can use slightly different cut-offs.</p>
        </>}
      </ResultCard>
    </div>
  );
}
