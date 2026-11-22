import Link from "next/link";

/** Brief + competitor findings: docs/research/asphalt-calculator.md · research/asphalt-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the asphalt calculator</h2>
      <ol>
        <li><strong>Enter the area</strong> as a rectangle, a circle or a known square footage. Measuring an L-shaped driveway? Split it into rectangles and add them up, or total the area first with the <Link href="/square-footage-calculator/">square footage calculator</Link>.</li>
        <li><strong>Enter the compacted thickness</strong>, usually 2–3 inches for a driveway.</li>
        <li><strong>Keep or adjust the density</strong> (145 lb/ft³ is typical for hot mix), the extra percentage and the bitumen content, and add a price per ton for a cost estimate.</li>
      </ol>

      <h2 id="formula">Asphalt tonnage formula</h2>
      <div className="formula">Volume (ft³) = length × width × thickness (ft) × (1 + extra %)<br />Weight (lb) = volume × density (≈ 145 lb/ft³)<br />Tons = pounds ÷ 2,000  ·  Tonnes = kg ÷ 1,000<br />Bitumen binder = mix weight × binder content %</div>

      <h2 id="example">Example: a 12 × 50 ft driveway, 3 inches thick</h2>
      <div className="formula">12 × 50 = 600 sq ft  ·  3 in = 0.25 ft  →  150 ft³<br />+5% extra = 157.5 ft³ × 145 lb/ft³ = 22,838 lb<br />22,838 ÷ 2,000 = 11.42 US tons  (10.36 metric tonnes)<br />Bitumen at 5.5%: 0.0550 × 22,838 = 1,256 lb of binder</div>
      <p>Asphalt is priced per ton and follows oil prices and local plant costs, so ask a nearby supplier for a per-ton price and enter it above. Delivery, base preparation and labor are extra.</p>

      <h2 id="coverage">Coverage per ton</h2>
      <table>
        <thead><tr><th>Compacted thickness</th><th>Sq ft per ton (145 lb/ft³)</th><th>Tons per 1,000 sq ft</th></tr></thead>
        <tbody>
          <tr><td>1.5 in</td><td>110</td><td>9.1</td></tr>
          <tr><td>2 in</td><td>83</td><td>12.1</td></tr>
          <tr><td>3 in</td><td>55</td><td>18.1</td></tr>
          <tr><td>4 in</td><td>41</td><td>24.2</td></tr>
        </tbody>
      </table>

      <h2 id="bitumen">Asphalt vs bitumen</h2>
      <p>In the US, &quot;asphalt&quot; usually means the finished paving mix: roughly 95% crushed stone, sand and filler held together by about 5% <strong>bitumen</strong> (also called asphalt binder or asphalt cement). Elsewhere, &quot;asphalt&quot; or &quot;bitumen&quot; may refer to the binder itself. Road specifications state the binder content as a percentage of the total mix weight, which is what the bitumen field uses. For spray applications such as prime and tack coats, quantities are worked out per square meter from a spray rate instead.</p>

      <h2 id="base">Don&apos;t forget the base</h2>
      <ul>
        <li><strong>Gravel base:</strong> driveways commonly sit on 4–8 inches of compacted crushed stone under the asphalt. Estimate it in tons with the <Link href="/gravel-and-stone-calculator/">gravel and stone calculator</Link>.</li>
        <li><strong>Excavation:</strong> work out how much soil comes out in cubic yards with the <Link href="/cubic-yard-calculator/">cubic yard calculator</Link>.</li>
        <li><strong>Drainage:</strong> a slight slope (commonly around 2%) keeps water off the surface and extends its life.</li>
      </ul>

      <h2 id="tips">Tips for ordering</h2>
      <ul>
        <li><strong>Think in compacted thickness:</strong> loose asphalt shrinks as it&apos;s rolled, so it&apos;s placed thicker to finish at the target depth. Quantities by weight already account for this.</li>
        <li><strong>Use your supplier&apos;s density</strong> if they give one; mixes range from about 140 to 150 lb/ft³.</li>
        <li><strong>Hot mix cools fast:</strong> plan for the whole job to be laid and compacted in one go.</li>
      </ul>
      <p className="text-sm">Estimates only; check quantities and specifications with your contractor or supplier. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
