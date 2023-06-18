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

import { FiCalendar, FiTrash2 } from "react-icons/fi";
import { FaUserNurse } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import MedicalHistory from "../Components/MedicalHistory";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentsByPatientIdQuery,
} from "../features/Api/appointmentApi";
import { Modal } from "@mantine/core";
const PatientOutlet = () => {
  const {
    user: { user: patient },
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.auth);
  //usestate
  const [displayCount, setDisplayCount] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);

  // RTK queries
  const {
    data: appointments,
    isLoading: isLoadingAppointment,
    refetch,
  } = useGetAppointmentsByPatientIdQuery(patient._id);
  const [
    deleteAppointment,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
    },
  ] = useDeleteAppointmentMutation();

  // useEffect for toasts
  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) toast.success(message);
  }, [isLoading, isError, isSuccess, message]);
  useEffect(() => {
    if (isErrorDelete) toast.error(errorDelete.data.message);
    if (isSuccessDelete) {
      refetch();
      toast.success(dataDelete.message);
    }
  }, [isErrorDelete, isSuccessDelete]);

  const openModal = (appointmentId) => {
    setCurrentAppointmentId(appointmentId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentAppointmentId(null);
    setModalOpen(false);
  };

  const deleteAppointmentHandler = () => {
    // delete appointment logic here
    console.log("Deleting appointment:", currentAppointmentId);
    deleteAppointment(currentAppointmentId);
    closeModal();
  };
  const currentDate = new Date();
  const pastAppointments = appointments?.filter(
    (app) => new Date(app.appointmentDate) <= currentDate
  );
  const upcomingAppointments = appointments?.filter(
    (app) => new Date(app.appointmentDate) >= currentDate
  );

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
          <div className="grid gap-4 md:h-96 md:grid-cols-2 ">
            <div className="flex flex-col gap-2  overflow-y-auto rounded-lg bg-white p-4 drop-shadow-2xl ">
              <h2 className="mb-4 text-2xl font-semibold text-gray-700">
                Upcoming Appointments
              </h2>
              <>
                {upcomingAppointments?.map((appointment) => (
                  <div
                    className=" mb-4 flex justify-between rounded-lg border bg-white p-4 shadow-lg"
                    key={appointment._id}
                  >
                    <div>
                      <div className="mb-2 flex items-center text-lg text-gray-700">
                        <FiCalendar className="mr-2 text-gray-500" />
                        <p>
                          {new Date(
                            appointment.appointmentDate
                          ).toLocaleDateString()}{" "}
                          at {appointment.appointmentTime}
                        </p>
                      </div>
                      <div className="mb-2 text-gray-600">
                        <span className="font-semibold text-gray-800">
                          Doctor:
                        </span>{" "}
                        {appointment.doctor.name}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-semibold text-gray-800">
                          Hospital:
                        </span>{" "}
                        {appointment.hospital.name}
                      </div>
                    </div>
                    <button
                      className="rounded-md bg-red-500 p-4 text-white"
                      onClick={() => openModal(appointment._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
                <Modal
                  opened={modalOpen}
                  onClose={closeModal}
                  title="Delete appointment"
                  closeButtonLabel="Close"
                  hideCloseButton
                  size="lg"
                >
                  <p>Are you sure you want to delete this appointment?</p>
                  <div className="my-2 flex w-full gap-6">
                    <button
                      className="rounded-md bg-red-500 px-4 py-2 text-white"
                      onClick={deleteAppointmentHandler}
                    >
                      Delete
                    </button>
                    <button
                      className="rounded-md bg-blue-500 px-4 py-2 text-white"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>
              </>
              {upcomingAppointments?.length === 0 && (
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
                    Empty Record
                  </p>
                  <p className="text-sm text-gray-400">
                    There is no data to display at the moment
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col  gap-2 overflow-y-auto rounded-lg bg-white p-4 drop-shadow-2xl ">
              <h2 className="mb-4 text-2xl font-semibold text-gray-700">
                Past Appointments
              </h2>
              {pastAppointments?.map((appointment) => (
                <div
                  className="mb-4 rounded-lg border bg-white p-4 shadow-lg"
                  key={appointment._id}
                >
                  <div className="mb-2 flex items-center text-lg text-gray-700">
                    <FiCalendar className="mr-2 text-gray-500" />
                    <p>
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}{" "}
                      at {appointment.appointmentTime}
                    </p>
                  </div>
                  <div className="mb-2 text-gray-600">
                    <span className="font-semibold text-gray-800">Doctor:</span>{" "}
                    {appointment.doctor.name}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Hospital:
                    </span>{" "}
                    {appointment.hospital.name}
                  </div>
                </div>
              ))}
              {pastAppointments?.length === 0 && (
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
                    Empty Record
                  </p>
                  <p className="text-sm text-gray-400">
                    There is no data to display at the moment
                  </p>
                </div>
              )}
            </div>
          </div>
          <MedicalHistory patient={patient} />
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
