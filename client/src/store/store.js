import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {api} from '../common/services/birds.js'
import {authApi} from '../common/services/auth.js'
import authReducer from './features/authSlice'
// import allBirdsReducer from './features/allBirds/allBirdsSlice.js'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).concat(authApi.middleware),
})

setupListeners(store.dispatch)
