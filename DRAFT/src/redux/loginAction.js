import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './authReducer';


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await axios.post('https://wecare-api.herokuapp.com/api/v1/admin/auth/login', {
      email,
      password,
    });

    // Save user data to LocalStorage
    localStorage.setItem('user', JSON.stringify(await response.data));

    // Dispatch loginSuccess action with response data
    dispatch(loginSuccess(response.data));

  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.response.data.message));
  }
};
