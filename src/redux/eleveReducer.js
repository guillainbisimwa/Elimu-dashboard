import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to fetch 
// the list of ecole. 
// Then we define a new slice called eleveSlice with an initial state containing 
// an empty list of ecole, isLoading flag, and an error message if any.

export const fetchEleve = createAsyncThunk(
  "eleve/fetchEleve",
  async () => {
    const response = await axios.get(
      "https://elimu-backend.netlify.com/api/as"
    );
    return response.data;
  }
);

const eleveSlice = createSlice({
  name: "eleve",
  initialState: {
    eleveList: [],
    isLoadingEleve: false,
    errorEleve: null,
  },
  reducers: {
    addEleveStart: (state) => {
      state.isLoadingEleve = true;
    },
    addEleveSuccess: (state, action) => {
      state.isLoadingEleve = false;
      state.eleveList = [ ...state.eleveList, {...action.payload }];
      state.errorEleve = null;

      // Store user data to LocalStorage
      // localStorage.setItem('eleveList', JSON.stringify({ eleveList: action.payload }));
    },
    addEleveFailure: (state, action) => {
      state.isLoadingEleve = false;
      state.errorEleve = action.payload;
    },
  },
  // In the extraReducers field, we define how the state should change when the asynchronous
  // thunk fetchEleve is in a pending, fulfilled, or rejected state. 
  extraReducers: (builder) => {
    builder
      .addCase(fetchEleve.pending, (state) => {
        state.isLoadingEleve = true;
        state.errorEleve = null;
      })
      .addCase(fetchEleve.fulfilled, (state, action) => {
        state.isLoadingEleve = false;
        state.eleveList = action.payload;
        state.errorEleve = null;
      })
      .addCase(fetchEleve.rejected, (state, action) => {
        state.isLoadingEleve = false;
        state.errorEleve = action.payload;
      });
  },
});

export const { addEleveStart, addEleveSuccess, addEleveFailure  } = eleveSlice.actions;

export default eleveSlice.reducer;
