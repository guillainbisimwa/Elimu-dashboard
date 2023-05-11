
import { Stack, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';


const AddClassForm = () => {

    return (
      <>
        <Stack sx={{mb:5}}>
          <TextField name="anneeScolaire" label="Annee Scolaire" value={''} />
        </Stack>
  
        <LoadingButton fullWidth size="large" type="submit" variant="contained" >
          Ajouter
        </LoadingButton>
      </>
    );
}

export default AddClassForm;

