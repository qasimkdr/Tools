export const faq = [
  { q: "How do I convert Nm to ft-lb?", a: "Multiply newton-metres by 0.737562, or divide by 1.355818. For example, 100 N·m × 0.737562 = 73.76 ft·lb, and 50 N·m is 36.88 ft·lb." },
  { q: "How do I convert ft-lb to Nm?", a: "Multiply foot-pounds by 1.355818. So 150 ft·lb × 1.355818 = 203.37 N·m, and 80 ft·lb is 108.47 N·m." },
  { q: "Where does the conversion factor come from?", a: "1 foot-pound force is a force of one pound (0.45359237 kg × 9.80665 m/s² = 4.448222 N) acting at one foot (0.3048 m), which is 4.448222 × 0.3048 = 1.355818 N·m. These are exact definitions, so the factor is exact." },
  { q: "How many inch-pounds are in a newton-metre?", a: "1 N·m = 8.85075 in·lb, and 1 ft·lb = 12 in·lb. Small fasteners such as bicycle and electronics screws are often specified in in·lb or N·m: 5 N·m is 44.25 in·lb." },
  { q: "Is ft-lb the same as lb-ft?", a: "For torque, yes: both mean pound-force times feet, and you'll see both written on torque wrenches and spec sheets. Strictly, engineers prefer lb·ft (or lbf·ft) for torque and ft·lb for work and energy, but the numbers are the same." },
  { q: "What is kgf·m?", a: "Kilogram-force metre, an older metric torque unit still seen on some Japanese and European specs. 1 kgf·m = 9.80665 N·m = 7.233 ft·lb." },
];
