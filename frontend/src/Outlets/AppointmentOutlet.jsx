import React, { useState, useEffect } from "react";

import { Button, Select, LoadingOverlay } from "@mantine/core";
import { DateInput, DatePicker } from "@mantine/dates";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useAddAppointmentMutation,
  useGetAppointmentsByDoctorIdWithTimeSlotQuery,
  useLazyGetAppointmentsByDoctorIdWithTimeSlotQuery,
} from "../features/Api/appointmentApi";
import { useGetHospitalsQuery } from "../features/Api/adminApi";
import { useForm } from "@mantine/form";
import { timeSlots } from "../constants/index";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { FaHospitalAlt, FaUserMd } from "react-icons/fa";

const AppointmentOutlet = () => {
  const {
    user: { user: patient },
  } = useSelector((state) => state.auth);
  //   const [appointmentDate, setAppointmentDate] = useState(new Date());
  //   const [appointmentTime, setAppointmentTime] = useState(timeSlots[0]); // Default to first time slot
  const { data, isFetching: isFetchingHospitals } = useGetHospitalsQuery();
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

  const [
    getAppointmentsByDoctorIdWithTimeSlot,
    { data: appointments, isFetching: isFetchingAppointments },
  ] = useLazyGetAppointmentsByDoctorIdWithTimeSlotQuery();
  console.log(form.values);
  useEffect(() => {
    if (form.values.date !== "")
      getAppointmentsByDoctorIdWithTimeSlot({
        doctorId: form.values.doctor,
        appointmentDate: form.values.date?.toISOString(),
      });
  }, [form.values.date, form.values.doctor, form.values.hospital]);

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
        className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 text-xl drop-shadow-xl "
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
          {...(form.values.hospital === "" ||
          form.values.date === "" ||
          form.values.doctor === ""
            ? { disabled: true }
            : {})}
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
  );
};

export default AppointmentOutlet;
