import { useState, useEffect } from "react";
//Mantine Imports
import { useForm } from "@mantine/form";
import { Select, NumberInput, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
//RTK Query Imports
import { useSelector } from "react-redux";
import { useAddPatientMutation } from "../features/Api/doctorApi";
//React-icons Imports
import { FaTransgenderAlt, FaUser } from "react-icons/fa";
import { MdAttachEmail, MdCall, MdBloodtype } from "react-icons/md";
import { BsFillCalendarWeekFill, BsFillHouseFill } from "react-icons/bs";
import { AiFillIdcard } from "react-icons/ai";
// miscellaneous Imports
import { toast } from "react-toastify";
import { bloodGroupArr, GenderArr } from "../constants/index";
const AddPatient = () => {
  const {
    user: { user },
  } = useSelector((state) => state.auth);
  const [addPatient, { status, error, success, data }] =
    useAddPatientMutation();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      contact: "",
      DOB: "",
      gender: "",
      aadhaarNumber: "",
      bloodGroup: "",
      address: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      contact: (value) =>
        value < 1000000000 ? "Name must have at least 10 Number" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      gender: (value) => (value === "" ? "Select a gender" : null),
      bloodGroup: (value) =>
        value === "" ? "Select a valid blood group" : null,
      aadhaarNumber: (value) =>
        value.length !== 12 ? `you only entered ${value.length} digits` : null,
      DOB: (value) => {
        if (!value) {
          return "Please select a date.";
        }
        const today = new Date();
        if (today > value) return null;
        return "Please enter a valid date.";
      },
      address: (value) =>
        value === "" ? "Please enter a valid address" : null,
    },
  });

  useEffect(() => {
    if (status === "rejected") toast.error(error.error);
    if (status === "fulfilled") toast.success(data.message);
  }, [status]);

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      role: "PATIENT",
      doctor: user._id,
    };
    console.log(payload);
    addPatient(payload);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-bluee p-4 ">
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        className="flex w-80 flex-col gap-3 rounded-lg bg-white p-4 shadow-2xl "
      >
        <p>Fill the form with correct Information</p>
        <TextInput
          label="Patient's Name"
          variant="filled"
          {...form.getInputProps("name")}
          icon={<FaUser />}
          placeholder="Name"
        />
        <NumberInput
          label="Contact No."
          hideControls
          {...form.getInputProps("contact")}
          icon={<MdCall />}
          variant="filled"
          placeholder="Contact info"
        />
        <TextInput
          label="Email Id"
          {...form.getInputProps("email")}
          icon={<MdAttachEmail />}
          variant="filled"
          placeholder="email Id"
        />
        <Select
          icon={<FaTransgenderAlt />}
          label="Gender"
          placeholder="Male , Female or Other"
          variant="filled"
          withAsterisk
          {...form.getInputProps("gender")}
          data={GenderArr}
        />
        <DateInput
          valueFormat="YYYY MMM DD"
          variant="filled"
          {...form.getInputProps("DOB")}
          label="Date of Birth"
          placeholder="eg. 14 sept 2000"
          icon={<BsFillCalendarWeekFill />}
        />

        <Select
          label="Select Blood Group"
          placeholder="eg. B+"
          searchable
          nothingFound="No options"
          variant="filled"
          maxDropdownHeight={280}
          withAsterisk
          {...form.getInputProps("bloodGroup")}
          data={bloodGroupArr}
          icon={<MdBloodtype />}
        />

        <TextInput
          withAsterisk
          label="Patient's Aadhaar Number"
          icon={<AiFillIdcard />}
          variant="filled"
          {...form.getInputProps("aadhaarNumber")}
          placeholder="Enter your address"
        />
        <TextInput
          label="Patient's Address"
          icon={<BsFillHouseFill />}
          variant="filled"
          placeholder="Enter patient's address"
          {...form.getInputProps("address")}
        />
        <button className="rounded-sm bg-purplee p-2 text-white">
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
