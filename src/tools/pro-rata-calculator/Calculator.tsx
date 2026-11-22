"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { diffDays, fmtLong, parseISO } from "@/lib/date";

type Mode = "rent" | "general" | "salary";
type Method = "actual" | "year" | "30";

export default function ProRataCalculator() {
  const [s, set] = useUrlState({ mode: "rent", amt: "1500", date: "2027-02-20", dir: "in", method: "actual", total: "1200", part: "245", whole: "365", sal: "30000", ft: "37.5", hrs: "22.5" });
  const mode = (["rent", "general", "salary"].includes(s.mode) ? s.mode : "rent") as Mode;
  let value = NaN, label = "", body: React.ReactNode = null, error: string | null = null;

  if (mode === "rent") {
    const amt = Number(s.amt), d = /^\d{4}-\d{2}-\d{2}$/.test(s.date) ? parseISO(s.date) : null;
    if (!(amt > 0)) error = "Enter the monthly amount.";
    else if (!d || Number.isNaN(d.getTime())) error = "Enter a valid date.";
    else {
      const y = d.getFullYear(), m = d.getMonth(), dim = new Date(y, m + 1, 0).getDate();
      const days = s.dir === "out" ? d.getDate() : dim - d.getDate() + 1;
      const yearDays = diffDays(new Date(y, 0, 1), new Date(y + 1, 0, 1));
      const rates: Record<Method, number> = { actual: amt / dim, year: (amt * 12) / yearDays, "30": amt / 30 };
      const method = (["actual", "year", "30"].includes(s.method) ? s.method : "actual") as Method;
      value = rates[method] * days; label = `${s.dir === "out" ? "Rent through" : "Rent from"} ${fmtLong(d)}`;
      body = <>
        <p className="mt-1 text-sm muted">{days} of {dim} days in the month · {usd(rates[method])} per day</p>
        <table className="mt-4 w-full text-sm" data-testid="methods">
          <thead><tr className="text-left subtle"><th className="py-1 font-medium">Method</th><th className="py-1 text-right font-medium">Daily rate</th><th className="py-1 text-right font-medium">Prorated</th></tr></thead>
          <tbody>{([["actual", `Days in this month (${dim})`], ["year", `Days in the year (${yearDays})`], ["30", "30-day month"]] as [Method, string][]).map(([k, n]) => (
            <tr key={k} className={`border-t border-[var(--border)] ${k === method ? "font-semibold" : ""}`}><td className="py-1.5">{n}</td><td className="py-1.5 text-right tabular-nums">{usd(rates[k])}</td><td className="py-1.5 text-right tabular-nums">{usd(rates[k] * days)}</td></tr>
          ))}</tbody>
        </table>
      </>;
    }
  } else if (mode === "general") {
    const total = Number(s.total), part = Number(s.part), whole = Number(s.whole);
    if (!(whole > 0)) error = "Enter the full quantity (e.g. 365 days or 12 months)."; else if (!(part >= 0)) error = "Enter the portion used or remaining.";
    else { value = (total * part) / whole; label = `Pro rata share (${part} of ${whole})`; body = <dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><Stat k="Share" v={`${((part / whole) * 100).toFixed(2)}%`} /><Stat k="Remainder" v={usd(total - value)} /><Stat k="Per unit" v={usd(total / whole)} /></dl>; }
  } else {
    const sal = Number(s.sal), ft = Number(s.ft), hrs = Number(s.hrs);
    if (!(ft > 0)) error = "Enter full-time weekly hours."; else if (!(sal > 0)) error = "Enter the full-time salary.";
    else { value = (sal * hrs) / ft; label = "Pro rata salary (per year)"; body = <dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><Stat k="Per month" v={usd(value / 12)} /><Stat k="Per week" v={usd(value / 52)} /><Stat k="FTE" v={(hrs / ft).toFixed(3)} /><Stat k="Hourly equivalent" v={usd(sal / (ft * 52))} /></dl>; }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Pro rata calculator">
        <Segmented label="Prorate" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "rent", label: "Rent / bill by date" }, { id: "general", label: "Any amount" }, { id: "salary", label: "Part-time salary" }]} />
        {mode === "rent" && <>
          <Field id="amt" label="Monthly rent or bill" prefix="$" value={s.amt} onChange={(v) => set("amt", v)} min={0} />
          <div className="grid grid-cols-[1fr_auto] items-end gap-3">
            <div><label htmlFor="date" className="label">{s.dir === "out" ? "Move-out (last) date" : "Move-in (first) date"}</label><input id="date" type="date" className="field" value={s.date} onChange={(e) => set("date", e.target.value)} /></div>
            <Segmented label="Charge" value={s.dir === "out" ? "out" : "in"} onChange={(v) => set("dir", v)} options={[{ id: "in", label: "Move-in" }, { id: "out", label: "Move-out" }]} />
          </div>
          <Segmented label="Day-count method" value={(["actual", "year", "30"].includes(s.method) ? s.method : "actual") as Method} onChange={(v) => set("method", v)} options={[{ id: "actual", label: "Days in month" }, { id: "year", label: "365-day year" }, { id: "30", label: "30-day month" }]} />
          <p className="text-xs subtle">Both the move-in and move-out days are counted. Check your lease for the method it uses.</p>
        </>}
        {mode === "general" && <>
          <Field id="total" label="Full amount" prefix="$" value={s.total} onChange={(v) => set("total", v)} />
          <div className="grid grid-cols-2 gap-3">
            <Field id="part" label="Portion (used or remaining)" value={s.part} onChange={(v) => set("part", v)} min={0} hint="e.g. 245 days left" />
            <Field id="whole" label="Out of (full period)" value={s.whole} onChange={(v) => set("whole", v)} min={0} hint="e.g. 365 days" />
          </div>
        </>}
        {mode === "salary" && <>
          <Field id="sal" label="Full-time annual salary" prefix="$" value={s.sal} onChange={(v) => set("sal", v)} min={0} />
          <div className="grid grid-cols-2 gap-3">
            <Field id="ft" label="Full-time hours / week" value={s.ft} onChange={(v) => set("ft", v)} min={0} />
            <Field id="hrs" label="Your hours / week" value={s.hrs} onChange={(v) => set("hrs", v)} min={0} />
          </div>
        </>}
      </form>
      <ResultCard error={error} label={label} value={usd(value)}>{body}</ResultCard>
    </div>
  );
}
