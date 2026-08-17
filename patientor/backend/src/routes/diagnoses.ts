import express, { type Response } from 'express';
import diagnosisService from '../services/diagnosisService.ts';
import type { NonSensitiveDiagnosesEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiagnosesEntry[]>) => {
  res.send(diagnosisService.getNonSensitiveDiagnosesEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
