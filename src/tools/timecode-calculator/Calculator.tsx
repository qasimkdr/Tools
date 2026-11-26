"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { RATES, fmtClock, fmtTC, fromFrames, parseTC, rateById, seconds, toFrames, validTC, type Rate } from "@/lib/timecode";

const n0 = (x: number) => x.toLocaleString("en-US");

/** One line explaining how a timecode becomes a frame count. */
function explainTC(src: string, r: Rate) {
  const tc = parseTC(src);
  if (!tc) return "";
  const nd = (tc.h * 3600 + tc.m * 60 + tc.s) * r.base + tc.f;
  const base = `${fmtTC(tc, r)} = (${tc.h} × 3,600 + ${tc.m} × 60 + ${tc.s}) × ${r.base} + ${tc.f} = ${n0(nd)} frames`;
  if (!r.drop) return base;
  const mins = tc.h * 60 + tc.m, skipped = r.drop * (mins - Math.floor(mins / 10));
  return `${base}, minus ${r.drop} × (${mins} − ${Math.floor(mins / 10)}) = ${n0(skipped)} skipped numbers → ${n0(nd - skipped)} frames`;
}

/** Lines explaining how a frame count becomes a timecode. */
function explainFrames(frames: number, r: Rate) {
  const out: string[] = [];
  let n = Math.abs(frames);
  if (r.drop) {
    const per10 = r.base * 600 - r.drop * 9, perMin = r.base * 60 - r.drop;
    const d = Math.floor(n / per10), m = n % per10;
    const add = r.drop * 9 * d + (m > r.drop ? r.drop * Math.floor((m - r.drop) / perMin) : 0);
    out.push(`Drop-frame: add back the skipped numbers. ${n0(n)} frames = ${d} ten-minute block${d === 1 ? "" : "s"} of ${n0(per10)} + ${n0(m)}; skipped = ${n0(add)}, so count ${n0(n + add)} as nominal frames.`);
    n += add;
  }
  const secs = Math.floor(n / r.base), f = n % r.base;
  out.push(`${n0(n)} ÷ ${r.base} = ${n0(secs)} s remainder ${f} frames; ${n0(secs)} s = ${Math.floor(secs / 3600)} h ${Math.floor(secs / 60) % 60} min ${secs % 60} s.`);
  return out;
}

