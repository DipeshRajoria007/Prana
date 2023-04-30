import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/hospital",
  }),
  endpoints: (builder) => ({
    getDoctorsByHospitalId: builder.query({
      query: () => `/getdoctorsbyhospitalid/${id}`,
    }),
  }),
});

export const { useGetDoctorsByHospitalIdQuery } = doctorApi;
