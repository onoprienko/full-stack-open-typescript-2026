import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App = () => {
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header name="Half Stack application development" />
      {courseParts.map((part) => (
        <Content name={part.name} exerciseCount={part.exerciseCount} />
      ))}
      <Total text="Number of exercises" number={totalExercises} />
    </div>
  );
};

export default App;
