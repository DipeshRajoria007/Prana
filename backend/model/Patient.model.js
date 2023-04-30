const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
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
    type: String,
    required: true,
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
  history: [
    {
      hospitalVisited: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
      },
      diseaseDiagnosed: {
        type: String,
        required: true,
      },
      medicinePrescription: {
        type: String,
        required: true,
      },
      reasonForVisit: {
        type: String,
        required: true,
      },
      tests: {
        type: String,
      },
      followups: {
        date: {
          type: Date,
          required: true,
          default: Date.now,
        },
        patientsUpdate: {
          type: String,
          required: true,
        },
      },
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
      createdAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
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
