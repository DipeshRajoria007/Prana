import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { FaHospital } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const SideBar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-300 h-screen bg-purplee text-white p-6 `}
    >
      <div className="flex flex-col gap-6">
        <div
          className="flex gap-3  cursor-pointer max-w"
          onClick={() => setOpen(!open)}
        >
          <HiMenu className="text-2xl" />
          <span className={`${open ? "block" : "hidden"}`}>DashBoard</span>
        </div>
        <div className=" flex flex-col gap-3">
          <Link
            to="hospitals"
            className="flex max-w items-center justify-center gap-3 "
          >
            <FaHospital className="text-2xl" />
            <span className={`${open ? "block" : "hidden"}`}>Hospitals</span>
          </Link>
          <Link
            to="doctors"
            className="flex max-w items-center justify-center gap-3 "
          >
            <FaUser className="text-2xl" />
            <span className={`${open ? "block" : "hidden"}`}>Doctors</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
