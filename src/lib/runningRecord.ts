/** Running record (reading assessment) scores (pure). Bands as in Reading A–Z: independent 95–100%, instructional 90–94%, frustrational below 90%. */
export function runningRecord(words: number, errors: number, sc: number, seconds?: number) {
  const accuracy = words > 0 ? (words - errors) / words : NaN;
  const errorRate = errors > 0 ? words / errors : Infinity;
  const scRate = sc > 0 ? (errors + sc) / sc : Infinity;
  const level = !Number.isFinite(accuracy) ? "" : accuracy >= 0.95 ? "Independent" : accuracy >= 0.9 ? "Instructional" : "Frustrational";
  const wpm = seconds && seconds > 0 ? (words / seconds) * 60 : NaN;
  const wcpm = seconds && seconds > 0 ? ((words - errors) / seconds) * 60 : NaN;
  return { accuracy, errorRate, scRate, level, wpm, wcpm };
}
