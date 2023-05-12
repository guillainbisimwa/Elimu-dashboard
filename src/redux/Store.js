import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import parentsReducer from './parentsReducer';
import ecoleReducer from './ecoleReducer';
import anneeScolaireReducer from './anneeScolaireReducer';
import classeReducer from './classeReducer';
import eleveReducer from './eleveReducer';
import paymentReducer from './paymentReducer';
import communicationReducer from './communicationReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ecole: ecoleReducer,
    parents: parentsReducer,

    anneeScolaire: anneeScolaireReducer,
    classes: classeReducer,
    eleves: eleveReducer,
    payments: paymentReducer,
    communications: communicationReducer
  },
});

export default store;
