import Link from "next/link";

/** Brief + competitor findings: docs/research/pool-salt-calculator.md · research/pool-salt-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the pool salt calculator</h2>
      <ol>
        <li><strong>Enter your pool volume</strong>, or choose the pool shape and enter its size to calculate it.</li>
        <li><strong>Enter the current salt reading</strong> from a test strip, meter or your generator&apos;s display (0 for a freshly filled pool).</li>
        <li><strong>Enter the target</strong> from your salt chlorine generator&apos;s manual (often around 3,200 ppm) and read the pounds, kilograms and bags to add.</li>
      </ol>

      <h2 id="formula">Pool salt formula</h2>
      <div className="formula">Salt (lb) = gallons × (target ppm − current ppm) × 8.34 ÷ 1,000,000<br />Salt (kg) = liters × (target ppm − current ppm) ÷ 1,000,000<br />Too salty: water to replace = volume × (1 − target ÷ current)</div>
      <p>The 8.34 comes from the weight of one gallon of water in pounds: 1 ppm is one part salt per million parts water by weight.</p>

      <h2 id="examples">Worked examples</h2>
      <table>
        <thead><tr><th>Pool</th><th>Change</th><th>Salt needed</th></tr></thead>
        <tbody>
          <tr><td>15,000 gal, topping up</td><td>2,500 → 3,200 ppm</td><td>87.6 lb (about 2¼ bags: buy 3 × 40 lb)</td></tr>
          <tr><td>15,000 gal, new fill</td><td>0 → 3,200 ppm</td><td>400.3 lb (11 × 40 lb bags)</td></tr>
          <tr><td>16 × 32 ft, 5 ft average (19,150 gal)</td><td>0 → 3,200 ppm</td><td>511 lb (13 bags)</td></tr>
          <tr><td>20,000 gal, too salty</td><td>4,000 → 3,200 ppm</td><td>Replace about 4,000 gal</td></tr>
        </tbody>
      </table>

      <h2 id="volume">Pool volume formulas</h2>
      <table>
        <thead><tr><th>Shape</th><th>Gallons</th></tr></thead>
        <tbody>
          <tr><td>Rectangle</td><td>length × width × average depth × 7.48</td></tr>
          <tr><td>Round</td><td>diameter × diameter × average depth × 5.9</td></tr>
          <tr><td>Oval</td><td>length × width × average depth × 5.9</td></tr>
        </tbody>
      </table>
      <p>All measurements in feet; 7.48 is the number of US gallons in a cubic foot. For tanks and round shapes in other units, the <Link href="/cylinder-volume-calculator/">cylinder volume calculator</Link> converts straight to gallons and liters. For a quick area of a deck or patio around the pool, use the <Link href="/square-footage-calculator/">square footage calculator</Link>.</p>

      <h2 id="levels">Salt levels at a glance</h2>
      <ul>
        <li><strong>Below your generator&apos;s range:</strong> it produces little or no chlorine and may show a low-salt warning.</li>
        <li><strong>In range (often about 2,700–3,400 ppm):</strong> normal chlorine production. Your manual has the exact numbers.</li>
        <li><strong>Above range:</strong> can trigger high-salt warnings and, over time, add to corrosion of metal fittings.</li>
        <li><strong>For comparison:</strong> seawater is about 35,000 ppm, roughly ten times saltier than a saltwater pool.</li>
      </ul>

      <h2 id="how">How to add salt</h2>
      <ol>
        <li>Test the water and check pH and alkalinity are in range.</li>
        <li>Turn the generator off (many manuals advise this while the salt dissolves) and keep the pump running.</li>
        <li>Pour the salt around the shallow end and brush it toward the main drain so it doesn&apos;t sit on the floor.</li>
        <li>Wait about 24 hours, retest, then switch the generator back on.</li>
      </ol>
      <p>Salt is lost only when water leaves the pool through splash-out, backwashing or draining, not through evaporation, so top-ups are usually small. More <Link href="/category/construction/">home calculators</Link>.</p>
    </>
  );
}
