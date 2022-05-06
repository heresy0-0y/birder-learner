
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../common/services/birds.js";


import { authApi } from "../common/services/auth.js";
import { slice as authSlice } from "./features/authSlice";


export const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [authSlice.name]: authSlice.reducer,

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(authApi.middleware),
  })
;



setupListeners(store.dispatch)
