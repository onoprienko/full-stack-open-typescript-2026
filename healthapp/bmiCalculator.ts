import { isNotNumber } from './utils.ts';

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = Math.round(weight / (height / 100) ** 2);
  if (bmi < 25) return `Normal`;
  if (bmi < 30) return `Overweight`;
  return `Obese`;
};

const validateBmiInputData = (rawHeight: unknown, rawWeight: unknown) => {
  if (rawHeight === undefined || rawWeight === undefined)
    throw new Error('Height and weight must be provided');
  if (isNotNumber(rawHeight)) throw new Error('Height not a number');
  const height: number = Number(rawHeight);
  if (height <= 0) throw new Error('Height must be positive number');
  if (isNotNumber(rawWeight)) throw new Error('Weight not a number');
  const weight: number = Number(rawWeight);
  if (weight <= 0) throw new Error('Weight must be positive number');

  return { height, weight };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = validateBmiInputData(
      process.argv[2],
      process.argv[3],
    );

    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error');
    }
    process.exit(1);
  }
}

export { calculateBmi, validateBmiInputData };
