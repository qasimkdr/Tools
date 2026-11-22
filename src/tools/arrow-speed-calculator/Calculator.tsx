"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

export default function ArrowSpeedCalculator() {
  const [s, set] = useUrlState({ ibo: "340", dl: "28", dw: "60", aw: "400" });
  const ibo = Number(s.ibo), dl = Number(s.dl), dw = Number(s.dw), aw = Number(s.aw);
  const err = !(ibo > 100 && ibo < 600) ? "Enter the bow's IBO speed in fps." : !(dl > 15 && dl < 36) ? "Enter a draw length between 15 and 36 inches." : !(dw > 10 && dw < 120) ? "Enter the draw weight in pounds." : !(aw > 100 && aw < 1500) ? "Enter the total arrow weight in grains." : null;
  // Rules of thumb from the IBO standard (30 in, 70 lb, 350 gr = 5 gr/lb):
  const dlAdj = 10 * (dl - 30); // ≈10 fps per inch of draw length
  const excess = Math.max(0, aw - 5 * dw), awAdj = -excess / 3; // −1 fps per 3 gr above 5 gr/lb of draw weight
  const v = ibo + dlAdj + awAdj;
  const gpp = aw / dw;
  const ke = (aw * v * v) / 450240, mom = (aw * v) / 225400;
  const ok = !err && v > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Arrow speed calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="ibo" label="Bow IBO speed" suffix="fps" value={s.ibo} onChange={(v) => set("ibo", v)} min={0} hint="From the manufacturer's specs" />
          <Field id="dl" label="Your draw length" suffix="in" value={s.dl} onChange={(v) => set("dl", v)} min={0} />
          <Field id="dw" label="Peak draw weight" suffix="lb" value={s.dw} onChange={(v) => set("dw", v)} min={0} />
          <Field id="aw" label="Total arrow weight" suffix="grains" value={s.aw} onChange={(v) => set("aw", v)} min={0} hint="Shaft + point + insert + nock + fletching" />
        </div>
      </form>
      <ResultCard label="Estimated arrow speed" error={err ?? (ok ? null : "These settings give no usable estimate.")} value={ok ? `${Math.round(v)} fps` : "–"}>
        {ok && <>
          <p className="mt-1 text-sm muted">{(v * 0.3048).toFixed(1)} m/s · {(v * 0.681818).toFixed(0)} mph</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Draw length adjustment" v={<span data-testid="dl">{dlAdj >= 0 ? "+" : ""}{dlAdj.toFixed(0)} fps</span>} />
            <Stat k="Arrow weight adjustment" v={<span data-testid="aw">{awAdj.toFixed(1)} fps</span>} />
            <Stat k="Kinetic energy" v={<span data-testid="ke">{ke.toFixed(1)} ft·lb</span>} />
            <Stat k="Momentum" v={<span data-testid="mom">{mom.toFixed(3)} slug·ft/s</span>} />
            <Stat k="Grains per pound" v={`${gpp.toFixed(1)} gr/lb`} />
          </dl>
          {gpp < 5 && <p className="mt-4 rounded-lg bg-[var(--surface-2)] p-3 text-sm" data-testid="warn">⚠️ Below 5 grains per pound of draw weight. Many bow makers set 5 gr/lb as the minimum arrow weight; lighter arrows can damage the bow like a dry fire and may void the warranty.</p>}
          <p className="mt-4 text-xs subtle">IBO ratings are measured at 30 in draw, 70 lb and a 350-grain arrow; real bows usually shoot slower. String accessories (peep, silencers, D-loop) slow it a little more. A chronograph gives your true speed.</p>
        </>}
      </ResultCard>
    </div>
  );
}
