/** Ten-pin bowling scoring (standard rules). Frames use notation: X strike, / spare, - or 0 miss, digits 1–9. */
export type FrameResult = { rolls: number[]; score: number | null; cumulative: number | null };

const val = (ch: string, prev: number | null): number => {
  if (ch === "X" || ch === "x") return 10;
  if (ch === "/") { if (prev === null) throw new Error("A spare (/) must follow a first ball."); return 10 - prev; }
  if (ch === "-") return 0;
  if (/^\d$/.test(ch)) return Number(ch);
  throw new Error(`Unknown mark "${ch}". Use 0–9, X, / or -.`);
};

/** Parse one frame's marks into pin counts, validating pins per frame. `tenth` allows the bonus balls. */
export function parseFrame(marks: string, tenth: boolean): number[] {
  const m = marks.replace(/\s+/g, "").toUpperCase();
  const rolls: number[] = [];
  for (let i = 0; i < m.length; i++) {
    // in the 10th, a "/" or digit after a strike starts a fresh rack
    const freshRack = i === 0 || (tenth && ((i === 1 && rolls[0] === 10) || (i === 2 && (rolls[0] + rolls[1] === 10 || rolls[1] === 10))));
    const prev = freshRack ? null : rolls[rolls.length - 1] ?? null;
    const v = val(m[i], m[i] === "/" ? (i > 0 ? rolls[i - 1] : null) : prev);
    if (m[i] === "X" && !freshRack) throw new Error("A strike can only be the first ball of a frame (or of a fresh rack in the 10th).");
    rolls.push(v);
  }
  if (!tenth) {
    if (rolls.length === 0) return rolls;
    if (rolls[0] === 10 && rolls.length > 1) throw new Error("After a strike the frame is over.");
    if (rolls.length > 2) throw new Error("Frames 1–9 have at most two balls.");
    if (rolls.length === 2 && rolls[0] + rolls[1] > 10) throw new Error("More than 10 pins in one frame. Use / for a spare.");
  } else {
    if (rolls.length > 3) throw new Error("The 10th frame has at most three balls.");
    if (rolls.length === 3 && rolls[0] !== 10 && rolls[0] + rolls[1] !== 10) throw new Error("A third ball in the 10th is only allowed after a strike or spare.");
    if (rolls.length >= 2 && rolls[0] !== 10 && rolls[0] + rolls[1] > 10) throw new Error("More than 10 pins in the 10th frame's first two balls.");
  }
  return rolls;
}

/** Score a game from frame mark strings (length 10). Frames that can't be scored yet return null. */
export function scoreGame(frames: string[]): { frames: FrameResult[]; total: number; maxPossible: number } {
  const parsed = frames.map((f, i) => parseFrame(f, i === 9));
  const all = parsed.flat();
  const out: FrameResult[] = [];
  let idx = 0, cum = 0, broken = false;
  for (let f = 0; f < 10; f++) {
    const r = parsed[f];
    let score: number | null = null;
    if (f < 9) {
      if (r[0] === 10) score = all[idx + 1] !== undefined && all[idx + 2] !== undefined ? 10 + all[idx + 1] + all[idx + 2] : null;
      else if (r.length === 2 && r[0] + r[1] === 10) score = all[idx + 2] !== undefined ? 10 + all[idx + 2] : null;
      else if (r.length === 2) score = r[0] + r[1];
      idx += r.length;
    } else {
      const complete = r.length === 3 || (r.length === 2 && r[0] + r[1] < 10);
      score = complete ? r.reduce((a, b) => a + b, 0) : null;
    }
    if (score === null) broken = true;
    if (!broken) cum += score!;
    out.push({ rolls: r, score, cumulative: broken ? null : cum });
  }
  const total = out.reduce((t, f) => t + (f.score ?? 0), 0);
  return { frames: out, total, maxPossible: maxPossible(parsed) };
}

/** Highest final score still reachable: fill every remaining ball with the best possible result, then score. */
function maxPossible(parsed: number[][]): number {
  const p = parsed.map((r, i) => {
    const x = [...r];
    if (i < 9) { if (x.length === 0) x.push(10); else if (x.length === 1 && x[0] < 10) x.push(10 - x[0]); return x; }
    if (x.length === 0) return [10, 10, 10];
    if (x.length === 1) return x[0] === 10 ? [10, 10, 10] : [x[0], 10 - x[0], 10];
    if (x.length === 2) return x[0] === 10 ? [10, x[1], x[1] === 10 ? 10 : 10 - x[1]] : x[0] + x[1] === 10 ? [x[0], x[1], 10] : x;
    return x;
  });
  const all = p.flat(); let idx = 0, tot = 0;
  for (let f = 0; f < 10; f++) {
    const r = p[f];
    if (f < 9) { tot += r[0] === 10 ? 10 + all[idx + 1] + all[idx + 2] : r[0] + r[1] === 10 ? 10 + all[idx + 2] : r[0] + r[1]; idx += r.length; }
    else tot += r.reduce((a, b) => a + b, 0);
  }
  return tot;
}
