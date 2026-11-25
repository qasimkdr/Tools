import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import Calculator from "./Calculator";
import LiveTable from "./LiveTable";
import meta from "./meta";
import { type VariantUnit, nearby, variantPath, VARIANTS, isIndexed } from "./variants";
import { BUILD_ISO } from "@/lib/build";
import {
  countBusinessDays, dayOfYear, diffDays, fmtLong, holidaysBetween, isoWeek, parseISO, shift, weekday,
} from "@/lib/date";
import { pageMeta } from "@/lib/seo";

const single = (u: VariantUnit) => u.replace(/s$/, "");
const label = (u: VariantUnit, n: number) => `${n} ${n === 1 ? single(u) : u}`;
const Title = (u: VariantUnit, n: number) => label(u, n).replace(/ (\w)/, (_, c: string) => ` ${c.toUpperCase()}`);

export function variantMetadata(unit: VariantUnit, n: number) {
  const L = label(unit, n);
  const target = shift(parseISO(BUILD_ISO), n, unit);
  return pageMeta({
    title: `${Title(unit, n)} From Today – What Date Is It? (${target.toLocaleDateString("en-US", { month: "short", day: "numeric" })})`.slice(0, 70),
    description: `${L} from today is ${fmtLong(target)}. See the weekday, business days, US holidays in between and the date ${L} ago, plus a calendar.`,
    path: variantPath(unit, n),
    noindex: !isIndexed(unit, n),
  });
}

/**
 * One programmatic page = unique, computed facts for that span (not a template with a swapped number):
 * answer sentence, business-day count, holidays crossed, week/quarter facts, the "ago" date, a nearby table and its own FAQ.
 */
export default function VariantPage({ unit, n }: { unit: VariantUnit; n: number }) {
  const L = label(unit, n);
  const today = parseISO(BUILD_ISO);
  const f = shift(today, n, unit);
  const ago = shift(today, -n, unit);
  const span = diffDays(today, f);
  const bd = countBusinessDays(today, f, true);
  const hols = holidaysBetween(today, f);
  const q = Math.floor(f.getMonth() / 3) + 1;
  const path = variantPath(unit, n);
  const near = nearby(unit, n);
  const crossYear = f.getFullYear() !== today.getFullYear();

  const faq = [
    { q: `What date is ${L} from today?`, a: `${L} from today (${fmtLong(today)}) is ${fmtLong(f)}. The page updates to your local date when it loads.` },
    { q: `What day of the week is ${L} from today?`, a: `It falls on a ${weekday(f)}. That's day ${dayOfYear(f)} of ${f.getFullYear()}, in ISO week ${isoWeek(f)}.` },
    { q: `How many business days are in ${L}?`, a: `There are ${bd} business days between today and ${fmtLong(f)}, not counting weekends or US federal holidays${hols.length ? ` (${hols.map((h) => h.name).join(", ")})` : ""}.` },
    { q: `What was the date ${L} ago?`, a: `${L} before today was ${fmtLong(ago)}.` },
    ...(unit !== "days" ? [{ q: `How many days is ${L}?`, a: `From today, ${L} is exactly ${span} calendar days${unit === "months" ? ". Month lengths vary, so the day count changes depending on your start date" : ""}.` }] : [{ q: `How many weeks is ${L}?`, a: `${n} days is ${Math.floor(n / 7)} weeks and ${n % 7} days (${(n / 7).toFixed(2)} weeks).` }]),
  ];

  return (
    <ToolLayout
      tool={meta}
      path={path}
      h1={`What Date Is ${Title(unit, n)} From Today?`}
      crumbs={[{ name: "Home", path: "/" }, { name: meta.name, path: `/${meta.slug}/` }, { name: `${L} from today`, path }]}
      faq={faq}
      intro={<p><strong>{L} from today is {fmtLong(f)}.</strong> Change the amount, unit or start date below to recount.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} initialAmount={n} initialUnit={unit} syncUrl={false} />}
    >
      <h2>{L} from today: the details</h2>
      <ul>
        <li><strong>Date:</strong> {fmtLong(f)}</li>
        <li><strong>Calendar days:</strong> {span.toLocaleString()} ({Math.floor(span / 7)} weeks and {span % 7} days)</li>
        <li><strong>Business days:</strong> {bd} (weekdays, excluding US federal holidays)</li>
        <li><strong>Day of year:</strong> day {dayOfYear(f)} of {f.getFullYear()} · ISO week {isoWeek(f)} · Q{q}</li>
        {crossYear && <li><strong>Crosses into a new year:</strong> yes, it lands in {f.getFullYear()}</li>}
        <li><strong>{L} ago:</strong> {fmtLong(ago)}</li>
      </ul>
      {hols.length > 0 ? (
        <p>US federal holidays before that date: {hols.map((h) => `${h.name} (${h.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })})`).join(", ")}. Plan for closures when you count working days.</p>
      ) : (
        <p>No US federal holidays fall in this span, so every weekday counts as a working day.</p>
      )}

      <h2>How to count {L} yourself</h2>
      {unit === "days" && <p>Add {n} to today&apos;s date. When you pass the end of a month, subtract that month&apos;s length and carry on in the next month. Today is day 0, so tomorrow is day 1. In a spreadsheet, type <code>=TODAY()+{n}</code>.</p>}
      {unit === "weeks" && <p>Multiply {n} by 7 to get {n * 7} days, then add those days to today. A whole number of weeks always lands on the same weekday as today. In a spreadsheet, type <code>=TODAY()+{n * 7}</code>.</p>}
      {unit === "months" && <p>Add {n} to the month number and keep the same day. If that day doesn&apos;t exist (for example the 31st in a 30-day month), use the month&apos;s last day. In a spreadsheet, type <code>=EDATE(TODAY(),{n})</code>.</p>}

      <h2>Nearby {unit} from today</h2>
      <LiveTable buildISO={BUILD_ISO} unit={unit} values={[...near.slice(0, 4), n, ...near.slice(4)].sort((a, b) => a - b)} caption={`Dates around ${L} from today`} />
      <p>
        Need a different span? Try{" "}
        {(["days", "weeks", "months"] as VariantUnit[]).filter((u) => u !== unit).map((u, i) => (
          <span key={u}>{i > 0 && " or "}<Link href={variantPath(u, VARIANTS[u][0])}>{label(u, VARIANTS[u][0])} from today</Link></span>
        ))}
        , or use the full <Link href={`/${meta.slug}/`}>days from today calculator</Link> for any number, business days and custom start dates.
      </p>
    </ToolLayout>
  );
}
