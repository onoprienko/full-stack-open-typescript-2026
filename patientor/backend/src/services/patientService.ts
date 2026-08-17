import patientsEntries from '../../data/patients.ts';
import type { NonSensitivePatientsEntry, PatientsEntry } from '../types.ts';

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

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatientsEntries,
};
