import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin",
  }),
  endpoints: (builder) => ({
    getDoctorCount: builder.query({
      query: () => "/getdoctorcount",
    }),
    addDoctor: builder.mutation({
      query: (payload) => ({
        url: "/adddoctor",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    addHospital: builder.mutation({
      query: (payload) => ({
        url: "/addhospital",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    getPatientCount: builder.query({
      query: () => "/getpatientcount",
    }),
    getHospitalCount: builder.query({
      query: () => "/gethospitalcount",
    }),
    getHospitals: builder.query({
      query: () => "/getallhospitals",
    }),
    getDoctors: builder.query({
      query: () => "/getalldoctors",
    }),
    getPatients: builder.query({
      query: () => "/getallpatients",
    }),
    getLastTenDoctors: builder.query({
      query: () => "/getlasttenDoctors",
    }),
    getLastTenPatients: builder.query({
      query: () => "/getlasttenpatients",
    }),
    getMonthWisePatientsCount: builder.query({
      query: () => "/getmonthwisepatients",
    }),
    getMonthWiseDoctorsCount: builder.query({
      query: () => "/getmonthwisedoctors",
    }),
    updateUserPassword: builder.mutation({
      query: (payload) => ({
        url: `/resetpassword`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetDoctorCountQuery,
  useGetPatientCountQuery,
  useGetHospitalCountQuery,
  useAddDoctorMutation,
  useAddHospitalMutation,
  useGetHospitalsQuery,
  useGetDoctorsQuery,
  useGetPatientsQuery,
  useGetLastTenDoctorsQuery,
  useGetLastTenPatientsQuery,
  useGetMonthWiseDoctorsCountQuery,
  useGetMonthWisePatientsCountQuery,
  useUpdateUserPasswordMutation,
} = adminApi;
