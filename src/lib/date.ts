/** Pure, timezone-safe date math. All dates are local-midnight Date objects; never mix with UTC parsing. */
export type Unit = "days" | "weeks" | "months" | "years" | "business";

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const parseISO = (s: string) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, (m || 1) - 1, d || 1); };
export const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

/** Calendar-month addition with end-of-month clamping (Jan 31 + 1 month = Feb 28/29), same rule as spreadsheets' EDATE. */
export function addMonths(d: Date, n: number) {
  const target = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), last));
}

const nthWeekday = (y: number, m: number, wd: number, n: number) => {
  const first = new Date(y, m, 1);
  return new Date(y, m, 1 + ((wd - first.getDay() + 7) % 7) + (n - 1) * 7);
};
const lastWeekday = (y: number, m: number, wd: number) => {
  const last = new Date(y, m + 1, 0);
  return new Date(y, m, last.getDate() - ((last.getDay() - wd + 7) % 7));
};
const observed = (d: Date) => (d.getDay() === 6 ? addDays(d, -1) : d.getDay() === 0 ? addDays(d, 1) : d);

/** US federal holidays (observed dates) — 5 U.S.C. 6103. */
export function usHolidays(y: number): { date: Date; name: string }[] {
  return [
    { date: observed(new Date(y, 0, 1)), name: "New Year's Day" },
    { date: nthWeekday(y, 0, 1, 3), name: "Martin Luther King Jr. Day" },
    { date: nthWeekday(y, 1, 1, 3), name: "Washington's Birthday" },
    { date: lastWeekday(y, 4, 1), name: "Memorial Day" },
    { date: observed(new Date(y, 5, 19)), name: "Juneteenth" },
    { date: observed(new Date(y, 6, 4)), name: "Independence Day" },
    { date: nthWeekday(y, 8, 1, 1), name: "Labor Day" },
    { date: nthWeekday(y, 9, 1, 2), name: "Columbus Day" },
    { date: observed(new Date(y, 10, 11)), name: "Veterans Day" },
    { date: nthWeekday(y, 10, 4, 4), name: "Thanksgiving Day" },
    { date: observed(new Date(y, 11, 25)), name: "Christmas Day" },
  ];
}
const holidayCache = new Map<number, Set<string>>();
export const isHoliday = (d: Date) => {
  const y = d.getFullYear();
  if (!holidayCache.has(y)) holidayCache.set(y, new Set([...usHolidays(y - 1), ...usHolidays(y), ...usHolidays(y + 1)].map((h) => toISO(h.date))));
  return holidayCache.get(y)!.has(toISO(d));
};
export const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

/** Business days: skip Sat/Sun (and US federal holidays if `skipHolidays`). Start day is never counted. */
export function addBusinessDays(d: Date, n: number, skipHolidays = false) {
  const step = n < 0 ? -1 : 1;
  let left = Math.abs(n), cur = d;
  while (left > 0) {
    cur = addDays(cur, step);
    if (!isWeekend(cur) && !(skipHolidays && isHoliday(cur))) left--;
  }
  return cur;
}

export function shift(d: Date, amount: number, unit: Unit, skipHolidays = false) {
  switch (unit) {
    case "days": return addDays(d, amount);
    case "weeks": return addDays(d, amount * 7);
    case "months": return addMonths(d, amount);
    case "years": return addMonths(d, amount * 12);
    case "business": return addBusinessDays(d, amount, skipHolidays);
  }
}

export const diffDays = (a: Date, b: Date) => Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / 86400000);

export function countBusinessDays(a: Date, b: Date, skipHolidays = false) {
  const [s, e] = a <= b ? [a, b] : [b, a];
  let n = 0;
  for (let c = addDays(s, 1); c <= e; c = addDays(c, 1)) if (!isWeekend(c) && !(skipHolidays && isHoliday(c))) n++;
  return n;
}

export function holidaysBetween(a: Date, b: Date) {
  const [s, e] = a <= b ? [a, b] : [b, a];
  const out: { date: Date; name: string }[] = [];
  for (let y = s.getFullYear(); y <= e.getFullYear(); y++)
    for (const h of usHolidays(y)) if (h.date > s && h.date <= e) out.push(h);
  return out;
}

export const dayOfYear = (d: Date) => diffDays(new Date(d.getFullYear(), 0, 1), d) + 1;
export const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
/** ISO-8601 week number. */
export function isoWeek(d: Date) {
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const w1 = new Date(t.getFullYear(), 0, 4);
  return 1 + Math.round(((t.getTime() - w1.getTime()) / 86400000 - 3 + ((w1.getDay() + 6) % 7)) / 7);
}

export const fmtLong = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
export const fmtDate = (d: Date) => d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
export const fmtShort = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
export const weekday = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long" });

/**
 * Exact age between `dob` and `at`: whole years, then whole months, then days.
 * Anniversaries are computed from the birth date with end-of-month clamping, so a Feb 29 birthday falls on
 * Feb 28 in common years (one of the two conventions in use; some jurisdictions use Mar 1).
 */
export function ageBetween(dob: Date, at: Date) {
  if (at < dob) return null;
  let months = (at.getFullYear() - dob.getFullYear()) * 12 + (at.getMonth() - dob.getMonth());
  if (addMonths(dob, months) > at) months--;
  const anchor = addMonths(dob, months);
  return { years: Math.floor(months / 12), months: months % 12, days: diffDays(anchor, at), totalMonths: months, totalDays: diffDays(dob, at) };
}

/** Next birthday on/after `at` (clamped for Feb 29) and how many days away. */
export function nextBirthday(dob: Date, at: Date) {
  let years = at.getFullYear() - dob.getFullYear();
  let next = addMonths(dob, years * 12);
  if (next < startOfDay(at)) next = addMonths(dob, ++years * 12);
  return { date: next, turning: years, inDays: diffDays(at, next) };
}
