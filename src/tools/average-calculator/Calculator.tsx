"use client";
import type { ReactNode } from "react";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { parseNumbers, summarize } from "@/lib/descriptive";
import { fmtTime, geometricMean, harmonicMean, parseTimes } from "@/lib/average";

const fmt = (x: number) => (Number.isFinite(x) ? String(Number(x.toPrecision(10))) : "–");

function parsePairs(text: string) {
  const rows: { p: number; n: number }[] = [], bad: string[] = [];
  for (const line of text.split(/\n|;/).map((l) => l.trim()).filter(Boolean)) {
    const nums = line.replace(/%/g, " ").split(/[\s,]+|of|out/i).filter(Boolean).map(Number);
    if (nums.length >= 2 && nums.slice(0, 2).every(Number.isFinite) && nums[1] > 0) rows.push({ p: nums[0], n: nums[1] });
    else if (nums.length === 1 && Number.isFinite(nums[0])) rows.push({ p: nums[0], n: 1 });
    else bad.push(line);
  }
  return { rows, bad };
}

export default function AverageCalculator() {
  const [s, set] = useUrlState({ mode: "num", nums: "4, 8, 15, 16, 23, 42", pcts: "80% of 50\n90% of 10", times: "5:30, 6:15, 5:58, 6:02" });
  const mode = s.mode === "pct" ? "pct" : s.mode === "time" ? "time" : "num";
  let body: ReactNode = null, value: ReactNode = "–", label = "Average (mean)", err: string | null = null;

  if (mode === "num") {
    const { nums, bad } = parseNumbers(s.nums);
    const sm = summarize(nums);
    err = bad.length ? `Couldn't read: ${bad.slice(0, 3).join(", ")}` : !sm ? "Enter at least one number." : null;
    if (sm && !err) {
      value = <span data-testid="mean">{fmt(sm.mean)}</span>;
      const g = geometricMean(nums), h = harmonicMean(nums);
      body = <>
        <p className="mt-1 text-sm muted" data-testid="steps">Sum {fmt(sm.sum)} ÷ count {sm.n} = {fmt(sm.mean)}</p>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat k="Median" v={<span data-testid="median">{fmt(sm.median)}</span>} />
          <Stat k="Mode" v={<span data-testid="mode">{sm.modes.length ? sm.modes.map(fmt).join(", ") : "none"}</span>} />
          <Stat k="Range" v={fmt(sm.range)} />
          <Stat k="Sum" v={fmt(sm.sum)} />
          <Stat k="Count" v={sm.n} />
          <Stat k="Min / max" v={`${fmt(sm.min)} / ${fmt(sm.max)}`} />
          <Stat k="Geometric mean" v={Number.isFinite(g) ? fmt(g) : "needs all > 0"} />
          <Stat k="Harmonic mean" v={Number.isFinite(h) ? fmt(h) : "needs all > 0"} />
          <Stat k="Std. deviation (sample)" v={sm.n > 1 ? fmt(sm.sdSample) : "–"} />
        </dl>
        <p className="mt-3 text-xs subtle">Sorted: {[...nums].sort((a, b) => a - b).slice(0, 40).map(fmt).join(", ")}{nums.length > 40 ? " …" : ""}</p>
      </>;
    }
  } else if (mode === "pct") {
    label = "Overall average percentage";
    const { rows, bad } = parsePairs(s.pcts);
    err = bad.length ? `Couldn't read: ${bad.slice(0, 2).join(" · ")}. Use lines like “80% of 50”.` : !rows.length ? "Enter at least one percentage." : null;
    if (!err) {
      const N = rows.reduce((a, r) => a + r.n, 0), W = rows.reduce((a, r) => a + r.p * r.n, 0) / N;
      const simple = rows.reduce((a, r) => a + r.p, 0) / rows.length;
      value = <span data-testid="weighted">{fmt(Math.round(W * 100) / 100)}%</span>;
      body = <>
        <p className="mt-1 text-sm muted" data-testid="steps">({rows.map((r) => `${fmt(r.p)}% × ${fmt(r.n)}`).join(" + ")}) ÷ {fmt(N)} = {fmt(Math.round(W * 100) / 100)}%</p>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Simple average of the percentages" v={<span data-testid="simple">{fmt(Math.round(simple * 100) / 100)}%</span>} />
          <Stat k="Total count" v={fmt(N)} />
        </dl>
        {Math.abs(simple - W) > 0.005 && <p className="mt-3 text-sm">The simple average ignores group sizes. When groups differ in size, the overall percentage is the size-weighted one ({fmt(Math.round(W * 100) / 100)}%).</p>}
      </>;
    }
  } else {
    label = "Average time";
    const { secs, bad } = parseTimes(s.times);
    err = bad.length ? `Couldn't read: ${bad.slice(0, 3).join(", ")}. Use h:mm:ss, mm:ss or seconds.` : !secs.length ? "Enter at least one time." : null;
    if (!err) {
      const sm = summarize(secs)!;
      value = <span data-testid="avg-time">{fmtTime(sm.mean)}</span>;
      body = <>
        <p className="mt-1 text-sm muted" data-testid="steps">Total {fmtTime(sm.sum)} ({fmt(sm.sum)} s) ÷ {sm.n} = {fmtTime(sm.mean)}</p>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Median" v={fmtTime(sm.median)} />
          <Stat k="Fastest / slowest" v={`${fmtTime(sm.min)} / ${fmtTime(sm.max)}`} />
          <Stat k="Total" v={fmtTime(sm.sum)} />
          <Stat k="Average in seconds" v={fmt(Math.round(sm.mean * 100) / 100)} />
        </dl>
      </>;
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Average calculator">
        <Segmented label="Average of" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "num", label: "Numbers" }, { id: "pct", label: "Percentages" }, { id: "time", label: "Times" }]} />
        {mode === "num" && <div>
          <label htmlFor="nums" className="label">Numbers (separate with commas, spaces or new lines)</label>
          <textarea id="nums" rows={6} className="field font-mono" value={s.nums} onChange={(e) => set("nums", e.target.value)} maxLength={20000} />
        </div>}
        {mode === "pct" && <div>
          <label htmlFor="pcts" className="label">One group per line: percentage and group size</label>
          <textarea id="pcts" rows={6} className="field font-mono" value={s.pcts} onChange={(e) => set("pcts", e.target.value)} maxLength={5000} />
          <p className="mt-1 text-xs subtle">For example “80% of 50” or “80, 50”. Leave out the size to give every line equal weight.</p>
        </div>}
        {mode === "time" && <div>
          <label htmlFor="times" className="label">Times (h:mm:ss, mm:ss or seconds)</label>
          <textarea id="times" rows={6} className="field font-mono" value={s.times} onChange={(e) => set("times", e.target.value)} maxLength={5000} />
          <p className="mt-1 text-xs subtle">Lap times, race times, call lengths, paces per mile…</p>
        </div>}
      </form>
      <ResultCard error={err} label={label} value={err ? "–" : value}>{!err && body}</ResultCard>
    </div>
  );
}
