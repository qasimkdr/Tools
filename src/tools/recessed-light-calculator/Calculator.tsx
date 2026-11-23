"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

/** Lights along one side so spacing doesn't exceed `s`, with half-spacing at each wall. */
const fit = (len: number, s: number) => { const n = Math.max(1, Math.ceil(len / s - 1e-9)); return { n, gap: len / n, edge: len / n / 2 }; };

export default function RecessedLightCalculator() {
  const [s, set] = useUrlState({ u: "ft", l: "14", w: "12", h: "8", sp: "" });
  const metric = s.u === "m", u = metric ? "m" : "ft";
  const L = Number(s.l), W = Number(s.w), H = Number(s.h);
  const spacing = Number(s.sp) > 0 ? Number(s.sp) : H / 2;
  const err = !(L > 0 && W > 0) ? "Enter the room's length and width." : !(spacing > 0) ? "Enter the ceiling height (or a spacing)." : null;
  const a = fit(L, spacing), b = fit(W, spacing);
  const total = a.n * b.n;
  const fmt = (x: number) => (metric ? `${x.toFixed(2)} m` : `${Math.floor(x + 1e-9)} ft ${Math.round((x - Math.floor(x + 1e-9)) * 12)} in`);
  const scale = 300 / Math.max(L, W, 1);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Recessed light calculator">
        <Segmented label="Units" value={metric ? "m" : "ft"} onChange={(v) => set("u", v)} options={[{ id: "ft", label: "Feet" }, { id: "m", label: "Meters" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="l" label="Room length" suffix={u} value={s.l} onChange={(v) => set("l", v)} min={0} />
          <Field id="w" label="Room width" suffix={u} value={s.w} onChange={(v) => set("w", v)} min={0} />
          <Field id="h" label="Ceiling height" suffix={u} value={s.h} onChange={(v) => set("h", v)} min={0} />
          <Field id="sp" label="Max spacing (optional)" suffix={u} value={s.sp} onChange={(v) => set("sp", v)} min={0} hint="Blank = ceiling height ÷ 2" />
        </div>
        {!err && (
          <svg viewBox={`-10 -10 ${L * scale + 20} ${W * scale + 20}`} className="w-full max-w-md rounded-xl border border-[var(--border)] bg-white" role="img" aria-label={`${a.n} by ${b.n} light layout`} data-testid="layout">
            <rect x={0} y={0} width={L * scale} height={W * scale} fill="#f8fafc" stroke="#94a3b8" />
            {Array.from({ length: a.n }, (_, i) => Array.from({ length: b.n }, (_, j) => (
              <circle key={`${i}-${j}`} cx={(a.edge + i * a.gap) * scale} cy={(b.edge + j * b.gap) * scale} r={Math.max(4, Math.min(10, spacing * scale * 0.12))} fill="#f59e0b" stroke="#b45309" />
            )))}
          </svg>
        )}
      </form>
      <ResultCard label="Recessed lights needed" error={err} value={err ? "–" : `${total} lights`}>
        {!err && <>
          <p className="mt-1 text-sm muted" data-testid="grid">{a.n} along the length × {b.n} along the width</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Spacing rule" v={`${fmt(spacing)} max`} />
            <Stat k="Spacing along length" v={<span data-testid="gap-l">{fmt(a.gap)}</span>} />
            <Stat k="Spacing along width" v={fmt(b.gap)} />
            <Stat k="First light from end walls" v={<span data-testid="edge-l">{fmt(a.edge)}</span>} />
            <Stat k="First light from side walls" v={fmt(b.edge)} />
            <Stat k="Floor area per light" v={`${((L * W) / total).toFixed(1)} ${u}²`} />
          </dl>
          <p className="mt-4 text-xs subtle">Rule of thumb: space lights about half the ceiling height apart, and half that from the walls. Check the fixture&apos;s beam angle or spacing criterion, keep clear of joists, and follow local electrical code (use IC-rated housings where insulation touches them).</p>
        </>}
      </ResultCard>
    </div>
  );
}
