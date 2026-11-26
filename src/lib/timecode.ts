/**
 * SMPTE timecode (pure). Drop-frame (29.97 / 59.94 DF) skips frame numbers 0–1 (or 0–3 at 59.94) at the start of
 * every minute except minutes divisible by 10; no video frames are dropped, only labels.
 */
export type Rate = { id: string; label: string; base: number; fps: number; drop: number };
export const RATES: Rate[] = [
  { id: "23.976", label: "23.976 (23.98)", base: 24, fps: 24000 / 1001, drop: 0 },
  { id: "24", label: "24", base: 24, fps: 24, drop: 0 },
  { id: "25", label: "25 (PAL)", base: 25, fps: 25, drop: 0 },
  { id: "29.97df", label: "29.97 drop-frame", base: 30, fps: 30000 / 1001, drop: 2 },
  { id: "29.97", label: "29.97 non-drop", base: 30, fps: 30000 / 1001, drop: 0 },
  { id: "30", label: "30", base: 30, fps: 30, drop: 0 },
  { id: "48", label: "48", base: 48, fps: 48, drop: 0 },
  { id: "50", label: "50", base: 50, fps: 50, drop: 0 },
  { id: "59.94df", label: "59.94 drop-frame", base: 60, fps: 60000 / 1001, drop: 4 },
  { id: "59.94", label: "59.94 non-drop", base: 60, fps: 60000 / 1001, drop: 0 },
  { id: "60", label: "60", base: 60, fps: 60, drop: 0 },
];
export const rateById = (id: string) => RATES.find((r) => r.id === id) ?? RATES[3];

export type TC = { h: number; m: number; s: number; f: number; neg?: boolean };

/** Parse "HH:MM:SS:FF" or "HH:MM:SS;FF" (also fewer fields, right-aligned: "SS:FF", "MM:SS:FF"). */
export function parseTC(src: string): TC | null {
  const t = src.trim(), neg = t.startsWith("-");
  const parts = t.replace(/^-/, "").split(/[:;.,]/).map((x) => x.trim());
  if (!parts.length || parts.length > 4 || parts.some((p) => !/^\d+$/.test(p))) return null;
  const n = parts.map(Number);
  while (n.length < 4) n.unshift(0);
  return { h: n[0], m: n[1], s: n[2], f: n[3], neg };
}

export function validTC(tc: TC, r: Rate): string | null {
  if (tc.m > 59 || tc.s > 59) return "Minutes and seconds must be 0–59.";
  if (tc.f >= r.base) return `Frames must be 0–${r.base - 1} at ${r.label}.`;
  if (r.drop && tc.s === 0 && tc.f < r.drop && tc.m % 10 !== 0) return `${fmtTC(tc, r)} doesn't exist in drop-frame (frames 0–${r.drop - 1} are skipped at the start of this minute).`;
  return null;
}

export function toFrames(tc: TC, r: Rate): number {
  const totalMin = tc.h * 60 + tc.m;
  let n = (tc.h * 3600 + tc.m * 60 + tc.s) * r.base + tc.f;
  if (r.drop) n -= r.drop * (totalMin - Math.floor(totalMin / 10));
  return tc.neg ? -n : n;
}

export function fromFrames(frames: number, r: Rate): TC {
  const neg = frames < 0;
  let n = Math.abs(Math.round(frames));
  if (r.drop) {
    const per10 = r.base * 600 - r.drop * 9, perMin = r.base * 60 - r.drop;
    const d = Math.floor(n / per10), m = n % per10;
    n += r.drop * 9 * d + (m > r.drop ? r.drop * Math.floor((m - r.drop) / perMin) : 0);
  }
  const f = n % r.base, totalS = Math.floor(n / r.base);
  return { h: Math.floor(totalS / 3600), m: Math.floor(totalS / 60) % 60, s: totalS % 60, f, neg };
}

const p2 = (x: number) => String(x).padStart(2, "0");
export const fmtTC = (tc: TC, r: Rate) => `${tc.neg ? "-" : ""}${p2(tc.h)}:${p2(tc.m)}:${p2(tc.s)}${r.drop ? ";" : ":"}${p2(tc.f)}`;
/** Real (wall-clock) seconds for a frame count. */
export const seconds = (frames: number, r: Rate) => frames / r.fps;
export function fmtClock(sec: number) {
  const neg = sec < 0; let s = Math.abs(sec);
  const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s -= m * 60;
  return `${neg ? "-" : ""}${p2(h)}:${p2(m)}:${s.toFixed(3).padStart(6, "0")}`;
}
