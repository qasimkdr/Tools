import Link from "next/link";

/** Brief + competitor findings: docs/research/dunk-calculator.md · research/dunk-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the dunk calculator</h2>
      <ol>
        <li><strong>Enter your height</strong>, and your measured standing reach if you know it (otherwise it&apos;s estimated).</li>
        <li><strong>Add your vertical jump</strong> to see how close you are, and choose the rim height.</li>
        <li><strong>Read the vertical needed</strong> to touch the rim and to dunk, and how many more inches you need.</li>
      </ol>

      <h2 id="formula">Dunk formula</h2>
      <div className="formula">Vertical to touch = rim height − standing reach<br />Vertical to dunk = rim height + clearance (≈ 6 in) − standing reach<br />Estimated standing reach ≈ 1.33 × height</div>

      <h2 id="table">Vertical needed by height (10 ft rim, estimated reach)</h2>
      <table>
        <thead><tr><th>Height</th><th>Est. standing reach</th><th>To touch rim</th><th>To dunk</th></tr></thead>
        <tbody>
          {[66, 69, 72, 75, 78].map((h) => { const r = h * 1.33; return (
            <tr key={h}><td>{Math.floor(h / 12)}′{h % 12}″</td><td>{r.toFixed(1)} in</td><td>{(120 - r).toFixed(1)} in</td><td>{(126 - r).toFixed(1)} in</td></tr>
          ); })}
        </tbody>
      </table>
      <p>Long arms help a lot: a measured reach just 3 inches above the estimate cuts the vertical you need by 3 inches.</p>

      <h2 id="example">Example</h2>
      <p>A 6′0″ player has an estimated reach of 95.8 inches. With a 26-inch vertical their max reach is 121.8 inches: enough to touch a 10-foot rim, but about 4.2 inches short of the 126 inches needed to dunk.</p>

      <h2 id="improve">How to jump higher</h2>
      <ul>
        <li><strong>Get stronger:</strong> squats, deadlifts and hip thrusts build the force behind a jump. Track lifts with the <Link href="/bench-press-max-calculator/">one-rep max calculator</Link>.</li>
        <li><strong>Train explosively:</strong> box jumps, depth jumps and bounding teach you to use that strength quickly.</li>
        <li><strong>Work on the approach:</strong> a fast, controlled two-step or one-foot takeoff adds inches over a standing jump.</li>
        <li><strong>Body composition:</strong> carrying more muscle and less fat helps; check your lean mass with the <Link href="/ffmi-calculator/">FFMI calculator</Link>.</li>
        <li><strong>Start with a smaller ball</strong> or a lower rim to practice the dunking motion safely.</li>
      </ul>
      <p>More game stats: score bowling with the <Link href="/bowling-score-calculator/">bowling score calculator</Link> or pitching with the <Link href="/earned-run-average-calculator/">ERA calculator</Link>. More <Link href="/category/education/">education and sports calculators</Link>.</p>
    </>
  );
}
