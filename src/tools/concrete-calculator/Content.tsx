import Link from "next/link";

/** Brief + competitor findings: docs/research/concrete-calculator.md · research/concrete-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the concrete calculator</h2>
      <ol>
        <li><strong>Pick the shape</strong>: a slab, footing or wall; a round post hole or column; or a set of steps.</li>
        <li><strong>Enter the dimensions</strong> in any mix of inches, feet, yards, meters or centimeters, and how many you&apos;re pouring.</li>
        <li><strong>Read the result</strong> in cubic yards, cubic feet and cubic meters, plus the number of 40, 60 and 80 lb bags and an optional cost.</li>
      </ol>

      <h2 id="formula">Concrete volume formulas</h2>
      <div className="formula">Slab, footing or wall: V = length × width × thickness<br />Round hole or column: V = π × (diameter ÷ 2)² × depth<br />Steps (solid): V = width × rise × run × n(n + 1) ÷ 2<br />Cubic yards = cubic feet ÷ 27  ·  Bags = cubic feet ÷ bag yield</div>

      <h2 id="examples">Worked examples</h2>
      <h3>A 10 × 10 ft patio, 4 inches thick</h3>
      <div className="formula">10 × 10 × (4 ÷ 12) = 33.3 ft³  →  +5% = 35.0 ft³ = 1.30 yd³<br />80 lb bags: 35.0 ÷ 0.60 = 58.3 → 59 bags  ·  60 lb: 78  ·  40 lb: 117</div>
      <h3>Four 12-inch round columns, 4 ft tall</h3>
      <p>Each is π × 0.5² × 4 = 3.14 ft³, so four take 12.6 ft³ (0.47 yd³) before extra, about 21 bags of 80 lb.</p>
      <h3>Four steps, 7 in rise, 11 in run, 4 ft wide</h3>
      <p>Solid steps stack: the bottom step is one rise high, the top one four rises high. 4 × (7/12) × (11/12) × (4 × 5 ÷ 2) = <strong>21.4 ft³</strong>, or 0.79 yd³.</p>

      <h2 id="bags">Bags per cubic yard</h2>
      <table>
        <thead><tr><th>Bag size</th><th>Yield per bag</th><th>Bags per cubic yard</th></tr></thead>
        <tbody>
          <tr><td>40 lb</td><td>0.30 ft³</td><td>90</td></tr>
          <tr><td>60 lb</td><td>0.45 ft³</td><td>60</td></tr>
          <tr><td>80 lb</td><td>0.60 ft³</td><td>45</td></tr>
        </tbody>
      </table>
      <p>Yields are from the Quikrete Concrete Mix (No. 1101) data sheet. Other brands and high-strength or fast-setting mixes can differ slightly, so check the bag.</p>

      <h2 id="thickness">Typical thicknesses</h2>
      <table>
        <thead><tr><th>Project</th><th>Common thickness</th><th>Yd³ per 100 sq ft</th></tr></thead>
        <tbody>
          <tr><td>Walkway, patio, shed base</td><td>4 in</td><td>1.23</td></tr>
          <tr><td>Driveway, garage floor</td><td>5–6 in</td><td>1.54 – 1.85</td></tr>
          <tr><td>Footing (varies by code and load)</td><td>8–12 in</td><td>2.47 – 3.70</td></tr>
        </tbody>
      </table>

      <h2 id="related">Before and after the pour</h2>
      <ul>
        <li><strong>Gravel base:</strong> slabs usually sit on a few inches of compacted gravel. Estimate it in tons with the <Link href="/gravel-and-stone-calculator/">gravel and stone calculator</Link>.</li>
        <li><strong>Digging out:</strong> work out the soil to remove with the <Link href="/cubic-yard-calculator/">cubic yard calculator</Link>.</li>
        <li><strong>Odd shapes:</strong> measure the area first with the <Link href="/square-footage-calculator/">square footage calculator</Link>, then multiply by the thickness. For round forms and tubes, the <Link href="/cylinder-volume-calculator/">cylinder volume calculator</Link> gives gallons and liters too.</li>
      </ul>

      <h2 id="tips">Tips</h2>
      <ul>
        <li><strong>Measure the forms, not the plan:</strong> actual depth often varies, so check the thickness in several spots.</li>
        <li><strong>Order a little extra:</strong> running out mid-pour leaves a weak joint.</li>
        <li><strong>Cure slowly:</strong> keeping new concrete damp for the first several days helps it reach full strength.</li>
      </ul>
      <p className="text-sm">Estimates only. Follow local building codes and the manufacturer&apos;s instructions. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
