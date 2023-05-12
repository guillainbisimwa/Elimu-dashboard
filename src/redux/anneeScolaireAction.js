//  import axios from 'axios';
import { addAnneeScolaireFailure, addAnneeScolaireStart, addAnneeScolaireSuccess } from './anneeScolaireReducer';


export const AnneeScolaireAction = (nom) => async (dispatch) => {
  try {
    dispatch(addAnneeScolaireStart());

    // const response = await axios.post('https://elimu-api.herokuapp.com/api/v1/admin/auth/anneeScolaire', {
    //   nom
    // });

    // Save user data to LocalStorage
    // localStorage.setItem('anneeScolaireList', JSON.stringify(await response.data));

    // Dispatch loginSuccess action with response data
    // dispatch(addAnneeScolaireSuccess(response.data)); // TODO : USE NETWORK

    dispatch(addAnneeScolaireSuccess({name: nom, id:"12355", timestamp: "2023-01-01"})) // TODO : Just for test!

  } catch (error) {
    console.log(error);
    dispatch(addAnneeScolaireFailure(error.response.data.message));
  }
};
