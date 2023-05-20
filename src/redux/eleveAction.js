//  import axios from 'axios';
import { addEleveFailure, addEleveStart, addEleveSuccess } from './eleveReducer';


export const EleveAction = (nom, phone, address, imgUrl, parent, classe, id, timestamp) => async (dispatch) => {
  try {
    dispatch(addEleveStart());

    // const response = await axios.post('https://elimu-api.herokuapp.com/api/v1/admin/auth/eleve', {
    //   nom, phone, address, imgUrl, parent, classe
    // });

    // Save user data to LocalStorage
    // localStorage.setItem('eleveList', JSON.stringify(await response.data));

    // Dispatch loginSuccess action with response data
    // dispatch(addEleveSuccess(response.data)); // TODO : USE NETWORK

    dispatch(addEleveSuccess({name: nom, phones: [...phone], address, imgUrl, parent, classe,  id: id=== undefined ? "1235" : id, timestamp: timestamp=== undefined ? "2023-01-01" : timestamp})) // TODO : Just for test!

  } catch (error) {
    console.log(error);
    dispatch(addEleveFailure(error.response.data.message));
  }
};
