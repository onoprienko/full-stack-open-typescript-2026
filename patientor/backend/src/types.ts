// Diary
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

// Diagnoses
export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitiveDiagnosesEntry = Omit<DiagnosesEntry, 'latin'>;

//Patients
export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn?: string;
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;
