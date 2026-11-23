import Link from "next/link";

/** Brief + competitor findings: docs/research/decimals-calculator.md · research/decimals-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the decimals calculator</h2>
      <ol>
        <li>Type two decimal numbers (negatives and whole numbers work too; fractions like 3/8 are accepted).</li>
        <li>Choose add, subtract, multiply or divide, and how many decimal places to round to.</li>
        <li>Read the exact answer (repeating digits get a bar), the rounded value, the fraction and the percent, with the steps for doing it by hand.</li>
      </ol>

      <h2 id="rules">Rules for decimal arithmetic</h2>
      <table>
        <thead><tr><th>Operation</th><th>Rule</th></tr></thead>
        <tbody>
          <tr><td>Add / subtract</td><td>Line up the decimal points, pad with zeros, calculate, keep the point in place</td></tr>
          <tr><td>Multiply</td><td>Multiply as whole numbers; decimal places in answer = sum of places in the factors</td></tr>
          <tr><td>Divide</td><td>Shift both points until the divisor is whole, then divide normally</td></tr>
        </tbody>
      </table>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>12.75 × 3.4</strong>: 1275 × 34 = 43,350; 3 decimal places → <strong>43.35</strong> (867/20).</li>
        <li><strong>12.75 ÷ 3.4</strong>: 127.5 ÷ 34 = <strong>3.75</strong> (15/4).</li>
        <li><strong>1 ÷ 7</strong> = 0.<span style={{ textDecoration: "overline" }}>142857</span>, a repeating decimal with a 6-digit cycle.</li>
        <li><strong>2 ÷ 3</strong> = 0.<span style={{ textDecoration: "overline" }}>6</span>, which rounds to <strong>0.67</strong>.</li>
      </ul>

      <h2 id="places">Decimal place values</h2>
      <table>
        <thead><tr><th>Place</th><th>Value</th><th>Example (3.14159)</th></tr></thead>
        <tbody>
          <tr><td>Tenths</td><td>0.1</td><td>1</td></tr>
          <tr><td>Hundredths</td><td>0.01</td><td>4</td></tr>
          <tr><td>Thousandths</td><td>0.001</td><td>1</td></tr>
          <tr><td>Ten-thousandths</td><td>0.0001</td><td>5</td></tr>
        </tbody>
      </table>
      <p>Working with fractions instead? Use the <Link href="/fraction-calculator/">fraction calculator</Link>. Very large or small decimals are easier in the <Link href="/scientific-notation-calculator/">scientific notation calculator</Link>, and the <Link href="/square-root-calculator/">square root calculator</Link> handles roots. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
