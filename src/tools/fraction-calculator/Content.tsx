import Link from "next/link";

/** Brief + competitor findings: docs/research/fraction-calculator.md · research/fraction-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the fraction calculator</h2>
      <ol>
        <li><strong>Enter the first fraction or mixed number</strong>: whole number (optional), numerator and denominator.</li>
        <li><strong>Pick an operation</strong>: add, subtract, multiply or divide.</li>
        <li><strong>Enter the second fraction</strong> and read the answer as a simplified fraction, a mixed number and a decimal, with every step shown.</li>
      </ol>

      <h2 id="rules">Fraction rules</h2>
      <div className="formula">a/b + c/d = (ad + bc) / bd  ·  a/b − c/d = (ad − bc) / bd<br />a/b × c/d = ac / bd  ·  a/b ÷ c/d = a/b × d/c = ad / bc<br />Mixed → improper:  w n/d = (w × d + n) / d</div>
      <p>Answers are always reduced by dividing the top and bottom by their greatest common factor.</p>

      <h2 id="examples">Worked examples</h2>
      <h3>Adding mixed numbers: 1 1/2 + 2 3/4</h3>
      <p>1 1/2 = 3/2 and 2 3/4 = 11/4. Over a common denominator of 4: 6/4 + 11/4 = 17/4 = <strong>4 1/4</strong> (4.25).</p>
      <h3>Subtracting from a whole number: 5 − 1 2/3</h3>
      <p>5 = 15/3 and 1 2/3 = 5/3, so 15/3 − 5/3 = 10/3 = <strong>3 1/3</strong>.</p>
      <h3>Multiplying: 2/3 × 3/4</h3>
      <p>(2 × 3) ÷ (3 × 4) = 6/12 = <strong>1/2</strong>. Tip: cancel common factors first (the 3s) to keep numbers small.</p>
      <h3>Dividing: 3/4 ÷ 2/5</h3>
      <p>Flip the second fraction and multiply: 3/4 × 5/2 = 15/8 = <strong>1 7/8</strong>.</p>

      <h2 id="kitchen">Fractions in real life</h2>
      <ul>
        <li><strong>Recipes:</strong> doubling 3/4 cup is 3/4 × 2 = 1 1/2 cups; halving 2/3 cup is 1/3 cup.</li>
        <li><strong>Measurements:</strong> 5 3/8 in + 2 7/8 in = 8 1/4 in when cutting wood.</li>
        <li><strong>Scaling:</strong> for ratios such as 2:3 or recipe scaling, the <Link href="/ratio-calculator/">ratio calculator</Link> and the <Link href="/proportion-calculator/">proportion calculator</Link> are faster.</li>
      </ul>

      <h2 id="equivalents">Common fraction–decimal equivalents</h2>
      <table>
        <thead><tr><th>Fraction</th><th>Decimal</th><th>Fraction</th><th>Decimal</th></tr></thead>
        <tbody>
          <tr><td>1/2</td><td>0.5</td><td>1/8</td><td>0.125</td></tr>
          <tr><td>1/3</td><td>0.333…</td><td>3/8</td><td>0.375</td></tr>
          <tr><td>2/3</td><td>0.666…</td><td>5/8</td><td>0.625</td></tr>
          <tr><td>1/4</td><td>0.25</td><td>1/5</td><td>0.2</td></tr>
          <tr><td>3/4</td><td>0.75</td><td>1/16</td><td>0.0625</td></tr>
        </tbody>
      </table>

      <h2 id="mistakes">Common mistakes</h2>
      <ul>
        <li><strong>Adding denominators:</strong> 1/2 + 1/3 is not 2/5. Find a common denominator first.</li>
        <li><strong>Forgetting to flip when dividing:</strong> divide by a fraction by multiplying by its reciprocal.</li>
        <li><strong>Mixed numbers in multiplication:</strong> convert to improper fractions first; 1 1/2 × 2 is 3, not 2 1/2.</li>
      </ul>
      <p>More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
