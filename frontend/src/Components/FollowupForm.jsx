import { Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import {
  useAddFollowUpMutation,
  useGetPatientByIdQuery,
} from "../features/Api/doctorApi";
import { RiUserAddFill } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { FaNotesMedical } from "react-icons/fa";
import { IoIosMedkit } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GiTestTubes } from "react-icons/gi";

const FollowupForm = ({ history, patient }) => {
  const {
    user: { user },
  } = useSelector((state) => state.auth);
  console.log(history);
  const { refetch } = useGetPatientByIdQuery(patient?._id);

  const [
    addFollowUp,
    { data, success, error, isError, isSuccess, isLoading, isFetching },
  ] = useAddFollowUpMutation();
  const form = useForm({
    initialValues: {
      patientsUpdate: "",
      diagnosis: "",
      medicinePrescription: "",
      tests: "",
    },
    validationRules: {
      patientsUpdate: (value) => value.trim().length > 0,
      disease: (value) => value.trim().length > 0,
      medicinePrescription: (value) => value.trim().length > 0,
    },
  });
  useEffect(() => {
    if (isError) toast.error(error.data.message);
    if (isSuccess) {
      toast.success(data.message);
      refetch();
    }
  }, [isError, isSuccess]);
  const handleSubmit = (values) => {
    console.log(patient._id);
    if (form.isValid()) {
      addFollowUp({
        payload: {
          ...values,
          doctor: user._id,
          hospitalVisited: user.hospital,
        },
        patientId: patient._id,
        id: history.historyId,
      });
      form.reset();
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2 rounded-lg bg-white p-4 drop-shadow-2xl">
        <h1 className=" text-2xl font-bold uppercase text-gray-800">
          Add Follow up
        </h1>
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="flex flex-col gap-4"
        >
          <Textarea
            autosize
            withAsterisk
            required
            label="patients Update"
            icon={<BiMessageDetail />}
            variant="filled"
            {...form.getInputProps("patientsUpdate")}
            placeholder="what problem patient is facing ?  "
            error={form.errors.patientsUpdate}
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
            label="Prescribe Medicine "
            icon={<IoIosMedkit />}
            variant="filled"
            {...form.getInputProps("medicinePrescription")}
            placeholder="prescribe medicinePrescription to patient"
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
    </div>
  );
};

export default FollowupForm;
