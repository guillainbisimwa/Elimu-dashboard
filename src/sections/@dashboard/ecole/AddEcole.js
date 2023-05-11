
import { Stack, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

const AddEcole = () => {
  
  const [nom, setnom] = useState(null);
  const [phone, setphone] = useState(null);
  const [address, setaddress] = useState(null);
  const [email, setemail] = useState(null);
  const [website, setwebsite] = useState(null);
  const [imgUrl, setimgUrl] = useState(null);

  return (
    <>
      <Stack sx={{mb: 2, gap: 2}}>
        <TextField name="nom" label="Nom de l'Ecole" value={nom} />
        <TextField name="phone" label="Telephone" value={phone} />
        <TextField name="address" label="Addresse" value={address} />
        <TextField name="email" label="Email" value={email} />
        <TextField name="website" label="Site web" value={website} />
        <TextField name="imgUrl" label="Lien du logo" value={imgUrl} />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Ajouter
      </LoadingButton>
    </>
  );
}

export default AddEcole;

