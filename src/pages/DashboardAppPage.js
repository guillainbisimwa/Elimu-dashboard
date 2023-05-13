import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import { faker } from "@faker-js/faker";
import { sample, uniq } from 'lodash';

// @mui
import { Grid, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { store } from '../redux/Store';
import { fetchParents } from '../redux/parentsReducer';
import { fetchEleve } from '../redux/eleveReducer';
import { fetchCommunication } from '../redux/communicationReducer';
import { fetchClasse } from '../redux/classeReducer';
import { ecoleAction } from '../redux/ecoleAction';

function countItems(ar) {
  return ar.length
}

export default function DashboardAppPage() {

  const dispatch = useDispatch();

  const { parentList } = useSelector((state) => state.parents);
  const { eleveList } = useSelector((state) => state.eleves);
  const { classeList } = useSelector((state) => state.classes);
  const { communicationList } = useSelector((state) => state.communications);
  const { ecoleList } = useSelector((state) => state.ecole);
  

  useEffect(() => {
    // Fetch doctor and patient lists when component mounts
    store.dispatch(fetchParents());
    store.dispatch(fetchEleve());
    store.dispatch(fetchCommunication());
    store.dispatch(fetchClasse());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.dispatch]);

  const handleFillTestData = async () => {
    
    const ecoleData = [...Array(5)].map((_, index) => ({
      id: faker.datatype.uuid(),
      name: faker.company.name(), // "Institut Mwanga", 
      phones: [faker.phone.number('+243 9# ### ## ##')],
      imgUrl: faker.image.avatar(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      website: faker.internet.domainName(),
      timestamp: faker.date.between(),
    }));
    
    const anneeScolaireData = [...Array(1)].map((_, index) => ({
      id: faker.datatype.uuid(),
      name: "2023",
      timestamp: faker.date.between(),
    }));

    const ClasseData = [...Array(10)].map((_, index) => ({
      id: faker.datatype.uuid(),
      name: uniq([ `${faker.datatype.number({ min:2, max: 7 })}em ${sample(['A', 'B', ''])}`  ])[0],
      anneeScolaire: sample(anneeScolaireData),
      ecole: sample(ecoleData),
      timestamp: faker.date.between(),
    }));


    ecoleData.forEach( el => {
      const nom = el.name;
      const phone = el.phones[0]; 
      dispatch(ecoleAction(nom, phone, el.address, el.email, el.website, el.imgUrl, el.id, el.timestamp));
    });

    console.log('ecoleData',ecoleData);

    console.log("ecoleList",ecoleList);
    // anneeScolaireData.forEach( el => {
    //   const nom = el.name;
    //   const phone = el.phones[0]; 
    //   dispatch(ecoleAction(nom, phone, el.address, el.email, el.website, el.imgUrl));
    // });

    
   
  }

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
        <LoadingButton size='large'  variant="contained"  color="error" sx={{ textAlign: 'center' }}
              onClick={() => handleFillTestData()} >TEST</LoadingButton>
      </Container>
    </>
  );
}
