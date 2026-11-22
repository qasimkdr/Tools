import Link from "next/link";

/** Brief + competitor findings: docs/research/grade-curve-calculator.md · research/grade-curve-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the grade curve calculator</h2>
      <ol>
        <li>Paste the class&apos;s scores and set the maximum points (100 for percentages).</li>
        <li>Choose a curve method and its setting: the new top score, the points to add, the target average or the target spread.</li>
        <li>Compare the old and new averages and letter-grade counts, review each curved score, and download the list as a CSV.</li>
      </ol>

      <h2 id="formulas">Curving formulas</h2>
      <table>
        <thead><tr><th>Method</th><th>Formula</th></tr></thead>
        <tbody>
          <tr><td>Flat points</td><td>new = old + (target top − highest score)</td></tr>
          <tr><td>Target average</td><td>new = old + (target average − class average)</td></tr>
          <tr><td>Scale to top</td><td>new = old × target top ÷ highest score</td></tr>
          <tr><td>Square root</td><td>new = 10 × √old</td></tr>
          <tr><td>Bell curve</td><td>new = target average + target SD × (old − average) ÷ SD</td></tr>
        </tbody>
      </table>

      <h2 id="example">Worked example</h2>
      <p>Ten scores: 52, 61, 64, 68, 70, 73, 75, 78, 81, 88. The average is <strong>71%</strong>, the top score 88% and the (population) standard deviation 9.89. Before curving: 0 A, 2 B, 4 C, 3 D, 1 F.</p>
      <table>
        <thead><tr><th>Method</th><th>52 becomes</th><th>88 becomes</th><th>New average</th><th>A · B · C · D · F</th></tr></thead>
        <tbody>
          <tr><td>Flat (+12)</td><td>64.0</td><td>100.0</td><td>83.0%</td><td>3 · 4 · 2 · 1 · 0</td></tr>
          <tr><td>Target average 75 (+4)</td><td>56.0</td><td>92.0</td><td>75.0%</td><td>1 · 2 · 4 · 2 · 1</td></tr>
          <tr><td>Scale to top (×1.136)</td><td>59.1</td><td>100.0</td><td>80.7%</td><td>2 · 3 · 3 · 1 · 1</td></tr>
          <tr><td>Square root</td><td>72.1</td><td>93.8</td><td>84.1%</td><td>2 · 6 · 2 · 0 · 0</td></tr>
          <tr><td>Bell (75, SD 10)</td><td>55.8</td><td>92.2</td><td>75.0%</td><td>1 · 2 · 4 · 2 · 1</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Tips for instructors</h2>
      <ul>
        <li><strong>Announce the method</strong> before or with the results so students know how scores changed.</li>
        <li><strong>Watch small classes</strong>: one outlier can drive a scale or bell curve, so flat or square-root curves are often more stable.</li>
        <li><strong>Check the cap</strong>: capping at 100% means some students gain less than the stated curve.</li>
      </ul>
      <p>Students can work out what they need on the final with the <Link href="/grade-calculator/">grade calculator</Link> and track semesters with the <Link href="/gpa-calculator/">GPA calculator</Link>. For the statistics behind bell curves, see the <Link href="/standard-deviation-calculator/">standard deviation calculator</Link>. More <Link href="/category/education/">education calculators</Link>.</p>
    </>
  );
}
