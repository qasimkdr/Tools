import Link from "next/link";

/** Brief + competitor findings: docs/research/breastfeeding-calorie-calculator.md · research/breastfeeding-calorie-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the breastfeeding calorie calculator</h2>
      <ol>
        <li>Enter your age, height and <strong>current weight</strong>, and choose the activity level that fits a typical day.</li>
        <li>Choose your baby&apos;s age (0–6 or 7–12 months) and how much of your baby&apos;s milk is breast milk.</li>
        <li>Choose <strong>Maintain</strong> or <strong>Lose weight gradually</strong>. The result shows your daily calories and how they were worked out.</li>
      </ol>

      <h2 id="formulas">How the estimate is calculated</h2>
      <div className="formula">Resting needs (Mifflin–St Jeor, women) = 10 × weight (kg) + 6.25 × height (cm) − 5 × age − 161<br />Usual needs = resting needs × activity level (1.4 to 2.2)<br />Breastfeeding extra = 330 kcal (0–6 months) or 400 kcal (7–12 months) × share of breast milk<br />Gradual weight loss = maintenance − 500 kcal, never below 1,800 kcal</div>
      <ul>
        <li><strong>Why 330 and 400?</strong> The Dietary Guidelines for Americans 2020–2025 say exclusive breastfeeding needs about <strong>330 extra calories a day</strong> in the first 6 months and <strong>400</strong> in the second 6 months, compared with before pregnancy. Making milk takes about 500 kcal a day early on, but some of that energy comes from fat stored during pregnancy (about 170 kcal a day). Later, milk volume falls (from about 780 to 600 mL a day) and those stores are mostly used up.</li>
        <li><strong>Partial breastfeeding:</strong> if your baby also has formula or solids, you make less milk. The calculator scales the extra by your share (for example, half for about half). This is an approximation.</li>
        <li><strong>Activity levels</strong> follow the FAO/WHO/UNU bands: sedentary or light 1.40–1.69, active or moderately active 1.70–1.99, and vigorous 2.00 or more.</li>
      </ul>

      <h2 id="example">Worked example</h2>
      <p>A 30-year-old, 5 ft 5 in (165.1 cm), 150 lb (68.0 kg), lightly active, exclusively breastfeeding a 3-month-old:</p>
      <ul>
        <li>Resting needs = 10 × 68.04 + 6.25 × 165.1 − 5 × 30 − 161 = <strong>1,401 kcal</strong>.</li>
        <li>Usual needs = 1,401 × 1.55 = <strong>2,172 kcal</strong>.</li>
        <li>Plus 330 for breastfeeding = <strong>2,502 kcal a day</strong> to maintain weight.</li>
        <li>For gradual weight loss: 2,502 − 500 = <strong>2,002 kcal a day</strong>, which is above the 1,800 kcal minimum.</li>
      </ul>

      <h2 id="weight-loss">Losing weight safely while breastfeeding</h2>
      <ul>
        <li><strong>Go slowly.</strong> The Academy of Nutrition and Dietetics describes about <strong>1 pound a week</strong> (4 pounds a month) as a safe goal for breastfeeding mothers.</li>
        <li><strong>Don&apos;t drop below 1,800 kcal a day.</strong> The same guidance warns that eating less than that may reduce how much milk you make.</li>
        <li>Many women lose weight naturally in the first months because breastfeeding draws on fat stored during pregnancy.</li>
        <li>Favor nutrient-dense foods (vegetables, fruit, whole grains, protein foods, dairy or fortified alternatives) and drink to thirst. Your needs for some nutrients, such as iodine and choline, are higher while breastfeeding.</li>
        <li>If your supply drops, your baby has fewer wet diapers, or you feel unwell, eat more and talk to your healthcare provider.</li>
      </ul>
      <p>Plan protein, carbs and fat for your calories with the <Link href="/macro-calculator/">macro calculator</Link>, check your daily fluids with the <Link href="/water-intake-calculator/">water intake calculator</Link>, or see where your weight sits with the <Link href="/bmi-women-calculator/">BMI calculator for women</Link>. More <Link href="/category/health/">health calculators</Link>.</p>
    </>
  );
}
