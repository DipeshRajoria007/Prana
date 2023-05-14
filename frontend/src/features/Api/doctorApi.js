import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/doctor",
  }),
  endpoints: (builder) => ({
    addPatient: builder.mutation({
      query: (payload) => ({
        url: "/addpatient",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    addPatientNewRecord: builder.mutation({
      query: ({ payload, id }) => {
        console.log(id, payload);
        return {
          url: `/patient/${id}`,
          method: "PUT",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
    addFollowUp: builder.mutation({
      query: ({ payload, id, patientId }) => {
        console.log(patientId, id, payload);
        return {
          url: `/${patientId}/${id}/followup`,
          method: "PUT",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
    getPatientById: builder.query({
      query: (id) => ({
        url: `patient/${id}`,
      }),
    }),
    getLastTenPatientsByDoctorId: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `${id}/recentpatients`,
        };
      },
    }),
    getAllPatientsMonthWiseAddedByParticularDoctor: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `${id}/patients`,
        };
      },
    }),
  }),
});

export const {
  useAddPatientMutation,
  useGetPatientByIdQuery,
  useAddPatientNewRecordMutation,
  useAddFollowUpMutation,
  useGetAllPatientsMonthWiseAddedByParticularDoctorQuery,
  useGetLastTenPatientsByDoctorIdQuery,
} = doctorApi;
