import Link from "next/link";

/** Brief + competitor findings: docs/research/epoxy-resin-calculator.md · research/epoxy-resin-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the epoxy resin calculator</h2>
      <ol>
        <li>Choose a rectangular or round surface and enter its size.</li>
        <li>Enter the pour depth (1/8 in = 0.125 in for a typical flood coat) and, for river tables or inlays, the share of the area that gets epoxy.</li>
        <li>Pick your product&apos;s mix ratio and the extra to allow, plus kit size if you&apos;re buying kits.</li>
      </ol>

      <h2 id="formula">Epoxy volume formula</h2>
      <div className="formula">Volume (in³) = length × width × depth × fill share × (1 + extra)<br />US fl oz = in³ ÷ 1.805 · Gallons = in³ ÷ 231 · mL = in³ × 16.387<br />Resin = total × A ÷ (A + B) · Hardener = total × B ÷ (A + B)</div>

      <h2 id="example">Worked example: 48 × 24 in table top</h2>
      <p>At <strong>1/8 in</strong>: 48 × 24 × 0.125 = 144 in³ = <strong>79.8 fl oz</strong>. With 10% extra: <strong>87.8 fl oz</strong> (0.69 gallons, 2.6 liters). At a 1:1 ratio that&apos;s about 43.9 fl oz each of resin and hardener.</p>

      <h2 id="table">Epoxy per square foot by depth</h2>
      <table>
        <thead><tr><th>Depth</th><th>fl oz per sq ft</th><th>sq ft per gallon</th></tr></thead>
        <tbody>{[[1 / 16, "1/16 in"], [1 / 8, "1/8 in"], [1 / 4, "1/4 in"], [1 / 2, "1/2 in"], [1, "1 in"]].map(([d, l]) => <tr key={String(l)}><td>{l}</td><td>{(144 * Number(d) / 1.8046875).toFixed(1)}</td><td>{(231 / (144 * Number(d))).toFixed(1)}</td></tr>)}</tbody>
      </table>

      <h2 id="tips">Pouring tips</h2>
      <ul>
        <li><strong>Seal coat first</strong> on wood so air bubbles don&apos;t rise into the flood coat.</li>
        <li><strong>Measure precisely</strong> and mix for the time on the label, scraping the sides and bottom of the cup.</li>
        <li><strong>Work warm</strong>: most epoxies cure best around room temperature; cold epoxy is thick and bubbly.</li>
      </ul>
      <p>Odd-shaped molds? Find their volume with the <Link href="/volume-calculator/">volume calculator</Link>. Price the slab with the <Link href="/board-foot-calculator/">board foot calculator</Link>, or tile a surface instead with the <Link href="/tile-calculator/">tile calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
