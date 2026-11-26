import Link from "next/link";

/** Brief + competitor findings: docs/research/target-heart-rate-calculator.md · research/target-heart-rate-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the target heart rate calculator</h2>
      <ol>
        <li>Enter your age, and your resting heart rate if you know it.</li>
        <li>Pick a maximum heart rate formula, or enter a measured maximum from a supervised test.</li>
        <li>Choose percent of maximum (the CDC method) or heart-rate reserve (Karvonen), then read your moderate and vigorous ranges and the five training zones.</li>
      </ol>

      <h2 id="formulas">Heart rate formulas</h2>
      <div className="formula">Max HR (CDC / Fox) = 220 − age · Tanaka = 208 − 0.7 × age · Nes = 211 − 0.64 × age · Gulati (women) = 206 − 0.88 × age<br />Target (% of max) = max HR × intensity<br />Target (Karvonen) = resting HR + intensity × (max HR − resting HR)<br />CDC: moderate = 64–76% of max · vigorous = 77–93% of max</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>Age 50 (CDC example):</strong> max = 220 − 50 = 170 bpm. Moderate = 0.64 × 170 to 0.76 × 170 = <strong>109–129 bpm</strong>; vigorous = <strong>131–158 bpm</strong>.</li>
        <li><strong>Age 40, Karvonen:</strong> max 180, resting 60, reserve 120. Moderate = 60 + 0.64 × 120 to 60 + 0.76 × 120 = <strong>137–151 bpm</strong>.</li>
        <li><strong>Formulas compared at age 60:</strong> 220 − age = 160; Tanaka = 166; Nes = 172.6; Gulati (women) = 153.2 bpm.</li>
      </ul>

      <h2 id="talk-test">No monitor? Use the talk test</h2>
      <ul>
        <li><strong>Moderate:</strong> you can talk, but not sing, during the activity (brisk walking, easy cycling).</li>
        <li><strong>Vigorous:</strong> you can say only a few words before pausing for breath (running, fast cycling, swimming laps).</li>
      </ul>
      <p>US guidelines recommend at least 150 minutes of moderate or 75 minutes of vigorous aerobic activity a week for adults, or a mix of the two.</p>

      <h2 id="safety">Safety notes</h2>
      <ul>
        <li>Build up gradually if you&apos;re new to exercise, and stop if you feel chest pain, dizziness or unusual shortness of breath.</li>
        <li>Medicines such as beta-blockers lower heart rate, so the usual targets may not apply; ask your doctor.</li>
        <li>Children, pregnant people and anyone with a heart condition should get personal advice before using these targets.</li>
      </ul>
      <p>Estimate calories at rest with the <Link href="/bmr-calculator/">BMR calculator</Link>, turn daily steps into distance with the <Link href="/steps-to-miles-calculator/">steps to miles calculator</Link>, check readings with the <Link href="/blood-pressure-by-age-calculator/">blood pressure by age calculator</Link>, or plan meals around training with the <Link href="/macro-calculator/">macro calculator</Link>. More <Link href="/category/health/">health calculators</Link>.</p>
    </>
  );
}
