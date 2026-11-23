import Link from "next/link";

/** Brief + competitor findings: docs/research/implicit-differentiation-calculator.md · research/implicit-differentiation-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the implicit differentiation calculator</h2>
      <ol>
        <li>Type an equation in <strong>x and y</strong>, such as <code>x^2 + y^2 = 25</code> or <code>sin(xy) = x</code>. If you leave out the equals sign, the expression is set equal to 0.</li>
        <li>Read <strong>dy/dx</strong> and the steps: both sides differentiated, the dy/dx terms collected, then the simplified result.</li>
        <li>Optionally enter a <strong>point</strong> to get the slope, the second derivative, and the tangent and normal lines there. The calculator warns you if the point isn&apos;t on the curve.</li>
      </ol>

      <h2 id="formulas">Implicit differentiation formula</h2>
      <p>Differentiate every term with respect to x and treat y as a function of x, so each y-term picks up a factor of dy/dx (the chain rule). Then solve for dy/dx. In one line:</p>
      <div className="formula">If F(x, y) = 0, then dy/dx = −F<sub>x</sub> / F<sub>y</sub><br />d/dx[yⁿ] = n·yⁿ⁻¹·dy/dx &nbsp;·&nbsp; d/dx[xy] = y + x·dy/dx &nbsp;·&nbsp; d/dx[sin y] = cos y·dy/dx<br />Tangent at (x₀, y₀): y − y₀ = m(x − x₀), with m = dy/dx at that point</div>

      <h2 id="example">Worked example: the circle x² + y² = 25</h2>
      <ol>
        <li>Differentiate both sides: 2x + 2y·dy/dx = 0.</li>
        <li>Solve: dy/dx = −2x/(2y) = <strong>−x/y</strong>.</li>
        <li>At (3, 4): slope = −3/4 = <strong>−0.75</strong>. Tangent line: y − 4 = −0.75(x − 3), or <strong>y = −0.75x + 6.25</strong>.</li>
        <li>Second derivative: d²y/dx² = −(y − x·dy/dx)/y² = −(x² + y²)/y³ = −25/y³. At (3, 4) that is −25/64 ≈ <strong>−0.390625</strong>, so the curve bends downward there.</li>
      </ol>
      <p><strong>Product rule example:</strong> for x³ + y³ = 6xy (the folium of Descartes), 3x² + 3y²·dy/dx = 6y + 6x·dy/dx, so dy/dx = (2y − x²)/(y² − 2x). At (3, 3) the slope is −1.</p>

      <h2 id="when">When do you need implicit differentiation?</h2>
      <ul>
        <li>When y can&apos;t be isolated easily, as in x³ + y³ = 6xy or sin(xy) = x.</li>
        <li>For <strong>related rates</strong>: differentiate an equation that links quantities (like a ladder sliding down a wall, x² + y² = L²) with respect to time.</li>
        <li>To derive rules such as d/dx[ln x] = 1/x or d/dx[arcsin x] = 1/√(1 − x²) from y = ln x ⇔ eʸ = x.</li>
        <li>To find <strong>horizontal tangents</strong> (dy/dx = 0, numerator zero) and <strong>vertical tangents</strong> (the denominator is zero). On the circle, the tangent at (5, 0) is vertical: x = 5.</li>
      </ul>
      <h2 id="mistakes">Common mistakes</h2>
      <ul>
        <li>Forgetting the dy/dx on y-terms: d/dx[y²] is 2y·dy/dx, not 2y.</li>
        <li>Missing the product rule on terms like xy or x²y.</li>
        <li>Plugging in a point that isn&apos;t on the curve. Check it satisfies the equation first.</li>
      </ul>
      <p>Work with right triangles in related-rates problems using the <Link href="/right-triangle-calculator/">right triangle calculator</Link> or the <Link href="/hypotenuse-calculator/">hypotenuse calculator</Link>. Decompose rational functions before integrating with the <Link href="/partial-fraction-calculator/">partial fraction calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
