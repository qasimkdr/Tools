/** Averages beyond the arithmetic mean (pure). */
export function geometricMean(xs: number[]): number { return xs.every((x) => x > 0) ? Math.exp(xs.reduce((a, x) => a + Math.log(x), 0) / xs.length) : NaN; }
export function harmonicMean(xs: number[]): number { return xs.every((x) => x > 0) ? xs.length / xs.reduce((a, x) => a + 1 / x, 0) : NaN; }

/** Parse times like 1:23:45, 23:45, 45.5 (seconds) separated by commas, spaces or new lines → seconds. */
export function parseTimes(text: string): { secs: number[]; bad: string[] } {
  const secs: number[] = [], bad: string[] = [];
  for (const tok of text.split(/[\s,;]+/).filter(Boolean)) {
    const parts = tok.split(":");
    if (parts.length > 3 || parts.some((p) => p === "" || !Number.isFinite(Number(p)) || Number(p) < 0)) { bad.push(tok); continue; }
    const nums = parts.map(Number);
    if (nums.slice(1).some((n) => n >= 60)) { bad.push(tok); continue; }
    secs.push(nums.reduce((a, n) => a * 60 + n, 0));
  }
  return { secs, bad };
}
/** Seconds → h:mm:ss (or m:ss under an hour), with tenths when needed. */
export function fmtTime(s: number, decimals = 1): string {
  if (!Number.isFinite(s)) return "–";
  const r = Math.round(s * 10 ** decimals) / 10 ** decimals;
  const h = Math.floor(r / 3600), m = Math.floor((r % 3600) / 60), sec = r - h * 3600 - m * 60;
  const ss = (sec < 10 ? "0" : "") + (Number.isInteger(sec) ? String(sec) : sec.toFixed(decimals));
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}
