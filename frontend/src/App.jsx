import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import Home from "./Pages/Home";
import HospitalsOutlet from "./Outlets/HospitalsOutlet";
import DoctorsOutlet from "./Outlets/DoctorsOutlet";
import PatientsOutlet from "./Outlets/PatientsOutlet";
import DoctorOutlet from "./Outlets/DoctorOutlet";
import AddHospital from "./Outlets/AddHospital";
import AddPatient from "./Outlets/AddPatient";
import AdminOutlet from "./Outlets/AdminOutlet";
import LoginForm from "./Components/LoginForm";
import DoctorDashboard from "./Pages/DoctorDashboard";
import HospitalDashboard from "./Pages/HospitalDashboard";
import PatientDashboard from "./Pages/PatientDashboard";
import AddDoctor from "./Outlets/AddDoctor";
import PatientOutletForDoctor from "./Outlets/PatientOutletForDoctor";
import NotFound from "./Pages/NotFound";
import PatientOutlet from "./Outlets/PatientOutlet";
import PatientDetails from "./Outlets/PatientPrescription";
import SettingsOutlet from "./Outlets/SettingsOutlet";
import AppointmentOutlet from "./Outlets/AppointmentOutlet.jsx";
import HospitalOutlet from "./Outlets/HospitalOutlet";
import Features from "./Pages/Features";
import Clients from "./Pages/clients";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="/admin" element={<AdminOutlet />} />
            <Route path="hospitals" element={<HospitalsOutlet />} />
            <Route path="add-hospital" element={<AddHospital />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="doctors" element={<DoctorsOutlet />} />
            <Route path="patients" element={<PatientsOutlet />} />
            <Route path="settings" element={<SettingsOutlet />} />
          </Route>
          <Route path="/doctor" element={<DoctorDashboard />}>
            <Route path="/doctor" element={<DoctorOutlet />} />
            <Route path="patients" element={<PatientOutletForDoctor />} />
            <Route path="patients/:id" element={<PatientDetails />} />
            <Route path="patients/create-patient" element={<AddPatient />} />
            <Route path="add-hospital" element={<AddHospital />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="doctors" element={<DoctorsOutlet />} />
            <Route path="settings" element={<SettingsOutlet />} />
          </Route>
          <Route path="/patient" element={<PatientDashboard />}>
            <Route path="/patient" element={<PatientOutlet />} />
            <Route path="appointment" element={<AppointmentOutlet />} />
            <Route path="settings" element={<SettingsOutlet />} />
          </Route>
          <Route path="/hospital" element={<HospitalDashboard />}>
            <Route path="/hospital" element={<HospitalOutlet />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="doctors" element={<DoctorsOutlet />} />
          </Route>
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
