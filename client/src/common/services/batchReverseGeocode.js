import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

export const batchGeocodeApi = createApi({
  reducerPath: "batchGeocodeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.geoapify.com/v1/`,
  }),
  keepUnusedDataFor: 31536000,
  endpoints: (builder) => ({
    getCoords: builder.query({
      query: (location) =>
        `geocoding/v1/address?location=${location}&key=${key}&maxResults=2`,
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
} = batchGeocodeApi;
