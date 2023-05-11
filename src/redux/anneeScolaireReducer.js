import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to fetch 
// the list of ecole. 
// Then we define a new slice called anneeScolaireSlice with an initial state containing 
// an empty list of ecole, isLoading flag, and an error message if any.

export const fetchAnneeScolaire = createAsyncThunk(
  "anneeScolaire/fetchAnneeScolaire",
  async () => {
    const response = await axios.get(
      "https://elimu-backend.netlify.com/api/as"
    );
    return response.data;
  }
);

const anneeScolaireSlice = createSlice({
  name: "anneeScolaire",
  initialState: {
    anneeScolaireList: [
      {
        id: "123",
        name: "2023",
        timestamp: "2023-01-01",
      }
    ],
    isLoadingAnneeScolaire: false,
    errorAnneeScolaire: null,
  },
  reducers: {
    addAnneScolaireStart: (state) => {
      state.isLoadingAnneeScolaire = true;
    },
    addAnneeScolaireSuccess: (state, action) => {
      state.isLoadingAnneeScolaire = false;
      state.anneeScolaireList = [ ...state.anneeScolaireList, {...action.payload }];
      state.errorAnneeScolaire = null;

      // Store user data to LocalStorage
      // localStorage.setItem('anneeScolaireList', JSON.stringify({ anneeScolaireList: action.payload }));
    },
    addAnneeScolaireFailure: (state, action) => {
      state.isLoadingAnneeScolaire = false;
      state.errorAnneeScolaire = action.payload;
    },
  },
  // In the extraReducers field, we define how the state should change when the asynchronous
  // thunk fetchAnneeScolaire is in a pending, fulfilled, or rejected state. 
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnneeScolaire.pending, (state) => {
        state.isLoadingAnneeScolaire = true;
        state.errorAnneeScolaire = null;
      })
      .addCase(fetchAnneeScolaire.fulfilled, (state, action) => {
        state.isLoadingAnneeScolaire = false;
        state.anneeScolaireList = action.payload;
        state.errorAnneeScolaire = null;
      })
      .addCase(fetchAnneeScolaire.rejected, (state, action) => {
        state.isLoadingAnneeScolaire = false;
        state.errorAnneeScolaire = action.errorAnneeScolaire.message;
      });
  },
});

export const { addAnneScolaireStart, addAnneeScolaireSuccess, addAnneeScolaireFailure  } = anneeScolaireSlice.actions;

export default anneeScolaireSlice.reducer;
