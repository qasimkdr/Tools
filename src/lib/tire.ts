/** Tire size maths (pure). Metric sizes like 225/65R17 (width mm / aspect % / rim in) and flotation sizes like 33x12.50R15. */
export type Tire = { label: string; widthMm: number; sidewallMm: number; rimIn: number; diaIn: number; diaMm: number; circIn: number; revsPerMile: number; revsPerKm: number; widthIn: number; sidewallIn: number };

export function parseTire(src: string): Tire {
  const s = src.trim().toUpperCase().replace(/\s+/g, " ");
  let m = s.match(/^(?:P|LT|ST|T)?\s*(\d{3})\s*[/ ]\s*(\d{2,3})\s*(?:Z?R|D|B|-|\s)\s*F?(\d{2}(?:\.\d)?)/);
  if (m) {
    const w = +m[1], ar = +m[2], rim = +m[3];
    if (ar < 20 || ar > 100) throw new Error("The aspect ratio (the middle number) is usually between 25 and 85.");
    return build(`${w}/${ar}R${rim}`, w, (w * ar) / 100, rim);
  }
  m = s.match(/^(\d{2}(?:\.\d+)?)\s*[X×]\s*(\d{1,2}(?:\.\d+)?)\s*(?:R|-|\s)?\s*(\d{2}(?:\.\d)?)/);
  if (m) {
    const d = +m[1], wIn = +m[2], rim = +m[3];
    if (d <= rim) throw new Error("The overall diameter must be larger than the wheel size.");
    return build(`${d}x${wIn}R${rim}`, wIn * 25.4, ((d - rim) / 2) * 25.4, rim);
  }
  throw new Error("Enter a size like 225/65R17 (metric) or 33x12.50R15 (flotation).");
}
function build(label: string, widthMm: number, sidewallMm: number, rimIn: number): Tire {
  if (rimIn < 10 || rimIn > 30) throw new Error("Wheel size should be between 10 and 30 inches.");
  const diaIn = rimIn + (2 * sidewallMm) / 25.4, circIn = Math.PI * diaIn;
  return { label, widthMm, sidewallMm, rimIn, diaIn, diaMm: diaIn * 25.4, circIn, revsPerMile: 63360 / circIn, revsPerKm: 1e6 / (circIn * 25.4), widthIn: widthMm / 25.4, sidewallIn: sidewallMm / 25.4 };
}
/** Compare a new tire with the original: diameter change and what the speedometer reads. */
export function compareTires(a: Tire, b: Tire, indicated = 60) {
  const ratio = b.diaIn / a.diaIn;
  return { diaPct: (ratio - 1) * 100, actualAt: indicated * ratio, rideHeightIn: (b.diaIn - a.diaIn) / 2, widthMm: b.widthMm - a.widthMm, sidewallMm: b.sidewallMm - a.sidewallMm };
}
