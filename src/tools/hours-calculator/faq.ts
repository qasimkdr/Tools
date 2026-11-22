export const faq = [
  { q: "How do I calculate hours worked?", a: "Subtract the start time from the end time, then subtract unpaid breaks. 8:00 AM to 5:00 PM is 9 hours; minus a 1-hour lunch, that's 8 hours worked. Converting both times to 24-hour format first avoids AM/PM mistakes." },
  { q: "How do I calculate an overnight shift?", a: "If the end time is earlier than the start time, the shift crossed midnight, so add 24 hours to the end time before subtracting. 10:00 PM to 6:30 AM is (6:30 + 24:00) − 22:00 = 8 hours 30 minutes. The calculator does this automatically." },
  { q: "How do I convert minutes to decimal hours?", a: "Divide the minutes by 60. 7 hours 45 minutes is 7 + 45 ÷ 60 = 7.75 hours. Payroll systems usually need decimal hours: 15 minutes is 0.25, 30 minutes is 0.5 and 45 minutes is 0.75." },
  { q: "When does overtime start?", a: "Under the federal Fair Labor Standards Act, covered non-exempt employees must get at least 1.5 times their regular rate for hours over 40 in a workweek. Some states, such as California, also require daily overtime, so check your state's rules." },
  { q: "How many work hours are in a year?", a: "A full-time 40-hour week for 52 weeks is 2,080 hours. With two weeks of vacation, that's about 2,000 hours actually worked." },
  { q: "What time will it be in 8 hours?", a: "Use the 'Hours from now' tab: it adds any number of hours and minutes to the current time (or a time you choose) and shows the day if it passes midnight." },
];
