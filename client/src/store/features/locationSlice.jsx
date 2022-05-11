import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: { coords: null, distance: null },
  reducers: {
    setLocation: (state, { payload: { coords, distance } }) => {
      state.coords = coords;
      state.distance = distance;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;

export const selectCurrentLocation = (state) => state.location;
