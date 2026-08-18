import patientsEntries from '../../data/patients.ts';
import type { NonSensitivePatientsEntry, PatientsEntry } from '../types.ts';
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

const addPatient = (entry: object) => {
  //TODO: proper patient type
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patientsEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatientsEntries,
};
