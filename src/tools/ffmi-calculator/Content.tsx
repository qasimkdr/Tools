import Link from "next/link";

/** Brief + competitor findings: docs/research/ffmi-calculator.md · research/ffmi-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the FFMI calculator</h2>
      <ol>
        <li><strong>Enter your height and weight</strong> in imperial or metric units.</li>
        <li><strong>Enter your body fat percentage</strong> from a DEXA scan, calipers, a bioimpedance scale or a tape-measure method.</li>
        <li><strong>Read your normalized FFMI</strong>, plus unadjusted FFMI, lean mass and fat mass, with research-based context.</li>
      </ol>

      <h2 id="formula">FFMI formula</h2>
      <div className="formula">Lean mass (kg) = weight (kg) × (1 − body fat %)<br />FFMI = lean mass ÷ height (m)²<br />Normalized FFMI = FFMI + 6.1 × (1.8 − height in m)   (Kouri et al., 1995)</div>

      <h2 id="example">Example</h2>
      <div className="formula">5′10″ (1.778 m), 180 lb (81.6 kg), 15% body fat<br />Lean mass = 81.6 × 0.85 = 69.4 kg (153 lb)  ·  fat mass = 12.2 kg (27 lb)<br />FFMI = 69.4 ÷ 1.778² = 21.95  →  normalized 21.95 + 6.1 × 0.022 = 22.1</div>
      <p>The same person estimated at 11% or 19% body fat would score 23.0 or 20.9: body fat accuracy matters more than anything else.</p>

      <h2 id="benchmarks">How to read your FFMI</h2>
      <ul>
        <li><strong>Typical men:</strong> roughly 19–21 without dedicated training.</li>
        <li><strong>Trained men:</strong> years of consistent lifting can move FFMI into the low-to-mid 20s.</li>
        <li><strong>The &quot;natural limit&quot;:</strong> in Kouri and colleagues&apos; 1995 study of 157 male athletes, drug-free lifters&apos; normalized FFMI peaked at about 25. The authors called this preliminary, and some people with exceptional genetics exceed it.</li>
        <li><strong>Women</strong> have lower values; a practical drug-free ceiling of about 22 is often cited, though the research base is thinner.</li>
      </ul>

      <h2 id="bodyfat">Getting a body fat number</h2>
      <p>DEXA scans are among the most accurate methods; calipers and bioimpedance scales are convenient but can be several points off. If you don&apos;t have a measurement, a tape-measure method like the one in the <Link href="/army-body-fat-calculator/">Army body fat calculator</Link> gives a reasonable estimate. BMI ignores body composition entirely; compare with the <Link href="/bmi-women-calculator/">BMI calculator</Link> to see why FFMI is more informative for lifters.</p>

      <h2 id="training">Building lean mass</h2>
      <ul>
        <li><strong>Progressive overload:</strong> gradually increase weight or reps; track strength with the <Link href="/bench-press-max-calculator/">bench press max calculator</Link>.</li>
        <li><strong>Protein and total calories</strong> support muscle gain; very low-calorie diets make it harder.</li>
        <li><strong>Recompute every few months</strong> with the same body fat method so changes are comparable.</li>
      </ul>
      <p className="text-sm">For general fitness information, not medical advice. More <Link href="/category/health/">health calculators</Link>.</p>
    </>
  );
}
