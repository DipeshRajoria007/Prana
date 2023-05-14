import { useSelector } from "react-redux";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiCreditCard,
  FiClipboard,
} from "react-icons/fi"; // inside your component's return
import { BsFillClipboardFill } from "react-icons/bs";
import {
  FaEnvelope,
  FaHospital,
  FaMapMarkedAlt,
  FaPhone,
} from "react-icons/fa";
import { RiHospitalFill } from "react-icons/ri";
const HospitalOutlet = () => {
  console.log("this is hospital outlet");
  const { user } = useSelector((state) => state.auth);
  const hospital = user.user;

  return (
    <div className="grid min-h-full grid-cols-3 gap-8 bg-white p-4  ">
      <div className="drop-shadow-c col-span-3  grid gap-4 rounded-2xl  bg-white p-4 align-middle">
        <div className="flex items-center gap-2 text-2xl ">
          <RiHospitalFill className="" />
          <h1>Hospital Info</h1>
        </div>
        <div className="flex gap-4">
          {/* <img src={} alt="profile pic" /> */}
          <div className="flex h-24 w-24   items-center justify-center self-center justify-self-center rounded-full bg-slate-800 ">
            <FiUser className="text-5xl text-white" />
          </div>
          <div className="grid grow grid-flow-col grid-rows-2 items-center gap-2 py-2 text-xl  ">
            <p>
              <FaHospital className="mr-2 inline-block" />
              <strong>Name:</strong> {hospital.name}
            </p>
            <p>
              <FaPhone className="mr-2 inline-block" />
              <strong>Contact:</strong> {hospital.contact}
            </p>
            <p>
              <FaEnvelope className="mr-2 inline-block" />
              <strong>Email:</strong> {hospital.email}
            </p>
            <p>
              <FaMapMarkedAlt className="mr-2 inline-block" />
              <strong>Address:</strong> {hospital.address.street},{" "}
              {hospital?.address.city}, {hospital?.address.state},
              {hospital?.address.pincode}
            </p>
            <div>
              <BsFillClipboardFill className="mr-2 inline-block" />{" "}
              <strong>Specialization</strong> :
              {hospital.specializations?.map((speciality, idx) => (
                <span key={speciality}>
                  {speciality}
                  {hospital.specializations.length !== idx + 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="drop-shadow-c col-span-2 row-span-1  flex h-96 flex-col gap-2 rounded-2xl bg-white p-4 ">
        <AreaChart
          hospital={{
            hospital: allPatients,
            tag: "Patients",
            color: "rgba(75, 192, 192, 0.5)",
          }}
        />
      </div> */}
      {/* <div className="drop-shadow-c col-span-1 row-span-1 flex h-96 flex-col gap-2 overflow-y-auto  rounded-2xl bg-white p-4 "> */}
      {/* <div className="flex gap-2 ">
        <FaWheelchair className="text-xl" />
        <h1>Recently Added Patients </h1>
      </div>
      <SideTable elements={lastTenPatients?.result} /> */}
      {/* <SideTable elements={[]} /> */}
      {/* </div> */}
    </div>
  );
};

export default HospitalOutlet;
