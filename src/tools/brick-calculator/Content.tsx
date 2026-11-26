import Link from "next/link";

/** Brief + competitor findings: docs/research/brick-calculator.md · research/brick-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the brick calculator</h2>
      <ol>
        <li>Choose feet or metres, and enter the wall length and height.</li>
        <li>Enter the number and size of doors or windows to leave out.</li>
        <li>Pick a brick size (or enter a custom one), the mortar joint and the waste allowance. Add a price per brick and your mortar bag&apos;s yield for cost and bags.</li>
      </ol>

      <h2 id="formulas">Brick formulas</h2>
      <div className="formula">Bricks per sq ft = 144 ÷ ((brick length + joint) × (brick height + joint)), in inches<br />Bricks = (wall area − openings) × bricks per sq ft × (1 + waste %)<br />Mortar per brick = (length + joint) × (height + joint) × depth − length × height × depth</div>

      <h2 id="example">Worked example</h2>
      <p>A 20 × 8 ft wall with one 3 × 4 ft window, US modular bricks (7⅝ × 2¼ × 3⅝ in) and ⅜-inch joints:</p>
      <ul>
        <li>Area = 160 − 12 = <strong>148 sq ft</strong>.</li>
        <li>Each brick with its joint covers 8 × 2.625 = 21 sq in, so 144 ÷ 21 = <strong>6.86 bricks per sq ft</strong>.</li>
        <li>Bricks = 148 × 6.86 = 1,015; with 5% extra, <strong>1,066 bricks</strong>.</li>
        <li>Mortar = (8 × 2.625 × 3.625) − (7.625 × 2.25 × 3.625) = 13.9 cu in per brick, about <strong>8.2 cu ft</strong> for the wall.</li>
      </ul>

      <h2 id="sizes">Common brick sizes</h2>
      <table>
        <thead><tr><th>Brick</th><th>Size (L × H × D)</th><th>Joint</th><th>Per sq ft / m²</th></tr></thead>
        <tbody>
          <tr><td>US modular</td><td>7⅝ × 2¼ × 3⅝ in</td><td>⅜ in</td><td>6.86 / sq ft</td></tr>
          <tr><td>US standard</td><td>8 × 2¼ × 3⅝ in</td><td>⅜ in</td><td>6.55 / sq ft</td></tr>
          <tr><td>US utility</td><td>11⅝ × 3⅝ × 3⅝ in</td><td>⅜ in</td><td>3.00 / sq ft</td></tr>
          <tr><td>UK / metric standard</td><td>215 × 65 × 102.5 mm</td><td>10 mm</td><td>59.3 / m²</td></tr>
        </tbody>
      </table>
      <p>Brick sizes vary by manufacturer and region; check the product sheet and use the custom size option for anything else.</p>

      <h2 id="tips">Estimating tips</h2>
      <ul>
        <li>Measure each wall separately and add them; gable ends are triangles (½ × base × height).</li>
        <li>Openings save bricks, but lintels and sills above and below them add cutting, so keep the waste allowance.</li>
        <li>Brick color varies between batches: order everything at once, with a few spares for later repairs.</li>
        <li>Mortar strength type (such as N or S) depends on the job and local code; the quantity is the same either way.</li>
      </ul>
      <p>Estimate concrete block walls with the <Link href="/cement-block-calculator/">cement block calculator</Link>, footings with the <Link href="/concrete-calculator/">concrete calculator</Link>, wall area with the <Link href="/square-footage-calculator/">square footage calculator</Link>, or sand for mortar with the <Link href="/sand-calculator/">sand calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
