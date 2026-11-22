export const faq = [
  { q: "What is the formula for the volume of a cone?", a: "V = ⅓ × π × r² × h, where r is the radius of the base and h is the perpendicular height. It's exactly one third of the volume of a cylinder with the same base and height. A cone 2 ft across and 3 ft tall holds ⅓ × π × 1² × 3 ≈ 3.14 cubic feet." },
  { q: "How do I find the volume if I know the diameter?", a: "Halve the diameter to get the radius, or use V = π × d² × h ÷ 12. Using the diameter in place of the radius makes the answer four times too big." },
  { q: "What if I only know the slant height?", a: "Find the perpendicular height with the Pythagorean theorem: h = √(slant² − r²). A cone with radius 3 and slant height 5 has a height of 4, so its volume is ⅓ × π × 9 × 4 ≈ 37.7." },
  { q: "How do I calculate the volume of a truncated cone (frustum)?", a: "V = ⅓ × π × h × (R² + R·r + r²), where R and r are the bottom and top radii. A bucket shape with radii 2 and 1 and height 3 holds ⅓ × π × 3 × (4 + 2 + 1) ≈ 21.99 cubic units." },
  { q: "How do I find the surface area of a cone?", a: "The curved side has area π × r × slant height, and the base adds π × r². For radius 1 and height 3, the slant height is √10 ≈ 3.162, so the total surface area is π × 1 × 3.162 + π ≈ 13.08 square units." },
  { q: "Why is a cone one third of a cylinder?", a: "It can be shown with calculus (stacking thin circular slices whose radius shrinks linearly) or with a simple experiment: filling a cone with water and pouring it into a cylinder of the same base and height takes exactly three cones." },
];
