const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User.model");

const add_user_to_userTable = async (req, res, next) => {
  const {
    email,
    role,
    aadhaarNumber,
    contact,
    password: providedPassword,
  } = req.body;

  let exsistingUser;
  try {
    exsistingUser = await User.findOne({ email, role });
  } catch (err) {
    console.log(" already exists error");
    console.error(err);
  }
  if (exsistingUser) {
    console.log(exsistingUser);
    return res.status(401).json({ message: "already exists" });
  }
  let password;
  if (providedPassword) password = providedPassword;
  else if (aadhaarNumber) {
    let aadhaarString = aadhaarNumber.toString();
    password = email.split("@")[0] + aadhaarString.substr(0, 4);
    console.log(password);
  } else if (contact) {
    const contactString = contact.toString();
    password = email.split("@")[0] + contactString.substr(0, 4);
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a new user
  const newUser = new User({
    email,
    password: hashedPassword,
    role,
  });
  try {
    await newUser.save();
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
  next();
};
module.exports = { add_user_to_userTable };
