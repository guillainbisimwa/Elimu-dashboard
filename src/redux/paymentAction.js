//  import axios from 'axios';
import { addPaymentFailure, addPaymentStart, addPaymentSuccess } from './anneeScolaireReducer';


export const PaymentAction = (montant, anneeScolaire, eleve, datePayement) => async (dispatch) => {
  try {
    dispatch(addPaymentStart());

    // const response = await axios.post('https://elimu-api.herokuapp.com/api/v1/admin/auth/anneeScolaire', {
    //   montant, anneeScolaire, eleve, datePayement
    // });

    // Save user data to LocalStorage
    // localStorage.setItem('anneeScolaireList', JSON.stringify(await response.data));

    // Dispatch loginSuccess action with response data
    // dispatch(addPaymentSuccess(response.data)); // TODO : USE NETWORK


    dispatch(addPaymentSuccess({montant, anneeScolaire, eleve, datePayement, id:"12355", timestamp: "2023-01-01"})) // TODO : Just for test!

  } catch (error) {
    console.log(error);
    dispatch(addPaymentFailure(error.response.data.message));
  }
};
