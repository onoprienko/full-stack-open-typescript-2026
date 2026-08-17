import express from 'express';
import diaryRouter from './routes/diaries.ts';
import diagnosesRouter from './routes/diagnoses.ts';
import patientsRouter from './routes/patients.ts';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientsRouter);

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
