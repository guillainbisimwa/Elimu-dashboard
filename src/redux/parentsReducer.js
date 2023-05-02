import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchParent = createAsyncThunk(
  "parents/fetchParent",
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
      .addCase(fetchParent.pending, (state) => {
        state.isLoadingParent = true;
        state.errorParent = null;
      })
      .addCase(fetchParent.fulfilled, (state, action) => {
        state.isLoadingParent = false;
        state.parentList = action.payload;
        state.errorParent = null;
      })
      .addCase(fetchParent.rejected, (state, action) => {
        state.isLoadingParent = false;
        state.errorParent = action.errorParent.message;
      });
  },
});

export default parentsSlice.reducer;
