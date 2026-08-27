import { Diagnosis } from '../../types';

type DiagnosisCodesProps = {
  diagnosisCodes?: Array<Diagnosis['code']>;
  diagnoses: Diagnosis[] | null;
};

const DiagnosisCodes = ({ diagnosisCodes, diagnoses }: DiagnosisCodesProps) => {
  return (
    <ul>
      {diagnosisCodes?.map((code) => {
        const name = diagnoses?.find((item) => item.code === code)?.name;
        return (
          <li key={code}>
            {code} {name}
          </li>
        );
      })}
    </ul>
  );
};

export default DiagnosisCodes;
