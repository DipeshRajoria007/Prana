import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HospitalTable from "../Components/HospitalTable";
import { GiHospitalCross } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";

const HospitalsOutlet = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="flex flex-col gap-6 text-white h-screen overflow-auto p-4">
      <div className="flex flex-row gap-6 justify-between items-center ">
        <div className="text-black text-center text-3xl font-bold ">
          <p>All Hospital </p>
        </div>
        <Link
          to="../add-hospital"
          className="flex flex-row gap-6 justify-center items-center p-4 rounded-lg place-self-end bg-lightBluee hover:shadow-2xl duration-700 ease-in-out"
        >
          <GiHospitalCross className="text-3xl" />
          <div className="capitalize">Add a new Hospital</div>
        </Link>
      </div>
      <div>
        <HospitalTable elements={data} />
      </div>
    </div>
  );
};

export default HospitalsOutlet;
