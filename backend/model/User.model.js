const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // aadhaarNumber: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  role: {
    type: String,
    enum: ["ADMIN", "DOCTOR", "PATIENT", "HOSPITAL"],
    required: true,
  },
  // Additional fields based on role
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  hospitalAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
