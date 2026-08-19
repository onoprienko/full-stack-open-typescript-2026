import type { NewEntrySchema, NewPatientEntrySchema } from './utils.ts';
import type { z } from 'zod';

// Diary
export const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];

export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}

// Diagnoses
export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitiveDiagnosesEntry = Omit<DiagnosesEntry, 'latin'>;

//Patients
export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export interface PatientsEntry extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;
