
import { Stack, TextField, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parentAction } from '../../../redux/parentAction';

const AddParent = (props) => {

  const dispatch = useDispatch();

  const { errorParent } = useSelector((state) => state.parents);

  const [nom, setNom] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const [error, setError] = useState('');
  const [errorNom, setErrorNom] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();

    if(!errorNom && !errorPhone && nom.length >3){
      dispatch(parentAction(nom, phone, address, pseudo, imgUrl));
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
      {errorParent && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{errorParent}</Typography>}
      {error && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{error}</Typography>}

        <TextField name="nom" label="Nom du parent" value={nom} onChange={(e) =>{ handleCheckNom(e)}} 
        error={errorNom} />
        <TextField name="phone" type='tel' label="Telephone" value={phone}   onChange={(e) =>{ handleCheckPhone(e)}}
         error={errorPhone} />
        <TextField name="address" label="Addresse" value={address}  onChange={(e) => setAddress(e.target.value)} />
        <TextField name="pseudo" label="Pseudo" value={pseudo}  onChange={(e) => setPseudo(e.target.value)} />
        <TextField type='file' focused name="imgUrl" label="Photo" value={imgUrl}  onChange={(e) => setImgUrl(e.target.value)} />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} >
        Ajouter
      </LoadingButton>
    </>
  );
}

AddParent.propTypes = {
  onClose: PropTypes.func,
};

export default AddParent;

