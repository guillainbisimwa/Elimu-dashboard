
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography, createFilterOptions } from '@mui/material';
import { faker } from "@faker-js/faker";

import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parentAction } from '../../../redux/parentAction';
import { ecoleAction } from '../../../redux/ecoleAction';
import { EleveAction } from '../../../redux/eleveAction';

const filter = createFilterOptions();

const AddEleve = (props) => {

  const dispatch = useDispatch();

  const { errorParent, parentList } = useSelector((state) => state.parents);
  const { errorEcole, ecoleList } = useSelector((state) => state.ecole);

  const [nom, setNom] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // inner
  const [phoneDialog, setPhoneDialog] = useState('');
  const [addressDialog, setAddressDialog] = useState('');
  const [pseudoDialog, setPseudoDialog] = useState('');


  // Inner Dialog
  const [innerError, setInnerError] = useState('');
  const [innerErrorNom, setInnerErrorNom] = useState(false);

  // inner Ecole
  const [phoneEcole, setPhoneEcole] = useState('');
  const [addressEcole, setAddressEcole] = useState('');
  const [emailEcole, setEmailEcole] = useState('');
  const [websiteEcole, setWebsiteEcole] = useState('');
  const [imgUrlEcole, setImgUrlEcole] = useState('');

  const [error, setError] = useState('');
  const [errorNom, setErrorNom] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (!errorNom && !errorPhone && nom.length > 3) {
      // dispatch(EleveAction(nom, phone, address, pseudo, imgUrl));
      props.onClose();
    } else {
      setError("Veillez valider tous les champs")
      setErrorNom(true)
      setErrorPhone(true)
    }
  };

  const handleCheckNom = (e) => {
    e.preventDefault();
    setNom(e.target.value);
    if (nom.length < 4) {
      setErrorNom(true)
    } else {
      setErrorNom(false)
    }
  };

  const handleCheckPhone = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
    if (phone.length < 9) {
      setErrorPhone(true)
    } else {
      setErrorPhone(false)
    }
  };

  const handleCheckPhoneDialog = (e) => {
    e.preventDefault();
    setPhoneDialog(e.target.value);
  };

  const [parent, setParent] = useState(null);
  const [openParent, toggleOpenParent] = useState(false);

  const handleCloseParent = () => {
    setDialogParent({
      name: '',
    });
    toggleOpenParent(false);
  };

  const [dialogParent, setDialogParent] = useState({
    name: '',
  });

  const [ecole, setEcole] = useState(null);
  const [openEcole, toggleOpenEcole] = useState(false);

  const handleCloseEcole = () => {
    setDialogEcole({
      name: '',
    });
    toggleOpenEcole(false);
  };

  const [dialogEcole, setDialogEcole] = useState({
    name: '',
  });

  const handleSubmitParent = (event) => {
    event.preventDefault();

    if (dialogParent.name?.length > 0 && phoneDialog?.length > 0 &&
      addressDialog?.length > 0 && pseudoDialog?.length > 0) {
      const id = faker.datatype.uuid();
      const timestamp = faker.date.between();
      dispatch(parentAction(dialogParent.name, phoneDialog, addressDialog, pseudoDialog, '', id, timestamp));
      setParent({
        name: dialogParent.name,
      });
      handleCloseParent();
    } else {
      setInnerError("Veillez valider tous les champs")
      setInnerErrorNom(true)
    }
  };

  const handleSubmitEcole = (event) => {
    event.preventDefault();

    if (dialogEcole.name?.length > 0) {
      const id = faker.datatype.uuid();
      const timestamp = faker.date.between();
      dispatch(ecoleAction(dialogEcole.name, phoneEcole, addressEcole, emailEcole, websiteEcole, imgUrlEcole, id, timestamp));
      setEcole({
        name: dialogEcole.name,
      });
      handleCloseEcole();
    } else {
      // setInnerError("Veillez valider tous les champs")
      // setInnerErrorNom(true)
    }
  };

  return (
    <>
      <Stack sx={{ mb: 2, gap: 2 }}>
        {errorParent && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{errorParent}</Typography>}
        {error && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{error}</Typography>}

        <TextField name="nom" label="Nom de l'eleve" value={nom} onChange={(e) => { handleCheckNom(e) }}
          error={errorNom} />
        <TextField name="phone" type='tel' label="Telephone" value={phone} onChange={(e) => { handleCheckPhone(e) }}
          error={errorPhone} />
        <TextField name="address" label="Addresse" value={address} onChange={(e) => setAddress(e.target.value)} />

        <Autocomplete
          value={parent}
          // error={setInnerErrorNom}
          onChange={(event, newValue) => {

            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpenParent(true);
                setDialogParent({
                  name: newValue,
                });
              });

            } else if (newValue && newValue.inputValue) {
              toggleOpenParent(true);
              setDialogParent({
                name: newValue.inputValue,
              });
            } else {
              setParent(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                name: `Cliquer ici pour Creer  "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          id="free-solo-dialog"
          options={parentList}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.name;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
          freeSolo
          renderInput={(params) => <TextField {...params} label="Parent" />}
        />

        <Dialog open={openParent} onClose={handleCloseParent}>
          <DialogTitle>Ajouter un parent</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous creer une parent? Please, add it!
            </DialogContentText>
            {!innerErrorNom && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{innerError}</Typography>}

            <Stack sx={{ mb: 2, gap: 2 }}>
              <TextField name="nom" label="Nom du parent"
                error={errorNom} sx={{ width: '100%', mt: 3 }}
                value={dialogParent.name}
                onChange={(event) =>
                  setDialogParent({
                    ...dialogParent,
                    name: event.target.value,
                  })
                }
              />

              <TextField name="phone" type='tel' label="Telephone" value={phoneDialog} onChange={(e) => { handleCheckPhoneDialog(e) }} />
              <TextField name="address" label="Addresse" value={addressDialog} onChange={(e) => setAddressDialog(e.target.value)} />
              <TextField name="pseudo" label="Pseudo" value={pseudoDialog} onChange={(e) => setPseudoDialog(e.target.value)} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseParent}>Annuler</Button>
            <Button onClick={handleSubmitParent}>Ajouter</Button>
          </DialogActions>
        </Dialog>

        {/* Ecole */}
        <Autocomplete
          value={ecole}
          // error={setInnerErrorNom}
          onChange={(event, newValue) => {

            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpenEcole(true);
                setDialogEcole({
                  name: newValue,
                });
              });

            } else if (newValue && newValue.inputValue) {
              toggleOpenEcole(true);
              setDialogEcole({
                name: newValue.inputValue,
              });
            } else {
              setEcole(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                name: `Cliquer ici pour Creer  "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          id="free-solo-dialog"
          options={ecoleList}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.name;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
          freeSolo
          renderInput={(params) => <TextField {...params} label="Ecole" />}
        />

        <Dialog open={openEcole} onClose={handleCloseEcole}>
          <DialogTitle>Ajouter une Ecole</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous creer une ecole? Please, add it!
            </DialogContentText>
            {/* {!innerErrorNom && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{innerError}</Typography>} */}

            <Stack sx={{ mb: 2, gap: 2 }}>
              <TextField name="nom" label="Nom de l'Ecole"
                sx={{ width: '100%', mt: 3 }}
                value={dialogEcole.name}
                onChange={(event) =>
                  setDialogEcole({
                    ...dialogEcole,
                    name: event.target.value,
                  })
                }
              />

        <TextField name="phone" type='tel' label="Telephone" value={phoneEcole} onChange={(e) => setPhoneEcole(e.target.value)} />
        <TextField name="address" label="Addresse" value={addressEcole}  onChange={(e) => setAddressEcole(e.target.value)} />
        <TextField name="email" label="Email" value={emailEcole}  onChange={(e) => setEmailEcole(e.target.value)} />
        <TextField name="website" label="Site web" value={websiteEcole}  onChange={(e) => setWebsiteEcole(e.target.value)} />
        <TextField type='file' focused name="imgUrl" label="Lien du logo" value={imgUrlEcole}  onChange={(e) => setImgUrlEcole(e.target.value)} />
      

            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEcole}>Annuler</Button>
            <Button onClick={handleSubmitEcole}>Ajouter</Button>
          </DialogActions>
        </Dialog>

      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} >
        Ajouter
      </LoadingButton>
    </>
  );
}

AddEleve.propTypes = {
  onClose: PropTypes.func,
};

export default AddEleve;

