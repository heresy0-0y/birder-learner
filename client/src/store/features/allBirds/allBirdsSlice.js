import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchBirds from "../../../common/services/birds.js";
import fetchLocation from "../../../common/services";

const allBirdsData = async () => await fetchBirds();

export const loadBirds = createAsyncThunk(
  "allBirds/loadBirds",
  async (arg, thunkAPI) => {
    const country = await fetchLocation();
    const birds = await fetchBirds(country);
    return birds;
  }
);

const initialState = allBirdsData;

const allBirdsSlice = createSlice({
  name: "allBirds",
  initialState: initialState,
  reducers: {
    addBirds: (state, action) => {
      state.birds = action.payload;
    },
  },
});

export const { addBirds } = allBirdsSlice.actions;
export default allBirdsSlice.reducer;
