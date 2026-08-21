import { useState, useEffect } from 'react';
import axios from 'axios';

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then((response) => {
      setDiaries(response.data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      id: Number(diaries.length + 1),
      date: newDate,
      weather: 'new',
      visibility: 'new',
    };
    setDiaries(diaries.concat(diaryToAdd));
    setNewDate('');
  };

  return (
    <div>
      <form onSubmit={diaryCreation}>
        <p>
          <label>date: </label>
          <input
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </p>

        <button type="submit">add</button>
      </form>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <p>
              <b>{diary.date}</b>
            </p>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
