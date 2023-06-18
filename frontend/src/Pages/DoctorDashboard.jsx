import { useSelector } from "react-redux";
import { FaHospital, FaUser, FaUserNurse } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { AiFillSetting } from "react-icons/ai";
import SideBar from "../Components/SideBar";
import NotAuthorized from "./NotAuthorized";
import { Outlet } from "react-router-dom";
const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  if (user.user.role !== "DOCTOR") return <NotAuthorized />;

  let props = [
    {
      title: "Dashboard",
      icon: <RxDashboard className="text-2xl" />,
      url: "./",
    },
    {
      title: "Patients",
      icon: <FaUser className="text-2xl" />,
      url: "patients",
    },
    {
      title: "Settings",
      icon: <AiFillSetting className="text-2xl" />,
      url: "settings",
    },
  ];

  return (
    <div className="flex h-[100vh]">
      <SideBar props={props} />
      <div className=" flex-1 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorDashboard;
