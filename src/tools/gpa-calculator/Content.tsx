import Link from "next/link";

/** Brief + competitor findings: docs/research/gpa-calculator.md · research/gpa-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the GPA calculator</h2>
      <ol>
        <li><strong>Add your classes:</strong> pick each letter grade and enter the class&apos;s credits (or hours). For high school classes without credits, use 1 for every class.</li>
        <li><strong>Set the level</strong> (Regular, Honors or AP/IB) to see your weighted GPA alongside the unweighted one.</li>
        <li><strong>Optional:</strong> enter your current GPA and credits for a cumulative GPA, and a target GPA to see what you&apos;d need next term.</li>
      </ol>

      <h2 id="formula">How GPA is calculated</h2>
      <div className="formula">Quality points = grade points × credits<br />GPA = total quality points ÷ total credits<br />Cumulative GPA = (old GPA × old credits + new quality points) ÷ (old credits + new credits)</div>

      <h2 id="scale">4.0 grade scale</h2>
      <table>
        <thead><tr><th>Letter</th><th>Points</th><th>Typical %</th><th>Letter</th><th>Points</th><th>Typical %</th></tr></thead>
        <tbody>
          <tr><td>A+ / A</td><td>4.0</td><td>93–100</td><td>C</td><td>2.0</td><td>73–76</td></tr>
          <tr><td>A-</td><td>3.7</td><td>90–92</td><td>C-</td><td>1.7</td><td>70–72</td></tr>
          <tr><td>B+</td><td>3.3</td><td>87–89</td><td>D+</td><td>1.3</td><td>67–69</td></tr>
          <tr><td>B</td><td>3.0</td><td>83–86</td><td>D</td><td>1.0</td><td>63–66</td></tr>
          <tr><td>B-</td><td>2.7</td><td>80–82</td><td>D-</td><td>0.7</td><td>60–62</td></tr>
          <tr><td>C+</td><td>2.3</td><td>77–79</td><td>F</td><td>0.0</td><td>below 60</td></tr>
        </tbody>
      </table>
      <p>Percentage ranges vary between schools. Use your syllabus or school handbook for the exact cutoffs. Weighted scales typically add <strong>+0.5 for Honors</strong> and <strong>+1.0 for AP, IB or dual-enrollment</strong> (so an AP A = 5.0), but some schools use different bonuses or cap weighted GPA.</p>

      <h2 id="examples">Worked examples</h2>
      <h3>One semester</h3>
      <p>English A (3 credits), Biology B+ (4), History A- (3), Art C (2): quality points = 12 + 13.2 + 11.1 + 4 = 40.3, over 12 credits = <strong>3.36</strong>. If Biology were an AP class, its B+ would count as 4.3 and the weighted GPA would be <strong>3.69</strong>.</p>
      <h3>Cumulative GPA</h3>
      <p>A 3.2 GPA over 30 credits plus a 3.8 semester of 15 credits: (3.2 × 30 + 3.8 × 15) ÷ 45 = <strong>3.40</strong>.</p>
      <h3>Can I reach a 3.5?</h3>
      <p>With a 3.40 over 45 credits, reaching 3.5 after 15 more credits needs (3.5 × 60 − 3.40 × 45) ÷ 15 = <strong>3.80</strong> next term. Enter your own numbers in the target planner.</p>

      <h2 id="good">What counts as a good GPA?</h2>
      <ul>
        <li><strong>3.0 (B average):</strong> meets many scholarship, transfer and graduate program minimums.</li>
        <li><strong>3.5+:</strong> competitive for selective colleges, honors programs and many merit scholarships.</li>
        <li><strong>Context matters:</strong> colleges look at course rigor too. A 3.6 with AP classes can look stronger than a 3.9 without them.</li>
      </ul>

      <h2 id="tips">Tips to raise your GPA</h2>
      <ul>
        <li><strong>Prioritize high-credit classes:</strong> a 4-credit class moves your GPA twice as much as a 2-credit one.</li>
        <li><strong>Act early:</strong> each new term has less effect as total credits grow, so early improvements count most.</li>
        <li><strong>Ask about grade replacement</strong> for retaken classes, and check pass/fail rules before choosing that option.</li>
        <li><strong>Know your grade before the final:</strong> work backwards from the score you need with grade and weighting tools.</li>
      </ul>
      <p>Taking AP exams? Estimate your score with the <Link href="/ap-world-history-score-calculator/">AP World History score calculator</Link>. To see how a class grade percentage maps to a ratio or fraction, try the <Link href="/ratio-calculator/">ratio calculator</Link>. More <Link href="/category/education/">education calculators</Link>.</p>
      <p className="text-sm">This is an unofficial estimate. Your school&apos;s registrar calculates your official GPA.</p>
    </>
  );
}
