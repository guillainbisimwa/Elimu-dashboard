
import { Stack, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddEcole = () => {

  const dispatch = useDispatch();

  const [nom, setNom] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  
  const handleClick = (e) => {
    e.preventDefault();
    
    // dispatch(login(email, password));
  };

  return (
    <>
      <Stack sx={{mb: 2, gap: 2}}>
        <TextField name="nom" label="Nom de l'Ecole" value={nom} onChange={(e) =>  setNom(e.target.value)} 
        error={(nom.length > 0) && (nom.length < 4) } />
        <TextField name="phone" label="Telephone" value={phone}  onChange={(e) =>  setPhone(e.target.value)} 
         error={(phone.length > 0) && (phone.length < 8) } />
        <TextField name="address" label="Addresse" value={address}  onChange={(e) =>  setAddress(e.target.value)} />
        <TextField name="email" label="Email" value={email}  onChange={(e) =>  setEmail(e.target.value)} />
        <TextField name="website" label="Site web" value={website}  onChange={(e) =>  setWebsite(e.target.value)} />
        <TextField name="imgUrl" label="Lien du logo" value={imgUrl}  onChange={(e) =>  setImgUrl(e.target.value)} />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Ajouter
      </LoadingButton>
    </>
  );
}

export default AddEcole;

