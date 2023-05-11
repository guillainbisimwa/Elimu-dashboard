
import { Stack, TextField, Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ecoleAction } from '../../../redux/ecoleAction';

const AddEcole = () => {

  const dispatch = useDispatch();

  const { errorEcole } = useSelector((state) => state.ecole);


  const [nom, setNom] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const [error, setError] = useState('');
  
  const handleClick = (e) => {
    e.preventDefault();

    console.log(nom, phone, address, email, website, imgUrl);

    if(( (nom.length > 0) && (nom.length < 4)) || (phone.length > 0) && (phone.length < 8)){
      setError("Veillez valider tous les champs")
    } else{
      // dispatch(ecoleAction(nom, phone, address, email, website, imgUrl));
      setError("Veillez valider tous les champs2")

    }
    
  };

  return (
    <>
      <Stack sx={{mb: 2, gap: 2}}>
      {errorEcole && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{errorEcole}</Typography>}
      {error && <Typography variant="body" sx={{ textAlign: 'center', color: 'red', mb: 3 }}>{error}</Typography>}
        {/* {isLoadingEcole && <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></Box>} */}

        <TextField name="nom" label="Nom de l'Ecole" value={nom} onChange={(e) => setNom(e.target.value)} 
        error={(nom.length > 0) && (nom.length < 4) } />
        <TextField name="phone" type='tel' label="Telephone" value={phone}  onChange={(e) => setPhone(e.target.value)} 
         error={(phone.length > 0) && (phone.length < 8) } />
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

export default AddEcole;

