//  import axios from 'axios';
import { addEcoleFailure, addEcoleStart, addEcoleSuccess } from './ecoleReducer';


export const ecoleAction = (nom, phone, address, email, website, imgUrl, id, timestamp) => async (dispatch) => {
  try {
    dispatch(addEcoleStart());

    // const response = await axios.post('https://elimu-api.herokuapp.com/api/v1/admin/auth/ecole', {
    //   nom, phone, address, email, website, imgUrl
    // });

    // Save user data to LocalStorage
    // localStorage.setItem('ecoleList', JSON.stringify(await response.data));

    // Dispatch loginSuccess action with response data
    // dispatch(addEcoleSuccess(response.data)); // TODO : USE NETWORK

    dispatch(addEcoleSuccess({name: nom, phones: [...phone], address, email, website, imgUrl,id: id=== undefined ? "1235" : id, timestamp: timestamp=== undefined ? "2023-01-01" : id})) // TODO : Just for test!

  } catch (error) {
    console.log(error);
    dispatch(addEcoleFailure(error.response.data.message));
  }
};
