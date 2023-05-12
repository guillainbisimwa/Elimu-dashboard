import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------


export default function SimpleLayout() {

  return (
    <>
      <StyledHeader>
        <Box
          component="img"
          src="assets/1.png" // => your path
          sx={{ width: 0, height: 0, cursor: 'pointer'}}
      />
      </StyledHeader>
      <Outlet />
    </>
  );
}
