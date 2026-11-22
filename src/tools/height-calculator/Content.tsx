import Link from "next/link";

/** Brief + competitor findings: docs/research/height-calculator.md · research/height-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the height calculator</h2>
      <ol>
        <li>Choose boy or girl and enter the child&apos;s age, current height and weight (measure without shoes).</li>
        <li>Enter the biological mother&apos;s and father&apos;s heights.</li>
        <li>For ages 4 to 17½ you get a <strong>Khamis-Roche prediction</strong>; for any age you also get the <strong>mid-parental target height</strong> and its usual range.</li>
      </ol>

      <h2 id="formula">Formulas</h2>
      <h3>Khamis-Roche method</h3>
      <div className="formula">Adult height (in) = B₀ + b₁ × height (in) + b₂ × weight (lb) + b₃ × mid-parent height (in)<br />Mid-parent height = (mother + father) ÷ 2</div>
      <p>B₀, b₁, b₂ and b₃ are published for boys and girls at each half year from age 4 to 17½ (Khamis &amp; Roche, <em>Pediatrics</em>, 1994). The calculator interpolates between half years for the exact age.</p>
      <h3>Mid-parental (target) height</h3>
      <div className="formula">Boys: (mother + father + 13 cm) ÷ 2 · Girls: (mother + father − 13 cm) ÷ 2 · usual range ±8.5 cm</div>

      <h2 id="example">Worked example</h2>
      <p>A 10-year-old boy is 4 ft 7 in (55 in) and weighs 75 lb; his mother is 5 ft 4 in and his father 5 ft 10 in. The age-10 coefficients for boys are B₀ = −11.038, b₁ = 0.97135, b₂ = −0.03998 and b₃ = 0.45932, and the mid-parent height is 67 in:</p>
      <div className="formula">−11.038 + 0.97135 × 55 − 0.03998 × 75 + 0.45932 × 67 = 70.2 in ≈ 5 ft 10.2 in</div>
      <p>He has reached about <strong>78%</strong> of his predicted adult height. His mid-parental target is (64 + 70 + 5.1) ÷ 2 = <strong>69.6 in</strong> (5 ft 9.6 in), with a usual range of about 5 ft 6.2 in to 6 ft 0.9 in.</p>

      <h2 id="factors">What affects how tall a child grows</h2>
      <ul>
        <li><strong>Genetics</strong>: the parents&apos; heights explain much of the variation, which is why both methods use them.</li>
        <li><strong>Puberty timing</strong>: early developers are taller for their age but may finish growing sooner.</li>
        <li><strong>Nutrition, sleep and health</strong>: chronic illness or poor nutrition can limit growth.</li>
      </ul>
      <p>Related tools: work out an exact age with the <Link href="/age-calculator/">age calculator</Link>, check the <Link href="/bmi-women-calculator/">BMI calculator for women</Link>, or see how high you need to jump with the <Link href="/dunk-calculator/">dunk calculator</Link>. More <Link href="/category/health/">health and fitness calculators</Link>.</p>
    </>
  );
}
