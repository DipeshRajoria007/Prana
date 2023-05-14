const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followUpSchema = new Schema({
  _id: false,

  followUpId: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  patientsUpdate: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  medicinePrescription: {
    type: String,
    required: true,
  },
  tests: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
});

const historySchema = new Schema({
  _id: false,
  historyId: {
    type: Number,
    default: 0,
  },
  hospitalVisited: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  diagnosis: {
    type: String,
    required: true,
  },
  medicinePrescription: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  tests: {
    type: String,
  },
  followups: [followUpSchema],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const patientSchema = new Schema({
  uniqueHealthId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value <= Date.now();
      },
      message: "DOB cannot be in the future",
    },
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    required: true,
  },
  history: [historySchema],
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
