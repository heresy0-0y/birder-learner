import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchLocation } from "./";
import { HYDRATE } from "next-redux-wrapper";

export const birdsInitApi = createApi({
  reducerPath: "birdsInitApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.gbif.org/v1/" }),
  keepUnusedDataFor: 2147483,
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
          `occurrence/search?&mediaType=StillImage&taxonKey=212&limit=40&basisOfRecord=HUMAN_OBSERVATION&datasetKey=50c9509d-22c7-4a22-a47d-8c48425ef4a7&country=${countryCode}`
        );
        if (result.error) throw response.error;
        return result.data ? { data: result.data } : { error: result.error };
      },
    }),
    getSongsByBird: builder.query({
      query: (taxonKey) =>
        `occurrence/search?&mediaType=Sound&taxonKey=${taxonKey}&limit=26`,
    }),
    getBirdsByCoords: builder.query({
      query: (location) =>
        `occurrence/search?&mediaType=StillImage&taxonKey=212&limit=40&basisOfRecord=HUMAN_OBSERVATION&datasetKey=50c9509d-22c7-4a22-a47d-8c48425ef4a7&geoDistance=${location.coords.lat},${location.coords.lng},${location.distance}km`,
    }),
    getBirdByKey: builder.query({
      query: (key) => `occurrence/${key}`,
    }),
    getVernacular: builder.query({
      query: (taxonKey) => `species/${taxonKey}`,
    }),
  }),
});
export const selectGetBirdsByIPCountryCode =
  birdsInitApi.endpoints.getBirdsByIPCountryCode.select();
export const {
  getBirdsByIPCountryCode,
  getBirdByKey,
  getSongsByBird,
  getBirdsByCoords,
} = birdsInitApi.endpoints;
export const {
  useGetBirdsByIPCountryCodeQuery,
  useGetSongsByBirdQuery,
  useGetBirdsByCoordsQuery,
  useGetBirdByKeyQuery,
  useGetVernacularQuery,
  util: { getRunningOperationPromises },
} = birdsInitApi;

export const useQueryStateResult =
  birdsInitApi.endpoints.getBirdsByCoords.useQueryState;
