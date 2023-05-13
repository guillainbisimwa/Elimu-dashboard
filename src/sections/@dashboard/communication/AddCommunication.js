
import { Autocomplete, Stack, TextField, Typography} from '@mui/material';
import { faker } from "@faker-js/faker";

import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommunicationAction } from '../../../redux/communicationAction';

const AddCommunication = (props) => {

  const dispatch = useDispatch();

  const { errorEcole } = useSelector((state) => state.ecole);
  const { anneeScolaireList } = useSelector((state) => state.anneeScolaire);
  const { parentList } = useSelector((state) => state.parents);
  const { eleveList } = useSelector((state) => state.eleves);

  const [motif, setMotif] = useState('');
  const [anneeScolaire, setAnneeScolaire] = useState('');
  const [parent, setParent] = useState('');
  const [eleve, setEleve] = useState('');
  

  const [error, setError] = useState('');
  const [errorMotif, setErrorNom] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();

    if(!errorMotif && motif.length >3){
      const id = faker.datatype.uuid();
      const timestamp = faker.date.between();
      dispatch(CommunicationAction(motif, anneeScolaire, eleve, parent, id, timestamp ));
      props.onClose();
    } else{
      setError("Veillez valider tous les champs")
      setErrorNom(true)
    }
  };

  const handleCheckNom = (e) => {
    e.preventDefault();
    setMotif(e.target.value);
    if(motif.length < 4){
      setErrorNom(true)
    }else {
      setErrorNom(false)
    }
  };
 

  return (
    <>
      <Stack sx={{mb: 2, gap: 2}}>
      {errorEcole && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{errorEcole}</Typography>}
      {error && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{error}</Typography>}
        {/* {isLoadingEcole && <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></Box>} */}

        <TextField name="motif" label="Motif" value={motif} onChange={(e) =>{ handleCheckNom(e)}} 
        error={errorMotif} />

        <Autocomplete
          id="combo-box-demo"
          options={eleveList}
          isOptionEqualToValue={(option, value) => option === value.name} // Customize the equality test
          value={eleve}
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
          onChange={(event, newValue) => {
            setEleve(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              
              label="Eleve"
            />
          )}
        />  

        <Autocomplete
          id="combo-box-demo"
          options={parentList}
          isOptionEqualToValue={(option, value) => option === value.name} // Customize the equality test
          value={parent}
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
          onChange={(event, newValue) => {
            setParent(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Parent"
            />
          )}
        />

        <Autocomplete
          id="combo-box-demo"
          options={anneeScolaireList}
          isOptionEqualToValue={(option, value) => option === value.name} // Customize the equality test
          value={anneeScolaire}
          onChange={(event, newValue) => {
            setAnneeScolaire(newValue);
          }}
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
          renderInput={(params) => (
            <TextField
              {...params}
              
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

AddCommunication.propTypes = {
  onClose: PropTypes.func,
};

export default AddCommunication;

