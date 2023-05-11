
import { Stack, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';


const AddEcole = () => {

    return (
      <>
        <Stack sx={{mb: 2, gap: 2}}>
          <TextField name="nom" label="Nom de l'Ecole" value={''} />
          <TextField name="phone" label="Telephone" value={''} />
          <TextField name="address" label="Addresse" value={''} />
          <TextField name="email" label="Email" value={''} />
          <TextField name="website" label="Site web" value={''} />
          <TextField name="imgUrl" label="Lien du logo" value={''} />
        </Stack>
  
        <LoadingButton fullWidth size="large" type="submit" variant="contained" >
          Ajouter
        </LoadingButton>
      </>
    );
}

export default AddEcole;

