import { useState, useEffect } from 'react';
import type { Diary } from './types';
import diaryService from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newDiary = {
        id: Number(diaries.length + 1),
        date: newDate,
        weather: newWeather,
        visibility: newVisibility,
        comment: newComment,
      };

      const returnedDiary = await diaryService.create(newDiary);
      setDiaries(diaries.concat(returnedDiary));

      setNewDate('');
      setNewVisibility('');
      setNewWeather('');
      setNewComment('');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';

      setErrorMessage(`Error: ${message}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <p>
          <label>date: </label>
          <input
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </p>
        <p>
          <label>visibility: </label>
          <input
            value={newVisibility}
            onChange={(event) => setNewVisibility(event.target.value)}
          />
        </p>
        <p>
          <label>weather: </label>
          <input
            value={newWeather}
            onChange={(event) => setNewWeather(event.target.value)}
          />
        </p>
        <p>
          <label>comment: </label>
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </p>

        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <p>
              <b>{diary.date}</b>
            </p>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
            <p>comment: {diary.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
