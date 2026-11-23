export const faq = [
  { q: "What is implicit differentiation?", a: "A way to find dy/dx when y isn't written as a function of x. Differentiate both sides of the equation with respect to x, multiplying every derivative of a y-term by dy/dx (chain rule), then solve for dy/dx." },
  { q: "How do you find dy/dx for x² + y² = 25?", a: "Differentiate: 2x + 2y·dy/dx = 0, so dy/dx = −x/y. At the point (3, 4), the slope is −3/4 = −0.75 and the tangent line is y = −0.75x + 6.25." },
  { q: "Is there a shortcut formula?", a: "Yes. Write the equation as F(x, y) = 0. Then dy/dx = −F_x / F_y, where F_x and F_y are the partial derivatives. For F = x² + y² − 25: F_x = 2x, F_y = 2y, so dy/dx = −x/y." },
  { q: "How do I find the second derivative implicitly?", a: "Differentiate dy/dx again with respect to x, still treating y as a function of x, and substitute dy/dx back in. For the circle, d²y/dx² = −(x² + y²)/y³ = −25/y³. The calculator gives its value at any point you enter." },
  { q: "How do I find the tangent line with implicit differentiation?", a: "Evaluate dy/dx at the point to get the slope m, then use y − y₀ = m(x − x₀). If the denominator of dy/dx is zero there, the tangent is vertical: x = x₀." },
  { q: "Why does the calculator say my point is not on the curve?", a: "The point doesn't satisfy the equation: the left and right sides give different values there. A slope or tangent line only makes sense at a point on the curve, so check the coordinates." },
  { q: "Which functions can I use?", a: "Powers (^), sqrt, sin, cos, tan, sec, csc, cot, their inverses (asin, acos, atan), sinh, cosh, tanh, exp, e^( ), ln (natural log) and log (base 10). Multiplication can be implicit: 2xy means 2·x·y." },
];
