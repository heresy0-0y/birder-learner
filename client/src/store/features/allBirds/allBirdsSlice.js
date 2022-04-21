import fetchBirds from '../../../common/services/birds.js'

const allBirdsData = async () =>  await fetchBirds()

export const loadData = () => {
    return {
        type: 'allBirds/loadData',
        payload: allBirdsData
    }
}

const initialState = allBirdsData

export const allBirdsReducer = (allBirds = initialState, action) => {
    switch (action.type) {
        case 'allBirds/loadData': 
            return action.payload;
        default:
            return allBirds
    }
}