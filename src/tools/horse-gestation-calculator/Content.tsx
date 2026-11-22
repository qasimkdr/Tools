import Link from "next/link";

/** Brief + competitor findings: docs/research/horse-gestation-calculator.md · research/horse-gestation-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the horse gestation calculator</h2>
      <ol>
        <li><strong>Enter the breeding date</strong>: the last cover, insemination or known ovulation date.</li>
        <li><strong>Keep 340 days</strong> or enter your mare&apos;s usual gestation length if she has foaled before.</li>
        <li><strong>Read the foaling date</strong>, the likely and normal foaling windows, how far along she is today and a care timeline.</li>
      </ol>

      <h2 id="formula">How the due date is calculated</h2>
      <div className="formula">Foaling date = breeding date + 340 days<br />Most likely window: + 330 to 345 days  ·  Normal range: + 320 to 370 days</div>
      <p>The University of Nebraska&apos;s{" "}
        <a href="https://horses.extension.org/management-of-the-pregnant-mare/" rel="noopener" target="_blank">horse extension guide</a> gives an average of 335–340 days and a normal range of 320 to 370. A study of Irish Thoroughbreds found a mean of 340 days, with half of mares foaling between days 334 and 345.</p>

      <h2 id="example">Example: covered May 1, 2026</h2>
      <table>
        <thead><tr><th>Milestone</th><th>Day</th><th>Date</th></tr></thead>
        <tbody>
          <tr><td>Ultrasound check (and twin check)</td><td>~15</td><td>May 16, 2026</td></tr>
          <tr><td>Month 5 (EHV-1 vaccines often start)</td><td>~150</td><td>Sep 28, 2026</td></tr>
          <tr><td>Normal window opens</td><td>320</td><td>Mar 17, 2027</td></tr>
          <tr><td>Most likely window</td><td>330–345</td><td>Mar 27 – Apr 11, 2027</td></tr>
          <tr><td><strong>Estimated foaling date</strong></td><td>340</td><td><strong>Apr 6, 2027</strong></td></tr>
          <tr><td>Normal window closes</td><td>370</td><td>May 6, 2027</td></tr>
        </tbody>
      </table>

      <h2 id="stages">Mare pregnancy by trimester</h2>
      <table>
        <thead><tr><th>Stage</th><th>What&apos;s happening</th></tr></thead>
        <tbody>
          <tr><td>Months 1–3</td><td>Pregnancy confirmed by ultrasound; twins managed early. Normal work and diet usually continue.</td></tr>
          <tr><td>Months 4–7</td><td>The foal grows steadily; a vaccination and deworming plan is set with the vet.</td></tr>
          <tr><td>Months 8–11</td><td>Most foal growth happens now. Nutrition needs rise, boosters are given before foaling and the foaling area is prepared.</td></tr>
        </tbody>
      </table>

      <h2 id="signs">Signs foaling is near</h2>
      <ul>
        <li><strong>Udder development</strong> in the last 2–6 weeks.</li>
        <li><strong>Relaxed muscles</strong> around the tailhead and a lengthening vulva.</li>
        <li><strong>Waxing</strong>: beads of colostrum on the teats, often 1–4 days before foaling.</li>
        <li><strong>Restlessness</strong>, sweating, pacing and repeatedly lying down as labor begins. Most mares foal at night.</li>
      </ul>

      <h2 id="more">Related tools</h2>
      <p>Expecting puppies instead? Use the <Link href="/dog-pregnancy-calculator/">dog pregnancy calculator</Link>. To count any number of days from a date, try the <Link href="/days-from-today/">days from today calculator</Link>, and track a horse&apos;s exact age with the <Link href="/age-calculator/">age calculator</Link>. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
      <p className="text-sm">For planning only, not veterinary advice. Work with your veterinarian on pregnancy checks, vaccines and foaling.</p>
    </>
  );
}
