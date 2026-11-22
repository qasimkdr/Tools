import Link from "next/link";

/** Brief + competitor findings: docs/research/ap-english-language-score-calculator.md · research/ap-english-language-score-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the AP Lang score calculator</h2>
      <ol>
        <li><strong>Enter how many multiple-choice questions you got right</strong>, out of 45.</li>
        <li><strong>Score each of your three essays from 0 to 6</strong> using the rubric (thesis, evidence and commentary, sophistication).</li>
        <li><strong>Read your composite</strong> and your estimated AP score under lenient and stricter cutoff estimates.</li>
      </ol>

      <h2 id="format">AP English Language exam format</h2>
      <table>
        <thead><tr><th>Section</th><th>Questions</th><th>Time</th><th>Weight</th></tr></thead>
        <tbody>
          <tr><td>I: Multiple choice</td><td>45</td><td>1 hour</td><td>45%</td></tr>
          <tr><td>II: Free response</td><td>3 essays (synthesis, rhetorical analysis, argument), 0–6 each</td><td>2 h 15 min</td><td>55%</td></tr>
        </tbody>
      </table>
      <p>Source: College Board,{" "}
        <a href="https://apcentral.collegeboard.org/courses/ap-english-language-and-composition/exam" rel="noopener" target="_blank">AP English Language and Composition exam overview</a>. The exam is fully digital in the Bluebook app.</p>

      <h2 id="formula">How the estimate works</h2>
      <div className="formula">Composite = 45 × (MC correct ÷ 45) + 55 × (essay points ÷ 18)   (0–100)<br />Lenient estimate: 5 ≥ 70 · 4 ≥ 58 · 3 ≥ 43 · 2 ≥ 30<br />Stricter estimate: 5 ≥ 75 · 4 ≥ 61 · 3 ≥ 46 · 2 ≥ 30</div>
      <p>The weighting is official; the cutoffs are estimates published by score-calculator sites, because the College Board doesn&apos;t release them. Where the estimates disagree, you&apos;ll see both possible scores.</p>

      <h2 id="example">Examples</h2>
      <table>
        <thead><tr><th>MC correct</th><th>Essays</th><th>Composite</th><th>Estimated score</th></tr></thead>
        <tbody>
          <tr><td>28</td><td>3, 3, 3</td><td>55.5</td><td>3</td></tr>
          <tr><td>32</td><td>4, 4, 3</td><td>65.6</td><td>4</td></tr>
          <tr><td>38</td><td>5, 5, 4</td><td>80.8</td><td>5</td></tr>
        </tbody>
      </table>

      <h2 id="rubric">The essay rubric</h2>
      <ul>
        <li><strong>Thesis (0–1):</strong> a defensible claim that responds to the prompt.</li>
        <li><strong>Evidence and commentary (0–4):</strong> relevant evidence with explanation of how it supports your line of reasoning. This is where most points are won.</li>
        <li><strong>Sophistication (0–1):</strong> a nuanced argument, awareness of complexity or a consistently vivid, persuasive style.</li>
      </ul>
      <p>Because each essay point is worth about 3 composite points, raising one essay from 4 to 5 helps as much as answering three more multiple-choice questions correctly.</p>

      <h2 id="more">More AP tools</h2>
      <p>Estimate other exams with the <Link href="/ap-world-history-score-calculator/">AP World History</Link>, <Link href="/ap-biology-score-calculator/">AP Biology</Link> and <Link href="/ap-statistics-score-calculator/">AP Statistics</Link> score calculators, and see how AP courses affect your weighted average with the <Link href="/gpa-calculator/">GPA calculator</Link>.</p>
      <p className="text-sm">AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this site. More <Link href="/category/education/">education calculators</Link>.</p>
    </>
  );
}
