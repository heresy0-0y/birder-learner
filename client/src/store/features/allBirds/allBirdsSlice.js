import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchBirds from "../../../common/services/birds.js";
import fetchLocation from "../../../common/services";



export const loadBirds = createAsyncThunk("allBirds/loadBirds", async (country) => {

  const response = await fetchBirds(country);
  return response;
});

// const initialState = allBirdsData;
const initialState = {
  birds: [],
  isLoading: false,
  hasError: false,
};

const sliceOptions = {
  name: "allBirds",
  initialState: {
    birds: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    [loadBirds.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadBirds.fulfilled]: (state, action) => {
      state.birds = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadBirds.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
};

export const allBirdsSlice = createSlice(sliceOptions)

export const selectAllBirds = (state) => state.allBirds.birds;

export const { addBirds } = allBirdsSlice.actions;
export default allBirdsSlice.reducer;
