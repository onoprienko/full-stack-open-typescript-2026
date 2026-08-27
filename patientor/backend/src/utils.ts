import type { NewPatientEntry, Entry, NewEntry } from './types.ts';
import { Weather, Visibility, Gender } from './types.ts';
import { z } from 'zod';

// Diary
export const NewEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string().optional(),
});

//Patients
export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().optional(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};

export const parseNewEntry = (object: unknown): NewEntry => {
  const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
  });

  const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal('Hospital'),
    discharge: z.object({ date: z.iso.date(), criteria: z.string() }),
  });

  const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal('OccupationalHealthcare'),
    employerName: z.string(),
    sickLeave: z
      .object({ startDate: z.iso.date(), endDate: z.iso.date() })
      .optional(),
  });

  const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal('HealthCheck'),
    healthCheckRating: z.number().int().min(0).max(3),
  });

  const NewPatientEntryRecordSchema = z.discriminatedUnion('type', [
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
    HealthCheckEntrySchema,
  ]);

  return NewPatientEntryRecordSchema.parse(object);
};

export default {};
