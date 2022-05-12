import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchLocation } from "./";
import { HYDRATE } from "next-redux-wrapper";

export const birdsInitApi = createApi({
  reducerPath: "birdsInitApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.gbif.org/v1/occurrence/" }),
  keepUnusedDataFor: 31536000,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getBirdsByIPCountryCode: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const countryFromIP = await fetchLocation();
        if (countryFromIP.error) throw countryFromIP.error;
        const countryCode = countryFromIP;
        const result = await fetchWithBQ(
          `search?&mediaType=StillImage&taxonKey=212&limit=40&basisOfRecord=HUMAN_OBSERVATION&datasetKey=50c9509d-22c7-4a22-a47d-8c48425ef4a7&country=${countryCode}`
        );
        if (result.error) throw response.error;
        return result.data ? { data: result.data } : { error: result.error };
      },
    }),
    getSongsByBird: builder.query({
      query: (taxonKey) =>
        `search?&mediaType=Sound&taxonKey=${taxonKey}&limit=100`,
    }),
    getBirdsByCoords: builder.query({
      query: (location) =>
        `search?&mediaType=StillImage&taxonKey=212&limit=40&basisOfRecord=HUMAN_OBSERVATION&datasetKey=50c9509d-22c7-4a22-a47d-8c48425ef4a7&geoDistance=${location.coords.lat},${location.coords.lng},${location.distance}km`,
    }),
    getBirdByKey: builder.query({
      query: (key) => `${key}`,
    }),
  }),
});
export const selectGetBirdsByIPCountryCode =
  birdsInitApi.endpoints.getBirdsByIPCountryCode.select();
export const { getBirdsByIPCountryCode, getBirdByKey } = birdsInitApi.endpoints;
export const {
  useGetBirdsByIPCountryCodeQuery,
  useGetSongsByBirdQuery,
  useGetBirdsByCoordsQuery,
  useGetBirdByKeyQuery,
  util: { getRunningOperationPromises },
} = birdsInitApi;
