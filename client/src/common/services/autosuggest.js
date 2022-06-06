import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const suggestApi = createApi({
  reducerPath: "suggestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api?`,
  }),
  keepUnusedDataFor: 31536000,
  endpoints: (builder) => ({
    getCoords: builder.query({
      query: (location) => `geocode/search?text=${location}`,
    }),
    getSuggestions: builder.query({
      query: (text) =>
        `geocode/autocomplete?text=${text}&type=locality&format=json`,
    }),
    getLocationFromCoords: builder.query({
      query: (points) => ({
        url: `batch/geocode/reverse?type=city`,
        method: "POST",
        body: points,
      }),
    }),
    getLocationsFromQuery: builder.query({
      query: (id) => `batch/geocode/reverse?format=json&id=${id}`,
    }),
  }),
});

export const {
  useGetLocationFromCoordsQuery,
  useGetCoordsQuery,
  useGetLocationsFromQueryQuery,
  useGetSuggestionsQuery,
} = suggestApi;
