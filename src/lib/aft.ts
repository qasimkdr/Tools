/** Army Fitness Test scoring (pure). Tables: ./aftTables.ts (official AFT Scoring Scales, effective 1 June 2025). */
import { AFT, AGE_GROUPS } from "./aftTables";

export type AftEvent = keyof typeof AFT;
export const EVENTS: { id: AftEvent; name: string; unit: "lb" | "reps" | "time"; higherBetter: boolean }[] = [
  { id: "MDL", name: "3-rep max deadlift", unit: "lb", higherBetter: true },
  { id: "HRP", name: "Hand-release push-ups", unit: "reps", higherBetter: true },
  { id: "SDC", name: "Sprint-drag-carry", unit: "time", higherBetter: false },
  { id: "PLK", name: "Plank", unit: "time", higherBetter: true },
  { id: "2MR", name: "2-mile run", unit: "time", higherBetter: false },
];
export function ageIndex(age: number): number {
  if (age < 17) return -1;
  if (age >= 62) return 9;
  return Math.min(8, Math.floor((age - 17) / 5));
}
/** Column: male and the sex-neutral combat standard share the M|C column; general-standard women use F. */
export const column = (ageIdx: number, female: boolean, combat: boolean) => ageIdx * 2 + (female && !combat ? 1 : 0);

export function scoreEvent(ev: AftEvent, col: number, raw: number): number {
  const e = EVENTS.find((x) => x.id === ev)!;
  for (const [p, v] of AFT[ev][col]) if (e.higherBetter ? raw >= v : raw <= v) return p;
  return 0;
}
/** Raw value needed for a target score (the easiest listed value that scores at least `target`). */
export function needed(ev: AftEvent, col: number, target: number): number | null {
  const rows = AFT[ev][col].filter(([p]) => p >= target);
  return rows.length ? rows[rows.length - 1][1] : null;
}
export const STANDARDS = { general: { total: 300, event: 60 }, combat: { total: 350, event: 60 } } as const;
export { AGE_GROUPS };
export function parseMmss(s: string): number {
  const m = s.trim().match(/^(\d{1,2}):([0-5]\d)$/);
  if (m) return +m[1] * 60 + +m[2];
  const n = Number(s);
  return s.trim() !== "" && Number.isFinite(n) ? n : NaN;
}
export const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.round(sec % 60)).padStart(2, "0")}`;
