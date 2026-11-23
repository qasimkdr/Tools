"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { useToday } from "@/lib/useToday";
import { addBusinessDays, addDays, fmtLong, parseISO, toISO } from "@/lib/date";

const STAGES = [["pre", "Order processing / supplier delay"], ["prod", "Production or picking"], ["ship", "Shipping / transit"], ["insp", "Receiving & inspection"]] as const;

export default function LeadTimeCalculator({ buildISO }: { buildISO: string }) {
  const today = useToday(buildISO);
  const [s, set] = useUrlState({ dir: "deliver", date: "", pre: "2", prod: "5", ship: "4", insp: "1", days: "biz", hol: "1", demand: "", safety: "" });
  const base = /^\d{4}-\d{2}-\d{2}$/.test(s.date) ? parseISO(s.date) : today;
  const total = STAGES.reduce((t, [k]) => t + (Number((s as Record<string, string>)[k]) || 0), 0);
  const biz = s.days === "biz", hol = s.hol === "1";
  const forward = s.dir !== "orderby";
  const sign = forward ? 1 : -1;
  const result = biz ? addBusinessDays(base, sign * total, hol) : addDays(base, sign * total);
  const demand = Number(s.demand), safety = Number(s.safety) || 0;
  const rop = demand > 0 ? demand * total + safety : NaN;
  const err = !(total > 0) ? "Enter at least one stage in days." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Lead time calculator">
        <Segmented label="Find" value={forward ? "deliver" : "orderby"} onChange={(v) => set("dir", v)} options={[{ id: "deliver", label: "Delivery date" }, { id: "orderby", label: "Latest order date" }]} />
        <div><label htmlFor="date" className="label">{forward ? "Order date" : "Date you need it by"}</label>
          <input id="date" type="date" className="field" value={toISO(base)} onChange={(e) => set("date", e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-3">
          {STAGES.map(([k, label]) => <Field key={k} id={k} label={label} suffix="days" value={(s as Record<string, string>)[k]} onChange={(v) => set(k, v)} min={0} />)}
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <Segmented label="Count" value={biz ? "biz" : "cal"} onChange={(v) => set("days", v)} options={[{ id: "biz", label: "Business days" }, { id: "cal", label: "Calendar days" }]} />
          {biz && <label className="flex items-center gap-2 pb-2 text-sm"><input type="checkbox" checked={hol} onChange={(e) => set("hol", e.target.checked ? "1" : "0")} /> Skip U.S. federal holidays</label>}
        </div>
        <div>
          <span className="label">Reorder point (optional)</span>
          <div className="grid grid-cols-2 gap-3">
            <Field id="demand" label="Daily demand" suffix="units" value={s.demand} onChange={(v) => set("demand", v)} min={0} />
            <Field id="safety" label="Safety stock" suffix="units" value={s.safety} onChange={(v) => set("safety", v)} min={0} />
          </div>
        </div>
      </form>
      <ResultCard label={forward ? "Expected delivery" : "Order no later than"} error={err} value={err ? "–" : fmtLong(result)}>
        {!err && <>
          <p className="mt-1 text-sm muted">Total lead time <strong data-testid="total">{total} {biz ? "business" : "calendar"} days</strong> {forward ? "after" : "before"} {fmtLong(base)}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {STAGES.map(([k, label]) => <Stat key={k} k={label} v={`${Number((s as Record<string, string>)[k]) || 0} days`} />)}
            <Stat k="Calendar days spanned" v={<span data-testid="span">{Math.abs(Math.round((result.getTime() - base.getTime()) / 86400000))} days</span>} />
            {Number.isFinite(rop) && <Stat k="Reorder point" v={<span data-testid="rop">{Math.ceil(rop).toLocaleString("en-US")} units</span>} />}
          </dl>
          {Number.isFinite(rop) && <p className="mt-3 text-sm muted">Reorder when stock falls to {Math.ceil(rop).toLocaleString("en-US")} units: {demand} per day × {total} days{safety ? ` + ${safety} safety stock` : ""}.</p>}
          <p className="mt-4 text-xs subtle">Estimates only: suppliers&apos; cut-off times, weekends at the carrier and customs can add days. Build in a buffer for critical orders.</p>
        </>}
      </ResultCard>
    </div>
  );
}
