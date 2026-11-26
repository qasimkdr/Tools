import Link from "next/link";

/** Brief + competitor findings: docs/research/reverse-bmi-calculator.md · research/reverse-bmi-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the reverse BMI calculator</h2>
      <ol>
        <li>Choose US or metric units and enter your height.</li>
        <li>Enter the BMI you want to reach. 22 sits in the middle of the healthy range; 24.9 is its top.</li>
        <li>Optionally add your current weight and a weekly rate to see how far you are from the target and roughly how long it would take.</li>
      </ol>

      <h2 id="formulas">Reverse BMI formulas</h2>
      <div className="formula">Weight (kg) = BMI × height (m)²<br />Weight (lb) = BMI × height (in)² ÷ 703<br />BMI = weight (kg) ÷ height (m)² = 703 × weight (lb) ÷ height (in)²</div>

      <h2 id="example">Worked example</h2>
      <p>A person 5 ft 9 in tall (69 inches) weighing 180 lb:</p>
      <ul>
        <li>Current BMI = 703 × 180 ÷ 69² = <strong>26.6</strong>, in the overweight range.</li>
        <li>Weight at a BMI of 22 = 22 × 4,761 ÷ 703 = <strong>149.0 lb</strong>, a change of 31.0 lb.</li>
        <li>Healthy range (BMI 18.5–24.9) = <strong>125.3 to 168.6 lb</strong>, so 11.4 lb would reach the top of it.</li>
        <li>At 1 lb a week, reaching 149 lb takes about 31 weeks.</li>
        <li>Metric: at 175 cm, a BMI of 22 is 22 × 1.75² = <strong>67.4 kg</strong>; the healthy range is 56.7 to 76.3 kg.</li>
      </ul>

      <h2 id="categories">Adult BMI categories</h2>
      <table>
        <thead><tr><th>Category</th><th>Standard (WHO / CDC)</th><th>Asian action points (WHO 2004)</th></tr></thead>
        <tbody>
          <tr><td>Underweight</td><td>Below 18.5</td><td>Below 18.5</td></tr>
          <tr><td>Healthy weight</td><td>18.5 to 24.9</td><td>18.5 to 22.9</td></tr>
          <tr><td>Overweight / increased risk</td><td>25.0 to 29.9</td><td>23.0 to 27.4</td></tr>
          <tr><td>Obesity / high risk</td><td>30.0 and above</td><td>27.5 and above</td></tr>
        </tbody>
      </table>

      <h2 id="limits">Things to keep in mind</h2>
      <ul>
        <li>BMI doesn&apos;t measure body fat directly. Two people with the same BMI can have very different body composition.</li>
        <li>A healthy range spans 30 lb or more for most adults; there isn&apos;t one ideal number.</li>
        <li>These categories are for adults 20 and over. Children and teens use BMI-for-age percentiles.</li>
        <li>Talk to a doctor or dietitian before a large weight change, especially with a health condition.</li>
      </ul>
      <p>Check your BMI and category with the <Link href="/bmi-women-calculator/">BMI calculator for women</Link>, estimate body fat with the <Link href="/body-fat-calculator/">body fat calculator</Link>, find your resting calorie burn with the <Link href="/bmr-calculator/">BMR calculator</Link>, or plan protein, carbs and fat with the <Link href="/macro-calculator/">macro calculator</Link>. More <Link href="/category/health/">health calculators</Link>.</p>
    </>
  );
}
