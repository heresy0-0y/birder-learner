import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Bird} from '../../store/types'

export const birdApi = createApi({
    reducerPath: 'birdApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.gbif.org/v1/occurrence/' }),
    endpoints: (builder) => ({
        getBirdBySpecies: builder.query<Bird, string>({ 
            query: (species) => `occurrence/${species}`,
        }),
    }),
})