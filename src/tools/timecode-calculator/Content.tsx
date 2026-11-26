import Link from "next/link";

/** Brief + competitor findings: docs/research/timecode-calculator.md · research/timecode-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the timecode calculator</h2>
      <ol>
        <li>Pick the frame rate of your project, including drop-frame or non-drop for 29.97 and 59.94.</li>
        <li>Choose a mode: add or subtract two timecodes, convert a timecode to frames, or convert a frame count to timecode.</li>
        <li>Read the result as timecode, total frames and real clock time.</li>
      </ol>

      <h2 id="formulas">Timecode formulas</h2>
      <div className="formula">Frames (non-drop) = (h × 3,600 + m × 60 + s) × fps + f<br />Frames (drop-frame) = non-drop frames − d × (total minutes − ⌊total minutes ÷ 10⌋), d = 2 at 29.97, 4 at 59.94<br />Real time (seconds) = frames ÷ true frame rate (e.g. 30,000 ÷ 1,001 = 29.97003)<br />A ± B = to timecode(frames(A) ± frames(B))</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>Drop-frame rollover:</strong> 00:59:59;29 + 1 frame = <strong>01:00:00;00</strong> at 29.97 DF. One frame after 00:00:59;29 is 00:01:00;02, because ;00 and ;01 are skipped.</li>
        <li><strong>An hour of 29.97 DF</strong> is 108,000 − 108 = <strong>107,892 frames</strong> and lasts 59:59.996 of real time. An hour of 29.97 non-drop is 108,000 frames and lasts <strong>1:00:03.600</strong>.</li>
        <li><strong>PAL edit:</strong> 00:10:00:00 + 00:05:30:12 at 25 fps = <strong>00:15:30:12</strong> (23,262 frames).</li>
        <li><strong>Frame count:</strong> 25,015 frames at 60 fps = 00:06:56:55.</li>
      </ul>

      <h2 id="rates">Common frame rates</h2>
      <table>
        <thead><tr><th>Rate</th><th>True fps</th><th>Used for</th><th>Timecode</th></tr></thead>
        <tbody>
          <tr><td>23.976</td><td>24,000 ÷ 1,001</td><td>Film look for NTSC video and streaming</td><td>Non-drop</td></tr>
          <tr><td>24</td><td>24</td><td>Cinema</td><td>Non-drop</td></tr>
          <tr><td>25 / 50</td><td>25 / 50</td><td>PAL broadcast (Europe, much of Asia and Africa)</td><td>Non-drop</td></tr>
          <tr><td>29.97 / 59.94</td><td>30,000 ÷ 1,001 / 60,000 ÷ 1,001</td><td>NTSC broadcast (North America, Japan)</td><td>Drop-frame or non-drop</td></tr>
          <tr><td>30 / 60</td><td>30 / 60</td><td>Web, gaming, phone video</td><td>Non-drop</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Tips</h2>
      <ul>
        <li>Keep a whole project at one frame rate and timecode mode; mixing them causes sync drift.</li>
        <li>Broadcast deliverables in NTSC regions usually require drop-frame so program length matches the clock.</li>
        <li>23.976 has no drop-frame version, so its timecode runs about 3.6 seconds an hour behind real time.</li>
      </ul>
      <p>Add up working hours with the <Link href="/hours-calculator/">hours calculator</Link>, work out listening time at different speeds with the <Link href="/audiobook-speed-calculator/">audiobook speed calculator</Link>, size frames with the <Link href="/aspect-ratio-calculator/">aspect ratio calculator</Link>, or count days between dates with the <Link href="/date-difference-calculator/">date difference calculator</Link>. More <Link href="/category/time-date/">date and time calculators</Link>.</p>
    </>
  );
}
