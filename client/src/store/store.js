import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../common/services/birds.js";


import { authApi } from "../common/services/auth.js";
import { slice as authSlice } from "./features/authSlice";
// import allBirdsReducer from './features/allBirds/allBirdsSlice.js'
export const subjectSlice = createSlice({
    name: 'subject',

    initialState: {},

    reducers: {
        setEnt(state, action) {
            return action.payload;
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.subject,
            };
        },
    },
});

export const store = () => configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [authSlice.name]: authSlice.reducer,
      [subjectSlice.name]: subjectSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(authApi.middleware),
  })
;

export const wrapper = createWrapper(store);

// setupListeners(wrapper.dispatch)
