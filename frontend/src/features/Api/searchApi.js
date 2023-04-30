import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  endpoints: (builder) => ({
    searchPatient: builder.query({
      query: (params) => {
        return `/searchpatient?q=${params}`;
      },
    }),
  }),
});

export const { useLazySearchPatientQuery } = searchApi;
