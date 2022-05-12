import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { birdsInitApi } from "../common/services/birds.js";
import { createWrapper } from "next-redux-wrapper";

import { suggestApi } from "../common/services/autosuggest.js";
import { authApi } from "../common/services/auth.js";
import { slice as authSlice } from "./features/authSlice";
import { locationSlice } from "./features/locationSlice";

export const store = configureStore({
  reducer: {
    [birdsInitApi.reducerPath]: birdsInitApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [suggestApi.reducerPath]: suggestApi.reducer,
    [locationSlice.name]: locationSlice.reducer,
  },
  middleware: (gDM) =>
    gDM()
      .concat(birdsInitApi.middleware)
      .concat(authApi.middleware)
      .concat(suggestApi.middleware),
});

export const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { debug: true });

setupListeners(store.dispatch);
