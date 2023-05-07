import {
  BsFillPersonFill,
  BsFillTelephoneFill,
  BsFillEnvelopeFill,
  BsFillCalendarFill,
  BsFillHouseFill,
  BsPersonVcardFill,
  BsFillPersonCheckFill,
  BsFillHeartFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { TextInput, Textarea } from "@mantine/core";
import { RiUserAddFill } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { FaNotesMedical } from "react-icons/fa";
import { IoIosMedkit } from "react-icons/io";
import { useSelector } from "react-redux";
import { useAddPatientNewRecordMutation } from "../features/Api/doctorApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import MedicalHistory from "./MedicalHistory";
import { GiTestTubes } from "react-icons/gi";

function PatientCard({ patient }) {
  const [displayCount, setDisplayCount] = useState(10);
  const [show, setShow] = useState(false);

  const {
    user: { user },
  } = useSelector((state) => state.auth);
  const [
    addPatientNewRecord,
    { data, success, error, isError, isSuccess, isLoading, isFetching },
  ] = useAddPatientNewRecordMutation();
  const form = useForm({
    initialValues: {
      symptoms: "",
      diagnosis: "",
      medicinePrescription: "",
      tests: "",
    },
    validationRules: {
      symptoms: (value) => value.trim().length > 0,
      disease: (value) => value.trim().length > 0,
      medicinePrescription: (value) => value.trim().length > 0,
    },
  });
  useEffect(() => {
    if (isError) toast.error(error.data.message);
    if (isSuccess) toast.success(data.message);
  }, [isError, isSuccess]);
  const handleSubmit = (values) => {
    console.log(patient._id);
    if (form.isValid()) {
      addPatientNewRecord({
        payload: {
          ...values,
          doctor: user._id,
          hospitalVisited: user.hospital,
        },
        id: patient._id,
      });
      form.reset();
    }
  };
  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden overflow-y-auto rounded-lg bg-white p-4 shadow-lg ">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 drop-shadow-2xl ">
        <h1 className=" text-2xl font-bold uppercase text-gray-800">
          {patient?.name}
        </h1>
        <div className="ml-3 grid grid-rows-3 gap-4  text-gray-600 md:grid-flow-col ">
          <div className="flex items-center ">
            <span>
              <BsFillCalendarFill className="mr-2 inline-block" />
              DOB : {new Date(patient?.DOB).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center  ">
            <span>
              <BsPersonVcardFill className="mr-2 inline-block" />
              Aadhaar Number : {patient?.aadhaarNumber}
            </span>
          </div>
          <div className="flex items-center ">
            <span>
              <BsFillEnvelopeFill className="mr-2 inline-block" />
              Email Id : {patient?.email || "N/A"}
            </span>
          </div>
          <div className="flex items-center ">
            <span>
              <BsFillTelephoneFill className="mr-2 inline-block" />
              Contact No. : {patient?.contact || "N/A"}
            </span>
          </div>
          <div className="flex items-center ">
            <span>
              <BsFillPersonFill className="mr-2 inline-block" />
              Gender : {patient?.gender || "N/A"}
            </span>
          </div>
          <div className="flex items-center ">
            <span>
              <BsFillHeartFill className="mr-2 inline-block" />
              Blood Group : {patient?.bloodGroup || "N/A"}
            </span>
          </div>
        </div>
        <button
          className="w-48 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? "Hide Medical History" : "Show Medical History"}
        </button>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-white p-4 drop-shadow-2xl">
        <h1 className=" text-2xl font-bold uppercase text-gray-800">
          Add prescription
        </h1>
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="flex flex-col gap-4"
        >
          <Textarea
            autosize
            withAsterisk
            required
            label="Symptoms"
            icon={<BiMessageDetail />}
            variant="filled"
            {...form.getInputProps("symptoms")}
            placeholder="what problem patient is facing ?  "
            error={form.errors.symptoms}
          />
          <Textarea
            withAsterisk
            required
            autosize
            label="Disease diagnosed"
            icon={<FaNotesMedical />}
            variant="filled"
            {...form.getInputProps("diagnosis")}
            placeholder="patient diagnosed with ?"
            error={form.errors.diagnosis}
          />
          <Textarea
            autosize
            withAsterisk
            required
            label="medicinePrescription"
            icon={<IoIosMedkit />}
            variant="filled"
            {...form.getInputProps("medicinePrescription")}
            placeholder=" medicine Prescription"
            error={form.errors.medicinePrescription}
          />
          <Textarea
            autosize
            label="Tests"
            placeholder="Test If required"
            variant="filled"
            icon={<GiTestTubes />}
            {...form.getInputProps("tests")}
          />

          <button
            className="w-28 rounded-lg  bg-blue-500 p-2 text-white hover:bg-blue-700"
            type="submit"
          >
            Prescribe
          </button>
        </form>
      </div>
      {show && (
        <MedicalHistory patient={patient} />
        // <div className="flex flex-col gap-4 rounded-lg bg-white p-4 drop-shadow-2xl ">
        //   <h1 className=" text-2xl font-bold uppercase text-gray-800">
        //     Medical History
        //   </h1>
        //   {patient?.history?.slice(0, displayCount).map((record) => (
        //     <div key={record?._id} className="ml-2">
        //       <p className="mb-1">
        //         <span className="font-bold">Hospital Visited:</span>{" "}
        //         {record?.hospitalVisited?.name}
        //       </p>
        //       <p className="mb-1">
        //         <span className="font-bold">Disease Diagnosed:</span>{" "}
        //         {record?.diagnosis}
        //       </p>
        //       <p className="mb-1">
        //         <span className="font-bold">Date of Diagnosis:</span>{" "}
        //         {new Date(record?.createdAt).toLocaleDateString()}
        //       </p>
        //       <p className="mb-1">
        //         <span className="font-bold">medicinePrescription Received:</span>{" "}
        //         {record?.medicinePrescription}
        //       </p>
        //       <p className="mb-1">
        //         <span className="font-bold">Reason for Visit:</span>{" "}
        //         {record?.symptoms}
        //       </p>
        //       <p className="mb-1">
        //         <span className="font-bold">Doctor Name:</span>{" "}
        //         {record?.doctor?.name}
        //       </p>
        //       <hr className="my-2" />
        //     </div>
        //   ))}
        //   {patient?.history?.length > displayCount && (
        //     <button
        //       onClick={() => setDisplayCount(displayCount + 10)}
        //       className="rounded-lg  bg-blue-500 p-2 text-white hover:bg-blue-700"
        //     >
        //       Show more
        //     </button>
        //   )}
        //   {displayCount > 10 && (
        //     <button
        //       onClick={() => setDisplayCount(0)}
        //       className="rounded-lg  bg-blue-500 p-2 text-white hover:bg-blue-700"
        //     >
        //       Hide Records
        //     </button>
        //   )}
        // </div>
      )}
    </div>
  );
}

export default PatientCard;
