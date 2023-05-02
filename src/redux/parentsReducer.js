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
    parentList: [
      {
        pseudo: "Parent 1",
        name: "Parent 1",
        phones: ["+24312345678", "+243789456123"],
        address: "Q. Katoyi",
        imgUrl: null,
        timestamp: "2023-01-01"
      },
      {
        pseudo: "Parent 2",
        name: "Parent 1",
        phones: ["+24312345678", "+243789456123"],
        address: "Q. Katoyi",
        imgUrl: null,
        timestamp: "2023-01-01"
      }
    ],
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
