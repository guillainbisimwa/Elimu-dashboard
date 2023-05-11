import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to fetch 
// the list of ecole. 
// Then we define a new slice called classeSlice with an initial state containing 
// an empty list of ecole, isLoading flag, and an error message if any.

export const fetchClasse = createAsyncThunk(
  "classe/fetchClasse",
  async () => {
    const response = await axios.get(
      "https://elimu-backend.netlify.com/api/as"
    );
    return response.data;
  }
);

const classeSlice = createSlice({
  name: "classe",
  initialState: {
    classeList: [
      {
        id: "123",
        name: "2023",
        anneeScolaire: "123",
        ecole:"123",
        timestamp: "2023-01-01",
      }
    ],
    isLoadingClasse: false,
    errorClasse: null,
  },
  reducers: {
    addAnneScolaireStart: (state) => {
      state.isLoadingClasse = true;
    },
    addClasseSuccess: (state, action) => {
      state.isLoadingClasse = false;
      state.classeList = [ ...state.classeList, {...action.payload }];
      state.errorClasse = null;

      // Store user data to LocalStorage
      // localStorage.setItem('classeList', JSON.stringify({ classeList: action.payload }));
    },
    addClasseFailure: (state, action) => {
      state.isLoadingClasse = false;
      state.errorClasse = action.payload;
    },
  },
  // In the extraReducers field, we define how the state should change when the asynchronous
  // thunk fetchClasse is in a pending, fulfilled, or rejected state. 
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasse.pending, (state) => {
        state.isLoadingClasse = true;
        state.errorClasse = null;
      })
      .addCase(fetchClasse.fulfilled, (state, action) => {
        state.isLoadingClasse = false;
        state.classeList = action.payload;
        state.errorClasse = null;
      })
      .addCase(fetchClasse.rejected, (state, action) => {
        state.isLoadingClasse = false;
        state.errorClasse = action.errorClasse.message;
      });
  },
});

export const { addAnneScolaireStart, addClasseSuccess, addClasseFailure  } = classeSlice.actions;

export default classeSlice.reducer;
