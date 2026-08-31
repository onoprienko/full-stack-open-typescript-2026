import { useState, SyntheticEvent } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import patientService from '../../services/patients';
import { Patient, NewEntry } from '../../types';
import Alert from '@mui/material/Alert';

type EntryFormProps = {
  patient: Patient;
  setPatient: (patient: Patient) => void;
};

type AlertState = {
  text: string | null;
  severity?: 'success' | 'info' | 'warning' | 'error' | null;
};

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  borderStyle: 'dashed',
  borderWidth: 1,
  padding: 2,
};

const EntryForm = ({ patient, setPatient }: EntryFormProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const [alert, setAlert] = useState<AlertState>({
    text: null,
    severity: null,
  });

  const alertHandler = ({ text, severity }: AlertState) => {
    setAlert({ text, severity });
    setTimeout(() => {
      setAlert({ text: null });
    }, 5000);
  };

  const handleCreateNew = (e: SyntheticEvent) => {
    e.preventDefault();
    createNew();
  };

  const createNew = async () => {
    const newEntry: NewEntry = {
      type: 'HealthCheck',
      date,
      description,
      specialist,
      healthCheckRating: Number(healthCheckRating),
    };
    if (diagnosisCodes) newEntry.diagnosisCodes = diagnosisCodes.split(',');

    try {
      const patientUpdated = await patientService.addEntry(
        patient.id,
        newEntry,
      );
      console.log(patientUpdated);
      setPatient(patientUpdated);
      alertHandler({ text: 'Entry was added', severity: 'success' });
    } catch (e: unknown) {
      console.log(e);
      console.error('Unknown error', e);
      const message =
        e instanceof Error ? e.message : String(e) || 'Unknown error';
      alertHandler({ text: `error: ${message}`, severity: 'error' });
    }
  };

  return (
    <Box sx={{ ...commonStyles }}>
      <Typography variant="h5">New HelthCheck Entry</Typography>
      {!alert.text || (
        <Alert severity={alert.severity || 'info'}>{alert.text}</Alert>
      )}
      <form onSubmit={handleCreateNew} className="newblog-form">
        <div>
          <TextField
            label="date"
            required={true}
            value={date}
            onChange={({ target }) => setDate(target.value)}
            size="small"
          />
        </div>
        <div>
          <TextField
            label="description"
            required={true}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            size="small"
          />
        </div>
        <div>
          <TextField
            label="specialist"
            required={true}
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            size="small"
          />
        </div>
        <div>
          <TextField
            label="Health Check Rating (0-3)"
            required={true}
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
            size="small"
          />
        </div>
        <div>
          <TextField
            label="Diagnosis Codes (comma-separated)"
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
            size="small"
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="submit" variant="contained">
            add
          </Button>
          <Button type="submit" variant="outlined" style={{ marginLeft: 10 }}>
            cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default EntryForm;
