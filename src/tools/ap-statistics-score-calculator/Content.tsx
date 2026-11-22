import Link from "next/link";

/** Brief + competitor findings: docs/research/ap-statistics-score-calculator.md (no reachable competitor offered this tool) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the AP Stats score calculator</h2>
      <ol>
        <li><strong>Enter the number of multiple-choice questions you got right</strong>, out of 42.</li>
        <li><strong>Enter your score on each free-response question</strong>, from 0 to 10, using the scoring rubric from a practice exam.</li>
        <li><strong>Read your composite score</strong> and your estimated AP score under both lenient and stricter cutoff assumptions.</li>
      </ol>

      <h2 id="format">New AP Statistics exam format (May 2027)</h2>
      <table>
        <thead><tr><th>Section</th><th>Questions</th><th>Time</th><th>Weight</th></tr></thead>
        <tbody>
          <tr><td>I: Multiple choice</td><td>42 (4 answer choices; includes two 3-question sets)</td><td>90 min</td><td>50%</td></tr>
          <tr><td>II: Free response</td><td>4 questions × 10 points</td><td>90 min</td><td>50% (12.5% each)</td></tr>
        </tbody>
      </table>
      <p>The redesigned course launches in the 2026–27 school year; the exam is fully digital, and several topics (such as the geometric distribution, chi-square goodness-of-fit and inference for slopes) were removed. Source: College Board,{" "}
        <a href="https://apcentral.collegeboard.org/courses/ap-statistics/future-revisions" rel="noopener" target="_blank">AP Statistics revisions</a> and the{" "}
        <a href="https://apcentral.collegeboard.org/courses/ap-statistics/exam" rel="noopener" target="_blank">exam overview</a>.</p>

      <h2 id="formula">How the estimate works</h2>
      <div className="formula">Composite = 50 × (MC correct ÷ 42) + 50 × (FRQ points ÷ 40)   (0–100)<br />Lenient estimate: 5 ≥ 65 · 4 ≥ 50 · 3 ≥ 38 · 2 ≥ 27<br />Stricter estimate: 5 ≥ 75 · 4 ≥ 60 · 3 ≥ 45 · 2 ≥ 30</div>
      <p>The weighting is official. The cutoffs are not: they&apos;re the range of estimates published for earlier exams, and 2027 is the first exam in the new format. Rather than pretend to know the exact curve, the calculator shows both ends of the range.</p>

      <h2 id="example">Example</h2>
      <p>A student gets <strong>30 of 42</strong> multiple-choice questions right and scores 6, 6, 5 and 7 on the free-response questions (24 of 40):</p>
      <div className="formula">50 × 30/42 = 35.7  ·  50 × 24/40 = 30.0<br />Composite = 65.7  →  a 5 with lenient cutoffs, a 4 with stricter ones</div>
      <p>Improving to 35 multiple-choice and 32 free-response points gives a composite of 81.7, an estimated 5 either way.</p>

      <h2 id="strategy">Where to find extra points</h2>
      <ul>
        <li><strong>Communicate in context:</strong> free-response rubrics reward conclusions stated in terms of the problem, with conditions checked.</li>
        <li><strong>Show your work:</strong> name the procedure, check conditions, compute and conclude; partial credit is common on the analytic rubric.</li>
        <li><strong>Practice inference:</strong> Q3 is always inference. Confidence intervals are a core skill; check your practice answers with the <Link href="/confidence-interval-calculator/">confidence interval calculator</Link>.</li>
        <li><strong>Don&apos;t leave multiple choice blank:</strong> wrong answers cost nothing.</li>
      </ul>
      <p>Taking other AP exams? Estimate your <Link href="/ap-biology-score-calculator/">AP Biology</Link> and <Link href="/ap-chemistry-score-calculator/">AP Chemistry</Link> scores, or plan your course grade with the <Link href="/grade-calculator/">final grade calculator</Link>.</p>
      <p className="text-sm">AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this site. More <Link href="/category/education/">education calculators</Link>.</p>
    </>
  );
}
