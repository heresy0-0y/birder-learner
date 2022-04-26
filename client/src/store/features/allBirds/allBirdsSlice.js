import {createSlice} from "@reduxjs/toolkit"
import fetchBirds from '../../../common/services/birds.js'

const allBirdsData = async () =>  await fetchBirds()

export const loadBirds = () => {
    return async (dispatch) => {
        const allBirds = await fetchBirds()
        dispatch({type: 'allBirds/loadData', payload: allBirds})
    }
}

const initialState = allBirdsData


const allBirdsSlice = createSlice({
    name: 'allBirds',
    initialState: initialState,
    reducers: {
        addBirds: (state, action) => {
            state.birds = action.payload
        }
    }
})

export const {addBirds} = allBirdsSlice.actions
export default allBirdsSlice.reducer
