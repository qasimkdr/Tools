import Link from "next/link";

/** Brief + competitor findings: docs/research/fence-calculator.md · research/fence-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the fence calculator</h2>
      <ol>
        <li>Choose privacy (boards touching) or picket (gaps), then enter the total fence length, height and post spacing.</li>
        <li>Enter the number and width of gates, rails per section and the board width.</li>
        <li>Read the posts, rails and boards to buy. Add prices to get the material cost.</li>
      </ol>

      <h2 id="formulas">Fence formulas</h2>
      <div className="formula">Fenced length = total length − gates × gate width<br />Sections = fenced length ÷ post spacing, rounded up<br />Posts = sections + 1 + number of gates<br />Rails = sections × rails per section<br />Boards = fenced length (in) ÷ (board width + gap) × (1 + extra %)<br />Post length = fence height + depth in ground</div>

      <h2 id="example">Worked example</h2>
      <p>A 100 ft, 6 ft tall privacy fence with one 4 ft gate, 8 ft post spacing, 3 rails and 5½-inch boards:</p>
      <ul>
        <li>Fenced length = 100 − 4 = 96 ft. Sections = 96 ÷ 8 = <strong>12</strong>.</li>
        <li>Posts = 12 + 1 + 1 gate = <strong>14 posts</strong>, each 8 ft long (6 ft above ground, 2 ft below).</li>
        <li>Rails = 12 × 3 = <strong>36 rails</strong> of 8 ft.</li>
        <li>Boards = 96 × 12 ÷ 5.5 = 209.5; with 5% extra, <strong>220 boards</strong>.</li>
      </ul>

      <h2 id="shadowbox">Shadowbox and stockade fences</h2>
      <p>A <strong>stockade</strong> fence uses boards butted edge to edge, usually with pointed tops, so it&apos;s counted like a privacy fence. A <strong>shadowbox</strong> (board-on-board) fence puts boards on both sides of the rails, alternating, with a gap on each side that&apos;s smaller than a board so the two layers overlap. Count each side separately:</p>
      <div className="formula">Shadowbox boards = 2 × fenced length (in) ÷ (board width + gap) × (1 + extra %)</div>
      <p>For the same 96 ft of fence with 5½-inch boards and 3½-inch gaps: 2 × 1,152 ÷ 9 = 256 boards, or <strong>269</strong> with 5% extra, about 22% more than a solid privacy fence (220). The overlap means you see a solid fence head-on but air can pass through, which helps in windy spots.</p>

      <h2 id="concrete">Concrete for fence posts</h2>
      <div className="formula">Concrete per post = π × (hole diameter ÷ 2)² × depth − post width² × depth<br />80 lb bags = total cubic feet ÷ 0.6</div>
      <p>A 10-inch hole, 2 ft deep, around a 4×4 post (3½ inches actual) holds 1,885 − 294 = 1,591 cubic inches, or <strong>0.92 cu ft</strong> of concrete. The 14 posts in the example need 12.9 cu ft, about <strong>22 bags</strong> of 80 lb mix, using Quikrete&apos;s figure of roughly 0.6 cu ft per 80 lb bag. A few inches of gravel in the bottom of each hole, for drainage, lowers this slightly.</p>

      <h2 id="styles">Common wood fence setups</h2>
      <table>
        <thead><tr><th>Fence</th><th>Height</th><th>Rails</th><th>Boards</th></tr></thead>
        <tbody>
          <tr><td>Picket</td><td>3–4 ft</td><td>2</td><td>3½–5½″ pickets with 1½–3″ gaps</td></tr>
          <tr><td>Privacy</td><td>6 ft</td><td>3</td><td>5½″ boards butted together</td></tr>
          <tr><td>Shadowbox / board-on-board</td><td>6 ft</td><td>3</td><td>Boards on both sides, overlapping; about 20–25% more boards than privacy</td></tr>
          <tr><td>Split rail / post and rail</td><td>3–4 ft</td><td>2–3</td><td>No boards</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Before you build</h2>
      <ul>
        <li>Call your local utility-locating service before digging post holes.</li>
        <li>Check property lines, HOA rules and local height limits; many areas require a permit for fences over a set height.</li>
        <li>Set end, corner and gate posts first, then run a string line to place the line posts.</li>
        <li>Use posts rated for ground contact, and set gate posts deeper or in more concrete because they carry more load.</li>
      </ul>
      <p>Find the right hole depth for your soil and frost line with the <Link href="/fence-post-depth-calculator/">fence post depth calculator</Link> and <Link href="/concrete-calculator/">concrete calculator</Link>, measure the run with the <Link href="/linear-feet-calculator/">linear feet calculator</Link>, or price lumber with the <Link href="/board-foot-calculator/">board foot calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
