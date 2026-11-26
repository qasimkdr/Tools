/** Mechanical power (pure). 1 hp = 550 ft·lbf/s; 1 lbf·ft = 1.3558179483 N·m. */
export const W_PER_HP = 745.69987158227022; // mechanical (imperial) horsepower
export const W_PER_PS = 735.49875; // metric horsepower (PS, CV)
export const W_PER_EHP = 746; // electrical horsepower
export const NM_PER_LBFT = 1.3558179483314004;
/** 33,000 ÷ 2π ≈ 5252.113: hp = torque (lb·ft) × rpm ÷ this. */
export const HP_CONST = 33000 / (2 * Math.PI);

export const hpFromTorque = (lbft: number, rpm: number) => (lbft * rpm) / HP_CONST;
export const torqueFromHp = (hp: number, rpm: number) => (rpm > 0 ? (hp * HP_CONST) / rpm : NaN);
/** Watts from N·m and rpm: P = τω. */
export const wattsFromNm = (nm: number, rpm: number) => (nm * rpm * 2 * Math.PI) / 60;
/** Power from work: force (lbf) × distance (ft) ÷ time (s) → hp. */
export const hpFromWork = (lbf: number, ft: number, s: number) => (s > 0 ? (lbf * ft) / s / 550 : NaN);
