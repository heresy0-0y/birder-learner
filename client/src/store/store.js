import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import allBirdsReducer from './features/allBirds/allBirdsSlice.js'

export default configureStore({
    reducer: {
        allBirds: allBirdsReducer
    }
})