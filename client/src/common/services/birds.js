import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.gbif.org/v1/occurrence/search?&mediaType=StillImage&taxonKey=212&limit=50&basisOfRecord=HUMAN_OBSERVATION&datasetKey=50c9509d-22c7-4a22-a47d-8c48425ef4a7&country=US`,
  }),
  reducerPath: 'birdApi',
  endpoints: (builder) => ({
    getBirdsByIPCountryCode: builder.query({
      query: () => ``,
      // async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
      //   const countryFromIP = await fetchWithBQ(`ipapi.co/json/`);
      //   if (countryFromIP.error) throw countryFromIP.error;
      //   const countryCode = countryFromIP;
      //   const response = await fetchWithBQ(
      //     `api.gbif.org/v1/occurrence/search?&mediaType=StillImage&taxonKey=212&limit=50&basisOfRecord=HUMAN_OBSERVATION&datasetKey=50c9509d-22c7-4a22-a47d-8c48425ef4a7&country=${countryCode}`
      //   );
      //   if (response.error) throw response.error
      //   const result =  await response.json();
      //   return result.results
      //     ? { data: result.results }
      //     : { error: result.error };
      // },
    }),
  }),
});

export const { useGetBirdsByIPCountryCodeQuery } = api;
