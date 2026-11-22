import Link from "next/link";

/** Brief + competitor findings: docs/research/ap-chemistry-score-calculator.md · research/ap-chemistry-score-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the AP Chem score calculator</h2>
      <ol>
        <li><strong>Enter your multiple-choice score</strong> out of 60 from a practice exam.</li>
        <li><strong>Score each free-response question</strong> with the College Board&apos;s scoring guidelines: up to 10 points for questions 1–3 and up to 4 for questions 4–7.</li>
        <li><strong>Read your estimated 1–5 score</strong>, your composite out of 100, and how many more multiple-choice answers you&apos;d need for the next score.</li>
      </ol>

      <h2 id="format">AP Chemistry exam format</h2>
      <table>
        <thead><tr><th>Section</th><th>Questions</th><th>Time</th><th>Weight</th></tr></thead>
        <tbody>
          <tr><td>I: Multiple choice</td><td>60</td><td>1 h 30 min</td><td>50%</td></tr>
          <tr><td>II: Free response</td><td>7 (3 long × 10 points, 4 short × 4 points)</td><td>1 h 45 min</td><td>50%</td></tr>
        </tbody>
      </table>
      <p>Source: College Board,{" "}
        <a href="https://apcentral.collegeboard.org/courses/ap-chemistry/exam" rel="noopener" target="_blank">AP Chemistry exam overview</a> and 2025 scoring statistics.</p>

      <h2 id="formula">How the score is calculated</h2>
      <div className="formula">Composite = MC correct × 50/60 + FRQ points × 50/46   (0–100)<br />Estimated bands: 5 ≈ 72+ · 4 ≈ 58–71 · 3 ≈ 42–57 · 2 ≈ 27–41 · 1 below</div>
      <p>The 50/50 weighting is official; the bands are the estimates most score calculators use. Because the real cutoffs move a few points each year (and some estimates put a 5 nearer 78–80), the calculator warns you when you&apos;re within 3 points of a boundary.</p>

      <h2 id="example">Example</h2>
      <p>A student gets <strong>40 of 60</strong> multiple-choice questions right and scores 6, 5 and 5 on the long questions and 3, 2, 2 and 2 on the short ones (25 of 46):</p>
      <div className="formula">40 × 50/60 = 33.3  ·  25 × 50/46 = 27.2<br />Composite = 60.5 / 100  →  estimated 4</div>
      <p>To reach an estimated 5 with the same free-response points, they&apos;d need about 54 multiple-choice questions right. Picking up 6 more free-response points instead would be worth about 6.5 composite points.</p>

      <h2 id="distribution">2025 AP Chemistry score distribution</h2>
      <table>
        <thead><tr><th>Score</th><th>Share of students</th></tr></thead>
        <tbody>
          <tr><td>5</td><td>17.9%</td></tr>
          <tr><td>4</td><td>28.6%</td></tr>
          <tr><td>3</td><td>31.4%</td></tr>
          <tr><td>2</td><td>15.9%</td></tr>
          <tr><td>1</td><td>6.2%</td></tr>
        </tbody>
      </table>
      <p>Source: College Board,{" "}
        <a href="https://apstudents.collegeboard.org/about-ap-scores/score-distributions/ap-chemistry" rel="noopener" target="_blank">AP Chemistry score distributions</a>. On the 2025 free-response section, average scores were 4.78, 4.29 and 3.61 out of 10 on the long questions, and between 1.34 and 2.32 out of 4 on the short ones, about 20 of 46 points overall.</p>

      <h2 id="strategy">Where to find extra points</h2>
      <ul>
        <li><strong>Show units and setup:</strong> free-response points are often awarded for the method, not just the final number.</li>
        <li><strong>Master stoichiometry and molar mass:</strong> they appear throughout both sections. Check your practice answers with the <Link href="/molecular-weight-calculator/">molecular weight calculator</Link>.</li>
        <li><strong>Practice the short questions:</strong> in 2025, question 6 averaged only 1.34 of 4, the lowest of any question.</li>
        <li><strong>Answer every multiple-choice question:</strong> there&apos;s no guessing penalty.</li>
      </ul>
      <p>Taking other AP sciences? Use the <Link href="/ap-biology-score-calculator/">AP Biology score calculator</Link>, and see how AP classes boost your weighted average with the <Link href="/gpa-calculator/">GPA calculator</Link>.</p>
      <p className="text-sm">AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this site. More <Link href="/category/education/">education calculators</Link>.</p>
    </>
  );
}
