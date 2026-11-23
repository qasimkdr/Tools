/** Volume formulas for common solids. Pure; inputs in one consistent length unit. */
export type Solid = { id: string; name: string; inputs: { k: string; label: string }[]; formula: string; calc: (v: Record<string, number>) => number | null };
const PI = Math.PI;
const pos = (...xs: number[]) => xs.every((x) => x > 0);

export const SOLIDS: Solid[] = [
  { id: "box", name: "Rectangular box / tank", inputs: [{ k: "l", label: "Length" }, { k: "w", label: "Width" }, { k: "h", label: "Height or depth" }], formula: "V = l × w × h", calc: ({ l, w, h }) => (pos(l, w, h) ? l * w * h : null) },
  { id: "cube", name: "Cube", inputs: [{ k: "a", label: "Edge" }], formula: "V = a³", calc: ({ a }) => (pos(a) ? a ** 3 : null) },
  { id: "cylinder", name: "Cylinder (round tank, pond)", inputs: [{ k: "r", label: "Radius" }, { k: "h", label: "Height or depth" }], formula: "V = π r² h", calc: ({ r, h }) => (pos(r, h) ? PI * r * r * h : null) },
  { id: "sphere", name: "Sphere", inputs: [{ k: "r", label: "Radius" }], formula: "V = (4/3) π r³", calc: ({ r }) => (pos(r) ? (4 / 3) * PI * r ** 3 : null) },
  { id: "hemisphere", name: "Hemisphere", inputs: [{ k: "r", label: "Radius" }], formula: "V = (2/3) π r³", calc: ({ r }) => (pos(r) ? (2 / 3) * PI * r ** 3 : null) },
  { id: "cone", name: "Cone", inputs: [{ k: "r", label: "Radius" }, { k: "h", label: "Height" }], formula: "V = (1/3) π r² h", calc: ({ r, h }) => (pos(r, h) ? (PI * r * r * h) / 3 : null) },
  { id: "pyramid", name: "Rectangular pyramid", inputs: [{ k: "l", label: "Base length" }, { k: "w", label: "Base width" }, { k: "h", label: "Height" }], formula: "V = (1/3) l w h", calc: ({ l, w, h }) => (pos(l, w, h) ? (l * w * h) / 3 : null) },
  { id: "prism", name: "Triangular prism", inputs: [{ k: "b", label: "Triangle base" }, { k: "a", label: "Triangle height" }, { k: "l", label: "Prism length" }], formula: "V = ½ × b × a × l", calc: ({ b, a, l }) => (pos(b, a, l) ? (b * a * l) / 2 : null) },
  { id: "ellipsoid", name: "Ellipsoid (oval pond: use half)", inputs: [{ k: "a", label: "Semi-axis a" }, { k: "b", label: "Semi-axis b" }, { k: "c", label: "Semi-axis c" }], formula: "V = (4/3) π a b c", calc: ({ a, b, c }) => (pos(a, b, c) ? (4 / 3) * PI * a * b * c : null) },
  { id: "ellcyl", name: "Oval tank / pond (elliptical cylinder)", inputs: [{ k: "a", label: "Semi-axis a (half length)" }, { k: "b", label: "Semi-axis b (half width)" }, { k: "h", label: "Height or depth" }], formula: "V = π a b h", calc: ({ a, b, h }) => (pos(a, b, h) ? PI * a * b * h : null) },
  { id: "capsule", name: "Capsule", inputs: [{ k: "r", label: "Radius" }, { k: "h", label: "Cylinder length" }], formula: "V = π r² ((4/3) r + h)", calc: ({ r, h }) => (pos(r, h) ? PI * r * r * ((4 / 3) * r + h) : null) },
  { id: "frustum", name: "Conical frustum (bucket)", inputs: [{ k: "r", label: "Bottom radius" }, { k: "R", label: "Top radius" }, { k: "h", label: "Height" }], formula: "V = (1/3) π h (r² + rR + R²)", calc: ({ r, R, h }) => (pos(r, R, h) ? (PI * h * (r * r + r * R + R * R)) / 3 : null) },
  { id: "tube", name: "Tube / pipe wall", inputs: [{ k: "R", label: "Outer radius" }, { k: "r", label: "Inner radius" }, { k: "h", label: "Length" }], formula: "V = π (R² − r²) h", calc: ({ R, r, h }) => (pos(R, r, h) && R > r ? PI * (R * R - r * r) * h : null) },
];

/** Cubic meters per cubic unit. */
export const M3_PER: Record<string, number> = { mm: 1e-9, cm: 1e-6, m: 1, in: 1.6387064e-5, ft: 0.028316846592, yd: 0.764554857984 };
export const L_PER_USGAL = 3.785411784, L_PER_UKGAL = 4.54609;
