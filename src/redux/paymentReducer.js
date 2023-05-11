import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to fetch 
// the list of ecole. 
// Then we define a new slice called paymentSlice with an initial state containing 
// an empty list of ecole, isLoading flag, and an error message if any.

export const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async () => {
    const response = await axios.get(
      "https://elimu-backend.netlify.com/api/as"
    );
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentList: [
      {
        id: "123",
        montant : "20",
        anneeScolaire: "123",
        eleve: "123",
        datePayement: "2023-05-20",
        timestamp: "2023-01-01",
      }
    ],
    isLoadingPayment: false,
    errorPayment: null,
  },
  reducers: {
    addAnneScolaireStart: (state) => {
      state.isLoadingPayment = true;
    },
    addPaymentSuccess: (state, action) => {
      state.isLoadingPayment = false;
      state.paymentList = [ ...state.paymentList, {...action.payload }];
      state.errorPayment = null;

      // Store user data to LocalStorage
      // localStorage.setItem('paymentList', JSON.stringify({ paymentList: action.payload }));
    },
    addPaymentFailure: (state, action) => {
      state.isLoadingPayment = false;
      state.errorPayment = action.payload;
    },
  },
  // In the extraReducers field, we define how the state should change when the asynchronous
  // thunk fetchPayment is in a pending, fulfilled, or rejected state. 
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayment.pending, (state) => {
        state.isLoadingPayment = true;
        state.errorPayment = null;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.isLoadingPayment = false;
        state.paymentList = action.payload;
        state.errorPayment = null;
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.isLoadingPayment = false;
        state.errorPayment = action.errorPayment.message;
      });
  },
});

export const { addAnneScolaireStart, addPaymentSuccess, addPaymentFailure  } = paymentSlice.actions;

export default paymentSlice.reducer;
