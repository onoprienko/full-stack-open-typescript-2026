import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { NonSensitivePatientsEntry } from '../types.ts';
import { parseNewPatientEntry } from '../utils.ts';
import { z } from 'zod';

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
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
