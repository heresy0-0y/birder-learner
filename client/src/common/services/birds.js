import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

async function fetchBirds (country) {

      const response = await fetch(`https://api.gbif.org/v1/occurrence/search?limit=30&mediaType=StillImage&taxonKey=212&limit=300&basisOfRecord=HUMAN_OBSERVATION&datasetKey=50c9509d-22c7-4a22-a47d-8c48425ef4a7&country=${country}`)
      const data = await response.json()
      return data.results
    
    }


export default fetchBirds

/* 
export const birdApi = createApi({
  reducerPath: 'birdApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.gbif.org/v1/occurrence/'}), 
  endpoints: (builder) => ({
    getBirdsByIPCountryCode: builder.query({
      query: (countryCode) => `bird/${countryCode}`,
    }),
  }),
})

*/