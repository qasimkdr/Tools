export const faq = [
  { q: "How do you find the hypotenuse of a right triangle?", a: "Square both legs, add them, and take the square root: c = √(a² + b²). For legs 3 and 4: 9 + 16 = 25, and √25 = 5. The hypotenuse is always the side opposite the right angle and the longest side." },
  { q: "How do I find a missing leg if I know the hypotenuse?", a: "Rearrange the Pythagorean theorem: a = √(c² − b²). With a hypotenuse of 13 and a leg of 5: 169 − 25 = 144, and √144 = 12. The hypotenuse must be longer than the known leg." },
  { q: "Can I find the hypotenuse with one side and an angle?", a: "Yes, using trigonometry. If you know a leg and the angle opposite it, c = leg ÷ sin(angle). If the angle is next to the leg, c = leg ÷ cos(angle). Choose the 'Leg + angle' mode above." },
  { q: "Does the Pythagorean theorem work for any triangle?", a: "No, only for right triangles (one 90° angle). For other triangles use the law of cosines, c² = a² + b² − 2ab·cos(C), which reduces to the Pythagorean theorem when C is 90°." },
  { q: "What is a Pythagorean triple?", a: "A set of three whole numbers that fit a² + b² = c², such as 3-4-5, 5-12-13, 8-15-17 and 7-24-25. Multiples work too, so 6-8-10 is also a right triangle. Builders use 3-4-5 to check corners are square." },
  { q: "What is the hypotenuse of a 45-45-90 triangle?", a: "The two legs are equal, so the hypotenuse is a leg times √2 (about 1.414). A 45-45-90 triangle with legs of 10 has a hypotenuse of about 14.142." },
];
