const User = require("../model/User.model");
const Admin = require("../model/Admin.model");
const Patient = require("../model/Patient.model");
const Doctor = require("../model/Doctor.model");
const Hospital = require("../model/Hospital.model");
const get_user_from_respectiveTable = async (req, res) => {
  console.log("getUser route");
  const { email, role } = req.body;
  let user;
  let error;
  if (role === "ADMIN") {
    try {
      user = await Admin.findOne({ email });
    } catch (err) {
      error = err;
      // return res.status(401).json({ error });
    }
    // return res.status(201).json({ data: user });
  } else if (role === "DOCTOR") {
    try {
      user = await Doctor.findOne({ email });
    } catch (err) {
      error = err;
      console.error(err);
    }
  } else if (role === "PATIENT") {
    try {
      user = await Patient.findOne({ email })
        .populate("history.hospitalVisited")
        .populate("history.doctor");
    } catch (err) {
      error = err;
      console.error(err);
    }
  } else if (role === "HOSPITAL") {
    try {
      user = await Hospital.findOne({ email });
    } catch (err) {
      error = err;
      console.error(err);
    }
  }
  if (error) {
    return res.status(501).json({ error });
  }
  user = user.toJSON();
  user.role = role;
  console.log("last controller", user);

  res.status(200).json({ user });
};
const add_user_to_table = async (req, res) => {
  console.log("addUser route");
  const { role } = req.body;

  if (role === "ADMIN") {
    const { name, email, aadhaarNumber, contact } = req.body;

    const newAdmin = new Admin({
      name,
      email,
      aadhaarNumber,
      contact,
    });
    try {
      await newAdmin.save();
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: err });
    }
    return res.status(201).json({ message: newAdmin });
  } else if (role === "DOCTOR") {
    const {
      name,
      age,
      gender,
      email,
      aadhaarNumber,
      specialization,
      hospital,
      license,
    } = req.body;

    const newDoctor = new Doctor({
      name,
      age,
      gender,
      email,
      aadhaarNumber,
      specialization,
      hospital,
      license,
    });
    try {
      await newDoctor.save();
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: err });
    }
    return res.status(201).json({ message: newDoctor });
  } else if (role === "PATIENT") {
    const {
      name,
      email,
      aadhaarNumber,
      gender,
      age,
      address,
      contact,
      doctorId,
    } = req.body;

    const newPatient = new Patient({
      name,
      age,
      gender,
      email,
      aadhaarNumber,
      address,
      contact,
      createdBy: doctorId,
    });
    try {
      await newPatient.save();
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: err });
    }
    return res.status(201).json({ message: newPatient });
  }
};
module.exports = { get_user_from_respectiveTable, add_user_to_table };
