import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: { coords: null, distance: null, fetching: false },
  reducers: {
    setLocation: (state, { payload: { coords, distance } }) => {
      state.coords = coords;
      state.distance = distance;
    },
    setFetching: (state, { payload }) => {
      state.fetching = payload;
    },
  },
});

export const { setFetching } = locationSlice.actions;

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;

export const selectCurrentLocation = (state) => state.location;

export const selectIsFetching = (state) => state.fetching;
