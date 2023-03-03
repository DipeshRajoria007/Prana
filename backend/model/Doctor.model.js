import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  specializations: {
    type: Array,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Doctor", userSchema);
