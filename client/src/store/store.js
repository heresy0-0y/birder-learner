import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../common/services/birds.js";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";

import { authApi } from "../common/services/auth.js";
import { slice as authSlice } from "./features/authSlice";
// import allBirdsReducer from './features/allBirds/allBirdsSlice.js'

export const store = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [authSlice.name]: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(nextReduxCookieMiddleware({ subtrees: [`${authSlice}`] }))
        .concat(api.middleware)
        .concat(authApi.middleware),
  })
);

export const wrapper = createWrapper(store);

// setupListeners(wrapper.dispatch)
