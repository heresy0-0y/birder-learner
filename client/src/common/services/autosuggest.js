import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = process.env.NEXT_PUBLIC_MAPQUEST_API_KEY;

export const suggestApi = createApi({
  reducerPath: "suggestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://www.mapquestapi.com/`,
  }),
  endpoints: (builder) => ({
    getSuggestions: builder.query({
      query: (text) => `search/v3/prediction?&key=${key}&q=${text}&collection=adminArea`,
    }),
    getCoords: builder.query({
      query: (address) => `Locations?q=${address}&key=${key}`,
    }),
    getLocationFromCoords: builder.query({
      query: (points) => ({
        url: `geocoding/v1/batch?key=${key}`,
        method: "POST",
        body: points,
      })
    })
  }),
});

export const { useGetSuggestionsQuery, useGetCoordsQuery, useGetLocationFromCoordsQuery } = suggestApi;
