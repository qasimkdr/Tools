export const faq = [
  { q: "How do you calculate quarter-mile time from horsepower?", a: "A widely used empirical formula is ET = 5.825 × (weight ÷ horsepower)^(1/3), with weight in pounds including the driver and flywheel horsepower. A 3,500 lb car with 400 hp: 5.825 × (8.75)^(1/3) ≈ 12.00 seconds." },
  { q: "How do you estimate trap speed?", a: "Trap speed (mph) ≈ 234 × (horsepower ÷ weight)^(1/3). The 3,500 lb, 400 hp car traps at about 113.6 mph. Roger Huntington's original version used 224 instead of 234 (and 6.290 for ET), which gives more conservative numbers." },
  { q: "How do I estimate horsepower from my time slip?", a: "Reverse the formulas: hp = weight × (trap speed ÷ 234)³, or hp = weight ÷ (ET ÷ 5.825)³. Trap speed is usually the better guide because ET depends heavily on traction and the launch." },
  { q: "Should I use crank or wheel horsepower?", a: "These formulas are calibrated for flywheel (crank) horsepower. If you only know wheel horsepower from a dyno, results will come out slower than the car is capable of." },
  { q: "Why is my real ET different from the estimate?", a: "Traction, launch technique, gearing, tire choice, aerodynamics, air density and altitude all matter. A poor launch can add several tenths of a second to ET while barely changing trap speed." },
  { q: "What weight should I enter?", a: "The race weight: the car as raced plus the driver, with fuel. Every 100 lb removed from a 3,500 lb, 400 hp car is worth roughly a tenth of a second in ET by these formulas." },
];
