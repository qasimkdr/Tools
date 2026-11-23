import Link from "next/link";

/** Brief + competitor findings: docs/research/partial-fraction-calculator.md · research/partial-fraction-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the partial fraction calculator</h2>
      <ol>
        <li>Type the <strong>numerator</strong> and <strong>denominator</strong> as polynomials. The denominator can be expanded (<code>x^3 + x</code>) or factored (<code>x(x^2 + 1)</code>).</li>
        <li>The calculator divides first if the fraction is improper, factors the denominator, writes the A, B, C… form, builds the coefficient equations and solves them exactly.</li>
        <li>Every answer is checked by evaluating the original fraction and the decomposition at test values with exact fractions.</li>
      </ol>

      <h2 id="formulas">Partial fraction rules</h2>
      <p>Write the denominator as a product of linear and irreducible quadratic factors. Each factor contributes terms like these:</p>
      <div className="formula">Distinct linear factor (ax + b): A/(ax + b)<br />Repeated linear factor (ax + b)ⁿ: A₁/(ax + b) + A₂/(ax + b)² + … + Aₙ/(ax + b)ⁿ<br />Irreducible quadratic (ax² + bx + c): (Bx + C)/(ax² + bx + c)<br />Repeated quadratic (ax² + bx + c)ⁿ: (B₁x + C₁)/(ax² + bx + c) + … + (Bₙx + Cₙ)/(ax² + bx + c)ⁿ</div>
      <p>If the numerator&apos;s degree is equal to or higher than the denominator&apos;s, do <strong>polynomial long division</strong> first and decompose only the remainder. The total number of unknowns always equals the degree of the denominator.</p>

      <h2 id="example">Worked example</h2>
      <p>Decompose <strong>(3x + 5) / (x² − x − 2)</strong>.</p>
      <ol>
        <li>Factor: x² − x − 2 = (x + 1)(x − 2).</li>
        <li>Set up: (3x + 5)/((x + 1)(x − 2)) = A/(x + 1) + B/(x − 2).</li>
        <li>Multiply by the denominator: 3x + 5 = A(x − 2) + B(x + 1).</li>
        <li>Compare coefficients: x: A + B = 3; constant: −2A + B = 5. So A = −2/3 and B = 11/3.</li>
        <li>Answer: <strong>−2/(3(x + 1)) + 11/(3(x − 2))</strong>.</li>
      </ol>
      <p><strong>Shortcut (cover-up method):</strong> for a distinct linear factor, set x to its root. With x = 2: 11 = 3B, so B = 11/3. With x = −1: 2 = −3A, so A = −2/3. This works only for non-repeated linear factors; the calculator always solves the full system, so repeated and quadratic factors are handled too.</p>

      <h2 id="more-examples">More examples</h2>
      <ul>
        <li><strong>Repeated factor:</strong> (5x − 4)/((x − 1)(x + 2)²) = 1/(9(x − 1)) − 1/(9(x + 2)) + 14/(3(x + 2)²).</li>
        <li><strong>Quadratic factor:</strong> (2x² + 3)/(x(x² + 1)) = 3/x − x/(x² + 1).</li>
        <li><strong>Improper fraction:</strong> x³/(x² − 1) = x + 1/(2(x − 1)) + 1/(2(x + 1)).</li>
        <li><strong>Laplace transforms:</strong> (s + 3)/(s² + 3s + 2) = 2/(s + 1) − 1/(s + 2), so the inverse transform is 2e⁻ᵗ − e⁻²ᵗ.</li>
      </ul>

      <h2 id="why">Why partial fractions are useful</h2>
      <ul>
        <li><strong>Integration:</strong> each simple term integrates directly: A/(x − a) gives A ln|x − a|, and (Bx + C)/(x² + k²) gives logarithm and arctangent terms.</li>
        <li><strong>Inverse Laplace and z-transforms</strong> in differential equations and control systems.</li>
        <li><strong>Series and sums:</strong> telescoping sums such as 1/(n(n + 1)) = 1/n − 1/(n + 1).</li>
      </ul>
      <h2 id="limits">Limits of this calculator</h2>
      <p>It works over the <strong>rational numbers</strong>. A quadratic such as x² − 5 is kept as one factor, because its roots ±√5 are irrational. A factor that can&apos;t be split into rational linear or quadratic pieces, such as x³ − 2, is reported instead of being guessed.</p>
      <p>Simplify an ordinary fraction with the <Link href="/fraction-calculator/">fraction calculator</Link>, find common factors with the <Link href="/gcf-calculator/">GCF calculator</Link>, or solve a linear system by matrices with the <Link href="/matrix-inverse-calculator/">matrix inverse calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
