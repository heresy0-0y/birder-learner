import {createStore, combineReducers} from 'redux'
import {allBirdsReducer} from './features/allBirds/allBirdsSlice.js'

const store = createStore(allBirdsReducer)