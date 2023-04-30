const Doctor = require("../model/Doctor.model");
const Patient = require("../model/Patient.model");

const AddPatient = async (req, res) => {
  const {
    name,
    email,
    contact,
    DOB,
    address,
    gender,
    aadhaarNumber,
    bloodGroup,
    doctor,
  } = req.body;
  try {
    const patient = new Patient({
      name,
      contact,
      email,
      address,
      aadhaarNumber,
      gender,
      DOB,
      bloodGroup,
      createdBy: doctor,
    });
    let result = await patient.save();
    console.log(result);
    const exsistingDoctor = await Doctor.findOne({ _id: doctor });
    exsistingDoctor.patients.push(result._id);
    await exsistingDoctor.save();
    console.log(exsistingDoctor);
  } catch (error) {
    console.log(error.stack);
    return res.status(401).json({ message: error.message });
  }
  return res.status(200).json({ message: "success" });
};
const getPatientById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const patient = await Patient.findById(id);

    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addPatientNewRecord = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const {
    hospitalVisited,
    diseaseDiagnosed,
    treatment,
    reasonForVisit,
    doctor,
  } = req.body;
  console.log(req.body);
  try {
    // Get the patient record from the database
    // const patient = await Patient.findById(id);

    // if (!patient) {
    //   return res.status(404).json({ message: "Patient not found" });
    // }

    // Create a new history record
    const newHistoryRecord = {
      hospitalVisited,
      diseaseDiagnosed,
      treatment,
      reasonForVisit,
      doctor,
    };
    await Patient.updateOne(
      { _id: id },
      { $push: { history: newHistoryRecord } }
    );

    // Add the new record to the patient's history array
    // patient.history.push(newHistoryRecord);
    // patient.history.push({
    //   hospitalVisited,
    //   diseaseDiagnosed,
    //   treatment,
    //   reasonForVisit,
    //   doctor,
    // });

    // Save the updated patient record to the database
    // await patient.save();

    res.status(201).json({
      message: "New history record added successfully",
      historyRecord: newHistoryRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { AddPatient, getPatientById, addPatientNewRecord };
