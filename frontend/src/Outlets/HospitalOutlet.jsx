import { useSelector } from "react-redux";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiCreditCard,
  FiClipboard,
  FiCalendar,
} from "react-icons/fi"; // inside your component's return
import { BsFillClipboardFill } from "react-icons/bs";
import {
  FaEnvelope,
  FaHospital,
  FaMapMarkedAlt,
  FaPhone,
} from "react-icons/fa";
import { Avatar } from "@mantine/core";
import { RiHospitalFill } from "react-icons/ri";
import { useGetAppointmentsByHospitalIdQuery } from "../features/Api/appointmentApi";

const HospitalOutlet = () => {
  console.log("this is hospital outlet");
  const {
    user: { user: user },
  } = useSelector((state) => state.auth);
  const { data: appointment } = useGetAppointmentsByHospitalIdQuery(user._id);
  const hospital = user;
  console.log(user);
  console.log(appointment);

  return (
    <div className="grid min-h-full grid-cols-3 gap-8 bg-white p-4 text-gray-600  ">
      <div className="drop-shadow-c col-span-3  grid gap-4 rounded-2xl  bg-white p-4 align-middle">
        <div className="flex items-center gap-2 text-2xl ">
          <RiHospitalFill className="" />
          <h1 className="font-semibold text-gray-600">Hospital Info</h1>
        </div>
        <div className="flex gap-4">
          {/* <img src={} alt="profile pic" /> */}
          <Avatar size="xl" color="blue" radius="xl">
            {hospital.name[0].toUpperCase()}
          </Avatar>
          <div className="grid grow grid-flow-col grid-rows-2 items-center gap-2 py-2 text-xl  ">
            <p>
              <FaHospital className="mr-2 inline-block" />
              <strong>Name:</strong> {hospital.name}
            </p>
            <p>
              <FaPhone className="mr-2 inline-block" />
              <strong>Contact:</strong> {hospital.contact}
            </p>
            <p>
              <FaEnvelope className="mr-2 inline-block" />
              <strong>Email:</strong> {hospital.email}
            </p>
            <p>
              <FaMapMarkedAlt className="mr-2 inline-block" />
              <strong>Address:</strong> {hospital.address.street},{" "}
              {hospital?.address.city}, {hospital?.address.state},
              {hospital?.address.pincode}
            </p>
            <div>
              <BsFillClipboardFill className="mr-2 inline-block" />{" "}
              <strong>Specialization</strong> :
              {hospital.specializations?.map((speciality, idx) => (
                <span key={speciality}>
                  {speciality}
                  {hospital.specializations.length !== idx + 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="drop-shadow-c col-span-3  grid gap-4 rounded-2xl  bg-white p-4 align-middle">
        <div className="p-4">
          <h2 className="mb-4 text-2xl font-semibold text-gray-600">
            Upcoming Appointments
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {appointment?.map((appointment) => (
              <div
                className="drop-shadow-c mb-4 rounded-2xl bg-white p-6  transition-all  hover:drop-shadow-2xl"
                key={appointment._id}
              >
                <div className="mb-2 flex items-center">
                  <FiCalendar className="mr-2" />
                  <p className="text-lg">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}{" "}
                    at {appointment.appointmentTime}
                  </p>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Patient:</span>{" "}
                  {appointment.patient.name}
                </div>
                <div>
                  <span className="font-semibold">Doctor:</span>{" "}
                  {appointment.doctor.name}
                </div>
              </div>
            ))}
          </div>
          {appointment?.length === 0 && (
            <div className="flex h-full w-full flex-col items-center justify-center py-12">
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

      {/* <div className="drop-shadow-c col-span-2 row-span-1  flex h-96 flex-col gap-2 rounded-2xl bg-white p-4 ">
        <AreaChart
          hospital={{
            hospital: allPatients,
            tag: "Patients",
            color: "rgba(75, 192, 192, 0.5)",
          }}
        />
      </div> */}
      {/* <div className="drop-shadow-c col-span-1 row-span-1 flex h-96 flex-col gap-2 overflow-y-auto  rounded-2xl bg-white p-4 "> */}
      {/* <div className="flex gap-2 ">
        <FaWheelchair className="text-xl" />
        <h1>Recently Added Patients </h1>
      </div>
      <SideTable elements={lastTenPatients?.result} /> */}
      {/* <SideTable elements={[]} /> */}
      {/* </div> */}
    </div>
  );
};

export default HospitalOutlet;
