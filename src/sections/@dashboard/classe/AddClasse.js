
import { Autocomplete, Stack, TextField, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { classeAction } from '../../../redux/classeAction';

const AddClasse = (props) => {

  const dispatch = useDispatch();

  const { errorClasse } = useSelector((state) => state.classes);
  const { ecoleList } = useSelector((state) => state.ecole);
  console.log("ecoleList",ecoleList);
  const { anneeScolaireList } = useSelector((state) => state.anneeScolaire);


  const [nom, setNom] = useState('');

  const [error, setError] = useState('');
  const [errorNom, setErrorNom] = useState(false);

  const [ecoleValue, setEcoleValue] = useState();
  const [inputEcoleValue, setInputEcoleValue] = useState('');

  
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
  

  return (
    <>
      <Stack sx={{mb: 2, gap: 2}}>
      {errorClasse && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{errorClasse}</Typography>}
      {error && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{error}</Typography>}

        <TextField name="nom" label="Nom de la classe" value={nom} onChange={(e) =>{ handleCheckNom(e)}} 
        error={errorNom} />
        
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[...ecoleList]}
          getOptionLabel={(option) => option.name}

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

