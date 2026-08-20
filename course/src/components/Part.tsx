import type { CoursePart } from './../App';

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <ul key={part.name}>
          <li>
            Part name: <strong>{part.name}</strong>
          </li>
          <li>Exercise count: {part.exerciseCount}</li>
          <li>Description: {part.description}</li>
        </ul>
      );
    case 'group':
      return (
        <ul key={part.name}>
          <li>
            Part name: <strong>{part.name}</strong>
          </li>
          <li>Exercise count: {part.exerciseCount}</li>
          <li>Group project count {part.groupProjectCount}</li>
        </ul>
      );
    case 'background':
      return (
        <ul key={part.name}>
          <li>
            Part name: <strong>{part.name}</strong>
          </li>
          <li>Exercise count: {part.exerciseCount}</li>
          <li>Description: {part.description}</li>
          <li>Background material: {part.backgroundMaterial}</li>
        </ul>
      );
    case 'special':
      return (
        <ul key={part.name}>
          <li>
            Part name: <strong>{part.name}</strong>
          </li>
          <li>Exercise count: {part.exerciseCount}</li>
          <li>Description: {part.description}</li>
          <li>Requirements: {part.requirements.join(', ')}</li>
        </ul>
      );
  }
};

export default Part;
