import Link from "next/link";

/** Brief + competitor findings: docs/research/50-to-1-gas-oil-mix-calculator.md · research/50-to-1-gas-oil-mix-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the gas oil mix calculator</h2>
      <ol>
        <li>Pick the <strong>ratio</strong> your chainsaw, trimmer, blower or outboard needs (50:1 is the most common for modern handheld tools).</li>
        <li>Enter the <strong>amount of gas</strong> in US gallons or liters to get the oil in fluid ounces, milliliters and tablespoons.</li>
        <li>Or switch to <strong>Gas for my oil bottle</strong> to see how much gas a pre-measured oil bottle is meant for.</li>
      </ol>

      <h2 id="formula">Gas oil mix formula</h2>
      <div className="formula">Oil (fl oz) = gallons of gas × 128 ÷ ratio · Oil (mL) = liters of gas × 1,000 ÷ ratio<br />Gas = oil × ratio</div>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>1 gallon at 50:1</strong>: 128 ÷ 50 = <strong>2.56 fl oz</strong> (75.7 mL).</li>
        <li><strong>2.5 gallons at 50:1</strong>: 2.5 × 128 ÷ 50 = <strong>6.4 fl oz</strong>.</li>
        <li><strong>5 liters at 50:1</strong>: 5,000 ÷ 50 = <strong>100 mL</strong>.</li>
        <li><strong>1 gallon at 40:1</strong>: 128 ÷ 40 = <strong>3.2 fl oz</strong>.</li>
      </ul>

      <h2 id="ratios">Common ratios</h2>
      <table>
        <thead><tr><th>Ratio</th><th>Oil %</th><th>Oil per gallon</th><th>Oil per liter</th></tr></thead>
        <tbody>{[25, 32, 40, 50, 100].map((r) => <tr key={r}><td>{r}:1</td><td>{(100 / r).toFixed(1)}%</td><td>{(128 / r).toFixed(2)} fl oz</td><td>{(1000 / r).toFixed(0)} mL</td></tr>)}</tbody>
      </table>

      <h2 id="tips">Mixing tips</h2>
      <ul>
        <li><strong>Use 2-stroke (2-cycle) oil</strong>, not car engine oil.</li>
        <li><strong>Measure accurately</strong> with a graduated mixing bottle; fluid ounces are volume, not weight.</li>
        <li><strong>Label the can</strong> with the ratio and date so it doesn&apos;t end up in a 4-stroke mower.</li>
      </ul>
      <p>The mix is a simple ratio; see the <Link href="/ratio-calculator/">ratio calculator</Link> or <Link href="/proportion-calculator/">proportion calculator</Link> for other mixtures, and the <Link href="/volume-calculator/">volume calculator</Link> for tank capacities. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
