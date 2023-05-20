
import { Autocomplete, Stack, TextField, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnneeScolaireAction } from '../../../redux/anneeScolaireAction';

const AddAnneeScolaire = (props) => {

  const dispatch = useDispatch();

  const { errorAnneeScolaire } = useSelector((state) => state.anneeScolaire);

  const [nom, setNom] = useState('');

  const [error, setError] = useState('');
  const [errorNom, setErrorNom] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();

    if(!errorNom && nom.length >2){
      dispatch(AnneeScolaireAction(nom));
      props.onClose();
    } else{
      setError("Veillez valider tous les champs")
      setErrorNom(true)
    }
  };

  const handleCheckNom = (e) => {
    e.preventDefault();
    console.log("e.target.value", e.target.value);
    setNom(e.target.value);
    if(nom.length < 3){
      setErrorNom(true)
    }else {
      setErrorNom(false)
    }
  };

  const years = [
    "2023",
    "2024",
    "2025",
  ];
  
  return (
    <>
      <Stack sx={{mb: 2, gap: 2}}>
      {errorAnneeScolaire && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{errorAnneeScolaire}</Typography>}
      {error && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{error}</Typography>}

        <Autocomplete
          id="combo-box-demo"
          options={years}
          isOptionEqualToValue={(option, value) => option === value} // Customize the equality test
          value={nom}
          onChange={(event, newValue) => {
            setNom(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="nom"
              onChange={(e) => {
                handleCheckNom(e);
              }}
              error={errorNom}
              label="Annee Scolaire"
            />
          )}
        />

      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} >
        Ajouter
      </LoadingButton>
    </>
  );
}

AddAnneeScolaire.propTypes = {
  onClose: PropTypes.func,
};

export default AddAnneeScolaire;

