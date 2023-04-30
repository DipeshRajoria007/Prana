const Admin = require("../model/Admin.model.js");
const Doctor = require("../model/Doctor.model.js");
const Patient = require("../model/Patient.model.js");
const Hospital = require("../model/Hospital.model");

const SignupAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  let exisitingAdmin;
  try {
    exisitingAdmin = await Admin.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (exisitingAdmin) {
    return res.status(401).json({ message: "admin already exists" });
  }
  const newAdmin = new Admin({
    name,
    email,
    password,
  });
  try {
    await newAdmin.save();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
  return res.status(200).json({ message: newAdmin });
};
const SignInAdmin = async (req, res) => {
  const { email, password } = req.body;
  let admin;
  console.log("Signin admin route");

  try {
    admin = await Admin.find();
  } catch (error) {
    console.log(error.message);
  }
  return res.status(201).json({ data: admin });
};
const getDoctorCount = async (req, res) => {
  console.log("GetDoctorCount");
  try {
    const totalDoctors = await Doctor.count();
    return res.status(200).json({ data: totalDoctors });
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({ message: error.message });
  }
};
const getPatientCount = async (req, res) => {
  console.log("GetPatientCount");
  try {
    const totalPatients = await Patient.count();
    return res.status(200).json({ data: totalPatients });
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({ message: error.message });
  }
};
const AddHospital = async (req, res, next) => {
  console.log("addhospital route");
  console.log(req.body);
  const { name, email, contact, specializations, address, adminEmail } =
    req.body;
  console.log(specializations);
  let exsistingHospital;
  try {
    exsistingHospital = await Hospital.findOne({ email });
  } catch (err) {
    console.error(err);
  }
  if (exsistingHospital) {
    return res.status(401).json({ message: "Hospital already exists" });
  }
  let newHospital;
  try {
    newHospital = new Hospital({
      name,
      email,
      specializations,
      address,
      contact,
      adminEmail,
    });
    await newHospital.save();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
  return res.status(201).json({ message: "success" });
};

const GetAllDoctors = async (req, res) => {
  let Doctors;

  try {
    Doctors = await Doctor.find();
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({ message: error.message });
  }
  return res.status(201).json({ data: Doctors });
};
const GetAllHospitals = async (req, res) => {
  let Hospitals;

  try {
    Hospitals = await Hospital.find();
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({ message: error.message });
  }
  return res.status(201).json({ data: Hospitals });
};
const GetAllPatients = async (req, res) => {
  let Patients;

  try {
    Patients = await Patient.find();
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({ message: error.message });
  }
  return res.status(201).json(Patients);
};

const AddDoctor = async (req, res) => {
  const {
    name,
    contact,
    specializations,
    email,
    aadhaarNumber,
    hospital,
    gender,
    DOB,
    license,
  } = req.body;
  // let exsistingDoctor;
  // try {
  //   exsistingDoctor = await Doctor.findOne({ aadhaarNumber });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  // if (exsistingDoctor)
  //   return res.status(501).json({ message: "Doctor already exists" });
  try {
    const doctor = new Doctor({
      name,
      contact,
      specializations,
      email,
      aadhaarNumber,
      gender,
      license,
      DOB,
      hospital,
    });
    let result = await doctor.save();
    console.log(result._id);
    const exsistingHospital = await Hospital.findOne({ _id: hospital });
    exsistingHospital.doctors.push(result._id);
    await exsistingHospital.save();
    console.log(exsistingHospital);
  } catch (error) {
    console.log(error.stack);
    return res.status(401).json({ message: error.message });
  }
  return res.status(200).json({ message: "success" });
};
const getLastTenDoctors = async (req, res) => {
  try {
    const result = await Doctor.find({}).sort({ createdAt: -1 }).limit(10);
    return res.status(201).json({ result });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};
const getLastTenPatients = async (req, res) => {
  try {
    const result = await Patient.find({}).sort({ createdAt: -1 }).limit(10);
    return res.status(201).json({ result });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

const getMonthWiseDoctorsCount = async (req, res) => {
  try {
    const results = await Doctor.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%m",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);
    console.log(results);
    res.status(200).json({ results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
const getMonthWisePatientsCount = async (req, res) => {
  try {
    const results = await Patient.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%m",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);
    console.log(results);
    res.status(200).json({ results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

module.exports = {
  SignupAdmin,
  SignInAdmin,
  getDoctorCount,
  getPatientCount,
  AddHospital,
  GetAllHospitals,
  GetAllDoctors,
  GetAllPatients,
  AddDoctor,
  getLastTenDoctors,
  getLastTenPatients,
  getMonthWiseDoctorsCount,
  getMonthWisePatientsCount,
};
