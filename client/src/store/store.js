import {configureStore} from '@reduxjs/toolkit'
import {allBirdsReducer} from './features/allBirds/allBirdsSlice.js'
import {setupListeners} from '@reduxjs/toolkit/query'

// const store = 