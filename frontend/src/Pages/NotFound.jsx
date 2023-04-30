import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaExclamationCircle,
  FaExclamationTriangle,
  FaRegFrown,
} from "react-icons/fa";
import { FiAlertTriangle, FiHome } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-10 text-6xl font-bold text-gray-800">
        Oops, looks like you're lost!
      </div>
      <div className="mb-10 text-2xl font-medium text-gray-600">
        The page you're looking for doesn't exist. Maybe try searching for it?
      </div>
      <FaRegFrown className="mb-10 animate-bounce text-9xl text-gray-600" />
      <div className="flex gap-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <Link
          to="/"
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
        >
          Go to the homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
