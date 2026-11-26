import Link from "next/link";

/** Brief + competitor findings: docs/research/decking-calculator.md · research/decking-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the decking calculator</h2>
      <ol>
        <li>Enter the deck length in the direction the boards will run, and the width across the boards.</li>
        <li>Choose the actual board width, the gap, the board length you can buy and a waste allowance.</li>
        <li>Read the boards to buy, linear feet, joists and screws. Add a board price for the decking cost.</li>
      </ol>

      <h2 id="formulas">Deck board formulas</h2>
      <div className="formula">Rows = deck width (in) ÷ (board width + gap), rounded up<br />Linear feet = rows × deck length<br />Boards = linear feet × (1 + waste %) ÷ board length, rounded up<br />Joists = deck length (in) ÷ joist spacing + 1, rounded down<br />Screws = rows × joists × 2</div>

      <h2 id="example">Worked example</h2>
      <p>A 12 × 16 ft deck with boards running the 16 ft way, 5½-inch boards, ⅛-inch gaps, 16 ft boards and 10% waste:</p>
      <ul>
        <li>Rows = 144 ÷ (5.5 + 0.125) = 25.6, so <strong>26 rows</strong>.</li>
        <li>Linear feet = 26 × 16 = <strong>416 ft</strong>; with 10% waste, 457.6 ft.</li>
        <li>Boards = 457.6 ÷ 16 = 28.6, so <strong>29 boards</strong>, each one full length, with no butt joints.</li>
        <li>Joists at 16″ on center = 192 ÷ 16 + 1 = <strong>13 joists</strong>, each 12 ft long.</li>
        <li>Screws = 26 × 13 × 2 = <strong>676</strong>.</li>
      </ul>

      <h2 id="stairs">Don&apos;t forget the stairs</h2>
      <p>Stair treads are easy to leave off an order. Each tread is usually two deck boards side by side (2 × 5½″ plus a gap ≈ 11¼″ deep), cut to the stair width. Three 4 ft wide steps need 3 × 2 = 6 tread pieces; a 16 ft board gives four 4 ft pieces, so that&apos;s <strong>2 extra boards</strong>. Risers and stringers are extra; the <Link href="/stair-calculator/">stair calculator</Link> works out the rise, run and stringer length.</p>

      <h2 id="materials">Decking materials compared</h2>
      <table>
        <thead><tr><th>Material</th><th>Upfront cost</th><th>Upkeep</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Pressure-treated pine</td><td>Lowest</td><td>Clean and seal or stain regularly</td><td>Most common; can check, warp and splinter as it weathers</td></tr>
          <tr><td>Cedar / redwood</td><td>Medium</td><td>Seal to keep the color; weathers to gray otherwise</td><td>Naturally rot-resistant heartwood, lighter and softer</td></tr>
          <tr><td>Tropical hardwood (e.g. ipe)</td><td>High</td><td>Oil to keep the color</td><td>Very hard and dense; needs pre-drilling and hidden fasteners</td></tr>
          <tr><td>Composite</td><td>High</td><td>Wash; no sanding or staining</td><td>Wood-plastic mix; check joist spacing and gaps in the maker&apos;s guide</td></tr>
          <tr><td>PVC (cellular)</td><td>Highest</td><td>Wash only</td><td>Lightest, moisture-proof; expands with heat, so gaps matter</td></tr>
        </tbody>
      </table>
      <p>Composite and PVC boards are sold by the board in fixed lengths, so the board count matters more than square footage when you order.</p>

      <h2 id="boards">Common deck boards</h2>
      <table>
        <thead><tr><th>Board</th><th>Actual width</th><th>Typical use</th></tr></thead>
        <tbody>
          <tr><td>5/4 × 6 wood</td><td>5½″ × 1″</td><td>The most common decking surface</td></tr>
          <tr><td>2 × 6 wood</td><td>5½″ × 1½″</td><td>Stiffer; can span farther between joists</td></tr>
          <tr><td>Composite / PVC</td><td>About 5½″</td><td>Low maintenance; often needs 12–16″ joist spacing</td></tr>
          <tr><td>2 × 4 wood</td><td>3½″ × 1½″</td><td>Narrow-board look, more rows and screws</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Planning tips</h2>
      <ul>
        <li>Order boards that span the full length when you can; it looks better and saves cutting.</li>
        <li>For a longer deck, stagger butt joints row to row and land each joint on a joist.</li>
        <li>A picture-frame border or diagonal layout adds cuts; raise the waste to 15% or more.</li>
        <li>Joists, beams, posts and footings depend on spans and loads; follow local code or the American Wood Council&apos;s DCA 6 guide.</li>
      </ul>
      <p>Plan steps down to the yard with the <Link href="/stair-calculator/">stair calculator</Link>, price lumber with the <Link href="/board-foot-calculator/">board foot calculator</Link>, measure the deck area with the <Link href="/square-footage-calculator/">square footage calculator</Link>, or work out footing concrete with the <Link href="/concrete-calculator/">concrete calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
