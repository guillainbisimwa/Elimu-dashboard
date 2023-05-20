import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchParents = createAsyncThunk(
  "parents/fetchParents",
  async () => {
    const response = await axios.get(
      "https://elimu-backend.netlify.com/api/parents"
    );
    return response.data;
  }
);

const parentsSlice = createSlice({
  name: "parents",
  initialState: {
    parentList: [],
    isLoadingParent: false,
    errorParent: null,
  },
  reducers: {
    addParentStart: (state) => {
      state.isLoadingParent = true;
    },
    addParentSuccess: (state, action) => {
      state.isLoadingParent = false;
      state.parentList = [ ...state.parentList, {...action.payload }];
      state.errorParent = null;

      // Store user data to LocalStorage
      // localStorage.setItem('parentList', JSON.stringify({ parentList: action.payload }));
    },
    addParentFailure: (state, action) => {
      state.isLoadingParent = false;
      state.errorParent = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchParents.pending, (state) => {
        state.isLoadingParent = true;
        state.errorParent = null;
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.isLoadingParent = false;
        state.parentList = action.payload;
        state.errorParent = null;
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.isLoadingParent = false;
        state.errorParent = action.payload;
      });
  },
});

export const { addParentSuccess, addParentFailure, addParentStart  } = parentsSlice.actions;

export default parentsSlice.reducer;
