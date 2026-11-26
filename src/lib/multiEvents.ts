/**
 * World Athletics combined-events scoring (pure). Track: A × (B − T)^C with T in seconds; jumps: A × (M − B)^C with M in
 * centimetres; throws: M in metres. Points are rounded down; a result worse than B scores 0. Checked against the
 * decathlon world record (9,126) and heptathlon world record (7,291).
 */
export type Kind = "track" | "jump" | "throw";
export type Event = { id: string; name: string; A: number; B: number; C: number; kind: Kind; unit: string; long?: boolean };

export const DECATHLON: Event[] = [
  { id: "m100", name: "100 m", A: 25.4347, B: 18, C: 1.81, kind: "track", unit: "s" },
  { id: "lj", name: "Long jump", A: 0.14354, B: 220, C: 1.4, kind: "jump", unit: "m" },
  { id: "sp", name: "Shot put", A: 51.39, B: 1.5, C: 1.05, kind: "throw", unit: "m" },
  { id: "hj", name: "High jump", A: 0.8465, B: 75, C: 1.42, kind: "jump", unit: "m" },
  { id: "m400", name: "400 m", A: 1.53775, B: 82, C: 1.81, kind: "track", unit: "s" },
  { id: "h110", name: "110 m hurdles", A: 5.74352, B: 28.5, C: 1.92, kind: "track", unit: "s" },
  { id: "dt", name: "Discus", A: 12.91, B: 4, C: 1.1, kind: "throw", unit: "m" },
  { id: "pv", name: "Pole vault", A: 0.2797, B: 100, C: 1.35, kind: "jump", unit: "m" },
  { id: "jt", name: "Javelin", A: 10.14, B: 7, C: 1.08, kind: "throw", unit: "m" },
  { id: "m1500", name: "1500 m", A: 0.03768, B: 480, C: 1.85, kind: "track", unit: "m:ss", long: true },
];
export const HEPTATHLON: Event[] = [
  { id: "h100", name: "100 m hurdles", A: 9.23076, B: 26.7, C: 1.835, kind: "track", unit: "s" },
  { id: "hj", name: "High jump", A: 1.84523, B: 75, C: 1.348, kind: "jump", unit: "m" },
  { id: "sp", name: "Shot put", A: 56.0211, B: 1.5, C: 1.05, kind: "throw", unit: "m" },
  { id: "m200", name: "200 m", A: 4.99087, B: 42.5, C: 1.81, kind: "track", unit: "s" },
  { id: "lj", name: "Long jump", A: 0.188807, B: 210, C: 1.41, kind: "jump", unit: "m" },
  { id: "jt", name: "Javelin", A: 15.9803, B: 3.8, C: 1.04, kind: "throw", unit: "m" },
  { id: "m800", name: "800 m", A: 0.11193, B: 254, C: 1.88, kind: "track", unit: "m:ss", long: true },
];

/** Parse "48.42", "4:36.11" or "1:02:03" to seconds. */
export function parseTime(s: string): number {
  const t = s.trim();
  if (!t) return NaN;
  if (!/^\d+(:\d{1,2})*(\.\d+)?$/.test(t)) return NaN;
  return t.split(":").reduce((acc, p) => acc * 60 + Number(p), 0);
}

/** Points for one event; `perf` is seconds (track) or metres (field). */
export function points(e: Event, perf: number): number {
  if (!Number.isFinite(perf) || perf <= 0) return 0;
  const x = e.kind === "track" ? e.B - perf : (e.kind === "jump" ? Math.round(perf * 100 * 1e6) / 1e6 : perf) - e.B;
  return x > 0 ? Math.floor(e.A * Math.pow(x, e.C) + 1e-9) : 0;
}

/** Performance needed for a target score (inverse of `points`), before rounding to the event's precision. */
export function perfFor(e: Event, pts: number): number {
  const x = Math.pow(pts / e.A, 1 / e.C);
  if (e.kind === "track") return e.B - x;
  return e.kind === "jump" ? (x + e.B) / 100 : x + e.B;
}
