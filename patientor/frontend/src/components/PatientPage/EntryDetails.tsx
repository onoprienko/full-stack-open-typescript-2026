import Box from '@mui/material/Box';
import { Entry } from '../../types';
import { Diagnosis } from '../../types';
import DiagnosisCodes from './DiagnosisCodes';
import HealthRatingBar from '../HealthRatingBar';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  padding: 2,
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[] | null;
}) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Box key={entry.id} sx={{ ...commonStyles, border: 1 }}>
          <div>
            <div>{entry.date}</div>
            <i>{entry.description}</i>
            <div>diagnosed by {entry.specialist}</div>
            <DiagnosisCodes
              diagnosisCodes={entry.diagnosisCodes}
              diagnoses={diagnoses}
            />
          </div>
          <hr />
          <p>🩺 {entry.type}</p>
          <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box key={entry.id} sx={{ ...commonStyles, border: 1 }}>
          <div>
            <div>{entry.date}</div>
            <i>{entry.description}</i>
            <div>diagnosed by {entry.specialist}</div>
            <DiagnosisCodes
              diagnosisCodes={entry.diagnosisCodes}
              diagnoses={diagnoses}
            />
            <hr />
            <p>💼 {entry.type}</p>
            <div>employerName: {entry.employerName}</div>
            {!entry.sickLeave || (
              <div>
                sick leave: {entry.sickLeave?.startDate} -{' '}
                {entry.sickLeave?.endDate}
              </div>
            )}
          </div>
        </Box>
      );
    case 'Hospital': {
      return (
        <Box key={entry.id} sx={{ ...commonStyles, border: 1 }}>
          <div>
            <div>{entry.date}</div>
            <i>{entry.description}</i>
            <div>diagnosed by {entry.specialist}</div>
          </div>
          <DiagnosisCodes
            diagnosisCodes={entry.diagnosisCodes}
            diagnoses={diagnoses}
          />
          <hr />
          <p>🚑 {entry.type}</p>
          <div>
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </div>
        </Box>
      );
    }
  }
};

export default EntryDetails;
