//  import axios from 'axios';

import { addParentFailure, addParentStart, addParentSuccess } from "./parentsReducer";

export const parentAction = (pseudo, phones, name, address, imgUrl) => async (dispatch) => {
  try {
    dispatch(addParentStart());

    // const response = await axios.post('https://elimu-api.herokuapp.com/api/v1/admin/auth/ecole', {
    //   nom, phone, address, email, website, imgUrl
    // });

    // Save user data to LocalStorage
    // localStorage.setItem('ecoleList', JSON.stringify(await response.data));

    // Dispatch loginSuccess action with response data
    // dispatch(addEcoleSuccess(response.data)); // TODO : USE NETWORK

    dispatch(addParentSuccess({pseudo, phones: [...phones], name, address, imgUrl, id:"12355", timestamp: "2023-01-01"})) // TODO : Just for test!

  } catch (error) {
    console.log(error);
    dispatch(addParentFailure(error.response.data.message));
  }
};
