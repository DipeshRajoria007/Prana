import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin.jsx";
import Home from "./Pages/Home";
import HospitalsOutlet from "./Outlets/HospitalsOutlet";
import DoctorsOutlet from "./Outlets/DoctorsOutlet";
import AddHospital from "./Outlets/AddHospital";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="admin" element={<Admin />}>
            <Route path="hospitals" element={<HospitalsOutlet />} />
            <Route path="add-hospital" element={<AddHospital />} />
            <Route path="doctors" element={<DoctorsOutlet />} />
          </Route>
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
