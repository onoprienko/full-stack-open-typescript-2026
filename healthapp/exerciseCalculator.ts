import { isNotNumber } from './utils.ts';

type Rating = 1 | 2 | 3;

interface calculateExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  hoursPerDay: Array<number>,
  target: number,
): calculateExercisesResult => {
  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter((day) => day !== 0).length;
  const average = hoursPerDay.reduce((sum, h) => h + sum, 0) / periodLength;
  const success = average >= target;

  const calculateRating = () => {
    if (success) return 3;
    if (target / average < 0.5) return 1;
    return 2;
  };
  const rating = calculateRating();
  const ratingDescription = () => {
    if (rating === 2) return 'not too bad but could be better';
    if (rating === 1) return 'you must try harder';
    return 'Excellent';
  };
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription(),
    target,
    average,
  };
};

const validateExercisesInputData = (rawTarget: unknown, rawHours: unknown) => {
  if (!rawTarget || !rawHours) throw new Error('Some data missing');
  if (isNotNumber(rawTarget)) throw new Error('Target not a number');

  const target: number = Number(rawTarget);
  if (target < 0) throw new Error('Target must be positive number');

  const hoursPerDay: Array<number> = (rawHours as unknown[]).map((hour) => {
    if (isNotNumber(hour)) throw new Error('All values must be a numbers');
    const num = Number(hour);
    if (num < 0) throw new Error('All values must be positive number');
    return num;
  });

  return { hoursPerDay, target };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { hoursPerDay, target } = validateExercisesInputData(
      process.argv[2],
      process.argv.slice(3),
    );
    console.log(calculateExercises(hoursPerDay, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error');
    }
  }
}

export { calculateExercises, validateExercisesInputData };
