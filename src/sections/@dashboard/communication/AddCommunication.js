
import { Stack, TextField, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ecoleAction } from '../../../redux/ecoleAction';

const AddCommunication = (props) => {

  const dispatch = useDispatch();

  const { errorEcole } = useSelector((state) => state.ecole);

  const [nom, setNom] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const [error, setError] = useState('');
  const [errorNom, setErrorNom] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();

    if(!errorNom && !errorPhone && nom.length >3){
      dispatch(ecoleAction(nom, phone, address, email, website, imgUrl));
      props.onClose();
    } else{
      setError("Veillez valider tous les champs")
      setErrorNom(true)
      setErrorPhone(true)
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
  
  const handleCheckPhone = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
    if(phone.length < 9){
      setErrorPhone(true)
    }else {
      setErrorPhone(false)
    }
  };

  return (
    <>
      <Stack sx={{mb: 2, gap: 2}}>
      {errorEcole && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{errorEcole}</Typography>}
      {error && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{error}</Typography>}
        {/* {isLoadingEcole && <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></Box>} */}

        <TextField name="nom" label="Nom de l'Ecole" value={nom} onChange={(e) =>{ handleCheckNom(e)}} 
        error={errorNom} />
        <TextField name="phone" type='tel' label="Telephone" value={phone}   onChange={(e) =>{ handleCheckPhone(e)}}
         error={errorPhone} />
        <TextField name="address" label="Addresse" value={address}  onChange={(e) => setAddress(e.target.value)} />
        <TextField name="email" label="Email" value={email}  onChange={(e) => setEmail(e.target.value)} />
        <TextField name="website" label="Site web" value={website}  onChange={(e) => setWebsite(e.target.value)} />
        <TextField type='file' focused name="imgUrl" label="Lien du logo" value={imgUrl}  onChange={(e) => setImgUrl(e.target.value)} />
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

