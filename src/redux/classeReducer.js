import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { sample } from 'lodash';


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
    classeList: 
    [...Array(5)].map((_, index) => ({
        id: faker.datatype.uuid(),
        name: sample([ `${faker.datatype.number({ min:1, max: 7 })}er`  ]),
        anneeScolaire: "2023",
        ecole:"123",
        timestamp: faker.date.between(),
      })),
    isLoadingClasse: false,
    errorClasse: null,
  },
  reducers: {
    addClasseStart: (state) => {
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

export const { addClasseStart, addClasseSuccess, addClasseFailure  } = classeSlice.actions;

export default classeSlice.reducer;
