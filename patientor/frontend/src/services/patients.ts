import axios from 'axios';
import { Patient, PatientFormValues, NewEntry } from '../types';

import { apiBaseUrl } from '../constants';

interface ValidationError {
  status: number;
  message?: string;
  error?: Array<{ message: string }>;
}

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (id: string, object: NewEntry) => {
  try {
    const { data } = await axios.post<Patient>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      //console.log(error.status, error.message, error.response?.data.error);
      const messages = error.response?.data.error?.map(
        (error) => error.message,
      );
      throw new Error('Failed to create entry: ' + messages?.join(', '));
    } else {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }
};

export default {
  getAll,
  getOne,
  create,
  addEntry,
};
