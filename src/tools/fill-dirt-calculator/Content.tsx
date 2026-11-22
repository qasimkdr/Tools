import Link from "next/link";

/** Brief + competitor findings: docs/research/fill-dirt-calculator.md · research/fill-dirt-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the fill dirt calculator</h2>
      <ol>
        <li><strong>Enter the area</strong> to fill as a rectangle, a circle or a known square footage, and the average depth.</li>
        <li><strong>Set the compaction allowance</strong> (20% is a sensible default) and the soil type or your supplier&apos;s weight per yard.</li>
        <li><strong>Add your hauler&apos;s truck limit and a price</strong> to see truckloads and cost.</li>
      </ol>

      <h2 id="formula">Fill dirt formula</h2>
      <div className="formula">Volume (yd³) = length × width × depth (ft) ÷ 27<br />Order = volume × (1 + compaction allowance)<br />Tons = cubic yards × tons per cubic yard  ·  Truckloads = tons ÷ truck limit</div>

      <h2 id="example">Example: low area 20 × 30 ft, 6 inches deep</h2>
      <div className="formula">20 × 30 × 0.5 = 300 ft³ ÷ 27 = 11.1 yd³ in place<br />+20% compaction = 13.3 yd³ to order  ·  × 1.2 t/yd³ = 16 tons  ·  2 loads at 10 tons</div>
      <p>For a round hole 10 ft across and 3 ft deep: π × 5² × 3 = 235.6 ft³ = 8.7 yd³, about 10.5 yd³ with 20% for compaction.</p>

      <h2 id="weights">Fill dirt weight</h2>
      <table>
        <thead><tr><th>Condition</th><th>Pounds per yd³</th><th>Tons per yd³</th></tr></thead>
        <tbody>
          <tr><td>Dry fill dirt</td><td>2,000 – 2,700</td><td>1.0 – 1.35</td></tr>
          <tr><td>Wet fill dirt</td><td>3,000 – 3,500</td><td>1.5 – 1.75</td></tr>
          <tr><td>Clay or gravel-heavy, compacted</td><td>2,800 – 3,400</td><td>1.4 – 1.7</td></tr>
        </tbody>
      </table>
      <p>Typical ranges; your supplier&apos;s weight per yard is always better than an average.</p>

      <h2 id="compaction">Why compaction matters</h2>
      <p>Soil delivered loose takes up more room than the same soil compacted in the ground. The Federal Highway Administration&apos;s{" "}
        <a href="https://highways.fhwa.dot.gov/federal-lands/pddm/dpg/earthwork-design" rel="noopener" target="_blank">earthwork design guidance</a> describes shrink of roughly 10–25% for moderate soils and more for light soils on soft ground. Compact fill in layers of a few inches at a time with a plate compactor, and water lightly between layers.</p>

      <h2 id="related">Related materials</h2>
      <ul>
        <li><strong>Gravel base</strong> for drainage or a driveway: the <Link href="/gravel-and-stone-calculator/">gravel and stone calculator</Link>.</li>
        <li><strong>Sand</strong> for leveling or pavers: the <Link href="/sand-calculator/">sand calculator</Link>.</li>
        <li><strong>Just the volume</strong> for mulch or topsoil: the <Link href="/cubic-yard-calculator/">cubic yard calculator</Link>.</li>
        <li><strong>Pouring a slab</strong> on top: the <Link href="/concrete-calculator/">concrete calculator</Link>.</li>
      </ul>
      <p className="text-sm">Estimates only. Structural fill must meet your engineer&apos;s or local code requirements. More <Link href="/category/construction/">construction calculators</Link>.</p>
    </>
  );
}
