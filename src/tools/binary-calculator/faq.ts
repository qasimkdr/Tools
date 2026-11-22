export const faq = [
  { q: "How do I convert binary to decimal?", a: "Multiply each digit by its place value (powers of 2, starting with 1 on the right) and add them up. 10011100 = 128 + 16 + 8 + 4 = 156." },
  { q: "How do I convert decimal to binary?", a: "Divide by 2 repeatedly and write down the remainders, then read them from bottom to top. 13 ÷ 2 = 6 r1, 6 ÷ 2 = 3 r0, 3 ÷ 2 = 1 r1, 1 ÷ 2 = 0 r1, so 13 = 1101." },
  { q: "How do I convert binary to hexadecimal?", a: "Split the binary number into groups of four bits from the right and replace each group with one hex digit: 1001 1100 = 9C. Each hex digit is exactly four bits, which is why programmers use hex as shorthand for binary." },
  { q: "What is two's complement?", a: "It's how computers store negative integers. To get −n in a fixed number of bits, write n in binary, flip every bit, and add 1. In 8 bits, 5 = 00000101, flipped = 11111010, plus 1 = 11111011, which represents −5." },
  { q: "How do you add binary numbers?", a: "Like decimal addition, but you carry when a column reaches 2: 0+0 = 0, 0+1 = 1, 1+1 = 10 (write 0, carry 1), 1+1+1 = 11. For example, 1011 + 110 = 10001 (11 + 6 = 17)." },
  { q: "Why can't 0.1 be written exactly in binary?", a: "Only fractions whose denominator is a power of 2 terminate in binary. 0.1 = 1/10 repeats forever (0.000110011…), just as 1/3 repeats in decimal. That's why computers sometimes show 0.1 + 0.2 as 0.30000000000000004." },
  { q: "How is text converted to binary?", a: "Each character is encoded as one or more bytes (here using UTF-8, which matches ASCII for English letters), and each byte is written as 8 bits. \"H\" is 72 = 01001000 and \"i\" is 105 = 01101001." },
];
