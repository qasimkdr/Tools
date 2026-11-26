"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { DECATHLON, HEPTATHLON, parseTime, perfFor, points } from "@/lib/multiEvents";

const DEC_DEFAULT = ["10.55", "7.80", "16.00", "2.05", "48.42", "13.75", "50.54", "5.45", "71.90", "4:36.11"];
const HEP_DEFAULT = ["12.69", "1.86", "15.80", "22.56", "7.27", "45.66", "2:08.51"];
const fmtSec = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}:${(s % 60).toFixed(2).padStart(5, "0")}` : s.toFixed(2));

export default function DecathlonCalculator() {
  const [s, set] = useUrlState({ ev: "dec", d: DEC_DEFAULT.join("|"), h: HEP_DEFAULT.join("|") });
  const hep = s.ev === "hep";
  const events = hep ? HEPTATHLON : DECATHLON;
  const key = hep ? "h" : "d";
  const vals = (s[key] || "").split("|");
  while (vals.length < events.length) vals.push("");
  const rows = events.map((e, i) => {
    const raw = (vals[i] ?? "").trim();
    const perf = raw === "" ? NaN : e.kind === "track" ? parseTime(raw) : Number(raw.replace(",", "."));
    const bad = raw !== "" && !(perf > 0);
    return { e, raw, perf, bad, pts: bad ? 0 : points(e, perf) };
  });
  const total = rows.reduce((a, r) => a + r.pts, 0);
  const day1 = rows.slice(0, hep ? 4 : 5).reduce((a, r) => a + r.pts, 0);
  const filled = rows.filter((r) => r.raw !== "" && !r.bad).length;
  const setVal = (i: number, v: string) => { const next = [...vals]; next[i] = v.replace(/\|/g, ""); set(key, next.join("|")); };
  const max = Math.max(1, ...rows.map((r) => r.pts));

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="Combined events calculator">
          <Segmented label="Competition" value={hep ? "hep" : "dec"} onChange={(v) => set("ev", v)} options={[{ id: "dec", label: "Decathlon (men)" }, { id: "hep", label: "Heptathlon (women)" }]} />
          <div className="grid grid-cols-2 gap-3">
            {rows.map((r, i) => (
              <div key={r.e.id}>
                <label htmlFor={`e-${r.e.id}`} className="label">{r.e.name} <span className="font-normal subtle">({r.e.kind === "track" ? (r.e.long ? "m:ss.xx" : "seconds") : "metres"})</span></label>
                <input id={`e-${r.e.id}`} className={`field ${r.bad ? "border-red-500" : ""}`} value={r.raw} onChange={(ev) => setVal(i, ev.target.value)} inputMode="decimal" autoComplete="off" />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-ghost px-3 py-1.5 text-sm" onClick={() => set(key, events.map(() => "").join("|"))}>Clear all</button>
            <button type="button" className="btn-ghost px-3 py-1.5 text-sm" onClick={() => set(key, (hep ? HEP_DEFAULT : DEC_DEFAULT).join("|"))}>World record example</button>
          </div>
          <p className="text-xs subtle">Use electronic times. Leave an event blank to score the others; a mark slower or shorter than the table&apos;s base value scores 0.</p>
        </form>
        <ResultCard label={`${hep ? "Heptathlon" : "Decathlon"} score`} value={<span data-testid="total">{total.toLocaleString("en-US")}</span>}>
          <p className="mt-1 text-sm muted">{filled} of {events.length} events entered</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k={`Day 1 (${events.slice(0, hep ? 4 : 5).map((e) => e.name.replace(" hurdles", "H")).join(", ")})`} v={<span data-testid="day1">{day1.toLocaleString("en-US")}</span>} />
            <Stat k="Day 2" v={<span data-testid="day2">{(total - day1).toLocaleString("en-US")}</span>} />
            <Stat k="Average per event" v={filled ? Math.round(total / filled).toLocaleString("en-US") : "–"} />
            <Stat k="Best event" v={filled ? `${rows.reduce((a, r) => (r.pts > a.pts ? r : a)).e.name}` : "–"} />
          </dl>
          <table className="mt-4 w-full text-sm" data-testid="events">
            <thead><tr className="text-left subtle"><th className="py-1">Event</th><th>Mark</th><th>Points</th><th className="w-1/3"></th></tr></thead>
            <tbody>{rows.map((r) => (
              <tr key={r.e.id} className="border-t border-[var(--border)]">
                <td className="py-1">{r.e.name}</td><td>{r.raw || "–"}</td><td data-testid={`p-${r.e.id}`}>{r.bad ? "?" : r.pts}</td>
                <td><div className="h-2 rounded-full bg-[var(--color-brand-500)]" style={{ width: `${(r.pts / max) * 100}%`, minWidth: r.pts ? 2 : 0 }} /></td>
              </tr>))}</tbody>
          </table>
        </ResultCard>
      </div>
      <div>
        <h2 className="text-base font-semibold">Marks needed for 700, 800, 900 and 1,000 points</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm" data-testid="targets">
            <thead className="bg-[var(--surface-2)]"><tr className="text-left"><th className="px-3 py-1.5">Event</th>{[700, 800, 900, 1000].map((p) => <th key={p} className="px-3">{p}</th>)}</tr></thead>
            <tbody>{events.map((e) => <tr key={e.id} className="border-t border-[var(--border)]"><td className="px-3 py-1">{e.name}</td>{[700, 800, 900, 1000].map((p) => { const x = perfFor(e, p); return <td key={p} className="px-3">{e.kind === "track" ? fmtSec(Math.floor(x * 100) / 100) : `${(Math.ceil(x * 100) / 100).toFixed(2)} m`}</td>; })}</tr>)}</tbody>
          </table>
        </div>
        <p className="mt-2 text-xs subtle">Times are rounded down and distances up to the next hundredth so each mark reaches at least that score.</p>
      </div>
    </div>
  );
}
