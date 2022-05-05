import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/'}),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
            }),
        addUser: builder.mutation({
            query: ({user}) => ({
                url: 'users',
                method: 'POST',
                body: user,
            })
        })
    })
})

export const {useAddUserMutation, useGetUsersQuery} = authApi