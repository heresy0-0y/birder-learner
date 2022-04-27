import {configureStore} from '@reduxjs/toolkit'
// import {setupListeners} from '@reduxjs/toolkit/query'
import {api as birdApi} from '../common/services/birds.js'
// import allBirdsReducer from './features/allBirds/allBirdsSlice.js'

export const store = configureStore({
    reducer: {
        [birdApi.reducerPath]: birdApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(birdApi.middleware),
})

// setupListeners(store.dispatch)
