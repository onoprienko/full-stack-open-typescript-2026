import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { NonSensitivePatientsEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientsEntry[]>) => {
  res.send(patientService.getNonSensitivePatientsEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;
