import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DoctorsTable from "../Components/DoctorsTable";
import { GiHospitalCross } from "react-icons/gi";
import { useGetDoctorsQuery } from "../features/Api/adminApi";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const DoctorsOutlet = () => {
  const { data, isSuccess, isLoading, isFetching, isError, error } =
    useGetDoctorsQuery();
  useEffect(() => {
    if (isError) {
      toast.error(error.status);
    }
  }, [isError]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex h-screen flex-col gap-6 overflow-auto p-4 text-white">
      <div className="flex flex-row items-center justify-between gap-6 ">
        <div className="text-center text-3xl font-bold text-black ">
          <p>All Doctors </p>
        </div>
        <Link
          to="../add-doctor"
          className="flex flex-row items-center justify-center gap-6 place-self-end rounded-lg bg-lightBluee p-4 duration-700 ease-in-out hover:shadow-2xl"
        >
          <GiHospitalCross className="text-3xl" />
          <div className="capitalize">Add a new Doctor</div>
        </Link>
      </div>
      <div>
        <DoctorsTable elements={data.data} />
      </div>
    </div>
  );
};

export default DoctorsOutlet;
