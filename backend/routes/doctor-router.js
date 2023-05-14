const express = require("express");
const {
  AddPatient,
  getPatientById,
  addPatientNewRecord,
  addFollowUp,
  getAllPatientsMonthWiseAddedByDoctorId,
  getLastTenPatientsByDoctorId,
} = require("../controllers/Doctor.controller");
const { add_user_to_userTable } = require("../middleware/addUserMiddleware");

const doctorRouter = express.Router();

doctorRouter.post("/doctor/addpatient", add_user_to_userTable, AddPatient);
doctorRouter.get("/doctor/patient/:id", getPatientById);
doctorRouter.put("/doctor/patient/:id", addPatientNewRecord);
doctorRouter.put("/doctor/:patientId/:historyId/followup", addFollowUp);
doctorRouter.get(
  "/doctor/:doctorId/patients",
  getAllPatientsMonthWiseAddedByDoctorId
);
doctorRouter.get(
  "/doctor/:doctorId/recentpatients",
  getLastTenPatientsByDoctorId
);
module.exports = doctorRouter;
