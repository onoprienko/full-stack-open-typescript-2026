import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { NonSensitivePatientsEntry } from '../types.ts';
import { parseNewPatientEntry } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientsEntry[]>) => {
  res.send(patientService.getNonSensitivePatientsEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
