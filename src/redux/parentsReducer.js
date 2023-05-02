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
  reducers: {},
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
        state.errorParent = action.errorParent.message;
      });
  },
});

export default parentsSlice.reducer;
