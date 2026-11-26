/** Weight change as a percentage (pure; any unit, as long as both weights use the same one). */
export function weightLoss(start: number, current: number, goal?: number, weeks?: number) {
  const lost = start - current;
  const pct = start > 0 ? lost / start : NaN;
  const toGoal = goal && goal > 0 ? current - goal : NaN;
  const goalTotal = goal && goal > 0 ? start - goal : NaN;
  return {
    lost, pct,
    toGoal, goalPct: goal && goal > 0 && start > 0 ? (start - goal) / start : NaN,
    progress: Number.isFinite(goalTotal) && goalTotal !== 0 ? lost / goalTotal : NaN,
    perWeek: weeks && weeks > 0 ? lost / weeks : NaN,
    pctPerWeek: weeks && weeks > 0 && start > 0 ? lost / start / weeks : NaN,
  };
}
/** Weight after losing `pct` (fraction) of the starting weight. */
export const milestone = (start: number, pct: number) => start * (1 - pct);
