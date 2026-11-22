import Link from "next/link";

/** Brief + competitor findings: docs/research/ap-biology-score-calculator.md · research/ap-biology-score-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the AP Bio score calculator</h2>
      <ol>
        <li><strong>Enter how many multiple-choice questions you got right</strong>, out of 60. Use a practice test or your best estimate.</li>
        <li><strong>Enter your free-response points</strong> for each question, scored with the College Board&apos;s published scoring guidelines if you can.</li>
        <li><strong>Read your estimated 1–5 score</strong>, your weighted percentage, and what it would take to reach the next score.</li>
      </ol>

      <h2 id="format">AP Biology exam format</h2>
      <table>
        <thead><tr><th>Section</th><th>Questions</th><th>Time</th><th>Weight</th></tr></thead>
        <tbody>
          <tr><td>I: Multiple choice</td><td>60</td><td>1 h 30 min</td><td>50%</td></tr>
          <tr><td>II: Free response</td><td>6 (2 long worth 9 points each, 4 short worth 4 each)</td><td>1 h 30 min</td><td>50%</td></tr>
        </tbody>
      </table>
      <p>Source: College Board,{" "}
        <a href="https://apcentral.collegeboard.org/courses/ap-biology/exam" rel="noopener" target="_blank">AP Biology exam overview</a>, and the 2025 AP Biology scoring statistics (point values). In 2025, the average score was 4.74 of 9 on question 1 and 5.17 of 9 on question 2, so roughly half the available points is typical on the long questions.</p>

      <h2 id="formula">How the score is calculated</h2>
      <div className="formula">Weighted score = 50% × (MC correct ÷ 60) + 50% × (FRQ points ÷ 34)<br />Composite (out of 120) ≈ weighted score × 120<br />Estimated bands: 5 ≈ 93+ · 4 ≈ 74–92 · 3 ≈ 51–73 · 2 ≈ 28–50 · 1 below</div>
      <p>The weighting is official. The bands are approximate cutoffs widely used by score calculators, because the College Board sets the real ones after each exam and doesn&apos;t publish them. That&apos;s why the calculator warns you when you&apos;re close to a boundary.</p>

      <h2 id="example">Example</h2>
      <p>A student gets <strong>45 of 60</strong> multiple-choice questions right and scores 6, 6, 3, 3, 3 and 3 on the free-response questions (24 of 34):</p>
      <div className="formula">50% × 45/60 = 37.5  ·  50% × 24/34 = 35.3<br />Weighted score = 72.8%  →  ≈ 87 / 120  →  estimated 4</div>
      <p>With the same free-response points, about 51 multiple-choice questions right would push the estimate to a 5. Alternatively, 4 more free-response points (worth about 5.9%) would do it on their own, reaching 78.7%.</p>

      <h2 id="strategy">Where to find extra points</h2>
      <ul>
        <li><strong>The long questions matter most:</strong> Q1 and Q2 together are 18 of the 34 free-response points, over a quarter of your total score. Practice identifying variables, controls and justifying claims with data.</li>
        <li><strong>Learn the task verbs:</strong> &quot;identify,&quot; &quot;describe,&quot; &quot;explain,&quot; &quot;justify&quot; and &quot;predict&quot; each earn points differently on the scoring guidelines.</li>
        <li><strong>Practice graphing and statistics:</strong> correct axes, labels and error bars, plus chi-square and standard error, show up regularly.</li>
        <li><strong>Never leave multiple choice blank:</strong> there&apos;s no guessing penalty.</li>
        <li><strong>Brush up on quantities:</strong> molarity, dilutions and molar masses appear in lab questions; the <Link href="/molecular-weight-calculator/">molecular weight calculator</Link> and the <Link href="/ratio-calculator/">ratio calculator</Link> are handy for practice.</li>
      </ul>

      <h2 id="credit">What your score means</h2>
      <table>
        <thead><tr><th>AP score</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td>5</td><td>Extremely well qualified</td></tr>
          <tr><td>4</td><td>Very well qualified</td></tr>
          <tr><td>3</td><td>Qualified</td></tr>
          <tr><td>2</td><td>Possibly qualified</td></tr>
          <tr><td>1</td><td>No recommendation</td></tr>
        </tbody>
      </table>
      <p>Taking other AP exams? Estimate your history score with the <Link href="/ap-world-history-score-calculator/">AP World History score calculator</Link>, and see how AP and honors classes affect your weighted average with the <Link href="/gpa-calculator/">GPA calculator</Link>.</p>
      <p className="text-sm">AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this site. More <Link href="/category/education/">education calculators</Link>.</p>
    </>
  );
}
