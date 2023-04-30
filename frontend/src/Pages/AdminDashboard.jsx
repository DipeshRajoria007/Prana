import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../Components/SideBar";
import { FaHospital, FaUser, FaUserNurse } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import NotAuthorized from "./NotAuthorized";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  if (user.user.role !== "ADMIN") return <NotAuthorized />;
  let props = [
    {
      title: "Dashboard",
      icon: <RxDashboard className="text-2xl" />,
      url: "./",
    },
    {
      title: "Hospitals",
      icon: <FaHospital className="text-2xl" />,
      url: "hospitals",
    },
    {
      title: "Doctors",
      icon: <FaUserNurse className="text-2xl" />,
      url: "doctors",
    },
    {
      title: "Patients",
      icon: <FaUser className="text-2xl" />,
      url: "patients",
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

export default Dashboard;
