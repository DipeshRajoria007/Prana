const express = require("express");
const {
  AddPatient,
  getPatientById,
  addPatientNewRecord,
} = require("../controllers/Doctor.controller");
const {
  getDoctorsByHospitalId,
} = require("../controllers/Hospital.controller");
const { add_user_to_userTable } = require("../middleware/addUserMiddleware");

const hospitalRouter = express.Router();

// hospitalRouter.post("/hospital/addpatient", add_user_to_userTable, AddPatient);
hospitalRouter.get(
  "/hospital/getdoctorsbyhospitalid/:id",
  getDoctorsByHospitalId
);

module.exports = hospitalRouter;
