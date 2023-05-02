import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
// @mui
import { Grid, Container, Typography } from '@mui/material';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { store } from '../redux/Store';
import { fetchDoctors } from '../redux/doctorsReducer';
import { fetchPatients } from '../redux/patientsReducer';

function countItems(doctorsArray) {
  return doctorsArray.length
}

export default function DashboardAppPage() {

  const { doctorList } = useSelector((state) => state.doctors);
  const { patientList } = useSelector((state) => state.patients);

  useEffect(() => {
    // Fetch doctor and patient lists when component mounts
    store.dispatch(fetchDoctors());
    store.dispatch(fetchPatients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.dispatch]);

  return (
    <>
      <Helmet>
        <title> Dashboard | We care </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Doctors" total={countItems(doctorList)} icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Patients" total={countItems(patientList)} color="error" icon={'ant-design:user-outlined'} />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
