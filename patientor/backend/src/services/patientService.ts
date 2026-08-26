import patientsEntries from '../../data/patients-full.ts';
import type {
  NewPatientEntry,
  NonSensitivePatientsEntry,
  PatientsEntry,
} from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientsEntry[] => {
  return patientsEntries;
};

const getNonSensitivePatientsEntries = (): NonSensitivePatientsEntry[] => {
  return patientsEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );
};

const addPatient = (entry: NewPatientEntry): PatientsEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patientsEntries.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientsEntry | undefined => {
  const entry = patientsEntries.find((d) => d.id === id);
  return entry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatientsEntries,
  findById,
};
