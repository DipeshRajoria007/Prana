import { FaUserMd, FaWheelchair } from "react-icons/fa";
import { FiCalendar, FiUser } from "react-icons/fi";
import { RiUserHeartLine, RiUserAddLine, RiHospitalFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import AreaChart from "../Components/AreaChart";
import DoctorsTable from "../Components/DoctorsTable";

import PatientsTable from "../Components/PatientsTable";
import PieChart from "../Components/PieChart";
import SideTable from "../Components/SideTable";
import { useGetAppointmentsByDoctorIdQuery } from "../features/Api/appointmentApi";
import {
  useGetAllPatientsMonthWiseAddedByParticularDoctorQuery,
  useGetLastTenPatientsByDoctorIdQuery,
} from "../features/Api/doctorApi";

const DoctorOutlet = () => {
  const { user } = useSelector((state) => state.auth);
  const data = user.user;
  const {
    data: allPatients,
    isSuccess,
    isError,
  } = useGetAllPatientsMonthWiseAddedByParticularDoctorQuery(data._id);
  const {
    data: lastTenPatients,
    isLoading: isLoadingTenPateints,
    isFetching: isFetchingTenPatients,
    isError: isErrorTenPateints,
    error: errorTenPatients,
  } = useGetLastTenPatientsByDoctorIdQuery(data._id);
  const { data: appointment } = useGetAppointmentsByDoctorIdQuery(data._id);

  return (
    <div className="grid min-h-full grid-cols-3 gap-8 bg-white p-4  ">
      <div className="drop-shadow-c col-span-3  grid gap-4 rounded-2xl  bg-white p-4 align-middle">
        <div className="flex items-center gap-2 text-2xl ">
          <FiUser className="" />
          <h1>Personal info</h1>
        </div>
        <div className="flex gap-4">
          {/* <img src={} alt="profile pic" /> */}
          <div className="flex h-24 w-24   items-center justify-center self-center justify-self-center rounded-full bg-slate-800 ">
            <FiUser className="text-5xl text-white" />
          </div>
          <div className="grid grow grid-flow-col grid-rows-2 items-center gap-2 py-2 text-xl  ">
            <div>Name : {data.name}</div>
            <div>Email : {data.email}</div>
            <div>Contact: {data.contact ? data.contact : "-"}</div>
            <div>Licence : {data.license}</div>
            <div>Aadhar no. : {data.aadhaarNumber}</div>
            <div>
              Specialization :
              {data.specializations?.map((speciality, idx) => (
                <span key={speciality}>
                  {speciality}
                  {data.specializations.length !== idx + 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="drop-shadow-c col-span-2 row-span-1  flex h-96 flex-col gap-2 rounded-2xl bg-white p-4 ">
        <AreaChart
          data={{
            data: allPatients,
            tag: "Patients",
            color: "rgba(75, 192, 192, 0.5)",
          }}
        />
      </div>
      <div className="drop-shadow-c col-span-1 row-span-1 flex h-96 flex-col gap-2 overflow-y-auto  rounded-2xl bg-white p-4 ">
        <div className="flex gap-2 ">
          <FaWheelchair className="text-xl" />
          <h1>Recently Added Patients </h1>
        </div>
        <SideTable elements={lastTenPatients?.result} />
      </div>
      <div className="col-span-3 p-4">
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
      </div>
    </div>
  );
};

export default DoctorOutlet;
