const User = require("../model/User.model");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const checkRole = async (req, res, next) => {
  const { email, password, role } = req.body;
  let user;
  try {
    user = await User.findOne({ email, role });
  } catch (err) {
    console.error(err);
    return res.status(501).json({ error: err.message });
  }

  if (!user) {
    return res.status(403).json({ message: "Invalid Email" });
  } else if (await bcrypt.compare(password, user.password)) {
    console.log("matched");
    next();
  } else {
    console.log("unmatched");
    return res.status(401).json({ message: "Invalid Password" });
  }
};
module.exports = checkRole;
