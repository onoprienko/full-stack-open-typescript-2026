import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const GenderIcon = ({ gender }: { gender: Patient['gender'] }) => {
  if (gender === 'male') return <MaleIcon />;
  if (gender === 'female') return <FemaleIcon />;
  return null;
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const id = useParams().id as string;

  useEffect(() => {
    const getPatient = async () => {
      if (!id) {
        setPatient(null);
        return;
      }
      try {
        const data = await patientService.getOne(id);
        setPatient(data);
      } catch (error) {
        console.error(error);
        setPatient(null);
      }
    };
    getPatient();
  }, [id]);

  if (!patient) {
    return <div>Patient not found.</div>;
  }

  return (
    <div>
      <Typography variant="h4">
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
    </div>
  );
};

export default PatientPage;
