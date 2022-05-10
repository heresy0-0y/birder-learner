import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://birder-api.herokuapp.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
    }),
    getFavorites: builder.query({
        query: () => 'favorites'
    }),
    addFavorite: builder.mutation({
      query: (favorite) => ({
        url: 'favorites',
        method: "POST",
        body: favorite,
      })
    })
  }),
});

export const { useAddUserMutation, useGetUsersQuery, useLoginMutation, useGetFavoritesQuery, useAddFavoriteMutation } =
  authApi;
