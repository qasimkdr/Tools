import Link from "next/link";

/** Brief + competitor findings: docs/research/blood-pressure-by-age-calculator.md · research/blood-pressure-by-age-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the blood pressure calculator</h2>
      <ol>
        <li>Enter your age (the categories apply to adults 18 and over).</li>
        <li>Enter your <strong>systolic</strong> (top) and <strong>diastolic</strong> (bottom) numbers. Add a second and third reading to average them.</li>
        <li>See your category, where it sits on the AHA/ACC chart, your pulse pressure and mean arterial pressure.</li>
      </ol>

      <h2 id="chart">Blood pressure chart for adults</h2>
      <table>
        <thead><tr><th>Category</th><th>Systolic (mmHg)</th><th></th><th>Diastolic (mmHg)</th></tr></thead>
        <tbody>
          <tr><td>Normal</td><td>below 120</td><td>and</td><td>below 80</td></tr>
          <tr><td>Elevated</td><td>120–129</td><td>and</td><td>below 80</td></tr>
          <tr><td>Stage 1 hypertension</td><td>130–139</td><td>or</td><td>80–89</td></tr>
          <tr><td>Stage 2 hypertension</td><td>140 or higher</td><td>or</td><td>90 or higher</td></tr>
        </tbody>
      </table>
      <p>These are the categories in the American Heart Association and American College of Cardiology&apos;s 2025 high blood pressure guideline, which kept the 2017 thresholds. The same chart applies at 25, 50 or 80 years old.</p>

      <h2 id="age">Does normal blood pressure change with age?</h2>
      <p>The <strong>target doesn&apos;t change</strong> for adults: below 120/80 is normal at any age. What changes is how common high readings are. Arteries tend to stiffen with age, so systolic pressure usually creeps up over the decades, which is why more older adults fall into the elevated and hypertension categories. Charts that list a higher &quot;normal&quot; for older ages are showing averages, and average isn&apos;t the same as healthy.</p>
      <p>For <strong>children and teens</strong>, doctors compare readings with percentile tables based on age, sex and height, so a single adult-style cut-off doesn&apos;t apply. Ask your child&apos;s pediatrician.</p>

      <h2 id="formula">Other numbers on this page</h2>
      <div className="formula">Pulse pressure = systolic − diastolic<br />Mean arterial pressure = diastolic + (systolic − diastolic) ÷ 3</div>
      <p><strong>Example:</strong> 128/78 is <strong>elevated</strong> (systolic 120–129, diastolic below 80). Pulse pressure is 50 mmHg and mean arterial pressure about 95 mmHg.</p>

      <h2 id="lower">Habits that help lower blood pressure</h2>
      <ul>
        <li>Eat less sodium and more fruit, vegetables and whole grains.</li>
        <li>Stay active most days and keep a healthy weight.</li>
        <li>Limit alcohol, don&apos;t smoke, and get enough sleep.</li>
        <li>Take medicines exactly as prescribed, and check your blood pressure at home if your doctor recommends it.</li>
      </ul>
      <p>Related health tools: the <Link href="/body-fat-calculator/">body fat calculator</Link>, the <Link href="/bmi-women-calculator/">BMI calculator for women</Link> and the <Link href="/water-intake-calculator/">water intake calculator</Link>. More <Link href="/category/health/">health and fitness calculators</Link>.</p>
    </>
  );
}
