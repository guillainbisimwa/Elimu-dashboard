import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to fetch 
// the list of ecole. 
// Then we define a new slice called communicationSlice with an initial state containing 
// an empty list of ecole, isLoading flag, and an error message if any.

export const fetchCommunication = createAsyncThunk(
  "communication/fetchCommunication",
  async () => {
    const response = await axios.get(
      "https://elimu-backend.netlify.com/api/as"
    );
    return response.data;
  }
);

const communicationSlice = createSlice({
  name: "communication",
  initialState: {
    communicationList: [
      {
        id: "123",
        motif: "Frais 1 ere tranche",
        anneeScolaire: "123",
        eleve: "123",
        parent: "123",
        timestamp: "2023-01-01",
      }
    ],
    isLoadingCommunication: false,
    errorCommunication: null,
  },
  reducers: {
    addCommunicationStart: (state) => {
      state.isLoadingCommunication = true;
    },
    addCommunicationSuccess: (state, action) => {
      state.isLoadingCommunication = false;
      state.communicationList = [ ...state.communicationList, {...action.payload }];
      state.errorCommunication = null;

      // Store user data to LocalStorage
      // localStorage.setItem('communicationList', JSON.stringify({ communicationList: action.payload }));
    },
    addCommunicationFailure: (state, action) => {
      state.isLoadingCommunication = false;
      state.errorCommunication = action.payload;
    },
  },
  // In the extraReducers field, we define how the state should change when the asynchronous
  // thunk fetchCommunication is in a pending, fulfilled, or rejected state. 
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunication.pending, (state) => {
        state.isLoadingCommunication = true;
        state.errorCommunication = null;
      })
      .addCase(fetchCommunication.fulfilled, (state, action) => {
        state.isLoadingCommunication = false;
        state.communicationList = action.payload;
        state.errorCommunication = null;
      })
      .addCase(fetchCommunication.rejected, (state, action) => {
        state.isLoadingCommunication = false;
        state.errorCommunication = action.errorCommunication.message;
      });
  },
});

export const { addCommunicationStart, addCommunicationSuccess, addCommunicationFailure  } = communicationSlice.actions;

export default communicationSlice.reducer;
