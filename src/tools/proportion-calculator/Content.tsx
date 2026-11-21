import Link from "next/link";

/** Brief + competitor findings: docs/research/proportion-calculator.md · research/proportion-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the proportion calculator</h2>
      <ol>
        <li><strong>Pick the type.</strong> Use <em>direct</em> when both quantities grow together (recipes, maps, unit prices). Use <em>inverse</em> when one grows as the other shrinks (workers and time, speed and travel time).</li>
        <li><strong>Enter three values and leave one box empty.</strong> The empty box is the unknown, x.</li>
        <li><strong>Read the answer and the steps.</strong> The calculator shows the cross-multiplication, so you can copy the working into homework or check your own.</li>
      </ol>
      <p>Fill in all four boxes to test whether two ratios form a proportion; the calculator compares the cross products for you.</p>

      <h2 id="formula">How proportions are solved</h2>
      <p>A proportion says two ratios are equal. Written as fractions, a/b = c/d. Multiplying both sides by b and d gives the cross-multiplication rule:</p>
      <div className="formula">a/b = c/d  ⟺  a × d = b × c<br />so  x = (product of the two known diagonal numbers) ÷ (the number next to x)</div>
      <p>For an <strong>inverse proportion</strong>, the product stays constant instead of the ratio:</p>
      <div className="formula">a × b = c × d  →  e.g. 4 workers × 6 days = 8 workers × x days</div>
      <p>This is the same idea as the &quot;rule of three&quot; taught in many countries: three known numbers determine the fourth.</p>

      <h2 id="examples">Worked examples</h2>
      <h3>Basic: 3/4 = x/8</h3>
      <p>Cross-multiply: 3 × 8 = 4 × x, so 24 = 4x and <strong>x = 6</strong>. Check: 6/8 simplifies to 3/4. ✓</p>
      <h3>Scaling a recipe</h3>
      <p>A recipe uses 2 cups of flour for 12 cookies. How much for 30 cookies? Set up 2/12 = x/30. Then 2 × 30 = 12x, so <strong>x = 5 cups</strong>.</p>
      <h3>Reading a map</h3>
      <p>On a 1:50,000 map, 3 cm on paper is 3 × 50,000 = 150,000 cm in reality, which is <strong>1.5 km</strong>. As a proportion: 1/50,000 = 3/x.</p>
      <h3>Inverse: more workers, fewer days</h3>
      <p>4 painters finish a job in 6 days. How long for 8 painters at the same pace? Total work is constant: 4 × 6 = 8 × x, so <strong>x = 3 days</strong>. Choose <em>Inverse</em> above to solve this kind of problem.</p>

      <h2 id="mistakes">Common mistakes to avoid</h2>
      <ul>
        <li><strong>Mismatched units or order.</strong> Keep the same quantity in the same position on both sides: flour over cookies = flour over cookies, never flour over cookies = cookies over flour.</li>
        <li><strong>Using direct proportion for an inverse situation.</strong> Ask whether doubling one quantity doubles or halves the other before you set it up.</li>
        <li><strong>Zero in a denominator.</strong> b and d can&apos;t be zero, because a fraction with a zero denominator is undefined.</li>
        <li><strong>Rounding too early.</strong> Keep full precision until the final answer; the calculator shows up to six decimal places.</li>
      </ul>

      <h2 id="ratios">Proportions vs ratios</h2>
      <p>A <strong>ratio</strong> compares two quantities (3:4). A <strong>proportion</strong> states that two ratios are equal (3:4 = 6:8). If you need to simplify a ratio, scale it, or split a total in a given ratio (such as sharing $100 in the ratio 2:3), use our <Link href="/ratio-calculator/">ratio calculator</Link>. It can also solve A:B = C:D written with colons.</p>
      <p>Proportions turn up everywhere: unit prices at the store, dosage per body weight, scale drawings, currency exchange and similar triangles in geometry. Browse more <Link href="/category/math/">math calculators</Link>, or see <Link href="/tools/">all calculators</Link>.</p>
    </>
  );
}
