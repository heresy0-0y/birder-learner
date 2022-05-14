import { createSlice } from "@reduxjs/toolkit";

export const servicesSlice = createSlice({
  name: "services",
  initialState: { birds: null, favorites: null },
  reducers: {
    setCurrentBirds: (state, { payload: { birds } }) => {
      state.birds = birds;
    },
    setFavoriteBirds: (state, { payload: { birds } }) => {
      state.favorites = birds;
    },
  },
});

export const { setCurrentBirds } = birdsSlice.actions;

export default birdsSlice.reducer;

export const selectCurrentBirds = (state) => state.birds;
