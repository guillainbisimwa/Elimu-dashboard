//  import axios from 'axios';

import { addParentFailure, addParentStart, addParentSuccess } from "./parentsReducer";

export const parentAction = (nom, phone, address, pseudo, imgUrl, id, timestamp) => async (dispatch) => {
  try {
    dispatch(addParentStart());

    // const response = await axios.post('https://elimu-api.herokuapp.com/api/v1/admin/auth/ecole', {
    //   nom, phone, address, email, website, imgUrl
    // });

    // Save user data to LocalStorage
    // localStorage.setItem('ecoleList', JSON.stringify(await response.data));

    // Dispatch loginSuccess action with response data
    // dispatch(addEcoleSuccess(response.data)); // TODO : USE NETWORK

    dispatch(addParentSuccess({pseudo, phones: [...phone], name: nom, address, imgUrl, id: id=== undefined ? "1235" : id, timestamp: timestamp=== undefined ? "2023-01-01" : timestamp})) // TODO : Just for test!

  } catch (error) {
    console.log(error);
    dispatch(addParentFailure(error.response.data.message));
  }
};
