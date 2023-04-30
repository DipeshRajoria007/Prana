const express = require("express");
const {
  AddPatient,
  getPatientById,
  addPatientNewRecord,
} = require("../controllers/Doctor.controller");
const { add_user_to_userTable } = require("../middleware/addUserMiddleware");

const doctorRouter = express.Router();

doctorRouter.post("/doctor/addpatient", add_user_to_userTable, AddPatient);
doctorRouter.get("/doctor/patient/:id", getPatientById);
doctorRouter.put("/doctor/patient/:id", addPatientNewRecord);
module.exports = doctorRouter;
