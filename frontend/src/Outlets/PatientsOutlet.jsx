import { useEffect } from "react";
import { Link } from "react-router-dom";
import PatientsTable from "../Components/PatientsTable";
import { GiHospitalCross } from "react-icons/gi";
import { useGetPatientsQuery } from "../features/Api/adminApi";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";

const PatientsOutlet = () => {
  const { data, isSuccess, isLoading, isFetching, isError, error } =
    useGetPatientsQuery();
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
          <p>All Patients </p>
        </div>
      </div>
      <div>
        <PatientsTable elements={data} />
      </div>
    </div>
  );
};

export default PatientsOutlet;
