import Link from "next/link";

/** Brief + competitor findings: docs/research/macro-calculator.md · research/macro-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the macro calculator</h2>
      <ol>
        <li>Enter your sex, age, height and weight, and pick the activity level that matches a typical week.</li>
        <li>Choose a goal: lose, maintain or gain. If you already know your calorie target, type it in instead.</li>
        <li>Pick a macro split (balanced, high protein, low carb, keto or your own percentages) and how many meals you eat.</li>
        <li>Read your daily grams of <strong>protein, carbs and fat</strong>, the grams per meal, and a check against official healthy ranges.</li>
      </ol>

      <h2 id="formulas">Macro formulas</h2>
      <div className="formula">BMR (Mifflin–St Jeor) = 10 × kg + 6.25 × cm − 5 × age + 5 (men) or − 161 (women)<br />Maintenance calories = BMR × activity level (1.4 to 2.2)<br />Target calories = maintenance ± goal (for example −500 to lose, +250 to gain slowly)<br />Protein (g) = calories × protein % ÷ 4 · Carbs (g) = calories × carb % ÷ 4 · Fat (g) = calories × fat % ÷ 9</div>
      <p>Protein and carbohydrate provide about <strong>4 kcal per gram</strong> and fat about <strong>9 kcal per gram</strong>, which is why the same percentage gives fewer grams of fat.</p>

      <h2 id="example">Worked example</h2>
      <p>A 35-year-old man, 5 ft 10 in (177.8 cm), 180 lb (81.6 kg), lightly active:</p>
      <ul>
        <li>BMR = 10 × 81.65 + 6.25 × 177.8 − 5 × 35 + 5 = <strong>1,758 kcal</strong>.</li>
        <li>Maintenance = 1,758 × 1.55 = <strong>2,724 kcal</strong>.</li>
        <li>Balanced split (25% protein, 50% carbs, 25% fat): <strong>170 g protein</strong> (681 kcal ÷ 4), <strong>341 g carbs</strong> and <strong>76 g fat</strong> (681 kcal ÷ 9).</li>
        <li>To lose weight with high protein (35/40/25) at 2,224 kcal: <strong>195 g protein</strong> (2.4 g/kg), 222 g carbs and 62 g fat.</li>
      </ul>

      <h2 id="ranges">What the healthy ranges mean</h2>
      <ul>
        <li><strong>Acceptable Macronutrient Distribution Ranges (AMDR)</strong> from the National Academies for adults: carbohydrate <strong>45–65%</strong>, protein <strong>10–35%</strong> and fat <strong>20–35%</strong> of calories. The calculator marks any macro outside these ranges. Low-carb and keto diets deliberately fall outside them.</li>
        <li><strong>Protein by body weight:</strong> the RDA is <strong>0.8 g per kg</strong>, the minimum for nearly all healthy adults. The International Society of Sports Nutrition suggests <strong>1.4–2.0 g/kg</strong> for most people who exercise, and up to 2.3–3.1 g/kg for lean, resistance-trained people who are cutting calories.</li>
        <li><strong>Fiber:</strong> about <strong>14 g per 1,000 kcal</strong>, the Adequate Intake used in the Dietary Guidelines.</li>
      </ul>

      <h2 id="splits">Choosing a macro split</h2>
      <ul>
        <li><strong>Balanced (25/50/25):</strong> fits inside every official range; a good default.</li>
        <li><strong>High protein (35/40/25):</strong> helps keep muscle and stay full while losing weight.</li>
        <li><strong>Low carb (30/30/40)</strong> and <strong>keto (20/5/75):</strong> lower in carbohydrate than the AMDR; choose them deliberately and watch fiber.</li>
        <li>Total calories drive weight change; the split mainly affects fullness, training performance and how easy the plan is to follow. Re-check your weight trend every 2–3 weeks and adjust calories by 100–200 kcal if needed.</li>
      </ul>
      <p>Breastfeeding? Use the <Link href="/breastfeeding-calorie-calculator/">breastfeeding calorie calculator</Link>, which adds the energy needed for milk. To set protein from lean mass, estimate it with the <Link href="/body-fat-calculator/">body fat calculator</Link> or the <Link href="/ffmi-calculator/">FFMI calculator</Link>, and plan fluids with the <Link href="/water-intake-calculator/">water intake calculator</Link>. More <Link href="/category/health/">health calculators</Link>.</p>
    </>
  );
}
