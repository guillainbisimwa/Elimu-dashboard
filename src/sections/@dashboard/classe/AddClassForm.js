import { useState } from 'react';

import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Iconify from '../../../components/iconify';

const AddClassForm = () => {
    

  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState(''); // admin1@wecare.com
  const [password, setPassword] = useState(''); // wecare2022

    return (
        <>
          <Stack>
            <TextField name="email" label="Email address" value={"email"} />
    
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
    
          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
            Login
          </LoadingButton>
        </>
      );
}

export default AddClassForm;

