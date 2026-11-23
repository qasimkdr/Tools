import Link from "next/link";

/** Brief + competitor findings: docs/research/pine-straw-calculator.md · research/pine-straw-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the pine straw calculator</h2>
      <ol>
        <li>Choose a <strong>rectangular bed</strong>, <strong>tree rings</strong> (round beds) or enter the <strong>total square feet</strong> of several beds.</li>
        <li>Enter how many square feet one bale covers (from the label or your supplier). 40 sq ft is a middle-of-the-road starting point.</li>
        <li>Set the extra for waste and the price per bale to get the number of bales and total cost.</li>
      </ol>

      <h2 id="formula">Pine straw formula</h2>
      <div className="formula">Bales = area ÷ coverage per bale × (1 + extra %), rounded up<br />Rectangle: area = length × width · Circle: area = π × (diameter ÷ 2)²</div>

      <h2 id="example">Worked example</h2>
      <p>A <strong>30 × 10 ft</strong> front bed is 300 sq ft. At 40 sq ft per bale: 300 ÷ 40 = 7.5 bales, plus 10% = 8.25, so buy <strong>9 bales</strong>. Add three 6 ft tree rings (84.8 sq ft) and you&apos;ll need about 3 more bales.</p>

      <h2 id="table">Bales needed by area</h2>
      <table>
        <thead><tr><th>Area</th><th>At 35 sq ft/bale</th><th>At 40 sq ft/bale</th><th>At 50 sq ft/bale</th></tr></thead>
        <tbody>
          {[100, 250, 500, 1000].map((a) => <tr key={a}><td>{a.toLocaleString("en-US")} sq ft</td>{[35, 40, 50].map((c) => <td key={c}>{Math.ceil((a / c) * 1.1 - 1e-9)}</td>)}</tr>)}
        </tbody>
      </table>
      <p className="text-sm subtle">Includes 10% extra.</p>

      <h2 id="tips">Spreading tips</h2>
      <ul>
        <li><strong>Weed and edge first</strong>, then fluff each bale apart before spreading.</li>
        <li><strong>Tuck the edges</strong> along borders for a neat line, and keep straw a few inches from tree trunks and plant stems.</li>
        <li><strong>On slopes</strong>, pine straw knits together and resists washing away better than many shredded mulches.</li>
      </ul>
      <p>Prefer bulk mulch or soil? The <Link href="/cubic-yard-calculator/">cubic yard calculator</Link> handles mulch by depth, and the <Link href="/fill-dirt-calculator/">fill dirt calculator</Link> covers soil. Measure odd-shaped beds with the <Link href="/square-footage-calculator/">square footage calculator</Link>. More <Link href="/category/construction/">home and garden calculators</Link>.</p>
    </>
  );
}
