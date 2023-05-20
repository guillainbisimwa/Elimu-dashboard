
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography, createFilterOptions } from '@mui/material';
import { faker } from "@faker-js/faker";

import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parentAction } from '../../../redux/parentAction';
import { EleveAction } from '../../../redux/eleveAction';
import { ClasseAction } from '../../../redux/classeAction';


const filter = createFilterOptions();

const AddEleve = (props) => {

  const dispatch = useDispatch();

  const { errorParent, parentList } = useSelector((state) => state.parents);
  const { classeList } = useSelector((state) => state.classes);

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

  // inner Classe
  const [phoneClasse, setPhoneClasse] = useState('');
  const [addressClasse, setAddressClasse] = useState('');
  const [emailClasse, setEmailClasse] = useState('');
  const [websiteClasse, setWebsiteClasse] = useState('');
  const [imgUrlClasse, setImgUrlClasse] = useState('');

  const [error, setError] = useState('');
  const [errorNom, setErrorNom] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (!errorNom && !errorPhone && nom.length > 3) {
      // nom, phone, address, imgUrl, parent, classe, id, timestamp
      const id = faker.datatype.uuid();
      const timestamp = faker.date.between();
      dispatch(EleveAction( nom, phone, address, '', parent, classe, id, timestamp));
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

  const [classe, setClasse] = useState(null);
  const [openClasse, toggleOpenClasse] = useState(false);

  const handleCloseClasse = () => {
    setDialogClasse({
      name: '',
    });
    toggleOpenClasse(false);
  };

  const [dialogClasse, setDialogClasse] = useState({
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

  const handleSubmitClasse = (event) => {
    event.preventDefault();

    if (dialogClasse.name?.length > 0) {
      const id = faker.datatype.uuid();
      const timestamp = faker.date.between();
      dispatch(ClasseAction(dialogClasse.name, phoneClasse, addressClasse, emailClasse, websiteClasse, imgUrlClasse, id, timestamp));
      setClasse({
        name: dialogClasse.name,
      });
      handleCloseClasse();
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

        {/* Classe */}
        <Autocomplete
          value={classe}
          // error={setInnerErrorNom}
          onChange={(event, newValue) => {

            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpenClasse(true);
                setDialogClasse({
                  name: newValue,
                });
              });

            } else if (newValue && newValue.inputValue) {
              toggleOpenClasse(true);
              setDialogClasse({
                name: newValue.inputValue,
              });
            } else {
              setClasse(newValue);
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
          options={classeList}
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
          renderInput={(params) => <TextField {...params} label="Classe" />}
        />

        <Dialog open={openClasse} onClose={handleCloseClasse}>
          <DialogTitle>Ajouter une Classe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous creer une classe? Please, add it!
            </DialogContentText>
            {/* {!innerErrorNom && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{innerError}</Typography>} */}

            <Stack sx={{ mb: 2, gap: 2 }}>
              <TextField name="nom" label="Nom de l'Classe"
                sx={{ width: '100%', mt: 3 }}
                value={dialogClasse.name}
                onChange={(event) =>
                  setDialogClasse({
                    ...dialogClasse,
                    name: event.target.value,
                  })
                }
              />

        <TextField name="phone" type='tel' label="Telephone" value={phoneClasse} onChange={(e) => setPhoneClasse(e.target.value)} />
        <TextField name="address" label="Addresse" value={addressClasse}  onChange={(e) => setAddressClasse(e.target.value)} />
        <TextField name="email" label="Email" value={emailClasse}  onChange={(e) => setEmailClasse(e.target.value)} />
        <TextField name="website" label="Site web" value={websiteClasse}  onChange={(e) => setWebsiteClasse(e.target.value)} />
        <TextField type='file' focused name="imgUrl" label="Lien du logo" value={imgUrlClasse}  onChange={(e) => setImgUrlClasse(e.target.value)} />
      

            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseClasse}>Annuler</Button>
            <Button onClick={handleSubmitClasse}>Ajouter</Button>
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

