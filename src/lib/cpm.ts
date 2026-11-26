/** Advertising cost per mille (pure). CPM = cost ÷ impressions × 1,000. */
export const cpmOf = (cost: number, impressions: number) => (impressions > 0 ? (cost / impressions) * 1000 : NaN);
export const costOf = (cpm: number, impressions: number) => (cpm * impressions) / 1000;
export const impressionsOf = (cost: number, cpm: number) => (cpm > 0 ? (cost / cpm) * 1000 : NaN);
/** CPM implied by a cost per click and click-through rate (fraction). */
export const cpmFromCpc = (cpc: number, ctr: number) => cpc * ctr * 1000;
