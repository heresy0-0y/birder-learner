import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

export const suggestApi = createApi({
  reducerPath: "suggestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.geoapify.com/v1/`,
  }),
  keepUnusedDataFor: 31536000,
  endpoints: (builder) => ({
    getCoords: builder.query({
      query: (location) => `geocode/search?apiKey=${key}&text=${location}`,
    }),
    getSuggestions: builder.query({
      query: (text) =>
        `geocode/autocomplete?apiKey=${key}&text=${text}&type=locality&format=json`,
    }),
    getLocationFromCoords: builder.query({
      query: (points) => ({
        url: `batch/geocode/reverse?apiKey=${key}&type=city`,
        method: "POST",
        body: points,
      }),
    }),
    getLocationsFromQuery: builder.query({
      query: (id) => `batch/geocode/reverse?apiKey=${key}&format=json&id=${id}`,
    }),
  }),
});

export const {
  useGetLocationFromCoordsQuery,
  useGetCoordsQuery,
  useGetLocationsFromQueryQuery,
  useGetSuggestionsQuery,
} = suggestApi;
