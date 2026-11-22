import Link from "next/link";

/** Brief + competitor findings: docs/research/linear-feet-calculator.md · research/linear-feet-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the linear feet calculator</h2>
      <ul>
        <li><strong>Square feet:</strong> enter the area to cover and the material&apos;s coverage width (decking, flooring planks, siding) to convert to linear feet.</li>
        <li><strong>Pieces / lengths:</strong> list quantities and lengths in feet and inches to total a cut list.</li>
        <li><strong>Room perimeter:</strong> enter length and width, minus doorways, for trim, baseboard or crown molding.</li>
      </ul>
      <p>Then add waste, the stock length you&apos;ll buy and a price per linear foot.</p>

      <h2 id="formula">Linear feet formulas</h2>
      <div className="formula">From inches: linear feet = inches ÷ 12<br />From area: linear feet = square feet ÷ (material width in inches ÷ 12)<br />Perimeter: linear feet = 2 × (length + width) − openings<br />Pieces to buy = linear feet × (1 + waste) ÷ stock length</div>

      <h2 id="examples">Worked examples</h2>
      <table>
        <thead><tr><th>Project</th><th>Calculation</th><th>Linear feet</th></tr></thead>
        <tbody>
          <tr><td>200 sq ft deck, 5.5 in boards</td><td>200 ÷ 0.4583</td><td>436.4 (480 with 10%) → 31 × 16 ft boards</td></tr>
          <tr><td>Baseboard, 12 × 14 ft room, 3 ft door</td><td>2 × 26 − 3</td><td>49 (53.9 with 10%)</td></tr>
          <tr><td>4 pieces at 8 ft + 2 at 10 ft 6 in</td><td>32 + 21</td><td>53</td></tr>
          <tr><td>Fence, 3 sides of a 50 × 80 ft yard</td><td>50 + 80 + 50</td><td>180</td></tr>
        </tbody>
      </table>

      <h2 id="widths">Common coverage widths</h2>
      <table>
        <thead><tr><th>Material (nominal)</th><th>Typical coverage width</th><th>LF per 100 sq ft</th></tr></thead>
        <tbody>
          <tr><td>1×4 / 2×4</td><td>3.5 in</td><td>342.9</td></tr>
          <tr><td>5/4×6 or 2×6 deck board</td><td>5.5 in</td><td>218.2</td></tr>
          <tr><td>1×8 / 2×8</td><td>7.25 in</td><td>165.5</td></tr>
          <tr><td>Plank flooring, 5 in face</td><td>5 in</td><td>240</td></tr>
        </tbody>
      </table>
      <p>Coverage depends on gaps, tongue-and-groove overlap and siding exposure, so use the manufacturer&apos;s coverage figure where you can.</p>

      <h2 id="related">Related calculators</h2>
      <p>Pricing hardwood by volume instead of length? Use the <Link href="/board-foot-calculator/">board foot calculator</Link>. Measure the area first with the <Link href="/square-footage-calculator/">square footage calculator</Link>, count framing with the <Link href="/stud-calculator/">stud calculator</Link>, and add up fractional inches with the <Link href="/fraction-calculator/">fraction calculator</Link>. More <Link href="/category/construction/">construction calculators</Link>.</p>
    </>
  );
}
