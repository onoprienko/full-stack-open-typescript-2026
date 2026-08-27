import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { NonSensitivePatientsEntry } from '../types.ts';
import { parseNewPatientEntry, parseNewEntry } from '../utils.ts';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientsEntry[]>) => {
  res.send(patientService.getNonSensitivePatientsEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
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

router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;
  try {
    const newEntry = parseNewEntry(req.body);
    const addedEntry = patientService.addEntry(patientId, newEntry);
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
