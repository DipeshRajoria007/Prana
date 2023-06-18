import { Input } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import PatientsTable from "../components/PatientsTable";
import SmallSpinner from "../components/smallSpinner";
import Spinner from "../components/Spinner";
import { useLazySearchPatientQuery } from "../features/Api/searchApi";
import { FaUserPlus } from "react-icons/fa";
import { useGetPatientsQuery } from "../features/Api/adminApi";
import { NavLink } from "react-router-dom";

const PatientOutletForDoctor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPatient, { isLoading, isFetching, isError, error, data }] =
    useLazySearchPatientQuery();
  const {
    data: allData,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
    isFetching: isFetchingAll,
  } = useGetPatientsQuery();
  const [timeoutId, setTimeoutId] = useState(null);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(setTimeout(() => searchPatient(value), 500));
  };
  if (isFetchingAll) return <Spinner />;

  return (
    <div className="flex h-full w-full flex-col gap-2 p-4">
      <div className="flex gap-2">
        <Input
          className="grow"
          icon={<MdPersonSearch />}
          variant="filled"
          placeholder="search patient"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          size="md"
          radius="md"
        />
        <NavLink
          to="create-patient"
          className="flex items-center rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <FaUserPlus className="mr-2" />
          Add New Patient
        </NavLink>
      </div>
      <div className=" flex w-full justify-center ">
        {allData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 14H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v2"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5h5M16 17h2a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h2"
              />
            </svg>
            <p className="mb-4 text-lg font-medium text-gray-500">
              No Patient Is In Our Record
            </p>
            <p className="text-sm text-gray-400">
              There is no data to display at the moment
            </p>
          </div>
        )}
        {isFetching && <SmallSpinner />}
        {!isFetching && searchTerm === "" && allData?.length > 0 && (
          <PatientsTable elements={allData} />
        )}
        {!isFetching && searchTerm !== "" && data?.length > 0 && (
          <PatientsTable elements={data} />
        )}
        {error && <div>{error}</div>}
      </div>
      {!isFetching && data?.length === 0 && (
        <div className=" flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-lg">
            <h2 className="mb-4 text-3xl font-bold">No patient found</h2>
            <p className="mb-6 text-lg">Try refining your search criteria</p>
            <NavLink
              to="create-patient"
              className="flex items-center rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <FaUserPlus className="mr-2" />
              Add New Patient
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientOutletForDoctor;
