import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(
      "https://wecare-api.herokuapp.com/api/v1/admin/dashboard/patients"
    );
    return response.data;
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    patientList: [],
    isLoadingPatient: false,
    errorPatient: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.isLoadingPatient = true;
        state.errorPatient = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.isLoadingPatient = false;
        state.patientList = action.payload;
        state.errorPatient = null;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoadingPatient = false;
        state.errorPatient = action.errorPatient.message;
      });
  },
});

export default patientsSlice.reducer;
