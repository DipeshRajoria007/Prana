import { useSelector } from "react-redux";
import { FaHospital, FaUser, FaUserNurse } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { AiFillSetting } from "react-icons/ai";
import SideBar from "../components/SideBar";
import NotAuthorized from "./NotAuthorized";
import { Outlet } from "react-router-dom";
import { BsBookmarksFill } from "react-icons/bs";
const PatientDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  if (user.user.role !== "PATIENT") return <NotAuthorized />;

  let props = [
    {
      title: "Dashboard",
      icon: <RxDashboard className="text-2xl" />,
      url: "./",
    },
    {
      title: "Appointment",
      icon: <BsBookmarksFill className="text-2xl" />,
      url: "appointment",
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

export default PatientDashboard;
