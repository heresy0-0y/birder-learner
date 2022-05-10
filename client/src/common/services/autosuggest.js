import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const key = process.env.NEXT_PUBLIC_BING_API_KEY;

export const suggestApi = createApi({
  reducerPath: "suggestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://dev.virtualearth.net/REST/v1",
  }),
  endpoints: (builder) => ({
    getSuggestions: builder.query({
      query: (text) => `Autosuggest?&key=${key}&q=${text}`,
    }),
    getCoords: builder.query({
      query: (address) => `Locations?q=${address}&key=${key}`,
    }),
  }),
});

export const { useGetSuggestionsQuery, useGetCoordsQuery } = suggestApi;