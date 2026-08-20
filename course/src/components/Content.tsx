import Part from './../components/Part';
import type { CoursePart } from './../App';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((part) => (
        <Part part={part} />
      ))}
    </>
  );
};

export default Content;
