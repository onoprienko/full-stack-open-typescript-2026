interface TotalProps {
  text: string;
  number: number;
}

const Total = ({ text, number }: TotalProps) => {
  return (
    <p>
      {text} {number}
    </p>
  );
};

export default Total;
