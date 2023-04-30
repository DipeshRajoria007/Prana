const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hospitalAdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hospital: {
    type: mongoose.Types.ObjectId,
    ref: "Hospital",
  },
});

module.exports = mongoose.model("HospitalAdmin", hospitalAdminSchema);
