//  import axios from 'axios';
import { addClasseFailure, addClasseStart, addClasseSuccess } from './classeReducer';


export const ClasseAction = (nom, anneeScolaire, ecole, id, timestamp) => async (dispatch) => {
  try {
    dispatch(addClasseStart());

    // const response = await axios.post('https://elimu-api.herokuapp.com/api/v1/admin/auth/classe', {
    //  nom, anneeScolaire, ecole
    // });

    // Save user data to LocalStorage
    // localStorage.setItem('classeList', JSON.stringify(await response.data));

    // Dispatch loginSuccess action with response data
    // dispatch(addClasseSuccess(response.data)); // TODO : USE NETWORK

    dispatch(addClasseSuccess({name: nom,  anneeScolaire, ecole, id: id=== undefined ? "1235" : id, timestamp: timestamp=== undefined ? "2023-01-01" : timestamp})) // TODO : Just for test!

  } catch (error) {
    console.log("error =>",error);
    dispatch(addClasseFailure(error.response.data.message));
  }
};
