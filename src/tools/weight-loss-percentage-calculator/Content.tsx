import Link from "next/link";

/** Brief + competitor findings: docs/research/weight-loss-percentage-calculator.md · research/weight-loss-percentage-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the weight loss percentage calculator</h2>
      <ol>
        <li>Choose pounds or kilograms and enter your starting and current weight.</li>
        <li>Add a goal weight to see how far along you are, and the number of weeks to get your weekly average, a progress chart and a projection of when you&apos;ll reach the goal at your current pace.</li>
        <li>Check the milestone table for your 5%, 10%, 15% and 20% target weights.</li>
      </ol>

      <h2 id="formulas">Weight loss percentage formulas</h2>
      <div className="formula">Weight lost = starting weight − current weight<br />Weight loss % = weight lost ÷ starting weight × 100<br />Progress to goal = weight lost ÷ (starting weight − goal weight) × 100<br />Milestone weight = starting weight × (1 − milestone %)</div>

      <h2 id="example">Worked example</h2>
      <p>Starting at 160 lb, now 145 lb after 10 weeks, with a goal of 140 lb:</p>
      <ul>
        <li>Weight lost = 160 − 145 = 15 lb. Percentage = 15 ÷ 160 × 100 = <strong>9.38%</strong>.</li>
        <li>Goal: 160 − 140 = 20 lb to lose, so 15 ÷ 20 = <strong>75% of the way</strong>, with 5 lb to go.</li>
        <li>Weekly average = 15 ÷ 10 = <strong>1.5 lb a week</strong>, about 0.94% of the starting weight per week. At that pace the last 5 lb take 5 ÷ 1.5 = 3.3, so about <strong>4 more weeks</strong>.</li>
        <li>Milestones: 5% = 152 lb (reached), 10% = 144 lb (1 lb to go), 15% = 136 lb.</li>
      </ul>

      <h2 id="table">Same pounds, different percentages</h2>
      <table>
        <thead><tr><th>Starting weight</th><th>Lost 10 lb</th><th>Lost 20 lb</th><th>Lost 30 lb</th></tr></thead>
        <tbody>
          <tr><td>150 lb</td><td>6.7%</td><td>13.3%</td><td>20.0%</td></tr>
          <tr><td>200 lb</td><td>5.0%</td><td>10.0%</td><td>15.0%</td></tr>
          <tr><td>250 lb</td><td>4.0%</td><td>8.0%</td><td>12.0%</td></tr>
          <tr><td>300 lb</td><td>3.3%</td><td>6.7%</td><td>10.0%</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Tracking tips</h2>
      <ul>
        <li>Weigh at the same time of day, ideally in the morning before eating, on the same scale.</li>
        <li>Day-to-day weight can swing by a pound or two from water and food; look at the weekly trend.</li>
        <li>Progress often slows over time; a smaller weekly percentage later on is normal.</li>
        <li>Talk to a doctor before large or rapid weight changes, especially with a health condition.</li>
      </ul>
      <p>Find the weight for a target BMI with the <Link href="/reverse-bmi-calculator/">reverse BMI calculator</Link>, estimate your daily calorie burn with the <Link href="/bmr-calculator/">BMR calculator</Link>, plan your protein, carbs and fat with the <Link href="/macro-calculator/">macro calculator</Link>, or work out any percent change with the <Link href="/percent-calculator/">percent calculator</Link>. More <Link href="/category/health/">health calculators</Link>.</p>
    </>
  );
}
