import Link from "next/link";

/**
 * Brief: docs/research/army-body-fat-calculator.md. Primary sources: Army Directive 2026-13 (armypubs), army.mil
 * article "Army modifies body composition program, adopts waist-to-height ratio", ALARACT 046/2023 (legacy formula).
 */
export default function Content() {
  return (
    <>
      <h2 id="2026-change">What changed in 2026</h2>
      <p>
        <strong>Army Directive 2026-13</strong>, effective <strong>July 7, 2026</strong>, made the <strong>waist-to-height ratio (WHtR)</strong> the Army&apos;s
        only authorized body composition assessment. It discontinued the height and weight screening tables and rescinded the
        circumference-based tape test, which can no longer be used to challenge a WHtR result. Many older &quot;Army body fat
        calculators&quot; still show the tape test; this one uses the current standard. Read the Army&apos;s announcement:{" "}
        <a href="https://www.army.mil/article/293753/army_modifies_body_composition_program_adopts_waist_to_height_ratio" rel="noopener" target="_blank">Army modifies body composition program, adopts waist-to-height ratio</a>{" "}
        and the <a href="https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN47030-ARMY_DIR_2026-13-000-WEB-1.pdf" rel="noopener" target="_blank">directive (PDF)</a>.
      </p>

      <h2 id="how-to-use">How to use this calculator</h2>
      <ol>
        <li><strong>Measure your height</strong> in inches or centimeters.</li>
        <li><strong>Measure your waist at the navel</strong> (belly button level) in the same unit.</li>
        <li><strong>Read your ratio</strong>, whether it meets the standard, the largest waist allowed for your height, and how much room you have.</li>
      </ol>

      <h2 id="formula">The waist-to-height standard</h2>
      <div className="formula">WHtR = waist circumference at the navel ÷ height<br />Standard: WHtR &lt; 0.550 (digits after the third decimal are dropped)<br />Maximum waist = height × 0.55 (your waist must be below this)</div>
      <p>Because the ratio is truncated, not rounded, <strong>0.549 passes and 0.550 fails</strong>. If the first measurement doesn&apos;t meet the standard, a confirmation measurement is taken the same duty day by a different team. Soldiers who fail again are enrolled in the Army Body Composition Program (ABCP).</p>

      <h2 id="table">Maximum waist by height</h2>
      <table>
        <thead><tr><th>Height</th><th>Waist must be under</th></tr></thead>
        <tbody>
          <tr><td>5 ft 0 in (60 in)</td><td>33.0 in</td></tr>
          <tr><td>5 ft 4 in (64 in)</td><td>35.2 in</td></tr>
          <tr><td>5 ft 8 in (68 in)</td><td>37.4 in</td></tr>
          <tr><td>5 ft 10 in (70 in)</td><td>38.5 in</td></tr>
          <tr><td>6 ft 0 in (72 in)</td><td>39.6 in</td></tr>
          <tr><td>6 ft 3 in (75 in)</td><td>41.25 in</td></tr>
        </tbody>
      </table>
      <p>Example: at 70 inches tall with a 36-inch waist, the ratio is 36 ÷ 70 = <strong>0.514</strong>, which meets the standard with 2.5 inches to spare. A 38.49-inch waist (0.549) still passes; 38.5 inches (0.550) does not.</p>

      <h2 id="measure">Measuring tips for a self-check</h2>
      <ul>
        <li>Measure on bare skin with a non-stretch tape, level all the way around, at the navel.</li>
        <li>Stand relaxed and measure at the end of a normal breath out; don&apos;t pull in your stomach.</li>
        <li>Measure height without shoes, standing straight against a wall.</li>
        <li>Take two or three readings. If they differ, measure again and use a consistent one.</li>
      </ul>
      <p>Your official result is whatever designated personnel measure under Army procedures. Use this tool to track progress before your assessment.</p>

      <h2 id="legacy">The old one-site tape test (2023–2026)</h2>
      <p>From June 2023 until July 2026, the Army estimated body fat from a one-site abdominal tape measurement and body weight (ALARACT 046/2023):</p>
      <div className="formula">Male: % body fat = −26.97 − (0.12 × weight in lb) + (1.99 × abdomen in inches)<br />Female: % body fat = −9.15 − (0.015 × weight in lb) + (1.27 × abdomen in inches)</div>
      <p>Retention maximums were 20 / 22 / 24 / 26% for men and 30 / 32 / 34 / 36% for women in the 17–20, 21–27, 28–39 and 40+ age groups. Open the &quot;Legacy&quot; panel above to see an estimate for comparison with older records. It is no longer an Army standard.</p>

      <h2 id="beyond">Beyond the standard</h2>
      <p>Waist-to-height ratio is widely used as a simple health screen because it tracks abdominal fat better than weight alone. To count down to an assessment date, use <Link href="/days-from-today/90/">90 days from today</Link>. See more <Link href="/category/health/">health and fitness calculators</Link>.</p>
      <p className="text-sm">Not an official Army tool or medical advice. Policies can change. Always follow current Army publications and your unit&apos;s guidance.</p>
      <p>Related: estimate body fat with the <Link href="/body-fat-calculator/">U.S. Navy tape method</Link>, check muscularity with the <Link href="/ffmi-calculator/">fat-free mass index (FFMI)</Link>, or estimate your <Link href="/bench-press-max-calculator/">one-rep bench press max</Link>.</p>
    </>
  );
}
