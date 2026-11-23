import Link from "next/link";

/** Brief + competitor findings: docs/research/productivity-calculator.md · research/productivity-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the productivity calculator</h2>
      <ol>
        <li>Enter the <strong>output</strong> (units, tasks, calls, sales) and name the unit.</li>
        <li>Enter the <strong>total labor hours</strong> and the number of workers.</li>
        <li>Optional: add last period&apos;s output and hours to see the percentage change, and a target to see the hours you&apos;ll need.</li>
      </ol>

      <h2 id="formula">Productivity formulas</h2>
      <div className="formula">Labor productivity = output ÷ labor hours<br />Output per worker = output ÷ number of workers<br />Change = (new productivity ÷ old productivity − 1) × 100%<br />Hours needed = target output ÷ productivity</div>

      <h2 id="example">Worked example</h2>
      <p>A workshop makes <strong>2,400 units</strong> in <strong>160 labor hours</strong>: 2,400 ÷ 160 = <strong>15 units per hour</strong>, or 4 minutes per unit. Last month it made 2,100 units in 150 hours (14 per hour), so productivity rose <strong>7.14%</strong>. To make 3,000 units at the current rate takes 3,000 ÷ 15 = <strong>200 labor hours</strong>.</p>

      <h2 id="improve">Ways to raise productivity</h2>
      <ul>
        <li><strong>Remove bottlenecks</strong>: find the slowest step in the process and fix it first.</li>
        <li><strong>Reduce rework</strong>: defects and errors consume hours without adding output.</li>
        <li><strong>Train and standardize</strong>: documented methods shorten the time per unit.</li>
        <li><strong>Measure consistently</strong>: compare like-for-like periods and the same definition of output.</li>
      </ul>
      <p>Track time with the <Link href="/hours-calculator/">hours calculator</Link>, price extra shifts with the <Link href="/overtime-calculator/">overtime calculator</Link>, or see what better results could mean for pay with the <Link href="/pay-raise-calculator/">pay raise calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
