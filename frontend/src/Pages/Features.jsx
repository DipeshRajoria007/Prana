import {
  FaFileAlt,
  FaHospital,
  FaHospitalAlt,
  FaUserMd,
  FaUserNurse,
} from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { BsGearFill } from "react-icons/bs";
import featuresData from "../constants/index";
import styles from "../styles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Features() {
  return (
    <div className="w-full overflow-hidden text-darkBg">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      {/* <h1 className="mb-6 mt-12 text-center text-3xl font-bold">Features</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {featuresData.map((feature, index) => (
          <div key={index} className="rounded-lg bg-white p-8 shadow">
            {feature.icon === "hospital" && (
              <FaHospitalAlt className="mx-auto mb-4 text-4xl text-blue-600" />
            )}
            {feature.icon === "assignment" && (
              <MdAssignment className="mx-auto mb-4 text-4xl text-blue-600" />
            )}
            {feature.icon === "gear" && (
              <BsGearFill className="mx-auto mb-4 text-4xl text-blue-600" />
            )}
            <h2 className="mb-2 text-xl font-bold">{feature.title}</h2>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div> */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Features of Our HMS
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Our system provides a wide range of features to meet the needs of
            doctors, nurses, administrators, patients, and other staff members.
            Here are some of the key features:
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                <FaUserMd className="h-6 w-6" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Doctor Management
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Manage doctors' profiles, schedules, and patient records
                  efficiently.
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                <FaUserNurse className="h-6 w-6" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Nurse Management
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Manage nurses' profiles, schedules, and patient records
                  efficiently.
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                <FaHospital className="h-6 w-6" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Facility Management
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Manage the hospital's facilities, equipment, and supplies
                  effectively.
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                <FaFileAlt className="h-6 w-6" />
              </div>
              <div className="mt-4">
                <h3
                  className="font complete
          it ChatGPT
          
          -medium
          text-lg text-gray-900"
                >
                  Record Management
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Keep track of patients' medical records, appointments, and
                  billing information securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Features;
