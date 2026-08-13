import express from 'express';
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

import calculateBmi from './bmiCalculator.ts';
import {
  calculateExercises,
  validateExercisesInputData,
} from './exerciseCalculator.ts';
import { isNotNumber } from './utils.ts';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const rawHeight = req.query.height;
    const rawWeight = req.query.weight;

    if (rawHeight === undefined || rawWeight === undefined)
      throw new Error('Height and weight must be provided');
    if (isNotNumber(rawHeight)) throw new Error('Height not a number');
    const height: number = Number(rawHeight);
    if (height <= 0) throw new Error('Height must be positive number');
    if (isNotNumber(rawWeight)) throw new Error('Weight not a number');
    const weight: number = Number(rawWeight);
    if (weight <= 0) throw new Error('Weight must be positive number');

    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      res
        .status(400)
        .json({ error: `malformatted parameters. ${error.message}` });
    } else {
      console.error('Unknown error');
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

app.post('/exercises', (req, res) => {
  try {
    const body = req.body as { target?: unknown; daily_exercises?: unknown };
    const { hoursPerDay, target } = validateExercisesInputData(
      body.target,
      body.daily_exercises,
    );

    res.json(calculateExercises(hoursPerDay, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      res.status(400).json({ error: `${error.message}` });
    } else {
      console.error('Unknown error');
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
