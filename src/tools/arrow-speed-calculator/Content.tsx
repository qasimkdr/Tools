import Link from "next/link";

/** Brief + competitor findings: docs/research/arrow-speed-calculator.md · research/arrow-speed-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the arrow speed calculator</h2>
      <ol>
        <li>Enter your bow&apos;s <strong>IBO speed</strong> from the manufacturer&apos;s specifications.</li>
        <li>Enter your <strong>draw length</strong>, <strong>peak draw weight</strong> and the <strong>total weight of your finished arrow</strong> in grains.</li>
        <li>Read the estimated speed in fps, m/s and mph, plus kinetic energy, momentum and grains per pound.</li>
      </ol>

      <h2 id="formula">Arrow speed formulas</h2>
      <div className="formula">Speed ≈ IBO − 10 × (30 − draw length) − (arrow weight − 5 × draw weight) ÷ 3<br />Kinetic energy (ft·lb) = grains × fps² ÷ 450,240<br />Momentum (slug·ft/s) = grains × fps ÷ 225,400</div>
      <p>The arrow-weight term only applies when the arrow is heavier than 5 grains per pound of draw weight, the IBO test standard.</p>

      <h2 id="example">Worked example</h2>
      <p>A bow rated <strong>340 fps IBO</strong>, shot at <strong>28 in</strong> and <strong>60 lb</strong> with a <strong>400-grain</strong> arrow:</p>
      <ul>
        <li>Draw length: 2 in short of 30 → −20 fps</li>
        <li>Arrow weight: 400 − 5 × 60 = 100 gr over → −33.3 fps</li>
        <li>Estimated speed = 340 − 20 − 33.3 ≈ <strong>287 fps</strong> (87.4 m/s)</li>
        <li>Kinetic energy = 400 × 286.7² ÷ 450,240 ≈ <strong>73 ft·lb</strong>; momentum ≈ 0.509 slug·ft/s</li>
      </ul>

      <h2 id="ke">Kinetic energy guide</h2>
      <p>Easton&apos;s widely cited field guide suggests these minimum kinetic energies by game size. Check your local hunting regulations, which may set their own minimums.</p>
      <table>
        <thead><tr><th>Game</th><th>Kinetic energy</th></tr></thead>
        <tbody>
          <tr><td>Small game (rabbit, turkey)</td><td>under 25 ft·lb</td></tr>
          <tr><td>Medium game (deer, antelope)</td><td>25–41 ft·lb</td></tr>
          <tr><td>Large game (elk, black bear)</td><td>42–65 ft·lb</td></tr>
          <tr><td>Toughest game (cape buffalo, grizzly)</td><td>over 65 ft·lb</td></tr>
        </tbody>
      </table>
      <p>Arrows are projectiles, and so are basketball players: see how high you need to jump with the <Link href="/dunk-calculator/">dunk calculator</Link>. Shooting at altitude? Air density changes with the <Link href="/density-altitude-calculator/">density altitude</Link>. More <Link href="/category/science/">science and engineering calculators</Link>.</p>
    </>
  );
}
