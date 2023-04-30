import React from "react";
import { FiLock } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white">
        <FiLock className="h-8 w-8" />
      </div>
      <h2 className="mb-2 text-xl font-bold">Access Denied</h2>
      <p className="mb-6 text-center text-gray-700">
        You are not authorized to access this page.
        <br /> Please contact the administrator if you think this is a mistake.
      </p>
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
        <HiOutlineShieldCheck className="h-8 w-8" />
      </div>
      <Link
        to="/"
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotAuthorized;
