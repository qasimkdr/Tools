import Link from "next/link";

/** Brief + competitor findings: docs/research/firewood-calculator.md · research/firewood-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the firewood calculator</h2>
      <ol>
        <li>Measure your stack&apos;s <strong>length</strong> and <strong>height</strong> in feet and the <strong>log length</strong> (the depth of the stack) in inches.</li>
        <li>Add the number of identical stacks if you have more than one.</li>
        <li>Read the volume in full cords and face cords. Add prices to see what the wood is worth, or to compare a face-cord price with a full-cord price.</li>
      </ol>

      <h2 id="formula">Firewood formulas</h2>
      <div className="formula">Volume (ft³) = length × height × (log length ÷ 12)<br />Full cords = volume ÷ 128<br />Face cords = (length × height) ÷ 32 · Face cord share of a cord = log length ÷ 48</div>

      <h2 id="example">Worked example</h2>
      <p>A stack <strong>16 ft long</strong> and <strong>4 ft high</strong> of <strong>16-inch logs</strong>: 16 × 4 × 1.333 = <strong>85.3 ft³</strong>, which is <strong>0.67 of a full cord</strong> or <strong>2 face cords</strong>. If a seller charges $120 per face cord, that&apos;s the same as $360 per full cord.</p>

      <h2 id="table">Face cord size by log length</h2>
      <table>
        <thead><tr><th>Log length</th><th>Face cord volume</th><th>Share of a full cord</th><th>Face cords per cord</th></tr></thead>
        <tbody>{[12, 16, 18, 20, 24].map((l) => <tr key={l}><td>{l} in</td><td>{(32 * l / 12).toFixed(1)} ft³</td><td>{(l / 48 * 100).toFixed(1)}%</td><td>{(48 / l).toFixed(2)}</td></tr>)}</tbody>
      </table>

      <h2 id="tips">Buying and stacking tips</h2>
      <ul>
        <li><strong>Buy by the cord</strong> or a stated fraction of one, and ask for the log length.</li>
        <li><strong>Check the stack</strong> on delivery: tightly stacked wood with small gaps measures fairly.</li>
        <li><strong>Season it</strong>: split wood stacked off the ground with the top covered dries faster and burns cleaner.</li>
      </ul>
      <p>Need volume in yards for mulch or soil? Use the <Link href="/cubic-yard-calculator/">cubic yard calculator</Link>. Buying lumber instead? The <Link href="/board-foot-calculator/">board foot calculator</Link> prices it, and the <Link href="/volume-calculator/">volume calculator</Link> handles other shapes. More <Link href="/category/construction/">home and garden calculators</Link>.</p>
    </>
  );
}
