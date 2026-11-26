export const faq = [
  { q: "How do you calculate horsepower from torque?", a: "Horsepower = torque (lb-ft) × RPM ÷ 5,252. An engine making 300 lb-ft at 5,000 RPM produces 300 × 5,000 ÷ 5,252 = 285.6 hp. In metric units, power (kW) = torque (N·m) × RPM ÷ 9,549." },
  { q: "Why is the constant 5,252?", a: "One horsepower is 33,000 ft·lbf per minute, and one revolution is 2π radians. Dividing 33,000 by 2π gives 5,252.1, which converts lb-ft × RPM into horsepower." },
  { q: "How many kW is 1 horsepower?", a: "One mechanical horsepower is about 0.7457 kW (745.7 W). One metric horsepower (PS) is 735.5 W, and electric motor horsepower is defined as exactly 746 W. So 1 kW ≈ 1.341 hp ≈ 1.360 PS." },
  { q: "What is the difference between hp and PS?", a: "Mechanical horsepower (hp, 550 ft·lbf/s) is used in the US and UK; metric horsepower (PS or CV, 75 kgf·m/s) is common in Europe and Japan. 1 PS is about 0.986 hp, so a 200 PS engine is about 197 hp." },
  { q: "Why do horsepower and torque cross at 5,252 RPM?", a: "Because hp = torque × RPM ÷ 5,252, the two numbers are equal when RPM is exactly 5,252. On a dyno chart plotted in hp and lb-ft, the curves always cross there." },
  { q: "How do I work out the horsepower needed to lift something?", a: "Power = force × distance ÷ time. Lifting 150 lb up 10 ft in 2 seconds is 1,500 ft·lbf ÷ 2 s = 750 ft·lbf/s, and dividing by 550 gives 1.36 hp. Real machines need more because of friction and motor efficiency." },
  { q: "Is wheel horsepower the same as engine horsepower?", a: "No. Wheel horsepower is measured at the drive wheels on a chassis dyno and is lower than the engine's rated (crank) horsepower because the transmission and drivetrain lose some power. The loss varies by vehicle." },
];
