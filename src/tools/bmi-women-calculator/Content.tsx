import Link from "next/link";

/** Brief + competitor findings: docs/research/bmi-women-calculator.md · research/bmi-women-calculator/report.md (YMYL: health) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the BMI calculator for women</h2>
      <ol>
        <li><strong>Choose your units</strong> and enter your height and weight.</li>
        <li><strong>Optionally add your waist size and age</strong> for a waist-to-height ratio and the right guidance for teens.</li>
        <li><strong>Read your BMI and category</strong>, the healthy weight range for your height, and the recommended pregnancy weight gain for your BMI.</li>
      </ol>

      <h2 id="formula">BMI formula</h2>
      <div className="formula">BMI = weight (kg) ÷ height (m)²<br />BMI = 703 × weight (lb) ÷ height (in)²<br />Healthy weight range = 18.5 × height² to 24.9 × height²</div>

      <h2 id="example">Example</h2>
      <p>A woman who is 5 ft 5 in (65 inches) and weighs 160 lb:</p>
      <div className="formula">BMI = 703 × 160 ÷ 65² = 703 × 160 ÷ 4,225 = 26.6  →  Overweight<br />Healthy range at 65 in: 111 – 150 lb  ·  to reach BMI 24.9: about 10 lb</div>
      <p>In metric, a woman 165 cm tall weighing 60 kg has a BMI of 60 ÷ 1.65² = 22.0, in the healthy range of 50.4 to 67.8 kg.</p>

      <h2 id="chart">BMI categories for adult women</h2>
      <table>
        <thead><tr><th>BMI</th><th>Category</th><th>At 5 ft 5 in</th></tr></thead>
        <tbody>
          <tr><td>Under 18.5</td><td>Underweight</td><td>under 111 lb</td></tr>
          <tr><td>18.5 – 24.9</td><td>Healthy weight</td><td>111 – 149 lb</td></tr>
          <tr><td>25.0 – 29.9</td><td>Overweight</td><td>150 – 179 lb</td></tr>
          <tr><td>30.0 – 34.9</td><td>Obesity, class 1</td><td>180 – 209 lb</td></tr>
          <tr><td>35.0 – 39.9</td><td>Obesity, class 2</td><td>210 – 239 lb</td></tr>
          <tr><td>40 or more</td><td>Obesity, class 3</td><td>240 lb or more</td></tr>
        </tbody>
      </table>
      <p>Categories from the CDC&apos;s{" "}
        <a href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" rel="noopener" target="_blank">adult BMI categories</a>. They apply to adults 20 and older, whatever their sex.</p>

      <h2 id="women">What&apos;s different for women</h2>
      <ul>
        <li><strong>More body fat at the same BMI:</strong> women naturally carry more essential fat than men, so BMI is a rougher guide to body fat for women. Waist size adds useful information.</li>
        <li><strong>Pregnancy:</strong> BMI isn&apos;t used while pregnant. Your pre-pregnancy BMI sets the recommended weight gain, which the calculator shows (single baby, from the{" "}
          <a href="https://www.cdc.gov/maternal-infant-health/pregnancy-weight/" rel="noopener" target="_blank">CDC&apos;s pregnancy weight gain guidance</a>).</li>
        <li><strong>Menopause and aging:</strong> muscle tends to decline and fat shifts toward the waist, so the same BMI can hide more abdominal fat.</li>
        <li><strong>Cycle changes:</strong> water retention can shift weight by a few pounds across a menstrual cycle. Weigh at the same point each month for fair comparisons; the <Link href="/period-calculator/">period calculator</Link> helps you track it.</li>
      </ul>

      <h2 id="pregnancy">Pregnancy weight gain by pre-pregnancy BMI</h2>
      <table>
        <thead><tr><th>Pre-pregnancy BMI</th><th>Recommended total gain (single baby)</th></tr></thead>
        <tbody>
          <tr><td>Under 18.5</td><td>28 – 40 lb (12.5 – 18 kg)</td></tr>
          <tr><td>18.5 – 24.9</td><td>25 – 35 lb (11.5 – 16 kg)</td></tr>
          <tr><td>25.0 – 29.9</td><td>15 – 25 lb (7 – 11.5 kg)</td></tr>
          <tr><td>30 or more</td><td>11 – 20 lb (5 – 9 kg)</td></tr>
        </tbody>
      </table>
      <p>Twins and other multiples have different targets; your prenatal care provider will tailor them.</p>

      <h2 id="beyond">Beyond BMI</h2>
      <p>BMI is a quick, free screening number, but it can&apos;t tell muscle from fat. For a closer estimate of body composition from tape measurements, try the <Link href="/army-body-fat-calculator/">Army body fat calculator</Link>, which uses the waist-to-height method. If you&apos;re building strength, track progress with the <Link href="/bench-press-max-calculator/">bench press max calculator</Link> rather than the scale alone.</p>
      <p className="text-sm">For general information only, not medical advice. Talk to a doctor about your weight, especially if you&apos;re pregnant, breastfeeding, under 20 or have a medical condition. More <Link href="/category/health/">health calculators</Link>.</p>
    </>
  );
}
