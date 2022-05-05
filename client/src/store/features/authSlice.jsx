import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'auth',
    initialState: {user: null, token: null},
    reducers: {
        setCredentials: (state,action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        }
    }
})

export const {setCredentials} = slice.actions

export default slice.reducer

export const selectCurrentUser = (state) => state.auth.user