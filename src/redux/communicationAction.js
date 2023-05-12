//  import axios from 'axios';
import { addCommunicationFailure, addCommunicationStart, addCommunicationSuccess } from './communicationReducer';


export const CommunicationAction = (motif, anneeScolaire, eleve, parent) => async (dispatch) => {
  try {
    dispatch(addCommunicationStart());

    // const response = await axios.post('https://elimu-api.herokuapp.com/api/v1/admin/auth/communication', {
    //   motif, anneeScolaire, eleve, parent
    // });

    // Save user data to LocalStorage
    // localStorage.setItem('communicationList', JSON.stringify(await response.data));

    // Dispatch loginSuccess action with response data
    // dispatch(addCommunicationSuccess(response.data)); // TODO : USE NETWORK

    dispatch(addCommunicationSuccess({motif, anneeScolaire, eleve, parent, id:"12355", timestamp: "2023-01-01"})) // TODO : Just for test!

  } catch (error) {
    console.log(error);
    dispatch(addCommunicationFailure(error.response.data.message));
  }
};
