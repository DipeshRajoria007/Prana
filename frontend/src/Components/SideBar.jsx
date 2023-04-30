import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../assets/PRANA-LOGO.png";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
const SideBar = ({ props }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toast.success("logged out");
    navigate("../");
  };
  return (
    <div
      className=" h-screen w-20 bg-darkBg
      p-2 text-white drop-shadow-sm duration-300 md:w-72 md:p-6 "
    >
      <div className="flex flex-col md:gap-6">
        <div className="max-w flex  cursor-pointer gap-3">
          <NavLink to="../" className="hidden md:block ">
            <img src={Logo} alt="logo" className="h-[32px] w-[124px] " />
          </NavLink>
        </div>
        <div className=" flex flex-col items-center gap-3  md:items-start">
          {props.map((prop, idx) => (
            <NavLink
              key={idx}
              to={prop.url}
              className=" flex items-center justify-center gap-3 p-3 "
            >
              {prop.icon}
              <span className="hidden md:block">{prop.title}</span>
            </NavLink>
          ))}

          {/* <NavLink
            to="./"
            className=" flex items-center justify-center gap-3 p-3 "
          >
            <RxDashboard className="text-2xl" />
            <span className="hidden md:block">Dashboard</span>
          </NavLink>
          <NavLink
            to="hospitals"
            className="flex items-center justify-center gap-3 p-3  "
          >
            <FaHospital className="text-2xl" />
            <span className="hidden md:block">Hospitals</span>
          </NavLink>
          <NavLink
            to="doctors"
            className=" flex items-center justify-center gap-3 p-3"
          >
            <FaUserNurse className="text-2xl" />
            <span className="hidden md:block">Doctors</span>
          </NavLink>
          <NavLink
            to="Patients"
            className="max-w flex items-center justify-center gap-3 p-3"
          >
            <FaUser className="text-2xl" />
            <span className="hidden md:block">Patients</span>
          </NavLink> */}
          <Link
            to="/"
            onClick={onLogout}
            className=" flex items-center justify-center gap-3 p-3 "
          >
            <RiLogoutBoxFill className="text-2xl" />
            <span className="hidden md:block">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
