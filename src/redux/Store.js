import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import parentsReducer from './parentsReducer';
import ecoleReducer from './ecoleReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ecole: ecoleReducer,
    parents: parentsReducer
  },
});

export default store;
