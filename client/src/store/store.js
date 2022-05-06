import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper'
import {configureStore, createSlice} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {api} from '../common/services/birds.js'
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";

import {authApi} from '../common/services/auth.js'
import authReducer from './features/authSlice'
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
export const store = wrapMakeStore(() => configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [subjectSlice.name]: subjectSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).concat(authApi.middleware).prepend(nextReduxCookieMiddleware({subtrees: [`${subjectSlice.name}`]})),
    devTools: true
}))

export const fetchSubject = (id) => async dispatch => {
    const timeoutPromise = (timeout) => new Promise(resolve => setTimeout(resolve, timeout))
    await timeoutPromise(200)
    dispatch(subjectSlice.actions.setEnt({
        [id]: {
            id,
            name: `Subject ${id}`
        }
    }))
}

export const wrapper = createWrapper(store, {debug: true})
export const selectSubject = (id) => (state) => state?.[subjectSlice.name]?.[id]
// setupListeners(wrapper.dispatch)
