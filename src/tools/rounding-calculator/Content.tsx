import Link from "next/link";

/** Brief + competitor findings: docs/research/rounding-calculator.md · research/rounding-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the rounding calculator</h2>
      <ol>
        <li>Type the number. Commas and scientific notation such as 1.2e-3 are fine.</li>
        <li>Choose what to round to: a <strong>place value</strong> (nearest ten, whole number, tenth, hundredth…), a number of <strong>significant figures</strong>, or the <strong>nearest step</strong> such as 0.25 or 50.</li>
        <li>Pick the rounding rule. <strong>Half up</strong> is what schools teach; the table shows the result under every rule.</li>
        <li>Optionally paste a list to round many numbers the same way.</li>
      </ol>

      <h2 id="how-to-round">How to round a number</h2>
      <div className="formula">1. Find the rounding place (for the nearest tenth, the first digit after the decimal point).<br />2. Look at the next digit to the right, the decider.<br />3. If the decider is 5 or more, add 1 to the rounding place; if it is 4 or less, leave it.<br />4. Drop every digit after the rounding place (or replace whole-number digits with zeros).<br />Nearest step: round(x ÷ step) × step</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>3.14159 to the nearest hundredth:</strong> the hundredths digit is 4 and the next digit is 1, so keep 4: <strong>3.14</strong>.</li>
        <li><strong>1,234.5678 to the nearest hundred:</strong> the hundreds digit is 2 and the next digit is 3, so keep 2 and zero the rest: <strong>1,200</strong>.</li>
        <li><strong>7.45 to one decimal place:</strong> the decider is 5, so round up: <strong>7.5</strong>.</li>
        <li><strong>0.004567 to 2 significant figures:</strong> the first significant digit is 4, so keep 4 and 5; the next digit is 6, so round up: <strong>0.0046</strong>.</li>
        <li><strong>3.67 to the nearest 0.25:</strong> 3.67 ÷ 0.25 = 14.68, which rounds to 15, and 15 × 0.25 = <strong>3.75</strong>.</li>
      </ul>

      <h2 id="rules">The 7 rounding rules</h2>
      <div className="overflow-x-auto">
        <table>
          <thead><tr><th>Rule</th><th>What it does</th><th>2.5</th><th>−2.5</th><th>2.11 → 1 dp</th></tr></thead>
          <tbody>
            <tr><td>Half up</td><td>Halves round away from zero (school rounding)</td><td>3</td><td>−3</td><td>2.1</td></tr>
            <tr><td>Half to even</td><td>Halves go to the even neighbour (banker&apos;s rounding)</td><td>2</td><td>−2</td><td>2.1</td></tr>
            <tr><td>Half down</td><td>Halves round toward zero</td><td>2</td><td>−2</td><td>2.1</td></tr>
            <tr><td>Up</td><td>Always away from zero</td><td>3</td><td>−3</td><td>2.2</td></tr>
            <tr><td>Down (truncate)</td><td>Always toward zero, dropping digits</td><td>2</td><td>−2</td><td>2.1</td></tr>
            <tr><td>Ceiling</td><td>Always toward positive infinity</td><td>3</td><td>−2</td><td>2.2</td></tr>
            <tr><td>Floor</td><td>Always toward negative infinity</td><td>2</td><td>−3</td><td>2.1</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>Why banker&apos;s rounding?</strong> Rounding every half up pushes totals upward over many values. Rounding halves to the even neighbour sends half of them up and half down, so sums and averages stay unbiased, which is why it is common in finance and statistics software.</p>

      <h2 id="sig-figs">Rounding to significant figures</h2>
      <p>Significant figures start at the first non-zero digit. Leading zeros never count; zeros between non-zero digits always do. 123,456 to 3 significant figures is 123,000; 0.004567 to 2 is 0.0046; and 9.996 to 3 is 10.0, where the trailing zero is significant and is kept.</p>
      <h2 id="mistakes">Common rounding mistakes</h2>
      <ul>
        <li><strong>Rounding twice:</strong> 2.449 to the nearest tenth is 2.4, but rounding first to 2.45 and then to 2.5 gives the wrong answer. Always round from the original number.</li>
        <li><strong>Floating-point surprises:</strong> computers store 2.675 as 2.67499999…, so many tools show 2.67. This calculator uses exact decimal arithmetic.</li>
        <li><strong>Dropping meaningful zeros:</strong> 3.10 rounded to two decimals keeps its final zero, because it tells the reader the precision.</li>
      </ul>
      <p>Do exact arithmetic on decimals with the <Link href="/decimals-calculator/">decimals calculator</Link>, write very large or small results with the <Link href="/scientific-notation-calculator/">scientific notation calculator</Link>, or work out percentages before rounding with the <Link href="/percent-calculator/">percent calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
