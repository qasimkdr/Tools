"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { handicap, bookAverage } from "@/lib/bowlingHandicap";
import { parseNumbers } from "@/lib/descriptive";

const PRESETS = [{ b: "220", p: "90" }, { b: "230", p: "80" }, { b: "210", p: "90" }, { b: "200", p: "100" }];

export default function BowlingHandicapCalculator() {
  const [s, set] = useUrlState({ src: "avg", avg: "165", pins: "2487", games: "15", basis: "220", pct: "90", series: "3", scores: "158, 172, 181", team: "165, 182, 140, 201" });
  const fromPins = s.src === "pins";
  const avg = fromPins ? bookAverage(Number(s.pins), Number(s.games)) : Math.floor(Number(s.avg));
  const basis = Number(s.basis), pct = Number(s.pct), series = Math.max(1, Math.round(Number(s.series) || 3));
  const err = !(avg >= 0) || (fromPins && !(Number(s.games) > 0)) ? (fromPins ? "Enter total pins and games bowled." : "Enter your average.") : !(basis > 0) ? "Enter the league basis score (e.g. 220)." : !(pct > 0 && pct <= 100) ? "Enter the handicap percentage (e.g. 90)." : null;
  const h = err ? NaN : handicap(avg, basis, pct);
  const scores = parseNumbers(s.scores).nums.filter((x) => x >= 0 && x <= 300);
  const team = parseNumbers(s.team).nums.filter((x) => x >= 0 && x <= 300);
  const teamH = team.map((a) => handicap(a, basis, pct));
  const scratch = scores.reduce((a, b) => a + b, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Bowling handicap calculator">
        <Segmented label="My average" value={fromPins ? "pins" : "avg"} onChange={(v) => set("src", v)} options={[{ id: "avg", label: "I know it" }, { id: "pins", label: "Work it out from pins" }]} />
        {fromPins ? <div className="grid grid-cols-2 gap-3">
          <Field id="pins" label="Total pins (scratch)" value={s.pins} onChange={(v) => set("pins", v)} min={0} inputMode="numeric" />
          <Field id="games" label="Games bowled" value={s.games} onChange={(v) => set("games", v)} min={1} inputMode="numeric" />
        </div> : <Field id="avg" label="Your average" value={s.avg} onChange={(v) => set("avg", v)} min={0} hint="Fractions are dropped (165.8 counts as 165)" />}
        <div>
          <span className="label">Common league settings</span>
          <div className="flex flex-wrap gap-2">{PRESETS.map((p) => (
            <button key={p.b + p.p} type="button" className={`btn-ghost px-3 py-1.5 text-sm ${s.basis === p.b && s.pct === p.p ? "ring-2 ring-[var(--color-brand-500)]" : ""}`} onClick={() => { set("basis", p.b); set("pct", p.p); }}>{p.p}% of {p.b}</button>
          ))}</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field id="basis" label="Basis score" value={s.basis} onChange={(v) => set("basis", v)} min={0} inputMode="numeric" />
          <Field id="pct" label="Percentage" suffix="%" value={s.pct} onChange={(v) => set("pct", v)} min={0} />
          <Field id="series" label="Games per series" value={s.series} onChange={(v) => set("series", v)} min={1} inputMode="numeric" />
        </div>
        <div>
          <label htmlFor="scores" className="label">Tonight&apos;s scratch scores (optional)</label>
          <input id="scores" className="field" value={s.scores} onChange={(e) => set("scores", e.target.value)} />
        </div>
        <div>
          <label htmlFor="team" className="label">Team averages (optional)</label>
          <input id="team" className="field" value={s.team} onChange={(e) => set("team", e.target.value)} />
          <p className="mt-1 text-xs subtle">Each bowler&apos;s average, separated by commas.</p>
        </div>
      </form>
      <ResultCard error={err} label="Your handicap per game" value={err ? "–" : <span data-testid="hcp">{h} pins</span>}>
        {!err && <>
          <p className="mt-2 text-sm subtle">({basis} − {avg}) × {pct}% = {(Math.max(0, basis - avg) * pct / 100).toFixed(2).replace(/\.?0+$/, "")} → {h} after dropping the fraction.</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Average used" v={<span data-testid="avg">{avg}</span>} />
            <Stat k={`Handicap for a ${series}-game series`} v={<span data-testid="series-hcp">{h * series}</span>} />
            {scores.length > 0 && <>
              <Stat k={`Scratch total (${scores.length} game${scores.length > 1 ? "s" : ""})`} v={scratch} />
              <Stat k="Total with handicap" v={<span data-testid="hdcp-total">{scratch + h * scores.length}</span>} />
            </>}
          </dl>
          {scores.length > 0 && <table className="mt-3 w-full text-sm" data-testid="games-table">
            <thead><tr className="text-left subtle"><th className="py-1">Game</th><th>Scratch</th><th>Handicap</th><th>With handicap</th></tr></thead>
            <tbody>{scores.map((g, i) => <tr key={i} className="border-t border-[var(--border)]"><td className="py-1">{i + 1}</td><td>{g}</td><td>+{h}</td><td>{g + h}</td></tr>)}</tbody>
          </table>}
          {team.length > 0 && <>
            <h2 className="mt-5 text-sm font-semibold">Team handicap</h2>
            <table className="mt-2 w-full text-sm" data-testid="team-table">
              <thead><tr className="text-left subtle"><th className="py-1">Bowler</th><th>Average</th><th>Handicap</th></tr></thead>
              <tbody>{team.map((a, i) => <tr key={i} className="border-t border-[var(--border)]"><td className="py-1">{i + 1}</td><td>{Math.floor(a)}</td><td>{teamH[i]}</td></tr>)}</tbody>
              <tfoot><tr className="border-t border-[var(--border)] font-semibold"><td className="py-1">Team</td><td>{team.reduce((x, a) => x + Math.floor(a), 0)}</td><td data-testid="team-hcp">{teamH.reduce((x, a) => x + a, 0)} per game</td></tr></tfoot>
            </table>
          </>}
          <p className="mt-3 text-xs subtle">Leagues set their own basis, percentage, rounding and maximum handicap. Follow your league&apos;s rules if they differ.</p>
        </>}
      </ResultCard>
    </div>
  );
}
