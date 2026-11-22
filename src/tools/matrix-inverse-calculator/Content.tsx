import Link from "next/link";

/** Brief + competitor findings: docs/research/matrix-inverse-calculator.md · research/matrix-inverse-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the inverse matrix calculator</h2>
      <ol>
        <li><strong>Pick the size</strong> of your square matrix, from 2×2 to 6×6.</li>
        <li><strong>Type the entries</strong> as integers, decimals or fractions like 1/3.</li>
        <li><strong>Read the determinant and inverse</strong> as exact fractions (or decimals), with the Gauss-Jordan steps and a check that A × A⁻¹ = I.</li>
      </ol>

      <h2 id="formula">Inverse matrix formulas</h2>
      <div className="formula">2×2: [[a, b], [c, d]]⁻¹ = 1/(ad − bc) × [[d, −b], [−c, a]]<br />General: A⁻¹ = adj(A) ÷ det(A)  ·  or row-reduce [A | I] → [I | A⁻¹]<br />A has an inverse ⇔ det(A) ≠ 0</div>

      <h2 id="examples">Worked examples</h2>
      <h3>2×2: A = [[4, 7], [2, 6]]</h3>
      <div className="formula">det = 4 × 6 − 7 × 2 = 10<br />A⁻¹ = 1/10 × [[6, −7], [−2, 4]] = [[3/5, −7/10], [−1/5, 2/5]]</div>
      <h3>3×3: A = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]</h3>
      <p>The determinant is 1, so the inverse has whole-number entries: <strong>[[−24, 18, 5], [20, −15, −4], [−5, 4, 1]]</strong>. Multiply it by A to confirm you get the identity matrix.</p>
      <h3>Singular: [[1, 2], [2, 4]]</h3>
      <p>The second row is twice the first, so det = 4 − 4 = 0 and no inverse exists.</p>

      <h2 id="gauss">Gauss-Jordan elimination, step by step</h2>
      <ol>
        <li>Write the matrix next to the identity: [A | I].</li>
        <li>For each column, swap in a row with a non-zero pivot if needed, then divide that row by the pivot to make it 1.</li>
        <li>Subtract multiples of the pivot row from every other row to make the rest of the column 0.</li>
        <li>When the left side is I, the right side is A⁻¹. If a column has no non-zero pivot, the matrix is singular.</li>
      </ol>
      <p>Every row operation is a combination of fraction arithmetic, the same rules as the <Link href="/fraction-calculator/">fraction calculator</Link>; reducing results uses the <Link href="/gcf-calculator/">greatest common factor</Link>.</p>

      <h2 id="systems">Solving equations with an inverse</h2>
      <p>A system like 4x + 7y = 1 and 2x + 6y = 2 can be written as A·[x, y] = [1, 2], so [x, y] = A⁻¹·[1, 2] = [3/5 − 14/10, −1/5 + 4/5] = [−0.8, 0.6]. For large systems, elimination directly on the equations is faster, but the inverse is handy when you need to solve for many right-hand sides.</p>
      <p>Working with very large or tiny entries? The <Link href="/scientific-notation-calculator/">scientific notation converter</Link> keeps them readable. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
