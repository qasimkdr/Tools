"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3];
const hm = (min: number) => { const t = Math.round(min); const h = Math.floor(t / 60), m = t % 60; return h ? `${h} h ${m} min` : `${m} min`; };

export default function AudiobookSpeedCalculator() {
  const [s, set] = useUrlState({ h: "12", m: "30", sp: "1.5", daily: "30", th: "10", tm: "0" });
  const len = (Number(s.h) || 0) * 60 + (Number(s.m) || 0);
  const sp = Number(s.sp);
  const err = !(len > 0) ? "Enter the audiobook's length." : !(sp >= 0.25 && sp <= 5) ? "Enter a playback speed between 0.25x and 5x." : null;
  const listen = len / sp, saved = len - listen;
  const daily = Number(s.daily), target = (Number(s.th) || 0) * 60 + (Number(s.tm) || 0);
  const need = target > 0 ? len / target : NaN;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Audiobook speed calculator">
        <div>
          <span className="label">Audiobook length (at 1x)</span>
          <div className="grid grid-cols-2 gap-3">
            <Field id="h" label="Hours" value={s.h} onChange={(v) => set("h", v)} min={0} inputMode="numeric" />
            <Field id="m" label="Minutes" value={s.m} onChange={(v) => set("m", v)} min={0} inputMode="numeric" />
          </div>
        </div>
        <div>
          <Field id="sp" label="Playback speed" suffix="×" value={s.sp} onChange={(v) => set("sp", v)} min={0} />
          <div className="mt-2 flex flex-wrap gap-2">
            {SPEEDS.map((x) => (
              <button key={x} type="button" onClick={() => set("sp", String(x))} className={`rounded-full border px-3 py-1 text-sm ${Number(s.sp) === x ? "border-[var(--color-brand-600)] bg-[var(--color-brand-600)] text-white" : "border-[var(--border)]"}`}>{x}×</button>
            ))}
          </div>
        </div>
        <Field id="daily" label="I listen per day (optional)" suffix="min" value={s.daily} onChange={(v) => set("daily", v)} min={0} />
        <div>
          <span className="label">Finish within (optional)</span>
          <div className="grid grid-cols-2 gap-3">
            <Field id="th" label="Hours" value={s.th} onChange={(v) => set("th", v)} min={0} inputMode="numeric" />
            <Field id="tm" label="Minutes" value={s.tm} onChange={(v) => set("tm", v)} min={0} inputMode="numeric" />
          </div>
        </div>
      </form>
      <ResultCard label={`Listening time at ${sp || "–"}×`} error={err} value={err ? "–" : hm(listen)}>
        {!err && <>
          <p className="mt-1 text-sm muted">You save <strong data-testid="saved">{hm(Math.abs(saved))}</strong>{saved < 0 ? " extra (slower than 1x)" : ""} compared with {hm(len)} at normal speed ({Math.abs((1 - 1 / sp) * 100).toFixed(0)}%).</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {daily > 0 && <Stat k={`Days at ${daily} min/day`} v={<span data-testid="days">{Math.ceil(listen / daily - 1e-9)} days</span>} />}
            {daily > 0 && <Stat k="Days at 1x" v={`${Math.ceil(len / daily - 1e-9)} days`} />}
            {Number.isFinite(need) && <Stat k={`Speed to finish in ${hm(target)}`} v={<span data-testid="need">{need <= 1 ? "1× is enough" : `${(Math.ceil(need * 100) / 100).toFixed(2)}×`}</span>} />}
          </dl>
          <table className="mt-4 w-full text-sm" data-testid="speeds">
            <thead><tr className="text-left subtle"><th className="py-1">Speed</th><th>Listening time</th><th>Time saved</th></tr></thead>
            <tbody>
              {SPEEDS.map((x) => (
                <tr key={x} className={`border-t border-[var(--border)] ${x === sp ? "font-semibold" : ""}`}><td className="py-1">{x}×</td><td>{hm(len / x)}</td><td>{hm(len - len / x)}</td></tr>
              ))}
            </tbody>
          </table>
        </>}
      </ResultCard>
    </div>
  );
}
