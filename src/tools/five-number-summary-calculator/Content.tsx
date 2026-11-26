import Link from "next/link";

/** Brief + competitor findings: docs/research/five-number-summary-calculator.md · research/five-number-summary-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the five number summary calculator</h2>
      <ol>
        <li>Paste or type your numbers, separated by commas, spaces or line breaks.</li>
        <li>Choose the quartile method that matches your textbook, calculator or software.</li>
        <li>Read the five number summary, IQR, outlier fences and box plot. The sorted data is shown so you can check each step.</li>
      </ol>

      <h2 id="formulas">Steps and formulas</h2>
      <div className="formula">Sort the data: x₁ ≤ x₂ ≤ … ≤ xₙ<br />Minimum = x₁ · Maximum = xₙ<br />Median = middle value, or the mean of the two middle values<br />Q1 = median of the lower half · Q3 = median of the upper half<br />IQR = Q3 − Q1 · Outlier fences = Q1 − 1.5 × IQR and Q3 + 1.5 × IQR</div>

      <h2 id="example">Worked example</h2>
      <p>Data: 3, 7, 8, 5, 12, 14, 21, 13, 18.</p>
      <ul>
        <li>Sorted: 3, 5, 7, 8, <strong>12</strong>, 13, 14, 18, 21 (n = 9). Minimum = 3, maximum = 21, median = 12.</li>
        <li>Textbook method: lower half 3, 5, 7, 8 → Q1 = (5 + 7) ÷ 2 = <strong>6</strong>; upper half 13, 14, 18, 21 → Q3 = (14 + 18) ÷ 2 = <strong>16</strong>.</li>
        <li>Five number summary: <strong>3, 6, 12, 16, 21</strong>. IQR = 10, fences −9 and 31, so there are no outliers.</li>
        <li>With Tukey&apos;s hinges (median kept in both halves) or Excel&apos;s QUARTILE.INC, Q1 = 7 and Q3 = 14.</li>
      </ul>

      <h2 id="methods">Quartile methods compared</h2>
      <table>
        <thead><tr><th>Method</th><th>How Q1 and Q3 are found</th><th>Used by</th></tr></thead>
        <tbody>
          <tr><td>Textbook / TI-84</td><td>Median of each half, median excluded</td><td>TI-83/84, most intro statistics courses</td></tr>
          <tr><td>Tukey hinges</td><td>Median of each half, median included when n is odd</td><td>R fivenum(), exploratory data analysis</td></tr>
          <tr><td>Linear interpolation</td><td>Position (n − 1) × p + 1, interpolated</td><td>Excel QUARTILE.INC, R quantile() default, NumPy</td></tr>
        </tbody>
      </table>
      <p>For 2, 4, 6, 8, 10, 12 the first two methods give Q1 = 4 and Q3 = 10, while linear interpolation gives Q1 = 4.5 and Q3 = 9.5. The methods agree on the minimum, median and maximum; only Q1 and Q3 can change. The differences shrink as the data set grows.</p>

      <h2 id="box-plot">Reading a box plot</h2>
      <ul>
        <li>The box runs from Q1 to Q3 and holds the middle 50% of the data; the line inside is the median.</li>
        <li>The whiskers reach the smallest and largest values inside the outlier fences.</li>
        <li>Points beyond the whiskers are possible outliers. Check them for data-entry errors before removing anything.</li>
        <li>A median off-center in the box, or one whisker much longer than the other, suggests skewed data.</li>
      </ul>
      <p>Measure spread around the mean with the <Link href="/standard-deviation-calculator/">standard deviation calculator</Link>, get the mean, median and mode with the <Link href="/average-calculator/">average calculator</Link>, estimate a population mean with the <Link href="/confidence-interval-calculator/">confidence interval calculator</Link>, or average values with weights using the <Link href="/weighted-mean-calculator/">weighted mean calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
