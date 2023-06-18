const Doctor = require("../model/Doctor.model");
const FollowUpCounter = require("../model/FollowUpCounter");
const HistoryCounter = require("../model/HistoryCounter");
const Patient = require("../model/Patient.model");
const HealthIdCounter = require("../model/HealthIdCounter");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const getNextHealthIdValue = async () => {
  const counter = await HealthIdCounter.findOneAndUpdate(
    { _id: "healthId" },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );

  return counter.sequenceValue.toString().padStart(4, "0");
};

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
  const healthId = await getNextHealthIdValue();
  const uniqueHealthId = `UHID${healthId}`;
  try {
    const patient = new Patient({
      uniqueHealthId,
      name,
      contact,
      email,
      address: {
        street: address.street,
        pincode: address.pincode,
        city: address.city,
        state: address.state,
      },
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
  return res.status(200).json({ message: "Patient Added Successfully" });
};
const getPatientById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const patient = await Patient.findById(id)
      .populate("history.hospitalVisited")
      .populate("history.doctor");

    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getNextHistorySequenceValue = async (sequenceName) => {
  const counter = await HistoryCounter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequenceValue: 1 } },
    { new: true }
  );
  return counter.sequenceValue;
};
const addPatientNewRecord = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { hospitalVisited, diagnosis, medicinePrescription, symptoms, doctor } =
    req.body;
  try {
    // Get the patient record from the database
    // const patient = await Patient.findById(id);

    // if (!patient) {
    //   return res.status(404).json({ message: "Patient not found" });
    // }

    // Create a new history record
    const patient = await Patient.findOne({ _id: id });
    const counters = await HistoryCounter.findOneAndUpdate(
      { _id: "historyId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const historyId = await getNextHistorySequenceValue("historyId");
    const newHistoryRecord = {
      historyId,
      hospitalVisited,
      diagnosis,
      medicinePrescription,
      symptoms,
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
    //   diagnosis,
    //   medicinePrescription,
    //   symptoms,
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

const getNextFollowUpSequenceValue = async (sequenceName) => {
  const counter = await FollowUpCounter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequenceValue: 1 } },
    { new: true }
  );
  return counter.sequenceValue;
};

const addFollowUp = async (req, res) => {
  const { patientId, historyId } = req.params;
  const { patientsUpdate, diagnosis, medicinePrescription, tests } = req.body;
  console.log({ patientId, historyId });

  try {
    const patient = await Patient.findOne({
      _id: patientId,
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const history = patient.history.find((h) => h.historyId == historyId);
    console.log(history);

    if (!history) {
      return res.status(404).json({ error: "History not found" });
    }
    const counters = await FollowUpCounter.findOneAndUpdate(
      { _id: "followUpId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const followUpId = await getNextFollowUpSequenceValue("followUpId");
    const followUp = {
      followUpId,
      patientsUpdate,
      diagnosis,
      medicinePrescription,
      tests,
    };

    await Patient.findOneAndUpdate(
      { _id: patientId, "history.historyId": historyId },
      { $push: { "history.$.followups": followUp } }
    );

    res.status(201).json(followUp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllPatientsMonthWiseAddedByDoctorId = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    console.log(doctorId);
    // Aggregate the patients by month
    // const patientsByMonth = await Patient.aggregate([
    //   {
    //     $match: {
    //       createdBy: doctorId,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         $dateToString: {
    //           format: "%m",
    //           date: "$createdAt",
    //         },
    //       },
    //       count: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       month: "$_id",
    //       count: 1,
    //     },
    //   },
    //   {
    //     $sort: {
    //       month: 1,
    //     },
    //   },
    // ]);
    const patientsByMonth = await Patient.aggregate([
      {
        $match: {
          createdBy: new ObjectId(doctorId),
        },
      },
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
    // const patientsByMonth = await Patient.find({ createdBy: doctorId });
    console.log(patientsByMonth);
    // Send the response
    res.status(200).json(patientsByMonth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
const getLastTenPatientsByDoctorId = async (req, res) => {
  const doctorId = req.params.doctorId;
  try {
    const result = await Patient.find({ createdBy: doctorId }).sort({
      createdAt: -1,
    });
    return res.status(201).json({ result });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

module.exports = {
  AddPatient,
  getPatientById,
  addPatientNewRecord,
  addFollowUp,
  getAllPatientsMonthWiseAddedByDoctorId,
  getLastTenPatientsByDoctorId,
};
