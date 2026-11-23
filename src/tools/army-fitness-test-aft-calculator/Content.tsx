import Link from "next/link";

/** Brief + competitor findings: docs/research/army-fitness-test-aft-calculator.md · research/army-fitness-test-aft-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the AFT calculator</h2>
      <ol>
        <li>Enter your age and sex, and choose the <strong>general</strong> standard or the <strong>combat</strong> standard if you hold a combat MOS.</li>
        <li>Enter your raw results: deadlift weight, push-up reps, and your sprint-drag-carry, plank and 2-mile run times as minutes:seconds.</li>
        <li>Read the points for each event, your total out of 500, and whether you pass. The table also shows what you need for 60 and for 100 points in your age group.</li>
      </ol>

      <h2 id="events">The five AFT events</h2>
      <ul>
        <li><strong>3-repetition maximum deadlift (MDL):</strong> heaviest weight lifted for three reps, in pounds.</li>
        <li><strong>Hand-release push-up (HRP):</strong> correct repetitions in 2 minutes.</li>
        <li><strong>Sprint-drag-carry (SDC):</strong> total time for the shuttle of sprints, sled drag, lateral moves, kettlebell carry and sprint.</li>
        <li><strong>Plank (PLK):</strong> time holding the proper straight-line position.</li>
        <li><strong>Two-mile run (2MR):</strong> overall time.</li>
      </ul>
      <p>Each event is scored from 0 to 100 points, for a maximum of 500.</p>

      <h2 id="standards">Passing standards</h2>
      <ul>
        <li><strong>General standard</strong> (combat-enabling specialties): at least <strong>60 points in each event</strong> and <strong>300 total</strong>. Scores are normed by age group and sex.</li>
        <li><strong>Combat standard</strong> (designated combat specialties): at least <strong>60 points in each event</strong> and <strong>350 total</strong>, sex-neutral and age-normed. It took effect on 1 January 2026 for the active component and applies from 1 June 2026 for the Army Reserve and National Guard.</li>
      </ul>

      <h2 id="formulas">How AFT scoring works</h2>
      <div className="formula">Event points = highest table score whose standard you meet (for your age group and standard)<br />Deadlift, push-ups, plank: higher is better · Sprint-drag-carry, 2-mile run: lower time is better<br />Total = MDL + HRP + SDC + PLK + 2MR (maximum 500)<br />Pass = every event ≥ 60 and total ≥ 300 (general) or ≥ 350 (combat)</div>
      <p>For the deadlift and push-ups, the official tables list every point from 60 to 100 but only every 10 points below 60. A result between two listed values earns the lower score.</p>

      <h2 id="example">Worked example</h2>
      <p>A 25-year-old male soldier on the general standard (age group 22–26):</p>
      <ul>
        <li>Deadlift 250 lb = <strong>81</strong> points; 40 push-ups = <strong>83</strong>; sprint-drag-carry 1:55 = <strong>78</strong>; plank 2:30 = <strong>80</strong>; 2-mile run 16:00 = <strong>87</strong>.</li>
        <li>Total = <strong>409</strong> of 500, with every event above 60: a pass on both the general (300) and combat (350) standards.</li>
        <li>In the same age group, 60 points on the run needs 19:45 or faster, and 100 points needs 13:25.</li>
      </ul>

      <h2 id="tips">Training tips</h2>
      <ul>
        <li>Find your weakest event in the table: going from 60 to 70 points is usually easier there than adding points to your best event.</li>
        <li>Train the plank and push-ups for strict form; repetitions or time with poor form don&apos;t count.</li>
        <li>Practice the sprint-drag-carry transitions; seconds lost turning and switching tasks add up.</li>
      </ul>
      <p>Check the Army body composition standard with the <Link href="/army-body-fat-calculator/">Army body fat calculator</Link>, estimate your one-rep max with the <Link href="/bench-press-max-calculator/">bench press max calculator</Link>, or convert training walks with the <Link href="/steps-to-miles-calculator/">steps to miles calculator</Link>. More <Link href="/category/health/">health and fitness calculators</Link>.</p>
    </>
  );
}
