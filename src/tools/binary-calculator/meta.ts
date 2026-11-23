import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "binary-calculator",
  name: "Binary Converter & Calculator",
  title: "Binary Converter: Binary, Decimal, Hex & Text Calculator",
  description: "Convert binary to decimal, hex and octal and back, including fractions and two's complement. Add, subtract, multiply or divide binary, or turn text into binary.",
  short: "Binary ↔ decimal/hex/octal, two's complement, binary math and text to binary.",
  category: "math",
  primaryKw: "binary converter",
  keywords: ["binary calculator", "binary to decimal", "decimal to binary", "binary number converter", "hex to binary", "binary translator", "twos complement"],
  related: ["scientific-notation-calculator", "square-root-calculator", "fraction-calculator", "random-number-generator"],
  sources: [{ name: "Princeton IntroCS: Binary converter", url: "https://introcs.cs.princeton.edu/java/61data/BinaryConverter.java.html" }, { name: "Wikipedia: Binary number", url: "https://en.wikipedia.org/wiki/Binary_number" }],
  published: "2026-11-22",
  updated: "2026-11-22",
  icon: "💻",
};
export default meta;
