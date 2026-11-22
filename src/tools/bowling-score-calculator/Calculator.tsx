"use client";
import { useState } from "react";
import { ResultCard, Stat } from "@/components/calc/ui";
import { scoreGame } from "@/lib/bowling";

const PRESETS: Record<string, string[]> = {
  "Sample game": ["X", "7/", "9-", "X", "X", "81", "9/", "X", "-6", "X9/"],
  "Perfect game": [...Array(9).fill("X"), "XXX"],
  "All 9-spares": [...Array(9).fill("9/"), "9/9"],
  Clear: Array(10).fill(""),
};

export default function BowlingScore() {
  const [frames, setFrames] = useState<string[]>(PRESETS["Sample game"]);
  let res: ReturnType<typeof scoreGame> | null = null, error: string | null = null;
  try { res = scoreGame(frames); } catch (e) { error = (e as Error).message; }
  const done = res?.frames[9].cumulative != null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">{Object.keys(PRESETS).map((k) => <button key={k} type="button" className="chip" onClick={() => setFrames(PRESETS[k])}>{k}</button>)}</div>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10" role="group" aria-label="Frames">
        {frames.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
            <div className="bg-[var(--surface-2)] py-1 text-xs font-semibold subtle">{i + 1}</div>
            <input aria-label={`Frame ${i + 1}`} value={f} maxLength={i === 9 ? 3 : 2} spellCheck={false} autoCapitalize="characters"
              onChange={(e) => setFrames((x) => x.map((y, j) => (j === i ? e.target.value.toUpperCase() : y)))}
              className="w-full bg-transparent py-2 text-center font-mono text-lg font-semibold uppercase outline-none focus:bg-[var(--color-brand-50)]" placeholder={i === 9 ? "X9/" : "7/"} />
            <div className="border-t border-[var(--border)] py-1.5 text-sm font-semibold tabular-nums" data-testid={`cum-${i + 1}`}>{res?.frames[i].cumulative ?? "·"}</div>
          </div>
        ))}
      </div>
      <p className="text-sm muted">Type each frame with X (strike), / (spare), - (miss) or numbers, e.g. <code>X</code>, <code>7/</code>, <code>81</code>. The 10th frame takes up to three balls, e.g. <code>XXX</code> or <code>9/X</code>.</p>
      <ResultCard error={error} label={done ? "Final score" : "Score so far"} value={res ? String(res.frames.reduce((t, f) => (f.cumulative ?? t), 0)) : ""}>
        {res && (
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <Stat k="Strikes" v={res.frames.reduce((t, f, i) => t + (i < 9 ? (f.rolls[0] === 10 ? 1 : 0) : f.rolls.filter((r, j) => r === 10 && (j === 0 || f.rolls[j - 1] === 10 || (j === 2 && f.rolls[0] + f.rolls[1] === 10))).length), 0)} />
            <Stat k="Spares" v={res.frames.filter((f) => f.rolls[0] !== 10 && f.rolls.length >= 2 && f.rolls[0] + f.rolls[1] === 10).length} />
            <Stat k="Open frames" v={res.frames.filter((f, i) => f.rolls.length === 2 && f.rolls[0] + f.rolls[1] < 10 && (i < 9 || true)).length} />
            <Stat k={done ? "Game complete" : "Best still possible"} v={done ? "✓" : res.maxPossible} />
          </dl>
        )}
      </ResultCard>
    </div>
  );
}
