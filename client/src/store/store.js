import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../common/services/birds.js";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";

import { authApi } from "../common/services/auth.js";
import authReducer, { slice as authSlice } from "./features/authSlice";
// import allBirdsReducer from './features/allBirds/allBirdsSlice.js'

export const pageSlice = createSlice({
  name: "page",

  initialState: { title: "", subtitle: "", counter: 0 },

  reducers: {
    increaseCounter(state) {
      state.counter += 1;
    },
    setTitle(state, { payload }) {
      state.counter += 1;
      Object.assign(state, payload);
    },
  },

  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.page,
    }),
  },
});

export const subjectSlice = createSlice({
  name: "subject",

  initialState: { title: "", subtitle: "", counter: 0 },

  reducers: {
    setEnt(state, action) {
      return action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const selectPage = (state) => state[pageSlice.name];
export const store = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [authSlice.name]: authSlice.reducer,
      [subjectSlice.name]: subjectSlice.reducer,
      [pageSlice.name]: pageSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
      .prepend(nextReduxCookieMiddleware({ subtrees: [`${authSlice.name}`] }))
        .concat(api.middleware)
        .concat(authApi.middleware),
    devTools: true,
  })
);

export const fetchSubject = (id) => async (dispatch) => {
  const timeoutPromise = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout));
  await timeoutPromise(200);
  dispatch(
    subjectSlice.actions.setEnt({
      [id]: {
        id,
        name: `Subject ${id}`,
      },
    })
  );
};

export const wrapper = createWrapper(store, { debug: true });
export const selectSubject = (id) => (state) =>
  state?.[subjectSlice.name]?.[id];
// setupListeners(wrapper.dispatch)
