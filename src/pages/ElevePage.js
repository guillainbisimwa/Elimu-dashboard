import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { faker } from "@faker-js/faker";

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

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { AddEleve, EleveListHead, EleveListToolbar } from '../sections/@dashboard/eleve';
import { fetchEleve } from '../redux/eleveReducer';
import { store } from '../redux/Store';
import Label from '../components/label/Label';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'sex', label: 'Sexe', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'parent', label: 'Parent', alignRight: false },
  { id: 'classe', label: 'Classe', alignRight: false },
  { id: '' },
];

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

export default function ElevePage() {
  const navigate = useNavigate();

  const { eleveList } = useSelector((state) => state.eleves);

  useEffect(() => {
    // Fetch Eleve and patient lists when component mounts
    store.dispatch(fetchEleve());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.dispatch]);

  const [eleveModal, setEleveModal] = useState(null);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentEleve, setCurrentEleve ] = useState(null)

  const handleOpenMenu = (event, eleveObject) => {
    setOpen(event.currentTarget);
    setCurrentEleve(JSON.stringify(eleveObject))
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenModaEleve= () => {
    setEleveModal(true);
  };

  const handleCloseModaEleve = () => {
    setEleveModal(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = eleveList.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - eleveList.length) : 0;

  const filteredUsers = applySortFilter(eleveList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Eleve | Elimu </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Eleve
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} mb={1}>
           
            <LoadingButton size='large'  variant="contained"  color="error"
              onClick={() => handleOpenModaEleve()} >
              Ajouter une Eleve
            </LoadingButton>
          </Stack>
          
        </Stack>

        <Card>
          <EleveListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <EleveListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={eleveList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, parent, address, classe } = row;
                    const sex = faker.name.sex();
                    console.log(sex);
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

                        <TableCell align="left">
                          <Label color={(sex === 'female' && 'error') || 'success'}>{sex.charAt(0)}</Label>
                        </TableCell>

                         <TableCell align="left">{address}</TableCell>

                         <TableCell align="left">{parent.name}</TableCell>

                         <TableCell align="left">{classe.name}</TableCell>
                        
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
            count={eleveList.length}
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
          console.log(currentEleve);
          const params = { eleveObject: currentEleve };
          navigate('/dashboard/eleve-details',  { state: params });
        }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Voir Details
        </MenuItem>
      </Popover>

      <Dialog
        open={Boolean(eleveModal)}
        onClose={handleCloseModaEleve}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Ajouter un Eleve</DialogTitle>
        <DialogContent>
        <Container sx={{pt: 2}} >
          <AddEleve onClose={handleCloseModaEleve} />
        </Container>
        </DialogContent>
        
      </Dialog>
    </>
  );
}
