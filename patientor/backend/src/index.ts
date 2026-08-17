import express from 'express';
import diaryRouter from './routes/diaries.ts';
import diagnosesRouter from './routes/diagnoses.ts';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  console.log('patients endpoint request');
  res.send('patients');
});

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
