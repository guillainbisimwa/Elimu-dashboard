// import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './authReducer';


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());

    // const response = await axios.post('https://elimu-backend.netlify.com/api/auth/login', {
    //   email,
    //   password,
    // });

    // // Save user data to LocalStorage
    localStorage.setItem('user', JSON.stringify( {email, password}));

    // Dispatch loginSuccess action with response data
    dispatch(loginSuccess({email, password}));

  } catch (error) {
    console.log(error);
    dispatch(loginFailure("Erreur"));
  }
};
