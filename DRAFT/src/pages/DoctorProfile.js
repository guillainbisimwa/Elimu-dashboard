import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

// @mui
import { Grid, Container, Typography, Card, Stack, Avatar, Box, Divider } from '@mui/material';
import Iconify from '../components/iconify';


DoctorProfile.propTypes = {
  color: PropTypes.string,
};

export default function DoctorProfile({color = 'primary'}) {
  const location = useLocation();
  const { doctorObject } = location.state || {};

  // eslint-disable-next-line no-unused-vars
  const [doctor, setDoctor] = useState(JSON.parse(doctorObject));

  return (
    <>
      <Helmet>
        <title> Profile Doctor | We care </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Doctor's Profile
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={7} >
            <Card
              sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
              }}
            >
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Avatar sx={{ width: 120, height: 120, fontSize: 48 }}>
                  {doctor.name.charAt(0)}
                </Avatar>
              </Box>

              <Typography variant="h3" sx={{ mt: 3 }}>
                {doctor.name}
              </Typography>

              <Typography variant="subtitle2" sx={{ opacity: 0.72, mt: 1 }}>
                {doctor.address}
              </Typography>

              <Stack sx={{display: 'flex', mt:3, justifyContent: 'center', alignItems: 'center'}} direction="row" spacing={1} >
                <Iconify icon="akar-icons:phone" width={24} height={24} />
                <Typography variant="body2">{doctor.phoneNumber}</Typography>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} sm={5} md={5}>
            <Card
              sx={{
                py: 5,
                px: 5,
                boxShadow: 0,
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  E-mail
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {doctor.email}
              </Typography>

              <Divider sx={{ my: 2 }} />


              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Designation
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {doctor.designation}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Practice Number
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {doctor.practiceNumber}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Created At
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {doctor.createdAt}
              </Typography>
              
                
            </Card>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
