import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { EcoleListHead, EcoleListToolbar } from '../sections/@dashboard/ecole';
import { fetchEcole } from '../redux/ecoleReducer';
import { store } from '../redux/Store';
import { AddClassForm } from '../sections/@dashboard/classe';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phones', label: 'Phones', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'website', label: 'Website', alignRight: false },
  { id: '' },
];


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function EcolePage() {
  const navigate = useNavigate();

  const { ecoleList } = useSelector((state) => state.ecole);

  useEffect(() => {
    // Fetch doctor and patient lists when component mounts
    store.dispatch(fetchEcole());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.dispatch]);

  const [anneeScolaireModal, setAnneeScolaireModal] = useState(null);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentDoctor, setCurrentDoctor ] = useState(null)

  const handleOpenMenu = (event, doctorObject) => {
    setOpen(event.currentTarget);
    setCurrentDoctor(JSON.stringify(doctorObject))
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenModaAS= () => {
    setAnneeScolaireModal(true);
  };

  const handleCloseModalAS = () => {
    setAnneeScolaireModal(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ecoleList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ecoleList.length) : 0;

  const filteredUsers = applySortFilter(ecoleList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Ecole | Elimu </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Ecole
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} mb={1}>
           

            <LoadingButton size='large'  variant="contained" color='error' startIcon={<IconButton size="large" color="success" >
                <Iconify icon={'eva:more-vertical-fill'} /></IconButton>}
                >
              Classes
            </LoadingButton>

            <LoadingButton size='large'  variant="contained" startIcon={<IconButton size="large" color="success" >
              <Iconify icon={'eva:more-vertical-fill'} /></IconButton>} 
              onClick={() => handleOpenModaAS()} >
              Annee scolaire
            </LoadingButton>
          </Stack>
          
        </Stack>

        <Card>
          <EcoleListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <EcoleListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={ecoleList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, email, phones, address, website } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} >
                              {name.charAt(0)}
                            </Avatar>
                            
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                         <TableCell align="left">{email}</TableCell>

                         <TableCell align="left">{phones}</TableCell>

                         <TableCell align="left">{address}</TableCell>

                         <TableCell align="left">{website}</TableCell>
                        
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(e)=>{
                              handleOpenMenu(e, row);
                            }}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ecoleList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem  onClick={()=> {
          console.log(currentDoctor);
          const params = { doctorObject: currentDoctor };
          navigate('/dashboard/ecole-details',  { state: params });
        }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Voir Details
        </MenuItem>
      </Popover>

      <Dialog
        open={Boolean(anneeScolaireModal)}
        onClose={handleCloseModalAS}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography>Annee Scolaire</Typography>
        </DialogTitle>
        <DialogContent>
          
            <StyledRoot>
              <Container maxWidth="md">
                <StyledContent>
                  <AddClassForm />
                </StyledContent>
              </Container>
            </StyledRoot>
          
        </DialogContent>
        
      </Dialog>
    </>
  );
}
