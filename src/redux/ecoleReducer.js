import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to fetch 
// the list of ecole. 
// Then we define a new slice called ecoleSlice with an initial state containing 
// an empty list of ecole, isLoading flag, and an error message if any.

export const fetchEcole = createAsyncThunk(
  "ecole/fetchEcole",
  async () => {
    const response = await axios.get(
      "https://elimu-backend.netlify.com/api/ecole"
    );
    return response.data;
  }
);

const ecoleSlice = createSlice({
  name: "ecole",
  initialState: {
    ecoleList: 
      [...Array(3)].map((_, index) => ({
        id: "123",
        name: faker.company.name(), // "Institut Mwanga", 
        phones: [faker.phone.number('+243 9# ### ## ##')],
        imgUrl: faker.image.avatar(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        website: faker.internet.domainName(),
        timestamp: faker.date.between(),
      }
      )),
    isLoadingEcole: false,
    errorEcole: null,
  },
  reducers: {
    addEcoleStart: (state) => {
      state.isLoadingEcole = true;
    },
    addEcoleSuccess: (state, action) => {
      state.isLoadingEcole = false;
      state.ecoleList = [ ...state.ecoleList, {...action.payload }];
      state.errorEcole = null;

      // Store user data to LocalStorage
      // localStorage.setItem('ecoleList', JSON.stringify({ ecoleList: action.payload }));
    },
    addEcoleFailure: (state, action) => {
      state.isLoadingEcole = false;
      state.errorEcole = action.payload;
    },
  },
  // In the extraReducers field, we define how the state should change when the asynchronous
  // thunk fetchEcole is in a pending, fulfilled, or rejected state. 
  extraReducers: (builder) => {
    builder
      .addCase(fetchEcole.pending, (state) => {
        state.isLoadingEcole = true;
        state.errorEcole = null;
      })
      .addCase(fetchEcole.fulfilled, (state, action) => {
        state.isLoadingEcole = false;
        state.ecoleList = action.payload;
        state.errorEcole = null;
      })
      .addCase(fetchEcole.rejected, (state, action) => {
        state.isLoadingEcole = false;
        state.errorEcole = action.errorEcole.message;
      });
  },
});

export const { addEcoleStart, addEcoleSuccess, addEcoleFailure  } = ecoleSlice.actions;

export default ecoleSlice.reducer;
