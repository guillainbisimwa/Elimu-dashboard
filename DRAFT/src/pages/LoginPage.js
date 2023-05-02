import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// sections
import { LoginForm } from '../sections/auth/login';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirect the user to the dashboard page if they are already logged in
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title> Login | We care </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Box
              component="img"
              src="/assets/logo.png"
              sx={{ 
                mx: 'auto',
                my: { xs: 5 },
                borderRadius: 5 
              }}
            />
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              LOGIN
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
