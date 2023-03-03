const express = require("express");
const AddHospital = require("../controllers/AddHospital.controller");
const HospitalRouter = express.Router();

HospitalRouter.post("/addhospital", AddHospital);
module.exports = HospitalRouter;
