import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
import { FaUserNurse } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
const PatientOutlet = () => {
  const {
    user: { user: patient },
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.auth);
  const [displayCount, setDisplayCount] = useState(10);
  console.log(patient);
  console.log("this is patient outlet");

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) toast.success(message);
  }, [isLoading, isError, isSuccess, message]);
  if (isLoading) return <Spinner />;
  return (
    <div className=" flex min-h-full flex-col gap-4 bg-bluee p-4 ">
      {patient && (
        <>
          <div className="flex flex-col gap-2 rounded-lg bg-white p-4 drop-shadow-2xl ">
            <h1 className="mb-2 text-2xl font-bold uppercase text-gray-800">
              {patient.name}
            </h1>
            <div className="ml-3 grid grid-rows-3 gap-4  text-gray-600 md:grid-flow-col ">
              <div className="flex items-center ">
                <span>
                  <BsFillCalendarFill className="mr-2 inline-block" />
                  DOB : {new Date(patient.DOB).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center  ">
                <span>
                  <BsPersonVcardFill className="mr-2 inline-block" />
                  Aadhaar Number : {patient.aadhaarNumber}
                </span>
              </div>
              <div className="flex items-center ">
                <span>
                  <BsFillEnvelopeFill className="mr-2 inline-block" />
                  Email Id : {patient.email || "N/A"}
                </span>
              </div>
              <div className="flex items-center ">
                <span>
                  <BsFillTelephoneFill className="mr-2 inline-block" />
                  Contact No. : {patient.contact || "N/A"}
                </span>
              </div>
              <div className="flex items-center ">
                <span>
                  <BsFillPersonFill className="mr-2 inline-block" />
                  Gender : {patient.gender || "N/A"}
                </span>
              </div>
              <div className="flex items-center ">
                <span>
                  <BsFillHeartFill className="mr-2 inline-block" />
                  Blood Group : {patient.bloodGroup || "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex  flex-col gap-4 rounded-lg bg-white p-4 px-4 py-2 drop-shadow-2xl">
            <h1 className="text-xl font-bold uppercase text-gray-900">
              Medical History
            </h1>
            {patient.history.length > 0 ? (
              patient.history.slice(0, displayCount).map((h) => (
                <div key={h._id} className="mt-3 flex flex-col justify-between">
                  {/* <div>
                    <p className="text-xl text-gray-600">
                      <BsFillPersonCheckFill className="mr-1 inline-block" />
                      Doctor consulted : {h.doctor?.name}
                    </p>
                    <p className="text-xl text-gray-600">
                      <FaUserNurse className="mr-1 inline-block" />
                      Hospital : {h.hospitalVisited?.name}
                    </p>
                  </div> */}
                  <div className="ml-2">
                    <p className="mb-1">
                      <span className="font-bold">Hospital Visited:</span>{" "}
                      {h?.hospitalVisited?.name}
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">Disease Diagnosed:</span>{" "}
                      {h?.diseaseDiagnosed}
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">Date of Diagnosis:</span>{" "}
                      {new Date(h?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">Treatment Received:</span>{" "}
                      {h?.treatment}
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">Reason for Visit:</span>{" "}
                      {h?.reasonForVisit}
                    </p>
                    <p className="mb-1">
                      <span className="font-bold">Doctor Name:</span>{" "}
                      {h?.doctor?.name}
                    </p>
                    <hr className="my-2" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No medical history found</p>
            )}
            {patient?.history?.length > displayCount && (
              <button
                onClick={() => setDisplayCount(displayCount + 10)}
                className="rounded-lg  bg-blue-500 p-2 text-white hover:bg-blue-700"
              >
                Show more
              </button>
            )}
            {displayCount > 10 && (
              <button
                onClick={() => setDisplayCount(0)}
                className="rounded-lg  bg-blue-500 p-2 text-white hover:bg-blue-700"
              >
                Hide Records
              </button>
            )}
          </div>
        </>
      )}
    </div>

    // <div
    //   key={patient._id}
    //   className="overflow-hidden rounded-lg bg-white shadow-lg"
    // >
    //   <div className="px-4 py-2">
    //     <h1 className="text-2xl font-bold uppercase text-gray-900">
    //       {patient.name}
    //     </h1>
    //
    //     <p className="mt-1 text-sm text-gray-600">
    //       <BsFillHouseFill className="mr-1 inline-block" />
    //       {patient.address}
    //     </p>

    //   </div>
    //   <div className="border-t border-gray-300 px-4 py-2">
    //     <h1 className="text-xl font-bold uppercase text-gray-900">
    //       Medical History
    //     </h1>
    //     {patient.history.length > 0 ? (
    //       patient.history.map((h) => (
    //         <div key={h._id} className="mt-3 flex items-center justify-between">
    //           <p className="text-sm text-gray-600">{h.disease}</p>
    //           <p className="text-sm text-gray-600">
    //             <BsFillPersonCheckFill className="mr-1 inline-block" />
    //             {h.doctorName.name}
    //           </p>
    //           <p className="text-sm text-gray-600">
    //             <FaUserNurse className="mr-1 inline-block" />
    //             {h.hospitalVisited.name}
    //           </p>
    //         </div>
    //       ))
    //     ) : (
    //       <p className="text-sm text-gray-600">No medical history found</p>
    //     )}
    //   </div>
    //   <div className="border-t border-gray-300 px-4 py-2">
    //     <Link
    //       to={`/patients/${patient._id}`}
    //       className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    //     >
    //       View Details
    //     </Link>
    //   </div>
    // </div>
  );
};

export default PatientOutlet;
