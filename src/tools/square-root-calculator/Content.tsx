import Link from "next/link";

/** Brief + competitor findings: docs/research/square-root-calculator.md · research/square-root-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the square root calculator</h2>
      <ol>
        <li><strong>Enter a number</strong>: whole, decimal or negative.</li>
        <li><strong>Choose square root, cube root or any nth root.</strong></li>
        <li><strong>Read the decimal answer</strong> plus, for whole numbers, the simplified radical form, whether it&apos;s a perfect power, and the prime-factor steps.</li>
      </ol>

      <h2 id="formula">Square root basics</h2>
      <div className="formula">√x = y  where  y × y = x  ·  ∛x = y  where  y³ = x  ·  ⁿ√x = x^(1/n)<br />Simplify: ⁿ√(aⁿ × b) = a · ⁿ√b</div>
      <p>Every positive number has two square roots (+7 and −7 for 49). The <strong>√</strong> symbol means the principal (positive) one. Odd roots of negative numbers are negative and real; even roots of negative numbers are imaginary (√−16 = 4i).</p>

      <h2 id="simplify">How to simplify a square root</h2>
      <ol>
        <li><strong>Prime-factorize:</strong> 72 = 2 × 2 × 2 × 3 × 3 = 2³ × 3².</li>
        <li><strong>Pull out pairs</strong> (triples for cube roots): one pair of 2s and one pair of 3s come out as 2 × 3 = 6.</li>
        <li><strong>Leave the rest inside:</strong> one 2 remains, so √72 = <strong>6√2</strong> ≈ 8.485.</li>
      </ol>
      <p>Cube roots work the same way with groups of three: 54 = 3³ × 2, so ∛54 = <strong>3∛2</strong> ≈ 3.780.</p>

      <h2 id="by-hand">Finding a square root by hand</h2>
      <p><strong>Estimate first:</strong> √50 lies between √49 = 7 and √64 = 8, much closer to 7. Then refine with <strong>Newton&apos;s method</strong>: new guess = (guess + x ÷ guess) ÷ 2.</p>
      <div className="formula">√10: start 3 → (3 + 10/3)/2 = 3.1667 → (3.1667 + 10/3.1667)/2 = 3.16228</div>
      <p>Each round roughly doubles the number of correct digits, which is how calculators compute roots quickly.</p>

      <h2 id="table">Perfect squares and cubes</h2>
      <table>
        <thead><tr><th>n</th><th>n²</th><th>n³</th><th>n</th><th>n²</th><th>n³</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>1</td><td>1</td><td>9</td><td>81</td><td>729</td></tr>
          <tr><td>2</td><td>4</td><td>8</td><td>10</td><td>100</td><td>1,000</td></tr>
          <tr><td>3</td><td>9</td><td>27</td><td>11</td><td>121</td><td>1,331</td></tr>
          <tr><td>4</td><td>16</td><td>64</td><td>12</td><td>144</td><td>1,728</td></tr>
          <tr><td>5</td><td>25</td><td>125</td><td>13</td><td>169</td><td>2,197</td></tr>
          <tr><td>6</td><td>36</td><td>216</td><td>14</td><td>196</td><td>2,744</td></tr>
          <tr><td>7</td><td>49</td><td>343</td><td>15</td><td>225</td><td>3,375</td></tr>
          <tr><td>8</td><td>64</td><td>512</td><td>20</td><td>400</td><td>8,000</td></tr>
        </tbody>
      </table>
      <p>Useful values: √2 ≈ 1.41421, √3 ≈ 1.73205, √5 ≈ 2.23607, ∛2 ≈ 1.25992.</p>

      <h2 id="uses">Where square roots show up</h2>
      <ul>
        <li><strong>Geometry:</strong> the side of a square from its area, and the long side of a right triangle, c = √(a² + b²). Use the <Link href="/hypotenuse-calculator/">hypotenuse calculator</Link> or the <Link href="/right-triangle-calculator/">right triangle calculator</Link>.</li>
        <li><strong>Statistics:</strong> standard deviation is the square root of variance.</li>
        <li><strong>Physics and finance:</strong> distances, speeds, and annualized growth rates (nth roots).</li>
      </ul>
      <p>More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
