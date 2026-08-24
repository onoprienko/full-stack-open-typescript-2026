import axios from 'axios';
import type { Diary, NewDiary } from './types';

interface ValidationError {
  status: number;
  message?: string;
  error?: Array<{ message: string }>;
}

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async (): Promise<Diary[]> => {
  try {
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Failed to fetch diary: ' + error.message, {
        cause: error,
      });
    }
    throw new Error('Something went wrong', { cause: error });
  }
};

const create = async (object: NewDiary) => {
  try {
    const response = await axios.post<Diary>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      //console.log(error.status, error.message, error.response?.data.error);
      const messages = error.response?.data.error?.map(
        (error) => error.message,
      );
      throw new Error('Failed to create diary: ' + messages?.join(', '), {
        cause: error,
      });
    } else {
      console.error(error);
      throw new Error('Something went wrong', { cause: error });
    }
  }
};

export default { getAll, create };
