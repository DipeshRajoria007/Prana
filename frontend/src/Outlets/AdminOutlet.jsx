import { FaUserMd, FaWheelchair } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { RiUserHeartLine, RiUserAddLine, RiHospitalFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import AreaChart from "../Components/AreaChart";
import DoctorsTable from "../Components/DoctorsTable";

import PatientsTable from "../Components/PatientsTable";
import PieChart from "../Components/PieChart";
import SideTable from "../Components/SideTable";
import {
  useGetDoctorCountQuery,
  useGetPatientCountQuery,
  useGetLastTenDoctorsQuery,
  useGetLastTenPatientsQuery,
  useGetMonthWisePatientsCountQuery,
  useGetMonthWiseDoctorsCountQuery,
} from "../features/Api/adminApi";
const AdminOutlet = () => {
  const {
    data: Doctors,
    error,
    isLoading,
    isFetching,
    isError,
  } = useGetDoctorCountQuery();
  const {
    data: lastTenDoctors,
    isLoading: isLoadingTenDoctors,
    isFetching: isFetchingTenDoctors,
    isError: isErrorTenDoctors,
    error: errorTenDoctors,
  } = useGetLastTenDoctorsQuery();
  const {
    data: lastTenPatients,
    isLoading: isLoadingTenPateints,
    isFetching: isFetchingTenPatients,
    isError: isErrorTenPateints,
    error: errorTenPatients,
  } = useGetLastTenPatientsQuery();
  const { data: Patients } = useGetPatientCountQuery();
  const {
    data: PatientsCount,
    isLoading: isLoadingPatientsMonthWise,
    isError: isErrorPatientsMonthWise,
    error: errorPatientsMonthWise,
  } = useGetMonthWisePatientsCountQuery();
  const {
    data: DoctorsCount,
    isLoading: isLoadingDoctorsMonthWise,
    isError: isErrorDoctorsMonthWise,
    error: errorDoctorsMonthWise,
  } = useGetMonthWiseDoctorsCountQuery();
  const { user } = useSelector((state) => state.auth);
  const data = user.user;
  const Data = {
    labels: ["Doctors", "Patients"],
    datasets: [
      {
        label: "# of PEOPLE",
        data: [Doctors?.data, Patients?.data],
        backgroundColor: ["#3e36b0", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["#3e36b0", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-3 gap-8 border-2 bg-white p-4  ">
      <div className="drop-shadow-c col-span-2  grid gap-4 rounded-2xl  bg-white p-4 align-middle">
        <div className="flex gap-2 ">
          <FiUser className="text-xl" />
          <h1>Personal info</h1>
        </div>
        <div className="flex gap-4">
          {/* <img src={} alt="profile pic" /> */}
          <div className="flex h-24 w-24   items-center justify-center self-center justify-self-center rounded-full bg-slate-800 ">
            <FiUser className="text-5xl text-white" />
          </div>
          <div className="grid grow grid-flow-col grid-rows-2 items-center gap-2 py-2  ">
            <div>Name : {data.name}</div>
            <div>Email : {data.email}</div>
            <div>Contact: {data.contact ? data.contact : "-"}</div>
            <div>Aadhar no. : {data.aadhaarNumber}</div>
          </div>
        </div>
      </div>
      <div className="drop-shadow-c row-span-2 flex items-center justify-center rounded-2xl bg-white ">
        <PieChart Data={Data} />
      </div>
      <div className="drop-shadow-c col-span-2 flex h-48  gap-4 rounded-2xl">
        <div className="flex h-full w-1/3 flex-col gap-4 rounded-2xl bg-white p-4">
          <div className="flex w-full justify-between text-right text-xl ">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 ">
              <FaWheelchair className="text-white" />
            </div>
            <p className=" inline font-bold ">
              Total <br /> Patients
            </p>
          </div>
          <p className="text-center text-5xl font-bold ">{Patients?.data}</p>
        </div>
        <div className="flex h-full w-1/3 flex-col gap-4 rounded-2xl bg-white p-4">
          <div className="flex w-full justify-between text-right text-xl ">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 ">
              <FaUserMd className=" text-white " />
            </div>
            <p className=" inline font-bold ">
              Total <br /> Doctors
            </p>
          </div>
          <p className="text-center text-5xl font-bold ">{Doctors?.data}</p>
        </div>
        <div className="flex h-full w-1/3 flex-col gap-4 rounded-2xl bg-white p-4">
          <div className="flex w-full justify-between text-right text-xl ">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 ">
              <RiHospitalFill className="text-white" />
            </div>
            <p className=" inline  font-bold ">
              Total <br /> Hospitals
            </p>
          </div>
          <p className="text-center text-5xl font-bold ">{Patients?.data}</p>
        </div>
      </div>

      <div className="drop-shadow-c col-span-2 row-span-2  flex h-96 flex-col gap-2 rounded-2xl bg-white p-4 ">
        <AreaChart data={{ data: DoctorsCount?.results, tag: "Doctors" }} />
      </div>
      <div className="drop-shadow-c col-span-1 row-span-2  flex h-96 flex-col gap-2 rounded-2xl bg-white p-4 ">
        <div className="flex gap-2 ">
          <RiUserHeartLine className="text-xl" />
          <h1>Recently Added Doctors </h1>
        </div>
        <SideTable elements={lastTenDoctors?.result} />
      </div>
      <div className="drop-shadow-c col-span-2 row-span-2  flex h-96 flex-col gap-2 rounded-2xl bg-white p-4 ">
        <AreaChart
          data={{
            data: PatientsCount?.results,
            tag: "Patients",
            color: "rgba(75, 192, 192, 0.5)",
          }}
        />
      </div>

      {/* <div className="drop-shadow-c col-span-3 flex h-48 flex-col gap-2 rounded-2xl bg-white p-4 ">
        <div className="flex gap-2 ">
          <RiUserHeartLine className="text-xl" />
          <h1>Recently Added Patients </h1>
        </div>
        <PatientsTable elements={lastTenPatients?.result} />
      </div> */}
      <div className="drop-shadow-c col-span-1 flex h-48 flex-col gap-2 rounded-2xl bg-white p-4 ">
        <div className="flex gap-2 ">
          <FaWheelchair className="text-xl" />
          <h1>Recently Added Patients </h1>
        </div>
        <SideTable elements={lastTenPatients?.result} />
      </div>
    </div>
  );
};

export default AdminOutlet;
