export const faq = [
  { q: "How do Nether coordinates work?", a: "Each block you travel in the Nether equals 8 blocks in the Overworld, horizontally. To find the matching Nether position, divide your Overworld X and Z by 8; to go back, multiply Nether X and Z by 8. The Y coordinate (height) isn't scaled." },
  { q: "How do I link two Nether portals?", a: "Build your first portal in the Overworld and note its X and Z. Divide each by 8 (rounding down) and build the Nether portal at those coordinates. Portals placed at matching coordinates connect to each other instead of the game creating a new portal somewhere else." },
  { q: "What about negative coordinates?", a: "Divide and round down (toward negative infinity), not toward zero. Overworld X = −100 becomes Nether X = −13, because −100 ÷ 8 = −12.5, and rounding down gives −13." },
  { q: "Why use the Nether to travel?", a: "Because distances are 8 times shorter. Walking 1,000 blocks in the Nether covers 8,000 blocks in the Overworld, which makes the Nether a fast-travel network between distant bases." },
  { q: "Is the ratio the same in Java and Bedrock?", a: "Yes. Both editions use the same 1:8 horizontal scale between the Nether and the Overworld." },
  { q: "Does Y matter when linking portals?", a: "Y isn't divided, but it still affects which portal the game picks. Building the second portal near the same height helps them link reliably, as long as that height is safe in the Nether." },
];
