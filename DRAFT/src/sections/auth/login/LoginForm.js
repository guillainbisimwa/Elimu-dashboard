import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, CircularProgress, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Iconify from '../../../components/iconify';
import { login } from '../../../redux/loginAction';

import {store} from '../../../redux/Store';

import { fetchDoctors } from '../../../redux/doctorsReducer';
import { fetchPatients } from '../../../redux/patientsReducer';

export default function LoginForm() {
  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.auth);
 

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(''); // admin1@wecare.com
  const [password, setPassword] = useState(''); // wecare2022

  const handleClick = (e) => {
    e.preventDefault();
    
    store.dispatch(fetchDoctors());
    store.dispatch(fetchPatients());

    dispatch(login(email, password));
  };

  return (
    <>
      <Stack spacing={3}>
        {error && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{error}</Typography>}
        {isLoading && <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></Box>}

        <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
