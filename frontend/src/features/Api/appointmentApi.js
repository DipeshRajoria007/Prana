import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/appointment",
  }),
  endpoints: (builder) => ({
    getAppointmentsByDoctorIdWithTimeSlot: builder.query({
      query: ({ doctorId, appointmentDate }) => {
        return `/appointments/${doctorId}/${appointmentDate}`;
      },
    }),
    getAppointmentsByPatientId: builder.query({
      query: (patientId) => ({
        url: `/appointmentsOfPatient/${patientId}`,
      }),
    }),
    getAppointmentsByDoctorId: builder.query({
      query: (doctorId) => ({
        url: `/appointmentsOfDoctor/${doctorId}`,
      }),
    }),
    getAppointmentsByHospitalId: builder.query({
      query: (hospitalId) => `/appointmentsOfHospital/${hospitalId}`,
    }),
    addAppointment: builder.mutation({
      query: (appointment) => ({
        url: "/",
        method: "POST",
        body: appointment,
      }),
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddAppointmentMutation,
  useGetAppointmentsByDoctorIdWithTimeSlotQuery,
  useLazyGetAppointmentsByDoctorIdWithTimeSlotQuery,
  useGetAppointmentsByPatientIdQuery,
  useGetAppointmentsByHospitalIdQuery,
  useGetAppointmentsByDoctorIdQuery,
  useDeleteAppointmentMutation,
} = appointmentApi;
