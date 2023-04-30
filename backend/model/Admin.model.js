const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
// module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model("Admin", adminSchema);
