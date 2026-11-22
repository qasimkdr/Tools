"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

/** Innings in baseball notation: 6.1 = 6⅓, 6.2 = 6⅔. Returns innings as a number, or null if the decimal isn't .0/.1/.2. */
export function parseIP(v: string) {
  const m = v.trim().match(/^(\d+)(?:\.(\d))?$/);
  if (!m) return null;
  const outs = Number(m[2] ?? 0);
  return outs > 2 ? null : Number(m[1]) + outs / 3;
}
const r2 = (v: number) => (Number.isFinite(v) ? v.toFixed(2) : "—");

export default function EraCalculator() {
  const [s, set] = useUrlState({ er: "45", ip: "162.1", g: "9", custom: "6", h: "130", bb: "40", k: "180" });
  const ip = parseIP(s.ip), er = Number(s.er);
  const gl = s.g === "custom" ? Number(s.custom) : Number(s.g);
  const era = ip ? (gl * er) / ip : NaN;
  const h = Number(s.h), bb = Number(s.bb), k = Number(s.k);
  const outs = ip ? Math.round(ip * 3) : 0;
  const error = ip === null ? "Enter innings like 6, 6.1 (6⅓) or 6.2 (6⅔). The decimal counts outs, not tenths." : !(ip > 0) ? "Innings pitched must be more than 0." : !(er >= 0) || s.er === "" ? "Enter earned runs (0 or more)." : !(gl > 0) ? "Enter the number of innings in a regulation game." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="ERA calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="er" label="Earned runs" value={s.er} onChange={(v) => set("er", v)} min={0} inputMode="numeric" />
          <div>
            <label htmlFor="ip" className="label">Innings pitched</label>
            <input id="ip" className="field tabular-nums" inputMode="decimal" value={s.ip} onChange={(e) => set("ip", e.target.value)} />
            <p className="mt-1 text-xs subtle">.1 = one out, .2 = two outs</p>
          </div>
        </div>
        <Segmented label="Game length" value={["9", "7"].includes(s.g) ? (s.g as "9") : ("custom" as "9")} onChange={(v) => set("g", v)}
          options={[{ id: "9", label: "9 innings (MLB, college)" }, { id: "7", label: "7 innings (softball, high school)" }, { id: "custom" as "9", label: "Other" }]} />
        {s.g === "custom" && <Field id="custom" label="Innings per game" value={s.custom} onChange={(v) => set("custom", v)} min={1} />}
        <div>
          <span className="label">Optional: for WHIP and rate stats</span>
          <div className="grid grid-cols-3 gap-3">
            <Field id="h" label="Hits" value={s.h} onChange={(v) => set("h", v)} min={0} inputMode="numeric" />
            <Field id="bb" label="Walks" value={s.bb} onChange={(v) => set("bb", v)} min={0} inputMode="numeric" />
            <Field id="k" label="Strikeouts" value={s.k} onChange={(v) => set("k", v)} min={0} inputMode="numeric" />
          </div>
        </div>
      </form>
      <ResultCard error={error} label={`Earned run average (${gl}-inning games)`} value={r2(era)}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {gl !== 9 && <Stat k="9-inning ERA" v={ip ? r2((9 * er) / ip) : "—"} />}
          <Stat k="Outs recorded" v={outs.toLocaleString()} />
          {s.h !== "" && s.bb !== "" && <Stat k="WHIP" v={ip ? r2((h + bb) / ip) : "—"} />}
          {s.k !== "" && <Stat k={`K/${gl}`} v={ip ? r2((gl * k) / ip) : "—"} />}
          {s.bb !== "" && <Stat k={`BB/${gl}`} v={ip ? r2((gl * bb) / ip) : "—"} />}
          {s.h !== "" && <Stat k={`H/${gl}`} v={ip ? r2((gl * h) / ip) : "—"} />}
          {s.k !== "" && s.bb !== "" && <Stat k="K/BB" v={bb > 0 ? r2(k / bb) : "—"} />}
        </dl>
        {ip && <p className="mt-4 text-sm muted" data-testid="steps">ERA = {gl} × {er} ÷ {+ip.toFixed(4)} = {r2(era)}</p>}
      </ResultCard>
    </div>
  );
}
