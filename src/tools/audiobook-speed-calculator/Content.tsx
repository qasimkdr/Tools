import Link from "next/link";

/** Brief + competitor findings: docs/research/audiobook-speed-calculator.md · research/audiobook-speed-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the audiobook speed calculator</h2>
      <ol>
        <li>Enter the audiobook&apos;s length as listed in your app (that&apos;s the 1x length).</li>
        <li>Type a playback speed or tap a preset such as 1.5× or 2×.</li>
        <li>Optional: add how many minutes you listen per day to see how many days the book takes, or a time limit to find the speed you need.</li>
      </ol>

      <h2 id="formula">Formulas</h2>
      <div className="formula">Listening time = length ÷ speed<br />Time saved = length − length ÷ speed = length × (1 − 1 ÷ speed)<br />Speed needed = length ÷ time available<br />Days to finish = listening time ÷ minutes per day, rounded up</div>

      <h2 id="example">Worked example</h2>
      <p>A <strong>12 h 30 min</strong> audiobook at <strong>1.5×</strong>: 750 ÷ 1.5 = 500 minutes = <strong>8 h 20 min</strong>, saving 4 h 10 min. Listening 30 minutes a day, that&apos;s <strong>17 days</strong> instead of 25 at normal speed. To finish in 10 hours, you&apos;d need 750 ÷ 600 = <strong>1.25×</strong>.</p>

      <h2 id="table">Time saved at common speeds</h2>
      <table>
        <thead><tr><th>Speed</th><th>Time needed</th><th>Time saved</th><th>10-hour book</th></tr></thead>
        <tbody>
          {[1.25, 1.5, 1.75, 2, 2.5, 3].map((x) => (
            <tr key={x}><td>{x}×</td><td>{(100 / x).toFixed(0)}% of length</td><td>{(100 - 100 / x).toFixed(0)}%</td><td>{Math.floor(10 / x)} h {Math.round((10 / x - Math.floor(10 / x)) * 60)} min</td></tr>
          ))}
        </tbody>
      </table>

      <h2 id="tips">Tips for faster listening</h2>
      <ul>
        <li><strong>Step up gradually</strong>: 0.1× or 0.25× at a time gives your ear time to adjust.</li>
        <li><strong>Match speed to the book</strong>: lighter fiction and memoirs are easier at high speed than dense non-fiction.</li>
        <li><strong>Use smart speed features</strong>: some apps shorten silences, which saves time without making the voice faster.</li>
      </ul>
      <p>Planning a reading goal? Count the days with the <Link href="/days-from-today/">days from today calculator</Link> or add up listening sessions with the <Link href="/hours-calculator/">hours calculator</Link>. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
