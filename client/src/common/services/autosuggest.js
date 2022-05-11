import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = process.env.NEXT_PUBLIC_MAPQUEST_API_KEY;

export const suggestApi = createApi({
  reducerPath: "suggestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://www.mapquestapi.com/geocoding/v1/`,
  }),
  endpoints: (builder) => ({
    getSuggestions: builder.query({
      query: (text) => `Autosuggest?&key=${key}&q=${text}`,
    }),
    getCoords: builder.query({
      query: (address) => `Locations?q=${address}&key=${key}`,
    }),
    getLocationFromCoords: builder.query({
      query: (points) => ({
        url: `batch?key=${key}`,
        method: "POST",
        body: points,
      })
    })
  }),
});

export const { useGetSuggestionsQuery, useGetCoordsQuery, useGetLocationFromCoordsQuery } = suggestApi;
