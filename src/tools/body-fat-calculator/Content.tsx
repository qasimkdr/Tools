import Link from "next/link";

/** Brief + competitor findings: docs/research/body-fat-calculator.md · research/body-fat-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the body fat calculator</h2>
      <ol>
        <li>Choose male or female and your units.</li>
        <li>Measure your <strong>height, neck and waist</strong> (and <strong>hips</strong> for women) with a flexible tape. Add weight and age for fat mass and the BMI comparison.</li>
        <li>Read your body fat percentage, category, fat mass and lean mass. Re-measure every few weeks at the same time of day to track the trend.</li>
      </ol>

      <h2 id="formula">U.S. Navy body fat formulas</h2>
      <div className="formula">Men: %BF = 86.010 × log₁₀(waist − neck) − 70.041 × log₁₀(height) + 36.76<br />Women: %BF = 163.205 × log₁₀(waist + hip − neck) − 97.684 × log₁₀(height) − 78.387<br />(all measurements in inches)</div>
      <div className="formula">Fat mass = weight × %BF ÷ 100 · Lean mass = weight − fat mass</div>

      <h2 id="example">Worked examples</h2>
      <p><strong>Man</strong>, 70 in tall, neck 15 in, waist 34 in, 180 lb: 86.010 × log₁₀(19) − 70.041 × log₁₀(70) + 36.76 = 110.0 − 129.2 + 36.8 = <strong>17.5%</strong>, the fitness category. Fat mass = 180 × 0.175 = <strong>31.5 lb</strong>; lean mass 148.5 lb.</p>
      <p><strong>Woman</strong>, 65 in tall, neck 13 in, waist 30 in, hips 40 in, 140 lb: 163.205 × log₁₀(57) − 97.684 × log₁₀(65) − 78.387 = <strong>31.1%</strong>, the average category, or about 43.5 lb of fat.</p>

      <h2 id="categories">Body fat categories (ACE)</h2>
      <table>
        <thead><tr><th>Category</th><th>Men</th><th>Women</th></tr></thead>
        <tbody>
          <tr><td>Essential fat</td><td>2–5%</td><td>10–13%</td></tr>
          <tr><td>Athletes</td><td>6–13%</td><td>14–20%</td></tr>
          <tr><td>Fitness</td><td>14–17%</td><td>21–24%</td></tr>
          <tr><td>Average</td><td>18–24%</td><td>25–31%</td></tr>
          <tr><td>Obese</td><td>25%+</td><td>32%+</td></tr>
        </tbody>
      </table>
      <p>Women carry more essential fat than men for reproductive and hormonal functions, which is why every range is higher.</p>

      <h2 id="methods">Other ways to measure body fat</h2>
      <ul>
        <li><strong>DEXA scan</strong>: X-ray based and among the most accurate, but costs money.</li>
        <li><strong>Skinfold calipers</strong>: accurate in trained hands; results vary between testers.</li>
        <li><strong>Bioelectrical impedance</strong> (smart scales): convenient but affected by hydration.</li>
        <li><strong>BMI</strong>: quick, but doesn&apos;t distinguish fat from muscle.</li>
      </ul>
      <p>Building muscle? The <Link href="/ffmi-calculator/">FFMI calculator</Link> uses your body fat to judge muscularity. Women can also check the <Link href="/bmi-women-calculator/">BMI calculator for women</Link>, and soldiers should use the <Link href="/army-body-fat-calculator/">Army body fat calculator</Link>, which follows current Army rules. More <Link href="/category/health/">health and fitness calculators</Link>.</p>
    </>
  );
}
