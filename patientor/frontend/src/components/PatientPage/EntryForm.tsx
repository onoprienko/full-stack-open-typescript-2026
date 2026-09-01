import { useState, SyntheticEvent } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import patientService from '../../services/patients';
import { Patient, NewEntry, Entry } from '../../types';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';

import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  marginBottom: 4,
};

const EntryForm = ({ patient, setPatient }: EntryFormProps) => {
  const [entryType, setEntryType] = useState<Entry['type']>('HealthCheck');
  const [date, setDate] = useState(dayjs(new Date()));
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const [healthCheckRating, setHealthCheckRating] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [dischargeDate, setDischargeDate] = useState(dayjs(new Date()));
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setEntryType(event.target.value as Entry['type']);
  };

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

  const resetForm = () => {
    setEntryType('HealthCheck');
    setDate(dayjs(new Date()));
    setDescription('');
    setSpecialist('');
    setDiagnosisCodes('');
    setHealthCheckRating('');
    setEmployerName('');
    setStartDate(null);
    setEndDate(null);
    setDischargeDate(dayjs(new Date()));
    setDischargeCriteria('');
  };

  const handleCreateNew = (e: SyntheticEvent) => {
    e.preventDefault();
    createNew();
  };

  const createNew = async () => {
    let newEntry: NewEntry = {
      type: entryType,
      date: date.format('YYYY-MM-DD'),
      description,
      specialist,
    };

    switch (newEntry.type) {
      case 'HealthCheck':
        newEntry = {
          ...newEntry,
          healthCheckRating: Number(healthCheckRating),
        } as NewEntry;
        break;
      case 'OccupationalHealthcare':
        newEntry = {
          ...newEntry,
          employerName,
        } as NewEntry;
        if (startDate && endDate) {
          newEntry = {
            ...newEntry,
            sickLeave: {
              startDate: startDate.format('YYYY-MM-DD'),
              endDate: endDate.format('YYYY-MM-DD'),
            },
          } as NewEntry;
        }
        break;
      case 'Hospital':
        newEntry = {
          ...newEntry,
          discharge: {
            date: dischargeDate.format('YYYY-MM-DD'),
            criteria: dischargeCriteria,
          },
        } as NewEntry;
    }

    if (diagnosisCodes) newEntry.diagnosisCodes = diagnosisCodes.split(',');

    try {
      const patientUpdated = await patientService.addEntry(
        patient.id,
        newEntry,
      );
      setPatient(patientUpdated);
      alertHandler({ text: 'Entry was added', severity: 'success' });
      resetForm();
    } catch (e: unknown) {
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
          <Select
            labelId="entry-type-select-label"
            id="entry-type-select"
            value={entryType}
            label="Entry type"
            onChange={handleChange}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="date"
              value={date}
              onChange={(newValue) => {
                if (newValue != null) setDate(newValue);
              }}
              format="YYYY-MM-DD"
            />
          </LocalizationProvider>
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
            label="Diagnosis Codes (comma-separated)"
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
            size="small"
          />
        </div>
        <hr />
        {(() => {
          switch (entryType) {
            case 'HealthCheck':
              return (
                <div>
                  <TextField
                    label="Health Check Rating (0-3)"
                    required={true}
                    value={healthCheckRating}
                    onChange={({ target }) =>
                      setHealthCheckRating(target.value)
                    }
                    size="small"
                  />
                </div>
              );
            case 'OccupationalHealthcare':
              return (
                <div>
                  <div>
                    <TextField
                      label="employer name"
                      required={true}
                      value={employerName}
                      onChange={({ target }) => setEmployerName(target.value)}
                      size="small"
                    />
                  </div>
                  <div>
                    <p>Sick leave:</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Start date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        format="YYYY-MM-DD"
                        minDate={dayjs(new Date())}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="End date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        format="YYYY-MM-DD"
                        minDate={dayjs(new Date())}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              );
            case 'Hospital':
              return (
                <div>
                  <p>Discharge:</p>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="dischargeDate"
                        value={dischargeDate}
                        onChange={(newValue) => {
                          if (newValue != null) setDischargeDate(newValue);
                        }}
                        format="YYYY-MM-DD"
                      />
                    </LocalizationProvider>
                  </div>
                  <div>
                    <TextField
                      label="criteria"
                      required={true}
                      value={dischargeCriteria}
                      onChange={({ target }) =>
                        setDischargeCriteria(target.value)
                      }
                      size="small"
                    />
                  </div>
                </div>
              );
          }
        })()}
        <hr />
        <div style={{ marginTop: 10 }}>
          <Button type="submit" variant="contained">
            add
          </Button>
          <Button
            type="button"
            variant="outlined"
            style={{ marginLeft: 10 }}
            onClick={resetForm}
          >
            cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default EntryForm;
