import Link from "next/link";

/** Brief + competitor findings: docs/research/fence-post-depth-calculator.md · research/fence-post-depth-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the fence post depth calculator</h2>
      <ol>
        <li>Enter the <strong>fence height above ground</strong> and, if you know it, your <strong>local frost depth</strong>.</li>
        <li>Choose the <strong>one-third</strong> rule for standard fences or <strong>one-half</strong> for gate posts, tall fences and windy or loose soil.</li>
        <li>Pick the post size, gravel base and number of posts to get the hole size, post length to buy and bags of concrete.</li>
      </ol>

      <h2 id="formula">Fence post formulas</h2>
      <div className="formula">Burial depth = fence height × ⅓ (or ½), and at least the frost depth<br />Hole depth = burial depth + gravel base · Hole diameter = 3 × post width<br />Concrete = π × (hole ÷ 2)² × depth − post area × depth</div>

      <h2 id="example">Worked example: a 6 ft privacy fence</h2>
      <p>With <strong>4×4 posts</strong> and the one-third rule: bury 72 ÷ 3 = <strong>24 in</strong>, so buy <strong>8 ft posts</strong>. With a 6 in gravel base, dig each hole <strong>30 in deep</strong> and 3 × 3.5 = <strong>10½ in wide</strong>. Concrete per post: π × 5.25² × 24 − 3.5² × 24 = 1,784 in³ ≈ <strong>1.03 ft³</strong>, or two 80 lb bags.</p>

      <h2 id="table">Burial depth by fence height</h2>
      <table>
        <thead><tr><th>Fence height</th><th>⅓ rule</th><th>½ rule</th><th>Post length (⅓)</th></tr></thead>
        <tbody>
          {[3, 4, 5, 6, 8].map((h) => <tr key={h}><td>{h} ft</td><td>{Math.round((h * 12) / 3)} in</td><td>{(h * 12) / 2} in</td><td>{+(h + h / 3).toFixed(2)} ft</td></tr>)}
        </tbody>
      </table>

      <h2 id="tips">Tips for solid posts</h2>
      <ul>
        <li><strong>Call 811 before you dig</strong> (in the U.S.) so buried utility lines are marked.</li>
        <li><strong>Slope the concrete top</strong> away from the post so rain runs off instead of pooling.</li>
        <li><strong>Gate posts carry more load</strong>: go deeper and wider, and consider a larger post.</li>
        <li><strong>Check plumb</strong> on two sides and brace each post while the concrete cures.</li>
      </ul>
      <p>Mixing more concrete? Use the <Link href="/concrete-calculator/">concrete calculator</Link>. Add up fence runs with the <Link href="/linear-feet-calculator/">linear feet calculator</Link>, or price boards with the <Link href="/board-foot-calculator/">board foot calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
