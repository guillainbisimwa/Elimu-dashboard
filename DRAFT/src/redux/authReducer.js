import { createSlice } from "@reduxjs/toolkit";

// Retrieve user data from LocalStorage
const userData = JSON.parse(localStorage.getItem('user'));
console.log("userData", userData);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userData ? userData.user : null, // Use user data from LocalStorage or set to null
    error: null,
    isLoading: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;

      // Store user data to LocalStorage
      localStorage.setItem('user', JSON.stringify({ user: action.payload }));
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.isLoading = false;
      state.user = null;
      state.error = null;

      localStorage.clear();

    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutUser } = authSlice.actions;

export default authSlice.reducer;