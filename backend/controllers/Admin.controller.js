const Admin = require("../model/Admin.model.js");

const SignupAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  let exisitingAdmin;
  try {
    exisitingAdmin = await Admin.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (exisitingAdmin) {
    return res.status(401).json({ message: "admin already exists" });
  }
  const newAdmin = new Admin({
    name,
    email,
    password,
  });
  try {
    await newAdmin.save();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
  return res.status(200).json({ message: newAdmin });
};
module.exports = SignupAdmin;
