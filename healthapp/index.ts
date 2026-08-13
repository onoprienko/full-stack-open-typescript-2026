import express from 'express';
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

import { calculateBmi, validateBmiInputData } from './bmiCalculator.ts';
import {
  calculateExercises,
  validateExercisesInputData,
} from './exerciseCalculator.ts';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = validateBmiInputData(
      req.query.height,
      req.query.weight,
    );
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      res.status(400).json({ error: `malformatted parameters` });
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
      res.status(400).json({
        error: `${error.message.includes('missing') ? 'parameters missing' : 'malformatted parameters'}`,
      });
    } else {
      console.error('Unknown error');
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
