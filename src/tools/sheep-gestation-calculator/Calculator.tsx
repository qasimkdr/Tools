"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { useToday } from "@/lib/useToday";
import { addDays, diffDays, fmtLong, fmtShort, parseISO, toISO } from "@/lib/date";

const PRESETS = [
  { id: "avg", len: 147, label: "Average (147 days)" },
  { id: "early", len: 142, label: "Early-maturing, e.g. Rideau Arcott (142)" },
  { id: "late", len: 150, label: "Later-maturing, e.g. Suffolk (150)" },
] as const;
const CYCLE = 17; // average ewe oestrous cycle, days
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

export default function SheepGestationCalculator({ buildISO }: { buildISO: string }) {
  const today = useToday(buildISO);
  const [s, set] = useUrlState({ mode: "ewe", date: "", rin: "", rout: "", target: "", breed: "avg", len: "" });
  const preset = PRESETS.find((p) => p.id === s.breed) ?? PRESETS[0];
  const len = Number(s.len) >= 130 && Number(s.len) <= 165 ? Math.round(Number(s.len)) : preset.len;
  const mode = ["ewe", "flock", "plan"].includes(s.mode) ? s.mode : "ewe";
  const early = len - 3, late = len + 4; // typical spread around the average, e.g. 144–151 for 147

  const bred = isDate(s.date) ? parseISO(s.date) : today;
  const due = addDays(bred, len), dayNow = diffDays(bred, today), left = diffDays(today, due);
  const rin = isDate(s.rin) ? parseISO(s.rin) : today;
  const rout = isDate(s.rout) ? parseISO(s.rout) : addDays(rin, 2 * CYCLE);
  const exposure = diffDays(rin, rout);
  const target = isDate(s.target) ? parseISO(s.target) : addDays(today, 200);
  const flockErr = mode === "flock" && exposure < 1 ? "The ram-out date must be after the ram-in date." : null;
  const timeline: [number, string][] = [[CYCLE, "One cycle after breeding: ewes that come back into heat (new raddle mark) did not settle."], [len - 42, "Last 6 weeks: most of the lambs' growth happens now; raise the ewe's nutrition (ask your vet or adviser)."], [len - 28, "About 4 weeks before lambing: pre-lambing vaccinations are commonly given now; follow your vet's program."], [len - 7, "One week out: lambing pens, colostrum, iodine and supplies ready; watch for udder fill and a sunken flank."]];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Sheep gestation calculator">
        <Segmented label="I want to" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "ewe", label: "Date one ewe" }, { id: "flock", label: "Flock (ram in/out)" }, { id: "plan", label: "Plan backwards" }]} />
        <div>
          <label htmlFor="breed" className="label">Gestation length</label>
          <select id="breed" className="field" value={preset.id} onChange={(e) => set("breed", e.target.value)}>{PRESETS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}</select>
        </div>
        <Field id="len" label="Custom length (optional)" suffix="days" value={s.len} onChange={(v) => set("len", v)} min={0} hint="Use your flock's own records if you have them" />
        {mode === "ewe" && <div><label htmlFor="date" className="label">Breeding date (raddle mark or AI date)</label><input id="date" type="date" className="field" value={toISO(bred)} onChange={(e) => set("date", e.target.value)} /></div>}
        {mode === "flock" && <div className="grid grid-cols-2 gap-3">
          <div><label htmlFor="rin" className="label">Ram in</label><input id="rin" type="date" className="field" value={toISO(rin)} onChange={(e) => set("rin", e.target.value)} /></div>
          <div><label htmlFor="rout" className="label">Ram out</label><input id="rout" type="date" className="field" value={toISO(rout)} onChange={(e) => set("rout", e.target.value)} /></div>
        </div>}
        {mode === "plan" && <div><label htmlFor="target" className="label">When do you want lambing to start?</label><input id="target" type="date" className="field" value={toISO(target)} onChange={(e) => set("target", e.target.value)} /></div>}
      </form>

      {mode === "ewe" && (
        <ResultCard label="Expected lambing date" value={<span data-testid="due">{fmtLong(due)}</span>}>
          <p className="mt-1 text-sm muted">{len} days after breeding · most ewes lamb between <span data-testid="window">{fmtShort(addDays(bred, early))} and {fmtShort(addDays(bred, late))}</span></p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Day of pregnancy today" v={dayNow >= 0 && dayNow <= late + 7 ? `Day ${dayNow} of ${len}` : dayNow < 0 ? "Not bred yet" : "Past the window"} />
            <Stat k="Days until lambing" v={left >= 0 ? `${left} days` : "Date passed"} />
            <Stat k="Check for return to heat" v={fmtShort(addDays(bred, CYCLE))} />
            <Stat k="Progress" v={`${Math.max(0, Math.min(100, Math.round((dayNow / len) * 100)))}%`} />
          </dl>
          <ol className="mt-4 space-y-2 text-sm">{timeline.map(([d, t]) => <li key={d}><strong>{fmtShort(addDays(bred, d))}</strong> · {t}</li>)}</ol>
        </ResultCard>
      )}
      {mode === "flock" && (
        <ResultCard error={flockErr} label="Flock lambing period" value={flockErr ? "–" : <span data-testid="period">{fmtShort(addDays(rin, early))} – {fmtShort(addDays(rout, late))}</span>}>
          {!flockErr && <>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Ram with ewes" v={<span data-testid="exposure">{exposure} days ({(exposure / CYCLE).toFixed(1)} cycles)</span>} />
              <Stat k="First lambs expected" v={fmtShort(addDays(rin, early))} />
              <Stat k="Most lambs (first cycle)" v={`${fmtShort(addDays(rin, len))} – ${fmtShort(addDays(rin, CYCLE + len))}`} />
              <Stat k="Last lambs expected" v={fmtShort(addDays(rout, late))} />
            </dl>
            <h2 className="mt-5 text-sm font-semibold">Raddle colour changes</h2>
            <table className="mt-2 w-full text-sm" data-testid="cycles">
              <thead><tr className="text-left subtle"><th className="py-1">Cycle</th><th>Marked between</th><th>Lambing from about</th></tr></thead>
              <tbody>{Array.from({ length: Math.max(1, Math.ceil(exposure / CYCLE)) }, (_, i) => { const a = addDays(rin, i * CYCLE), b = addDays(rin, Math.min(exposure, (i + 1) * CYCLE) - 1); return (
                <tr key={i} className="border-t border-[var(--border)]"><td className="py-1">{i + 1}</td><td>{fmtShort(a)} – {fmtShort(b)}</td><td>{fmtShort(addDays(a, len))} – {fmtShort(addDays(b, len))}</td></tr>); })}</tbody>
            </table>
            <p className="mt-2 text-xs subtle">Changing the raddle crayon colour every {CYCLE} days (one oestrous cycle) tells you which ewes were mated early and which returned to service.</p>
          </>}
        </ResultCard>
      )}
      {mode === "plan" && (
        <ResultCard label="Put the ram in on" value={<span data-testid="ram-in">{fmtLong(addDays(target, -len))}</span>}>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="First lambs around" v={fmtShort(addDays(target, -3))} />
            <Stat k="Ram out after 2 cycles" v={<span data-testid="ram-out">{fmtShort(addDays(target, -len + 2 * CYCLE))}</span>} />
            <Stat k="Lambing should finish by" v={fmtShort(addDays(target, 2 * CYCLE + 4))} />
            <Stat k="Start flushing ewes from about" v={fmtShort(addDays(target, -len - 21))} />
          </dl>
          <p className="mt-3 text-xs subtle">Two cycles ({2 * CYCLE} days) with the ram is a common, tight breeding period. Sheep are seasonal breeders in many breeds, so check that your target fits their breeding season.</p>
        </ResultCard>
      )}
    </div>
  );
}
