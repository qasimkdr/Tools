import Link from "next/link";

/** Brief + competitor findings: docs/research/water-intake-calculator.md · research/water-intake-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the water intake calculator</h2>
      <ol>
        <li>Choose <strong>man, woman, pregnant or breastfeeding</strong>. The calculator looks up the adequate intake of total water for healthy adults.</li>
        <li>It subtracts the share that usually comes from food (about 19%) to show how much to <strong>drink</strong>, in liters, fluid ounces, cups and 500 mL bottles.</li>
        <li>Optional: on exercise days, enter your weight before and after the workout and what you drank during it to add the sweat you need to replace.</li>
      </ol>

      <h2 id="formula">Formula</h2>
      <div className="formula">Water from drinks = adequate intake of total water × 0.81<br />Sweat loss (L) = weight before − weight after (kg) + fluid drunk during exercise (L)<br />Daily target = water from drinks + sweat loss</div>
      <p>The adequate intakes come from the National Academies&apos; <em>Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate</em> (Institute of Medicine, 2005). They describe the average intake of healthy, well-hydrated people, not a strict minimum.</p>

      <h2 id="table">Daily water intake table</h2>
      <table>
        <thead><tr><th>Adult (19+)</th><th>Total water</th><th>From drinks</th><th>8-oz cups</th></tr></thead>
        <tbody>
          <tr><td>Men</td><td>3.7 L</td><td>3.0 L</td><td>12.7</td></tr>
          <tr><td>Women</td><td>2.7 L</td><td>2.2 L</td><td>9.2</td></tr>
          <tr><td>Pregnancy</td><td>3.0 L</td><td>2.4 L</td><td>10.3</td></tr>
          <tr><td>Breastfeeding</td><td>3.8 L</td><td>3.1 L</td><td>13.0</td></tr>
        </tbody>
      </table>

      <h2 id="example">Worked example</h2>
      <p>A man drinks about 3.7 × 0.81 = <strong>3.0 liters</strong> (101 fl oz, 12.7 cups) a day. After an hour-long run he weighs 1.3 lb less and drank 16 fl oz during it: sweat loss = 1.3 lb × 0.4536 = 0.59 kg + 0.47 L = <strong>1.06 L</strong>. His target that day is about <strong>4.1 liters</strong>.</p>

      <h2 id="needs">What changes how much water you need</h2>
      <ul>
        <li><strong>Heat and humidity</strong>: you sweat more, even at rest.</li>
        <li><strong>Exercise</strong>: replace what you lose; for long sessions, drinks with sodium help.</li>
        <li><strong>Illness</strong>: fever, vomiting and diarrhea all increase fluid loss.</li>
        <li><strong>Body size</strong>: larger and more active people generally need more. Weight-based rules such as &quot;half your body weight in ounces&quot; are popular but are not part of the official intakes.</li>
      </ul>
      <p>Tracking other health numbers? Try the <Link href="/bmi-women-calculator/">BMI calculator for women</Link>, the <Link href="/ffmi-calculator/">FFMI calculator</Link> or the <Link href="/steps-to-miles-calculator/">steps to miles calculator</Link>. More <Link href="/category/health/">health and fitness calculators</Link>.</p>
    </>
  );
}
