const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = Math.round(weight / (height / 100) ** 2);
  if (bmi < 25) return `Normal range`;
  if (bmi < 30) return `Overweight range`;
  return `Obese range`;
};

console.log(calculateBmi(180, 74));
