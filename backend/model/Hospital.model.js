const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  specializations: {
    type: [String],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  doctors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Doctors",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hospital", hospitalSchema);
