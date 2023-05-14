import React, { useState, useEffect } from "react";

import { Button, Select, LoadingOverlay } from "@mantine/core";
import { DateInput, DatePicker } from "@mantine/dates";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useAddAppointmentMutation,
  useGetAppointmentsByDoctorIdQuery,
} from "../features/Api/appointmentApi";
import { useGetHospitalsQuery } from "../features/Api/adminApi";
import { useForm } from "@mantine/form";
import { timeSlots } from "../constants/index";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { FaHospitalAlt, FaUserMd } from "react-icons/fa";
// Function to generate time slots
// const generateTimeSlots = () => {
//   const slots = [];
//   for (let i = 0; i < 24; i++) {
//     for (let j = 0; j < 60; j += 30) {
//       const hours = i < 10 ? `0${i}` : i;
//       const minutes = j < 10 ? `0${j}` : j;
//       slots.push(`${hours}:${minutes}`);
//     }
//   }
//   return slots;
// };

// const timeSlots = generateTimeSlots(); // Generate time slots

const AppointmentOutlet = () => {
  const {
    user: { user: patient },
  } = useSelector((state) => state.auth);
  //   const [appointmentDate, setAppointmentDate] = useState(new Date());
  //   const [appointmentTime, setAppointmentTime] = useState(timeSlots[0]); // Default to first time slot
  //   const [hospital, setHospital] = useState("");
  //   const [doctor, setDoctor] = useState("");
  //   const [addAppointment, { isLoading }] = useAddAppointmentMutation();
  const { data, isFetching: isFetchingHospitals } = useGetHospitalsQuery();
  console.log(data);
  const hospitals = data?.data || [];

  const form = useForm({
    initialValues: {
      hospital: "",
      doctor: "",
      date: "",
      time: "",
    },

    validationRules: {
      hospital: (value) => value !== "",
      doctor: (value) => value !== "",
      date: (value) => value !== "",
      time: (value) => value !== "",
    },
  });

  const { data: appointments, isFetching: isFetchingAppointments } =
    useGetAppointmentsByDoctorIdQuery({ doctor: form.values.doctor });
  const [addAppointment, { isLoading }] = useAddAppointmentMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addAppointment({
        patient: patient._id,
        doctor: form.values.doctor,
        hospital: form.values.hospital,
        appointmentDate: form.values.date,
        appointmentTime: form.values.time,
      }).unwrap();
      toast.success("Appointment booked successfully!");
      form.reset();
    } catch (error) {
      toast.error(`Failed to book appointment: ${error.message}`);
    }
  };

  //   const doctors = hospital?.doctors;
  const bookedTimeSlots = appointments?.map((app) => app.appointmentTime);

  if (isFetchingHospitals || isFetchingAppointments) {
    return <LoadingOverlay visible />;
  }

  return (
    <div className="flex  bg-white p-4 ">
      <form
        onSubmit={handleSubmit}
        className="flex w-[80%] flex-col gap-4 rounded-lg bg-white p-4 text-xl drop-shadow-xl "
      >
        <h1 className="text-2xl font-bold text-gray-800 ">Book Appointment</h1>
        <Select
          size="lg"
          variant="filled"
          label="Hospitals"
          searchable
          placeholder="Select Hospital"
          nothingFound="No Hospital Found"
          data={hospitals.map((hosp) => ({
            label: hosp.name,
            value: hosp._id,
          }))}
          required
          {...form.getInputProps("hospital")}
          error={form.errors.hospital}
          icon={<FaHospitalAlt />}
        />
        <Select
          size="lg"
          label="Doctor"
          searchable
          nothingFound="No Doctor Found"
          icon={<FaUserMd />}
          data={
            form.values.hospital !== ""
              ? hospitals
                  .filter((hosp) => hosp._id === form.values.hospital)[0]
                  .doctors?.map((doc) => ({
                    label: doc.name,
                    value: doc._id,
                  }))
              : []
          }
          required
          variant="filled"
          {...(form.values.hospital === "" ? { disabled: true } : {})}
          {...(form.values.hospital === ""
            ? { placeholder: "first select hospital" }
            : { placeholder: "Select doctor" })}
          {...form.getInputProps("doctor")}
          error={form.errors.doctor}
        />
        <DateInput
          size="lg"
          valueFormat="DD MMM YYYY"
          variant="filled"
          minDate={new Date()}
          {...form.getInputProps("date")}
          label="Date for appointment"
          placeholder="eg. 14 sept 2000"
          icon={<BsFillCalendarWeekFill />}
          required
          error={form.errors.date}
        />
        <Select
          size="lg"
          variant="filled"
          label="Select Time for Appointment"
          data={timeSlots.map((slot) => ({
            label: slot,
            value: slot,
            disabled: bookedTimeSlots?.includes(slot),
          }))}
          {...form.getInputProps("time")}
          required
          error={form.errors.time}
          placeholder="Select a time slot"
          icon={<AiFillClockCircle />}
        />

        <button
          className=" col-span-2 w-full rounded-md bg-purplee p-3 text-white md:w-auto"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
    // <form onSubmit={handleSubmit}>
    //   <Select
    //     label="Hospital"
    //     data={hospitals.map((hosp) => ({ label: hosp.name, value: hosp._id }))}
    //     value={hospital}
    //     onChange={setHospital}
    //     required
    //   />
    //   <Select
    //     label="Doctor"
    //     data={hospital?.doctors.map((doc) => ({
    //       label: doc.name,
    //       value: doc._id,
    //     }))}
    //     value={doctor}
    //     onChange={setDoctor}
    //     required
    //   />
    //   <DatePicker
    //     label="Appointment Date"
    //     value={appointmentDate}
    //     onChange={setAppointmentDate}
    //     required
    //   />
    //   <Select
    //     label="Appointment Time"
    //     data={timeSlots.map((slot) => ({
    //       label: slot,
    //       value: slot,
    //       disabled: bookedTimeSlots.includes(slot),
    //     }))}
    //     value={appointmentTime}
    //     onChange={setAppointmentTime}
    //     required
    //   />
    //   <Button type="submit" disabled={isLoading}>
    //     {isLoading ? "Booking..." : "Book Appointment"}
    //   </Button>
    // </form>
  );
};

export default AppointmentOutlet;
