import { useSelector } from "react-redux";
import { FaHospital, FaUser, FaUserNurse } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import SideBar from "../components/SideBar";
import NotAuthorized from "./NotAuthorized";
import { Outlet } from "react-router-dom";
const HospitalDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  if (user.user.role !== "HOSPITAL") return <NotAuthorized />;

  let props = [
    {
      title: "Dashboard",
      icon: <RxDashboard className="text-2xl" />,
      url: "./",
    },
    {
      title: "Doctors",
      icon: <FaUserNurse className="text-2xl" />,
      url: "doctors",
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

export default HospitalDashboard;