export default function TimecodeCalculator() {
  const [s, set] = useUrlState({ mode: "add", rate: "29.97df", a: "00:59:59;29", b: "00:00:00;01", op: "+", tc: "01:00:00;00", fr: "107892" });
  const r = rateById(s.rate);
  const mode = ["add", "tc", "frames"].includes(s.mode) ? s.mode : "add";
  let err: string | null = null, frames = 0, label = "";

  const read = (src: string, name: string) => {
    const tc = parseTC(src);
    if (!tc) { err = `${name}: use HH:MM:SS:FF (for example 01:02:03:04).`; return 0; }
    const v = validTC(tc, r);
    if (v) { err = `${name}: ${v}`; return 0; }
    return toFrames(tc, r);
  };
  if (mode === "add") {
    const a = read(s.a, "Timecode A"), b = err ? 0 : read(s.b, "Timecode B");
    frames = s.op === "-" ? a - b : a + b; label = s.op === "-" ? "A − B" : "A + B";
  } else if (mode === "tc") { frames = read(s.tc, "Timecode"); label = "Timecode"; }
  else { const n = Number(String(s.fr).replace(/[,\s]/g, "")); if (!Number.isInteger(n)) err = "Enter a whole number of frames."; else frames = n; label = "Timecode"; }
  const tc = fromFrames(frames, r);
  const sec = seconds(frames, r);
  const nominalSec = frames / r.base;
  const steps: string[] = err ? [] : mode === "add"
    ? [explainTC(s.a, r), explainTC(s.b, r), `A ${s.op === "-" ? "−" : "+"} B = ${n0(frames)} frames`, ...explainFrames(frames, r), `Result: ${fmtTC(tc, r)}`]
    : mode === "tc"
      ? [explainTC(s.tc, r), `Real time = ${n0(frames)} ÷ ${r.fps.toFixed(5).replace(/\.?0+$/, "")} fps = ${fmtClock(sec)}`]
      : [...explainFrames(frames, r), `Result: ${fmtTC(tc, r)}; real time = ${n0(frames)} ÷ ${r.fps.toFixed(5).replace(/\.?0+$/, "")} fps = ${fmtClock(sec)}`];

  const tcInput = (id: "a" | "b" | "tc", lab: string) => (
    <div><label htmlFor={id} className="label">{lab}</label><input id={id} className="field font-mono" value={s[id]} onChange={(e) => set(id, e.target.value)} spellCheck={false} autoComplete="off" inputMode="numeric" /></div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Timecode calculator">
        <Segmented label="Calculate" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "add", label: "Add / subtract" }, { id: "tc", label: "Timecode → frames" }, { id: "frames", label: "Frames → timecode" }]} />
        <div>
          <label htmlFor="rate" className="label">Frame rate (fps)</label>
          <select id="rate" className="field" value={r.id} onChange={(e) => set("rate", e.target.value)}>{RATES.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}</select>
        </div>
        {mode === "add" && <>
          {tcInput("a", "Timecode A")}
          <Segmented label="Operation" value={s.op === "-" ? "-" : "+"} onChange={(v) => set("op", v)} options={[{ id: "+", label: "Add (+)" }, { id: "-", label: "Subtract (−)" }]} />
          {tcInput("b", "Timecode B")}
        </>}
        {mode === "tc" && tcInput("tc", "Timecode")}
        {mode === "frames" && <div><label htmlFor="fr" className="label">Frame count</label><input id="fr" className="field font-mono" value={s.fr} onChange={(e) => set("fr", e.target.value)} inputMode="numeric" /></div>}
        <p className="text-xs subtle">Type HH:MM:SS:FF. Drop-frame codes are shown with a semicolon (;) before the frames; either separator is accepted.</p>
      </form>
      <ResultCard error={err} label={mode === "tc" ? "Total frames" : `${label} at ${r.label}`} value={err ? "–" : <span className="font-mono" data-testid="out">{mode === "tc" ? frames.toLocaleString("en-US") : fmtTC(tc, r)}</span>}>
        {!err && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            {mode !== "tc" && <Stat k="Total frames" v={<span data-testid="frames">{frames.toLocaleString("en-US")}</span>} />}
            {mode === "tc" && <Stat k="Timecode" v={<span className="font-mono">{fmtTC(tc, r)}</span>} />}
            <Stat k="Real time (h:m:s.ms)" v={<span className="font-mono" data-testid="real">{fmtClock(sec)}</span>} />
            <Stat k="Real seconds" v={sec.toLocaleString("en-US", { maximumFractionDigits: 3 })} />
            {r.fps !== r.base && <Stat k={`At exactly ${r.base} fps`} v={<span className="font-mono">{fmtClock(nominalSec)}</span>} />}
          </dl>
          <details className="mt-3" open>
            <summary className="cursor-pointer text-sm font-semibold">Step by step</summary>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm" data-testid="steps">{steps.map((x, i) => <li key={i}>{x}</li>)}</ol>
          </details>
          {r.fps !== r.base && <p className="mt-2 text-xs subtle">{r.label} runs at {r.fps.toFixed(3)} frames per second, so {r.drop ? "drop-frame numbering keeps the timecode close to clock time." : `non-drop timecode drifts about 3.6 seconds behind the clock every hour.`}</p>}
          {r.drop > 0 && <p className="mt-2 text-xs subtle">Drop-frame skips frame numbers {r.drop === 2 ? "00 and 01" : "00 to 03"} at the start of every minute except minutes 00, 10, 20, 30, 40 and 50. No actual frames are dropped.</p>}
        </>}
      </ResultCard>
    </div>
  );
}
