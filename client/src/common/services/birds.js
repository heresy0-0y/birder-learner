import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchLocation } from "./";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.gbif.org/v1/occurrence/" }),
  endpoints: (builder) => ({
    getBirdsByIPCountryCode: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const countryFromIP = await fetchLocation();
        if (countryFromIP.error) throw countryFromIP.error;
        const countryCode = countryFromIP;
        const result = await fetchWithBQ(
          `search?&mediaType=StillImage&taxonKey=212&limit=50&basisOfRecord=HUMAN_OBSERVATION&datasetKey=50c9509d-22c7-4a22-a47d-8c48425ef4a7&country=${countryCode}`
        );
        if (result.error) throw response.error;
        return result.data ? { data: result.data } : { error: result.error };
      },
    }),
    getSongsByBird: builder.query({
      query: (taxonKey) => `search?&mediaType=Sound&taxonKey=${taxonKey}`,
    }),
  }),
});

export const { useGetBirdsByIPCountryCodeQuery, useGetSongsByBirdQuery } = api;
