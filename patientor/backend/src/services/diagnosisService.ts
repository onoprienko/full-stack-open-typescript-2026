import diagnosesEntries from '../../data/diagnoses.ts';
import type { NonSensitiveDiagnosesEntry, DiagnosesEntry } from '../types.ts';

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnosesEntries;
};

const getNonSensitiveDiagnosesEntries = (): NonSensitiveDiagnosesEntry[] => {
  return diagnosesEntries.map(({ code, name }) => ({ code, name }));
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis,
  getNonSensitiveDiagnosesEntries,
};
