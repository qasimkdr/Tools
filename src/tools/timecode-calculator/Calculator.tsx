"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { RATES, fmtClock, fmtTC, fromFrames, parseTC, rateById, seconds, toFrames, validTC } from "@/lib/timecode";

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
          {r.fps !== r.base && <p className="mt-2 text-xs subtle">{r.label} runs at {r.fps.toFixed(3)} frames per second, so {r.drop ? "drop-frame numbering keeps the timecode close to clock time." : `non-drop timecode drifts about 3.6 seconds behind the clock every hour.`}</p>}
          {r.drop > 0 && <p className="mt-2 text-xs subtle">Drop-frame skips frame numbers {r.drop === 2 ? "00 and 01" : "00 to 03"} at the start of every minute except minutes 00, 10, 20, 30, 40 and 50. No actual frames are dropped.</p>}
        </>}
      </ResultCard>
    </div>
  );
}
