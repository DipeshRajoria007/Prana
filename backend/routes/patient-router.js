const express = require("express");
const {
  getMonthlyAppointmentCount,
} = require("../controllers/Patient.controller");

const patientRouter = express.Router();

patientRouter.get("/patient/:id", getMonthlyAppointmentCount);
module.exports = patientRouter;
