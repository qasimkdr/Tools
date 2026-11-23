export const faq = [
  { q: "What is Ohm's law?", a: "Ohm's law says the current through a conductor is proportional to the voltage across it: V = I × R, where V is voltage in volts, I is current in amps and R is resistance in ohms. Rearranged, I = V ÷ R and R = V ÷ I." },
  { q: "How do you calculate power from voltage and current?", a: "P = V × I. Combining this with Ohm's law gives P = I² × R and P = V² ÷ R. A 12 V supply across an 8 Ω resistor drives 1.5 A and dissipates 12 × 1.5 = 18 W." },
  { q: "How do I convert watts to amps?", a: "Divide watts by volts: I = P ÷ V. A 1,200 W appliance on 120 V draws 10 A; on 230 V it draws about 5.2 A." },
  { q: "What resistor do I need for an LED?", a: "Subtract the LED's forward voltage from the supply and divide by the desired current: R = (Vsupply − Vled) ÷ I. With 5 V, a 2 V LED and 20 mA, R = 3 ÷ 0.02 = 150 Ω; choose the next standard value up and check the resistor's power rating (here 0.06 W)." },
  { q: "Does Ohm's law work for AC circuits?", a: "For purely resistive loads such as heaters and incandescent bulbs, yes, using RMS values. Circuits with motors, transformers or capacitors have reactance, so you use impedance (Z) and power factor instead of plain resistance." },
  { q: "What is the Ohm's law triangle?", a: "A memory aid with V at the top and I and R side by side at the bottom. Cover the quantity you want: V = I × R, I = V ÷ R, R = V ÷ I." },
];
