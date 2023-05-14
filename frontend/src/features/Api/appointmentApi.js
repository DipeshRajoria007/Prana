import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/appointment",
  }),
  endpoints: (builder) => ({
    getAppointmentsByDoctorId: builder.query({
      query: (doctorId, appointmentDate) =>
        `/appointments?doctor=${doctorId}&date=${appointmentDate}`,
    }),
    getAppointmentsByPatientId: builder.query({
      query: (patientId, appointmentDate) =>
        `/appointments?patient=${patientId}`,
    }),
    addAppointment: builder.mutation({
      query: (appointment) => ({
        url: "/",
        method: "POST",
        body: appointment,
      }),
    }),
  }),
});

export const { useAddAppointmentMutation, useGetAppointmentsByDoctorIdQuery } =
  appointmentApi;
