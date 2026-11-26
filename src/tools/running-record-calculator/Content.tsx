import Link from "next/link";

/** Brief + competitor findings: docs/research/running-record-calculator.md · research/running-record-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the running record calculator</h2>
      <ol>
        <li>Count the running words in the passage the child read (not counting the title).</li>
        <li>Enter the number of errors and self-corrections from your running record sheet.</li>
        <li>Optionally add the reading time to get words per minute and words correct per minute.</li>
      </ol>

      <h2 id="formulas">Running record formulas</h2>
      <div className="formula">Accuracy % = (running words − errors) ÷ running words × 100<br />Error rate = 1 : (running words ÷ errors)<br />Self-correction rate = 1 : ((errors + self-corrections) ÷ self-corrections)<br />WCPM = (running words − errors) ÷ minutes</div>

      <h2 id="example">Worked example</h2>
      <p>A child reads a 99-word passage in 1 minute 30 seconds, with 8 errors and 4 self-corrections:</p>
      <ul>
        <li>Accuracy = (99 − 8) ÷ 99 × 100 = <strong>91.9%</strong>, the <strong>instructional</strong> level.</li>
        <li>Error rate = 99 ÷ 8 = 12.4, so <strong>1:12</strong>.</li>
        <li>Self-correction rate = (8 + 4) ÷ 4 = <strong>1:3</strong>, a sign the child is checking their reading.</li>
        <li>Speed = 99 ÷ 1.5 = <strong>66 words per minute</strong>; 91 ÷ 1.5 = <strong>61 words correct per minute</strong>.</li>
        <li>On this passage, up to 4 errors would be independent (95%+), and 5 to 9 errors instructional.</li>
      </ul>

      <h2 id="levels">Accuracy and reading levels</h2>
      <table>
        <thead><tr><th>Accuracy</th><th>Level</th><th>What it suggests</th></tr></thead>
        <tbody>
          <tr><td>95–100%</td><td>Independent</td><td>The child can read this text alone, for practice and pleasure</td></tr>
          <tr><td>90–94%</td><td>Instructional</td><td>Right for guided reading with teacher support</td></tr>
          <tr><td>Below 90%</td><td>Frustrational</td><td>Too hard for now; choose an easier text</td></tr>
        </tbody>
      </table>

      <h2 id="scoring">What counts as an error</h2>
      <ul>
        <li><strong>Errors:</strong> substitutions, omissions, insertions and words the teacher has to tell the child.</li>
        <li><strong>Not errors:</strong> self-corrections, repetitions, and the same proper noun misread more than once (count it once).</li>
        <li>Look beyond the numbers: the meaning, structure and visual cues behind each error tell you what to teach next.</li>
      </ul>
      <p>Turn scores into percentages with the <Link href="/percent-calculator/">percent calculator</Link>, work out a test grade with the <Link href="/grade-calculator/">grade calculator</Link>, adjust class scores with the <Link href="/grade-curve-calculator/">grade curve calculator</Link>, or average report cards with the <Link href="/gpa-calculator/">GPA calculator</Link>. More <Link href="/category/education/">education and sports calculators</Link>.</p>
    </>
  );
}
