const express = require("express");
const {
  SignupAdmin,
  SignInAdmin,
  getDoctorCount,
  getPatientCount,
  GetAllHospitals,
  AddHospital,
  GetAllDoctors,
  GetAllPatients,
  AddDoctor,
  getLastTenPatients,
  getLastTenDoctors,
  getMonthWiseDoctorsCount,
  getMonthWisePatientsCount,
} = require("../controllers/Admin.controller.js");
const { add_user_to_userTable } = require("../middleware/addUserMiddleware.js");
const router = express.Router();
router.post("/signupadmin", SignupAdmin);
router.post("/signin", SignInAdmin);
router.get("/admin/getdoctorcount", getDoctorCount);
router.get("/admin/getPatientcount", getPatientCount);
router.get("/admin/getallhospitals", GetAllHospitals);
router.get("/admin/getalldoctors", GetAllDoctors);
router.get("/admin/getallpatients", GetAllPatients);
router.post("/admin/addhospital", add_user_to_userTable, AddHospital);
router.post("/admin/adddoctor", add_user_to_userTable, AddDoctor);
router.get("/admin/getlasttendoctors", getLastTenDoctors);
router.get("/admin/getlasttenpatients", getLastTenPatients);
router.get("/admin/getmonthwisedoctors", getMonthWiseDoctorsCount);
router.get("/admin/getmonthwisepatients", getMonthWisePatientsCount);
module.exports = router;
