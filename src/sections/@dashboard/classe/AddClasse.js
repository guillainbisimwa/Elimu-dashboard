
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography, createFilterOptions} from '@mui/material';

import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { classeAction } from '../../../redux/classeAction';
import { AnneeScolaireAction } from '../../../redux/anneeScolaireAction';

const filter = createFilterOptions();


const AddClasse = (props) => {

  const dispatch = useDispatch();

  const { errorClasse } = useSelector((state) => state.classes);
  const { ecoleList } = useSelector((state) => state.ecole);
  console.log("ecoleList",ecoleList);
  const { anneeScolaireList } = useSelector((state) => state.anneeScolaire);


  const [nom, setNom] = useState('');

  const [error, setError] = useState('');
  const [errorNom, setErrorNom] = useState(false);

  // Inner Dialog
  const [innerError, setInnerError] = useState('');
  const [innerErrorNom, setInnerErrorNom] = useState(false);

  const [ecoleValue, setEcoleValue] = useState();
  const [inputEcoleValue, setInputEcoleValue] = useState('');

  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      name: '',
      year: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    name: '',
    year: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
      year: parseInt(dialogValue.year, 10),
    });
    handleClose();
  };

  
  const handleClick = (e) => {
    e.preventDefault();

    console.log("e",ecoleValue);
    // console.log("a",anneeScolaireList);

    if(!errorNom && nom.length >3){
      // dispatch(classeAction(nom, anneeScolaire, ecole, id, timestamp));
      props.onClose();
    } else{
      setError("Veillez valider tous les champs")
      setErrorNom(true)
    }
  };

  const handleCheckNom = (e) => {
    e.preventDefault();
    setNom(e.target.value);
    if(nom.length < 4){
      setErrorNom(true)
    }else {
      setErrorNom(false)
    }
  };

  const handleClickAddAS = (e) => {
    e.preventDefault();

    if(!errorNom && nom.length >2){
      dispatch(AnneeScolaireAction(nom));
      // props.onClose();
    } else{
      setInnerError("Veillez valider tous les champs")
      setInnerErrorNom(true)
    }
  };
  

  return (
    <>
      <Stack sx={{mb: 2, gap: 2}}>
      {errorClasse && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{errorClasse}</Typography>}
      {error && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{error}</Typography>}

        <TextField name="nom" label="Nom de la classe" value={nom} onChange={(e) =>{ handleCheckNom(e)}} 
        error={errorNom} />
        
        <Autocomplete
          id="combo-box-demo"
          options={[...ecoleList]}
          getOptionLabel={(option) => option.name}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          freeSolo
          isOptionEqualToValue={(option, value) => option.name === value} // Customize the equality test
          value={ecoleValue}
          onChange={(event, newValue) => {
            setEcoleValue(newValue);
          }}
          inputValue={inputEcoleValue}
          onInputChange={(event, newInputValue) => {
            setInputEcoleValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorNom}
              label="Ecole"
            />
          )}
        />

      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
                year: '',
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
              year: '',
            });
          } else {
            setValue(newValue);
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
        options={anneeScolaireList}
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
        renderInput={(params) => <TextField {...params} label="Annee Scolaire" />}
      />

    <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Ajouter une annee Scolaire</DialogTitle>
          <DialogContent>
            <DialogContentText>
             Voulez-vous creer une annee scolaire? Please, add it!
            </DialogContentText>
            
        <TextField name="nom" label="Nom de la classe"
        error={errorNom} sx={{width: '100%', mt:3}}
        value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
        />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit">Ajouter</Button>
          </DialogActions>
        </form>
      </Dialog>


      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} >
        Ajouter
      </LoadingButton>
    </>
  );
}

AddClasse.propTypes = {
  onClose: PropTypes.func,
};

export default AddClasse;

