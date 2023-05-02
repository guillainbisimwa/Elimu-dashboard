import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import doctorsReducer from './doctorsReducer';
import patientsReducer from './patientsReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
    patients: patientsReducer
  },
});

export default store;
