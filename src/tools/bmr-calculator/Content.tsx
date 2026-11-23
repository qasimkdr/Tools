import Link from "next/link";

/** Brief + competitor findings: docs/research/bmr-calculator.md · research/bmr-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the BMR calculator</h2>
      <ol>
        <li>Choose units and sex, then enter your age, height and weight.</li>
        <li>If you know your body fat percentage, enter it to add the Katch–McArdle result.</li>
        <li>Compare the equations, then read your estimated daily calories for each activity level.</li>
      </ol>

      <h2 id="formulas">BMR formulas</h2>
      <div className="formula">Mifflin–St Jeor: men = 10 × kg + 6.25 × cm − 5 × age + 5; women = 10 × kg + 6.25 × cm − 5 × age − 161<br />Harris–Benedict (revised 1984): men = 88.362 + 13.397 × kg + 4.799 × cm − 5.677 × age; women = 447.593 + 9.247 × kg + 3.098 × cm − 4.330 × age<br />Katch–McArdle: 370 + 21.6 × lean body mass (kg), where lean mass = weight × (1 − body fat %)<br />Daily calories (TDEE) = BMR × activity level</div>

      <h2 id="example">Worked example</h2>
      <p>A 35-year-old man, 5 ft 10 in (177.8 cm), 180 lb (81.65 kg), with 20% body fat:</p>
      <ul>
        <li><strong>Mifflin–St Jeor:</strong> 816.5 + 1,111.3 − 175 + 5 = <strong>1,758 kcal/day</strong>.</li>
        <li><strong>Harris–Benedict (revised):</strong> 88.4 + 1,093.8 + 853.3 − 198.7 = <strong>1,837 kcal/day</strong>.</li>
        <li><strong>Katch–McArdle:</strong> lean mass 65.3 kg → 370 + 21.6 × 65.3 = <strong>1,781 kcal/day</strong>.</li>
        <li>Lightly active (× 1.55), he needs about 1,758 × 1.55 = <strong>2,724 kcal a day</strong> to maintain his weight.</li>
      </ul>

      <h2 id="which">Which BMR equation should I use?</h2>
      <ul>
        <li><strong>Mifflin–St Jeor</strong> is the usual default. It was built in 1990 from 498 healthy adults aged 19–78, including people with obesity, and its authors found the older Harris–Benedict equations overestimated measured resting energy by about 5%.</li>
        <li><strong>Harris–Benedict (revised)</strong> re-fitted the 1919 equations in 1984. Its authors put its precision for healthy people at about 14%, and it is unreliable for malnourished patients.</li>
        <li><strong>Katch–McArdle</strong> uses lean body mass, so it can suit very lean or muscular people better, as long as your body fat estimate is good.</li>
        <li>When the equations disagree, the gap shows how uncertain any single estimate is. Track your weight for 2–3 weeks and adjust.</li>
      </ul>

      <h2 id="bmr-vs-tdee">BMR vs TDEE</h2>
      <p><strong>BMR</strong> is what you burn lying still. <strong>TDEE</strong> (total daily energy expenditure) adds movement and digestion. The activity levels here follow the FAO/WHO/UNU bands: sedentary or light 1.40–1.69, active or moderately active 1.70–1.99, vigorous 2.00 or more. Don&apos;t eat below your BMR for long without medical supervision.</p>
      <p>Turn your calories into protein, carbs and fat with the <Link href="/macro-calculator/">macro calculator</Link>, estimate body fat for Katch–McArdle with the <Link href="/body-fat-calculator/">body fat calculator</Link>, or check muscularity with the <Link href="/ffmi-calculator/">FFMI calculator</Link>. Breastfeeding? Use the <Link href="/breastfeeding-calorie-calculator/">breastfeeding calorie calculator</Link>. More <Link href="/category/health/">health calculators</Link>.</p>
    </>
  );
}
