import Link from "next/link";

/** Brief + competitor findings: docs/research/protein-calculator.md · research/protein-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the protein calculator</h2>
      <ol>
        <li>Enter your body weight in pounds or kilograms.</li>
        <li>Pick the description that fits you best: everyday health, regular exercise, cutting while lifting, age 65+, or pregnancy and breastfeeding.</li>
        <li>Read your daily protein range in grams, the amount per meal, and (if you enter your calories) protein as a share of your diet.</li>
      </ol>

      <h2 id="formulas">Protein formula</h2>
      <div className="formula">Protein (g/day) = body weight (kg) × target (g/kg)<br />Body weight (kg) = pounds × 0.4536<br />Per meal = daily protein ÷ meals · Protein % of calories = grams × 4 ÷ calories × 100</div>

      <h2 id="targets">Where the targets come from</h2>
      <ul>
        <li><strong>0.8 g/kg:</strong> the Recommended Dietary Allowance, the amount that meets the needs of nearly all healthy adults.</li>
        <li><strong>1.0–1.2 g/kg for people over 65:</strong> the PROT-AGE study group recommends at least this to help maintain and regain muscle and function, and 1.2 g/kg or more for those who exercise. (Some people with advanced kidney disease need to limit protein instead.)</li>
        <li><strong>1.4–2.0 g/kg if you exercise:</strong> the International Society of Sports Nutrition says this is enough for most exercising people to build and keep muscle.</li>
        <li><strong>2.3–3.1 g/kg when lean and cutting:</strong> the same position stand notes resistance-trained people may need this much to keep lean mass while eating fewer calories.</li>
        <li><strong>1.1–1.3 g/kg in pregnancy and breastfeeding:</strong> the US Dietary Reference Intakes raise protein needs in these stages.</li>
      </ul>

      <h2 id="example">Worked example</h2>
      <p>A 180 lb person who exercises regularly: 180 × 0.4536 = <strong>81.6 kg</strong>.</p>
      <ul>
        <li>Daily target: 81.6 × 1.4 = 114 g to 81.6 × 2.0 = 163 g, so <strong>114–163 g of protein a day</strong>.</li>
        <li>Over 4 meals: <strong>29–41 g per meal</strong>.</li>
        <li>At the RDA (0.8 g/kg) the same person would need only <strong>65 g</strong>.</li>
        <li>On 2,500 kcal a day, 114–163 g is 18–26% of calories, inside the healthy adult range of 10–35%.</li>
      </ul>

      <h2 id="tips">Spreading your protein</h2>
      <ul>
        <li>The ISSN suggests about <strong>0.25 g/kg of high-quality protein per meal</strong> (roughly 20–40 g), spread every 3–4 hours.</li>
        <li>Mix sources: meat, fish, eggs, dairy, beans, lentils, tofu and soy foods. Plant eaters can meet targets by combining sources across the day.</li>
        <li>More protein doesn&apos;t replace total calories and training: muscle gain needs a training stimulus and enough energy.</li>
      </ul>
      <p>Plan carbs and fat around your protein with the <Link href="/macro-calculator/">macro calculator</Link>, estimate your calorie needs with the <Link href="/bmr-calculator/">BMR calculator</Link>, or base targets on lean mass with the <Link href="/body-fat-calculator/">body fat calculator</Link>. More <Link href="/category/health/">health calculators</Link>.</p>
    </>
  );
}
