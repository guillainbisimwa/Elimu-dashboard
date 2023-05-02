import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to fetch 
// the list of doctors. 
// Then we define a new slice called doctorsSlice with an initial state containing 
// an empty list of doctors, isLoading flag, and an error message if any.

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    const response = await axios.get(
      "https://wecare-api.herokuapp.com/api/v1/admin/dashboard/doctors"
    );
    return response.data;
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    doctorList: [],
    isLoadingDoctor: false,
    errorDoctor: null,
  },
  reducers: {},
  // In the extraReducers field, we define how the state should change when the asynchronous
  // thunk fetchDoctors is in a pending, fulfilled, or rejected state. 
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoadingDoctor = true;
        state.errorDoctor = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoadingDoctor = false;
        state.doctorList = action.payload;
        state.errorDoctor = null;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoadingDoctor = false;
        state.errorDoctor = action.errorDoctor.message;
      });
  },
});

export default doctorsSlice.reducer;
