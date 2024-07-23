import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { People, Person } from './types';

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<People, { searchQuery: string; page: number }>({
      query: ({ searchQuery, page }) => `people/?search=${searchQuery}&page=${page}`,
    }),
    getPerson: builder.query<Person, { url: string }>({
      query: ({ url }) => url,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = swapiApi;
