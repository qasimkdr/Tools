import Link from "next/link";

/** Brief + competitor findings: docs/research/cement-block-calculator.md · research/cement-block-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the cement block calculator</h2>
      <ol>
        <li>Enter the wall&apos;s length and height in feet.</li>
        <li>Choose the block size. Most walls use standard blocks with a 16 × 8 inch face (8x8x16, or 6-, 4- and 12-inch-thick versions).</li>
        <li>Subtract the area of doors and windows, add an allowance for cuts and breakage, and set your mortar coverage.</li>
        <li>Read the blocks to buy, the number of courses and blocks per course, and the mortar bags.</li>
      </ol>

      <h2 id="formulas">Block wall formulas</h2>
      <div className="formula">Wall area (sq ft) = length × height − openings<br />Blocks = wall area ÷ block face area (16 × 8 in = 0.889 sq ft, so 1.125 blocks per sq ft)<br />Blocks to buy = blocks × (1 + waste %)<br />Courses = height (in) ÷ block height (in) · Blocks per course = length (in) ÷ block length (in)</div>
      <p><strong>Nominal vs actual size:</strong> an &quot;8x8x16&quot; block actually measures 7⅝ × 7⅝ × 15⅝ inches. The missing ⅜ inch is the mortar joint, so nominal sizes give the right count without adding mortar separately.</p>

      <h2 id="example">Worked example</h2>
      <p>A wall <strong>40 ft long and 6 ft high</strong> with standard 8x8x16 blocks and 5% extra:</p>
      <ul>
        <li>Area = 40 × 6 = 240 sq ft. Blocks = 240 × 1.125 = <strong>270</strong>.</li>
        <li>Check by courses: 72 in ÷ 8 = 9 courses; 480 in ÷ 16 = 30 blocks per course; 9 × 30 = 270.</li>
        <li>With 5% extra: 270 × 1.05 = 283.5, so buy <strong>284 blocks</strong>.</li>
        <li>Mortar at about 3 bags per 100 blocks: 284 × 3 ÷ 100 = 8.5, so <strong>9 bags</strong> (80 lb).</li>
      </ul>

      <h2 id="tips">Planning tips</h2>
      <ul>
        <li><strong>Design to the module:</strong> lengths in multiples of 16 inches (8 inches with half blocks) and heights in multiples of 8 inches mean fewer cuts.</li>
        <li><strong>Corners and ends</strong> often use corner or half blocks; the waste allowance covers some of these, but count special blocks separately for a large job.</li>
        <li><strong>Filled cores and rebar</strong> need grout or concrete; work out the volume with the <Link href="/cubic-yard-calculator/">cubic yard calculator</Link>.</li>
        <li><strong>Footings and codes:</strong> a block wall needs a proper footing, and retaining walls or walls over a few feet high may need engineering and a permit. Check local building codes.</li>
      </ul>
      <p>Pour the footing with the <Link href="/concrete-calculator/">concrete calculator</Link>, measure the wall area with the <Link href="/square-footage-calculator/">square footage calculator</Link>, or order sand for mortar with the <Link href="/sand-calculator/">sand calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
