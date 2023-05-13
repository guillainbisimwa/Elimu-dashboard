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

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { AddCommunication, CommunicationListHead, CommunicationListToolbar } from '../sections/@dashboard/communication';
import { fetchCommunication } from '../redux/communicationReducer';
import { store } from '../redux/Store';

const TABLE_HEAD = [
  { id: 'motif', label: 'Motif', alignRight: false },
  { id: 'eleve', label: 'Eleve', alignRight: false },
  { id: 'parent', label: 'Parent', alignRight: false },
  { id: 'classe', label: 'Classe', alignRight: false },
  { id: 'anneeScolaire', label: 'Annee Scolaire', alignRight: false },
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

export default function CommunicationPage() {
  const navigate = useNavigate();

  const { communicationList } = useSelector((state) => state.communications);

  console.log(communicationList);

  useEffect(() => {
    // Fetch Communication and patient lists when component mounts
    store.dispatch(fetchCommunication());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.dispatch]);

  const [communicationModal, setCommunicationModal] = useState(null);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentCommunication, setCurrentCommunication ] = useState(null)

  const handleOpenMenu = (event, communicationObject) => {
    setOpen(event.currentTarget);
    setCurrentCommunication(JSON.stringify(communicationObject))
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenModaCommunication= () => {
    setCommunicationModal(true);
  };

  const handleCloseModaCommunication = () => {
    setCommunicationModal(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = communicationList.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - communicationList.length) : 0;

  const filteredUsers = applySortFilter(communicationList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Communication | Elimu </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Communication
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} mb={1}>
           
            <LoadingButton size='large'  variant="contained"  color="error"
              onClick={() => handleOpenModaCommunication()} >
              Ajouter une Communication
            </LoadingButton>
          </Stack>
          
        </Stack>

        <Card>
          <CommunicationListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CommunicationListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={communicationList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, motif, eleve, parent, anneeScolaire } = row;
                    const selectedUser = selected.indexOf(motif) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, motif)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none"  >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={motif} >
                              {/* {name.charAt(0)} */}
                            </Avatar>
                            
                            <Typography variant="subtitle2">
                              {motif}
                            </Typography>
                          </Stack>
                        </TableCell>

                         <TableCell align="left">{eleve.name}</TableCell>

                         <TableCell align="left">{parent.name}</TableCell>

                         <TableCell align="left">{eleve.classe.name}</TableCell>

                         <TableCell align="left">{anneeScolaire.name}</TableCell>
                        
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
            count={communicationList.length}
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
          console.log(currentCommunication);
          const params = { communicationObject: currentCommunication };
          navigate('/dashboard/communication-details',  { state: params });
        }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Voir Details
        </MenuItem>
      </Popover>

      <Dialog
        open={Boolean(communicationModal)}
        onClose={handleCloseModaCommunication}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography>Ajouter une Communication</Typography>
        </DialogTitle>
        <DialogContent>
        <Container sx={{pt: 2}} >
          <AddCommunication onClose={handleCloseModaCommunication} />
        </Container>
        </DialogContent>
        
      </Dialog>
    </>
  );
}
