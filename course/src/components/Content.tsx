interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content = ({ name, exerciseCount }: ContentProps) => {
  return (
    <p key={name}>
      {name} {exerciseCount}
    </p>
  );
};

export default Content;
