import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
// @mui
import { Grid, Container, Typography } from '@mui/material';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { store } from '../redux/Store';
import { fetchEcole } from '../redux/ecoleReducer';
import { fetchParents } from '../redux/parentsReducer';

function countItems(array) {
  return array.length
}

export default function DashboardAppPage() {

  const { ecoleList } = useSelector((state) => state.ecole);
  const { parentList } = useSelector((state) => state.patients);

  useEffect(() => {
    // Fetch doctor and patient lists when component mounts
    store.dispatch(fetchEcole());
    store.dispatch(fetchParents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.dispatch]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Elimu </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Ecole" total={countItems(ecoleList)} icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Parents" total={countItems(parentList)} color="error" icon={'ant-design:user-outlined'} />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
