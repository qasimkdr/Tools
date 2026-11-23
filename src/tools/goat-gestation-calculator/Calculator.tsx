"use client";
import { Field, ResultCard, Segmented, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { useToday } from "@/lib/useToday";
import { addDays, diffDays, fmtLong, fmtShort, parseISO, toISO } from "@/lib/date";

const BREED = { standard: [150, "Standard breeds (Boer, Nubian, Alpine, LaMancha…)"], mini: [145, "Miniature breeds (Nigerian Dwarf, Pygmy)"] } as const;

export default function GoatGestationCalculator({ buildISO }: { buildISO: string }) {
  const today = useToday(buildISO);
  const [s, set] = useUrlState({ mode: "one", date: "", breed: "standard", len: "", herd: "Daisy, 2026-09-15\nHazel, 2026-10-02\nPepper, 2026-10-20" });
  const breed = s.breed === "mini" ? "mini" : "standard";
  const len = Number(s.len) > 100 && Number(s.len) < 200 ? Number(s.len) : BREED[breed][0];
  const bred = /^\d{4}-\d{2}-\d{2}$/.test(s.date) ? parseISO(s.date) : today;
  const due = addDays(bred, len), early = addDays(bred, len - 5), late = addDays(bred, len + 5);
  const dayNow = diffDays(bred, today), left = diffDays(today, due);
  const herd = s.herd.split("\n").map((l) => l.split(/[,;\t]/).map((x) => x.trim())).filter((p) => p.length >= 2 && /^\d{4}-\d{2}-\d{2}$/.test(p[1]))
    .map(([name, d]) => { const b = parseISO(d), dd = addDays(b, len); return { name: name || "Doe", bred: b, due: dd, left: diffDays(today, dd) }; })
    .sort((a, b) => a.due.getTime() - b.due.getTime());
  const steps: [number, string][] = [[30, "About a month after breeding, pregnancy can be confirmed by a vet (ultrasound or blood test)."], [len - 42, "Last 6 weeks: most growth of the kids happens now; adjust feed with your vet or nutritionist."], [len - 30, "Around a month before kidding: vaccination boosters are commonly given at this stage; follow your vet's program."], [len - 7, "One week out: clean kidding pen, kidding kit ready, watch for udder fill and loosened ligaments."]];

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Goat gestation calculator">
          <Segmented label="Calculate for" value={s.mode === "herd" ? "herd" : "one"} onChange={(v) => set("mode", v)} options={[{ id: "one", label: "One doe" }, { id: "herd", label: "Whole herd" }]} />
          <Segmented label="Breed size" value={breed} onChange={(v) => set("breed", v)} options={[{ id: "standard", label: "Standard (150 days)" }, { id: "mini", label: "Miniature (145 days)" }]} />
          <Field id="len" label="Custom gestation length (optional)" suffix="days" value={s.len} onChange={(v) => set("len", v)} min={0} hint={BREED[breed][1]} />
          {s.mode === "herd" ? (
            <div>
              <label htmlFor="herd" className="label">Does and breeding dates (one per line: name, YYYY-MM-DD)</label>
              <textarea id="herd" rows={6} className="field font-mono" value={s.herd} onChange={(e) => set("herd", e.target.value)} spellCheck={false} />
            </div>
          ) : (
            <div><label htmlFor="date" className="label">Breeding (or buck exposure) date</label>
              <input id="date" type="date" className="field" value={toISO(bred)} onChange={(e) => set("date", e.target.value)} /></div>
          )}
        </form>
        {s.mode === "herd" ? (
          <ResultCard label="Next doe due" error={herd.length ? null : "Add at least one line like: Daisy, 2026-09-15"} value={herd.length ? `${herd.find((h) => h.left >= 0)?.name ?? herd[herd.length - 1].name}` : "–"}>
            {herd.length > 0 && <>
              <table className="mt-4 w-full text-sm" data-testid="herd">
                <thead><tr className="text-left subtle"><th className="py-1">Doe</th><th>Bred</th><th>Due</th><th>Days left</th></tr></thead>
                <tbody>{herd.map((h) => <tr key={h.name + h.due.getTime()} className="border-t border-[var(--border)]"><td className="py-1">{h.name}</td><td>{fmtShort(h.bred)}</td><td className="font-semibold">{fmtShort(h.due)}</td><td>{h.left >= 0 ? h.left : "due"}</td></tr>)}</tbody>
              </table>
              <button type="button" className="btn-ghost mt-4 text-sm" onClick={() => downloadCsv("kidding-dates.csv", ["Doe", "Bred", "Due", "Window start", "Window end"], herd.map((h) => [h.name, toISO(h.bred), toISO(h.due), toISO(addDays(h.due, -5)), toISO(addDays(h.due, 5))]))}>Download CSV</button>
            </>}
          </ResultCard>
        ) : (
          <ResultCard label="Expected kidding date" value={<span data-testid="due">{fmtLong(due)}</span>}>
            <p className="mt-1 text-sm muted">{len} days after breeding · likely between {fmtShort(early)} and {fmtShort(late)}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Day of pregnancy today" v={dayNow >= 0 && dayNow <= len + 10 ? `Day ${dayNow} of ${len}` : dayNow < 0 ? "Not bred yet" : "Past due window"} />
              <Stat k="Days until due" v={left >= 0 ? `${left} days` : "Due date passed"} />
              <Stat k="Progress" v={`${Math.max(0, Math.min(100, Math.round((dayNow / len) * 100)))}%`} />
              <Stat k="Weeks pregnant" v={dayNow >= 0 ? `${Math.floor(dayNow / 7)} weeks ${dayNow % 7} days` : "–"} />
            </dl>
            <ol className="mt-4 space-y-2 text-sm">{steps.map(([d, t]) => <li key={d}><strong>{fmtShort(addDays(bred, d))}</strong> · {t}</li>)}</ol>
            <p className="mt-3 text-xs subtle">Does can kid a few days early or late. Call your vet if labor stalls or a doe shows signs of illness.</p>
          </ResultCard>
        )}
      </div>
    </div>
  );
}
