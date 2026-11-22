/**
 * Standard atomic weights (g/mol), IUPAC abridged / conventional values to ~5 significant figures.
 * Elements with no stable isotopes use the mass number of their longest-lived isotope (shown in brackets in the UI).
 */
export const ATOMIC_WEIGHTS: Record<string, number> = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.180,
  Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.95, K: 39.098, Ca: 40.078,
  Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
  Nb: 92.906, Mo: 95.95, Tc: 97, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71,
  Sb: 121.76, Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24,
  Pm: 145, Sm: 150.36, Eu: 151.96, Gd: 157.25, Tb: 158.93, Dy: 162.50, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05,
  Lu: 174.97, Hf: 178.49, Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59,
  Tl: 204.38, Pb: 207.2, Bi: 208.98, Po: 209, At: 210, Rn: 222, Fr: 223, Ra: 226, Ac: 227, Th: 232.04, Pa: 231.04, U: 238.03,
  Np: 237, Pu: 244, Am: 243, Cm: 247, Bk: 247, Cf: 251, Es: 252, Fm: 257, Md: 258, No: 259, Lr: 262, Rf: 267, Db: 268,
  Sg: 269, Bh: 270, Hs: 269, Mt: 278, Ds: 281, Rg: 282, Cn: 285, Nh: 286, Fl: 289, Mc: 290, Lv: 293, Ts: 294, Og: 294,
};
export const NO_STABLE = new Set(["Tc", "Pm", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"]);

/**
 * Parse a chemical formula into element counts. Supports nested () [] {}, multipliers, and hydrates/adducts
 * separated by · • * or . with optional leading coefficients, e.g. "CuSO4·5H2O", "Ca3(PO4)2", "K4[Fe(CN)6]".
 */
export function parseFormula(input: string): Record<string, number> {
  const parts = input.replace(/\s+/g, "").split(/[·•*]|\.(?=\d*[A-Z(\[{])/);
  const total: Record<string, number> = {};
  for (const part of parts) {
    if (!part) continue;
    const m = part.match(/^(\d+)(.*)$/);
    const coef = m ? Number(m[1]) : 1, body = m ? m[2] : part;
    const counts = parseGroup(body);
    for (const [el, n] of Object.entries(counts)) total[el] = (total[el] || 0) + n * coef;
  }
  if (!Object.keys(total).length) throw new Error("Enter a formula, e.g. H2O or C6H12O6.");
  return total;
}

function parseGroup(s: string): Record<string, number> {
  const stack: Record<string, number>[] = [{}];
  const OPEN = "([{", CLOSE = ")]}";
  let i = 0;
  const readNum = () => { let j = i; while (j < s.length && /\d/.test(s[j])) j++; const n = j > i ? Number(s.slice(i, j)) : 1; i = j; return n; };
  while (i < s.length) {
    const c = s[i];
    if (OPEN.includes(c)) { stack.push({}); i++; }
    else if (CLOSE.includes(c)) {
      i++; const mult = readNum(); const top = stack.pop();
      if (!top || !stack.length) throw new Error("Unbalanced brackets.");
      for (const [el, n] of Object.entries(top)) stack[stack.length - 1][el] = (stack[stack.length - 1][el] || 0) + n * mult;
    } else if (/[A-Z]/.test(c)) {
      let el = c; i++;
      while (i < s.length && /[a-z]/.test(s[i])) { el += s[i]; i++; }
      if (!(el in ATOMIC_WEIGHTS)) throw new Error(`Unknown element "${el}". Symbols are case-sensitive (Co = cobalt, CO = carbon monoxide).`);
      const n = readNum(); stack[stack.length - 1][el] = (stack[stack.length - 1][el] || 0) + n;
    } else throw new Error(`Unexpected character "${c}".`);
  }
  if (stack.length !== 1) throw new Error("Unbalanced brackets.");
  return stack[0];
}

export function molarMass(counts: Record<string, number>) {
  return Object.entries(counts).reduce((t, [el, n]) => t + ATOMIC_WEIGHTS[el] * n, 0);
}
