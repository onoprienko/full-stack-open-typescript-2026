import { useState, SyntheticEvent, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import patientService from '../../services/patients';
import { Patient, NewEntry, Entry, Diagnosis } from '../../types';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import diagnosesService from '../../services/diagnoses';

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
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [dischargeDate, setDischargeDate] = useState(dayjs(new Date()));
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  useEffect(() => {
    const getDiagnoses = async () => {
      try {
        const data = await diagnosesService.getAll();
        setDiagnoses(data);
      } catch (error) {
        console.error(error);
        setDiagnoses(null);
      }
    };
    getDiagnoses();
  }, [patient]);

  const handleDiagnosesCodesChange = (
    event: SelectChangeEvent<string | string[]>,
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
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
    setDate('');
    setDescription('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setHealthCheckRating(0);
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
      date,
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

    if (diagnosisCodes) newEntry.diagnosisCodes = diagnosisCodes;

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
        <FormControl>
          <InputLabel id="entry-type-select-label">Entry type</InputLabel>
          <Select
            labelId="entry-type-select-label"
            id="entry-type-select"
            value={entryType}
            label="Entry type"
            onChange={handleTypeChange}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField
            label="date"
            required={true}
            value={date}
            onChange={({ target }) => setDate(target.value)}
            size="small"
            type="date"
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
          <FormControl fullWidth>
            <InputLabel id="diagnoses-codes-label">Diagnosis Codes</InputLabel>
            <Select
              labelId="diagnoses-codes-label"
              id="diagnoses-codes"
              multiple
              value={diagnosisCodes}
              onChange={handleDiagnosesCodesChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {diagnoses?.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <hr />
        {(() => {
          switch (entryType) {
            case 'HealthCheck':
              return (
                <FormControl>
                  <InputLabel id="health-check-rating-label">
                    Health Check Rating (0-3)
                  </InputLabel>
                  <Select
                    labelId="health-check-rating-label"
                    id="health-check-rating"
                    value={healthCheckRating}
                    label="Health Check Rating (0-3)"
                    onChange={({ target }) =>
                      setHealthCheckRating(target.value)
                    }
                  >
                    <MenuItem value="0">0 - Healthy</MenuItem>
                    <MenuItem value="1">1 - Low Risk</MenuItem>
                    <MenuItem value="2">2 - High Risk</MenuItem>
                    <MenuItem value="3">3 - Critical Risk</MenuItem>
                  </Select>
                </FormControl>
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
            Add New Entry
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
