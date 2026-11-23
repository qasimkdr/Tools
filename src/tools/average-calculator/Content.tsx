import Link from "next/link";

/** Brief + competitor findings: docs/research/average-calculator.md · research/average-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the average calculator</h2>
      <ol>
        <li>Choose what to average: a list of <strong>numbers</strong>, <strong>percentages</strong> from groups of different sizes, or <strong>times</strong>.</li>
        <li>Paste or type your values; commas, spaces and new lines all work, so you can paste a column from a spreadsheet.</li>
        <li>Read the average with its working, plus the median, mode, range and more.</li>
      </ol>

      <h2 id="formulas">Average formulas</h2>
      <div className="formula">Mean (average) = sum of values ÷ number of values<br />Median = middle value when sorted (mean of the two middle values for an even count)<br />Mode = most frequent value · Range = maximum − minimum<br />Average percentage = Σ(percentage × group size) ÷ Σ group size<br />Geometric mean = (x₁ × x₂ × … × xₙ)^(1/n) · Harmonic mean = n ÷ Σ(1/x)</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>Numbers 4, 8, 15, 16, 23, 42:</strong> sum 108 ÷ 6 = <strong>18</strong>. Sorted, the middle two are 15 and 16, so the median is 15.5. No value repeats, so there is no mode.</li>
        <li><strong>Percentages:</strong> 80% of a class of 50 passed and 90% of a class of 10. The simple average of 80 and 90 is 85%, but the true overall rate is (40 + 9) ÷ 60 = <strong>81.67%</strong>, because the bigger class counts more.</li>
        <li><strong>Times 5:30, 6:15, 5:58, 6:02:</strong> 330 + 375 + 358 + 362 = 1,425 seconds ÷ 4 = 356.25 s = <strong>5:56.3</strong>.</li>
      </ul>

      <h2 id="which">Mean, median or mode?</h2>
      <ul>
        <li><strong>Mean</strong> uses every value and is what most people mean by “average”. It is pulled by outliers: one $1M salary lifts the mean pay of a small team a lot.</li>
        <li><strong>Median</strong> is the typical middle value and resists outliers, which is why house prices and incomes are usually reported as medians.</li>
        <li><strong>Mode</strong> is best for the most common choice, such as a shoe size.</li>
        <li><strong>Geometric mean</strong> suits growth rates and ratios; <strong>harmonic mean</strong> suits rates such as average speed over equal distances.</li>
      </ul>
      <h2 id="mistakes">Common averaging mistakes</h2>
      <ul>
        <li>Averaging percentages from groups of different sizes without weighting them (use the Percentages mode).</li>
        <li>Averaging times as decimals: 5:30 is 5.5 minutes, not 5.30.</li>
        <li>Averaging averages: combine the underlying totals instead, or weight each average by its count.</li>
      </ul>
      <p>Give items different importance with the <Link href="/weighted-mean-calculator/">weighted mean calculator</Link>, measure spread with the <Link href="/standard-deviation-calculator/">standard deviation calculator</Link>, average class marks with the <Link href="/grade-calculator/">grade calculator</Link>, or convert between parts and percentages with the <Link href="/percent-calculator/">percent calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
