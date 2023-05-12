import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
// @mui
import { Grid, Container, Typography } from '@mui/material';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { store } from '../redux/Store';
import { fetchParents } from '../redux/parentsReducer';
import { fetchEleve } from '../redux/eleveReducer';
import { fetchCommunication } from '../redux/communicationReducer';
import { fetchClasse } from '../redux/classeReducer';

function countItems(ar) {
  return ar.length
}

export default function DashboardAppPage() {

  const { parentList } = useSelector((state) => state.parents);
  const { eleveList } = useSelector((state) => state.eleves);
  const { classeList } = useSelector((state) => state.classes);
  const { communicationList } = useSelector((state) => state.communications);

  useEffect(() => {
    // Fetch doctor and patient lists when component mounts
    store.dispatch(fetchParents());
    store.dispatch(fetchEleve());
    store.dispatch(fetchCommunication());
    store.dispatch(fetchClasse());
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
            <AppWidgetSummary title="Classe" total={countItems(classeList)} icon={'healthicons:i-training-class'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Parents" total={countItems(parentList)} color="error" icon={'ri:parent-line'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Eleves" total={countItems(eleveList)} color="info" icon={'ph:student-light'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Communications" total={countItems(communicationList)} color="warning" icon={'material-symbols:communication'} />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
