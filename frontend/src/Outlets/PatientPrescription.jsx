import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PatientCard from "../Components/PatientCard";
import { useGetPatientByIdQuery } from "../features/Api/doctorApi";
const PatientPrescription = () => {
  const { id } = useParams();
  const {
    data: patient,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    success,
  } = useGetPatientByIdQuery(id);
  console.log(patient);
  return <PatientCard patient={patient} />;
};

export default PatientPrescription;
