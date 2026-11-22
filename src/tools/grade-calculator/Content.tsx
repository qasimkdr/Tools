import Link from "next/link";

/** Brief + competitor findings: docs/research/grade-calculator.md · research/grade-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the final grade calculator</h2>
      <ul>
        <li><strong>Score needed on final:</strong> enter your current grade, the final exam&apos;s weight from your syllabus and the grade you want. You&apos;ll see the score you need, what you&apos;d need for an A, B, C or D, and the course grade for any exam score.</li>
        <li><strong>Weighted grade:</strong> list your categories or assignments with their scores and weights to get your grade so far and the letter it earns.</li>
      </ul>

      <h2 id="formula">Final grade formulas</h2>
      <div className="formula">Needed on final = (target − current × (1 − w)) ÷ w   (w = final weight as a decimal)<br />Course grade = current × (1 − w) + final score × w<br />Weighted grade = Σ (score × weight) ÷ Σ weight</div>

      <h2 id="examples">Worked examples</h2>
      <h3>What do I need on the final?</h3>
      <p>Current grade <strong>82%</strong>, final worth <strong>25%</strong>:</p>
      <table>
        <thead><tr><th>Target</th><th>Score needed on final</th></tr></thead>
        <tbody>
          <tr><td>90% (A−)</td><td>114%, not possible without extra credit</td></tr>
          <tr><td>85% (B)</td><td>94%</td></tr>
          <tr><td>80% (B−)</td><td>74%</td></tr>
          <tr><td>70% (C−)</td><td>34%</td></tr>
          <tr><td>60% (D−)</td><td>Secured, even with a 0</td></tr>
        </tbody>
      </table>
      <p>An 88% on that final would make the course grade 82 × 0.75 + 88 × 0.25 = <strong>83.5%</strong>.</p>
      <h3>Weighted grade so far</h3>
      <div className="formula">Homework 95 × 20 + Quizzes 88 × 20 + Midterm 78 × 25 + Project 91 × 15 = 6,975<br />6,975 ÷ (20 + 20 + 25 + 15) = 87.19%  →  B+  (with 20% of the course still to go)</div>

      <h2 id="scale">Letter grade scale</h2>
      <table>
        <thead><tr><th>Letter</th><th>Percent</th><th>Letter</th><th>Percent</th></tr></thead>
        <tbody>
          <tr><td>A</td><td>93–100</td><td>C+</td><td>77–79</td></tr>
          <tr><td>A−</td><td>90–92</td><td>C</td><td>73–76</td></tr>
          <tr><td>B+</td><td>87–89</td><td>C−</td><td>70–72</td></tr>
          <tr><td>B</td><td>83–86</td><td>D+</td><td>67–69</td></tr>
          <tr><td>B−</td><td>80–82</td><td>D</td><td>63–66</td></tr>
          <tr><td>F</td><td>below 60</td><td>D−</td><td>60–62</td></tr>
        </tbody>
      </table>
      <p>This is a common US scale; your instructor&apos;s syllabus is the final word. To turn letter grades into a GPA, use the <Link href="/gpa-calculator/">GPA calculator</Link>.</p>

      <h2 id="tips">Tips for the final stretch</h2>
      <ul>
        <li><strong>Know the weight:</strong> a final worth 40% can swing your grade far more than one worth 15%, so plan study time accordingly.</li>
        <li><strong>Check for dropped scores:</strong> many courses drop the lowest quiz or homework, which can raise your current grade.</li>
        <li><strong>Taking AP exams too?</strong> Estimate your scores with the <Link href="/ap-biology-score-calculator/">AP Biology</Link> and <Link href="/ap-world-history-score-calculator/">AP World History</Link> score calculators.</li>
        <li><strong>Points-based courses:</strong> points earned ÷ points possible gives your percentage; the <Link href="/ratio-calculator/">ratio calculator</Link> helps with tricky fractions.</li>
      </ul>
      <p>More <Link href="/category/education/">education calculators</Link>.</p>
    </>
  );
}
