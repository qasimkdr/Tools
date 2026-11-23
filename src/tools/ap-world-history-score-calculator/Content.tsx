import Link from "next/link";

/** Brief: docs/research/ap-world-history-score-calculator.md. Weights: College Board AP World History: Modern exam page. */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the AP World score calculator</h2>
      <ol>
        <li><strong>Multiple choice:</strong> enter how many of the 55 questions you got right (from a practice test or your best estimate).</li>
        <li><strong>Short answer:</strong> enter your points for each of the three SAQs (0–3 each).</li>
        <li><strong>Essays:</strong> enter your DBQ score (0–7) and long essay score (0–6), using the College Board rubrics.</li>
      </ol>
      <p>The calculator weights each section exactly as the College Board does, shows your weighted score and an estimated 1–5, warns you when you&apos;re close to a boundary, and shows how many more multiple-choice questions would lift you to the next score.</p>

      <h2 id="format">AP World History: Modern exam format</h2>
      <table>
        <thead><tr><th>Section</th><th>Questions</th><th>Time</th><th>Weight</th></tr></thead>
        <tbody>
          <tr><td>Multiple choice</td><td>55</td><td>55 min</td><td>40%</td></tr>
          <tr><td>Short answer (SAQ)</td><td>3</td><td>40 min</td><td>20%</td></tr>
          <tr><td>Document-based question (DBQ)</td><td>1</td><td>60 min (incl. 15-min reading)</td><td>25%</td></tr>
          <tr><td>Long essay (LEQ)</td><td>1</td><td>40 min</td><td>15%</td></tr>
        </tbody>
      </table>
      <p>Source: College Board, <a href="https://apcentral.collegeboard.org/courses/ap-world-history/exam" rel="noopener" target="_blank">AP World History: Modern Exam</a>. Always check the current Course and Exam Description for the year you&apos;re testing, as formats can change.</p>

      <h2 id="formula">How the score is calculated</h2>
      <div className="formula">Weighted % = 40% × (MC ÷ 55) + 20% × (SAQ points ÷ 9) + 25% × (DBQ ÷ 7) + 15% × (LEQ ÷ 6)<br />Estimated score: 5 ≈ 74.6%+ · 4 ≈ 61.5%+ · 3 ≈ 47.7%+ · 2 ≈ 33.8%+ · otherwise 1</div>
      <p><strong>About the cutoffs:</strong> the section weights are official, but the College Board doesn&apos;t publish the score boundaries in advance. They&apos;re set after each exam so that a 4 means the same thing every year. The boundaries above are the ones score calculators commonly use (about 97, 80, 62 and 44 points of a 130-point composite). Treat the result as a range, especially near a boundary.</p>

      <h2 id="example">Example</h2>
      <p>40 of 55 multiple choice, 6 of 9 SAQ points, 4 of 7 on the DBQ and 3 of 6 on the LEQ:</p>
      <div className="formula">0.40 × 40/55 + 0.20 × 6/9 + 0.25 × 4/7 + 0.15 × 3/6 = 29.1 + 13.3 + 14.3 + 7.5 = 64.2%</div>
      <p>That&apos;s an estimated <strong>4</strong>, but only about 2.7 points above the 4/3 boundary, so a 3 is possible. Raising the DBQ from 4 to 6 adds about 7 points and makes the 4 much safer. Essays carry a lot of weight per point.</p>

      <h2 id="tips">How to raise your score</h2>
      <ul>
        <li><strong>DBQ points are the most valuable per point:</strong> each DBQ rubric point is worth about 3.6% of the total, versus about 0.7% per multiple-choice question.</li>
        <li><strong>Secure the &quot;easy&quot; rubric points:</strong> a clear, defensible thesis, contextualization, and using at least four documents to support an argument.</li>
        <li><strong>Answer every multiple-choice question:</strong> there&apos;s no guessing penalty.</li>
        <li><strong>Practice with real prompts:</strong> the College Board posts past free-response questions with scoring guidelines and sample responses.</li>
        <li><strong>Plan your study time:</strong> count the weeks until exam day with <Link href="/weeks-from-today/20/">20 weeks from today</Link>, or any other length.</li>
      </ul>

      <h2 id="credit">What do AP scores mean for college?</h2>
      <p>AP scores run from 1 to 5, and many colleges grant credit or placement for a 3 or higher; selective schools often want a 4 or 5. Policies vary by college and subject, so check each school&apos;s AP credit page. To see how your class grades add up, use the <Link href="/gpa-calculator/">GPA calculator</Link>. More <Link href="/category/education/">education calculators</Link>.</p>
      <p className="text-sm">AP® is a registered trademark of the College Board, which isn&apos;t affiliated with and doesn&apos;t endorse this site.</p>
      <p>Related AP calculators: estimate your <Link href="/ap-biology-score-calculator/">AP Biology score</Link>, <Link href="/ap-chemistry-score-calculator/">AP Chemistry score</Link> or <Link href="/ap-english-language-score-calculator/">AP English Language score</Link>, and see what you need on a final with the <Link href="/grade-calculator/">grade calculator</Link>.</p>
    </>
  );
}
