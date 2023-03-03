import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
const Admin = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
