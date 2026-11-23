import Link from "next/link";

/** Brief + competitor findings: docs/research/quarter-mile-calculator.md · research/quarter-mile-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the quarter mile calculator</h2>
      <ol>
        <li>Enter the <strong>race weight</strong> (car + driver) and the <strong>flywheel horsepower</strong> to estimate ET and trap speed.</li>
        <li>Or switch to <strong>Horsepower from time slip</strong> and enter your elapsed time and/or trap speed.</li>
        <li>Choose the formula constants: the common 5.825 / 234 set or Huntington&apos;s more conservative originals.</li>
      </ol>

      <h2 id="formula">Quarter-mile formulas</h2>
      <div className="formula">ET (s) = 5.825 × (weight ÷ hp)^(1/3)<br />Trap speed (mph) = 234 × (hp ÷ weight)^(1/3)<br />hp from ET = weight ÷ (ET ÷ 5.825)³ · hp from trap speed = weight × (mph ÷ 234)³</div>
      <p>These are empirical fits to real drag-strip results, popularized by Roger Huntington. His original constants were 6.290 for ET and 224 for trap speed.</p>

      <h2 id="example">Worked example</h2>
      <p>A <strong>3,500 lb</strong> car (with driver) making <strong>400 hp</strong> has 8.75 lb per hp. ET ≈ 5.825 × 8.75^(1/3) = <strong>12.00 s</strong>; trap speed ≈ 234 × (1/8.75)^(1/3) = <strong>113.6 mph</strong>. Going the other way, a time slip showing 113.6 mph at the same weight implies about <strong>400 hp</strong>.</p>

      <h2 id="table">ET by weight-to-power ratio</h2>
      <table>
        <thead><tr><th>lb per hp</th><th>ET (s)</th><th>Trap speed (mph)</th></tr></thead>
        <tbody>{[4, 6, 8, 10, 12, 15].map((r) => <tr key={r}><td>{r}</td><td>{(5.825 * Math.cbrt(r)).toFixed(2)}</td><td>{(234 * Math.cbrt(1 / r)).toFixed(1)}</td></tr>)}</tbody>
      </table>

      <h2 id="tips">Getting closer to the estimate</h2>
      <ul>
        <li><strong>Traction first</strong>: drag radials or slicks and a good launch cut ET more than small power gains.</li>
        <li><strong>Air matters</strong>: hot, humid or high-altitude air reduces power; see the <Link href="/density-altitude-calculator/">density altitude calculator</Link>.</li>
        <li><strong>Lose weight</strong>: ET improves with the cube root of weight-to-power, so removing weight helps as much as adding proportional power.</li>
      </ul>
      <p>Other physics tools: the <Link href="/arrow-speed-calculator/">arrow speed calculator</Link> and <Link href="/watts-to-amps-calculator/">watts to amps calculator</Link> (1 hp = 745.7 W). More <Link href="/category/science/">science and engineering calculators</Link>.</p>
    </>
  );
}
