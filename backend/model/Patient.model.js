import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    unique: true,
  },
  disease: {
    type: Array,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Patient", userSchema);
