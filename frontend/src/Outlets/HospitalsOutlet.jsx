import { useEffect } from "react";
import { Link } from "react-router-dom";
import HospitalsTable from "../Components/HospitalsTable";
import { GiHospitalCross, GiToaster } from "react-icons/gi";
import { useGetHospitalsQuery } from "../features/Api/adminApi";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const HospitalsOutlet = () => {
  const { data, isSuccess, isLoading, isFetching, isError, error } =
    useGetHospitalsQuery();
  console.log(data);
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
          <p>All Hospital </p>
        </div>
        <Link
          to="../add-hospital"
          className="flex flex-row items-center justify-center gap-6 place-self-end rounded-lg bg-lightBluee p-4 duration-700 ease-in-out hover:shadow-2xl"
        >
          <GiHospitalCross className="text-3xl" />
          <div className="capitalize">Add a new Hospital</div>
        </Link>
      </div>
      <div>
        <HospitalsTable elements={data.data} />
      </div>
    </div>
  );
};

export default HospitalsOutlet;
