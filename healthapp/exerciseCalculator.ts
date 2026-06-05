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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
