import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { People } from './types';

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<People, { searchQuery: string; page: number }>({
      query: ({ searchQuery = '', page = 1 }) => `people/?search=${searchQuery}&page=${page}`,
    }),
  }),
});

export const { useGetPeopleQuery } = swapiApi;
